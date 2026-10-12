/* Cours Python — Partie 4 : organiser son code */
(window.PY_PARTS = window.PY_PARTS || []).push({
  title: "Organiser son code",
  lessons: [
/* ------------------------------------------------------------------ */
{ id: "p14", title: "Les fonctions : créer tes propres outils", minutes: 35,
  goal: "Définir une fonction avec des paramètres, renvoyer un résultat avec return, et la réutiliser.",
  why: `<p>Quand tu copies-colles le même bout de code trois fois, c'est le signal qu'il faut une <strong>fonction</strong>. Tu l'écris une fois, tu lui donnes un nom, et tu l'appelles autant que tu veux. Ton code devient plus court, plus clair, et une correction se fait à un seul endroit.</p>`,
  sections: [
    { h: "Définir et appeler",
      html: `<pre><code>def saluer(nom):
    print(f"Bonjour {nom} !")

saluer("Awa")      # Bonjour Awa !
saluer("Moussa")   # Bonjour Moussa !</code></pre>
<ul><li><code>def</code> (« define ») annonce une nouvelle fonction ;</li>
<li><code>saluer</code> est son nom ;</li>
<li><code>nom</code> entre parenthèses est un <strong>paramètre</strong> : une variable qui recevra la valeur donnée à l'appel ;</li>
<li>deux-points, puis le corps indenté.</li></ul>
<div class="box plain"><b class="tag">En clair</b><p>Définir une fonction, c'est écrire une recette dans ton carnet : rien ne se passe encore. L'<strong>appeler</strong> (<code>saluer("Awa")</code>), c'est cuisiner la recette avec des ingrédients précis. La valeur donnée à l'appel s'appelle un <strong>argument</strong>.</p></div>` },
    { h: "Renvoyer un résultat : return",
      html: `<p>Une fonction qui fait <code>print</code> affiche, mais on ne peut rien faire du résultat. Avec <code>return</code>, la fonction <strong>renvoie</strong> une valeur qu'on peut ranger dans une variable et réutiliser.</p>
<pre><code>def ttc(prix_ht):
    return prix_ht * 1.18

total = ttc(1000) + ttc(500)
print(total)   # 1770.0</code></pre>
<div class="box steps"><b class="tag">Pas à pas : ttc(1000)</b><ol>
<li>Python entre dans la fonction avec <code>prix_ht = 1000</code>.</li>
<li>Il calcule <code>1000 * 1.18</code> = 1180.0.</li>
<li><code>return</code> renvoie 1180.0 et <strong>sort</strong> de la fonction.</li>
<li>L'appel <code>ttc(1000)</code> est remplacé par 1180.0 dans l'expression. Pareil pour <code>ttc(500)</code> → 590.0. Total : 1770.0.</li></ol></div>
<div class="box why"><b class="tag">print ou return ?</b><p><code>print</code> montre une valeur à l'humain. <code>return</code> donne une valeur au programme. Une fonction de calcul doit presque toujours utiliser <code>return</code>. Une fonction sans <code>return</code> renvoie <code>None</code> (« rien »).</p></div>` },
    { h: "Plusieurs paramètres et valeurs par défaut",
      html: `<pre><code>def moyenne(a, b, c):
    return (a + b + c) / 3

print(moyenne(12, 15, 9))   # 12.0

def alerte(message, niveau="INFO"):
    return f"[{niveau}] {message}"

print(alerte("Disque plein"))              # [INFO] Disque plein
print(alerte("Intrusion", "CRITIQUE"))     # [CRITIQUE] Intrusion</code></pre>
<p>Les arguments sont associés aux paramètres <strong>dans l'ordre</strong>. Un paramètre avec <code>=</code> a une valeur par défaut : on peut l'omettre à l'appel.</p>` },
    { h: "Les variables d'une fonction restent dans la fonction",
      html: `<pre><code>def calcul():
    resultat = 42
    return resultat

calcul()
print(resultat)   # NameError !</code></pre>
<p>Les variables créées dans une fonction sont <strong>locales</strong> : elles n'existent que pendant l'exécution de la fonction. Pour récupérer une valeur à l'extérieur, il faut la <code>return</code> et la ranger : <code>r = calcul()</code>.</p>` }
  ],
  pitfalls: [
    "Définir la fonction mais oublier de l'appeler : il ne se passe rien.",
    "Oublier les parenthèses à l'appel : <code>saluer</code> au lieu de <code>saluer(\"Awa\")</code>.",
    "Utiliser print au lieu de return dans une fonction de calcul, puis essayer d'utiliser le résultat : on obtient None.",
    "Écrire du code après un return dans le même bloc : il ne s'exécute jamais."
  ],
  remember: ["def nom(params): puis un bloc indenté.", "On appelle avec nom(arguments).", "return renvoie une valeur et termine la fonction.", "Les variables d'une fonction sont locales."],
  quiz: [
    { q: "def f(x): return x * 3. Que vaut f(4) + 1 ?", options: ["12", "13", "15", "Erreur"], answer: 1, explain: "f(4) renvoie 12, puis 12 + 1 = 13." },
    { q: "Que renvoie une fonction sans return ?", options: ["0", "\"\"", "None", "Une erreur"], answer: 2, explain: "Sans return, une fonction renvoie None." },
    { q: "def p(a, b=2): return a ** b. Que vaut p(3) ?", options: ["6", "9", "8", "Erreur"], answer: 1, explain: "b prend sa valeur par défaut 2 : 3 ** 2 = 9." }
  ],
  exercise: {
    task: `Écris une fonction <code>est_fort(mdp)</code> qui <strong>renvoie</strong> True si le mot de passe fait au moins 12 caractères <strong>et</strong> contient au moins un chiffre, sinon False. Puis affiche <code>est_fort("Ouaga2026!secure")</code> (True) et <code>est_fort("motdepasse_long")</code> (False).`,
    hint: `Pour savoir s'il y a un chiffre : une boucle sur les caractères avec c.isdigit(), ou any(c.isdigit() for c in mdp). Termine par return len(mdp) >= 12 and a_un_chiffre.`,
    start: `def est_fort(mdp):\n    a_un_chiffre = False\n    for c in mdp:\n        if c.isdigit():\n            a_un_chiffre = True\n    # renvoie le résultat ici\n\n\nprint(est_fort("Ouaga2026!secure"))\nprint(est_fort("motdepasse_long"))\n`,
    sol: `def est_fort(mdp):\n    a_un_chiffre = False\n    for c in mdp:\n        if c.isdigit():\n            a_un_chiffre = True\n    return len(mdp) >= 12 and a_un_chiffre\n\nprint(est_fort("Ouaga2026!secure"))\nprint(est_fort("motdepasse_long"))`,
    check: (o, c) => { const l = o.trim().split("\n").map(s => s.trim()); if (l.slice(-2).join(",") !== "True,False") return "On attend True puis False. Vérifie les deux conditions (longueur ET chiffre)."; if (!/return/.test(c)) return "La fonction doit renvoyer son résultat avec return."; return true; }
  }
},
/* ------------------------------------------------------------------ */
{ id: "p15", title: "Gérer les erreurs : lire les messages et try / except", minutes: 30,
  goal: "Comprendre un message d'erreur Python, et empêcher le programme de planter sur une mauvaise saisie.",
  why: `<p>Tous les programmeurs font des erreurs, tous les jours. La différence entre un débutant et quelqu'un d'expérimenté, c'est qu'il <strong>lit le message d'erreur</strong> au lieu de paniquer. Et un bon programme anticipe les erreurs de l'utilisateur.</p>`,
  sections: [
    { h: "Lire un message d'erreur",
      html: `<p>Un message d'erreur Python a toujours trois informations :</p>
<pre><code>Traceback (most recent call last):
  File "&lt;stdin&gt;", line 3, in &lt;module&gt;
TypeError: can only concatenate str (not "int") to str</code></pre>
<ol><li><strong>Où</strong> : <code>line 3</code>, la ligne qui a posé problème. Commence par la regarder.</li>
<li><strong>Quel type</strong> d'erreur : <code>TypeError</code>.</li>
<li><strong>Le détail</strong> en anglais : « on ne peut coller (concaténer) que du texte à du texte, pas un entier ».</li></ol>
<p>Ici, la console te donne aussi une explication en français sous chaque erreur.</p>
<div class="table-wrap"><table><thead><tr><th>Erreur</th><th>Cause habituelle</th></tr></thead><tbody>
<tr><td><code>SyntaxError</code></td><td>guillemet, parenthèse ou deux-points manquant</td></tr>
<tr><td><code>IndentationError</code></td><td>décalage incohérent</td></tr>
<tr><td><code>NameError</code></td><td>variable pas encore créée ou mal orthographiée</td></tr>
<tr><td><code>TypeError</code></td><td>mélange de types (texte + nombre)</td></tr>
<tr><td><code>ValueError</code></td><td>bon type, mauvaise valeur : <code>int("abc")</code></td></tr>
<tr><td><code>IndexError</code> / <code>KeyError</code></td><td>case de liste ou clé de dictionnaire inexistante</td></tr>
<tr><td><code>ZeroDivisionError</code></td><td>division par zéro</td></tr>
</tbody></table></div>` },
    { h: "Attraper une erreur : try / except",
      html: `<p>Certaines erreurs ne viennent pas de ton code mais de l'extérieur : un utilisateur qui tape « vingt » au lieu de 20. On ne peut pas l'empêcher, mais on peut <strong>réagir</strong> au lieu de planter :</p>
<pre><code>try:
    age = int(input("Ton âge ? "))
    print(f"Dans 10 ans : {age + 10}")
except ValueError:
    print("Merci de taper un nombre.")</code></pre>
<div class="box steps"><b class="tag">Pas à pas</b><ol>
<li>Python <strong>essaie</strong> (try) d'exécuter le bloc.</li>
<li>Si tout va bien, le bloc <code>except</code> est ignoré.</li>
<li>Si une <code>ValueError</code> se produit, Python abandonne le reste du bloc <code>try</code> et saute dans <code>except ValueError</code>.</li>
<li>Le programme continue normalement après.</li></ol></div>` },
    { h: "Redemander jusqu'à obtenir une réponse valide",
      html: `<p>En combinant <code>while</code>, <code>try</code> et <code>break</code> :</p>
<pre><code>while True:
    try:
        n = int(input("Un nombre entier : "))
        break                  # on n'arrive ici que si int() a réussi
    except ValueError:
        print("Ce n'est pas un entier, recommence.")
print(f"Merci, tu as tapé {n}")</code></pre>
<p><code>while True</code> boucle « pour toujours » : c'est le <code>break</code> qui permet d'en sortir, une fois la saisie correcte.</p>` },
    { h: "Ne pas tout attraper",
      html: `<p>Évite <code>except:</code> tout seul (sans nom d'erreur) : il attrape aussi tes propres fautes de frappe et les cache. Nomme toujours l'erreur que tu attends. On peut en attraper plusieurs :</p>
<pre><code>try:
    resultat = total / int(texte)
except ValueError:
    print("Pas un nombre")
except ZeroDivisionError:
    print("Division par zéro")</code></pre>` }
  ],
  pitfalls: [
    "Paniquer devant un message rouge : lis d'abord le numéro de ligne et le type d'erreur.",
    "Utiliser try/except pour cacher un bug de ton code : corrige plutôt la cause.",
    "Écrire <code>except:</code> sans nom d'erreur : tu masques toutes les erreurs, même celles qui t'aideraient."
  ],
  remember: ["Un message d'erreur : la ligne, le type, le détail.", "try: le code risqué ; except TypeErreur: la réaction.", "while True + try + break : redemander jusqu'à une saisie valide.", "Toujours nommer l'erreur attendue."],
  quiz: [
    { q: "int(\"douze\") provoque :", options: ["TypeError", "ValueError", "NameError", "SyntaxError"], answer: 1, explain: "Le type est bon (du texte) mais la valeur ne peut pas devenir un entier : ValueError." },
    { q: "Si aucune erreur ne se produit dans try, le bloc except :", options: ["s'exécute quand même", "est ignoré", "provoque une erreur"], answer: 1, explain: "except ne s'exécute que si l'erreur nommée se produit." },
    { q: "print(prix) alors que la variable s'appelle prix_ht :", options: ["NameError", "KeyError", "ValueError", "Rien"], answer: 0, explain: "Python ne connaît pas le nom prix : NameError." }
  ],
  exercise: {
    task: `Écris une fonction <code>diviser(a, b)</code> qui renvoie <code>a / b</code>, mais qui renvoie le texte <code>"impossible"</code> si b vaut 0, grâce à <code>try / except ZeroDivisionError</code>. Affiche <code>diviser(10, 4)</code> (2.5) puis <code>diviser(5, 0)</code> (impossible).`,
    hint: `def diviser(a, b): try: return a / b ; except ZeroDivisionError: return "impossible"`,
    start: `def diviser(a, b):\n    # utilise try / except ici\n    pass\n\nprint(diviser(10, 4))\nprint(diviser(5, 0))\n`,
    sol: `def diviser(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "impossible"\n\nprint(diviser(10, 4))\nprint(diviser(5, 0))`,
    check: (o, c) => { const l = o.trim().split("\n").map(s => s.trim()); if (l.slice(-2).join(",") !== "2.5,impossible") return "On attend 2.5 puis impossible."; if (!/try/.test(c) || !/except\s+ZeroDivisionError/.test(c)) return "Utilise try / except ZeroDivisionError (sans if b == 0)."; return true; }
  }
},
/* ------------------------------------------------------------------ */
{ id: "p16", title: "Projet final : analyser des logs de connexion", minutes: 45,
  goal: "Assembler tout le cours dans un vrai petit outil d'analyste SOC : détecter les IP suspectes.",
  why: `<p>Un analyste SOC passe ses journées à lire des journaux (logs) pour repérer les comportements anormaux. Une attaque par force brute laisse une trace typique : beaucoup d'échecs de connexion depuis la même adresse IP. Tu vas écrire le programme qui la détecte.</p>`,
  sections: [
    { h: "Les données",
      html: `<p>Chaque ligne du log a le format <code>date heure STATUT utilisateur ip</code> :</p>
<pre><code>2026-10-12 08:00:01 OK awa 10.0.0.2
2026-10-12 08:00:05 FAIL root 10.0.0.66
2026-10-12 08:00:06 FAIL admin 10.0.0.66
...</code></pre>
<p>Dans l'exercice, ces lignes sont déjà dans une liste <code>LOGS</code>. Dans la vraie vie, elles viendraient d'un fichier, mais le traitement serait identique.</p>` },
    { h: "Découper le problème",
      html: `<p>Un gros problème se résout en petites étapes. Avant de coder, écris-les en français :</p>
<div class="box steps"><b class="tag">Le plan</b><ol>
<li>Parcourir chaque ligne de <code>LOGS</code> (<strong>for</strong>).</li>
<li>Découper la ligne en champs (<strong>split</strong>).</li>
<li>Si le statut est <code>FAIL</code> (<strong>if</strong>), compter un échec pour cette IP (<strong>dictionnaire compteur</strong>).</li>
<li>Après la boucle, parcourir le compteur et garder les IP avec <strong>5 échecs ou plus</strong>.</li>
<li>Les afficher, triées.</li></ol></div>
<p>Chaque étape correspond à une leçon que tu as faite. Code-les une par une, et <strong>exécute après chaque étape</strong> avec des <code>print</code> pour vérifier où tu en es.</p>` },
    { h: "Squelette commenté",
      html: `<pre><code>echecs = {}
for ligne in LOGS:
    champs = ligne.split()
    statut = champs[2]
    ip = champs[4]
    if statut == "FAIL":
        echecs[ip] = echecs.get(ip, 0) + 1

suspectes = []
for ip, n in echecs.items():
    if n &gt;= 5:
        suspectes.append(ip)
suspectes.sort()
print(suspectes)</code></pre>
<p>Lis-le en te demandant, pour chaque ligne : <em>de quelle leçon vient cette idée ?</em> Ensuite, essaie de l'écrire <strong>sans regarder</strong> dans l'éditeur. Bloqué ? Regarde une seule ligne, referme, continue.</p>` },
    { h: "Pour aller plus loin",
      html: `<ul><li>Mets la détection dans une fonction <code>detecter(logs, seuil=5)</code> qui renvoie la liste.</li>
<li>Affiche aussi le nombre d'échecs de chaque IP suspecte : <code>10.0.0.66 : 7 échecs</code>.</li>
<li>Repère les utilisateurs visés : <code>root</code> et <code>admin</code> sont des cibles classiques.</li>
<li>Bonus SOC : une IP suspecte qui finit par un <code>OK</code>, c'est peut-être une attaque <strong>réussie</strong>. Comment la repérer ?</li></ul>` }
  ],
  pitfalls: [
    "Vouloir tout écrire d'un coup : avance étape par étape et exécute souvent.",
    "Se tromper d'indice dans split : statut en 2, utilisateur en 3, IP en 4.",
    "Faire la sélection des IP dans la première boucle : le compte n'est complet qu'après avoir lu toutes les lignes."
  ],
  remember: ["Découper le problème en étapes écrites en français avant de coder.", "for + split + if + dictionnaire compteur : le motif de base de l'analyse de logs.", "Exécuter après chaque étape pour vérifier."],
  quiz: [
    { q: "Pourquoi choisir les IP suspectes APRÈS la boucle de comptage ?", options: ["Parce que c'est plus joli", "Parce que le compte n'est complet qu'après avoir lu toutes les lignes", "Parce que Python l'exige"], answer: 1, explain: "Pendant la boucle, une IP peut encore recevoir des échecs supplémentaires." },
    { q: "Quel motif compte les échecs par IP ?", options: ["liste.append(ip)", "echecs[ip] = echecs.get(ip, 0) + 1", "ip += 1", "len(ip)"], answer: 1, explain: "Le dictionnaire compteur associe à chaque IP son nombre d'échecs." }
  ],
  exercise: {
    task: `À partir de <code>LOGS</code> (déjà rempli), affiche la liste <strong>triée</strong> des IP qui ont <strong>5 échecs (FAIL) ou plus</strong>. On attend <code>['10.0.0.66', '10.0.0.91']</code>.`,
    hint: `Suis le plan : compteur echecs = {} rempli dans une boucle for, puis une liste suspectes avec les IP où n >= 5, puis sort() et print.`,
    start: `LOGS = [\n    "2026-10-12 08:00:01 OK awa 10.0.0.2",\n    "2026-10-12 08:00:05 FAIL root 10.0.0.66",\n    "2026-10-12 08:00:06 FAIL admin 10.0.0.66",\n    "2026-10-12 08:00:07 FAIL root 10.0.0.66",\n    "2026-10-12 08:00:09 FAIL root 10.0.0.91",\n    "2026-10-12 08:00:10 FAIL root 10.0.0.66",\n    "2026-10-12 08:00:12 FAIL test 10.0.0.66",\n    "2026-10-12 08:01:00 FAIL moussa 10.0.0.7",\n    "2026-10-12 08:01:02 OK moussa 10.0.0.7",\n    "2026-10-12 08:02:11 FAIL admin 10.0.0.91",\n    "2026-10-12 08:02:12 FAIL admin 10.0.0.91",\n    "2026-10-12 08:02:13 FAIL root 10.0.0.91",\n    "2026-10-12 08:02:15 FAIL root 10.0.0.91",\n    "2026-10-12 08:03:00 OK root 10.0.0.66",\n    "2026-10-12 08:04:41 FAIL awa 10.0.0.2",\n]\n\n# 1. Compter les échecs par IP\n\n# 2. Garder les IP avec 5 échecs ou plus, triées\n\n`,
    sol: null,
    solTail: `echecs = {}\nfor ligne in LOGS:\n    champs = ligne.split()\n    if champs[2] == "FAIL":\n        ip = champs[4]\n        echecs[ip] = echecs.get(ip, 0) + 1\n\nsuspectes = []\nfor ip, n in echecs.items():\n    if n >= 5:\n        suspectes.append(ip)\nsuspectes.sort()\nprint(suspectes)`,
    check: (o, c) => { const last = o.trim().split("\n").pop().replace(/\s/g, "").replace(/"/g, "'"); if (last !== "['10.0.0.66','10.0.0.91']") return "La dernière ligne doit être ['10.0.0.66', '10.0.0.91']. 10.0.0.66 a 5 échecs, 10.0.0.91 en a 5, les autres moins."; if (!/split/.test(c)) return "Utilise split() pour lire chaque ligne."; if (/print\(\s*\[\s*['"]10/.test(c)) return "Ne recopie pas le résultat : laisse ton programme le calculer."; return true; }
  }
}
  ]
});
