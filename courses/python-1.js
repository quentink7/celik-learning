/* Cours Python — Partie 1 : premiers pas */
(window.PY_PARTS = window.PY_PARTS || []).push({
  title: "Premiers pas",
  lessons: [
/* ------------------------------------------------------------------ */
{ id: "p01", title: "Programmer, c'est quoi ? Ton premier print()", minutes: 20,
  goal: "Comprendre ce qu'est un programme, comment Python le lit, et afficher du texte avec print().",
  why: `<p>Un ordinateur ne devine rien : il exécute exactement ce qu'on lui écrit, dans l'ordre. Programmer, c'est écrire ces instructions dans une langue qu'il comprend. Python est une de ces langues : elle est lisible, proche de l'anglais, et on l'utilise partout (sites web, data, intelligence artificielle, cybersécurité).</p>`,
  sections: [
    { h: "Un programme, c'est une recette",
      html: `<p>Pense à une recette de cuisine : « 1. Casse les œufs. 2. Bats-les. 3. Verse dans la poêle. » On fait les étapes <strong>une par une, de haut en bas</strong>. Si tu inverses 1 et 3, le résultat est raté.</p>
<p>Un programme Python, c'est pareil : un fichier texte avec une instruction par ligne. Python lit la ligne 1, l'exécute, puis la ligne 2, et ainsi de suite jusqu'à la fin.</p>
<div class="box plain"><b class="tag">En clair</b><p>Le <strong>code</strong>, c'est le texte que tu écris. <strong>Exécuter</strong> (ou « lancer »), c'est demander à Python de suivre ces instructions. Le résultat apparaît dans la <strong>console</strong>, la zone noire à droite.</p></div>` },
    { h: "Afficher quelque chose : print()",
      html: `<p>La première instruction à connaître est <code>print()</code>, qui veut dire « imprimer » : elle <strong>affiche</strong> dans la console ce que tu mets entre ses parenthèses.</p>
<pre><code>print("Bonjour !")</code></pre>
<p>Décortiquons cette ligne :</p>
<ul><li><code>print</code> est le nom de l'instruction. On appelle ça une <strong>fonction</strong> : un outil tout prêt qui fait une tâche.</li>
<li>Les <strong>parenthèses</strong> <code>( )</code> contiennent ce qu'on donne à la fonction.</li>
<li>Les <strong>guillemets</strong> <code>" "</code> indiquent que <code>Bonjour !</code> est du <strong>texte</strong>. Python l'affiche tel quel, sans les guillemets.</li></ul>
<p>Avec plusieurs lignes, Python les exécute dans l'ordre :</p>
<pre><code>print("Ligne 1")
print("Ligne 2")
print("Ligne 3")</code></pre>
<p>Chaque <code>print()</code> affiche sur une nouvelle ligne.</p>` },
    { h: "Plusieurs valeurs dans un seul print()",
      html: `<p>On peut donner plusieurs choses à <code>print()</code> en les séparant par des virgules. Python les affiche côte à côte, <strong>séparées par un espace</strong> :</p>
<pre><code>print("Python", "est", "simple")
# affiche : Python est simple</code></pre>
<p>La ligne qui commence par <code>#</code> est un <strong>commentaire</strong>. Python l'ignore complètement : c'est une note pour les humains qui lisent le code. Tu peux en écrire autant que tu veux pour t'aider à comprendre.</p>` },
    { h: "Texte ou nombre ?",
      html: `<p>Le texte va <strong>entre guillemets</strong>. Les nombres s'écrivent <strong>sans guillemets</strong>, et Python peut alors calculer avec :</p>
<pre><code>print(7 + 3)     # affiche 10
print("7 + 3")   # affiche 7 + 3 (c'est du texte, pas un calcul)</code></pre>
<div class="trace"><table><thead><tr><th>Ligne</th><th>Ce que Python voit</th><th>Affichage</th></tr></thead><tbody>
<tr><td>1</td><td>un calcul entre deux nombres : il le fait</td><td><code>10</code></td></tr>
<tr><td>2</td><td>un texte (il y a des guillemets) : il l'affiche tel quel</td><td><code>7 + 3</code></td></tr>
</tbody></table></div>
<div class="box why"><b class="tag">À retenir</b><p>Les guillemets changent tout : avec, c'est du texte qu'on recopie ; sans, c'est une valeur que Python interprète.</p></div>` }
  ],
  pitfalls: [
    "Oublier un guillemet : <code>print(\"Bonjour)</code> provoque une <code>SyntaxError</code>. Les guillemets vont toujours par deux.",
    "Écrire <code>Print</code> avec une majuscule : Python fait la différence entre majuscules et minuscules. Seul <code>print</code> existe.",
    "Oublier les guillemets autour d'un texte : <code>print(Bonjour)</code> donne une <code>NameError</code>, car Python croit que <code>Bonjour</code> est le nom d'une variable."
  ],
  remember: ["Python exécute les lignes une par une, de haut en bas.", "print(...) affiche ce qu'il y a entre parenthèses.", "Texte entre guillemets, nombres sans guillemets.", "# commence un commentaire, ignoré par Python."],
  quiz: [
    { q: "Qu'affiche print(\"5 * 2\") ?", options: ["10", "5 * 2", "\"5 * 2\"", "Une erreur"], answer: 1, explain: "Avec des guillemets, c'est du texte : Python l'affiche tel quel, sans les guillemets et sans calculer." },
    { q: "Qu'affiche print(\"A\", \"B\") ?", options: ["AB", "A B", "A, B", "A\\nB"], answer: 1, explain: "Plusieurs valeurs séparées par des virgules sont affichées avec un espace entre elles." },
    { q: "Que fait Python d'une ligne qui commence par # ?", options: ["Il l'affiche", "Il l'ignore", "Il s'arrête", "Il la met en gras"], answer: 1, explain: "C'est un commentaire : une note pour les humains, ignorée à l'exécution." }
  ],
  exercise: {
    task: `Affiche <strong>deux lignes</strong> : d'abord une phrase qui commence par <code>Bonjour, je m'appelle</code> suivie de ton prénom, puis le résultat du calcul <code>365 * 24</code> (le nombre d'heures dans une année).`,
    hint: `Deux print(). Le premier contient du texte entre guillemets. Le second contient le calcul SANS guillemets.`,
    start: `# Écris ton code ici, une instruction par ligne\n`,
    sol: `print("Bonjour, je m'appelle Awa")\nprint(365 * 24)`,
    check: (o) => { const l = o.trim().split("\n").map(s => s.trim()); if (l.length < 2) return "Il faut deux lignes affichées : deux print()."; if (!/^bonjour, je m.appelle\s+\S/i.test(l[0])) return "La première ligne doit commencer par « Bonjour, je m'appelle » suivi d'un prénom."; if (o.indexOf("8760") < 0) return "La deuxième ligne doit afficher 8760 : écris le calcul 365 * 24 sans guillemets."; return true; }
  }
},
/* ------------------------------------------------------------------ */
{ id: "p02", title: "Les nombres et les calculs", minutes: 20,
  goal: "Faire des calculs avec Python : les quatre opérations, la puissance, la division entière et le reste.",
  why: `<p>Calculer, c'est la base de presque tout programme : un total de panier, une moyenne de notes, la monnaie à rendre au marché. Python est une excellente calculatrice, à condition de connaître ses symboles.</p>`,
  sections: [
    { h: "Les opérations de base",
      html: `<div class="table-wrap"><table><thead><tr><th>Symbole</th><th>Opération</th><th>Exemple</th><th>Résultat</th></tr></thead><tbody>
<tr><td><code>+</code></td><td>addition</td><td><code>7 + 2</code></td><td>9</td></tr>
<tr><td><code>-</code></td><td>soustraction</td><td><code>7 - 2</code></td><td>5</td></tr>
<tr><td><code>*</code></td><td>multiplication (l'étoile, pas le x)</td><td><code>7 * 2</code></td><td>14</td></tr>
<tr><td><code>/</code></td><td>division</td><td><code>7 / 2</code></td><td>3.5</td></tr>
<tr><td><code>**</code></td><td>puissance (deux étoiles)</td><td><code>2 ** 3</code></td><td>8 (2 × 2 × 2)</td></tr>
<tr><td><code>//</code></td><td>division entière</td><td><code>17 // 5</code></td><td>3</td></tr>
<tr><td><code>%</code></td><td>reste de la division (modulo)</td><td><code>17 % 5</code></td><td>2</td></tr>
</tbody></table></div>
<div class="box plain"><b class="tag">En clair</b><p>Python écrit les décimaux avec un <strong>point</strong>, à l'anglaise : <code>3.5</code> et non 3,5. Si tu écris <code>3,5</code>, Python comprend « deux nombres, 3 et 5 ».</p></div>` },
    { h: "Division entière et reste : les deux outils méconnus",
      html: `<p>Souviens-toi de la division posée à l'école primaire : 17 divisé par 5, « il y va 3 fois, il reste 2 ». Python te donne les deux morceaux :</p>
<pre><code>print(17 // 5)   # 3 : combien de fois 5 rentre dans 17
print(17 % 5)    # 2 : ce qui reste</code></pre>
<div class="box steps"><b class="tag">Pas à pas : convertir 135 minutes en heures et minutes</b><ol>
<li>Une heure = 60 minutes. Combien d'heures entières dans 135 ? <code>135 // 60</code> → <strong>2</strong>.</li>
<li>Ces 2 heures font 120 minutes. Il reste <code>135 % 60</code> → <strong>15</strong>.</li>
<li>Réponse : 2 h 15 min.</li></ol></div>
<p>Usage très courant de <code>%</code> : savoir si un nombre est <strong>pair</strong>. Un nombre pair divisé par 2 a un reste de 0, donc <code>n % 2</code> vaut 0 si n est pair, et 1 s'il est impair.</p>` },
    { h: "L'ordre des calculs",
      html: `<p>Python respecte les priorités des maths : d'abord les parenthèses, puis les puissances, puis × et ÷, enfin + et −.</p>
<pre><code>print(2 + 3 * 4)     # 14  (la multiplication passe d'abord : 3 * 4 = 12, puis 2 + 12)
print((2 + 3) * 4)   # 20  (les parenthèses passent d'abord : 5 * 4)</code></pre>
<p>En cas de doute, <strong>mets des parenthèses</strong> : elles ne coûtent rien et rendent le calcul clair.</p>` },
    { h: "Entiers et décimaux",
      html: `<p>Python distingue deux sortes de nombres :</p>
<ul><li>les <strong>entiers</strong> (<code>int</code>) : <code>3</code>, <code>-12</code>, <code>2026</code> ;</li>
<li>les <strong>décimaux</strong> (<code>float</code>, « nombre à virgule flottante ») : <code>3.5</code>, <code>0.1</code>, <code>-2.0</code>.</li></ul>
<p>La division <code>/</code> donne <strong>toujours</strong> un décimal, même si le résultat « tombe juste » : <code>10 / 2</code> donne <code>5.0</code>. Si tu veux un entier, utilise <code>//</code>.</p>
<p>Petite curiosité : <code>print(0.1 + 0.2)</code> affiche <code>0.30000000000000004</code>. Ce n'est pas un bug de Python : l'ordinateur stocke les décimaux en binaire, avec une précision limitée. Pour l'affichage, on arrondit avec <code>round(nombre, 2)</code>.</p>` }
  ],
  pitfalls: [
    "Utiliser x ou × pour multiplier : en Python c'est <code>*</code>.",
    "Écrire <code>3,5</code> au lieu de <code>3.5</code> : la virgule sépare deux valeurs, elle ne fait pas un décimal.",
    "Confondre <code>/</code> (division normale, résultat décimal) et <code>//</code> (division entière)."
  ],
  remember: ["* multiplie, ** met à la puissance.", "/ donne un décimal, // un entier, % le reste.", "Les décimaux s'écrivent avec un point.", "Parenthèses en cas de doute sur l'ordre."],
  quiz: [
    { q: "Que vaut 23 % 4 ?", options: ["5", "5.75", "3", "4"], answer: 2, explain: "4 rentre 5 fois dans 23 (5 × 4 = 20) et il reste 3." },
    { q: "Que vaut 10 / 4 ?", options: ["2", "2.5", "2,5", "2 reste 2"], answer: 1, explain: "La division / donne toujours un décimal, écrit avec un point." },
    { q: "Que vaut 2 + 2 ** 3 ?", options: ["64", "10", "16", "12"], answer: 1, explain: "La puissance passe avant l'addition : 2 ** 3 = 8, puis 2 + 8 = 10." }
  ],
  exercise: {
    task: `Un car a roulé pendant <code>10000</code> secondes entre Ouagadougou et Koudougou. Affiche sur <strong>trois lignes</strong> : le nombre d'heures entières, puis le nombre de minutes entières restantes, puis les secondes restantes. Résultat attendu : <code>2</code>, <code>46</code>, <code>40</code>.`,
    hint: `Heures : 10000 // 3600. Le reste en secondes : 10000 % 3600, soit 2800. Minutes : 2800 // 60. Secondes : 2800 % 60.`,
    start: `secondes = 10000\n# 1 heure = 3600 secondes, 1 minute = 60 secondes\n\n`,
    sol: `secondes = 10000\nprint(secondes // 3600)\nreste = secondes % 3600\nprint(reste // 60)\nprint(reste % 60)`,
    check: (o, c) => { const l = o.trim().split("\n").map(s => s.trim()); if (l.length < 3) return "Il faut trois lignes : heures, minutes, secondes."; if (l[0] !== "2") return "Première ligne : 10000 // 3600 doit donner 2."; if (l[1] !== "46") return "Deuxième ligne : il faut les minutes restantes (46). Utilise le reste % 3600, puis // 60."; if (l[2] !== "40") return "Troisième ligne : les secondes restantes (40)."; if (!/%/.test(c)) return "Utilise l'opérateur % (reste) dans ton calcul."; return true; }
  }
},
/* ------------------------------------------------------------------ */
{ id: "p03", title: "Les variables : donner un nom à une valeur", minutes: 25,
  goal: "Créer des variables, les modifier, et comprendre ce qui se passe dans la mémoire.",
  why: `<p>Sans variables, il faudrait réécrire chaque valeur partout. Avec elles, on stocke une information une fois (un nom, un score, un numéro de téléphone) et on la réutilise. C'est la brique de base de tous les programmes.</p>`,
  sections: [
    { h: "Une étiquette collée sur une valeur",
      html: `<p>Une <strong>variable</strong> est un nom qui désigne une valeur. On la crée avec le signe <code>=</code> :</p>
<pre><code>age = 21</code></pre>
<div class="box plain"><b class="tag">En clair</b><p>Imagine une boîte avec une étiquette « age » dessus, et 21 rangé dedans. Chaque fois que tu écris <code>age</code>, Python va chercher ce qu'il y a dans la boîte.</p></div>
<p><strong>Attention</strong> : en Python, <code>=</code> ne veut pas dire « est égal à » comme en maths. Il veut dire « <strong>range la valeur de droite dans la variable de gauche</strong> ». On dit qu'on <strong>affecte</strong> une valeur à la variable.</p>
<pre><code>prenom = "Awa"
age = 21
print(prenom)   # Awa
print(age)      # 21</code></pre>
<p>Remarque : <code>print(prenom)</code> sans guillemets affiche le <em>contenu</em> de la variable. <code>print("prenom")</code> avec guillemets afficherait le mot « prenom ».</p>` },
    { h: "Changer la valeur d'une variable",
      html: `<p>Une variable peut changer (d'où son nom). La nouvelle valeur remplace l'ancienne :</p>
<pre><code>score = 10
score = 15
print(score)   # 15</code></pre>
<p>On peut aussi calculer la nouvelle valeur <strong>à partir de l'ancienne</strong>. C'est la ligne qui déroute le plus les débutants :</p>
<pre><code>score = 10
score = score + 5
print(score)   # 15</code></pre>
<div class="box steps"><b class="tag">Pas à pas : score = score + 5</b><ol>
<li>Python lit <strong>d'abord la partie droite</strong> du <code>=</code> : <code>score + 5</code>.</li>
<li>Il va chercher la valeur actuelle de <code>score</code> : 10. Il calcule 10 + 5 = 15.</li>
<li>Puis il range ce 15 dans <code>score</code>, à la place de 10.</li></ol></div>
<p>C'est tellement courant qu'il existe un raccourci : <code>score += 5</code> veut dire exactement <code>score = score + 5</code>. De même <code>-=</code>, <code>*=</code>, <code>/=</code>.</p>` },
    { h: "Suivre les variables ligne par ligne",
      html: `<p>Le meilleur réflexe de débutant : faire un <strong>tableau de suivi</strong>. Pour chaque ligne, on note la valeur de chaque variable.</p>
<pre><code>a = 3
b = a * 2
a = 10
print(a, b)</code></pre>
<div class="trace"><table><thead><tr><th>Ligne</th><th>Ce qui se passe</th><th>a</th><th>b</th></tr></thead><tbody>
<tr><td>1</td><td>on range 3 dans a</td><td>3</td><td>—</td></tr>
<tr><td>2</td><td>on calcule a * 2 = 6 et on le range dans b</td><td>3</td><td>6</td></tr>
<tr><td>3</td><td>a reçoit 10 ; b n'est <strong>pas</strong> recalculé</td><td>10</td><td>6</td></tr>
<tr><td>4</td><td>affiche « 10 6 »</td><td>10</td><td>6</td></tr>
</tbody></table></div>
<div class="box why"><b class="tag">À retenir</b><p><code>b = a * 2</code> calcule la valeur <strong>au moment où la ligne s'exécute</strong>. Si <code>a</code> change ensuite, <code>b</code> ne bouge pas. Ce n'est pas une formule d'Excel qui se met à jour toute seule.</p></div>` },
    { h: "Bien nommer ses variables",
      html: `<p>Règles obligatoires :</p>
<ul><li>lettres, chiffres et <code>_</code> seulement (pas d'espace, pas de tiret) ;</li>
<li>ne pas commencer par un chiffre (<code>2eme</code> est interdit, <code>joueur2</code> est permis) ;</li>
<li>majuscules et minuscules sont différentes : <code>Age</code> et <code>age</code> sont deux variables distinctes.</li></ul>
<p>Bonnes habitudes : des noms <strong>qui disent ce qu'ils contiennent</strong> (<code>nb_eleves</code> plutôt que <code>x</code>), en minuscules, avec des <code>_</code> entre les mots. Évite les accents : ils sont permis, mais source d'erreurs de frappe.</p>` }
  ],
  pitfalls: [
    "Utiliser une variable avant de l'avoir créée : <code>print(total)</code> avant <code>total = ...</code> donne une <code>NameError</code>.",
    "Inverser le sens : <code>5 = x</code> est une erreur. La variable est toujours à gauche du <code>=</code>.",
    "Croire que <code>b = a * 2</code> reste « branché » sur a : b garde la valeur calculée à ce moment-là."
  ],
  remember: ["nom = valeur range la valeur dans la variable.", "Python calcule d'abord la droite du =, puis range le résultat à gauche.", "x += 1 est un raccourci pour x = x + 1.", "Des noms clairs, en minuscules, avec des _."],
  quiz: [
    { q: "Après x = 4 puis x = x * 3, que vaut x ?", options: ["4", "7", "12", "x * 3"], answer: 2, explain: "Python calcule la droite avec l'ancienne valeur : 4 * 3 = 12, puis range 12 dans x." },
    { q: "Lequel est un nom de variable valide ?", options: ["2joueurs", "nb-joueurs", "nb joueurs", "nb_joueurs"], answer: 3, explain: "Pas de chiffre au début, pas de tiret, pas d'espace : seul nb_joueurs est valide." },
    { q: "a = 5 ; b = a + 1 ; a = 100. Que vaut b ?", options: ["6", "101", "5", "100"], answer: 0, explain: "b a été calculé quand a valait 5. Changer a ensuite ne modifie pas b." }
  ],
  exercise: {
    task: `Un compte a <code>solde = 5000</code> francs. Avec des variables, fais : un dépôt de <code>2500</code> (utilise <code>+=</code>), puis un retrait de <code>1200</code> (utilise <code>-=</code>). Affiche ensuite le solde final : <code>6300</code>.`,
    hint: `solde += 2500 ajoute 2500 au solde actuel. Puis solde -= 1200. Enfin print(solde).`,
    start: `solde = 5000\n# dépôt de 2500\n\n# retrait de 1200\n\nprint(solde)\n`,
    sol: `solde = 5000\nsolde += 2500\nsolde -= 1200\nprint(solde)`,
    check: (o, c) => { if (o.trim().split("\n").pop().trim() !== "6300") return "Le solde final affiché doit être 6300."; if (!/\+=/.test(c) || !/-=/.test(c)) return "Utilise += pour le dépôt et -= pour le retrait."; if (/6300/.test(c)) return "Ne tape pas 6300 directement : laisse Python le calculer."; return true; }
  }
},
/* ------------------------------------------------------------------ */
{ id: "p04", title: "Les types et les f-strings", minutes: 25,
  goal: "Reconnaître les quatre types de base et construire des phrases qui contiennent des variables.",
  why: `<p>Python traite différemment un texte, un entier, un décimal ou un vrai/faux. Connaître le type d'une valeur évite la majorité des erreurs de débutant, et les f-strings te permettent d'afficher des messages propres.</p>`,
  sections: [
    { h: "Les quatre types de base",
      html: `<div class="table-wrap"><table><thead><tr><th>Type</th><th>Nom complet</th><th>Exemples</th><th>Sert à</th></tr></thead><tbody>
<tr><td><code>str</code></td><td>string, chaîne de caractères</td><td><code>"Awa"</code>, <code>"192.168.1.1"</code>, <code>""</code></td><td>du texte</td></tr>
<tr><td><code>int</code></td><td>integer, entier</td><td><code>21</code>, <code>-3</code>, <code>0</code></td><td>compter</td></tr>
<tr><td><code>float</code></td><td>nombre décimal</td><td><code>1.72</code>, <code>0.5</code></td><td>mesurer</td></tr>
<tr><td><code>bool</code></td><td>booléen</td><td><code>True</code>, <code>False</code></td><td>oui / non</td></tr>
</tbody></table></div>
<p>La fonction <code>type()</code> te dit le type d'une valeur :</p>
<pre><code>print(type("21"))   # &lt;class 'str'&gt;  : avec des guillemets, c'est du texte !
print(type(21))     # &lt;class 'int'&gt;
print(type(21.0))   # &lt;class 'float'&gt;</code></pre>
<div class="box plain"><b class="tag">En clair</b><p><code>"21"</code> et <code>21</code> se ressemblent à l'écran, mais pour Python ce sont deux choses différentes : un texte de deux caractères, et un nombre avec lequel on peut calculer.</p></div>` },
    { h: "Pourquoi le type compte",
      html: `<p>Le même symbole ne fait pas la même chose selon le type :</p>
<pre><code>print(2 + 3)       # 5     : addition de nombres
print("2" + "3")   # 23    : on colle deux textes (concaténation)
print("ha" * 3)    # hahaha : on répète le texte
print("2" + 3)     # TypeError : texte + nombre, Python refuse</code></pre>
<p>Python refuse de deviner ce que tu veux dire avec <code>"2" + 3</code> : coller ou additionner ? Il faut convertir l'un des deux, avec <code>int("2")</code> ou <code>str(3)</code>. On verra ça en détail dans la leçon suivante.</p>` },
    { h: "Les f-strings : glisser des variables dans du texte",
      html: `<p>Pour afficher « Awa a 21 ans » à partir de variables, la meilleure méthode est la <strong>f-string</strong> : on met un <code>f</code> juste avant les guillemets, et les variables entre accolades <code>{ }</code>.</p>
<pre><code>nom = "Awa"
age = 21
print(f"{nom} a {age} ans")   # Awa a 21 ans</code></pre>
<div class="box steps"><b class="tag">Pas à pas : ce que fait Python</b><ol>
<li>Il voit le <code>f</code> devant les guillemets : « ce texte contient des trous à remplir ».</li>
<li>Il remplace <code>{nom}</code> par la valeur de nom : Awa.</li>
<li>Il remplace <code>{age}</code> par 21 (il le convertit en texte tout seul).</li>
<li>Il affiche la phrase complète.</li></ol></div>
<p>On peut même calculer entre les accolades, et arrondir :</p>
<pre><code>print(f"Dans 5 ans : {age + 5} ans")      # Dans 5 ans : 26 ans
prix = 1999.456
print(f"Prix : {prix:.2f} F")            # Prix : 1999.46 F  (.2f = 2 chiffres après le point)</code></pre>` }
  ],
  pitfalls: [
    "Oublier le <code>f</code> : <code>print(\"{nom}\")</code> affiche littéralement {nom}.",
    "Mettre des guillemets autour d'un nombre qu'on veut calculer : <code>\"21\"</code> est du texte.",
    "Écrire <code>true</code> au lieu de <code>True</code> : les booléens prennent une majuscule."
  ],
  remember: ["str (texte), int (entier), float (décimal), bool (True/False).", "type(x) donne le type de x.", "\"2\" + \"3\" colle, 2 + 3 additionne, \"2\" + 3 plante.", "f\"... {variable} ...\" insère des valeurs dans un texte."],
  quiz: [
    { q: "Quel est le type de \"3.14\" ?", options: ["float", "int", "str", "bool"], answer: 2, explain: "Il est entre guillemets : c'est du texte (str), même s'il ressemble à un nombre." },
    { q: "Qu'affiche print(\"5\" + \"5\") ?", options: ["10", "55", "5 5", "TypeError"], answer: 1, explain: "Deux textes avec + sont collés bout à bout : 55." },
    { q: "x = 4. Qu'affiche print(f\"{x * 2}\") ?", options: ["{x * 2}", "x * 2", "8", "44"], answer: 2, explain: "Dans une f-string, ce qui est entre accolades est calculé : 4 * 2 = 8." }
  ],
  exercise: {
    task: `Crée trois variables : <code>ville = "Ouagadougou"</code>, <code>pays = "Burkina Faso"</code> et <code>habitants = 3000000</code>. Avec <strong>une f-string</strong>, affiche exactement : <code>Ouagadougou (Burkina Faso) compte 3000000 habitants</code>.`,
    hint: `print(f"{ville} ({pays}) compte {habitants} habitants") — attention aux espaces et aux parenthèses.`,
    start: `ville = \npays = \nhabitants = \n\n`,
    sol: `ville = "Ouagadougou"\npays = "Burkina Faso"\nhabitants = 3000000\nprint(f"{ville} ({pays}) compte {habitants} habitants")`,
    check: (o, c) => { if (o.indexOf("Ouagadougou (Burkina Faso) compte 3000000 habitants") < 0) return "La phrase n'est pas exactement celle attendue. Vérifie les espaces, les parenthèses et les majuscules."; if (!/f["']/.test(c)) return "Utilise une f-string : f\"...\"."; if (!/\{\s*habitants\s*\}/.test(c)) return "Insère la variable habitants avec {habitants}, ne recopie pas le nombre."; return true; }
  }
},
/* ------------------------------------------------------------------ */
{ id: "p05", title: "input() : dialoguer avec l'utilisateur", minutes: 25,
  goal: "Poser une question à l'utilisateur, récupérer sa réponse et la convertir pour calculer.",
  why: `<p>Jusqu'ici, toutes les valeurs étaient écrites dans le code. Avec <code>input()</code>, le programme devient interactif : il demande un nom, un montant, un mot de passe… et réagit à la réponse.</p>`,
  sections: [
    { h: "Poser une question",
      html: `<pre><code>nom = input("Comment t'appelles-tu ? ")
print(f"Salut {nom} !")</code></pre>
<div class="box steps"><b class="tag">Pas à pas</b><ol>
<li><code>input(...)</code> affiche la question et <strong>met le programme en pause</strong>.</li>
<li>L'utilisateur tape sa réponse et appuie sur Entrée.</li>
<li><code>input</code> renvoie ce qui a été tapé, et le <code>=</code> le range dans <code>nom</code>.</li>
<li>Le programme reprend à la ligne suivante.</li></ol></div>
<p>Ici, quand tu exécutes un programme avec <code>input()</code>, une zone de saisie apparaît sous la console. Astuce : termine ta question par un espace, pour que la réponse ne soit pas collée.</p>` },
    { h: "Le piège : input() renvoie toujours du texte",
      html: `<p>Même si l'utilisateur tape <code>20</code>, <code>input()</code> renvoie le <strong>texte</strong> <code>"20"</code>. Donc ceci plante :</p>
<pre><code>age = input("Ton âge ? ")   # l'utilisateur tape 20
print(age + 1)              # TypeError : "20" + 1</code></pre>
<p>Il faut <strong>convertir</strong> le texte en nombre :</p>
<div class="table-wrap"><table><thead><tr><th>Fonction</th><th>Convertit en</th><th>Exemple</th></tr></thead><tbody>
<tr><td><code>int(...)</code></td><td>entier</td><td><code>int("20")</code> → 20</td></tr>
<tr><td><code>float(...)</code></td><td>décimal</td><td><code>float("1.75")</code> → 1.75</td></tr>
<tr><td><code>str(...)</code></td><td>texte</td><td><code>str(20)</code> → "20"</td></tr>
</tbody></table></div>
<pre><code>age = int(input("Ton âge ? "))
print(age + 1)              # 21</code></pre>
<div class="box plain"><b class="tag">En clair</b><p>Lis <code>int(input("..."))</code> de l'intérieur vers l'extérieur : d'abord <code>input</code> récupère le texte, ensuite <code>int</code> le transforme en nombre, enfin le <code>=</code> le range dans la variable.</p></div>` },
    { h: "Quand la conversion échoue",
      html: `<p><code>int()</code> ne sait convertir que du texte qui ressemble à un entier :</p>
<pre><code>int("42")     # 42
int(" 42 ")   # 42 (les espaces autour sont tolérés)
int("4.2")    # ValueError : ce n'est pas un entier, utilise float()
int("abc")    # ValueError</code></pre>
<p>Pour l'instant, on suppose que l'utilisateur tape une valeur correcte. Dans la leçon sur les erreurs, tu verras comment ne pas planter quand il se trompe.</p>` }
  ],
  pitfalls: [
    "Calculer directement avec le résultat de <code>input()</code> sans le convertir.",
    "Mettre <code>int</code> au mauvais endroit : <code>input(int(\"Âge ? \"))</code> essaie de convertir la question. C'est <code>int(input(\"Âge ? \"))</code>.",
    "Utiliser <code>int()</code> pour un nombre à virgule : utilise <code>float()</code>."
  ],
  remember: ["input(\"question \") affiche la question et renvoie la réponse.", "La réponse est TOUJOURS du texte (str).", "int(), float(), str() convertissent.", "On écrit int(input(\"...\")) pour obtenir un nombre."],
  quiz: [
    { q: "L'utilisateur tape 7. Quel est le type de input() ?", options: ["int", "str", "float", "bool"], answer: 1, explain: "input() renvoie toujours du texte, quoi qu'on tape." },
    { q: "Quelle ligne obtient un nombre entier ?", options: ["n = input(int(\"N ? \"))", "n = int(input(\"N ? \"))", "n = input(\"N ? \") + 0", "n = str(input(\"N ? \"))"], answer: 1, explain: "On récupère d'abord le texte avec input, puis on le convertit avec int." },
    { q: "Que donne int(\"3.5\") ?", options: ["3", "4", "3.5", "ValueError"], answer: 3, explain: "\"3.5\" n'est pas un entier écrit en texte : int refuse. Il faut float(\"3.5\")." }
  ],
  exercise: {
    task: `Demande le <strong>prénom</strong> puis l'<strong>âge</strong> de l'utilisateur. Affiche : <code>&lt;prénom&gt;, l'année prochaine tu auras &lt;âge + 1&gt; ans</code>. La vérification simule les réponses « Awa » et « 20 » : il faut voir <code>Awa</code> et <code>21</code>.`,
    hint: `age = int(input("Ton âge ? ")) puis une f-string avec {age + 1}.`,
    inputs: ["Awa", "20"],
    start: `prenom = input("Ton prénom ? ")\n# demande l'âge et convertis-le en entier\n\n`,
    sol: `prenom = input("Ton prénom ? ")\nage = int(input("Ton âge ? "))\nprint(f"{prenom}, l'année prochaine tu auras {age + 1} ans")`,
    check: (o) => { const last = o.trim().split("\n").pop(); if (last.indexOf("Awa") < 0) return "Le prénom saisi doit apparaître dans la phrase finale."; if (last.indexOf("21") < 0) return "Avec l'âge 20, la phrase doit contenir 21. As-tu converti avec int() puis ajouté 1 ?"; return true; },
    extra: { inputs: ["Moussa", "34"], check: (o) => o.trim().split("\n").pop().indexOf("35") >= 0 || "Deuxième test (Moussa, 34) : il faut afficher 35. Ne mets pas 21 en dur dans le code." }
  }
}
  ]
});
