/* Cours C — Partie 1 : premiers pas (repère CS50x, semaine 1 « C ») */
(window.C_PARTS = window.C_PARTS || []).push({
  title: "Premiers pas en C",
  lessons: [
/* ------------------------------------------------------------------ */
{ id: "c01", title: "Du code au programme : ton premier printf", minutes: 25, cs50x: 1,
  goal: "Comprendre ce que fait un compilateur, reconnaître les parties d'un programme C et afficher du texte avec printf.",
  why: `<p>Le C a plus de 50 ans, et il est encore partout : dans les systèmes d'exploitation (Linux, Windows, Android), dans les téléphones, les voitures, les distributeurs de billets, les appareils médicaux. Python lui-même est écrit en C. Apprendre le C, c'est comprendre ce qui se passe <strong>vraiment</strong> dans un ordinateur : la mémoire, les nombres, les textes. Après le C, tous les autres langages paraissent plus simples.</p>`,
  sections: [
    { h: "Du code source au programme",
      html: `<p>Un ordinateur ne comprend qu'une seule langue : le <strong>code machine</strong>, des suites de 0 et de 1. Personne n'écrit directement en 0 et 1. On écrit le <strong>code source</strong>, un texte lisible, puis un outil le traduit en code machine : le <strong>compilateur</strong>.</p>
<div class="trace"><table><thead><tr><th>Étape</th><th>Ce qu'on a</th></tr></thead><tbody>
<tr><td>1. Tu écris</td><td>le code source, dans un fichier <code>programme.c</code></td></tr>
<tr><td>2. Le compilateur traduit</td><td>un programme en code machine, prêt à être lancé</td></tr>
<tr><td>3. Tu exécutes</td><td>l'ordinateur suit les instructions, le résultat s'affiche</td></tr>
</tbody></table></div>
<div class="box plain"><b class="tag">En clair</b><p>En Python, un interpréteur lit ton code ligne par ligne pendant qu'il tourne. En C, tout le programme est d'abord traduit d'un coup, puis lancé. Avantage : un programme C est très rapide. Inconvénient : la moindre faute empêche la traduction, et le compilateur te le dit avant même de lancer quoi que ce soit.</p></div>
<p>Ici, le compilateur tourne dans ta page : le bouton <strong>▶ Compiler et exécuter</strong> fait les étapes 2 et 3 d'un coup.</p>` },
    { h: "Ton premier programme",
      html: `<p>Voici le programme le plus célèbre du monde, écrit en C dès 1978 :</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

int main(void)
{
    printf("Bonjour, le monde !\\n");
    return 0;
}</code></pre>
<p>Ligne par ligne :</p>
<ul><li><code>#include &lt;stdio.h&gt;</code> : on ajoute la boîte à outils « entrées et sorties standard » (<em>standard input output</em>), qui contient <code>printf</code>. Sans elle, le compilateur ne connaît pas <code>printf</code>.</li>
<li><code>int main(void)</code> : la fonction <strong>main</strong> (« principale »). Tout programme C commence par elle. <code>void</code> veut dire qu'elle ne reçoit rien.</li>
<li>Les <strong>accolades</strong> <code>{ }</code> entourent les instructions de <code>main</code>.</li>
<li><code>printf(…)</code> affiche le texte entre guillemets. <code>\\n</code> veut dire « retour à la ligne ».</li>
<li><code>return 0;</code> : le programme se termine en disant « tout s'est bien passé » (0 = pas d'erreur).</li>
<li>Chaque instruction se termine par un <strong>point-virgule</strong> <code>;</code>.</li></ul>` },
    { h: "Le retour à la ligne : \\n",
      html: `<p><code>printf</code> n'ajoute rien tout seul : sans <code>\\n</code>, les textes se collent.</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

int main(void)
{
    printf("Ouaga");
    printf("dougou\\n");
    printf("Bobo\\nKoudougou\\n");
    return 0;
}</code></pre>
<p>Le premier et le deuxième <code>printf</code> s'affichent sur la même ligne. Le troisième contient un <code>\\n</code> au milieu : il fait deux lignes à lui seul.</p>
<p>Les lignes qui commencent par <code>//</code> sont des <strong>commentaires</strong> : le compilateur les ignore. Ils servent à expliquer ton code à ceux qui le liront.</p>` },
    { h: "Lire une erreur de compilation",
      html: `<p>Oublier un point-virgule est l'erreur la plus fréquente en C. Le compilateur refuse alors de traduire le programme :</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

int main(void)
{
    printf("Bonjour\\n")
    return 0;
}</code></pre>
<p>Le message donne le <strong>numéro de ligne</strong> où le compilateur s'est rendu compte du problème, puis une explication en français. Attention : il signale souvent la ligne <strong>suivante</strong>, celle où il attendait encore le <code>;</code>. Regarde toujours aussi la ligne juste au-dessus.</p>
<div class="box why"><b class="tag">À retenir</b><p>Une erreur de compilation n'est pas grave : c'est le compilateur qui t'aide. Lis le message, va à la ligne indiquée, corrige, et recompile. Les programmeurs expérimentés font ça des dizaines de fois par jour.</p></div>` }
  ],
  pitfalls: [
    "Oublier le point-virgule à la fin d'une instruction : <code>printf(\"Bonjour\\n\")</code> sans <code>;</code> empêche la compilation.",
    "Oublier <code>#include &lt;stdio.h&gt;</code> : le compilateur ne connaît pas <code>printf</code>.",
    "Écrire <code>Printf</code> ou <code>Main</code> avec une majuscule : le C fait la différence entre majuscules et minuscules.",
    "Oublier <code>\\n</code> : les affichages se collent sur la même ligne."
  ],
  remember: ["Le compilateur traduit le code source en code machine, avant de l'exécuter.", "Tout programme C a une fonction int main(void) { … }.", "#include <stdio.h> donne accès à printf.", "Chaque instruction finit par ; et \\n fait un retour à la ligne."],
  quiz: [
    { q: "À quoi sert le compilateur ?", options: ["À afficher le texte", "À traduire le code source en code machine", "À corriger les fautes tout seul", "À sauvegarder le fichier"], answer: 1, explain: "Le compilateur traduit ton code C, lisible par un humain, en code machine que l'ordinateur sait exécuter." },
    { q: "Qu'affiche printf(\"A\"); printf(\"B\\n\"); ?", options: ["A puis B sur deux lignes", "AB sur une ligne", "A B", "Une erreur"], answer: 1, explain: "printf n'ajoute pas de retour à la ligne : il faut \\n. Ici, A et B se collent, puis la ligne se termine." },
    { q: "Que veut dire return 0; à la fin de main ?", options: ["Afficher 0", "Le programme s'est bien terminé", "Recommencer le programme", "Effacer l'écran"], answer: 1, explain: "Par convention, 0 veut dire « pas d'erreur ». Un autre nombre signale un problème." }
  ],
  exercise: {
    task: `Écris un programme qui affiche <strong>deux lignes</strong> : d'abord <code>Bonjour, je m'appelle</code> suivi de ton prénom, puis exactement <code>J'apprends le C.</code>`,
    hint: `Deux printf, chacun avec un \\n à la fin du texte. N'oublie pas les points-virgules.`,
    start: `#include <stdio.h>

int main(void)
{
    // écris tes deux printf ici

    return 0;
}
`,
    sol: `#include <stdio.h>

int main(void)
{
    printf("Bonjour, je m'appelle Awa\\n");
    printf("J'apprends le C.\\n");
    return 0;
}
`,
    check: (o) => { const l = o.trim().split("\n").map(s => s.trim()); if (l.length < 2) return "Il faut deux lignes : pense au \\n à la fin du premier texte."; if (!/^Bonjour, je m'appelle \S/.test(l[0])) return "La première ligne doit commencer par « Bonjour, je m'appelle » suivi d'un prénom."; if (l[1] !== "J'apprends le C.") return "La deuxième ligne doit être exactement : J'apprends le C."; return true; }
  }
},
/* ------------------------------------------------------------------ */
{ id: "c02", title: "Variables et types : int, float, char", minutes: 30, cs50x: 1,
  goal: "Déclarer des variables avec leur type, faire des calculs, et afficher des valeurs avec les codes de format de printf.",
  why: `<p>Un programme manipule des informations : un prix, une quantité, une note, une lettre. En C, chaque information est rangée dans une <strong>variable</strong>, et tu dois dire à l'avance de quel <strong>type</strong> elle est. C'est plus strict qu'en Python, mais c'est ce qui rend le C si rapide : l'ordinateur sait exactement combien de place réserver.</p>`,
  sections: [
    { h: "Déclarer une variable",
      html: `<p>On écrit le <strong>type</strong>, le <strong>nom</strong>, puis éventuellement une valeur de départ :</p>
<pre><code>int quantite = 4;          // un nombre entier
float prix = 350.0;        // un nombre à virgule
char initiale = 'A';       // un seul caractère, entre apostrophes</code></pre>
<div class="table-wrap"><table><thead><tr><th>Type</th><th>Contient</th><th>Exemple</th></tr></thead><tbody>
<tr><td><code>int</code></td><td>un entier</td><td><code>17500</code>, <code>-3</code></td></tr>
<tr><td><code>float</code> / <code>double</code></td><td>un nombre à virgule (double est plus précis)</td><td><code>3.14</code></td></tr>
<tr><td><code>char</code></td><td>un seul caractère</td><td><code>'A'</code>, <code>'7'</code></td></tr>
<tr><td><code>bool</code></td><td>vrai ou faux (avec <code>#include &lt;stdbool.h&gt;</code>)</td><td><code>true</code>, <code>false</code></td></tr>
</tbody></table></div>
<p>Comme en Python, le nombre à virgule s'écrit avec un <strong>point</strong> : <code>3.5</code>, pas <code>3,5</code>.</p>` },
    { h: "Afficher une variable : les codes de format",
      html: `<p>Pour afficher une variable, on met un <strong>code de format</strong> dans le texte de <code>printf</code>, et la variable après une virgule. Le code est remplacé par la valeur :</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

int main(void)
{
    int quantite = 4;
    float prix = 350.0;
    char initiale = 'A';
    printf("Quantité : %i\\n", quantite);
    printf("Prix : %f F\\n", prix);
    printf("Prix : %.2f F\\n", prix);
    printf("Initiale : %c\\n", initiale);
    printf("%i tomates à %.2f F\\n", quantite, prix);
    return 0;
}</code></pre>
<div class="table-wrap"><table><thead><tr><th>Code</th><th>Pour</th></tr></thead><tbody>
<tr><td><code>%i</code> ou <code>%d</code></td><td>un <code>int</code></td></tr>
<tr><td><code>%f</code></td><td>un <code>float</code> ou un <code>double</code> (6 chiffres après la virgule)</td></tr>
<tr><td><code>%.2f</code></td><td>un nombre à virgule, arrondi à 2 chiffres après la virgule</td></tr>
<tr><td><code>%c</code></td><td>un <code>char</code></td></tr>
<tr><td><code>%s</code></td><td>un texte (leçon 8)</td></tr>
</tbody></table></div>
<p>Avec plusieurs codes, les valeurs sont prises <strong>dans l'ordre</strong> : le premier code reçoit la première valeur, et ainsi de suite.</p>` },
    { h: "Calculer",
      html: `<p>Les opérations : <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code> et <code>%</code> (le reste de la division).</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

int main(void)
{
    int billets = 10000;
    int prix = 3500;
    int monnaie = billets - prix;
    printf("Monnaie : %i F\\n", monnaie);
    printf("7 / 2 = %i\\n", 7 / 2);
    printf("7 %% 2 = %i\\n", 7 % 2);
    printf("7 / 2.0 = %f\\n", 7 / 2.0);
    return 0;
}</code></pre>
<div class="box steps"><b class="tag">Pas à pas : la division</b><ol>
<li><code>7 / 2</code> : deux entiers, donc division <strong>entière</strong>. Le résultat est 3 : la partie après la virgule est coupée.</li>
<li><code>7 % 2</code> : le reste de cette division, 1. (Dans <code>printf</code>, on écrit <code>%%</code> pour afficher le signe % lui-même.)</li>
<li><code>7 / 2.0</code> : un des deux nombres a une virgule, donc le résultat aussi : 3.5.</li></ol></div>` },
    { h: "Changer de type, et les limites d'un int",
      html: `<p>Pour obtenir une division à virgule avec deux entiers, on <strong>convertit</strong> l'un d'eux en écrivant le type voulu entre parenthèses (on dit un <em>cast</em>) :</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

int main(void)
{
    int total = 47;
    int eleves = 4;
    printf("Moyenne : %.2f\\n", (float) total / eleves);
    int grand = 2147483647;
    printf("%i\\n", grand + 1);
    return 0;
}</code></pre>
<p>La deuxième ligne affiche un nombre <strong>négatif</strong> ! Un <code>int</code> occupe 4 octets en mémoire : il ne peut pas dépasser 2 147 483 647. Au-delà, il « fait le tour » : c'est un <strong>dépassement</strong> (<em>overflow</em>). Pour de plus grands nombres, on utilise <code>long long</code> (affiché avec <code>%lld</code>).</p>
<div class="box plain"><b class="tag">En clair</b><p>En Python, un nombre peut grandir sans limite. En C, chaque type a une taille fixe, comme une boîte : si le nombre est trop gros, il déborde. C'est pour ça qu'on choisit son type avec soin.</p></div>` }
  ],
  pitfalls: [
    "Afficher un <code>float</code> avec <code>%i</code>, ou un <code>int</code> avec <code>%f</code> : la valeur affichée est fausse. Le code de format doit correspondre au type.",
    "Diviser deux entiers et s'étonner de perdre les décimales : <code>47 / 4</code> donne 11. Écris <code>(float) 47 / 4</code>.",
    "Utiliser une variable sans l'avoir déclarée avec son type : le compilateur refuse.",
    "Mettre un texte entre apostrophes : <code>'Awa'</code>. Les apostrophes sont pour un seul caractère ; le texte va entre guillemets."
  ],
  remember: ["On déclare une variable avec son type : int, float, double, char, bool.", "printf affiche une valeur avec un code de format : %i, %f, %.2f, %c, %s.", "Deux entiers donnent une division entière ; % donne le reste.", "Un int a une taille limitée : au-delà de 2 147 483 647, il déborde."],
  quiz: [
    { q: "Quel type pour ranger le prix 17500 F ?", options: ["char", "int", "bool", "aucun"], answer: 1, explain: "C'est un nombre entier : int. (En francs CFA, il n'y a pas de centimes.)" },
    { q: "Que vaut 17 / 5 en C, avec deux int ?", options: ["3.4", "3", "4", "2"], answer: 1, explain: "Division entière : la partie après la virgule est coupée. 17 / 5 = 3 (et 17 % 5 = 2)." },
    { q: "Quel code de format pour afficher un float avec deux chiffres après la virgule ?", options: ["%i", "%2f", "%.2f", "%c"], answer: 2, explain: "%.2f arrondit à 2 chiffres après la virgule." }
  ],
  exercise: {
    task: `Au marché, une tomate coûte <code>350</code> F et tu en achètes <code>4</code>. Avec deux variables <code>prix</code> et <code>quantite</code> de type <code>int</code>, affiche exactement :<br><code>Total : 1400 F</code><br><code>Avec 18 % de taxe : 1652.00 F</code>`,
    hint: `int total = prix * quantite; puis printf("Total : %i F\\n", total); Pour la taxe : total * 1.18, affiché avec %.2f. Pour afficher le signe %, écris %% dans printf.`,
    start: `#include <stdio.h>

int main(void)
{
    int prix = 350;
    int quantite = 4;

    return 0;
}
`,
    sol: `#include <stdio.h>

int main(void)
{
    int prix = 350;
    int quantite = 4;
    int total = prix * quantite;
    printf("Total : %i F\\n", total);
    printf("Avec 18 %% de taxe : %.2f F\\n", total * 1.18);
    return 0;
}
`,
    check: (o, c) => { const l = o.trim().split("\n").map(s => s.trim()); if (l[0] !== "Total : 1400 F") return "Première ligne attendue : Total : 1400 F"; if (l[1] !== "Avec 18 % de taxe : 1652.00 F") return "Deuxième ligne attendue : Avec 18 % de taxe : 1652.00 F (avec %.2f, et %% pour afficher le signe %)."; if (!/prix\s*\*\s*quantite|quantite\s*\*\s*prix/.test(c)) return "Calcule le total avec prix * quantite, au lieu d'écrire 1400 à la main."; return true; }
  }
},
/* ------------------------------------------------------------------ */
{ id: "c03", title: "Lire au clavier : scanf", minutes: 25, cs50x: 1,
  goal: "Rendre un programme interactif en lisant des nombres et des mots tapés par l'utilisateur avec scanf, et vérifier que la saisie a réussi.",
  why: `<p>Un programme qui calcule toujours la même chose sert peu. Avec <code>scanf</code>, il demande une valeur à l'utilisateur (un âge, un prix, un nom) et s'adapte à la réponse. C'est le début des vrais programmes.</p>`,
  sections: [
    { h: "Lire un nombre",
      html: `<p><code>scanf</code> fait l'inverse de <code>printf</code> : au lieu d'afficher, elle <strong>lit</strong> ce que l'utilisateur tape et le range dans une variable.</p>
<pre class="cx" data-stdin="17"><code>#include &lt;stdio.h&gt;

int main(void)
{
    int age;
    printf("Ton âge ? ");
    scanf("%i", &amp;age);
    printf("Dans 5 ans, tu auras %i ans.\\n", age + 5);
    return 0;
}</code></pre>
<ul><li><code>"%i"</code> : on attend un entier (mêmes codes que <code>printf</code>).</li>
<li><code>&amp;age</code> : le <code>&amp;</code> donne l'<strong>adresse</strong> de la variable, c'est-à-dire l'endroit de la mémoire où <code>scanf</code> doit écrire. Tu comprendras pourquoi à la leçon 14 ; pour l'instant, retiens : <strong>avec scanf, un &amp; devant le nom de la variable</strong>.</li></ul>
<div class="box plain"><b class="tag">En clair : l'entrée du programme</b><p>Dans l'atelier, tu tapes à l'avance ce que l'utilisateur répondrait, dans la case <strong>« Ce que tu tapes au clavier »</strong>, une réponse par ligne. Le programme les lit dans l'ordre. Dans l'exemple ci-dessus, on a tapé 17.</p></div>` },
    { h: "Lire un mot",
      html: `<p>Pour un mot, on prépare une place pour les lettres (un tableau de caractères, détaillé à la leçon 8), et on utilise <code>%s</code>. Ici, pas de <code>&amp;</code> :</p>
<pre class="cx" data-stdin="Awa"><code>#include &lt;stdio.h&gt;

int main(void)
{
    char prenom[50];
    printf("Ton prénom ? ");
    scanf("%49s", prenom);
    printf("Bonjour, %s !\\n", prenom);
    return 0;
}</code></pre>
<p><code>%49s</code> veut dire « au plus 49 caractères » : la boîte <code>prenom</code> a 50 places, dont une réservée pour marquer la fin du texte. Sans cette limite, un prénom trop long déborderait de la boîte et abîmerait la mémoire voisine.</p>
<p>Attention : <code>%s</code> s'arrête au premier espace. « Awa Ouédraogo » donnerait seulement « Awa ».</p>` },
    { h: "Lire plusieurs valeurs",
      html: `<pre class="cx" data-stdin="350 4"><code>#include &lt;stdio.h&gt;

int main(void)
{
    int prix, quantite;
    printf("Prix et quantité ? ");
    scanf("%i %i", &amp;prix, &amp;quantite);
    printf("Total : %i F\\n", prix * quantite);
    return 0;
}</code></pre>
<p>Les deux nombres peuvent être tapés sur la même ligne, séparés par un espace, ou sur deux lignes.</p>` },
    { h: "Et si l'utilisateur tape n'importe quoi ?",
      html: `<p><code>scanf</code> renvoie le <strong>nombre de valeurs</strong> qu'elle a réussi à lire. Si on attend un nombre et que l'utilisateur tape « vingt », elle renvoie 0, et la variable n'est pas remplie. Un bon programme vérifie :</p>
<pre class="cx" data-stdin="vingt"><code>#include &lt;stdio.h&gt;

int main(void)
{
    int age;
    printf("Ton âge ? ");
    if (scanf("%i", &amp;age) != 1)
    {
        printf("\\nCe n'est pas un nombre.\\n");
        return 1;
    }
    printf("Tu as %i ans.\\n", age);
    return 0;
}</code></pre>
<p>Ici, l'utilisateur a tapé « vingt » : le programme le détecte et s'arrête avec le code 1 (« erreur »). Le <code>if</code> sera détaillé dans la prochaine leçon.</p>` }
  ],
  pitfalls: [
    "Oublier le <code>&amp;</code> devant une variable numérique : <code>scanf(\"%i\", age)</code> écrit n'importe où en mémoire. Écris <code>&amp;age</code>.",
    "Lire un mot sans limite de taille : <code>%s</code> au lieu de <code>%49s</code>. Un texte trop long déborde du tableau.",
    "Croire que <code>%s</code> lit une phrase entière : il s'arrête au premier espace."
  ],
  remember: ["scanf(\"%i\", &age) lit un entier tapé au clavier.", "Avec un nombre, un & devant la variable ; avec un tableau de caractères, pas de &.", "%49s limite la taille d'un mot lu.", "scanf renvoie le nombre de valeurs lues : on peut vérifier que la saisie a réussi."],
  quiz: [
    { q: "Quelle ligne lit correctement un entier dans la variable n ?", options: ["scanf(\"%i\", n);", "scanf(\"%i\", &n);", "scanf(n);", "printf(\"%i\", &n);"], answer: 1, explain: "scanf a besoin de l'adresse de la variable pour y écrire : &n." },
    { q: "L'utilisateur tape « Awa Ouédraogo » et le programme lit avec scanf(\"%49s\", nom). Que contient nom ?", options: ["Awa Ouédraogo", "Awa", "Ouédraogo", "Rien"], answer: 1, explain: "%s s'arrête au premier espace." },
    { q: "Que renvoie scanf(\"%i\", &age) si l'utilisateur tape « dix » ?", options: ["10", "1", "0", "-1"], answer: 2, explain: "Aucun entier n'a pu être lu : scanf renvoie 0." }
  ],
  exercise: {
    task: `Écris un programme qui demande l'âge de l'utilisateur avec <code>scanf</code>, puis affiche exactement <code>Dans 10 ans, tu auras X ans.</code> (X remplacé par l'âge + 10). Avec 17, on attend <code>Dans 10 ans, tu auras 27 ans.</code>`,
    hint: `int age; scanf("%i", &age); puis printf("Dans 10 ans, tu auras %i ans.\\n", age + 10);`,
    start: `#include <stdio.h>

int main(void)
{
    int age;
    printf("Ton âge ? ");

    return 0;
}
`,
    sol: `#include <stdio.h>

int main(void)
{
    int age;
    printf("Ton âge ? ");
    scanf("%i", &age);
    printf("Dans 10 ans, tu auras %i ans.\\n", age + 10);
    return 0;
}
`,
    inputs: "17",
    check: (o, c) => { if (o.indexOf("Dans 10 ans, tu auras 27 ans.") < 0) return "Avec 17 tapé au clavier, on attend : Dans 10 ans, tu auras 27 ans."; if (!/scanf/.test(c)) return "Utilise scanf pour lire l'âge."; return true; },
    extra: { inputs: "30", check: (o) => o.indexOf("Dans 10 ans, tu auras 40 ans.") >= 0 || "Avec 30, on attend : Dans 10 ans, tu auras 40 ans. Ton programme doit calculer à partir de ce qui est tapé." }
  }
},
/* ------------------------------------------------------------------ */
{ id: "c04", title: "Prendre des décisions : if, else, switch", minutes: 30, cs50x: 1,
  goal: "Comparer des valeurs, combiner des conditions avec && et ||, et faire réagir le programme avec if, else if, else et switch.",
  why: `<p>Un distributeur de billets vérifie ton code, ton solde, le montant demandé, et décide : il donne l'argent, ou il refuse. Tous les programmes prennent des décisions de ce genre. En C, c'est le rôle de <code>if</code>.</p>`,
  sections: [
    { h: "Comparer",
      html: `<div class="table-wrap"><table><thead><tr><th>Symbole</th><th>Sens</th></tr></thead><tbody>
<tr><td><code>==</code></td><td>égal à (deux signes égal !)</td></tr>
<tr><td><code>!=</code></td><td>différent de</td></tr>
<tr><td><code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code></td><td>plus petit, plus grand, ou égal</td></tr>
<tr><td><code>&amp;&amp;</code></td><td>ET : les deux conditions sont vraies</td></tr>
<tr><td><code>||</code></td><td>OU : au moins une est vraie</td></tr>
<tr><td><code>!</code></td><td>NON : inverse une condition</td></tr>
</tbody></table></div>
<p>En C, une condition vraie vaut 1, une condition fausse vaut 0.</p>` },
    { h: "if, else if, else",
      html: `<pre class="cx" data-stdin="3000"><code>#include &lt;stdio.h&gt;

int main(void)
{
    int solde;
    printf("Ton solde ? ");
    scanf("%i", &amp;solde);
    int prix = 5000;

    if (solde &gt;= prix)
    {
        printf("\\nAchat validé, il te reste %i F.\\n", solde - prix);
    }
    else
    {
        printf("\\nSolde insuffisant : il manque %i F.\\n", prix - solde);
    }
    return 0;
}</code></pre>
<ul><li>La condition se met <strong>entre parenthèses</strong>.</li>
<li>Les instructions à faire se mettent entre <strong>accolades</strong>. Si la condition est fausse, c'est le bloc <code>else</code> qui s'exécute.</li></ul>
<p>Pour plus de deux cas, on enchaîne avec <code>else if</code>. Le C teste les conditions dans l'ordre et s'arrête à la première vraie :</p>
<pre class="cx" data-stdin="35"><code>#include &lt;stdio.h&gt;

int main(void)
{
    int temperature;
    scanf("%i", &amp;temperature);
    if (temperature &gt;= 40)
    {
        printf("Canicule : bois beaucoup d'eau.\\n");
    }
    else if (temperature &gt;= 30)
    {
        printf("Il fait chaud.\\n");
    }
    else
    {
        printf("Il fait bon.\\n");
    }
    return 0;
}</code></pre>` },
    { h: "Combiner des conditions",
      html: `<p>Un car accepte les passagers avec un ticket <strong>et</strong> un bagage de 20 kg au plus :</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;
#include &lt;stdbool.h&gt;

int main(void)
{
    bool ticket = true;
    int bagage = 25;
    if (ticket &amp;&amp; bagage &lt;= 20)
    {
        printf("Bon voyage !\\n");
    }
    else if (ticket || bagage &lt;= 20)
    {
        printf("Presque : vérifie ton ticket ou ton bagage.\\n");
    }
    return 0;
}</code></pre>
<div class="box steps"><b class="tag">Pas à pas</b><ol>
<li><code>ticket &amp;&amp; bagage &lt;= 20</code> : vrai ET faux → faux. On passe au <code>else if</code>.</li>
<li><code>ticket || bagage &lt;= 20</code> : vrai OU faux → vrai. Le message « Presque » s'affiche.</li></ol></div>` },
    { h: "switch : choisir parmi des valeurs précises",
      html: `<p>Quand on compare une variable à une liste de valeurs, <code>switch</code> est plus lisible qu'une série de <code>else if</code> :</p>
<pre class="cx" data-stdin="2"><code>#include &lt;stdio.h&gt;

int main(void)
{
    int choix;
    printf("1. Solde  2. Transfert  3. Recharge\\n");
    scanf("%i", &amp;choix);
    switch (choix)
    {
        case 1:
            printf("Ton solde : 12500 F\\n");
            break;
        case 2:
            printf("À qui veux-tu envoyer de l'argent ?\\n");
            break;
        default:
            printf("Choix inconnu.\\n");
    }
    return 0;
}</code></pre>
<p>Chaque <code>case</code> se termine par <code>break</code>. Sans lui, le C continue dans le <code>case</code> suivant, et affiche plusieurs messages. <code>default</code> traite tous les autres cas.</p>` }
  ],
  pitfalls: [
    "Écrire <code>if (x = 5)</code> au lieu de <code>if (x == 5)</code> : un seul <code>=</code> <strong>range</strong> 5 dans x, et la condition est toujours vraie.",
    "Mettre un point-virgule après la condition : <code>if (x &gt; 0);</code>. Le <code>if</code> ne contrôle alors plus rien.",
    "Oublier <code>break</code> dans un <code>case</code> : l'exécution continue dans les cas suivants.",
    "Mettre les conditions dans le mauvais ordre : si <code>note &gt;= 10</code> est testé avant <code>note &gt;= 16</code>, tout le monde a « Passable »."
  ],
  remember: ["== compare, = range une valeur.", "&& (et), || (ou), ! (non) combinent des conditions.", "if … else if … else : la première condition vraie gagne.", "switch compare une variable à des valeurs ; chaque case finit par break."],
  quiz: [
    { q: "Que vaut (5 > 3) && (2 > 4) ?", options: ["1 (vrai)", "0 (faux)", "5", "Une erreur"], answer: 1, explain: "Vrai ET faux donne faux, qui vaut 0 en C." },
    { q: "Pourquoi if (x = 0) est-il un piège ?", options: ["Il compare x à 0", "Il range 0 dans x au lieu de comparer", "Il ne compile pas", "Il affiche 0"], answer: 1, explain: "Un seul = range la valeur. Pour comparer, il faut ==." },
    { q: "Que se passe-t-il si on oublie break à la fin d'un case ?", options: ["Erreur de compilation", "Le programme continue dans le case suivant", "Le switch recommence", "Rien de spécial"], answer: 1, explain: "Sans break, l'exécution « tombe » dans le case suivant." }
  ],
  exercise: {
    task: `Écris un programme qui lit une note sur 20 (un entier) et affiche la mention : <code>Très bien</code> à partir de 16, <code>Bien</code> à partir de 14, <code>Assez bien</code> à partir de 12, <code>Passable</code> à partir de 10, et <code>Insuffisant</code> en dessous. La correction essaie plusieurs notes.`,
    hint: `scanf("%i", &note); puis if (note >= 16) … else if (note >= 14) … else if (note >= 12) … else if (note >= 10) … else …, du plus grand au plus petit.`,
    start: `#include <stdio.h>

int main(void)
{
    int note;
    scanf("%i", &note);

    return 0;
}
`,
    sol: `#include <stdio.h>

int main(void)
{
    int note;
    scanf("%i", &note);
    if (note >= 16)
    {
        printf("Très bien\\n");
    }
    else if (note >= 14)
    {
        printf("Bien\\n");
    }
    else if (note >= 12)
    {
        printf("Assez bien\\n");
    }
    else if (note >= 10)
    {
        printf("Passable\\n");
    }
    else
    {
        printf("Insuffisant\\n");
    }
    return 0;
}
`,
    inputs: "17",
    check: (o) => o.trim().split("\n").pop().trim() === "Très bien" || "Avec 17, on attend : Très bien.",
    extra: { inputs: "12", check: (o) => o.trim().split("\n").pop().trim() === "Assez bien" || "Avec 12, on attend : Assez bien. Vérifie l'ordre de tes conditions.",
      extra: { inputs: "14", check: (o) => o.trim().split("\n").pop().trim() === "Bien" || "Avec 14 (pile la limite), on attend : Bien. Utilise >= et non >.",
        extra: { inputs: "9", check: (o) => o.trim().split("\n").pop().trim() === "Insuffisant" || "Avec 9, on attend : Insuffisant." } } }
  }
},
/* ------------------------------------------------------------------ */
{ id: "c05", title: "Répéter : while, for, do while", minutes: 30, cs50x: 1,
  goal: "Répéter des instructions avec while, for et do while, imbriquer deux boucles, et éviter les boucles infinies.",
  why: `<p>Afficher les 30 jours d'un mois, calculer la moyenne de 500 élèves, redemander un code tant qu'il est faux : sans boucle, il faudrait recopier les mêmes lignes encore et encore. Une boucle répète le travail à ta place, aussi longtemps qu'il le faut.</p>`,
  sections: [
    { h: "while : tant que",
      html: `<p><code>while</code> répète son bloc <strong>tant que</strong> la condition est vraie :</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

int main(void)
{
    int epargne = 0;
    int semaine = 0;
    while (epargne &lt; 10000)
    {
        epargne = epargne + 2500;
        semaine++;
    }
    printf("10000 F atteints en %i semaines.\\n", semaine);
    return 0;
}</code></pre>
<p><code>semaine++</code> veut dire « ajoute 1 à semaine ». On écrit aussi <code>epargne += 2500</code> pour « ajoute 2500 ».</p>
<div class="trace"><table><thead><tr><th>Tour</th><th>epargne avant</th><th>condition</th><th>epargne après</th></tr></thead><tbody>
<tr><td>1</td><td>0</td><td>0 &lt; 10000 : vrai</td><td>2500</td></tr>
<tr><td>2</td><td>2500</td><td>vrai</td><td>5000</td></tr>
<tr><td>3</td><td>5000</td><td>vrai</td><td>7500</td></tr>
<tr><td>4</td><td>7500</td><td>vrai</td><td>10000</td></tr>
<tr><td>—</td><td>10000</td><td>10000 &lt; 10000 : faux, on sort</td><td></td></tr>
</tbody></table></div>` },
    { h: "for : compter",
      html: `<p>Quand on sait combien de tours faire, <code>for</code> regroupe tout sur une ligne : le départ, la condition, et ce qu'on fait à la fin de chaque tour.</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

int main(void)
{
    for (int i = 1; i &lt;= 5; i++)
    {
        printf("Jour %i\\n", i);
    }
    return 0;
}</code></pre>
<div class="box steps"><b class="tag">Pas à pas : for (int i = 1; i &lt;= 5; i++)</b><ol>
<li><code>int i = 1</code> : fait une seule fois, au début.</li>
<li><code>i &lt;= 5</code> : testé avant chaque tour. Faux → on sort.</li>
<li>Le bloc s'exécute.</li>
<li><code>i++</code> : fait à la fin de chaque tour, puis retour à l'étape 2.</li></ol></div>
<p>L'habitude en C est de compter à partir de 0 : <code>for (int i = 0; i &lt; 5; i++)</code> fait aussi 5 tours (0, 1, 2, 3, 4).</p>` },
    { h: "do while : au moins une fois",
      html: `<p><code>do … while</code> exécute le bloc <strong>d'abord</strong>, puis teste la condition. Parfait pour redemander une saisie jusqu'à ce qu'elle soit correcte :</p>
<pre class="cx" data-stdin="-3&#10;0&#10;4"><code>#include &lt;stdio.h&gt;

int main(void)
{
    int n;
    do
    {
        printf("Un nombre positif : ");
        scanf("%i", &amp;n);
    }
    while (n &lt;= 0);
    printf("\\nMerci, tu as choisi %i.\\n", n);
    return 0;
}</code></pre>
<p>Ici, l'utilisateur a tapé -3, puis 0, puis 4 : la question est posée trois fois.</p>` },
    { h: "Deux boucles l'une dans l'autre",
      html: `<p>Une boucle peut en contenir une autre. Pour dessiner un rectangle de 3 lignes de 5 dièses :</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

int main(void)
{
    for (int ligne = 0; ligne &lt; 3; ligne++)
    {
        for (int col = 0; col &lt; 5; col++)
        {
            printf("#");
        }
        printf("\\n");
    }
    return 0;
}</code></pre>
<p>Pour chaque ligne, la boucle intérieure fait ses 5 tours en entier, puis on passe à la ligne. C'est le principe de l'exercice « Mario » de CS50, qui dessine les escaliers du jeu vidéo.</p>
<div class="box why"><b class="tag">Règle d'or</b><p>Dans une boucle <code>while</code>, une ligne du bloc doit faire évoluer la condition vers « faux », sinon la boucle ne s'arrête jamais. Dans l'atelier, un programme qui tourne plus de 4 secondes est arrêté automatiquement.</p></div>` }
  ],
  pitfalls: [
    "Oublier de faire évoluer la variable de la condition : <code>while (i &lt; 5) { printf(\"x\"); }</code> ne s'arrête jamais.",
    "Se tromper d'une unité : <code>for (int i = 0; i &lt;= 5; i++)</code> fait 6 tours, pas 5.",
    "Mettre un point-virgule après le <code>for</code> : <code>for (…);</code> répète… rien, et le bloc ne s'exécute qu'une fois."
  ],
  remember: ["while (condition) { … } répète tant que la condition est vraie.", "for (int i = 0; i < n; i++) fait n tours.", "do { … } while (condition); s'exécute au moins une fois.", "i++ ajoute 1 ; x += 5 ajoute 5."],
  quiz: [
    { q: "Combien de fois s'affiche « x » avec for (int i = 0; i < 4; i++) printf(\"x\"); ?", options: ["3", "4", "5", "Une infinité"], answer: 1, explain: "i prend les valeurs 0, 1, 2 et 3 : 4 tours." },
    { q: "Quelle boucle exécute son bloc au moins une fois, même si la condition est fausse ?", options: ["while", "for", "do while", "aucune"], answer: 2, explain: "do while teste la condition après le bloc." },
    { q: "Deux boucles imbriquées : 3 tours à l'extérieur, 5 tours à l'intérieur. Combien de fois s'exécute le bloc intérieur ?", options: ["8", "15", "5", "3"], answer: 1, explain: "Pour chacun des 3 tours extérieurs, 5 tours intérieurs : 3 × 5 = 15." }
  ],
  exercise: {
    task: `Écris un programme qui lit une hauteur <code>n</code>, puis dessine un escalier de <code>n</code> lignes : la ligne 1 a un <code>#</code>, la ligne 2 en a deux, et ainsi de suite. Avec 3 :<br><code>#</code><br><code>##</code><br><code>###</code>`,
    hint: `Une boucle for pour les lignes (i de 1 à n), et dans chacune une boucle for qui affiche i fois "#". Puis printf("\\n") à la fin de chaque ligne.`,
    start: `#include <stdio.h>

int main(void)
{
    int n;
    scanf("%i", &n);

    return 0;
}
`,
    sol: `#include <stdio.h>

int main(void)
{
    int n;
    scanf("%i", &n);
    for (int i = 1; i <= n; i++)
    {
        for (int j = 0; j < i; j++)
        {
            printf("#");
        }
        printf("\\n");
    }
    return 0;
}
`,
    inputs: "3",
    check: (o, c) => { if (o.trim() !== "#\n##\n###") return "Avec 3, on attend trois lignes : #, ##, ###."; if ((c.match(/\bfor\b|\bwhile\b/g) || []).length < 2) return "Utilise deux boucles (une pour les lignes, une pour les # de chaque ligne)."; return true; },
    extra: { inputs: "5", check: (o) => o.trim() === "#\n##\n###\n####\n#####" || "Avec 5, on attend cinq lignes, de # à #####. Ton escalier doit dépendre de la hauteur tapée." }
  }
},
/* ------------------------------------------------------------------ */
{ id: "c06", title: "Les fonctions : découper son programme", minutes: 30, cs50x: 1,
  goal: "Écrire tes propres fonctions avec des paramètres et une valeur de retour, les annoncer avec un prototype, et comprendre la portée des variables.",
  why: `<p>Un programme de 1000 lignes dans <code>main</code> est impossible à lire et à corriger. Les fonctions permettent de le découper en petits outils, chacun avec un nom clair : <code>calculer_total</code>, <code>afficher_ticket</code>. CS50 insiste sur trois qualités d'un programme : il doit être <strong>correct</strong>, bien <strong>conçu</strong> et <strong>lisible</strong>. Les fonctions servent les trois.</p>`,
  sections: [
    { h: "Écrire une fonction",
      html: `<pre class="cx"><code>#include &lt;stdio.h&gt;

int carre(int x)
{
    return x * x;
}

int main(void)
{
    printf("%i\\n", carre(4));
    int c = carre(7);
    printf("%i\\n", c);
    return 0;
}</code></pre>
<ul><li><code>int</code> au début : le type de la valeur que la fonction <strong>renvoie</strong>.</li>
<li><code>carre</code> : son nom.</li>
<li><code>(int x)</code> : son <strong>paramètre</strong>, une variable qui reçoit la valeur donnée à l'appel.</li>
<li><code>return</code> renvoie le résultat et termine la fonction.</li></ul>` },
    { h: "Plusieurs paramètres, et les fonctions void",
      html: `<p>Une fonction peut recevoir plusieurs valeurs. Et une fonction qui ne renvoie rien (elle affiche, par exemple) a le type <code>void</code> :</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

int monnaie(int paye, int prix)
{
    return paye - prix;
}

void ticket(char article, int prix)
{
    printf("Article %c : %i F\\n", article, prix);
}

int main(void)
{
    ticket('A', 3500);
    printf("Monnaie : %i F\\n", monnaie(5000, 3500));
    return 0;
}</code></pre>
<p>Les valeurs sont données <strong>dans l'ordre</strong> des paramètres : <code>monnaie(5000, 3500)</code> met 5000 dans <code>paye</code> et 3500 dans <code>prix</code>.</p>` },
    { h: "Le prototype : annoncer une fonction",
      html: `<p>Le compilateur lit le fichier de haut en bas. Si <code>main</code> appelle une fonction écrite plus bas, il ne la connaît pas encore. Solution : l'<strong>annoncer</strong> en haut avec son <strong>prototype</strong>, sa première ligne suivie d'un point-virgule.</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

int minutes_totales(int heures, int minutes);   // le prototype

int main(void)
{
    printf("Trajet : %i minutes\\n", minutes_totales(2, 45));
    return 0;
}

int minutes_totales(int heures, int minutes)
{
    return heures * 60 + minutes;
}</code></pre>
<p>Ainsi, <code>main</code> reste en haut, et on lit d'abord l'essentiel du programme.</p>` },
    { h: "Les variables d'une fonction restent dans la fonction",
      html: `<p>Une variable déclarée dans une fonction (ou dans un bloc <code>{ }</code>) n'existe <strong>que là</strong>. C'est sa <strong>portée</strong>.</p>
<pre><code>int doubler(int n)
{
    int resultat = n * 2;
    return resultat;
}

int main(void)
{
    doubler(5);
    printf("%i\\n", resultat);   // erreur : resultat n'existe pas ici
}</code></pre>
<p>Pour récupérer la valeur, il faut la ranger : <code>int r = doubler(5);</code>. Et le paramètre <code>n</code> reçoit une <strong>copie</strong> de la valeur : modifier <code>n</code> dans la fonction ne change pas la variable de <code>main</code>. On verra à la leçon 14 comment faire autrement, avec les pointeurs.</p>` }
  ],
  pitfalls: [
    "Appeler une fonction écrite plus bas sans prototype : le compilateur dit qu'elle n'est pas déclarée.",
    "Oublier <code>return</code> dans une fonction <code>int</code> : la valeur renvoyée est n'importe quoi.",
    "Donner les arguments dans le mauvais ordre ou en mauvais nombre : <code>monnaie(3500, 5000)</code> donne -1500.",
    "Utiliser dans <code>main</code> une variable déclarée dans une autre fonction : elle n'existe pas en dehors de son bloc."
  ],
  remember: ["type nom(paramètres) { … return valeur; }", "void : la fonction ne renvoie rien.", "Un prototype en haut du fichier annonce une fonction écrite plus bas.", "Les variables d'une fonction sont locales ; les paramètres reçoivent une copie."],
  quiz: [
    { q: "int f(int x) { return x + 1; } Que vaut f(f(3)) ?", options: ["4", "5", "6", "Erreur"], answer: 1, explain: "f(3) = 4, puis f(4) = 5." },
    { q: "Quel type de retour pour une fonction qui affiche un ticket sans rien renvoyer ?", options: ["int", "void", "char", "float"], answer: 1, explain: "void veut dire « rien »." },
    { q: "À quoi sert un prototype ?", options: ["À accélérer le programme", "À annoncer une fonction avant de l'utiliser", "À afficher la fonction", "À la supprimer"], answer: 1, explain: "Il dit au compilateur que la fonction existe, avec ses paramètres et son type de retour." }
  ],
  exercise: {
    task: `Écris une fonction <code>int minutes_totales(int heures, int minutes)</code> qui renvoie la durée totale en minutes. Dans <code>main</code>, affiche le résultat pour un trajet de 2 h 45, puis pour 1 h 05 : on attend <code>165</code> puis <code>65</code>, chacun sur sa ligne.`,
    hint: `return heures * 60 + minutes; puis dans main : printf("%i\\n", minutes_totales(2, 45)); et pareil pour (1, 5).`,
    start: `#include <stdio.h>

// écris la fonction minutes_totales ici

int main(void)
{

    return 0;
}
`,
    sol: `#include <stdio.h>

int minutes_totales(int heures, int minutes)
{
    return heures * 60 + minutes;
}

int main(void)
{
    printf("%i\\n", minutes_totales(2, 45));
    printf("%i\\n", minutes_totales(1, 5));
    return 0;
}
`,
    check: (o, c) => { const l = o.trim().split("\n").map(s => s.trim()); if (l[0] !== "165" || l[1] !== "65") return "On attend 165 puis 65, chacun sur sa ligne."; if (!/int\s+minutes_totales\s*\(\s*int\s+\w+\s*,\s*int\s+\w+\s*\)\s*\{/.test(c)) return "Écris la fonction int minutes_totales(int heures, int minutes) { … }."; if (!/return/.test(c.slice(c.search(/int\s+minutes_totales/)))) return "La fonction doit renvoyer son résultat avec return."; if (/printf\s*\(\s*"(165|65)/.test(c)) return "N'écris pas 165 ou 65 à la main : appelle ta fonction."; return true; }
  }
}
  ]
});
