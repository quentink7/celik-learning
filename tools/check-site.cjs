// Contrôles d'avant mise en ligne, dans un vrai navigateur, avec les en-têtes de sécurité du site.
//   1. lancer : python3 tools/serve.py 8014 --demo   (et, pour la page de connexion : python3 tools/serve.py 8015)
//   2. puis   : PPTR=<chemin de puppeteer-core> node tools/check-site.cjs [dossier pour les captures]
// Vérifie : 16 exercices Python, 16 SQL et 16 C (solution = réussi, départ = refusé), exemples SQL et C,
// 16 modules ML sans erreur, les 16 tests de fin de partie et les verrous (leçon fermée, ouverte après l'exercice,
// test raté puis réussi), aucun débordement à 390 px (clair et sombre), aucune violation CSP, aucune erreur JS.
// ONLY=python,sql,c,ml,tests,layout limite les contrôles.
const puppeteer = require(process.env.PPTR || "puppeteer-core");
const DEMO = process.env.DEMO || "http://127.0.0.1:8014/", CLOUD = process.env.CLOUD || "http://127.0.0.1:8015/";
const OUT = process.argv[2];
const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const wait = ms => new Promise(r => setTimeout(r, ms));
const EXPECTED_SQL_ERR = { s11: 4, s13: 1 };   // exemples qui montrent exprès une erreur (contraintes)
const EXPECTED_C_ERR = { c01: 1 };               // exemple qui montre exprès une erreur de compilation
let failed = false;
const report = (ok, line) => { if (!ok) failed = true; console.log((ok ? "✓ " : "✗ ") + line); };

