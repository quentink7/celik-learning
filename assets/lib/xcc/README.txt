Compilateur C du cours C de CELIK Learning.

xcc (https://github.com/tyfkda/xcc), par tyfkda, licence MIT (voir LICENSE).
Fichiers repris tels quels de la démo officielle https://tyfkda.github.io/xcc/ (version du 17 octobre 2026) :
  - wasi_worker.js : exécute les programmes WebAssembly (WASI) dans un Web Worker ;
  - cc.wasm, wlibc.a, wcrt0.a : le compilateur et la bibliothèque C (usr/bin/cc, usr/lib/ de wccfiles.zip) ;
  - include.json : les en-têtes de usr/include/ de wccfiles.zip, regroupés en un seul fichier.
Pour mettre à jour : retélécharger wccfiles.zip et wasi_worker.js depuis la démo, puis refaire ces fichiers.

Correctif ajouté par CELIK Learning (à refaire après une mise à jour) : à la fin de usr/include/stdio.h
(dans include.json), un remplaçant de scanf qui renvoie EOF quand il ne reste rien à lire.
La bibliothèque d'origine renvoie 1 dans ce cas, et les boucles « while (scanf(...) == 1) » ne s'arrêtaient pas.
Le même remplaçant lit aussi le format "%c" seul (ou " %c"), que la bibliothèque d'origine ne gère pas.
