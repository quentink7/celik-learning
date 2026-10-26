// Contrôles d'avant mise en ligne, dans un vrai navigateur, avec les en-têtes de sécurité du site.
//   1. lancer : python3 tools/serve.py 8014 --demo   (et, pour la page de connexion : python3 tools/serve.py 8015)
//   2. puis   : PPTR=<chemin de puppeteer-core> node tools/check-site.cjs [dossier pour les captures]
// Vérifie : 16 exercices Python et 16 exercices SQL (solution = réussi, départ = refusé), exemples SQL,
// 16 modules ML sans erreur, aucun débordement à 390 px (clair et sombre), aucune violation CSP, aucune erreur JS.
const puppeteer = require(process.env.PPTR || "puppeteer-core");
const DEMO = process.env.DEMO || "http://127.0.0.1:8014/", CLOUD = process.env.CLOUD || "http://127.0.0.1:8015/";
const OUT = process.argv[2];
const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const wait = ms => new Promise(r => setTimeout(r, ms));
const EXPECTED_SQL_ERR = { s11: 4, s13: 1 };   // exemples qui montrent exprès une erreur (contraintes)
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
    document.addEventListener("securitypolicyviolation", e => window.__csp.push(e.violatedDirective + " ← " + (e.blockedURI || "inline")));
  });
  const csp = new Set();
  const grabCsp = async () => (await pg.evaluate(() => window.__csp || [])).forEach(x => csp.add(x));
  const open = async url => { await pg.goto("about:blank"); await pg.goto(url, { waitUntil: "networkidle0" }); };
  const closeFeedback = () => pg.evaluate(() => { const o = document.querySelector(".fb-overlay [data-fb='later']"); if (o) o.click(); });

  // ---------- Python ----------
  await open(DEMO);
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

  // ---------- Pages des cours : encadré des sources ----------
  const src = [];
  for (const c of ["python", "ml", "sql"]) { await open(DEMO + "#/" + c); src.push(c + ":" + (await pg.evaluate(() => !!document.querySelector(".box.source")))); }
  report(src.every(s => s.endsWith("true")), "Sources affichées sur les pages des cours : " + src.join(" "));

  // ---------- 390 px, clair et sombre ----------
  await pg.setViewport({ width: 390, height: 844, isMobile: true });
  const wide = [];
  for (const scheme of ["light", "dark"]) {
    await pg.emulateMediaFeatures([{ name: "prefers-color-scheme", value: scheme }]);
    for (const h of ["#/", "#/python", "#/python/p16", "#/ml", "#/ml/m5", "#/ml/a6", "#/sql", "#/sql/s08", "#/sql/s16"]) {
      await open(DEMO + h); await wait(600);
      const w = await pg.evaluate(() => document.documentElement.scrollWidth);
      if (w > 390) wide.push(scheme + " " + h + " → " + w + "px");
    }
    if (OUT) for (const [h, name] of [["#/ml/m5", "m5"], ["#/python/p16", "p16"]]) { await open(DEMO + h); await wait(700); await pg.screenshot({ path: `${OUT}/${name}-390-${scheme}.png` }); }
  }
  report(!wide.length, "390 px : " + (wide.length ? "DÉBORDE " + wide.join(", ") : "aucun défilement horizontal (9 pages × 2 thèmes)"));
  await grabCsp();

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