(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
  const pg = await b.newPage();
  await pg.setViewport({ width: 1280, height: 900 });
  const issues = [];
  pg.on("pageerror", e => issues.push("pageerror: " + e + " @ " + pg.url()));
  pg.on("console", m => { if (m.type() === "error") issues.push("console: " + m.text() + " @ " + pg.url()); });
  await pg.evaluateOnNewDocument(() => {
    window.__csp = []; try { sessionStorage.setItem("celik:fb-site-later", "1"); } catch (e) {}
    try {   // tout ouvrir : frontière au bout de chaque cours, et les premières parties réussies pour afficher un test
      const d = { done: true, score: 0, at: 1 }, part1 = { python: ["p01", "p02", "p03", "p04", "p05"], sql: ["s01", "s02", "s03", "s04", "s05"], ml: [], c: [] };
      Object.keys(part1).forEach(c => {
        const k = "celik:demo:" + c; if (localStorage.getItem(k)) return;
        const units = { _open: { done: false, score: 16, at: 1 } }; part1[c].forEach(id => { units[id] = d; });
        localStorage.setItem(k, JSON.stringify({ units, drafts: {}, quiz: {}, last: null, updated: 1 }));
      });
    } catch (e) {}
    document.addEventListener("securitypolicyviolation", e => window.__csp.push(e.violatedDirective + " ← " + (e.blockedURI || "inline")));
  });
  const csp = new Set();
  const grabCsp = async () => (await pg.evaluate(() => window.__csp || [])).forEach(x => csp.add(x));
  const open = async url => { await pg.goto("about:blank"); await pg.goto(url, { waitUntil: "networkidle0" }); };
  const closeFeedback = () => pg.evaluate(() => { const o = document.querySelector(".fb-overlay [data-fb='later']"); if (o) o.click(); });

  const ONLY = (process.env.ONLY || "").split(",").filter(Boolean), want = k => !ONLY.length || ONLY.includes(k);
  // ---------- Python ----------
  await open(DEMO);
  if (want("python")) {
  const pyIds = await pg.evaluate(() => window.COURSE_PYTHON.parts.flatMap(p => p.lessons.map(l => l.id)));
  const py = [];
  for (const id of pyIds) {
    const res = {};
    for (const which of ["sol", "start"]) {
      await open(DEMO + "#/python/" + id);
      await pg.waitForFunction(() => { const b = document.querySelector('[data-act="check"]'); return b && !b.disabled; }, { timeout: 30000 });
      await pg.evaluate(w => {
        const l = window.COURSE_PYTHON.parts.flatMap(p => p.lessons).find(x => x.id === location.hash.split("/")[2]);
        const ta = document.querySelector(".code-area"); ta.value = w === "sol" ? l.exercise.sol : l.exercise.start;
        ta.dispatchEvent(new Event("input", { bubbles: true }));
      }, which);
      await pg.click('[data-act="check"]');
      await pg.waitForFunction(() => { const v = document.querySelector(".pyverdict"); return v && !v.hidden; }, { timeout: 30000 });
      res[which] = await pg.evaluate(() => ({ ok: document.querySelector(".pyverdict").classList.contains("ok"), t: document.querySelector(".pyverdict").textContent }));
      await closeFeedback();
    }
    py.push({ id, sol: res.sol.ok, start: res.start.ok, msg: res.sol.ok ? "" : res.sol.t });
  }
  const pyBad = py.filter(r => !r.sol || r.start);
  report(!pyBad.length, `Python : ${py.length} exercices · solution réussie ${py.filter(r => r.sol).length}/${py.length} · départ refusé ${py.filter(r => !r.start).length}/${py.length}` + (pyBad.length ? " · ÉCARTS " + JSON.stringify(pyBad) : ""));
  await grabCsp();
  }

  if (want("sql")) {
  // ---------- SQL ----------
  const sqlIds = await pg.evaluate(() => window.COURSE_SQL.parts.flatMap(p => p.lessons.map(l => l.id)));
  const sq = [];
  for (const id of sqlIds) {
    await open(DEMO + "#/sql/" + id);
    await pg.waitForFunction(() => { const b = document.querySelector('[data-act="check"]'); return b && !b.disabled && document.querySelectorAll(".sqlres").length === document.querySelectorAll("pre.sqlx").length; }, { timeout: 30000 });
    const ex = await pg.evaluate(() => ({ n: document.querySelectorAll("pre.sqlx").length, err: document.querySelectorAll(".py-text .sqlres-err").length }));
    const res = {};
    for (const which of ["start", "sol"]) {
      await pg.evaluate(w => {
        const l = window.COURSE_SQL.parts.flatMap(p => p.lessons).find(x => x.id === location.hash.split("/")[2]);
        const ta = document.querySelector(".code-area"); ta.value = w === "sol" ? l.exercise.sol : l.exercise.start;
        ta.dispatchEvent(new Event("input", { bubbles: true }));
        document.querySelector('[data-act="check"]').click();
      }, which);
      await pg.waitForFunction(() => !document.querySelector(".pyverdict").hidden, { timeout: 30000 });
      res[which] = await pg.evaluate(() => document.querySelector(".pyverdict").classList.contains("ok"));
      await closeFeedback();
    }
    sq.push({ id, examples: ex.n, errEx: ex.err, expected: EXPECTED_SQL_ERR[id] || 0, sol: res.sol, start: res.start });
  }
  const sqBad = sq.filter(r => !r.sol || r.start || r.errEx !== r.expected);
  report(!sqBad.length, `SQL : ${sq.length} exercices · solution réussie ${sq.filter(r => r.sol).length}/${sq.length} · départ refusé ${sq.filter(r => !r.start).length}/${sq.length} · ${sq.reduce((s, r) => s + r.examples, 0)} exemples exécutés` + (sqBad.length ? " · ÉCARTS " + JSON.stringify(sqBad) : ""));
  await grabCsp();
  }

  if (want("c")) {
  // ---------- C ----------
  const cIds = await pg.evaluate(() => window.COURSE_C.parts.flatMap(p => p.lessons.map(l => l.id)));
  const cr = [];
  for (const id of cIds) {
    await open(DEMO + "#/c/" + id);
    await pg.waitForFunction(() => { const b = document.querySelector('[data-act="check"]'); return b && !b.disabled && document.querySelectorAll(".cres").length === document.querySelectorAll("pre.cx").length; }, { timeout: 60000 });
    const ex = await pg.evaluate(() => ({ n: document.querySelectorAll("pre.cx").length, err: document.querySelectorAll(".py-text .cres-err").length, crash: document.querySelectorAll(".py-text .cres-msg.err").length }));
    const res = {};
    for (const which of ["start", "sol"]) {
      await pg.evaluate(w => {
        const l = window.COURSE_C.parts.flatMap(p => p.lessons).find(x => x.id === location.hash.split("/")[2]);
        const ta = document.querySelector(".code-area"); ta.value = w === "sol" ? l.exercise.sol : l.exercise.start;
        ta.dispatchEvent(new Event("input", { bubbles: true }));
        document.querySelector('[data-act="check"]').click();
      }, which);
      await pg.waitForFunction(() => !document.querySelector(".pyverdict").hidden, { timeout: 60000 });
      res[which] = await pg.evaluate(() => ({ ok: document.querySelector(".pyverdict").classList.contains("ok"), t: document.querySelector(".pyverdict").textContent }));
      await closeFeedback();
    }
    cr.push({ id, examples: ex.n, errEx: ex.err, crash: ex.crash, expected: EXPECTED_C_ERR[id] || 0, sol: res.sol.ok, start: res.start.ok, msg: res.sol.ok ? "" : res.sol.t });
  }
  const cBad = cr.filter(r => !r.sol || r.start || r.errEx !== r.expected || r.crash);
  report(!cBad.length, `C : ${cr.length} exercices · solution réussie ${cr.filter(r => r.sol).length}/${cr.length} · départ refusé ${cr.filter(r => !r.start).length}/${cr.length} · ${cr.reduce((s, r) => s + r.examples, 0)} exemples compilés et exécutés` + (cBad.length ? " · ÉCARTS " + JSON.stringify(cBad) : ""));
  await grabCsp();
  }

  if (want("ml")) {
  // ---------- ML ----------
  const mlIds = ["m1","a1","a2","m2","a3","a4","m3","a5","m4","a6","m5","m6","m7","a7","m8","m9"];
  const before = issues.length; let demos = 0, canvases = 0; const noTitle = [];
  for (const id of mlIds) {
    await open(DEMO + "#/ml/" + id); await wait(400);
    const r = await pg.evaluate(() => ({ h1: !!document.querySelector("h1"), demos: document.querySelectorAll(".demo-host").length, canvases: document.querySelectorAll(".demo-host canvas").length }));
    if (!r.h1) noTitle.push(id);
    demos += r.demos; canvases += r.canvases;
  }
  report(!noTitle.length && issues.length === before, `ML : ${mlIds.length} modules · ${demos} démos, ${canvases} canvas · erreurs : ${issues.length - before}${noTitle.length ? " · sans titre : " + noTitle : ""}`);
  await grabCsp();
  }

  // ---------- Pages des cours : encadré des sources ----------
  const src = [];
  for (const c of ["python", "ml", "sql", "c"]) { await open(DEMO + "#/" + c); src.push(c + ":" + (await pg.evaluate(() => !!document.querySelector(".box.source")))); }
  report(src.every(s => s.endsWith("true")), "Sources affichées sur les pages des cours : " + src.join(" "));

  if (want("layout")) {
  // ---------- 390 px, clair et sombre ----------
  await pg.setViewport({ width: 390, height: 844, isMobile: true });
  const wide = [];
  for (const scheme of ["light", "dark"]) {
    await pg.emulateMediaFeatures([{ name: "prefers-color-scheme", value: scheme }]);
    for (const h of ["#/", "#/python", "#/python/p16", "#/ml", "#/ml/m5", "#/ml/a6", "#/sql", "#/sql/s08", "#/sql/s16", "#/c", "#/c/c09", "#/c/c16", "#/python/bilan1", "#/sql/bilan1", "#/c/bilan4"]) {
      await open(DEMO + h); await wait(600);
      const w = await pg.evaluate(() => document.documentElement.scrollWidth);
      if (w > 390) wide.push(scheme + " " + h + " → " + w + "px");
    }
    if (OUT) for (const [h, name] of [["#/ml/m5", "m5"], ["#/python/p16", "p16"], ["#/c/c08", "c08"], ["#/", "home"], ["#/sql/bilan1", "test"], ["#/c/bilan4", "ferme"], ["#/python", "sommaire"]]) { await open(DEMO + h); await wait(700); await pg.screenshot({ path: `${OUT}/${name}-390-${scheme}.png` }); }
  }
  report(!wide.length, "390 px : " + (wide.length ? "DÉBORDE " + wide.join(", ") : "aucun défilement horizontal (15 pages × 2 thèmes)"));
  await grabCsp();
  }

  if (want("tests")) {
  // ---------- Tests de fin de partie : contenu ----------
  await pg.setViewport({ width: 1280, height: 900 });
  await open(DEMO);
  const data = await pg.evaluate(() => {
    const T = window.COURSE_TESTS || {}, bad = []; let n = 0;
    const partsOf = c => c === "ml" ? window.ML_PARTS.map(p => p.ids) : ({ python: window.COURSE_PYTHON, sql: window.COURSE_SQL, c: window.COURSE_C })[c].parts.map(p => p.lessons.map(l => l.id));
    ["python", "ml", "sql", "c"].forEach(c => {
      const parts = partsOf(c), tests = T[c] || [];
      if (tests.length !== parts.length) bad.push(c + " : " + tests.length + " tests pour " + parts.length + " parties");
      tests.forEach((t, pi) => {
        if (t.questions.length !== 10) bad.push(c + " partie " + (pi + 1) + " : " + t.questions.length + " questions");
        t.questions.forEach((q, i) => {
          n++; const tag = c + " " + (pi + 1) + "." + (i + 1);
          if (!q.q || !Array.isArray(q.options) || q.options.length !== 4 || new Set(q.options).size !== 4) bad.push(tag + " : options");
          if (!(q.answer >= 0 && q.answer < 4)) bad.push(tag + " : réponse");
          if (!q.explain) bad.push(tag + " : explication manquante");
          if (!(parts[pi] || []).includes(q.lesson)) bad.push(tag + " : leçon " + q.lesson + " hors de la partie");
          if (q.ctx && !t.context) bad.push(tag + " : contexte manquant");
        });
      });
    });
    return { n, bad };
  });
  report(!data.bad.length, `Tests de fin de partie : ${data.n} questions` + (data.bad.length ? " · ÉCARTS " + JSON.stringify(data.bad.slice(0, 8)) : " · 4 options, une bonne réponse, une explication et une leçon de la partie pour chacune"));

  // ---------- Verrous : un élève neuf, dans un contexte neuf ----------
  const ctx = await (b.createBrowserContext ? b.createBrowserContext() : b.createIncognitoBrowserContext());
  const p2 = await ctx.newPage();
  await p2.setViewport({ width: 1280, height: 900 });
  p2.on("pageerror", e => issues.push("pageerror: " + e + " @ " + p2.url()));
  await p2.evaluateOnNewDocument(() => { try { sessionStorage.setItem("celik:fb-site-later", "1"); } catch (e) {} });
  const open2 = async h => { await p2.goto("about:blank"); await p2.goto(DEMO + h, { waitUntil: "networkidle0" }); };
  const locked = () => p2.evaluate(() => !!document.querySelector(".locked-page"));
  const fwd = () => p2.evaluate(() => { const el = document.querySelector("#pager").lastElementChild; return { tag: el.tagName, text: el.textContent.trim() }; });
  const L = [];
  await open2("#/python/p02"); L.push(["leçon 2 fermée au départ", await locked()]);
  await open2("#/python/bilan1"); L.push(["test 1 fermé au départ", await locked()]);
  await open2("#/ml/a1"); L.push(["module 2 fermé au départ", await locked()]);
  await open2("#/ml/m1"); L.push(["plus de bouton « Marquer comme terminé »", await p2.evaluate(() => !document.querySelector("[data-finish]") && !!document.querySelector("#finish .panel"))]);
  await open2("#/python/p01");
  await p2.waitForFunction(() => { const x = document.querySelector('[data-act="check"]'); return x && !x.disabled; }, { timeout: 30000 });
  L.push(["bas de page fermé avant l'exercice", (await fwd()).tag === "SPAN"]);
  await p2.evaluate(() => { const l = window.COURSE_PYTHON.parts[0].lessons[0], ta = document.querySelector(".code-area"); ta.value = l.exercise.sol; ta.dispatchEvent(new Event("input", { bubbles: true })); document.querySelector('[data-act="check"]').click(); });
  await p2.waitForFunction(() => { const v = document.querySelector(".pyverdict"); return v && !v.hidden; }, { timeout: 30000 });
  L.push(["bas de page ouvert après l'exercice", (await fwd()).tag === "A"]);
  await open2("#/python/p02"); L.push(["leçon 2 ouverte après l'exercice", !(await locked())]);
  await open2("#/python/p03"); L.push(["leçon 3 toujours fermée", await locked()]);
  // Partie 1 réussie (état posé à la main), puis le test : raté à 6 / 10, réussi à 7 / 10.
  await p2.evaluate(() => { const d = { done: true, score: 0, at: 1 }, units = {}; ["p01", "p02", "p03", "p04", "p05"].forEach(id => { units[id] = d; }); localStorage.setItem("celik:demo:python", JSON.stringify({ units, drafts: {}, quiz: {}, last: "p05", updated: Date.now() })); });
  await open2("#/python/p06"); L.push(["partie 2 fermée avant le test", await locked()]);
  await open2("#/python/bilan1");
  const answer = good => p2.evaluate(g => { const qs = window.COURSE_TESTS.python[0].questions; document.querySelectorAll("#test-zone .qcard").forEach((card, n) => { const q = qs[+card.dataset.qi]; card.querySelector(`.opt[data-j="${n < g ? q.answer : (q.answer + 1) % 4}"]`).click(); }); document.querySelector("#test-submit").click(); }, good);
  await answer(6);
  const fail = await p2.evaluate(() => ({ box: !!document.querySelector(".test-fail"), shown: document.querySelectorAll("#test-zone .opt.right").length, links: document.querySelectorAll("#test-zone .tfb.ko a").length }));
  L.push(["test raté à 6 / 10, bonnes réponses cachées, 4 leçons à revoir", fail.box && fail.shown === 6 && fail.links === 4 && (await fwd()).tag === "SPAN"]);
  await p2.evaluate(() => document.querySelector("[data-again]").click());
  await answer(7);
  L.push(["test réussi à 7 / 10", await p2.evaluate(() => !!document.querySelector("#test-result .done-box") && document.querySelectorAll("#test-zone .tfb p").length === 10) && (await fwd()).tag === "A"]);
  await open2("#/python/p06"); L.push(["partie 2 ouverte après le test", !(await locked())]);
  // Un ancien élève garde ce qu'il avait ouvert, même après être revenu en arrière.
  await p2.evaluate(() => { const d = { done: true, score: 0, at: 1 }; localStorage.setItem("celik:demo:c", JSON.stringify({ units: { c01: d, c02: d }, drafts: {}, quiz: {}, last: "c09", updated: Date.now() })); });
  await open2("#/c/c05"); const old1 = !(await locked());
  await open2("#/c/c09"); const old2 = !(await locked());
  await open2("#/c/c10"); L.push(["ancien élève : ses leçons restent ouvertes, la suite se mérite", old1 && old2 && (await locked())]);
  const koL = L.filter(x => !x[1]).map(x => x[0]);
  report(!koL.length, `Verrous : ${L.length} contrôles` + (koL.length ? " · ÉCHECS " + JSON.stringify(koL) : " réussis (leçon, module, test raté puis réussi, ancien élève)"));
  await ctx.close();
  }

  // ---------- Page de connexion (mode connecté) ----------
  await pg.setViewport({ width: 1280, height: 900 });
  try {
    await open(CLOUD + "#/connexion"); await wait(800);
    const login = await pg.evaluate(async () => {
      const tabs = [...document.querySelectorAll(".tabs [role=tab]")].map(t => t.textContent.trim());
      let api = "?";
      try { const r = await fetch(window.SITE_CONFIG.supabaseUrl + "/auth/v1/health", { headers: { apikey: window.SITE_CONFIG.supabaseAnonKey } }); api = "HTTP " + r.status; } catch (e) { api = "bloqué : " + e.message; }
      return { tabs, api };
    });
    report(login.api === "HTTP 200", "Connexion : onglets " + JSON.stringify(login.tabs) + " · Supabase depuis la page : " + login.api);
    await grabCsp();
  } catch (e) { console.log("· Connexion non testée (serveur " + CLOUD + " absent)"); }

  report(!csp.size, "Violations CSP : " + (csp.size ? JSON.stringify([...csp]) : "aucune"));
  report(!issues.length, "Erreurs JS : " + (issues.length ? JSON.stringify([...new Set(issues)].slice(0, 8)) : "aucune"));
  await b.close();
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error("ÉCHEC", e); process.exit(1); });
