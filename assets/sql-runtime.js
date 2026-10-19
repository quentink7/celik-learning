/* Moteur SQL (SQLite compilé en WebAssembly, sql.js, dans assets/lib/) exécuté dans le navigateur,
   avec messages d'erreur expliqués en français et correction automatique des exercices. */
window.SqlRuntime = (function () {
  "use strict";
  let ready = null, SQL = null;
  const MAX_ROWS = 2000;   // au-delà, on arrête de lire (évite de bloquer la page)

  function loadScript(src, ms) {
    return new Promise((ok, ko) => {
      const el = document.createElement("script"); el.src = src;
      const t = setTimeout(() => { el.remove(); ko("timeout"); }, ms);
      el.onload = () => { clearTimeout(t); ok(); };
      el.onerror = () => { clearTimeout(t); el.remove(); ko("error"); };
      document.head.appendChild(el);
    });
  }
  function load() {
    if (ready) return ready;
    ready = (async () => {
      try {
        if (!window.initSqlJs) await loadScript("assets/lib/sql-wasm-browser.js", 20000);
        SQL = await window.initSqlJs({ locateFile: f => "assets/lib/" + f });
        return true;
      } catch (e) {
        ready = null;
        throw new Error("Le moteur SQL n'a pas pu se charger. Vérifie ta connexion puis recharge la page.");
      }
    })();
    return ready;
  }

  /* Une base neuve : tables de la boutique + tables propres à la leçon (+ variante pour la 2e vérification). */
  function fresh(setup, variant) {
    const B = window.SQL_BASE || {};
    const db = new SQL.Database();
    db.run("PRAGMA foreign_keys = ON;");
    db.exec(B.schema + "\n" + B.data);
    if (setup) db.exec(setup);
    if (variant) db.exec(variant);
    return db;
  }

  /* Exécute toutes les instructions d'un texte SQL, une par une.
     Rend { ok, steps: [{ sql, columns, rows, more, changes }], err, errIndex }. */
  function run(db, src) {
    const steps = [];
    let it;
    try { it = db.iterateStatements(src); }
    catch (e) { return { ok: false, steps, err: e, errIndex: 0 }; }
    try {
      for (const stmt of it) {
        const sql = stmt.getSQL();
        const columns = stmt.getColumnNames();
        const rows = []; let more = false;
        while (stmt.step()) {
          if (rows.length >= MAX_ROWS) { more = true; break; }
          rows.push(stmt.get());
        }
        stmt.free();
        const changes = columns.length ? 0 : db.getRowsModified();   // sans compter les lignes changées par un trigger
        steps.push({ sql, columns, rows, more, changes, write: !columns.length });
      }
    } catch (e) { return { ok: false, steps, err: e, errIndex: steps.length }; }
    return { ok: true, steps };
  }

  /* Une seule requête de lecture, pour la correction. */
  function query(db, sql) {
    try { const r = db.exec(sql); return r.length ? { columns: r[r.length - 1].columns, rows: r[r.length - 1].values } : { columns: [], rows: [] }; }
    catch (e) { return { error: String(e.message || e) }; }
  }

  /* ---------- Erreurs en français ---------- */
  const FR = [
    [/no such table: (\S+)/i, m => `La table « ${m[1]} » n'existe pas. Vérifie l'orthographe : la liste des tables est dans l'encadré « Les tables de la base ».`],
    [/no such column: (\S+)/i, m => `La colonne « ${m[1]} » n'existe pas. Vérifie son nom dans la liste des tables. Si c'est un texte, mets-le entre apostrophes : 'Ouagadougou'. Les guillemets doubles "…" désignent une colonne, pas un texte.`],
    [/incomplete input/i, () => "La requête est incomplète : une apostrophe ' ou une parenthèse n'est pas refermée, ou il manque la fin de l'instruction."],
    [/near "([^"]*)": syntax error/i, m => `SQLite ne comprend pas la requête à l'endroit de « ${m[1]} ». Vérifie les virgules entre les colonnes, les apostrophes autour des textes, et l'ordre des mots : SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT.`],
    [/unrecognized token: "?'?([^"]*)/i, m => `Un caractère n'est pas compris (« ${m[1]} »). Souvent une apostrophe ouverte mais pas fermée. Pour écrire une apostrophe à l'intérieur d'un texte, double-la : 'Patte d''Oie'.`],
    [/ambiguous column name: (\S+)/i, m => `La colonne « ${m[1]} » existe dans plusieurs tables de ta requête. Précise laquelle : table.colonne (par exemple clients.id).`],
    [/misuse of aggregate/i, () => "Une fonction comme COUNT, SUM ou AVG est mal placée. On ne peut pas l'utiliser dans WHERE : pour filtrer sur un total, utilise HAVING après GROUP BY."],
    [/a GROUP BY clause is required before HAVING/i, () => "HAVING s'utilise après un GROUP BY. Sans regroupement, filtre les lignes avec WHERE."],
    [/NOT NULL constraint failed: (\S+)/i, m => `La colonne « ${m[1]} » est obligatoire (NOT NULL) : il faut lui donner une valeur.`],
    [/UNIQUE constraint failed: (\S+)/i, m => `Cette valeur existe déjà dans « ${m[1]} », qui doit être unique (UNIQUE ou clé primaire).`],
    [/CHECK constraint failed/i, () => "La valeur ne respecte pas une règle CHECK de la table (par exemple un prix négatif). Regarde la définition de la table."],
    [/FOREIGN KEY constraint failed/i, () => "La clé étrangère ne correspond à aucune ligne : par exemple un client_id qui n'existe pas dans clients, ou une ligne supprimée alors que d'autres pointent encore vers elle."],
    [/table (\S+) already exists/i, m => `La table « ${m[1]} » existe déjà. Choisis un autre nom, ou utilise CREATE TABLE IF NOT EXISTS.`],
    [/table (\S+) has (\d+) columns but (\d+) values were supplied/i, m => `La table « ${m[1]} » a ${m[2]} colonnes mais tu donnes ${m[3]} valeurs. Indique les colonnes visées : INSERT INTO table (col1, col2) VALUES (…).`],
    [/(\d+) values for (\d+) columns/i, m => `Tu donnes ${m[1]} valeurs pour ${m[2]} colonnes : il en faut autant de chaque côté.`],
    [/no such function: (\S+)/i, m => `La fonction « ${m[1]} » n'existe pas dans SQLite. Vérifie l'orthographe.`],
    [/wrong number of arguments to function (\S+)/i, m => `Mauvais nombre de valeurs entre les parenthèses de ${m[1]}.`],
    [/cannot start a transaction within a transaction/i, () => "Une transaction est déjà ouverte : termine-la avec COMMIT ou ROLLBACK avant d'en ouvrir une autre."],
    [/cannot (commit|rollback) - no transaction is active/i, () => "Aucune transaction n'est ouverte : il faut d'abord BEGIN TRANSACTION."],
    [/no such view: (\S+)/i, m => `La vue « ${m[1]} » n'existe pas.`],
    [/no such index: (\S+)/i, m => `L'index « ${m[1]} » n'existe pas.`],
    [/You can only execute one statement/i, () => "Une seule instruction à la fois ici."],
    [/(.+)/, () => ""]
  ];
  function explain(err) {
    const msg = String((err && err.message) || err || "");
    for (const [re, f] of FR) { const m = msg.match(re); if (m) return { msg, tip: f(m) }; }
    return { msg, tip: "" };
  }

  /* ---------- Comparaison de résultats ---------- */
  const norm = v => v == null ? null : typeof v === "number" ? Math.round(v * 100) / 100 : v instanceof Uint8Array ? "[blob]" : String(v);
  const key = row => JSON.stringify(row.map(norm));
  function sameRows(a, b, ordered) {
    if (a.length !== b.length) return false;
    const ka = a.map(key), kb = b.map(key);
    if (!ordered) { ka.sort(); kb.sort(); }
    return ka.every((k, i) => k === kb[i]);
  }
  function lastResult(r) { for (let i = r.steps.length - 1; i >= 0; i--) if (!r.steps[i].write) return r.steps[i]; return null; }

  /* Compare le résultat de l'élève à celui de la solution, avec un message d'aide précis. */
  function compare(mine, ref, ex) {
    if (!mine) return "Ta requête n'affiche aucun résultat. Il faut une requête SELECT qui renvoie des lignes.";
    if (mine.more) return "Ta requête renvoie beaucoup trop de lignes. Ajoute un filtre (WHERE) ou une limite.";
    if (mine.columns.length !== ref.columns.length)
      return `Ton résultat a ${mine.columns.length} colonne${mine.columns.length > 1 ? "s" : ""} au lieu de ${ref.columns.length}. Garde seulement les colonnes demandées, dans l'ordre demandé.`;
    if (ex.names) {
      const want = ref.columns.map(c => c.toLowerCase()), got = mine.columns.map(c => c.toLowerCase());
      const bad = want.findIndex((c, i) => c !== got[i]);
      if (bad >= 0) return `La colonne ${bad + 1} doit s'appeler « ${ref.columns[bad]} » (avec AS), elle s'appelle « ${mine.columns[bad]} ».`;
    }
    if (mine.rows.length !== ref.rows.length)
      return `Ton résultat a ${mine.rows.length} ligne${mine.rows.length > 1 ? "s" : ""}, il en faut ${ref.rows.length}. Vérifie ton filtre.`;
    if (!sameRows(mine.rows, ref.rows, false)) return "Le nombre de lignes est bon, mais pas les valeurs. Vérifie les colonnes choisies et les conditions.";
    if (ex.ordered && !sameRows(mine.rows, ref.rows, true)) return "Les bonnes lignes sont là, mais pas dans le bon ordre. Vérifie ton ORDER BY (et ASC ou DESC).";
    return true;
  }

  /* Correction d'un exercice. ex : { setup, variant, mode: "result" | "state", verify, ordered, names, need, test }.
     La correction tourne deux fois : sur la base normale, puis sur une variante aux données un peu changées,
     pour qu'un résultat recopié à la main ne passe pas. */
  function grade(ex, code) {
    for (const n of ex.need || []) if (!n.re.test(code)) return { ok: false, msg: n.msg };
    const variants = [null, (window.SQL_BASE || {}).variant + "\n" + (ex.variant || "")];
    for (let v = 0; v < variants.length; v++) {
      const db = fresh(ex.setup, variants[v]), ref = fresh(ex.setup, variants[v]);
      try {
        const r = run(db, code);
        if (!r.ok) return { ok: false, msg: "Ta requête s'arrête sur une erreur : lis le message dans le résultat.", run: r };
        const s = run(ref, ex.sol);
        if (!s.ok) return { ok: false, msg: "Erreur interne de la correction : " + explain(s.err).msg };
        let res;
        if (ex.test) res = ex.test({ db, run: sql => query(db, sql), result: lastResult(r), steps: r.steps, code });
        else if (ex.mode === "state") {
          const a = query(db, ex.verify), b = query(ref, ex.verify);
          if (a.error) res = "Après ton code, la table ou la vue attendue n'existe pas, ou n'a pas les bonnes colonnes (" + explain(a.error).msg + ").";
          else res = sameRows(a.rows, b.rows, true) ? true : (ex.stateMsg || "Après ton code, les données ne sont pas celles attendues. Relis la consigne : quelles lignes changer, et avec quelles valeurs ?");
        } else res = compare(lastResult(r), lastResult(s), ex);
        if (res !== true) return { ok: false, msg: v ? res + " (2e vérification, sur des données un peu différentes : ta requête doit marcher quelles que soient les données.)" : res };
      } finally { db.close(); ref.close(); }
    }
    return { ok: true };
  }

  /* Liste des tables et colonnes d'une base (pour l'aide-mémoire). */
  function schema(setup) {
    const db = fresh(setup);
    try {
      const t = db.exec("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY rowid")[0];
      return (t ? t.values.map(v => v[0]) : []).map(name => {
        const cols = db.exec(`PRAGMA table_info("${name.replace(/"/g, '""')}")`)[0].values.map(c => ({ name: c[1], type: c[2], pk: !!c[5] }));
        const n = db.exec(`SELECT COUNT(*) FROM "${name.replace(/"/g, '""')}"`)[0].values[0][0];
        return { name, cols, n };
      });
    } finally { db.close(); }
  }

  return { load, fresh, run, query, grade, explain, schema, lastResult, MAX_ROWS };
})();
