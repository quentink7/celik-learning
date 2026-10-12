/* Cours Python — Partie 2 : décider et répéter */
(window.PY_PARTS = window.PY_PARTS || []).push({
  title: "Décider et répéter",
  lessons: [
/* ------------------------------------------------------------------ */
{ id: "p06", title: "Vrai ou faux : comparaisons et booléens", minutes: 20,
  goal: "Poser des questions à Python avec les comparaisons, et combiner les réponses avec and, or, not.",
  why: `<p>Avant de prendre une décision (« si le mot de passe est trop court, refuser »), un programme doit pouvoir répondre à une question par oui ou non. C'est le rôle des comparaisons et des booléens.</p>`,
  sections: [
    { h: "Une comparaison donne True ou False",
      html: `<pre><code>print(5 > 3)      # True
print(5 < 3)      # False
print(5 == 5)     # True</code></pre>
<div class="table-wrap"><table><thead><tr><th>Symbole</th><th>Question posée</th><th>Exemple vrai</th></tr></thead><tbody>
<tr><td><code>==</code></td><td>est égal à ?</td><td><code>3 == 3</code></td></tr>
<tr><td><code>!=</code></td><td>est différent de ?</td><td><code>3 != 4</code></td></tr>
<tr><td><code>&lt;</code> / <code>&gt;</code></td><td>plus petit / plus grand ?</td><td><code>2 &lt; 5</code></td></tr>
<tr><td><code>&lt;=</code> / <code>&gt;=</code></td><td>plus petit ou égal / plus grand ou égal ?</td><td><code>5 &gt;= 5</code></td></tr>
</tbody></table></div>
<div class="box why"><b class="tag">Le point le plus important de la leçon</b><p><code>=</code> (un seul) <strong>range</strong> une valeur dans une variable. <code>==</code> (deux) <strong>pose la question</strong> « est-ce égal ? ». Les confondre est l'erreur numéro un.</p></div>
<p>Le résultat d'une comparaison est un <strong>booléen</strong> : <code>True</code> (vrai) ou <code>False</code> (faux). On peut le ranger dans une variable : <code>majeur = age &gt;= 18</code>.</p>` },
    { h: "Comparer du texte",
      html: `<pre><code>print("admin" == "admin")   # True
print("Admin" == "admin")   # False : la majuscule compte !
print("ssh" in "tentative ssh échouée")   # True : in teste si un texte en contient un autre</code></pre>
<p>Pour comparer sans tenir compte des majuscules, on met tout en minuscules : <code>mot.lower() == "admin"</code>.</p>` },
    { h: "Combiner : and, or, not",
      html: `<ul><li><code>A and B</code> : vrai seulement si <strong>les deux</strong> sont vrais.</li>
<li><code>A or B</code> : vrai si <strong>au moins un</strong> des deux est vrai.</li>
<li><code>not A</code> : l'inverse de A.</li></ul>
<div class="box plain"><b class="tag">En clair</b><p>« Pour entrer, il faut un badge <strong>et</strong> le bon code » : les deux sont nécessaires. « On accepte le paiement en espèces <strong>ou</strong> par Orange Money » : un seul suffit.</p></div>
<div class="box steps"><b class="tag">Pas à pas : age = 20, pays = "BF"</b><ol>
<li><code>age &gt;= 18</code> → True.</li>
<li><code>pays == "BF"</code> → True.</li>
<li><code>age &gt;= 18 and pays == "BF"</code> → True and True → <strong>True</strong>.</li>
<li><code>age &lt; 18 or pays == "CI"</code> → False or False → <strong>False</strong>.</li></ol></div>` }
  ],
  pitfalls: [
    "Écrire <code>if x = 5</code> au lieu de <code>if x == 5</code> : SyntaxError.",
    "Comparer un texte et un nombre : <code>\"5\" == 5</code> vaut False, car ce ne sont pas les mêmes types.",
    "Écrire <code>age &gt; 10 and &lt; 20</code> : chaque côté doit être une comparaison complète, <code>age &gt; 10 and age &lt; 20</code>."
  ],
  remember: ["Une comparaison donne True ou False.", "= range, == compare.", "and : les deux ; or : au moins un ; not : l'inverse.", "in teste si un texte en contient un autre."],
  quiz: [
    { q: "Que vaut 7 != 7 ?", options: ["True", "False", "7", "Erreur"], answer: 1, explain: "!= demande « différent ? ». 7 n'est pas différent de 7 : False." },
    { q: "Que vaut (3 > 1) and (2 > 5) ?", options: ["True", "False"], answer: 1, explain: "and exige que les deux soient vrais. 2 > 5 est faux, donc le tout est faux." },
    { q: "Que vaut \"Root\" == \"root\" ?", options: ["True", "False"], answer: 1, explain: "Python distingue majuscules et minuscules." }
  ],
  exercise: {
    task: `Avec <code>age = 17</code> et <code>accompagne = True</code>, crée une variable <code>peut_entrer</code> qui vaut True si la personne a au moins 18 ans <strong>ou</strong> si elle est accompagnée. Affiche-la (on attend <code>True</code>).`,
    hint: `peut_entrer = age >= 18 or accompagne`,
    start: `age = 17\naccompagne = True\n\n`,
    sol: `age = 17\naccompagne = True\npeut_entrer = age >= 18 or accompagne\nprint(peut_entrer)`,
    check: (o, c) => { if (o.trim().split("\n").pop().trim() !== "True") return "Il faut afficher True."; if (!/\bor\b/.test(c)) return "Utilise or pour combiner les deux conditions."; if (!/>=\s*18/.test(c)) return "Compare l'âge avec >= 18."; return true; }
  }
},
/* ------------------------------------------------------------------ */
{ id: "p07", title: "Prendre des décisions : if, elif, else", minutes: 30,
  goal: "Exécuter du code seulement quand une condition est vraie, et choisir entre plusieurs cas.",
  why: `<p>Un programme qui fait toujours la même chose est limité. Avec <code>if</code>, il s'adapte : afficher « mot de passe faible » ou « fort », bloquer une IP ou la laisser passer, donner « admis » ou « recalé ».</p>`,
  sections: [
    { h: "La structure de base",
      html: `<pre><code>note = 14
if note &gt;= 10:
    print("Admis")
print("Fin")</code></pre>
<p>Trois détails obligatoires :</p>
<ol><li>la ligne <code>if</code> se termine par <strong>deux-points</strong> <code>:</code> ;</li>
<li>les lignes qui dépendent du <code>if</code> sont <strong>décalées de 4 espaces</strong> (on dit <strong>indentées</strong>) ;</li>
<li>la première ligne non décalée marque la fin du bloc : <code>print("Fin")</code> s'exécute dans tous les cas.</li></ol>
<div class="box plain"><b class="tag">En clair</b><p>L'indentation, c'est la façon dont Python sait « ce qui est dans le si ». Dans d'autres langages on utilise des accolades ; en Python, c'est le décalage. Il n'est pas décoratif : il change le sens du programme.</p></div>` },
    { h: "Sinon : else",
      html: `<pre><code>if note &gt;= 10:
    print("Admis")
else:
    print("Recalé")</code></pre>
<p><code>else</code> (« sinon ») n'a pas de condition : il s'exécute quand celle du <code>if</code> est fausse. Un seul des deux blocs s'exécute, jamais les deux.</p>` },
    { h: "Plusieurs cas : elif",
      html: `<pre><code>note = 14
if note &gt;= 16:
    print("Très bien")
elif note &gt;= 12:
    print("Bien")
elif note &gt;= 10:
    print("Admis")
else:
    print("Recalé")</code></pre>
<div class="box steps"><b class="tag">Pas à pas avec note = 14</b><ol>
<li><code>14 &gt;= 16</code> ? Non → on passe au cas suivant.</li>
<li><code>14 &gt;= 12</code> ? Oui → on affiche « Bien »…</li>
<li>… et <strong>on sort</strong> : les cas suivants ne sont même pas testés, même si <code>14 &gt;= 10</code> est aussi vrai.</li></ol></div>
<div class="box why"><b class="tag">À retenir</b><p>Python teste les conditions <strong>dans l'ordre</strong> et s'arrête à la première vraie. L'ordre compte : si tu mets <code>note &gt;= 10</code> en premier, tout le monde au-dessus de 10 aura « Admis », même avec 19.</p></div>` },
    { h: "Un exemple de sécurité",
      html: `<pre><code>tentatives = 6
if tentatives &gt;= 5:
    print("Compte bloqué")
    print("Alerte envoyée au SOC")
else:
    print(f"Il reste {5 - tentatives} essais")</code></pre>
<p>Les deux <code>print</code> décalés sous le <code>if</code> forment un bloc : ils s'exécutent ensemble.</p>` }
  ],
  pitfalls: [
    "Oublier les deux-points à la fin de <code>if</code>, <code>elif</code> ou <code>else</code>.",
    "Mélanger 2 et 4 espaces, ou espaces et tabulations : IndentationError. Garde toujours 4 espaces (la touche Tab les insère ici).",
    "Mettre une condition après <code>else</code> : <code>else note &lt; 10:</code> est interdit. Utilise <code>elif</code>.",
    "Mal ordonner les elif : le cas le plus exigeant doit être testé en premier."
  ],
  remember: ["if condition: puis un bloc indenté de 4 espaces.", "elif pour les autres cas, else pour « tout le reste ».", "Python s'arrête à la première condition vraie.", "Les conditions se testent dans l'ordre : du plus strict au plus large."],
  quiz: [
    { q: "x = 8. Qu'affiche : if x > 5: print(\"A\") elif x > 2: print(\"B\") ?", options: ["A", "B", "A puis B", "Rien"], answer: 0, explain: "La première condition vraie gagne, les suivantes ne sont pas testées." },
    { q: "Que manque-t-il dans « if x > 3 » ?", options: ["Des parenthèses", "Les deux-points :", "Le mot then", "Rien"], answer: 1, explain: "Toute ligne if/elif/else/for/while/def se termine par deux-points." },
    { q: "À quoi sert l'indentation ?", options: ["À faire joli", "À indiquer quelles lignes font partie du bloc", "À commenter", "À accélérer le programme"], answer: 1, explain: "En Python, le décalage définit les blocs. Il change le sens du programme." }
  ],
  exercise: {
    task: `On juge un mot de passe à sa longueur, obtenue avec <code>len(mdp)</code>. Affiche <code>faible</code> s'il a moins de 8 caractères, <code>moyen</code> de 8 à 11, <code>fort</code> à partir de 12. Avec <code>mdp = "Soc2026!"</code> (8 caractères), on attend <code>moyen</code>.`,
    hint: `if len(mdp) < 8: ... elif len(mdp) < 12: ... else: ...`,
    start: `mdp = "Soc2026!"\nprint(len(mdp))  # tu peux retirer cette ligne ensuite\n\n`,
    sol: `mdp = "Soc2026!"\nif len(mdp) < 8:\n    print("faible")\nelif len(mdp) < 12:\n    print("moyen")\nelse:\n    print("fort")`,
    check: (o, c) => { const last = o.trim().split("\n").pop().trim(); if (last !== "moyen") return "Avec \"Soc2026!\" (8 caractères), la dernière ligne affichée doit être moyen."; if (!/elif/.test(c) || !/else/.test(c)) return "Utilise if, elif et else."; return true; }
  }
},
/* ------------------------------------------------------------------ */
{ id: "p08", title: "Répéter : la boucle for et range()", minutes: 30,
  goal: "Répéter des instructions un nombre précis de fois, et parcourir une suite de nombres.",
  why: `<p>Afficher 100 lignes, analyser 10 000 entrées de log, tester chaque port d'une liste : sans boucle, il faudrait recopier le code des milliers de fois. La boucle <code>for</code> répète le travail à ta place.</p>`,
  sections: [
    { h: "Répéter n fois",
      html: `<pre><code>for i in range(3):
    print("Bonjour")</code></pre>
<p>Affiche trois fois « Bonjour ». Comme pour <code>if</code> : deux-points à la fin, bloc indenté.</p>
<div class="box plain"><b class="tag">En clair</b><p>Lis-le comme : « pour chaque <code>i</code> dans la suite 0, 1, 2, fais le bloc ». La variable <code>i</code> prend une nouvelle valeur à chaque tour.</p></div>
<pre><code>for i in range(3):
    print("Tour numéro", i)</code></pre>
<div class="trace"><table><thead><tr><th>Tour</th><th>Valeur de i</th><th>Affichage</th></tr></thead><tbody>
<tr><td>1er</td><td>0</td><td>Tour numéro 0</td></tr>
<tr><td>2e</td><td>1</td><td>Tour numéro 1</td></tr>
<tr><td>3e</td><td>2</td><td>Tour numéro 2</td></tr>
</tbody></table></div>
<div class="box why"><b class="tag">À retenir</b><p><code>range(3)</code> donne 0, 1, 2 : <strong>il commence à 0 et s'arrête avant 3</strong>. Il y a bien 3 valeurs, mais 3 lui-même n'en fait pas partie.</p></div>` },
    { h: "range() en détail",
      html: `<div class="table-wrap"><table><thead><tr><th>Écriture</th><th>Valeurs produites</th><th>Lecture</th></tr></thead><tbody>
<tr><td><code>range(5)</code></td><td>0, 1, 2, 3, 4</td><td>de 0 jusqu'à 5 exclu</td></tr>
<tr><td><code>range(1, 6)</code></td><td>1, 2, 3, 4, 5</td><td>de 1 jusqu'à 6 exclu</td></tr>
<tr><td><code>range(0, 20, 5)</code></td><td>0, 5, 10, 15</td><td>de 0 à 20 exclu, par pas de 5</td></tr>
<tr><td><code>range(10, 0, -1)</code></td><td>10, 9, …, 1</td><td>à rebours</td></tr>
</tbody></table></div>
<p>Pour aller « de 1 à 10 inclus », on écrit donc <code>range(1, 11)</code>.</p>` },
    { h: "Le motif de l'accumulateur",
      html: `<p>Très souvent, on veut <strong>additionner</strong> quelque chose au fil des tours. On crée une variable avant la boucle, puis on l'augmente à chaque tour :</p>
<pre><code>total = 0
for n in range(1, 5):
    total += n
print(total)   # 10</code></pre>
<div class="trace"><table><thead><tr><th>Tour</th><th>n</th><th>total avant</th><th>total après</th></tr></thead><tbody>
<tr><td>1</td><td>1</td><td>0</td><td>1</td></tr>
<tr><td>2</td><td>2</td><td>1</td><td>3</td></tr>
<tr><td>3</td><td>3</td><td>3</td><td>6</td></tr>
<tr><td>4</td><td>4</td><td>6</td><td>10</td></tr>
</tbody></table></div>
<p>Remarque : le <code>print(total)</code> n'est <strong>pas</strong> indenté. Il s'exécute une seule fois, après la boucle. Indenté, il afficherait le total à chaque tour.</p>` },
    { h: "Parcourir un texte",
      html: `<p><code>for</code> sait parcourir autre chose que des nombres. Sur un texte, il donne chaque caractère :</p>
<pre><code>for lettre in "SOC":
    print(lettre)
# S
# O
# C</code></pre>
<p>Tu verras dans la partie suivante qu'on parcourt surtout des <strong>listes</strong>.</p>` }
  ],
  pitfalls: [
    "Croire que <code>range(5)</code> va jusqu'à 5 : il s'arrête à 4.",
    "Créer l'accumulateur <strong>dans</strong> la boucle : il est remis à 0 à chaque tour.",
    "Indenter le print final : il s'affiche à chaque tour au lieu d'une seule fois."
  ],
  remember: ["for variable in suite: puis un bloc indenté.", "range(n) : 0 à n−1 ; range(a, b) : a à b−1 ; range(a, b, pas).", "Accumulateur : créé avant la boucle, modifié dedans, affiché après."],
  quiz: [
    { q: "Quelles valeurs donne range(2, 6) ?", options: ["2, 3, 4, 5, 6", "2, 3, 4, 5", "3, 4, 5, 6", "0 à 6"], answer: 1, explain: "Le début est inclus, la fin est exclue." },
    { q: "Combien de fois s'exécute le bloc de « for i in range(10): » ?", options: ["9", "10", "11"], answer: 1, explain: "range(10) produit 10 valeurs : 0 à 9." },
    { q: "Où créer total = 0 pour faire une somme ?", options: ["Avant la boucle", "Dans la boucle", "Après la boucle"], answer: 0, explain: "Dans la boucle, il serait remis à 0 à chaque tour." }
  ],
  exercise: {
    task: `Calcule la somme des nombres de <strong>1 à 100 inclus</strong> avec une boucle <code>for</code> et un accumulateur, puis affiche-la une seule fois. On attend <code>5050</code>.`,
    hint: `total = 0 avant la boucle ; for n in range(1, 101): total += n ; print(total) sans indentation.`,
    start: `total = 0\n\n`,
    sol: `total = 0\nfor n in range(1, 101):\n    total += n\nprint(total)`,
    check: (o, c) => { const l = o.trim().split("\n"); if (l.length !== 1) return "Il faut afficher une seule ligne : le print doit être après la boucle, sans indentation."; if (l[0].trim() !== "5050") return "La somme de 1 à 100 doit donner 5050. Vérifie range(1, 101)."; if (!/for\s/.test(c)) return "Utilise une boucle for."; return true; }
  }
},
/* ------------------------------------------------------------------ */
{ id: "p09", title: "Répéter tant que : la boucle while", minutes: 25,
  goal: "Répéter tant qu'une condition est vraie, quand on ne sait pas d'avance combien de tours il faudra.",
  why: `<p>« Redemande le mot de passe tant qu'il est faux », « attends tant que le serveur ne répond pas » : on ne connaît pas le nombre de tours à l'avance. C'est le travail de <code>while</code>.</p>`,
  sections: [
    { h: "for ou while ?",
      html: `<ul><li><code>for</code> : quand on sait <strong>sur quoi</strong> ou <strong>combien de fois</strong> boucler (10 fois, chaque ligne d'un fichier).</li>
<li><code>while</code> (« tant que ») : quand on boucle <strong>jusqu'à ce qu'une situation change</strong>.</li></ul>
<pre><code>compteur = 3
while compteur &gt; 0:
    print(compteur)
    compteur -= 1
print("Décollage !")</code></pre>
<div class="trace"><table><thead><tr><th>Test</th><th>compteur</th><th>compteur &gt; 0 ?</th><th>Action</th></tr></thead><tbody>
<tr><td>1</td><td>3</td><td>True</td><td>affiche 3, compteur devient 2</td></tr>
<tr><td>2</td><td>2</td><td>True</td><td>affiche 2, compteur devient 1</td></tr>
<tr><td>3</td><td>1</td><td>True</td><td>affiche 1, compteur devient 0</td></tr>
<tr><td>4</td><td>0</td><td>False</td><td>on sort, affiche « Décollage ! »</td></tr>
</tbody></table></div>` },
    { h: "Le danger : la boucle infinie",
      html: `<p>Si la condition ne devient jamais fausse, la boucle ne s'arrête jamais :</p>
<pre><code>compteur = 3
while compteur &gt; 0:
    print(compteur)
    # oubli de compteur -= 1 : compteur reste à 3 pour toujours</code></pre>
<div class="box why"><b class="tag">Règle de sécurité</b><p>Dans toute boucle <code>while</code>, vérifie qu'une ligne du bloc <strong>fait évoluer</strong> la condition vers False. Si ton programme ne s'arrête pas ici, clique sur « Arrêter ».</p></div>` },
    { h: "Sortir plus tôt : break",
      html: `<p><code>break</code> quitte la boucle immédiatement. Motif classique : demander jusqu'à obtenir la bonne réponse, avec un nombre d'essais limité.</p>
<pre><code>essais = 0
while essais &lt; 3:
    code = input("Code PIN ? ")
    essais += 1
    if code == "1234":
        print("Accès autorisé")
        break
else:
    print("Carte bloquée")</code></pre>
<p>Le <code>else</code> d'une boucle s'exécute seulement si la boucle s'est terminée <strong>sans</strong> <code>break</code>. Ici : les 3 essais sont épuisés.</p>
<p>Il existe aussi <code>continue</code>, qui saute directement au tour suivant sans finir le bloc.</p>` }
  ],
  pitfalls: [
    "Oublier de faire évoluer la variable de la condition : boucle infinie.",
    "Initialiser la variable de condition dans la boucle : elle est réinitialisée à chaque tour.",
    "Utiliser while là où for suffit (« répéter 10 fois ») : for est plus simple et sans risque de boucle infinie."
  ],
  remember: ["while condition: répète tant que la condition est vraie.", "Une ligne du bloc doit faire évoluer la condition.", "break sort de la boucle ; continue passe au tour suivant."],
  quiz: [
    { q: "x = 1 ; while x < 20: x = x * 2. Combien vaut x à la fin ?", options: ["16", "20", "32", "Boucle infinie"], answer: 2, explain: "1 → 2 → 4 → 8 → 16 → 32. À 32, la condition x < 20 est fausse : on sort." },
    { q: "Que fait break ?", options: ["Met le programme en pause", "Quitte la boucle immédiatement", "Recommence la boucle", "Provoque une erreur"], answer: 1, explain: "break sort de la boucle en cours ; le programme continue après." },
    { q: "Quand préférer while à for ?", options: ["Pour répéter 10 fois", "Quand on ne sait pas combien de tours il faudra", "Pour parcourir un texte"], answer: 1, explain: "while sert quand on boucle jusqu'à ce qu'une situation change." }
  ],
  exercise: {
    task: `Un capital de <code>100000</code> francs rapporte 10 % par an (il est multiplié par 1.1 chaque année). Avec une boucle <code>while</code>, compte combien d'années il faut pour qu'il <strong>dépasse 200000</strong>. Affiche ce nombre d'années : on attend <code>8</code>.`,
    hint: `annees = 0 ; while capital <= 200000: capital = capital * 1.1 ; annees += 1. Puis print(annees) après la boucle.`,
    start: `capital = 100000\nannees = 0\n\n`,
    sol: `capital = 100000\nannees = 0\nwhile capital <= 200000:\n    capital = capital * 1.1\n    annees += 1\nprint(annees)`,
    check: (o, c) => { if (o.trim().split("\n").pop().trim() !== "8") return "Il faut 8 années. Vérifie la condition (<= 200000) et que annees augmente de 1 à chaque tour."; if (!/while/.test(c)) return "Utilise une boucle while."; return true; }
  }
}
  ]
});
