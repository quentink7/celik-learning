/* Cours Python — Partie 3 : ranger les données */
(window.PY_PARTS = window.PY_PARTS || []).push({
  title: "Ranger les données",
  lessons: [
/* ------------------------------------------------------------------ */
{ id: "p10", title: "Les listes : plusieurs valeurs dans une variable", minutes: 30,
  goal: "Créer une liste, lire un élément par sa position, ajouter, modifier et retirer des éléments.",
  why: `<p>Une variable par valeur, ça ne tient pas : pour les notes de 500 élèves, il faudrait 500 variables. Une <strong>liste</strong> range autant de valeurs qu'on veut, dans l'ordre, sous un seul nom.</p>`,
  sections: [
    { h: "Créer une liste",
      html: `<pre><code>ports = [22, 80, 443]
noms = ["Awa", "Moussa", "Inès"]
vide = []</code></pre>
<p>Crochets <code>[ ]</code>, éléments séparés par des virgules. Une liste peut contenir n'importe quel type, et même un mélange.</p>
<div class="box plain"><b class="tag">En clair</b><p>Imagine une rangée de casiers numérotés. Chaque casier contient une valeur. Le numéro du casier s'appelle l'<strong>indice</strong> (ou index).</p></div>` },
    { h: "Lire un élément : l'indice commence à 0",
      html: `<pre><code>noms = ["Awa", "Moussa", "Inès"]
print(noms[0])    # Awa     (le premier)
print(noms[2])    # Inès    (le troisième)
print(noms[-1])   # Inès    (-1 = le dernier)
print(len(noms))  # 3       (le nombre d'éléments)</code></pre>
<div class="trace"><table><thead><tr><th>Élément</th><th>"Awa"</th><th>"Moussa"</th><th>"Inès"</th></tr></thead><tbody>
<tr><td>Indice</td><td>0</td><td>1</td><td>2</td></tr>
<tr><td>Depuis la fin</td><td>-3</td><td>-2</td><td>-1</td></tr>
</tbody></table></div>
<div class="box why"><b class="tag">À retenir</b><p>Le premier élément est à l'indice <strong>0</strong>, et le dernier à <code>len(liste) - 1</code>. Demander <code>noms[3]</code> dans une liste de 3 éléments provoque une <code>IndexError</code>.</p></div>
<p>On peut aussi prendre une <strong>tranche</strong> : <code>noms[0:2]</code> donne <code>["Awa", "Moussa"]</code> (de l'indice 0 jusqu'à 2 exclu, comme <code>range</code>).</p>` },
    { h: "Modifier une liste",
      html: `<div class="table-wrap"><table><thead><tr><th>Action</th><th>Code</th><th>Résultat avec [22, 80]</th></tr></thead><tbody>
<tr><td>ajouter à la fin</td><td><code>ports.append(443)</code></td><td>[22, 80, 443]</td></tr>
<tr><td>remplacer</td><td><code>ports[0] = 2222</code></td><td>[2222, 80]</td></tr>
<tr><td>retirer une valeur</td><td><code>ports.remove(80)</code></td><td>[22]</td></tr>
<tr><td>retirer le dernier</td><td><code>ports.pop()</code></td><td>[22]</td></tr>
<tr><td>trier</td><td><code>ports.sort()</code></td><td>du plus petit au plus grand</td></tr>
<tr><td>tester la présence</td><td><code>22 in ports</code></td><td>True</td></tr>
</tbody></table></div>
<p><code>append</code>, <code>remove</code>, <code>sort</code>… s'appellent des <strong>méthodes</strong> : des fonctions attachées à la liste, qu'on appelle avec un point. Elles modifient la liste directement.</p>` },
    { h: "Statistiques rapides",
      html: `<pre><code>notes = [12, 15, 9, 17]
print(sum(notes))               # 53
print(min(notes), max(notes))   # 9 17
print(sum(notes) / len(notes))  # 13.25 : la moyenne</code></pre>
<p>La moyenne, c'est la somme divisée par le nombre d'éléments. Tu retrouveras ce calcul partout en machine learning.</p>` }
  ],
  pitfalls: [
    "Commencer à compter à 1 : le premier élément est <code>liste[0]</code>.",
    "Écrire <code>ports = ports.append(443)</code> : append modifie la liste et renvoie None, donc ports devient None. Écris juste <code>ports.append(443)</code>.",
    "Utiliser <code>liste[len(liste)]</code> pour le dernier : c'est <code>liste[len(liste) - 1]</code> ou <code>liste[-1]</code>."
  ],
  remember: ["[a, b, c] crée une liste ; len() donne sa taille.", "Indices de 0 à len − 1 ; -1 est le dernier.", ".append() ajoute, .remove() retire, in teste la présence.", "sum, min, max fonctionnent sur les listes de nombres."],
  quiz: [
    { q: "l = [5, 8, 3]. Que vaut l[1] ?", options: ["5", "8", "3", "IndexError"], answer: 1, explain: "Indice 0 → 5, indice 1 → 8." },
    { q: "l = [5, 8, 3]. Que vaut l[-1] ?", options: ["5", "8", "3", "IndexError"], answer: 2, explain: "-1 désigne le dernier élément." },
    { q: "Après l = [1, 2] puis l.append(3), que vaut len(l) ?", options: ["2", "3", "4"], answer: 1, explain: "append ajoute un élément à la fin : [1, 2, 3]." }
  ],
  exercise: {
    task: `Voici une liste de ports ouverts : <code>ports = [80, 22, 443]</code>. Ajoute le port <code>3389</code>, retire le port <code>80</code>, trie la liste, puis affiche-la. On attend <code>[22, 443, 3389]</code>.`,
    hint: `ports.append(3389), ports.remove(80), ports.sort(), print(ports).`,
    start: `ports = [80, 22, 443]\n\n`,
    sol: `ports = [80, 22, 443]\nports.append(3389)\nports.remove(80)\nports.sort()\nprint(ports)`,
    check: (o, c) => { if (o.trim().split("\n").pop().replace(/\s/g, "") !== "[22,443,3389]") return "La liste affichée doit être [22, 443, 3389]."; if (!/append/.test(c) || !/remove/.test(c) || !/sort/.test(c)) return "Utilise append, remove et sort."; return true; }
  }
},
/* ------------------------------------------------------------------ */
{ id: "p11", title: "Parcourir et filtrer une liste", minutes: 30,
  goal: "Passer sur chaque élément d'une liste avec for, filtrer, compter et construire une nouvelle liste.",
  why: `<p>Les vraies données arrivent sous forme de listes : des notes, des montants, des ventes. La compétence clé est de les parcourir pour <strong>calculer, compter ou trier</strong> ce qui t'intéresse.</p>`,
  sections: [
    { h: "Parcourir directement les éléments",
      html: `<pre><code>montants = [1500, 300, 12000, 750]
for m in montants:
    print(m)</code></pre>
<p>Pas besoin d'indice : <code>m</code> prend successivement chaque valeur de la liste. C'est la façon la plus simple et la plus « pythonique » de parcourir.</p>
<p>Si tu as besoin de la position en plus de la valeur, utilise <code>enumerate</code> :</p>
<pre><code>for i, m in enumerate(montants):
    print(i, m)    # 0 1500, puis 1 300, ...</code></pre>` },
    { h: "Les trois motifs à connaître par cœur",
      html: `<p><strong>1. Compter</strong> les éléments qui respectent une condition :</p>
<pre><code>gros = 0
for m in montants:
    if m &gt; 1000:
        gros += 1
print(gros)   # 2</code></pre>
<p><strong>2. Filtrer</strong> : construire une nouvelle liste avec seulement certains éléments :</p>
<pre><code>suspects = []
for m in montants:
    if m &gt; 1000:
        suspects.append(m)
print(suspects)   # [1500, 12000]</code></pre>
<p><strong>3. Transformer</strong> : construire une liste à partir d'une autre :</p>
<pre><code>en_milliers = []
for m in montants:
    en_milliers.append(m / 1000)
print(en_milliers)   # [1.5, 0.3, 12.0, 0.75]</code></pre>
<div class="box plain"><b class="tag">En clair</b><p>Le schéma est toujours le même : 1) une variable ou une liste vide <strong>avant</strong> la boucle ; 2) la boucle qui la remplit ; 3) le résultat utilisé <strong>après</strong>.</p></div>` },
    { h: "Le raccourci : la compréhension de liste",
      html: `<p>Python permet d'écrire filtrer et transformer en une ligne :</p>
<pre><code>suspects = [m for m in montants if m &gt; 1000]
en_milliers = [m / 1000 for m in montants]</code></pre>
<div class="box steps"><b class="tag">Pas à pas : lire [m / 1000 for m in montants if m &gt; 1000]</b><ol>
<li><code>for m in montants</code> : pour chaque montant…</li>
<li><code>if m &gt; 1000</code> : … seulement s'il dépasse 1000…</li>
<li><code>m / 1000</code> : … mets m / 1000 dans la nouvelle liste.</li></ol></div>
<p>C'est très utilisé en data et en ML. Mais la version en plusieurs lignes est tout aussi correcte : utilise celle que tu comprends.</p>` }
  ],
  pitfalls: [
    "Modifier une liste pendant qu'on la parcourt (retirer des éléments dans le for) : des éléments sont sautés. Construis plutôt une nouvelle liste.",
    "Oublier la liste vide avant la boucle : <code>suspects.append(...)</code> donne NameError.",
    "Confondre l'élément et sa position : dans <code>for m in montants</code>, m est une valeur, pas un indice."
  ],
  remember: ["for x in liste: parcourt les valeurs.", "Compter : compteur += 1 sous un if.", "Filtrer / transformer : liste vide + append dans la boucle.", "[expr for x in liste if condition] : version courte."],
  quiz: [
    { q: "Que vaut [x * 2 for x in [1, 2, 3]] ?", options: ["[1, 2, 3, 1, 2, 3]", "[2, 4, 6]", "12", "[1, 4, 9]"], answer: 1, explain: "Chaque élément est multiplié par 2." },
    { q: "Que vaut [x for x in [4, 7, 10] if x > 5] ?", options: ["[4]", "[7, 10]", "[True, True]", "2"], answer: 1, explain: "On garde seulement les éléments qui respectent la condition." },
    { q: "Pourquoi créer resultats = [] avant la boucle ?", options: ["Pour pouvoir y ajouter des éléments avec append", "Pour accélérer la boucle", "Ce n'est pas nécessaire"], answer: 0, explain: "On ne peut pas appeler append sur une liste qui n'existe pas encore." }
  ],
  exercise: {
    task: `Voici les durées de tes appels téléphoniques de la semaine, en minutes : <code>durees = [5, 120, 45, 300, 15, 90]</code>. Construis une liste <code>longues</code> avec les durées <strong>strictement supérieures à 60</strong>, puis affiche-la et affiche combien il y en a. On attend <code>[120, 300, 90]</code> puis <code>3</code>.`,
    hint: `longues = [] ; for d in durees: if d > 60: longues.append(d). Puis print(longues) et print(len(longues)).`,
    start: `durees = [5, 120, 45, 300, 15, 90]\n\n`,
    sol: `durees = [5, 120, 45, 300, 15, 90]\nlongues = []\nfor d in durees:\n    if d > 60:\n        longues.append(d)\nprint(longues)\nprint(len(longues))`,
    check: (o) => { const l = o.trim().split("\n").map(s => s.replace(/\s/g, "")); if (l.length < 2) return "Affiche la liste puis le nombre d'éléments (deux lignes)."; if (l[l.length - 2] !== "[120,300,90]") return "La liste doit être [120, 300, 90], dans l'ordre d'origine."; if (l[l.length - 1] !== "3") return "La dernière ligne doit être 3."; return true; }
  }
},
/* ------------------------------------------------------------------ */
{ id: "p12", title: "Les dictionnaires : associer une clé à une valeur", minutes: 30,
  goal: "Ranger des informations par nom plutôt que par position, et compter des occurrences.",
  why: `<p>Une liste range par position (0, 1, 2…). Mais souvent on veut chercher par <strong>nom</strong> : le prix du « riz », le numéro de téléphone de « Moussa ». C'est exactement ce que fait un <strong>dictionnaire</strong>.</p>`,
  sections: [
    { h: "Créer et lire un dictionnaire",
      html: `<pre><code>menu = {"riz gras": 1500, "tô": 800, "poulet": 3500}
print(menu["poulet"])   # 3500</code></pre>
<ul><li>Accolades <code>{ }</code>.</li>
<li>Chaque entrée est une paire <strong>clé : valeur</strong>.</li>
<li>On lit une valeur avec sa clé entre crochets.</li></ul>
<div class="box plain"><b class="tag">En clair</b><p>Comme un vrai dictionnaire : tu cherches un mot (la clé) et tu trouves sa définition (la valeur). Ou comme un répertoire de téléphone : nom → numéro. Chaque clé est unique.</p></div>` },
    { h: "Ajouter, modifier, tester",
      html: `<pre><code>menu["jus de bissap"] = 500     # ajoute (la clé n'existait pas)
menu["tô"] = 900                # modifie (la clé existait)
print("poulet" in menu)         # True : in teste les CLÉS
print(len(menu))                # 4
print(menu.get("pizza", 0))     # 0 : .get évite l'erreur si la clé manque</code></pre>
<p>Si tu écris <code>menu["pizza"]</code> alors que la clé n'existe pas, Python lève une <code>KeyError</code>. La méthode <code>.get(cle, valeur_par_defaut)</code> renvoie la valeur par défaut à la place.</p>` },
    { h: "Parcourir un dictionnaire",
      html: `<pre><code>for plat, prix in menu.items():
    print(f"{plat} : {prix} F")</code></pre>
<p><code>.items()</code> donne les paires (clé, valeur). Il existe aussi <code>.keys()</code> (les clés seules) et <code>.values()</code> (les valeurs seules).</p>` },
    { h: "Le motif du compteur (très utile)",
      html: `<p>Compter combien de fois chaque élément apparaît. Par exemple, les votes pour élire le délégué de la classe :</p>
<pre><code>votes = ["Awa", "Moussa", "Awa", "Awa"]
compte = {}
for nom in votes:
    compte[nom] = compte.get(nom, 0) + 1
print(compte)   # {'Awa': 3, 'Moussa': 1}</code></pre>
<div class="trace"><table><thead><tr><th>Tour</th><th>nom</th><th>compte.get(nom, 0)</th><th>compte après</th></tr></thead><tbody>
<tr><td>1</td><td>Awa</td><td>0 (absente)</td><td>{Awa: 1}</td></tr>
<tr><td>2</td><td>Moussa</td><td>0 (absent)</td><td>{Awa: 1, Moussa: 1}</td></tr>
<tr><td>3</td><td>Awa</td><td>1</td><td>{Awa: 2, Moussa: 1}</td></tr>
<tr><td>4</td><td>Awa</td><td>2</td><td>{Awa: 3, Moussa: 1}</td></tr>
</tbody></table></div>
<p>C'est le même motif pour compter des ventes par produit, des mots dans un texte ou des réponses à un sondage.</p>` }
  ],
  pitfalls: [
    "Lire une clé absente avec <code>d[cle]</code> : KeyError. Utilise <code>d.get(cle, defaut)</code> ou teste <code>cle in d</code> avant.",
    "Croire que <code>in</code> cherche dans les valeurs : il cherche dans les clés.",
    "Oublier que les clés sont sensibles aux majuscules : \"Tô\" et \"tô\" sont deux clés différentes."
  ],
  remember: ["{clé: valeur, ...} crée un dictionnaire.", "d[clé] lit, d[clé] = v ajoute ou modifie.", "d.get(clé, défaut) évite la KeyError.", "for k, v in d.items(): parcourt les paires.", "Compteur : d[x] = d.get(x, 0) + 1."],
  quiz: [
    { q: "d = {\"a\": 1, \"b\": 2}. Que vaut d[\"b\"] ?", options: ["1", "2", "\"b\"", "KeyError"], answer: 1, explain: "On lit la valeur associée à la clé \"b\"." },
    { q: "d = {\"a\": 1}. Que vaut d.get(\"z\", 0) ?", options: ["KeyError", "None", "0", "1"], answer: 2, explain: "La clé n'existe pas : .get renvoie la valeur par défaut donnée." },
    { q: "Que teste « \"a\" in d » ?", options: ["Si \"a\" est une valeur", "Si \"a\" est une clé", "Si d est vide"], answer: 1, explain: "in sur un dictionnaire porte sur les clés." }
  ],
  exercise: {
    task: `Compte les occurrences de chaque utilisateur dans <code>echecs = ["root", "admin", "root", "awa", "root", "admin"]</code> avec un dictionnaire <code>compte</code>. Affiche ensuite <code>compte["root"]</code> (on attend <code>3</code>) puis <code>compte["admin"]</code> (on attend <code>2</code>).`,
    hint: `compte = {} ; for u in echecs: compte[u] = compte.get(u, 0) + 1`,
    start: `echecs = ["root", "admin", "root", "awa", "root", "admin"]\ncompte = {}\n\n`,
    sol: `echecs = ["root", "admin", "root", "awa", "root", "admin"]\ncompte = {}\nfor u in echecs:\n    compte[u] = compte.get(u, 0) + 1\nprint(compte["root"])\nprint(compte["admin"])`,
    check: (o, c) => { const l = o.trim().split("\n").map(s => s.trim()); if (l.slice(-2).join(",") !== "3,2") return "Les deux dernières lignes doivent être 3 puis 2."; if (!/for\s/.test(c)) return "Utilise une boucle for pour compter."; if (/=\s*3\b/.test(c)) return "Ne mets pas les résultats à la main : laisse la boucle compter."; return true; }
  }
},
/* ------------------------------------------------------------------ */
{ id: "p13", title: "Travailler avec du texte", minutes: 30,
  goal: "Nettoyer, découper et analyser du texte avec les méthodes des chaînes.",
  why: `<p>Les SMS, les emails, les fichiers CSV, les réponses d'un formulaire : tout est du texte. Savoir le découper et le nettoyer est indispensable dès qu'on travaille avec de vraies données.</p>`,
  sections: [
    { h: "Une chaîne, c'est une suite de caractères",
      html: `<pre><code>s = "Python"
print(len(s))     # 6
print(s[0])       # P   (comme une liste : indice 0)
print(s[-1])      # n
print(s[0:3])     # Pyt</code></pre>
<p>Différence importante avec une liste : une chaîne <strong>ne se modifie pas</strong>. Les méthodes renvoient une <strong>nouvelle</strong> chaîne ; il faut la ranger quelque part.</p>
<pre><code>nom = "  awa  "
nom.strip()         # ne change pas nom !
nom = nom.strip()   # là, oui</code></pre>` },
    { h: "Les méthodes à connaître",
      html: `<div class="table-wrap"><table><thead><tr><th>Méthode</th><th>Effet</th><th>Exemple → résultat</th></tr></thead><tbody>
<tr><td><code>.strip()</code></td><td>enlève espaces et retours à la ligne au début et à la fin</td><td><code>"  ok \\n".strip()</code> → "ok"</td></tr>
<tr><td><code>.lower()</code> / <code>.upper()</code></td><td>minuscules / majuscules</td><td><code>"OUAGA".lower()</code> → "ouaga"</td></tr>
<tr><td><code>.replace(a, b)</code></td><td>remplace a par b</td><td><code>"1,5".replace(",", ".")</code> → "1.5"</td></tr>
<tr><td><code>.startswith(x)</code></td><td>commence par x ?</td><td><code>"BF-226".startswith("BF")</code> → True</td></tr>
<tr><td><code>.split(sep)</code></td><td>découpe en liste</td><td><code>"a;b;c".split(";")</code> → ["a", "b", "c"]</td></tr>
<tr><td><code>sep.join(liste)</code></td><td>recolle une liste</td><td><code>"-".join(["a", "b"])</code> → "a-b"</td></tr>
<tr><td><code>.count(x)</code></td><td>nombre d'apparitions</td><td><code>"banane".count("a")</code> → 3</td></tr>
</tbody></table></div>` },
    { h: "split() : la méthode reine",
      html: `<p>Une ligne d'un relevé de compte (ou d'un fichier exporté) ressemble souvent à ceci : des champs séparés par un caractère.</p>
<pre><code>ligne = "2026-10-12 08:15:03 DEPOT Awa 5000"
champs = ligne.split(" ")
print(champs)
# ['2026-10-12', '08:15:03', 'DEPOT', 'Awa', '5000']
operation = champs[2]
montant = champs[4]
print(operation, montant)   # DEPOT 5000</code></pre>
<div class="box steps"><b class="tag">Pas à pas</b><ol>
<li><code>split(" ")</code> coupe la ligne à chaque espace et renvoie une <strong>liste</strong> de morceaux.</li>
<li>Chaque morceau a un indice : la date est en 0, l'heure en 1, l'opération en 2…</li>
<li>On récupère le champ voulu par son indice, comme dans n'importe quelle liste.</li></ol></div>
<p>Sans argument, <code>split()</code> coupe sur n'importe quel blanc (plusieurs espaces, tabulations) : c'est souvent plus robuste.</p>` },
    { h: "Enchaîner les méthodes",
      html: `<p>Comme chaque méthode renvoie une chaîne, on peut les enchaîner de gauche à droite :</p>
<pre><code>saisie = "  OUAGADOUGOU \\n"
print(saisie.strip().lower())   # ouagadougou</code></pre>
<p>Python fait d'abord <code>strip()</code> (→ "OUAGADOUGOU"), puis <code>lower()</code> sur le résultat (→ "ouagadougou").</p>` }
  ],
  pitfalls: [
    "Appeler une méthode sans ranger le résultat : <code>s.upper()</code> seul ne change pas s.",
    "Oublier que split renvoie une liste : on accède ensuite aux morceaux par indice.",
    "Comparer sans normaliser : \"Ouaga\" != \"ouaga\". Pense à .lower() et .strip()."
  ],
  remember: ["Une chaîne ne se modifie pas : s = s.methode().", "strip, lower, replace pour nettoyer.", "split découpe en liste, join recolle.", "Les méthodes s'enchaînent : s.strip().lower()."],
  quiz: [
    { q: "Que donne \"a,b,c\".split(\",\") ?", options: ["\"abc\"", "[\"a\", \"b\", \"c\"]", "[\"a,b,c\"]", "3"], answer: 1, explain: "split coupe au séparateur et renvoie une liste." },
    { q: "s = \" Hi \". Après s.strip() (seul sur sa ligne), que vaut s ?", options: ["\"Hi\"", "\" Hi \"", "\"hi\""], answer: 1, explain: "Les chaînes ne se modifient pas : il fallait écrire s = s.strip()." },
    { q: "Que donne \"Awa\".lower() == \"awa\" ?", options: ["True", "False"], answer: 0, explain: "lower met tout en minuscules avant la comparaison." }
  ],
  exercise: {
    task: `Voici une ligne d'un relevé de compte : <code>ligne = "2026-10-12 08:15:03 DEPOT Awa 5000"</code>. Avec <code>split()</code>, récupère le nom et le montant, puis affiche exactement : <code>Dépôt de 5000 F par Awa</code>.`,
    hint: `champs = ligne.split() ; nom = champs[3] ; montant = champs[4] ; puis une f-string.`,
    start: `ligne = "2026-10-12 08:15:03 DEPOT Awa 5000"\n\n`,
    sol: `ligne = "2026-10-12 08:15:03 DEPOT Awa 5000"\nchamps = ligne.split()\nnom = champs[3]\nmontant = champs[4]\nprint(f"Dépôt de {montant} F par {nom}")`,
    check: (o, c) => { if (o.indexOf("Dépôt de 5000 F par Awa") < 0) return "La phrase attendue est : Dépôt de 5000 F par Awa (avec l'accent sur le ô)."; if (!/split/.test(c)) return "Utilise split() pour découper la ligne."; if (/print\([^)]*(5000|Awa)/.test(c)) return "Ne recopie pas le nom ou le montant à la main : prends-les dans la liste découpée."; return true; }
  }
}
  ]
});
