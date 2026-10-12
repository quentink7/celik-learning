/* Interpréteur Python (Skulpt) exécuté dans le navigateur, avec messages d'erreur expliqués en français. */
window.PyRuntime = (function () {
  "use strict";
  let ready = null, stopFlag = false;

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
      const sources = ["assets/lib/", "https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/", "https://unpkg.com/skulpt@1.2.0/dist/"];
      for (const base of sources) {
        try { await loadScript(base + "skulpt.min.js", 20000); await loadScript(base + "skulpt-stdlib.js", 20000); if (window.Sk && Sk.builtinFiles) return true; } catch (e) {}
      }
      ready = null;
      throw new Error("L'interpréteur Python n'a pas pu se charger. Vérifie ta connexion puis recharge la page.");
    })();
    return ready;
  }

  const FR_ERR = {
    NameError: "Python ne connaît pas ce nom. Soit la variable n'a pas encore été créée (elle doit l'être AVANT d'être utilisée), soit il y a une faute de frappe (majuscule, accent, lettre en trop). Si c'est du texte, as-tu oublié les guillemets ?",
    SyntaxError: "Python n'arrive pas à lire la ligne. Vérifie : guillemets ouverts ET fermés, parenthèses qui vont par paires, deux-points « : » à la fin d'un if, for, while ou def.",
    IndentationError: "Problème de décalage. Les lignes sous un if, for, while ou def doivent être décalées de 4 espaces, toutes pareil. Et une ligne qui ne fait pas partie d'un bloc ne doit pas être décalée.",
    TypeError: "Tu mélanges deux types qui ne vont pas ensemble, souvent du texte et un nombre (\"20\" + 1). Convertis avec int() ou str(). Ou bien tu appelles une fonction avec un mauvais nombre d'arguments.",
    ValueError: "La valeur ne convient pas. Exemple typique : int(\"abc\") ou int(\"3.5\") : on ne peut pas transformer ce texte en nombre entier.",
    ZeroDivisionError: "Division par zéro : impossible en maths comme en Python. Vérifie la valeur qui est au dénominateur.",
    IndexError: "Tu demandes une case qui n'existe pas. Dans une liste de 3 éléments, les positions valides sont 0, 1 et 2 (pas 3).",
    KeyError: "Cette clé n'existe pas dans le dictionnaire. Vérifie l'orthographe, ou utilise .get(cle, valeur_par_defaut).",
    AttributeError: "Cette méthode n'existe pas pour ce type de valeur (par exemple .append() sur un texte). Vérifie le type et l'orthographe.",
    UnboundLocalError: "Tu utilises une variable dans une fonction avant de lui avoir donné une valeur dans cette fonction.",
    KeyboardInterrupt: "Programme arrêté."
  };

  function stop() { stopFlag = true; }

  /* opts : { inputs: [..] (saisies simulées), write(text, cls), ask(prompt) -> Promise<string> } */
  function run(src, opts) {
    let buf = ""; const queue = opts.inputs ? [...opts.inputs] : null;
    stopFlag = false;
    const write = opts.write || (() => {});
    Sk.configure({
      output: t => { buf += t; write(t); },
      read: f => { if (Sk.builtinFiles === undefined || Sk.builtinFiles.files[f] === undefined) throw "Fichier introuvable : '" + f + "'"; return Sk.builtinFiles.files[f]; },
      __future__: Sk.python3,
      inputfunTakesPrompt: true,
      inputfun: prompt => {
        if (prompt) { buf += prompt; write(prompt); }
        if (queue) { const v = queue.length ? queue.shift() : ""; buf += v + "\n"; write(v + "\n", "in"); return Promise.resolve(v); }
        return opts.ask().then(v => { buf += v + "\n"; return v; }, () => { throw new Sk.builtin.KeyboardInterrupt("arrêt"); });
      },
      yieldLimit: 100,
      execLimit: queue ? 6000 : null
    });
    return Sk.misceval.asyncToPromise(
      () => Sk.importMainWithBody("<stdin>", false, src, true),
      { "*": () => { if (stopFlag) throw new Sk.builtin.KeyboardInterrupt("Programme arrêté"); } }
    ).then(() => ({ ok: true, out: buf }), err => ({ ok: false, out: buf, err }));
  }

  function describe(err) {
    if (!err) return { name: "Erreur", msg: "", line: null };
    if (window.Sk && err instanceof Sk.builtin.BaseException) {
      const name = err.tp$name;
      let msg = ""; try { msg = err.args && err.args.v && err.args.v.length ? Sk.ffi.remapToJs(err.args.v[0]) : ""; } catch (e) {}
      const line = err.traceback && err.traceback.length ? err.traceback[0].lineno : null;
      return { name, msg: String(msg), line };
    }
    if (typeof err === "string" && /TimeLimit/i.test(err)) return { name: "TimeLimitError", msg: "", line: null };
    if (err && /TimeLimit/i.test(String(err.tp$name || err))) return { name: "TimeLimitError", msg: "", line: null };
    return { name: "Erreur", msg: String(err), line: null };
  }

  return { load, run, stop, describe, FR_ERR };
})();
