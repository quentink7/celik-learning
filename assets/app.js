/* Application : routage, pages, rendu des cours Python, SQL et Machine Learning */
(function () {
  "use strict";
  const CFG = window.SITE_CONFIG || {};
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const app = () => $("#app");
  const L = "ABCDEFGH";

  /* ------------------------------------------------------------------ */
  /* Données des cours                                                    */
  /* ------------------------------------------------------------------ */
  const PY = window.COURSE_PYTHON;
  const PY_LESSONS = [];
  PY.parts.forEach((p, pi) => p.lessons.forEach(l => { l.part = pi; PY_LESSONS.push(l); }));
  const SQ = window.COURSE_SQL;
  const SQ_LESSONS = [];
  SQ.parts.forEach((p, pi) => p.lessons.forEach(l => { l.part = pi; SQ_LESSONS.push(l); }));
  const CS50_WEEKS = SQ.source.weeks;

  const DETAIL = window.ML_DETAIL || {};
  const ML_MODS = (window.COURSE_ML_MODULES || []).map(m => {
    const d = DETAIL[m.id] || {};
    m.detail = d;
    m.blocks.forEach(b => { b.detail = (d.blocks || {})[b.title] || {}; });
    return m;
  });
  const ML = {
    id: "ml", title: "Machine Learning",
    tagline: "Comprendre comment une machine apprend, maths comprises",
    intro: "Pensé pour quelqu'un qui part de zéro en maths. Les modules de maths sont placés juste avant le module de ML qui en a besoin : tu n'apprends chaque outil qu'au moment où il sert. Chaque notion est expliquée simplement, puis calculée pas à pas, avec des démos à manipuler."
  };
  const mlLabel = m => (m.track === "maths" ? "Maths " : "Module ") + m.num;
  const COURSES = { python: { meta: PY, units: PY_LESSONS }, ml: { meta: ML, units: ML_MODS }, sql: { meta: SQ, units: SQ_LESSONS } };
  const COURSE_KEYS = ["python", "ml", "sql"];
  const isLessonCourse = c => c === "python" || c === "sql";   // cours en leçons (avec exercice), par opposition aux modules du ML

  /* ------------------------------------------------------------------ */
  /* Utilitaires                                                          */
  /* ------------------------------------------------------------------ */
  function setTitle(t) { document.title = t ? `${t} · ${CFG.siteName}` : `${CFG.siteName} · ${CFG.tagline}`; }
  function progressOf(course) {
    const st = Store.get(course), units = COURSES[course].units;
    const done = units.filter(u => st.units[u.id] && st.units[u.id].done).length;
    return { done, total: units.length, pct: Math.round(done / units.length * 100) };
  }
  function nextUnit(course) {
    const st = Store.get(course), units = COURSES[course].units;
    if (st.last) { const i = units.findIndex(u => u.id === st.last); if (i >= 0 && !(st.units[st.last] || {}).done) return units[i]; }
    return units.find(u => !(st.units[u.id] || {}).done) || units[0];
  }
  function progBar(p) { return `<div class="prog"><div class="meter" role="img" aria-label="${p.pct} % terminé"><i style="width:${p.pct}%"></i></div><span>${p.done} / ${p.total}</span></div>`; }
  function markDone(course, id, extra) {
    Store.update(course, s => { const u = s.units[id] || {}; u.done = true; u.at = Date.now(); if (extra && extra.score != null) u.score = Math.max(u.score || 0, extra.score); s.units[id] = u; });
  }
  function isDone(course, id) { const u = Store.get(course).units[id]; return !!(u && u.done); }

  /* ------------------------------------------------------------------ */
  /* Avis des élèves : une fenêtre à la fois, focus gardé dedans, Échap = plus tard */
  /* ------------------------------------------------------------------ */
  let fbOpen = false, siteAsked = false;
  function openFeedback(o) {
    if (fbOpen) return;
    fbOpen = true;
    const before = document.activeElement;
    const ov = document.createElement("div");
    ov.className = "fb-overlay";
    ov.innerHTML = `<div class="fb" role="dialog" aria-modal="true" aria-labelledby="fb-t">
  <b class="tag">${esc(o.tag)}</b>
  <h2 id="fb-t">${esc(o.title)}</h2>
  ${o.sub ? `<p class="note">${esc(o.sub)}</p>` : ""}
  <fieldset class="fb-rate"><legend>${esc(o.question)}</legend>
    ${[1, 2, 3, 4, 5].map(n => `<button type="button" class="fb-n" data-n="${n}" aria-pressed="false"><b>${n}</b><span>${esc(o.labels[n - 1])}</span></button>`).join("")}
  </fieldset>
  <label class="fb-c"><span>${esc(o.ask)}</span><textarea maxlength="500" rows="3"></textarea><small><span class="fb-count">0</span> / 500</small></label>
  <div class="form-msg ko" hidden></div>
  <div class="fb-actions"><button type="button" class="btn primary" data-fb="send" disabled>Envoyer mon avis</button><button type="button" class="btn ghost" data-fb="later">${esc(o.later)}</button>${o.never ? `<button type="button" class="btn ghost" data-fb="never">${esc(o.never)}</button>` : ""}</div>
</div>`;
    document.body.appendChild(ov);
    const box = $(".fb", ov), ta = $("textarea", ov), send = $('[data-fb="send"]', ov), msg = $(".form-msg", ov);
    let rating = null;
    const close = () => { ov.remove(); fbOpen = false; document.removeEventListener("keydown", onKey, true); if (before && before.focus) try { before.focus(); } catch (e) {} };
    const onKey = e => {
      if (e.key === "Escape") { e.preventDefault(); later(); return; }
      if (e.key !== "Tab") return;
      const f = $$("button:not([disabled]), textarea", box); if (!f.length) return;
      const i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    };
    const later = () => { try { o.onLater && o.onLater(); } catch (e) {} close(); };
    document.addEventListener("keydown", onKey, true);
    $$(".fb-n", ov).forEach(b => b.onclick = () => {
      rating = +b.dataset.n;
      $$(".fb-n", ov).forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      send.disabled = false;
    });
    ta.oninput = () => { $(".fb-count", ov).textContent = ta.value.length; };
    $('[data-fb="later"]', ov).onclick = later;
    const nv = $('[data-fb="never"]', ov); if (nv) nv.onclick = () => { Promise.resolve(o.onNever && o.onNever()).catch(() => {}); close(); };
    send.onclick = async () => {
      send.disabled = true; msg.hidden = true;
      try {
        await o.onSend(rating, ta.value.trim());
        box.innerHTML = `<b class="tag">${esc(o.tag)}</b><h2 id="fb-t">Merci !</h2><p class="lead">Ton avis aide à rendre les cours plus clairs pour tout le monde.</p><div class="fb-actions"><button type="button" class="btn primary" data-fb="ok">Continuer</button></div>`;
        const ok = $('[data-fb="ok"]', box); ok.onclick = close; ok.focus();
      } catch (e) { msg.hidden = false; msg.textContent = (e && e.message) || "L'envoi n'a pas marché. Réessaie dans un instant."; send.disabled = false; }
    };
    const first = $(".fb-n", ov); if (first) first.focus();
  }
  /* Avis sur le site : demandé une fois par compte, à la prochaine visite connectée. */
  async function maybeAskSite() {
    if (siteAsked || fbOpen || (Store.cloud && !Store.user)) return;
    try { if (sessionStorage.getItem("celik:fb-site-later")) return; } catch (e) {}
    const mine = await Store.feedbackMine();
    if (!mine || mine["site::"] || siteAsked) return;
    siteAsked = true;
    setTimeout(() => {
      if (fbOpen || /^#\/connexion/.test(location.hash) || (Store.cloud && !Store.user)) { siteAsked = false; return; }
      openFeedback({
        tag: "Ton avis compte", title: "Que penses-tu de CELIK Learning ?", sub: "Une minute pour m'aider à améliorer le site. Merci ! — Quentin",
        question: "Ta note pour le site", labels: ["Bof", "Moyen", "Bien", "Très bien", "Génial"],
        ask: "Qu'est-ce que je pourrais améliorer ? (facultatif)", later: "Plus tard", never: "Non merci",
        onSend: (r, c) => Store.feedbackSend({ kind: "site", rating: r, comment: c }),
        onLater: () => { try { sessionStorage.setItem("celik:fb-site-later", "1"); } catch (e) {} },
        onNever: () => Store.feedbackSend({ kind: "site", dismissed: true })
      });
    }, 1800);
  }
  /* Avis sur une leçon / un module : juste après la validation, une fois par sujet. */
  async function askUnit(course, u) {
    if (Store.cloud && !Store.user) return;
    const mine = await Store.feedbackMine();
    if (!mine || mine["unit:" + course + ":" + u.id]) return;
    const py = isLessonCourse(course);
    setTimeout(() => openFeedback({
      tag: course === "python" ? "Ton avis · leçon " + u.id.slice(1) : course === "sql" ? "Ton avis · SQL leçon " + u.id.slice(1) : "Ton avis · " + mlLabel(u),
      title: py ? "Cette leçon t'a aidé ?" : "Ce module t'a aidé ?", sub: u.title,
      question: py ? "Elle t'a aidé…" : "Il t'a aidé…", labels: ["Pas du tout", "Un peu", "Moyennement", "Beaucoup", "Énormément"],
      ask: "Qu'est-ce qui était flou ou difficile ? (facultatif)", later: "Passer",
      onSend: (r, c) => Store.feedbackSend({ kind: "unit", course, unit_id: u.id, rating: r, comment: c }),
      onLater: () => { Store.feedbackSend({ kind: "unit", course, unit_id: u.id, dismissed: true }).catch(() => {}); }
    }), 1400);
  }

  /* Révélation d'une réponse (bouton → encadré) */
  function wireReveals(root) {
    $$("[data-reveal]", root).forEach(btn => btn.addEventListener("click", () => {
      const t = document.getElementById(btn.dataset.reveal); if (!t) return;
      t.hidden = !t.hidden; btn.textContent = t.hidden ? (btn.dataset.show || "Voir la réponse") : (btn.dataset.hide || "Masquer la réponse");
      if (!t.hidden) t.classList.add("reveal");
    }));
  }
  let UID = 0; const uid = p => (p || "u") + (++UID);
  function brandName() {
    const n = String(CFG.siteName || ""), i = n.indexOf(" ");
    return i > 0 ? `<b>${esc(n.slice(0, i))} <span>${esc(n.slice(i + 1))}</span></b>` : `<b>${esc(n)}</b>`;
  }

  /* L'étoffe : un carreau tissé par leçon, une bande par cours */
  const unitKind = (course, u) => course === "python" ? "py" : course === "sql" ? "sq" : (u.track === "maths" ? "maths" : "ml");
  const unitLabel = (course, u, i) => course === "python" ? `Python · leçon ${i + 1}` : course === "sql" ? `SQL · leçon ${i + 1}` : (u.track === "maths" ? `Maths ${u.num}` : `ML · module ${u.num}`);
  function cellsHtml(course, opts) {
    opts = opts || {};
    const units = COURSES[course].units, st = Store.get(course), nxt = nextUnit(course);
    const started = Object.keys(st.units).length > 0 || !!st.last;
    return units.map((u, i) => {
      const done = !!(st.units[u.id] && st.units[u.id].done);
      const motif = "motif-" + ((i * 5 + (course === "ml" ? 3 : course === "sql" ? 1 : 0)) % 6);
      const isNext = opts.showNext !== false && started && !done && nxt && nxt.id === u.id;
      return `<a class="cell ${unitKind(course, u)} ${motif}${done ? "" : " todo"}${isNext ? " next" : ""}" style="--i:${(opts.offset || 0) + i}" href="#/${course}/${u.id}" data-cap="${esc(unitLabel(course, u, i) + " · " + u.title + (done ? " · terminé" : isNext ? " · à reprendre ici" : ""))}" aria-label="${esc(unitLabel(course, u, i) + " : " + u.title + (done ? ", terminé" : ""))}"><span class="n">${i + 1}</span></a>`;
    }).join("");
  }
  function wireCaption(root, capSel, defaultText) {
    const cap = $(capSel, root); if (!cap) return;
    const show = t => { cap.textContent = t || defaultText; };
    $$(".cell", root).forEach(c => { c.addEventListener("mouseenter", () => show(c.dataset.cap)); c.addEventListener("focus", () => show(c.dataset.cap)); c.addEventListener("mouseleave", () => show()); c.addEventListener("blur", () => show()); });
    show();
  }

  /* ------------------------------------------------------------------ */
  /* Coque : en-tête, état de sauvegarde                                  */
  /* ------------------------------------------------------------------ */
  function renderHeader() {
    const u = Store.user;
    const route = location.hash || "#/";
    const cur = route.startsWith("#/python") ? "python" : route.startsWith("#/ml") ? "ml" : route.startsWith("#/sql") ? "sql" : "";
    $("#hdr").innerHTML = `
<div class="topbar-in">
  <a class="brand" href="#/" aria-label="${esc(CFG.siteName)}, accueil"><span class="logo" aria-hidden="true">${"<i></i>".repeat(9)}</span>${brandName()}</a>
  <nav class="nav" aria-label="Cours">
    <a href="#/python" ${cur === "python" ? 'aria-current="page"' : ""}>Python</a>
    <a href="#/ml" ${cur === "ml" ? 'aria-current="page"' : ""}>Machine Learning</a>
    <a href="#/sql" ${cur === "sql" ? 'aria-current="page"' : ""}>SQL</a>
  </nav>
  <div class="user-zone">
    <span id="save-chip" class="save-chip" hidden></span>
    ${Store.cloud ? (u ? `<span class="user-mail">${esc(u.email)}</span><a class="btn small" href="#/compte">Mon compte</a>` : `<a class="btn primary small" href="#/connexion">Se connecter</a>`) : ""}
  </div>
</div>`;
    paintStatus(Store.status);
  }
  function paintStatus(s) {
    const chip = $("#save-chip"); if (!chip) return;
    if (!Store.cloud || !Store.user) { chip.hidden = true; return; }
    const txt = { idle: "", loading: "Chargement…", pending: "Enregistrement…", saved: "Progression enregistrée", offline: "Hors ligne : enregistré sur cet appareil" }[s] || "";
    chip.hidden = !txt; chip.textContent = txt; chip.classList.toggle("cloud", s === "saved");
  }

  /* ------------------------------------------------------------------ */
  /* Routeur                                                              */
  /* ------------------------------------------------------------------ */
  let cleanup = null;
  async function route() {
    if (cleanup) { try { cleanup(); } catch (e) {} cleanup = null; }
    const h = (location.hash || "#/").replace(/^#/, "");
    /* Retour d'un lien envoyé par email (Supabase met les infos dans l'ancre) */
    if (/(^|&)(access_token|error_description|type=recovery)=?/.test(h)) {
      const p = new URLSearchParams(h);
      if (p.get("error_description")) { renderHeader(); app().innerHTML = `<div class="empty">Le lien n'est plus valide (${esc(p.get("error_description").replace(/\+/g, " "))}). Il expire après un certain temps et ne sert qu'une fois : <a href="#/connexion">redemande un lien</a>.</div>`; return; }
      history.replaceState(null, "", location.pathname + (p.get("type") === "recovery" ? "#/compte" : "#/"));
      return route();
    }
    const parts = h.split("/").filter(Boolean);
    renderHeader();
    if (parts[0] !== "connexion") maybeAskSite();
    const needsAuth = COURSE_KEYS.includes(parts[0]);
    if (Store.cloud && !Store.user && needsAuth) {
      try { sessionStorage.setItem("celik:after-login", "#" + h); } catch (e) {}
      location.replace("#/connexion"); return;
    }
    window.scrollTo(0, 0);
    if (!parts.length) return pageHome();
    if (parts[0] === "connexion") return Store.cloud ? (Store.user ? location.replace("#/") : pageAuth()) : location.replace("#/");
    if (parts[0] === "compte") return Store.cloud && Store.user ? pageAccount() : location.replace("#/");
    if (COURSE_KEYS.includes(parts[0])) {
      await Store.load(parts[0]);
      if (!parts[1]) return pageCourse(parts[0]);
      return parts[0] === "python" ? pagePyLesson(parts[1]) : parts[0] === "sql" ? pageSqlLesson(parts[1]) : pageMlModule(parts[1]);
    }
    pageNotFound();
  }
  function pageNotFound() { setTitle("Page introuvable"); app().innerHTML = `<div class="empty">Cette page n'existe pas. <a href="#/">Retour à l'accueil</a></div>`; }

  /* ------------------------------------------------------------------ */
  /* Accueil                                                              */
  /* ------------------------------------------------------------------ */
  async function pageHome() {
    setTitle("");
    if (Store.user) await Promise.all(COURSE_KEYS.map(k => Store.load(k)));
    const showProg = !Store.cloud || Store.user;
    const pP = progressOf("python"), pM = progressOf("ml"), pS = progressOf("sql");
    const startedOf = k => progressOf(k).done > 0 || !!Store.get(k).last;
    const started = COURSE_KEYS.filter(startedOf);
    const total = pP.done + pM.done + pS.done;
    const goOn = { python: "Continuer Python", ml: "Continuer le ML", sql: "Continuer SQL" };
    let ctas;
    if (Store.cloud && !Store.user) ctas = `<a class="btn primary" href="#/connexion">Créer mon compte gratuit</a><a class="btn" href="#/connexion">J'ai déjà un compte</a>`;
    else if (started.length) ctas = started.map((k, i) => `<a class="btn ${i ? "" : "primary"}" href="#/${k}/${nextUnit(k).id}">${goOn[k]}</a>`).join("");
    else ctas = `<a class="btn primary" href="#/python/${PY_LESSONS[0].id}">Commencer par Python</a><a class="btn" href="#/sql/${SQ_LESSONS[0].id}">Commencer SQL</a><a class="btn" href="#/ml/${ML_MODS[0].id}">Commencer le ML</a>`;
    const card = (key, kicker, list, facts) => {
      const c = COURSES[key], p = progressOf(key), started = startedOf(key);
      return `<a class="course ${key}" href="#/${key}">
  <span class="selvage motif-2" aria-hidden="true"></span>
  <span class="body">
    <span class="kicker">${kicker}</span>
    <h2>${esc(c.meta.title)}</h2>
    <p>${esc(c.meta.tagline)}</p>
    <ul>${list.map(x => `<li>${x}</li>`).join("")}</ul>
    <span class="foot"><span class="facts">${facts}</span>${showProg && started ? progBar(p) : `<span class="btn small">Voir le parcours →</span>`}</span>
  </span>
</a>`;
    };
    const hours = a => Math.round(a.reduce((s, x) => s + (x.minutes || 30), 0) / 60);
    app().innerHTML = `
<section class="hero">
  <div class="hero-text">
    <span class="eyebrow">${esc(CFG.siteName)} · gratuit · en français</span>
    <h1><span class="l">Apprends</span> <span class="l"><span class="t-millet">Python</span>, <span class="t-bissap">SQL</span></span> <span class="l">et l'<span class="t-indigo">IA</span>,</span> <span class="l">fil après fil.</span></h1>
    <p class="lead">Trois parcours pour vrais débutants. Chaque notion est expliquée simplement, calculée pas à pas, puis pratiquée tout de suite. Chaque leçon terminée tisse un carreau de ton étoffe.</p>
    <div class="row">${ctas}</div>
  </div>
  <figure class="cloth-wrap" style="margin:0">
    <div class="cloth" role="group" aria-label="Ton étoffe : un carreau par leçon">
      <div class="band-label"><span>Bande Python</span><span>${showProg ? pP.done + " / " + pP.total : PY_LESSONS.length + " leçons"}</span></div>
      ${cellsHtml("python")}
      <div class="band-label"><span>Bande Machine Learning</span><span>${showProg ? pM.done + " / " + pM.total : ML_MODS.length + " modules"}</span></div>
      ${cellsHtml("ml", { offset: 16 })}
      <div class="band-label"><span>Bande SQL</span><span>${showProg ? pS.done + " / " + pS.total : SQ_LESSONS.length + " leçons"}</span></div>
      ${cellsHtml("sql", { offset: 32 })}
    </div>
    <figcaption class="note" id="cloth-cap"></figcaption>
    <div class="cloth-legend"><span><i style="background:var(--millet)"></i>Python</span><span><i style="background:var(--indigo)"></i>Machine Learning</span><span><i style="background:var(--teal)"></i>Maths pour le ML</span><span><i style="background:var(--bissap)"></i>SQL</span><span><i style="background:var(--surface-2);outline:1px solid var(--line)"></i>À tisser</span></div>
  </figure>
</section>
<section class="courses" aria-label="Les trois parcours">
  ${card("python", "&gt;&gt;&gt; print(\"Bonjour\")", ["Variables, conditions, boucles, listes, fonctions", "Une console Python dans la page, rien à installer", "Exercices corrigés automatiquement", "Projet final : repérer une attaque dans des logs"], `${PY_LESSONS.length} leçons · environ ${hours(PY_LESSONS)} h`)}
  ${card("ml", "ŷ = w · x + b", ["Les idées du ML, sans jargon", "Les maths reprises depuis le début, juste à temps", "Démos à manipuler : gradient, seuil, k-means", "Un projet complet avec scikit-learn"], `${ML_MODS.length} modules dont ${ML_MODS.filter(m => m.track === "maths").length} de maths · environ ${hours(ML_MODS)} h`)}
  ${card("sql", "SELECT * FROM clients;", ["Interroger une base : filtrer, trier, compter", "Relier les tables : JOIN, GROUP BY", "Concevoir sa base, modifier, sécuriser", "Programme aligné sur CS50 SQL (Harvard)"], `${SQ_LESSONS.length} leçons · environ ${hours(SQ_LESSONS)} h`)}
</section>
<section class="stack" aria-labelledby="methode">
  <h2 id="methode">Comment se déroule une leçon</h2>
  <div class="method">
    <div><b>Comprendre</b><span>Une explication en mots simples, avec une image du quotidien.</span></div>
    <div><b>Calculer</b><span>Un exemple déroulé étape par étape, chiffres compris.</span></div>
    <div><b>Pratiquer</b><span>Exercice corrigé dans la console, ou démo à manipuler.</span></div>
    <div><b>Vérifier</b><span>Quiz expliqué, questions de rappel, mots-clés à retourner.</span></div>
  </div>
  <p class="quote-line">15 minutes par jour valent mieux que 3 heures le dimanche. ${showProg && total ? `Tu as déjà tissé ${total} carreau${total > 1 ? "x" : ""}.` : ""}</p>
</section>`;
    wireCaption(app(), "#cloth-cap", "Survole un carreau pour voir la leçon ; clique pour l'ouvrir.");
  }

  /* ------------------------------------------------------------------ */
  /* Connexion                                                            */
  /* ------------------------------------------------------------------ */
  function pageAuth() {
    setTitle("Connexion");
    let mode = "login";
    const draw = () => {
      app().innerHTML = `
<div class="auth-wrap">
<div class="auth-side">
  <span class="eyebrow">${esc(CFG.siteName)}</span>
  <h1>Ton étoffe t'attend.</h1>
  <p class="lead" style="color:var(--ink-2);font-size:1.125rem;max-width:30rem">Un compte gratuit garde ta progression : chaque leçon terminée, chaque score de quiz, ton code en cours. Tu reprends où tu t'es arrêté, sur ton téléphone comme sur ton ordinateur.</p>
  <div class="mini-cloth" aria-hidden="true">${Array.from({ length: 36 }, (_, i) => `<span class="cell ${["py", "ml", "maths"][i % 3]} motif-${(i * 5) % 6}${i % 4 === 3 ? " todo" : ""}" style="--i:${i}"></span>`).join("")}</div>
</div>
<section class="auth">
  <h2>${mode === "signup" ? "Créer ton compte" : mode === "magic" ? "Connexion par lien" : mode === "reset" ? "Mot de passe oublié" : "Se connecter"}</h2>
  <p class="note">${mode === "magic" ? "Tu reçois un lien par email : clique dessus et tu es connecté, sans mot de passe." : mode === "reset" ? "Tu reçois un email pour choisir un nouveau mot de passe." : "Ton compte sert à enregistrer ta progression dans les deux cours."}</p>
  <div class="tabs" role="tablist">
    <button type="button" role="tab" data-m="login" aria-selected="${mode === "login"}">Connexion</button>
    <button type="button" role="tab" data-m="signup" aria-selected="${mode === "signup"}">Inscription</button>
    ${CFG.emailEnabled !== false ? `<button type="button" role="tab" data-m="magic" aria-selected="${mode === "magic"}">Lien par email</button>` : ""}
  </div>
  <form class="stack" id="auth-form" novalidate>
    <div class="field"><label for="f-mail">Adresse email</label><input id="f-mail" type="email" autocomplete="email" required placeholder="toi@exemple.com"></div>
    ${mode === "login" || mode === "signup" ? `<div class="field"><label for="f-pw">Mot de passe${mode === "signup" ? " (8 caractères minimum)" : ""}</label><input id="f-pw" type="password" autocomplete="${mode === "signup" ? "new-password" : "current-password"}" required minlength="${mode === "signup" ? 8 : 1}"></div>` : ""}
    <div id="auth-msg" class="form-msg" hidden></div>
    <button class="btn primary block" type="submit">${mode === "signup" ? "Créer mon compte" : mode === "magic" ? "Recevoir le lien" : mode === "reset" ? "Envoyer l'email" : "Me connecter"}</button>
    ${mode === "login" && CFG.emailEnabled !== false ? `<button class="btn ghost small" type="button" data-m="reset">Mot de passe oublié ?</button>` : ""}
    ${mode === "reset" ? `<button class="btn ghost small" type="button" data-m="login">Retour à la connexion</button>` : ""}
  </form>
</section>
</div>`;
      $$("[data-m]").forEach(b => b.onclick = () => { mode = b.dataset.m; draw(); });
      $("#auth-form").onsubmit = async e => {
        e.preventDefault();
        const mail = $("#f-mail").value.trim(), pw = $("#f-pw") ? $("#f-pw").value : "";
        const msg = $("#auth-msg"), btn = e.target.querySelector("button[type=submit]");
        const show = (t, ok) => { msg.hidden = false; msg.className = "form-msg " + (ok ? "ok" : "ko"); msg.textContent = t; };
        if (!/^\S+@\S+\.\S+$/.test(mail)) return show("Entre une adresse email valide.");
        if (mode === "signup" && pw.length < 8) return show("Choisis un mot de passe d'au moins 8 caractères.");
        btn.disabled = true;
        try {
          if (mode === "login") { await Store.signIn(mail, pw); afterLogin(); }
          else if (mode === "signup") { const r = await Store.signUp(mail, pw); if (r.needsConfirm) show("Compte créé. Ouvre l'email de confirmation que tu viens de recevoir et clique sur le lien pour activer ton compte.", true); else afterLogin(); }
          else if (mode === "magic") { await Store.magic(mail); show("C'est envoyé. Ouvre ta boîte mail (pense aux spams) et clique sur le lien.", true); }
          else { await Store.resetPassword(mail); show("Si un compte existe avec cette adresse, un email vient d'être envoyé.", true); }
        } catch (er) { show(er.message || "Une erreur est survenue."); }
        btn.disabled = false;
      };
    };
    draw();
  }
  function afterLogin() {
    let to = "#/"; try { to = sessionStorage.getItem("celik:after-login") || "#/"; sessionStorage.removeItem("celik:after-login"); } catch (e) {}
    location.hash = to;
  }

  function pageAccount() {
    setTitle("Mon compte");
    const p1 = progressOf("python"), p2 = progressOf("ml"), p3 = progressOf("sql");
    app().innerHTML = `
<section class="account">
  <h1>Mon compte</h1>
  <div class="panel stack"><span class="eyebrow">Connecté avec</span><b>${esc(Store.user.email)}</b></div>
  <div class="panel stack">
    <span class="eyebrow">Progression</span>
    <div><b>Python</b>${progBar(p1)}</div>
    <div><b>Machine Learning</b>${progBar(p2)}</div>
    <div><b>SQL</b>${progBar(p3)}</div>
  </div>
  <form class="panel stack" id="pw-form">
    <span class="eyebrow">Changer de mot de passe</span>
    <div class="field"><label for="n-pw">Nouveau mot de passe (8 caractères minimum)</label><input id="n-pw" type="password" autocomplete="new-password" minlength="8"></div>
    <div id="pw-msg" class="form-msg" hidden></div>
    <button class="btn" type="submit">Enregistrer</button>
  </form>
  <button class="btn danger" id="logout" type="button">Se déconnecter</button>
</section>`;
    $("#logout").onclick = async () => { await Store.signOut(); location.hash = "#/"; };
    $("#pw-form").onsubmit = async e => {
      e.preventDefault(); const v = $("#n-pw").value, m = $("#pw-msg"); m.hidden = false;
      if (v.length < 8) { m.className = "form-msg ko"; m.textContent = "8 caractères minimum."; return; }
      try { await Store.updatePassword(v); m.className = "form-msg ok"; m.textContent = "Mot de passe modifié."; $("#n-pw").value = ""; }
      catch (er) { m.className = "form-msg ko"; m.textContent = er.message; }
    };
  }

  /* ------------------------------------------------------------------ */
  /* Sommaire d'un cours                                                  */
  /* ------------------------------------------------------------------ */
  function pageCourse(course) {
    const c = COURSES[course], p = progressOf(course), nxt = nextUnit(course), st = Store.get(course);
    setTitle(c.meta.title);
    const pad = n => String(n).padStart(2, "0");
    let body = "";
    if (isLessonCourse(course)) {
      body = c.meta.parts.map((part, pi) => `
<section class="part"><h2><span class="pn">Partie ${pi + 1}</span>${esc(part.title)}</h2>
<ol class="units">${part.lessons.map(l => {
        const n = c.units.indexOf(l) + 1, d = isDone(course, l.id);
        return `<li class="${d ? "done" : ""}"><a href="#/${course}/${l.id}"><span class="ix">${pad(n)}</span><span><span class="t">${esc(l.title)}</span><span class="d">${esc(l.goal)}</span></span><span class="r">${d ? "✓ réussi" : l.minutes + " min"}</span></a></li>`;
      }).join("")}</ol></section>`).join("");
    } else {
      body = `<section class="part"><h2><span class="pn">${ML_MODS.length} étapes</span>Le parcours</h2><ol class="units">${ML_MODS.map((m, i) => {
        const d = isDone(course, m.id), sc = (st.units[m.id] || {}).score;
        return `<li class="${d ? "done" : ""} ${m.track === "maths" ? "maths" : ""}"><a href="#/ml/${m.id}"><span class="ix">${pad(i + 1)}</span><span><span class="t">${m.track === "maths" ? `<span class="tagm">Maths</span>` : ""}${esc(m.title)}</span><span class="d">${esc(m.short)}${m.track === "maths" ? " · prépare le module suivant" : ""}</span></span><span class="r">${d ? (sc != null ? `✓ quiz ${sc} %` : "✓ terminé") : (m.minutes || 30) + " min"}</span></a></li>`;
      }).join("")}</ol></section>`;
    }
    app().innerHTML = `
<div class="crumbs-bar"><a href="#/">Accueil</a><span>/</span><span>${esc(c.meta.title)}</span></div>
<div class="course-page">
  <aside class="strip-side" aria-label="Ta bande">
    <span class="eyebrow">Ta bande · ${p.done} / ${p.total}</span>
    <div class="strip">${cellsHtml(course)}</div>
    <p class="note" id="strip-cap"></p>
  </aside>
  <div class="stack" style="gap:2rem; min-width:0">
    <section class="course-head">
      <h1>${esc(c.meta.title)}</h1>
      <p class="lead">${esc(c.meta.intro)}</p>
      ${progBar(p)}
      <div class="row"><a class="btn primary" href="#/${course}/${nxt.id}">${p.done === 0 && !st.last ? "Commencer le cours" : p.done === p.total ? "Revoir depuis le début" : "Continuer : " + esc(nxt.title)}</a></div>
    </section>
    ${c.meta.source ? sourceBox(c.meta.source) : ""}
    ${body}
  </div>
</div>`;
    wireCaption(app(), "#strip-cap", "Un carreau par " + (isLessonCourse(course) ? "leçon" : "module") + ". Les carreaux pâles restent à tisser.");
  }

  /* D'où vient le programme (cours SQL) */
  function sourceBox(s) {
    return `<aside class="box source"><b class="tag">D'où vient ce programme</b><p>Ce cours suit la progression de <a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.name)}</a> (CS50 SQL), le cours d'introduction aux bases de données de l'${esc(s.org)}, par ${esc(s.authors)}, dont les supports sont publiés sous licence <a href="${esc(s.licenseUrl)}" target="_blank" rel="noopener noreferrer">${esc(s.license)}</a>. Les ${s.weeks.length} semaines de CS50 SQL (${s.weeks.map(esc).join(", ")}) sont reprises dans le même ordre, réparties en 16 leçons.</p><p>Les explications, les exemples, la base de la boutique et les exercices sont rédigés pour CELIK Learning, en français. CELIK Learning n'est pas affilié à Harvard ni à CS50.</p></aside>`;
  }

  /* ------------------------------------------------------------------ */
  /* Quiz (commun aux trois cours)                                        */
  /* ------------------------------------------------------------------ */
  function quizHtml(qs, key) {
    return `<div class="quiz" data-quiz="${key}">${qs.map((q, i) => q.type === "open" ? `
<div class="qcard" data-qi="${i}">
  <div class="qtop"><span>Question ${i + 1} / ${qs.length} · réponse libre</span></div>
  <div class="qtext">${esc(q.q)}</div>
  <textarea aria-label="Ta réponse" placeholder="Écris ta réponse avec tes mots avant de regarder la correction."></textarea>
  <button class="btn small reveal-btn" type="button" data-reveal="${key}-a${i}">Voir la réponse modèle</button>
  <div class="answer" id="${key}-a${i}" hidden><b>Réponse modèle : </b>${esc(q.a)}</div>
</div>` : `
<div class="qcard" data-qi="${i}">
  <div class="qtop"><span>Question ${i + 1} / ${qs.length}</span></div>
  <div class="qtext">${esc(q.q)}</div>
  <div class="opts">${q.options.map((o, j) => `<button type="button" class="opt" data-j="${j}"><span class="l">${L[j]}</span><span>${esc(o)}</span></button>`).join("")}</div>
  <div class="fb-slot"></div>
</div>`).join("")}
<div class="score-slot"></div></div>`;
  }
  function wireQuiz(root, qs, course, unitId, onComplete) {
    const box = $("[data-quiz]", root); if (!box) return;
    const saved = (Store.get(course).quiz || {})[unitId] || {};
    const answers = Object.assign({}, saved);
    const mcq = qs.map((q, i) => q.type === "open" ? null : i).filter(i => i !== null);
    function paint(i, j) {
      const card = $(`[data-qi="${i}"]`, box), q = qs[i];
      $$(".opt", card).forEach(b => { const k = +b.dataset.j; b.disabled = true; if (k === q.answer) b.classList.add("right"); else if (k === j) b.classList.add("wrong"); });
      const ok = j === q.answer;
      $(".fb-slot", card).innerHTML = `<div class="fb ${ok ? "ok" : "ko"}"><span class="v">${ok ? "Bonne réponse" : "Pas tout à fait : la bonne réponse est " + L[q.answer]}</span>${q.explain ? `<p>${esc(q.explain)}</p>` : ""}</div>`;
    }
    function score() {
      const answered = mcq.filter(i => answers[i] != null);
      if (answered.length < mcq.length || !mcq.length) { $(".score-slot", box).innerHTML = ""; return; }
      const good = mcq.filter(i => answers[i] === qs[i].answer).length, pct = Math.round(good / mcq.length * 100);
      $(".score-slot", box).innerHTML = `<div class="panel score"><b>${good} / ${mcq.length}</b><div class="meter"><i style="width:${pct}%"></i></div><span class="note">${pct >= 80 ? "Très bien, tu maîtrises cette partie." : pct >= 50 ? "Pas mal. Relis les explications des questions ratées." : "Relis la leçon, puis réessaie : c'est normal au début."}</span><button class="btn small" type="button" data-retry>Recommencer le quiz</button></div>`;
      $("[data-retry]", box).onclick = () => { mcq.forEach(i => delete answers[i]); Store.update(course, s => { s.quiz[unitId] = {}; }); rebuild(); };
      if (onComplete) onComplete(pct);
    }
    function rebuild() {
      $$(".qcard", box).forEach(card => { const i = +card.dataset.qi; if (qs[i].type === "open") return; $$(".opt", card).forEach(b => { b.disabled = false; b.classList.remove("right", "wrong"); }); $(".fb-slot", card).innerHTML = ""; });
      $(".score-slot", box).innerHTML = "";
    }
    $$(".qcard", box).forEach(card => {
      const i = +card.dataset.qi; if (qs[i].type === "open") return;
      $$(".opt", card).forEach(b => b.addEventListener("click", () => {
        if (answers[i] != null) return;
        answers[i] = +b.dataset.j; paint(i, answers[i]);
        Store.update(course, s => { s.quiz[unitId] = Object.assign({}, answers); });
        score();
      }));
      if (answers[i] != null) paint(i, answers[i]);
    });
    score();
  }

  /* ------------------------------------------------------------------ */
  /* Leçon Python                                                         */
  /* ------------------------------------------------------------------ */
  function pagePyLesson(id) {
    const idx = PY_LESSONS.findIndex(l => l.id === id);
    if (idx < 0) return pageNotFound();
    const l = PY_LESSONS[idx], prev = PY_LESSONS[idx - 1], next = PY_LESSONS[idx + 1], ex = l.exercise;
    Store.update("python", s => { s.last = l.id; });
    setTitle(l.title);
    const st = Store.get("python");
    const draft = st.drafts[l.id] != null ? st.drafts[l.id] : ex.start;
    app().innerHTML = `
<div class="crumbs-bar"><a href="#/">Accueil</a><span>/</span><a href="#/python">Python</a><span>/</span><span>Leçon ${idx + 1}</span></div>
<header class="lesson-head py">
  <span class="big-n" aria-hidden="true">${String(idx + 1).padStart(2, "0")}</span>
  <span class="eyebrow">Partie ${l.part + 1} · ${esc(PY.parts[l.part].title)} · leçon ${idx + 1} sur ${PY_LESSONS.length}</span>
  <h1>${esc(l.title)}</h1>
  <div class="meta"><span>≈ ${l.minutes} min</span><button type="button" class="btn ghost small" data-goto-bench>↓ Aller à l'exercice</button><span id="done-tag">${isDone("python", l.id) ? "✓ Exercice réussi" : ""}</span></div>
</header>
<p class="objective"><b>Objectif</b>${esc(l.goal)}</p>
<div class="py-layout">
  <article class="py-text">
    <div class="box why"><b class="tag">Pourquoi c'est utile</b>${l.why}</div>
    ${l.sections.map(s => `<section class="stack"><h2 class="section-title">${esc(s.h)}</h2><div class="lesson">${s.html}</div></section>`).join("")}
    <div class="box pitfall"><b class="tag">Erreurs fréquentes</b><ul>${l.pitfalls.map(p => `<li>${p}</li>`).join("")}</ul></div>
    <div class="box remember"><b class="tag">L'essentiel à retenir</b><ul>${l.remember.map(p => `<li>${esc(p)}</li>`).join("")}</ul></div>
    <section class="stack"><h2 class="section-title">Vérifie que tu as compris</h2>${quizHtml(l.quiz, "q-" + l.id)}</section>
    <nav class="pager">${prev ? `<a class="btn" href="#/python/${prev.id}">← ${esc(prev.title)}</a>` : "<span></span>"}${next ? `<a class="btn primary" href="#/python/${next.id}">${esc(next.title)} →</a>` : `<a class="btn primary" href="#/python">Retour au sommaire</a>`}</nav>
  </article>
  <aside class="bench" aria-label="Atelier">
    <div class="task"><span class="tag">Exercice</span><div>${ex.task}</div>
      <details><summary>Un indice</summary><p>${esc(ex.hint)}</p></details>
      <details data-sol><summary>Voir une solution</summary><p class="note">Essaie vraiment avant d'ouvrir : c'est en cherchant qu'on apprend.</p><button class="btn small" type="button" data-load-sol>Mettre la solution dans l'éditeur</button></details>
    </div>
    <div class="pane">
      <div class="pane-head"><span class="t">exercice.py</span><div class="row"><button class="btn small" type="button" data-act="reset">Réinitialiser</button><button class="btn small primary" type="button" data-act="run" disabled>▶ Exécuter</button><button class="btn small check" type="button" data-act="check" disabled>✓ Vérifier</button></div></div>
      <div class="editor"><div class="gutter">1</div><textarea class="code-area" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Éditeur de code Python"></textarea></div>
      <div class="kbd">Ctrl/⌘ + Entrée pour exécuter · Tab pour indenter (4 espaces)</div>
    </div>
    <div class="pane term">
      <div class="pane-head"><span class="t">Console</span><div class="row"><button class="btn small" type="button" data-act="stop" disabled>■ Arrêter</button><button class="btn small" type="button" data-act="clear">Effacer</button></div></div>
      <div class="out" aria-live="polite"><span class="sys">Chargement de Python…</span></div>
      <form class="inrow" hidden><span>›</span><input autocomplete="off" aria-label="Réponse à input()"><button class="btn small" type="submit">Envoyer</button></form>
    </div>
    <div class="pyverdict" hidden></div>
  </aside>
</div>`;
    const root = app();
    wireReveals(root);
    wireQuiz(root, l.quiz, "python", l.id);
    wireBench(root, l);
    $("[data-goto-bench]", root).onclick = () => $(".bench", root).scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function wireBench(root, l) {
    const ex = l.exercise;
    const code = $(".code-area", root), gutter = $(".gutter", root), out = $(".out", root), form = $(".inrow", root), stdin = $(".inrow input", root), verdict = $(".pyverdict", root);
    const btn = a => $(`[data-act="${a}"]`, root);
    const st = Store.get("python");
    code.value = st.drafts[l.id] != null ? st.drafts[l.id] : ex.start;
    let running = false, pending = null, saveT = null;
    const gut = () => { gutter.textContent = Array.from({ length: code.value.split("\n").length }, (_, i) => i + 1).join("\n"); };
    gut();
    const save = () => { clearTimeout(saveT); saveT = setTimeout(() => Store.update("python", s => { s.drafts[l.id] = code.value; }), 600); };
    code.addEventListener("input", () => { gut(); save(); });
    code.addEventListener("scroll", () => { gutter.scrollTop = code.scrollTop; });
    code.addEventListener("keydown", e => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); run(); return; }
      if (e.key === "Tab") { e.preventDefault(); const s = code.selectionStart; code.value = code.value.slice(0, s) + "    " + code.value.slice(code.selectionEnd); code.selectionStart = code.selectionEnd = s + 4; gut(); save(); return; }
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); const s = code.selectionStart, ls = code.value.lastIndexOf("\n", s - 1) + 1, line = code.value.slice(ls, s);
        let ind = line.match(/^ */)[0]; if (/:\s*$/.test(line)) ind += "    ";
        code.value = code.value.slice(0, s) + "\n" + ind + code.value.slice(code.selectionEnd); code.selectionStart = code.selectionEnd = s + 1 + ind.length; gut(); save();
      }
    });
    const write = (t, cls) => { const s = document.createElement("span"); if (cls) s.className = cls; s.textContent = t; out.appendChild(s); out.scrollTop = out.scrollHeight; };
    const setRun = on => { running = on; btn("run").disabled = on; btn("check").disabled = on; btn("stop").disabled = !on; };
    const ask = () => new Promise((resolve, reject) => {
      pending = { resolve, reject }; form.hidden = false;
      write("\n⌨ Le programme attend ta réponse : tape-la ci-dessous puis Entrée.\n", "tip"); stdin.focus();
    });
    form.onsubmit = e => { e.preventDefault(); if (!pending) return; const v = stdin.value; stdin.value = ""; write(v + "\n", "in"); const p = pending; pending = null; form.hidden = true; p.resolve(v); };
    function showErr(err) {
      const d = PyRuntime.describe(err);
      if (d.name === "TimeLimitError") { write("\n⏱ Temps dépassé : le programme tourne sans fin (boucle infinie ?).\n", "err"); return; }
      write(`\n${d.name}${d.line ? ` (ligne ${d.line})` : ""}${d.msg ? ` : ${d.msg}` : ""}\n`, "err");
      if (PyRuntime.FR_ERR[d.name]) write("→ " + PyRuntime.FR_ERR[d.name] + "\n", "tip");
    }
    function stop() { PyRuntime.stop(); if (pending) { const p = pending; pending = null; form.hidden = true; p.reject(); } }
    async function run() {
      if (running || !window.Sk) return;
      setRun(true); verdict.hidden = true;
      write("\n$ python exercice.py\n", "sys");
      const r = await PyRuntime.run(code.value, { write, ask });
      if (!r.ok) showErr(r.err); else write("\n[terminé]\n", "sys");
      form.hidden = true; pending = null; setRun(false);
    }
    async function check() {
      if (running || !window.Sk) return;
      setRun(true); write("\n$ vérification de l'exercice\n", "sys");
      let spec = { inputs: ex.inputs, check: ex.check, extra: ex.extra }, res = true, n = 0;
      while (spec) {
        n++;
        if (spec.inputs) write(`test ${n} · réponses simulées : ${spec.inputs.map(x => JSON.stringify(x)).join(", ")}\n`, "sys");
        const r = await PyRuntime.run(code.value, { inputs: spec.inputs || [], write });
        if (!r.ok) { showErr(r.err); res = "Ton programme s'est arrêté sur une erreur. Lis le message dans la console."; break; }
        const c = spec.check(r.out, code.value);
        if (c !== true) { res = c; break; }
        spec = spec.extra;
      }
      verdict.hidden = false;
      if (res === true) {
        verdict.className = "pyverdict ok"; verdict.textContent = "✓ Exercice réussi ! Leçon validée.";
        write("✓ Tous les tests passent\n", "okl");
        markDone("python", l.id); const t = $("#done-tag"); if (t) t.textContent = "✓ Exercice réussi";
        askUnit("python", l);
      } else { verdict.className = "pyverdict no"; verdict.textContent = "✗ " + res; write("✗ " + res + "\n", "err"); }
      setRun(false);
    }
    btn("run").onclick = run; btn("check").onclick = check; btn("stop").onclick = stop;
    btn("clear").onclick = () => { out.innerHTML = ""; };
    /* Confirmation en deux clics (les boîtes confirm() ne sont pas fiables partout) */
    const twoStep = (el, label, action) => {
      const base = el.textContent; let armed = false, t = null;
      el.onclick = () => {
        if (!armed) { armed = true; el.textContent = label; t = setTimeout(() => { armed = false; el.textContent = base; }, 3000); return; }
        clearTimeout(t); armed = false; el.textContent = base; action();
      };
    };
    twoStep(btn("reset"), "Effacer mon code ? Cliquer encore", () => { code.value = ex.start; gut(); save(); });
    twoStep($("[data-load-sol]", root), "Remplacer mon code ? Cliquer encore", () => { code.value = ex.sol; gut(); save(); });
    cleanup = () => { stop(); clearTimeout(saveT); Store.update("python", s => { s.drafts[l.id] = code.value; }); };
    PyRuntime.load().then(() => { out.innerHTML = ""; write("Python est prêt. Écris ton code puis clique sur ▶ Exécuter.\n", "sys"); setRun(false); btn("stop").disabled = true; },
      e => { out.innerHTML = ""; write(e.message + "\n", "err"); });
  }

  /* ------------------------------------------------------------------ */
  /* Leçon SQL                                                            */
  /* ------------------------------------------------------------------ */
  const SQL_SHOW = 100;   // lignes affichées au plus dans l'atelier
  /* Ce que dit SQLite après une instruction qui ne renvoie pas de lignes */
  function sqlDoneMsg(step) {
    const s = step.sql.replace(/^(\s|--[^\n]*\n)+/, "").toUpperCase(), n = step.changes, pl = n > 1 ? "s" : "";
    if (/^INSERT/.test(s)) return `✓ ${n} ligne${pl} ajoutée${pl}`;
    if (/^UPDATE/.test(s)) return `✓ ${n} ligne${pl} modifiée${pl}`;
    if (/^DELETE/.test(s)) return `✓ ${n} ligne${pl} supprimée${pl}`;
    if (/^CREATE\s+(TEMP\w*\s+)?TABLE/.test(s)) return "✓ Table créée";
    if (/^CREATE\s+(TEMP\w*\s+)?VIEW/.test(s)) return "✓ Vue créée";
    if (/^CREATE\s+(UNIQUE\s+)?INDEX/.test(s)) return "✓ Index créé";
    if (/^CREATE\s+(TEMP\w*\s+)?TRIGGER/.test(s)) return "✓ Trigger créé";
    if (/^DROP/.test(s)) return "✓ Supprimé";
    if (/^ALTER/.test(s)) return "✓ Table modifiée";
    if (/^BEGIN/.test(s)) return "Transaction ouverte";
    if (/^(COMMIT|END)/.test(s)) return "✓ Transaction validée (COMMIT)";
    if (/^ROLLBACK/.test(s)) return "↺ Transaction annulée (ROLLBACK) : retour à l'état d'avant le BEGIN";
    return "✓ Instruction exécutée";
  }
  const sqlCell = v => v == null ? `<td class="null">NULL</td>` : `<td${typeof v === "number" ? ' class="num"' : ""}>${esc(typeof v === "number" ? Math.round(v * 1e6) / 1e6 : v instanceof Uint8Array ? "[données binaires]" : v)}</td>`;
  function sqlTable(step, max) {
    const rows = step.rows.slice(0, max), n = step.rows.length;
    return `<div class="sqlres-t"><table><thead><tr>${step.columns.map(c => `<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(sqlCell).join("")}</tr>`).join("") || `<tr><td class="none" colspan="${step.columns.length}">Aucune ligne</td></tr>`}</tbody></table></div>
<p class="sqlres-n">${step.more ? `Plus de ${n} lignes` : n + " ligne" + (n > 1 ? "s" : "")}${n > max ? ` · ${max} premières affichées` : ""}</p>`;
  }
  /* Rendu complet d'une exécution (atelier et exemples) */
  function sqlRender(r, max) {
    let h = r.steps.map(st => st.write ? `<p class="sqlres-msg">${esc(sqlDoneMsg(st))}</p>` : sqlTable(st, max)).join("");
    if (!r.ok) {
      const e = SqlRuntime.explain(r.err), many = r.steps.length > 0;
      h += `<div class="sqlres-err"><b>Erreur${many ? ` à l'instruction ${r.errIndex + 1}` : ""}</b> : ${esc(e.msg)}${e.tip ? `<p>→ ${esc(e.tip)}</p>` : ""}</div>`;
    }
    if (r.ok && !r.steps.length) h = `<p class="sqlres-msg">Rien à exécuter : écris une requête.</p>`;
    return h;
  }
  function schemaHtml(setup) {
    try {
      return SqlRuntime.schema(setup).map(t => `<div class="schema-t"><b>${esc(t.name)}</b> <span class="note">${t.n} ligne${t.n > 1 ? "s" : ""}</span><ul>${t.cols.map(c => `<li><code>${esc(c.name)}</code> <span>${esc((c.type || "").toLowerCase())}${c.pk ? " · clé primaire" : ""}</span></li>`).join("")}</ul></div>`).join("");
    } catch (e) { return `<p class="note">Le schéma n'a pas pu s'afficher.</p>`; }
  }

  function pageSqlLesson(id) {
    const idx = SQ_LESSONS.findIndex(l => l.id === id);
    if (idx < 0) return pageNotFound();
    const l = SQ_LESSONS[idx], prev = SQ_LESSONS[idx - 1], next = SQ_LESSONS[idx + 1], ex = l.exercise;
    Store.update("sql", s => { s.last = l.id; });
    setTitle(l.title);
    app().innerHTML = `
<div class="crumbs-bar"><a href="#/">Accueil</a><span>/</span><a href="#/sql">SQL</a><span>/</span><span>Leçon ${idx + 1}</span></div>
<header class="lesson-head sq">
  <span class="big-n" aria-hidden="true">${String(idx + 1).padStart(2, "0")}</span>
  <span class="eyebrow">Partie ${l.part + 1} · ${esc(SQ.parts[l.part].title)} · leçon ${idx + 1} sur ${SQ_LESSONS.length}</span>
  <h1>${esc(l.title)}</h1>
  <div class="meta"><span>≈ ${l.minutes} min</span><span>Repère CS50 SQL : semaine ${l.cs50} « ${esc(CS50_WEEKS[l.cs50])} »</span><button type="button" class="btn ghost small" data-goto-bench>↓ Aller à l'exercice</button><span id="done-tag">${isDone("sql", l.id) ? "✓ Exercice réussi" : ""}</span></div>
</header>
<p class="objective"><b>Objectif</b>${esc(l.goal)}</p>
<div class="py-layout">
  <article class="py-text">
    <div class="box why"><b class="tag">Pourquoi c'est utile</b>${l.why}</div>
    ${l.sections.map(s => `<section class="stack"><h2 class="section-title">${esc(s.h)}</h2><div class="lesson">${s.html}</div></section>`).join("")}
    <div class="box pitfall"><b class="tag">Erreurs fréquentes</b><ul>${l.pitfalls.map(p => `<li>${p}</li>`).join("")}</ul></div>
    <div class="box remember"><b class="tag">L'essentiel à retenir</b><ul>${l.remember.map(p => `<li>${esc(p)}</li>`).join("")}</ul></div>
    <section class="stack"><h2 class="section-title">Vérifie que tu as compris</h2>${quizHtml(l.quiz, "q-" + l.id)}</section>
    <nav class="pager">${prev ? `<a class="btn" href="#/sql/${prev.id}">← ${esc(prev.title)}</a>` : "<span></span>"}${next ? `<a class="btn primary" href="#/sql/${next.id}">${esc(next.title)} →</a>` : `<a class="btn primary" href="#/sql">Retour au sommaire</a>`}</nav>
  </article>
  <aside class="bench" aria-label="Atelier">
    <div class="task"><span class="tag">Exercice</span><div>${ex.task}</div>
      <details class="schema"><summary>Les tables de la base</summary><div class="schema-list"><p class="note">Chargement…</p></div></details>
      <details><summary>Un indice</summary><p>${esc(ex.hint)}</p></details>
      <details data-sol><summary>Voir une solution</summary><p class="note">Essaie vraiment avant d'ouvrir : c'est en cherchant qu'on apprend.</p><button class="btn small" type="button" data-load-sol>Mettre la solution dans l'éditeur</button></details>
    </div>
    <div class="pane">
      <div class="pane-head"><span class="t">requete.sql</span><div class="row"><button class="btn small" type="button" data-act="reset">Réinitialiser</button><button class="btn small primary" type="button" data-act="run" disabled>▶ Exécuter</button><button class="btn small check" type="button" data-act="check" disabled>✓ Vérifier</button></div></div>
      <div class="editor"><div class="gutter">1</div><textarea class="code-area" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Éditeur de requêtes SQL"></textarea></div>
      <div class="kbd">Ctrl/⌘ + Entrée pour exécuter · chaque exécution repart de la base d'origine</div>
    </div>
    <div class="pane term">
      <div class="pane-head"><span class="t">Résultat</span><div class="row"><button class="btn small" type="button" data-act="clear">Effacer</button></div></div>
      <div class="out sqlout" aria-live="polite"><span class="sys">Chargement de SQLite…</span></div>
    </div>
    <div class="pyverdict" hidden></div>
  </aside>
</div>`;
    const root = app();
    wireReveals(root);
    wireQuiz(root, l.quiz, "sql", l.id);
    wireSqlBench(root, l);
    $("[data-goto-bench]", root).onclick = () => $(".bench", root).scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function wireSqlBench(root, l) {
    const ex = Object.assign({ setup: l.setup }, l.exercise);
    const code = $(".code-area", root), gutter = $(".gutter", root), out = $(".out", root), verdict = $(".pyverdict", root);
    const btn = a => $(`[data-act="${a}"]`, root);
    const st = Store.get("sql");
    code.value = st.drafts[l.id] != null ? st.drafts[l.id] : ex.start;
    let ready = false, saveT = null;
    const gut = () => { gutter.textContent = Array.from({ length: code.value.split("\n").length }, (_, i) => i + 1).join("\n"); };
    gut();
    const save = () => { clearTimeout(saveT); saveT = setTimeout(() => Store.update("sql", s => { s.drafts[l.id] = code.value; }), 600); };
    const setCode = v => { code.value = v; gut(); save(); };
    code.addEventListener("input", () => { gut(); save(); });
    code.addEventListener("scroll", () => { gutter.scrollTop = code.scrollTop; });
    code.addEventListener("keydown", e => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); run(); return; }
      if (e.key === "Tab") { e.preventDefault(); const s = code.selectionStart; code.value = code.value.slice(0, s) + "  " + code.value.slice(code.selectionEnd); code.selectionStart = code.selectionEnd = s + 2; gut(); save(); return; }
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); const s = code.selectionStart, ls = code.value.lastIndexOf("\n", s - 1) + 1, ind = code.value.slice(ls, s).match(/^ */)[0];
        code.value = code.value.slice(0, s) + "\n" + ind + code.value.slice(code.selectionEnd); code.selectionStart = code.selectionEnd = s + 1 + ind.length; gut(); save();
      }
    });
    const show = html => { out.innerHTML = html; out.scrollTop = 0; };
    const setReady = on => { ready = on; btn("run").disabled = !on; btn("check").disabled = !on; };
    function execute() {
      const db = SqlRuntime.fresh(ex.setup);
      try { return SqlRuntime.run(db, code.value); } finally { db.close(); }
    }
    function run() {
      if (!ready) return;
      verdict.hidden = true;
      show(sqlRender(execute(), SQL_SHOW));
    }
    function check() {
      if (!ready) return;
      const r = execute();
      show(sqlRender(r, SQL_SHOW));
      let g;
      try { g = SqlRuntime.grade(ex, code.value); } catch (e) { g = { ok: false, msg: "La vérification a rencontré un problème : " + ((e && e.message) || e) }; }
      verdict.hidden = false;
      if (g.ok) {
        verdict.className = "pyverdict ok"; verdict.textContent = "✓ Exercice réussi ! Leçon validée.";
        markDone("sql", l.id); const t = $("#done-tag"); if (t) t.textContent = "✓ Exercice réussi";
        askUnit("sql", l);
      } else { verdict.className = "pyverdict no"; verdict.textContent = "✗ " + g.msg; }
    }
    btn("run").onclick = run; btn("check").onclick = check;
    btn("clear").onclick = () => { out.innerHTML = ""; };
    const twoStep = (el, label, action) => {
      const base = el.textContent; let armed = false, t = null;
      el.onclick = () => {
        if (!armed) { armed = true; el.textContent = label; t = setTimeout(() => { armed = false; el.textContent = base; }, 3000); return; }
        clearTimeout(t); armed = false; el.textContent = base; action();
      };
    };
    twoStep(btn("reset"), "Effacer mon code ? Cliquer encore", () => setCode(ex.start));
    twoStep($("[data-load-sol]", root), "Remplacer mon code ? Cliquer encore", () => setCode(ex.sol));
    cleanup = () => { clearTimeout(saveT); Store.update("sql", s => { s.drafts[l.id] = code.value; }); };

    /* Les exemples de la leçon : exécutés pour de vrai, avec un bouton pour les reprendre dans l'éditeur */
    function wireExamples() {
      $$("pre.sqlx", root).forEach(pre => {
        const sql = pre.textContent;
        const box = document.createElement("div"); box.className = "sqlres";
        let r; const db = SqlRuntime.fresh(ex.setup);
        try { r = SqlRuntime.run(db, sql); } finally { db.close(); }
        box.innerHTML = `<div class="sqlres-head"><span>Résultat</span><button type="button" class="btn ghost small" data-try>Essayer dans l'éditeur</button></div>${sqlRender(r, 8)}`;
        pre.after(box);
        const tb = $("[data-try]", box);
        const load = () => { setCode(sql); code.focus({ preventScroll: true }); $(".bench", root).scrollIntoView({ behavior: "smooth", block: "start" }); run(); };
        const untouched = () => !code.value.trim() || code.value.trim() === ex.start.trim() || code.value.trim() === sql.trim();
        let armed = false, t = null;
        tb.onclick = () => {
          if (untouched() || armed) { clearTimeout(t); armed = false; tb.textContent = "Essayer dans l'éditeur"; load(); return; }
          armed = true; tb.textContent = "Remplacer ton code ? Cliquer encore"; t = setTimeout(() => { armed = false; tb.textContent = "Essayer dans l'éditeur"; }, 3000);
        };
      });
    }
    SqlRuntime.load().then(() => {
      show(`<span class="sys">SQLite est prêt. Écris ta requête puis clique sur ▶ Exécuter.</span>`);
      $(".schema-list", root).innerHTML = schemaHtml(ex.setup);
      setReady(true);
      try { wireExamples(); } catch (e) { /* les exemples restent lisibles sans résultat */ }
    }, e => { show(`<span class="err">${esc(e.message)}</span>`); });
  }

  /* ------------------------------------------------------------------ */
  /* Module Machine Learning                                              */
  /* ------------------------------------------------------------------ */
  function detailBoxes(d, where) {
    let h = "";
    if (where === "before" && d.plain) h += `<div class="box plain"><b class="tag">En clair</b>${d.plain}</div>`;
    if (where === "after") {
      if (d.steps) h += `<div class="box steps"><b class="tag">${esc(d.stepsTitle || "Pas à pas")}</b>${d.steps}</div>`;
      if (d.pitfall) h += `<div class="box pitfall"><b class="tag">Piège fréquent</b>${d.pitfall}</div>`;
    }
    return h;
  }
  function pageMlModule(id) {
    const idx = ML_MODS.findIndex(m => m.id === id);
    if (idx < 0) return pageNotFound();
    const m = ML_MODS[idx], prev = ML_MODS[idx - 1], next = ML_MODS[idx + 1], d = m.detail || {};
    Store.update("ml", s => { s.last = m.id; });
    setTitle(m.title);
    const done = isDone("ml", m.id), sc = (Store.get("ml").units[m.id] || {}).score;
    const k = "mod-" + m.id;
    const blocks = m.blocks.map((b, i) => {
      const bd = b.detail || {};
      return `<section class="block" id="b${i + 1}"><div class="bn">${String(idx + 1).padStart(2, "0")}.${i + 1}</div><div class="bb">
  <h3>${esc(b.title)}</h3>
  ${detailBoxes(bd, "before")}
  <div class="lesson">${b.html}</div>
  ${b.example ? `<div class="example"><b>Exemple</b>${esc(b.example)}</div>` : ""}
  ${detailBoxes(bd, "after")}
  ${b.demo ? `<div class="demo-host" data-demo="${b.demo}" data-key="${m.id}-${i}"></div>` : ""}
  ${b.after ? `<div class="lesson">${b.after}</div>` : ""}
  ${b.ml ? `<div class="mlnote"><b>Le lien avec le machine learning</b>${esc(b.ml)}</div>` : ""}
  ${b.recall ? `<div class="recall"><div class="qh"><span class="eyebrow">Question de rappel</span></div><div class="qt">${esc(b.recall.q)}</div><textarea aria-label="Ta réponse" placeholder="Réponds de mémoire, avec tes mots, avant de regarder."></textarea><button class="btn small reveal-btn" type="button" data-reveal="${k}-r${i}">Voir la réponse</button><div class="answer" id="${k}-r${i}" hidden>${esc(b.recall.a)}</div></div>` : ""}
</div></section>`;
    }).join("");
    app().innerHTML = `
<div class="ml-col">
<div class="crumbs-bar"><a href="#/">Accueil</a><span>/</span><a href="#/ml">Machine Learning</a><span>/</span><span>${mlLabel(m)}</span></div>
<header class="lesson-head ${m.track === "maths" ? "maths" : ""}">
  <span class="big-n" aria-hidden="true">${String(idx + 1).padStart(2, "0")}</span>
  <span class="eyebrow">${mlLabel(m)} · étape ${idx + 1} sur ${ML_MODS.length}${m.track === "maths" ? " · prépare le module suivant" : ""}</span>
  <h1>${esc(m.title)}</h1>
  <div class="meta"><span>≈ ${m.minutes || 30} min</span><span>${esc(m.kind || "")}</span>${done ? `<span>✓ Terminé${sc != null ? ` · quiz ${sc} %` : ""}</span>` : ""}</div>
</header>
<p class="objective"><b>Objectif</b>${esc(m.objective)}</p>
${d.intro ? `<div class="box plain"><b class="tag">De quoi parle ce module, en clair</b>${d.intro}</div>` : ""}
${d.prereq ? `<div class="box why"><b class="tag">Ce qu'il faut savoir avant</b>${d.prereq}</div>` : ""}
${m.pre ? `<div class="recall"><div class="qh"><span class="eyebrow">Avant de commencer · devine</span></div><div class="qt">${esc(m.pre.q)}</div><p class="note">Ce n'est pas grave de se tromper : essayer de deviner avant d'apprendre aide à retenir.</p><button class="btn small reveal-btn" type="button" data-reveal="${k}-pre">Voir la réponse</button><div class="answer" id="${k}-pre" hidden>${esc(m.pre.a)}</div></div>` : ""}
<div class="stack" style="gap:2rem">${blocks}</div>
${m.keypoints && m.keypoints.length ? `<section class="panel stack"><h2 class="section-title">Vérifie que tu sais répondre</h2><p class="note">Sans regarder plus haut. Si une question te bloque, relis la section concernée.</p><ul class="checklist">${m.keypoints.map((p, i) => `<li><label><input type="checkbox"> <span>${esc(p)}</span></label></li>`).join("")}</ul></section>` : ""}
${m.cards && m.cards.length ? `<section class="stack"><h2 class="section-title">Mots-clés du module</h2><p class="note">Lis la question, réponds dans ta tête, puis clique pour retourner la carte.</p><div class="kw">${m.cards.map(c => `<button type="button" data-card><span class="f">${esc(c.f)}</span><span class="b" hidden>${esc(c.b)}</span><span class="hintf">Cliquer pour retourner</span></button>`).join("")}</div></section>` : ""}
${m.feynman ? `<section class="panel stack"><h2 class="section-title">Explique-le avec tes mots</h2><p class="lesson">${esc(m.feynman.prompt)}</p><textarea aria-label="Ton explication" style="min-height:7rem" placeholder="Comme si tu l'expliquais à un ami. Si tu bloques sur un passage, c'est lui qu'il faut revoir."></textarea><button class="btn small reveal-btn" type="button" data-reveal="${k}-fey" data-show="Voir les points à ne pas oublier" data-hide="Masquer">Voir les points à ne pas oublier</button><div class="answer" id="${k}-fey" hidden><ul class="pts">${m.feynman.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul></div></section>` : ""}
${m.quiz && m.quiz.length ? `<section class="stack"><h2 class="section-title">Quiz du module</h2>${quizHtml(m.quiz, "mq-" + m.id)}</section>` : ""}
<div id="finish"></div>
<nav class="pager">${prev ? `<a class="btn" href="#/ml/${prev.id}">← ${esc(prev.title)}</a>` : "<span></span>"}${next ? `<a class="btn primary" href="#/ml/${next.id}">${esc(next.title)} →</a>` : `<a class="btn primary" href="#/ml">Retour au sommaire</a>`}</nav>
</div>`;
    const root = app();
    wireReveals(root);
    $$("[data-card]", root).forEach(b => b.onclick = () => { const back = $(".b", b), h = $(".hintf", b); back.hidden = !back.hidden; h.textContent = back.hidden ? "Cliquer pour retourner" : "Cliquer pour cacher"; });
    const finish = $("#finish");
    const paintFinish = pct => {
      const dn = isDone("ml", m.id);
      finish.innerHTML = dn ? `<div class="done-box">✓ Module terminé${pct != null ? ` · quiz ${pct} %` : ""}${next ? ` — <a href="#/ml/${next.id}">continuer avec ${esc(next.title)}</a>` : ""}</div>`
        : `<div class="panel row" style="justify-content:space-between"><span class="note">${pct == null ? "Fais le quiz pour valider le module, ou marque-le comme terminé." : pct >= 50 ? "Quiz réussi. Tu peux valider le module." : "Score encore fragile : relis les sections ratées, ou valide quand même si tu te sens prêt."}</span><button class="btn primary" type="button" data-finish>Marquer comme terminé</button></div>`;
      const fb = $("[data-finish]", finish); if (fb) fb.onclick = () => { markDone("ml", m.id, { score: pct }); paintFinish(pct); askUnit("ml", m); };
    };
    paintFinish(sc != null ? sc : null);
    wireQuiz(root, m.quiz || [], "ml", m.id, pct => { if (pct >= 50 && !isDone("ml", m.id)) { markDone("ml", m.id, { score: pct }); askUnit("ml", m); } else Store.update("ml", s => { const u = s.units[m.id] || {}; u.score = Math.max(u.score || 0, pct); s.units[m.id] = u; }); paintFinish(pct); });
    $$(".demo-host[data-demo]", root).forEach(h => { const f = window.DEMO && window.DEMO[h.dataset.demo]; if (f) { try { f(h); } catch (e) { h.innerHTML = `<p class="note">La démo n'a pas pu s'afficher.</p>`; } } });
    if (location.hash.indexOf("#b") > 0) { /* ancre éventuelle */ }
  }

  /* ------------------------------------------------------------------ */
  /* Démarrage                                                            */
  /* ------------------------------------------------------------------ */
  async function boot() {
    if (!Store.cloud) $("#demo-banner").hidden = false;
    $("#site-name").textContent = CFG.siteName;
    try { await Store.init(); }
    catch (e) { app().innerHTML = `<div class="empty">${esc(e.message)} Recharge la page.</div>`; return; }
    Store.onStatus(paintStatus);
    Store.onAuth(() => { const h = location.hash; if (Store.user && h === "#/connexion") afterLogin(); else route(); });
    window.addEventListener("hashchange", route);
    route();
  }
  boot();
})();
