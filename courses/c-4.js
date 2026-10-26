/* Cours C — Partie 4 : mémoire et structures de données (repère CS50x, semaines 4 « Memory » et 5 « Data Structures ») */
(window.C_PARTS = window.C_PARTS || []).push({
  title: "Mémoire et structures de données",
  lessons: [
/* ------------------------------------------------------------------ */
{ id: "c14", title: "La mémoire et les pointeurs", minutes: 35, cs50x: 4,
  goal: "Comprendre qu'une variable a une adresse, manipuler un pointeur avec & et *, et écrire une fonction qui modifie les variables de l'appelant.",
  why: `<p>Les pointeurs ont la réputation d'être la partie difficile du C. C'est pourtant une idée simple : chaque variable habite à une <strong>adresse</strong> dans la mémoire, comme chaque maison a une adresse dans un quartier. Comprendre les pointeurs, c'est comprendre comment fonctionnent vraiment les textes, les tableaux, <code>scanf</code>, et toutes les structures de données.</p>`,
  sections: [
    { h: "La mémoire, une longue rue de cases",
      html: `<p>La mémoire de l'ordinateur est une suite de cases d'un <strong>octet</strong>, chacune avec un numéro : son adresse. Un <code>int</code> occupe 4 cases côte à côte, un <code>char</code> une seule.</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

int main(void)
{
    int n = 50;
    printf("Valeur : %i\\n", n);
    printf("Adresse : %p\\n", &amp;n);
    printf("Taille : %zu octets\\n", sizeof(n));
    return 0;
}</code></pre>
<ul><li><code>&amp;n</code> se lit « l'adresse de n ».</li>
<li><code>%p</code> affiche une adresse, écrite en <strong>hexadécimal</strong> (base 16, avec les chiffres 0 à 9 puis a à f), précédée de <code>0x</code>. C'est la façon habituelle d'écrire les adresses.</li>
<li><code>sizeof</code> donne la taille en octets.</li></ul>
<p>L'adresse exacte dépend de la machine : ici, le programme tourne dans ta page, qui a sa propre mémoire.</p>` },
    { h: "Un pointeur, c'est une adresse rangée dans une variable",
      html: `<pre class="cx"><code>#include &lt;stdio.h&gt;

int main(void)
{
    int n = 50;
    int *p = &amp;n;
    printf("%i\\n", *p);
    *p = 75;
    printf("%i\\n", n);
    return 0;
}</code></pre>
<ul><li><code>int *p</code> : p est un <strong>pointeur</strong> vers un int, c'est-à-dire une variable qui contient l'adresse d'un int.</li>
<li><code>p = &amp;n</code> : p contient l'adresse de n. On dit que p <strong>pointe vers</strong> n.</li>
<li><code>*p</code> : « ce qui se trouve à l'adresse p ». Lire <code>*p</code>, c'est lire n ; écrire <code>*p = 75</code>, c'est modifier n.</li></ul>
<div class="box plain"><b class="tag">En clair</b><p>n est une maison où habite la valeur 50. p est un papier où est écrite l'adresse de la maison. <code>*p</code>, c'est aller à cette adresse : on peut regarder ce qu'il y a dans la maison, ou changer son contenu.</p></div>` },
    { h: "Pourquoi une fonction a besoin de pointeurs",
      html: `<p>À la leçon 6, on a vu qu'une fonction reçoit une <strong>copie</strong> de ses arguments. Résultat, cette fonction d'échange ne marche pas :</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

void echanger_rate(int a, int b)
{
    int temp = a;
    a = b;
    b = temp;
}

void echanger(int *a, int *b)
{
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void)
{
    int x = 1, y = 2;
    echanger_rate(x, y);
    printf("Après echanger_rate : %i %i\\n", x, y);
    echanger(&amp;x, &amp;y);
    printf("Après echanger : %i %i\\n", x, y);
    return 0;
}</code></pre>
<p><code>echanger_rate</code> échange ses copies, puis elles disparaissent : x et y n'ont pas bougé. <code>echanger</code> reçoit les <strong>adresses</strong> de x et y, et modifie directement ce qui s'y trouve. C'est exactement pour ça que <code>scanf</code> demande <code>&amp;age</code> : elle a besoin de savoir <strong>où</strong> écrire.</p>` },
    { h: "Les textes sont des pointeurs",
      html: `<p>Un texte est un tableau de caractères ; le nom d'un tableau est l'adresse de sa première case. D'où le type <code>char *</code> : « l'adresse d'un caractère », le premier du texte.</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

int main(void)
{
    char *ville = "Kaya";
    printf("%c\\n", *ville);
    printf("%c\\n", *(ville + 1));
    printf("%s\\n", ville + 2);
    int notes[] = {12, 15, 9};
    int *q = notes;
    printf("%i\\n", *(q + 2));
    return 0;
}</code></pre>
<p>Ajouter 1 à un pointeur le fait avancer d'<strong>une case du bon type</strong> : d'un caractère pour un <code>char *</code>, d'un entier (4 octets) pour un <code>int *</code>. C'est l'<strong>arithmétique des pointeurs</strong>. <code>t[i]</code> est en fait une écriture plus lisible de <code>*(t + i)</code>.</p>
<p>Enfin, <code>NULL</code> est une adresse spéciale qui veut dire « pointe vers rien ». On l'utilise pour marquer un pointeur vide.</p>` }
  ],
  pitfalls: [
    "Confondre les deux sens de l'étoile : dans une déclaration (<code>int *p</code>), elle dit « p est un pointeur » ; ailleurs (<code>*p = 3</code>), elle veut dire « va à l'adresse p ».",
    "Utiliser un pointeur qui ne pointe vers rien (non initialisé, ou NULL) : sur un vrai ordinateur, le programme plante (« segmentation fault »).",
    "Oublier le <code>&amp;</code> à l'appel : <code>echanger(x, y)</code> au lieu de <code>echanger(&amp;x, &amp;y)</code>.",
    "Comparer deux textes avec <code>==</code> : on compare leurs adresses, pas leurs lettres. D'où <code>strcmp</code>."
  ],
  remember: ["&x donne l'adresse de x ; une adresse s'affiche avec %p.", "int *p = &x; : p pointe vers x ; *p lit ou modifie x.", "Pour qu'une fonction modifie une variable, on lui passe son adresse.", "char * est l'adresse du premier caractère d'un texte ; t[i] veut dire *(t + i)."],
  quiz: [
    { q: "int n = 5; int *p = &n; *p = 9; Que vaut n ?", options: ["5", "9", "L'adresse de n", "0"], answer: 1, explain: "*p désigne n lui-même : écrire *p = 9 modifie n." },
    { q: "Pourquoi scanf a-t-elle besoin de &age ?", options: ["Pour afficher l'âge", "Pour savoir où écrire la valeur lue", "Pour convertir le texte", "Par habitude"], answer: 1, explain: "Une fonction reçoit des copies : pour modifier age, scanf a besoin de son adresse." },
    { q: "char *s = \"Bobo\"; Que vaut *(s + 2) ?", options: ["'B'", "'o'", "'b'", "\"bo\""], answer: 2, explain: "s + 2 pointe vers la troisième lettre : 'b'." }
  ],
  exercise: {
    task: `Écris la fonction <code>void echanger(int *a, int *b)</code>, qui échange les deux valeurs pointées. Le <code>main</code> est déjà écrit : il échange deux prix et doit afficher <code>Avant : 500 300</code> puis <code>Après : 300 500</code>.`,
    hint: `int temp = *a; *a = *b; *b = temp;`,
    start: `#include <stdio.h>

void echanger(int *a, int *b)
{

}

int main(void)
{
    int prix1 = 500, prix2 = 300;
    printf("Avant : %i %i\\n", prix1, prix2);
    echanger(&prix1, &prix2);
    printf("Après : %i %i\\n", prix1, prix2);
    return 0;
}
`,
    sol: `#include <stdio.h>

void echanger(int *a, int *b)
{
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void)
{
    int prix1 = 500, prix2 = 300;
    printf("Avant : %i %i\\n", prix1, prix2);
    echanger(&prix1, &prix2);
    printf("Après : %i %i\\n", prix1, prix2);
    return 0;
}
`,
    check: (o, c) => { const l = o.trim().split("\n").map(s => s.trim()); if (l[0] !== "Avant : 500 300" || l[1] !== "Après : 300 500") return "On attend : Avant : 500 300 puis Après : 300 500."; if (!/echanger\s*\(\s*&\s*prix1\s*,\s*&\s*prix2\s*\)/.test(c)) return "Garde l'appel echanger(&prix1, &prix2) du main."; if (!/\*\s*a\s*=/.test(c) || !/\*\s*b\s*=/.test(c)) return "Dans la fonction, modifie les valeurs pointées avec *a = … et *b = …"; return true; }
  }
},
/* ------------------------------------------------------------------ */
{ id: "c15", title: "Allouer la mémoire : malloc et free", minutes: 35, cs50x: 4,
  goal: "Réserver de la mémoire pendant l'exécution avec malloc, vérifier le résultat, la libérer avec free, et copier correctement un texte.",
  why: `<p>Jusqu'ici, la taille de chaque tableau était écrite dans le code. Mais combien d'élèves dans la classe ? Combien de clients aujourd'hui ? On ne le sait qu'au moment où le programme tourne. <code>malloc</code> réserve exactement la place nécessaire, à ce moment-là. En échange, le C te confie une responsabilité : rendre cette mémoire quand tu as fini.</p>`,
  sections: [
    { h: "Le piège de la copie",
      html: `<p>Copier un texte avec <code>=</code> ne copie pas les lettres : ça copie l'<strong>adresse</strong>. Les deux variables pointent alors vers le même texte :</p>
<pre class="cx"><code>#include &lt;ctype.h&gt;
#include &lt;stdio.h&gt;

int main(void)
{
    char s[] = "awa";
    char *t = s;
    t[0] = toupper(t[0]);
    printf("s : %s\\n", s);
    printf("t : %s\\n", t);
    return 0;
}</code></pre>
<p>On a mis une majuscule à t… et s a changé aussi ! Pour avoir une vraie copie, il faut réserver une nouvelle place en mémoire, puis y recopier les lettres.</p>` },
    { h: "malloc et free",
      html: `<pre class="cx"><code>#include &lt;ctype.h&gt;
#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;string.h&gt;

int main(void)
{
    char *s = "awa";
    char *t = malloc(strlen(s) + 1);
    if (t == NULL)
    {
        return 1;
    }
    strcpy(t, s);
    t[0] = toupper(t[0]);
    printf("s : %s\\n", s);
    printf("t : %s\\n", t);
    free(t);
    return 0;
}</code></pre>
<ul><li><code>malloc(n)</code> (dans <code>&lt;stdlib.h&gt;</code>) réserve n octets et renvoie l'adresse de cette zone. Ici, <code>strlen(s) + 1</code> : les lettres plus le <code>'\\0'</code>.</li>
<li>Si la mémoire manque, <code>malloc</code> renvoie <code>NULL</code> : on vérifie toujours avant d'utiliser.</li>
<li><code>free(t)</code> rend la mémoire quand on n'en a plus besoin.</li></ul>` },
    { h: "Un tableau de la bonne taille",
      html: `<p>Pour un tableau, on multiplie le nombre de cases par la taille d'une case, donnée par <code>sizeof</code> :</p>
<pre class="cx" data-stdin="3&#10;12 15 9"><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main(void)
{
    int n;
    scanf("%i", &amp;n);
    int *notes = malloc(n * sizeof(int));
    if (notes == NULL)
    {
        return 1;
    }
    for (int i = 0; i &lt; n; i++)
    {
        scanf("%i", &amp;notes[i]);
    }
    printf("Dernière note : %i\\n", notes[n - 1]);
    free(notes);
    return 0;
}</code></pre>
<p>Une fois réservée, la zone s'utilise exactement comme un tableau : <code>notes[i]</code>.</p>` },
    { h: "Les erreurs de mémoire",
      html: `<ul><li><strong>Fuite de mémoire</strong> : oublier <code>free</code>. Un petit programme s'en remet, mais un serveur qui tourne des mois finit par manquer de mémoire.</li>
<li><strong>Valeurs poubelles</strong> : une variable ou une zone de <code>malloc</code> non initialisée contient ce qui traînait là avant. Donne toujours une valeur de départ.</li>
<li><strong>Débordement</strong> (<em>buffer overflow</em>) : écrire après la fin d'une zone, par exemple un <code>strcpy</code> dans une place trop petite. C'est l'origine de nombreuses failles de sécurité.</li>
<li><strong>Utiliser après free</strong> : la mémoire rendue n'est plus à toi.</li></ul>
<p>Sur un ordinateur, les programmeurs C utilisent un outil comme <strong>Valgrind</strong> pour détecter ces erreurs automatiquement. CS50 le présente dans la même semaine.</p>
<div class="box why"><b class="tag">À retenir</b><p>Chaque <code>malloc</code> doit avoir son <code>free</code>, une seule fois, quand on a fini. Et chaque <code>malloc</code> doit être suivi d'une vérification <code>if (p == NULL)</code>.</p></div>` }
  ],
  pitfalls: [
    "Copier un texte avec <code>t = s</code> : on copie l'adresse, pas les lettres. Utilise <code>malloc</code> puis <code>strcpy</code>.",
    "Oublier le <code>+ 1</code> pour le <code>'\\0'</code> : <code>malloc(strlen(s))</code> est trop petit d'une case.",
    "Oublier <code>sizeof(int)</code> : <code>malloc(n)</code> réserve n octets, pas n entiers.",
    "Ne pas vérifier que <code>malloc</code> n'a pas renvoyé <code>NULL</code>, ou oublier <code>free</code>."
  ],
  remember: ["malloc(taille) réserve de la mémoire et renvoie son adresse (ou NULL).", "Pour n entiers : malloc(n * sizeof(int)).", "Pour copier un texte : malloc(strlen(s) + 1), puis strcpy.", "Chaque malloc a son free."],
  quiz: [
    { q: "Combien d'octets réserver pour copier le texte \"Kaya\" ?", options: ["4", "5", "8", "1"], answer: 1, explain: "4 lettres + 1 pour le '\\0' : strlen(\"Kaya\") + 1 = 5." },
    { q: "char *t = s; puis t[0] = 'X'; Que devient s ?", options: ["Il ne change pas", "Sa première lettre devient X", "Il est effacé", "Erreur de compilation"], answer: 1, explain: "t et s contiennent la même adresse : ils désignent le même texte." },
    { q: "Que renvoie malloc si la mémoire manque ?", options: ["0 octet", "NULL", "-1", "Une erreur de compilation"], answer: 1, explain: "malloc renvoie NULL : il faut toujours le vérifier." }
  ],
  exercise: {
    task: `Écris un programme qui lit un nombre <code>n</code> d'élèves, puis leurs <code>n</code> notes, dans un tableau réservé avec <code>malloc</code>. Affiche la moyenne avec deux chiffres après la virgule, sous la forme <code>Moyenne : 13.50</code>, puis libère la mémoire avec <code>free</code>. La correction essaie deux classes.`,
    hint: `int *notes = malloc(n * sizeof(int)); vérifie NULL, une boucle avec scanf("%i", &notes[i]) en additionnant, puis printf("Moyenne : %.2f\\n", somme / (float) n); et free(notes);`,
    start: `#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int n;
    scanf("%i", &n);

    return 0;
}
`,
    sol: `#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int n;
    scanf("%i", &n);
    int *notes = malloc(n * sizeof(int));
    if (notes == NULL)
    {
        return 1;
    }
    int somme = 0;
    for (int i = 0; i < n; i++)
    {
        scanf("%i", &notes[i]);
        somme += notes[i];
    }
    printf("Moyenne : %.2f\\n", somme / (float) n);
    free(notes);
    return 0;
}
`,
    inputs: "4\n12 15 9 18",
    check: (o, c) => { if (o.trim().split("\n").pop().trim() !== "Moyenne : 13.50") return "Avec 4 notes (12, 15, 9, 18), on attend : Moyenne : 13.50"; if (!/malloc\s*\(/.test(c)) return "Réserve le tableau avec malloc."; if (!/sizeof/.test(c)) return "Utilise sizeof(int) dans malloc : n * sizeof(int)."; if (!/free\s*\(/.test(c)) return "Libère la mémoire à la fin avec free."; return true; },
    extra: { inputs: "3\n10 11 15", check: (o) => o.trim().split("\n").pop().trim() === "Moyenne : 12.00" || "Avec 3 notes (10, 11, 15), on attend : Moyenne : 12.00. Le nombre de notes doit venir de ce qui est tapé." }
  }
},
/* ------------------------------------------------------------------ */
{ id: "c16", title: "Projet final : la file d'attente du guichet", minutes: 50, cs50x: 5,
  goal: "Découvrir les grandes structures de données (liste chaînée, pile, file, table de hachage, arbre), et programmer une file d'attente avec une liste chaînée.",
  why: `<p>Au guichet d'une banque ou d'Orange Money, les clients arrivent un par un et sont servis dans l'ordre d'arrivée. Combien seront-ils aujourd'hui ? Impossible de le savoir à l'avance : un tableau de taille fixe ne convient pas. Les <strong>structures de données</strong> sont les façons de ranger des informations en mémoire pour que les opérations utiles soient rapides. Ce projet assemble tout le cours : structures, pointeurs, <code>malloc</code>, <code>free</code> et textes.</p>`,
  sections: [
    { h: "Tableau ou liste chaînée ?",
      html: `<p>Un tableau est un bloc de cases côte à côte : on accède à n'importe quelle case tout de suite (<code>t[i]</code>), mais sa taille est fixe. Pour l'agrandir, il faut réserver un nouveau bloc et tout recopier.</p>
<p>Une <strong>liste chaînée</strong> est faite de <strong>nœuds</strong> éparpillés dans la mémoire. Chaque nœud contient une valeur <strong>et</strong> l'adresse du nœud suivant, comme une chaîne de personnes où chacun connaît seulement le suivant :</p>
<pre><code>typedef struct noeud
{
    char nom[50];
    struct noeud *suivant;
}
noeud;</code></pre>
<p>Le dernier nœud a <code>suivant = NULL</code> : la chaîne s'arrête là. Ajouter un nœud ne demande aucune recopie : on réserve un nœud avec <code>malloc</code> et on le raccroche.</p>
<p>Pour accéder à un champ à travers un pointeur, on écrit <code>p-&gt;nom</code>, qui veut dire <code>(*p).nom</code>.</p>` },
    { h: "Construire et parcourir une liste",
      html: `<pre class="cx"><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

typedef struct noeud
{
    int valeur;
    struct noeud *suivant;
}
noeud;

int main(void)
{
    noeud *liste = NULL;
    for (int i = 1; i &lt;= 3; i++)
    {
        noeud *n = malloc(sizeof(noeud));
        if (n == NULL)
        {
            return 1;
        }
        n-&gt;valeur = i * 1000;
        n-&gt;suivant = liste;
        liste = n;
    }
    for (noeud *p = liste; p != NULL; p = p-&gt;suivant)
    {
        printf("%i\\n", p-&gt;valeur);
    }
    while (liste != NULL)
    {
        noeud *suite = liste-&gt;suivant;
        free(liste);
        liste = suite;
    }
    return 0;
}</code></pre>
<div class="box steps"><b class="tag">Pas à pas</b><ol>
<li>Chaque nouveau nœud est ajouté <strong>au début</strong> : son <code>suivant</code> est l'ancienne liste. D'où l'ordre 3000, 2000, 1000.</li>
<li>Le parcours suit les flèches : <code>p = p-&gt;suivant</code>, jusqu'à <code>NULL</code>.</li>
<li>Pour libérer, on garde l'adresse du suivant <strong>avant</strong> de faire <code>free</code>, sinon on perd le reste de la chaîne.</li></ol></div>` },
    { h: "Piles, files, tables de hachage et arbres",
      html: `<div class="table-wrap"><table><thead><tr><th>Structure</th><th>Principe</th><th>Exemple</th></tr></thead><tbody>
<tr><td><strong>Pile</strong> (<em>stack</em>)</td><td>le dernier arrivé sort le premier</td><td>une pile d'assiettes, le bouton « retour » d'un navigateur</td></tr>
<tr><td><strong>File</strong> (<em>queue</em>)</td><td>le premier arrivé sort le premier</td><td>la file d'attente au guichet</td></tr>
<tr><td><strong>Table de hachage</strong></td><td>une fonction transforme la clé en numéro de case : on trouve presque immédiatement</td><td>un répertoire rangé par première lettre du nom</td></tr>
<tr><td><strong>Arbre binaire de recherche</strong></td><td>chaque nœud a un enfant plus petit à gauche, un plus grand à droite</td><td>la recherche dichotomique, mais dans une structure qui peut grandir</td></tr>
</tbody></table></div>
<p>Chaque structure est un compromis entre la vitesse et la mémoire. Le métier de programmeur, c'est en grande partie choisir la bonne.</p>` },
    { h: "Le projet : la file d'attente",
      html: `<p>Le programme lit des commandes tapées au guichet :</p>
<pre><code>arrive Awa
arrive Moussa
sert
arrive Rasmata
sert</code></pre>
<ul><li><code>arrive NOM</code> : le client se met <strong>à la fin</strong> de la file.</li>
<li><code>sert</code> : le client <strong>en tête</strong> est servi. Le programme affiche <code>Servi : Awa</code>, ou <code>Personne en attente</code> si la file est vide.</li>
<li>À la fin des commandes, il affiche <code>Encore en attente : 1</code> (le nombre de clients restés dans la file), puis libère toute la mémoire.</li></ul>
<p>Pour ajouter à la fin rapidement, on garde deux pointeurs : <code>tete</code> (le premier client) et <code>fin</code> (le dernier). Le squelette est dans l'atelier : il lit déjà les commandes, à toi d'écrire <code>arriver</code>, <code>servir</code> et <code>vider</code>.</p>
<div class="box plain"><b class="tag">La méthode</b><p>Dessine la file sur papier avec des cases et des flèches avant d'écrire le code. Pour chaque fonction, demande-toi : que se passe-t-il si la file est vide ? s'il n'y a qu'un client ? Ce sont les cas qui cassent les programmes.</p></div>` }
  ],
  pitfalls: [
    "Faire <code>free</code> sur un nœud avant d'avoir gardé l'adresse du suivant : on perd le reste de la liste.",
    "Oublier de mettre <code>fin</code> à jour quand la file devient vide (après avoir servi le dernier client) : le prochain <code>arriver</code> se raccroche à un nœud libéré.",
    "Oublier <code>suivant = NULL</code> sur un nouveau nœud : le parcours continue dans une valeur poubelle.",
    "Écrire <code>p.nom</code> au lieu de <code>p-&gt;nom</code> quand p est un pointeur."
  ],
  remember: ["Une liste chaînée : des nœuds reliés par des pointeurs, le dernier pointe vers NULL.", "p->champ veut dire (*p).champ.", "Pile : dernier arrivé, premier sorti. File : premier arrivé, premier sorti.", "Tester les cas limites : liste vide, un seul élément."],
  quiz: [
    { q: "Dans une file d'attente, qui sort en premier ?", options: ["Le dernier arrivé", "Le premier arrivé", "Le plus pressé", "Au hasard"], answer: 1, explain: "Une file : premier arrivé, premier servi. C'est la pile qui fait sortir le dernier arrivé." },
    { q: "Comment s'arrête le parcours d'une liste chaînée ?", options: ["Après 10 nœuds", "Quand suivant vaut NULL", "Quand la valeur vaut 0", "Il ne s'arrête jamais"], answer: 1, explain: "Le dernier nœud a suivant = NULL : c'est la fin de la chaîne." },
    { q: "Pourquoi garder l'adresse du suivant avant free(noeud) ?", options: ["Pour aller plus vite", "Après free, on ne peut plus lire noeud->suivant", "Le C l'exige à la compilation", "Pour afficher le nœud"], answer: 1, explain: "La mémoire libérée n'est plus à nous : il faut lire suivant avant de la rendre." },
    { type: "open", q: "Tu dois écrire un programme qui gère l'historique des pages visitées, où le bouton « retour » ramène à la page précédente. Quelle structure de données choisirais-tu, et pourquoi ?", a: "Une pile : la dernière page visitée est la première à ressortir quand on appuie sur « retour ». On empile chaque nouvelle page, et « retour » dépile la page du dessus. Une liste chaînée où l'on ajoute et retire au début fait une très bonne pile." }
  ],
  exercise: {
    task: `Complète les trois fonctions de la file d'attente :
<ul><li><code>arriver(nom)</code> : réserve un nouveau client avec <code>malloc</code>, copie son nom, et l'ajoute <strong>à la fin</strong> de la file ;</li>
<li><code>servir()</code> : retire le client <strong>en tête</strong>, affiche <code>Servi : NOM</code> et libère sa mémoire, ou affiche <code>Personne en attente</code> si la file est vide ;</li>
<li><code>vider()</code> : libère tous les clients restants et renvoie leur nombre.</li></ul>
La correction tape les commandes de l'exemple, puis d'autres.`,
    hint: `arriver : n = malloc(sizeof(client)); strcpy(n->nom, nom); n->suivant = NULL; si tete == NULL, tete = fin = n ; sinon fin->suivant = n puis fin = n. servir : garde c = tete, avance tete = tete->suivant, si tete devient NULL alors fin = NULL, affiche, puis free(c). vider : comme servir, sans afficher, en comptant.`,
    start: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct client
{
    char nom[50];
    struct client *suivant;
}
client;

client *tete = NULL;
client *fin = NULL;

void arriver(char *nom)
{
    // ajoute un client à la fin de la file
}

void servir(void)
{
    // retire et affiche le client en tête, ou « Personne en attente »
}

int vider(void)
{
    // libère tous les clients restants et renvoie leur nombre
    return 0;
}

int main(void)
{
    char commande[10], nom[50];
    while (scanf("%9s", commande) == 1)
    {
        if (strcmp(commande, "arrive") == 0 && scanf("%49s", nom) == 1)
        {
            arriver(nom);
        }
        else if (strcmp(commande, "sert") == 0)
        {
            servir();
        }
    }
    printf("Encore en attente : %i\\n", vider());
    return 0;
}
`,
    sol: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct client
{
    char nom[50];
    struct client *suivant;
}
client;

client *tete = NULL;
client *fin = NULL;

void arriver(char *nom)
{
    client *n = malloc(sizeof(client));
    if (n == NULL)
    {
        return;
    }
    strcpy(n->nom, nom);
    n->suivant = NULL;
    if (tete == NULL)
    {
        tete = n;
        fin = n;
    }
    else
    {
        fin->suivant = n;
        fin = n;
    }
}

void servir(void)
{
    if (tete == NULL)
    {
        printf("Personne en attente\\n");
        return;
    }
    client *c = tete;
    tete = tete->suivant;
    if (tete == NULL)
    {
        fin = NULL;
    }
    printf("Servi : %s\\n", c->nom);
    free(c);
}

int vider(void)
{
    int nombre = 0;
    while (tete != NULL)
    {
        client *suite = tete->suivant;
        free(tete);
        tete = suite;
        nombre++;
    }
    fin = NULL;
    return nombre;
}

int main(void)
{
    char commande[10], nom[50];
    while (scanf("%9s", commande) == 1)
    {
        if (strcmp(commande, "arrive") == 0 && scanf("%49s", nom) == 1)
        {
            arriver(nom);
        }
        else if (strcmp(commande, "sert") == 0)
        {
            servir();
        }
    }
    printf("Encore en attente : %i\\n", vider());
    return 0;
}
`,
    inputs: "arrive Awa\narrive Moussa\nsert\narrive Rasmata\nsert",
    check: (o, c) => { const got = o.trim().split("\n").map(s => s.trim()).join(" | "); const want = "Servi : Awa | Servi : Moussa | Encore en attente : 1"; if (got !== want) return `Avec les commandes de l'exemple, on attend : ${want.replace(/ \| /g, ", puis ")}. Obtenu : ${got || "rien"}.`; if (!/malloc\s*\(/.test(c) || !/free\s*\(/.test(c)) return "Utilise malloc pour chaque client et free quand il est servi ou à la fin."; return true; },
    extra: { inputs: "sert\narrive Fatimata\nsert\nsert\narrive Ibrahim\narrive Salif\narrive Kadidia\nsert",
      check: (o) => { const got = o.trim().split("\n").map(s => s.trim()).join(" | "); const want = "Personne en attente | Servi : Fatimata | Personne en attente | Servi : Ibrahim | Encore en attente : 2"; return got === want || `2e essai : on attend ${want.replace(/ \| /g, ", ")}. Obtenu : ${got || "rien"}. Vérifie la file vide, et la remise à NULL de fin quand le dernier client est servi.`; } }
  }
}
  ]
});
