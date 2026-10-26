/* Compilateur C (xcc, compilé en WebAssembly, dans assets/lib/xcc/) exécuté dans un Web Worker :
   le programme de l'élève est vraiment compilé puis exécuté dans la page. Un programme qui boucle sans fin
   est arrêté au bout de quelques secondes sans bloquer la page. Erreurs expliquées en français. */
window.CRuntime = (function () {
  "use strict";
  const BASE = "assets/lib/xcc/";
  const HOME = "/home/eleve";
  const TIMEOUT = 4000;
  let files = null, worker = null, ready = null, queue = Promise.resolve();

  function loadFiles() {
    if (files) return files;
    files = Promise.all([
      fetch(BASE + "include.json").then(r => { if (!r.ok) throw r.status; return r.json(); }),
      ...["cc.wasm", "wlibc.a", "wcrt0.a"].map(f => fetch(BASE + f).then(r => { if (!r.ok) throw r.status; return r.arrayBuffer(); }))
    ]).then(([inc, cc, libc, crt]) => ({ inc, cc, libc, crt }), e => { files = null; throw e; });
    return files;
  }

  /* Un Worker neuf, avec le compilateur et la bibliothèque C dans son système de fichiers. */
  function startWorker(f) {
    const w = new Worker(BASE + "wasi_worker.js");
    let id = 0; const pending = new Map(); const out = { text: "", err: "" };
    w.onmessage = e => {
      const d = e.data;
      if (d.messageId != null && pending.has(d.messageId)) {
        const p = pending.get(d.messageId); pending.delete(d.messageId);
        d.error == null ? p.ok(d.result) : p.ko(d.error);
      } else if (d.action === "consoleOut") {
        if (d.isError) out.err += d.text; else out.text += d.text;
        if (out.onText && !d.isError) out.onText(d.text);
      }
    };
    const call = (action, o) => new Promise((ok, ko) => { const m = ++id; pending.set(m, { ok, ko }); w.postMessage(Object.assign({ action, messageId: m }, o)); });
    const kill = () => { w.terminate(); pending.forEach(p => p.ko("arrêté")); pending.clear(); };
    return (async () => {
      await call("setEnv", { envJson: JSON.stringify({ HOME, INCLUDE: "/usr/include", LIB: "/usr/lib", PATH: "/usr/bin", PWD: HOME, USER: "eleve" }) });
      for (const p of ["/tmp", HOME, "/usr/bin", "/usr/lib", "/usr/include/sys"]) await call("mkdir", { filePath: p, option: { recursive: true } });
      await call("writeFile", { filePath: "/usr/bin/cc", content: new Uint8Array(f.cc.slice(0)) });
      await call("writeFile", { filePath: "/usr/lib/wlibc.a", content: new Uint8Array(f.libc.slice(0)) });
      await call("writeFile", { filePath: "/usr/lib/wcrt0.a", content: new Uint8Array(f.crt.slice(0)) });
      for (const [p, t] of Object.entries(f.inc)) await call("writeFile", { filePath: "/usr/include/" + p, content: t });
      await call("chdir", { filePath: HOME });
      return { call, out, kill, dirty: false };
    })();
  }

  function load() {
    if (ready) return ready;
    ready = (async () => {
      try { worker = await startWorker(await loadFiles()); return true; }
      catch (e) { ready = null; throw new Error("Le compilateur C n'a pas pu se charger. Vérifie ta connexion puis recharge la page."); }
    })();
    return ready;
  }

  /* Compile puis exécute. opts : { stdin, args: [..], onText(texte) }.
     Rend { ok, stage: "compile" | "run" | "timeout", errors, stdout, stderr, exit, ms }. */
  function run(src, opts) {
    opts = opts || {};
    const job = queue.then(async () => {
      await load();
      if (worker.dirty) { worker.kill(); worker = null; ready = null; await load(); }
      const w = worker, t0 = performance.now();
      w.out.text = ""; w.out.err = ""; w.out.onText = null;
      await w.call("writeFile", { filePath: HOME + "/main.c", content: src });
      await w.call("unlink", { filePath: HOME + "/a.wasm" }).catch(() => {});
      const code = await w.call("runWasi", { filePath: "/usr/bin/cc", args: ["/usr/bin/cc", "-o", "a.wasm", "main.c"] });
      if (code !== 0) return { ok: false, stage: "compile", errors: w.out.err || w.out.text, ms: Math.round(performance.now() - t0) };
      w.out.text = ""; w.out.err = ""; w.out.onText = opts.onText || null;
      /* Comme dans un vrai terminal, chaque réponse se termine par Entrée : sans ce dernier retour à la ligne,
         la lecture d'un mot (scanf %s) de cette bibliothèque C déborde au-delà du texte tapé. */
      const input = opts.stdin ? (/\n$/.test(opts.stdin) ? opts.stdin : opts.stdin + "\n") : "";
      await w.call("writeFile", { filePath: "/dev/stdin", content: input });
      /* Le système de fichiers du Worker garde la position de lecture du clavier d'un programme à l'autre :
         après une exécution qui avait des réponses au clavier, on repart d'un Worker neuf (voir plus haut). */
      w.dirty = !!opts.stdin;
      let timer;
      const timeout = new Promise(res => { timer = setTimeout(() => res("timeout"), opts.timeout || TIMEOUT); });
      const exec = w.call("runWasi", { filePath: HOME + "/a.wasm", args: ["programme"].concat(opts.args || []) }).then(c => ({ c }), e => ({ e }));
      const r = await Promise.race([exec, timeout]);
      clearTimeout(timer);
      const res = { stdout: w.out.text, stderr: w.out.err, ms: Math.round(performance.now() - t0) };
      w.out.onText = null;
      if (r === "timeout") {
        w.kill(); worker = null; ready = null;            // on repart d'un Worker neuf
        load().catch(() => {});
        return Object.assign(res, { ok: false, stage: "timeout" });
      }
      if (r.e) return Object.assign(res, { ok: false, stage: "run", exit: null, crash: String(r.e) });
      return Object.assign(res, { ok: true, stage: "run", exit: r.c });
    });
    queue = job.catch(() => {});
    return job;
  }

  /* ---------- Erreurs du compilateur, en français ---------- */
  const FR = [
    [/`;' expected/, "Il manque un point-virgule « ; » à la fin de l'instruction juste avant (souvent sur la ligne précédente)."],
    [/`(\w+)' undeclared/, m => HEADER[m[1]] ? `« ${m[1]} » est inconnu : il faut ajouter #include <${HEADER[m[1]]}> tout en haut du programme.` : `« ${m[1]} » n'est pas déclaré. Une variable doit être déclarée (par exemple int ${m[1]} = 0;) avant d'être utilisée, et une fonction écrite (ou annoncée par son prototype) avant d'être appelée. Vérifie aussi l'orthographe et les majuscules.`],
    [/function `(\w+)' expect (\d+) arguments?, but (\d+)/, m => `La fonction ${m[1]} attend ${m[2]} argument${m[2] > 1 ? "s" : ""}, mais tu lui en donnes ${m[3]}.`],
    [/String not closed/i, () => "Un texte entre guillemets n'est pas refermé : il manque le « \" » de fin."],
    [/Cannot open file: <([^>]+)>/i, m => `Le fichier <${m[1]}> n'existe pas. Vérifie l'orthographe : les plus utiles sont <stdio.h>, <stdlib.h>, <string.h>, <ctype.h>, <math.h> et <stdbool.h>.`],
    [/cannot call except function/, null],
    [/`(\)|\]|\})' expected/, m => `Il manque un « ${m[1]} » : les parenthèses, crochets et accolades vont toujours par paires.`],
    [/convert value from type `([^']+)' to `([^']+)'/, m => `Types incompatibles : tu ranges une valeur de type ${m[1]} dans une variable de type ${m[2]}. Par exemple, un texte "…" ne va pas dans un int.`],
    [/Too (few|many) arguments/i, m => `Mauvais nombre d'arguments : la fonction en attend ${m[1].toLowerCase() === "few" ? "plus" : "moins"} que ceux que tu lui donnes.`],
    [/`(\w+)' already defined|redefinition/i, () => "Ce nom est déjà déclaré dans le même bloc : choisis un autre nom, ou enlève le type pour seulement modifier la variable."],
    [/main.*not defined|undefined.*main|`main' undefined/i, () => "Il n'y a pas de fonction main : tout programme C commence par int main(void) { … }."],
    [/Unterminated|unterminated/i, () => "Un guillemet ou un commentaire n'est pas refermé."],
    [/Void function|cannot return value|return value/i, () => "Problème de return : une fonction void ne renvoie rien, une fonction int doit renvoyer un entier."],
    [/No such file|cannot open include|not found/i, () => "Ce fichier d'en-tête n'existe pas. Les plus utiles : <stdio.h>, <stdlib.h>, <string.h>, <ctype.h>, <math.h>, <stdbool.h>."]
  ];
  const HEADER = {};
  [["stdio.h", "printf scanf puts putchar getchar fgets sprintf snprintf fopen fclose fprintf"], ["stdlib.h", "malloc calloc realloc free exit atoi abs rand srand"],
   ["string.h", "strlen strcpy strncpy strcmp strncmp strcat strchr strstr memcpy memset"], ["ctype.h", "toupper tolower isdigit isalpha isupper islower isspace"],
   ["math.h", "sqrt pow round floor ceil fabs"], ["stdbool.h", "bool true false"]].forEach(([h, fs]) => fs.split(" ").forEach(f => { HEADER[f] = h; }));
  /* Découpe la sortie du compilateur en erreurs : { line, msg, code, tip }. */
  function explain(text) {
    const lines = String(text || "").split("\n"), errs = [];
    for (let i = 0; i < lines.length; i++) {
      const m = lines[i].match(/^main\.c\((\d+)\):\s*(.*)$/) || (/^Cannot open file/i.test(lines[i]) ? [null, null, lines[i]] : null);
      if (!m) continue;
      const e = { line: m[1] == null ? null : +m[1], msg: m[2], code: (lines[i + 1] || "").replace(/^\s+$/, ""), caret: lines[i + 2] && /^\s*\^/.test(lines[i + 2]) ? lines[i + 2] : "" };
      for (const [re, f] of FR) { const k = e.msg.match(re); if (k) { e.tip = f == null ? null : typeof f === "function" ? f(k) : f; break; } }
      if (e.tip !== null) errs.push(e);
    }
    if (!errs.length && text) errs.push({ line: null, msg: String(text).trim().split("\n")[0], tip: "" });
    return errs;
  }

  return { load, run, explain };
})();
