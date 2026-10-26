/* Cours C — Partie 3 : algorithmes (repère CS50x, semaine 3 « Algorithms ») */
(window.C_PARTS = window.C_PARTS || []).push({
  title: "Algorithmes",
  lessons: [
/* ------------------------------------------------------------------ */
{ id: "c10", title: "Chercher : recherche linéaire et dichotomique", minutes: 35, cs50x: 3,
  goal: "Écrire une recherche linéaire et une recherche dichotomique, et comparer leur temps d'exécution avec la notation O.",
  why: `<p>Chercher un nom dans un annuaire, un produit dans un stock, un numéro dans une liste : chercher est la chose que les ordinateurs font le plus. Avec 10 éléments, n'importe quelle méthode suffit. Avec 10 millions, le choix de l'<strong>algorithme</strong> fait la différence entre une réponse immédiate et une attente de plusieurs minutes.</p>`,
  sections: [
    { h: "Un algorithme, c'est une méthode",
      html: `<p>Un <strong>algorithme</strong> est une suite d'étapes précises pour résoudre un problème. Imagine un annuaire de 1000 pages, et tu cherches « Sawadogo ».</p>
<ul><li><strong>Méthode 1</strong> : tourner les pages une par une depuis le début. Sûr, mais jusqu'à 1000 pages à regarder.</li>
<li><strong>Méthode 2</strong> : ouvrir au milieu. « Sawadogo » est après « Ouédraogo » ? On jette la première moitié, et on recommence avec l'autre. À chaque fois, il reste deux fois moins de pages : 1000, 500, 250… En une dizaine d'étapes, on a trouvé.</li></ul>
<p>La méthode 2 ne marche que parce que l'annuaire est <strong>trié</strong> par ordre alphabétique.</p>` },
    { h: "La recherche linéaire",
      html: `<p>On regarde chaque case, de la première à la dernière :</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

int chercher(int t[], int n, int x)
{
    for (int i = 0; i &lt; n; i++)
    {
        if (t[i] == x)
        {
            return i;
        }
    }
    return -1;
}

int main(void)
{
    int codes[] = {417, 92, 3051, 88, 760};
    printf("%i\\n", chercher(codes, 5, 88));
    printf("%i\\n", chercher(codes, 5, 999));
    return 0;
}</code></pre>
<p>La fonction renvoie la <strong>position</strong> trouvée, ou <code>-1</code> si la valeur est absente (aucune vraie position ne vaut -1). Elle marche même si le tableau n'est pas trié.</p>` },
    { h: "La recherche dichotomique",
      html: `<p>Dans un tableau <strong>trié</strong>, on regarde la case du milieu, puis on garde seulement la moitié où la valeur peut se trouver :</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

int dichotomie(int t[], int n, int x)
{
    int debut = 0, fin = n - 1;
    while (debut &lt;= fin)
    {
        int milieu = (debut + fin) / 2;
        if (t[milieu] == x)
        {
            return milieu;
        }
        else if (t[milieu] &lt; x)
        {
            debut = milieu + 1;
        }
        else
        {
            fin = milieu - 1;
        }
    }
    return -1;
}

int main(void)
{
    int prix[] = {100, 250, 300, 600, 800, 1200, 2750, 6500, 17500};
    printf("%i\\n", dichotomie(prix, 9, 2750));
    printf("%i\\n", dichotomie(prix, 9, 500));
    return 0;
}</code></pre>
<div class="box steps"><b class="tag">Pas à pas : chercher 2750</b><ol>
<li>debut = 0, fin = 8 → milieu = 4 : prix[4] = 800, plus petit que 2750. On garde la droite : debut = 5.</li>
<li>debut = 5, fin = 8 → milieu = 6 : prix[6] = 2750. Trouvé, position 6.</li></ol>
<p>Deux étapes au lieu de sept avec la recherche linéaire.</p></div>` },
    { h: "Le temps d'exécution : la notation O",
      html: `<p>Pour comparer des algorithmes, on compte le nombre d'étapes <strong>dans le pire des cas</strong>, pour n éléments. On l'écrit avec un grand O (« de l'ordre de ») :</p>
<div class="table-wrap"><table><thead><tr><th>Algorithme</th><th>Pire cas</th><th>n = 1000</th><th>n = 1 000 000</th></tr></thead><tbody>
<tr><td>Recherche linéaire</td><td>O(n)</td><td>1000 étapes</td><td>1 000 000 d'étapes</td></tr>
<tr><td>Recherche dichotomique</td><td>O(log n)</td><td>environ 10 étapes</td><td>environ 20 étapes</td></tr>
</tbody></table></div>
<p>CS50 utilise aussi <strong>Ω</strong> (oméga) pour le meilleur cas : les deux recherches peuvent trouver dès la première étape, Ω(1), si on a de la chance.</p>
<div class="box plain"><b class="tag">En clair</b><p>log n, c'est « combien de fois peut-on couper n en deux ». Un million se coupe en deux une vingtaine de fois avant d'arriver à 1. Doubler la taille du tableau ajoute <strong>une seule</strong> étape à la recherche dichotomique.</p></div>` }
  ],
  pitfalls: [
    "Utiliser la recherche dichotomique sur un tableau non trié : elle peut répondre « absent » alors que la valeur est là.",
    "Oublier le <code>return -1</code> après la boucle : la fonction ne renvoie rien de défini quand la valeur est absente.",
    "Écrire <code>debut = milieu</code> au lieu de <code>milieu + 1</code> : la boucle peut ne jamais s'arrêter."
  ],
  remember: ["Recherche linéaire : chaque case l'une après l'autre, O(n), marche sur tout tableau.", "Recherche dichotomique : on coupe en deux à chaque étape, O(log n), il faut un tableau trié.", "On renvoie la position, ou -1 si absent.", "O = pire cas, Ω = meilleur cas."],
  quiz: [
    { q: "Combien d'étapes au plus pour une recherche dichotomique dans 1024 éléments triés ?", options: ["1024", "512", "environ 10", "1"], answer: 2, explain: "1024 se coupe en deux 10 fois avant d'arriver à 1 : environ 10 étapes." },
    { q: "Quelle condition faut-il pour utiliser la recherche dichotomique ?", options: ["Un tableau trié", "Un tableau de moins de 100 cases", "Des nombres positifs", "Aucune"], answer: 0, explain: "On jette la moitié où la valeur ne peut pas être : il faut que le tableau soit trié." },
    { q: "Quel est le temps de la recherche linéaire dans le pire des cas ?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], answer: 2, explain: "Dans le pire cas (valeur absente ou en dernier), on regarde les n cases." }
  ],
  exercise: {
    task: `Écris la fonction <code>int dichotomie(int t[], int n, int x)</code> : une <strong>recherche dichotomique</strong> qui renvoie la position de <code>x</code> dans le tableau trié, ou <code>-1</code> s'il est absent. Le <code>main</code> est déjà écrit : il cherche plusieurs prix et affiche les positions.`,
    hint: `debut = 0, fin = n - 1 ; tant que debut <= fin : milieu = (debut + fin) / 2 ; si t[milieu] == x on renvoie milieu ; si t[milieu] < x, debut = milieu + 1 ; sinon fin = milieu - 1. Après la boucle : return -1.`,
    start: `#include <stdio.h>

int dichotomie(int t[], int n, int x)
{
    // ta recherche dichotomique ici
    return -1;
}

int main(void)
{
    int prix[] = {100, 250, 300, 600, 800, 1200, 2750, 6500, 17500};
    int cherches[] = {100, 2750, 17500, 600, 500, 20000};
    for (int i = 0; i < 6; i++)
    {
        printf("%i\\n", dichotomie(prix, 9, cherches[i]));
    }
    return 0;
}
`,
    sol: `#include <stdio.h>

int dichotomie(int t[], int n, int x)
{
    int debut = 0, fin = n - 1;
    while (debut <= fin)
    {
        int milieu = (debut + fin) / 2;
        if (t[milieu] == x)
        {
            return milieu;
        }
        else if (t[milieu] < x)
        {
            debut = milieu + 1;
        }
        else
        {
            fin = milieu - 1;
        }
    }
    return -1;
}

int main(void)
{
    int prix[] = {100, 250, 300, 600, 800, 1200, 2750, 6500, 17500};
    int cherches[] = {100, 2750, 17500, 600, 500, 20000};
    for (int i = 0; i < 6; i++)
    {
        printf("%i\\n", dichotomie(prix, 9, cherches[i]));
    }
    return 0;
}
`,
    check: (o, c) => { const got = o.trim().split("\n").map(s => s.trim()).join(","); if (got !== "0,6,8,3,-1,-1") return `Positions attendues : 0, 6, 8, 3, -1, -1. Obtenu : ${got.replace(/,/g, ", ")}.`; const f = c.slice(0, c.search(/int\s+main/)); if (!/\/\s*2|>>\s*1/.test(f)) return "Ta fonction doit couper l'intervalle en deux (milieu = (debut + fin) / 2) : c'est une recherche dichotomique, pas linéaire."; if (/\bfor\b/.test(f)) return "Pas de boucle for qui parcourt toutes les cases : la recherche dichotomique utilise while (debut <= fin)."; return true; }
  }
},
/* ------------------------------------------------------------------ */
{ id: "c11", title: "Les structures : regrouper des informations", minutes: 30, cs50x: 3,
  goal: "Créer tes propres types avec struct et typedef, accéder aux champs avec le point, et ranger des structures dans un tableau.",
  why: `<p>Un contact a un nom <strong>et</strong> un numéro. Un produit a un nom, un prix <strong>et</strong> un stock. Avec seulement des tableaux, il faudrait deux tableaux séparés (les noms d'un côté, les numéros de l'autre) et espérer qu'ils restent dans le même ordre. Une <strong>structure</strong> regroupe les informations qui vont ensemble.</p>`,
  sections: [
    { h: "Définir une structure",
      html: `<pre class="cx"><code>#include &lt;stdio.h&gt;

typedef struct
{
    char *nom;
    char *numero;
}
contact;

int main(void)
{
    contact c;
    c.nom = "Awa";
    c.numero = "70 41 22 85";
    printf("%s : %s\\n", c.nom, c.numero);
    return 0;
}</code></pre>
<ul><li><code>struct { … }</code> décrit les <strong>champs</strong> : ici un nom et un numéro.</li>
<li><code>typedef … contact;</code> donne un nom à ce nouveau type : on peut ensuite écrire <code>contact c;</code> comme on écrit <code>int x;</code>.</li>
<li>On accède à un champ avec un <strong>point</strong> : <code>c.nom</code>.</li>
<li><code>char *</code> veut dire « un texte » (plus précisément, l'adresse de son premier caractère : leçon 14).</li></ul>` },
    { h: "Un tableau de structures",
      html: `<p>On peut ranger des structures dans un tableau, et les initialiser d'un coup :</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

typedef struct
{
    char *nom;
    int prix;
    int stock;
}
produit;

int main(void)
{
    produit boutique[] = {
        {"Sac de riz 25 kg", 17500, 12},
        {"Bidon d'huile 5 L", 6500, 20},
        {"Savon", 250, 0}
    };
    for (int i = 0; i &lt; 3; i++)
    {
        if (boutique[i].stock == 0)
        {
            printf("Rupture : %s\\n", boutique[i].nom);
        }
        else
        {
            printf("%s : %i F (%i en stock)\\n", boutique[i].nom, boutique[i].prix, boutique[i].stock);
        }
    }
    return 0;
}</code></pre>
<p>Chaque case du tableau est un produit complet. <code>boutique[1].prix</code> se lit : « le prix du produit numéro 1 ».</p>` },
    { h: "Chercher dans un répertoire",
      html: `<p>C'est l'exemple « phonebook » de CS50 : on cherche un nom et on affiche le numéro. Pour comparer les textes, <code>strcmp</code> (leçon 8) :</p>
<pre class="cx" data-stdin="Moussa"><code>#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

typedef struct
{
    char *nom;
    char *numero;
}
contact;

int main(void)
{
    contact repertoire[] = {{"Awa", "70 41 22 85"}, {"Moussa", "76 18 90 34"}, {"Rasmata", "65 30 14 77"}};
    char cherche[50];
    scanf("%49s", cherche);
    for (int i = 0; i &lt; 3; i++)
    {
        if (strcmp(repertoire[i].nom, cherche) == 0)
        {
            printf("Trouvé : %s\\n", repertoire[i].numero);
            return 0;
        }
    }
    printf("Introuvable\\n");
    return 1;
}</code></pre>
<p>C'est une recherche linéaire (leçon 10) sur un tableau de structures. Les numéros sont inventés pour l'exemple.</p>` },
    { h: "Une structure dans une fonction",
      html: `<p>Une fonction peut recevoir et renvoyer une structure, comme n'importe quelle valeur :</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

typedef struct
{
    int heures;
    int minutes;
}
duree;

duree ajouter(duree a, duree b)
{
    duree r;
    r.minutes = (a.minutes + b.minutes) % 60;
    r.heures = a.heures + b.heures + (a.minutes + b.minutes) / 60;
    return r;
}

int main(void)
{
    duree aller = {2, 45}, retour = {3, 30};
    duree total = ajouter(aller, retour);
    printf("Total : %i h %i min\\n", total.heures, total.minutes);
    return 0;
}</code></pre>` }
  ],
  pitfalls: [
    "Oublier le point-virgule après la définition : <code>typedef struct { … } contact;</code>.",
    "Écrire <code>repertoire.nom[i]</code> au lieu de <code>repertoire[i].nom</code> : on choisit d'abord la case, puis le champ.",
    "Comparer des noms avec <code>==</code> : utilise <code>strcmp(a, b) == 0</code>."
  ],
  remember: ["typedef struct { champs; } nom_du_type; crée un nouveau type.", "On accède à un champ avec un point : c.nom.", "Un tableau de structures : t[i].champ.", "Une fonction peut recevoir et renvoyer une structure."],
  quiz: [
    { q: "Avec produit boutique[3], comment lire le stock du deuxième produit ?", options: ["boutique.stock[1]", "boutique[1].stock", "boutique[2].stock", "stock.boutique[1]"], answer: 1, explain: "On choisit la case (indice 1 pour le deuxième), puis le champ : boutique[1].stock." },
    { q: "À quoi sert typedef ?", options: ["À créer une variable", "À donner un nom à un type", "À afficher une structure", "À trier un tableau"], answer: 1, explain: "typedef donne un nom au type de structure, pour l'utiliser comme int ou char." },
    { q: "Pourquoi regrouper nom et numéro dans une structure plutôt que dans deux tableaux ?", options: ["C'est plus rapide à taper", "Les informations d'un même contact restent ensemble", "Le C l'exige", "Pour économiser la mémoire"], answer: 1, explain: "Avec deux tableaux séparés, rien ne garantit qu'ils restent alignés. Une structure garde les informations d'un contact ensemble." }
  ],
  exercise: {
    task: `Crée un type <code>produit</code> avec un <code>nom</code> (texte) et un <code>prix</code> (entier). Range ces trois produits dans un tableau : Riz à 17500, Huile à 6500, Sucre à 800. Lis ensuite un nom au clavier et affiche son prix sous la forme <code>Huile : 6500 F</code>, ou <code>Produit inconnu</code> s'il n'est pas dans le tableau.`,
    hint: `typedef struct { char *nom; int prix; } produit; produit stock[] = {{"Riz", 17500}, …}; puis une boucle avec strcmp(stock[i].nom, cherche) == 0.`,
    start: `#include <stdio.h>
#include <string.h>

// définis le type produit ici

int main(void)
{
    char cherche[50];
    scanf("%49s", cherche);

    return 0;
}
`,
    sol: `#include <stdio.h>
#include <string.h>

typedef struct
{
    char *nom;
    int prix;
}
produit;

int main(void)
{
    produit stock[] = {{"Riz", 17500}, {"Huile", 6500}, {"Sucre", 800}};
    char cherche[50];
    scanf("%49s", cherche);
    for (int i = 0; i < 3; i++)
    {
        if (strcmp(stock[i].nom, cherche) == 0)
        {
            printf("%s : %i F\\n", stock[i].nom, stock[i].prix);
            return 0;
        }
    }
    printf("Produit inconnu\\n");
    return 0;
}
`,
    inputs: "Huile",
    check: (o, c) => { if (o.trim() !== "Huile : 6500 F") return "Avec Huile tapé au clavier, on attend : Huile : 6500 F"; if (!/struct/.test(c) || !/typedef/.test(c)) return "Crée le type avec typedef struct { … } produit;"; if (!/strcmp/.test(c)) return "Compare les noms avec strcmp."; return true; },
    extra: { inputs: "Sucre", check: (o) => o.trim() === "Sucre : 800 F" || "Avec Sucre, on attend : Sucre : 800 F",
      extra: { inputs: "Mil", check: (o) => o.trim() === "Produit inconnu" || "Avec Mil (absent), on attend : Produit inconnu" } }
  }
},
/* ------------------------------------------------------------------ */
{ id: "c12", title: "Trier : tri par sélection et tri à bulles", minutes: 35, cs50x: 3,
  goal: "Trier un tableau avec le tri par sélection et le tri à bulles, échanger deux cases, et savoir pourquoi le tri fusion est plus rapide.",
  why: `<p>La recherche dichotomique a besoin d'un tableau trié. Les classements, les palmarès, les listes de prix du moins cher au plus cher : trier est partout. Écrire soi-même un tri, c'est le meilleur exercice pour comprendre les boucles imbriquées et le coût d'un algorithme.</p>`,
  sections: [
    { h: "Échanger deux cases",
      html: `<p>Tous les tris échangent des cases. Pour échanger deux valeurs, il faut une variable <strong>temporaire</strong>, comme pour échanger le contenu de deux verres il faut un troisième verre :</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

int main(void)
{
    int t[] = {800, 300};
    int temp = t[0];
    t[0] = t[1];
    t[1] = temp;
    printf("%i %i\\n", t[0], t[1]);
    return 0;
}</code></pre>
<p>Sans <code>temp</code>, écrire <code>t[0] = t[1];</code> écraserait 800 avant qu'on ait pu le mettre ailleurs.</p>` },
    { h: "Le tri par sélection",
      html: `<p>Idée : on cherche le <strong>plus petit</strong> élément et on le met en première position. Puis le plus petit du reste en deuxième position, et ainsi de suite.</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

int main(void)
{
    int t[] = {6500, 250, 17500, 800, 300};
    int n = 5;
    for (int i = 0; i &lt; n - 1; i++)
    {
        int min = i;
        for (int j = i + 1; j &lt; n; j++)
        {
            if (t[j] &lt; t[min])
            {
                min = j;
            }
        }
        int temp = t[i];
        t[i] = t[min];
        t[min] = temp;
    }
    for (int i = 0; i &lt; n; i++)
    {
        printf("%i ", t[i]);
    }
    printf("\\n");
    return 0;
}</code></pre>
<div class="box steps"><b class="tag">Pas à pas</b><ol>
<li>Tour 1 : le plus petit de tout le tableau est 250 → échangé avec la case 0. <code>250 6500 17500 800 300</code></li>
<li>Tour 2 : le plus petit à partir de la case 1 est 300 → échangé avec la case 1. <code>250 300 17500 800 6500</code></li>
<li>Tour 3 : 800 → case 2. <code>250 300 800 17500 6500</code></li>
<li>Tour 4 : 6500 → case 3. <code>250 300 800 6500 17500</code> Trié !</li></ol></div>` },
    { h: "Le tri à bulles",
      html: `<p>Idée : on compare les voisins deux par deux, et on les échange s'ils sont dans le mauvais ordre. À chaque passage, le plus grand « remonte » à la fin, comme une bulle :</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

int main(void)
{
    int t[] = {6500, 250, 17500, 800, 300};
    int n = 5;
    for (int passage = 0; passage &lt; n - 1; passage++)
    {
        for (int j = 0; j &lt; n - 1 - passage; j++)
        {
            if (t[j] &gt; t[j + 1])
            {
                int temp = t[j];
                t[j] = t[j + 1];
                t[j + 1] = temp;
            }
        }
    }
    for (int i = 0; i &lt; n; i++)
    {
        printf("%i ", t[i]);
    }
    printf("\\n");
    return 0;
}</code></pre>` },
    { h: "Combien ça coûte ? Et le tri fusion",
      html: `<p>Les deux tris ont deux boucles imbriquées : pour n éléments, ils font de l'ordre de n × n comparaisons, <strong>O(n²)</strong>. Avec 1000 éléments, environ un million de comparaisons ; avec un million d'éléments, mille milliards : beaucoup trop.</p>
<p>Le <strong>tri fusion</strong> (<em>merge sort</em>) fait beaucoup mieux : on coupe le tableau en deux, on trie chaque moitié (en recommençant la même idée), puis on <strong>fusionne</strong> les deux moitiés triées en une seule. Son temps est <strong>O(n log n)</strong> : pour un million d'éléments, une vingtaine de millions d'étapes au lieu de mille milliards. Il utilise la récursivité, le sujet de la prochaine leçon.</p>
<div class="table-wrap"><table><thead><tr><th>Tri</th><th>Pire cas</th><th>Meilleur cas</th></tr></thead><tbody>
<tr><td>Sélection</td><td>O(n²)</td><td>Ω(n²)</td></tr>
<tr><td>Bulles</td><td>O(n²)</td><td>Ω(n) si on s'arrête quand un passage ne fait aucun échange</td></tr>
<tr><td>Fusion</td><td>O(n log n)</td><td>Ω(n log n)</td></tr>
</tbody></table></div>` }
  ],
  pitfalls: [
    "Échanger sans variable temporaire : une des deux valeurs est perdue.",
    "Dans le tri à bulles, aller jusqu'à <code>j &lt; n</code> : on compare <code>t[j]</code> avec <code>t[n]</code>, qui est en dehors du tableau. Il faut <code>j &lt; n - 1</code>.",
    "Confondre l'indice et la valeur : dans le tri par sélection, <code>min</code> garde la <strong>position</strong> du plus petit, pas sa valeur."
  ],
  remember: ["Échanger deux cases : temp = a ; a = b ; b = temp.", "Tri par sélection : on place le plus petit restant à chaque tour.", "Tri à bulles : on échange les voisins mal rangés ; le plus grand remonte à la fin.", "Sélection et bulles : O(n²). Tri fusion : O(n log n)."],
  quiz: [
    { q: "Après le premier tour d'un tri par sélection sur {9, 4, 1, 7}, que contient le tableau ?", options: ["{1, 4, 7, 9}", "{4, 9, 1, 7}", "{1, 4, 9, 7}", "{1, 9, 4, 7}"], answer: 2, explain: "Le plus petit, 1 (case 2), est échangé avec la case 0 : 9 prend sa place. On obtient {1, 4, 9, 7}. Ce n'est pas encore trié : il reste des tours." },
    { q: "Pourquoi le tri à bulles s'appelle-t-il ainsi ?", options: ["Il est très rapide", "Le plus grand élément remonte à la fin à chaque passage", "Il utilise des pointeurs", "Il trie des chaînes"], answer: 1, explain: "À chaque passage, la plus grande valeur remonte jusqu'à la fin du tableau, comme une bulle à la surface de l'eau." },
    { q: "Quel tri est le plus rapide pour un million d'éléments ?", options: ["Sélection", "Bulles", "Fusion", "Ils se valent"], answer: 2, explain: "Le tri fusion est en O(n log n), les deux autres en O(n²)." }
  ],
  exercise: {
    task: `Trie le tableau <code>prix</code> du moins cher au plus cher avec un <strong>tri par sélection</strong> ou un <strong>tri à bulles</strong> écrit par toi, puis affiche les prix séparés par un espace. On attend <code>100 250 300 800 1200 6500 17500</code>.`,
    hint: `Deux boucles for imbriquées. Tri à bulles : si prix[j] > prix[j + 1], on échange avec une variable temp. Puis une boucle pour afficher avec printf("%i ", prix[i]).`,
    start: `#include <stdio.h>

int main(void)
{
    int prix[] = {6500, 250, 17500, 800, 100, 1200, 300};
    int n = 7;

    // trie le tableau ici

    for (int i = 0; i < n; i++)
    {
        printf("%i ", prix[i]);
    }
    printf("\\n");
    return 0;
}
`,
    sol: `#include <stdio.h>

int main(void)
{
    int prix[] = {6500, 250, 17500, 800, 100, 1200, 300};
    int n = 7;
    for (int passage = 0; passage < n - 1; passage++)
    {
        for (int j = 0; j < n - 1 - passage; j++)
        {
            if (prix[j] > prix[j + 1])
            {
                int temp = prix[j];
                prix[j] = prix[j + 1];
                prix[j + 1] = temp;
            }
        }
    }
    for (int i = 0; i < n; i++)
    {
        printf("%i ", prix[i]);
    }
    printf("\\n");
    return 0;
}
`,
    check: (o, c) => { if (o.trim().replace(/\s+/g, " ") !== "100 250 300 800 1200 6500 17500") return "On attend les prix triés : 100 250 300 800 1200 6500 17500"; if (/qsort/.test(c)) return "Écris ton propre tri (sélection ou bulles), sans qsort."; if (/int\s+prix\s*\[\s*\]\s*=\s*\{\s*100\s*,/.test(c)) return "Ne change pas l'ordre du tableau de départ : c'est ton tri qui doit le ranger."; if ((c.match(/\bfor\b|\bwhile\b/g) || []).length < 3) return "Un tri par sélection ou à bulles utilise deux boucles imbriquées (en plus de celle de l'affichage)."; return true; }
  }
},
/* ------------------------------------------------------------------ */
{ id: "c13", title: "La récursivité : une fonction qui s'appelle elle-même", minutes: 30, cs50x: 3,
  goal: "Écrire une fonction récursive avec un cas de base, suivre ses appels pas à pas, et comprendre l'idée du tri fusion.",
  why: `<p>Certains problèmes se décrivent naturellement à partir d'une version plus petite d'eux-mêmes : une pyramide de 4 étages, c'est une pyramide de 3 étages plus une rangée. La <strong>récursivité</strong> permet d'écrire ces idées presque mot pour mot. C'est aussi le principe des algorithmes les plus rapides, comme le tri fusion.</p>`,
  sections: [
    { h: "Une fonction qui s'appelle elle-même",
      html: `<p>Un compte à rebours, écrit sans boucle :</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

void rebours(int n)
{
    if (n == 0)
    {
        printf("Partez !\\n");
        return;
    }
    printf("%i\\n", n);
    rebours(n - 1);
}

int main(void)
{
    rebours(3);
    return 0;
}</code></pre>
<p>Toute fonction récursive a deux parties :</p>
<ul><li>le <strong>cas de base</strong> : un cas si simple qu'on répond tout de suite, sans s'appeler (ici <code>n == 0</code>) ;</li>
<li>le <strong>cas récursif</strong> : on fait une petite partie du travail, et on confie le reste à la fonction elle-même, avec un problème <strong>plus petit</strong> (<code>n - 1</code>).</li></ul>` },
    { h: "La factorielle, pas à pas",
      html: `<p>La factorielle de 4 (notée 4!) vaut 4 × 3 × 2 × 1 = 24. Autrement dit : 4! = 4 × 3!, et 1! = 1.</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

int factorielle(int n)
{
    if (n &lt;= 1)
    {
        return 1;
    }
    return n * factorielle(n - 1);
}

int main(void)
{
    printf("%i\\n", factorielle(4));
    return 0;
}</code></pre>
<div class="trace"><table><thead><tr><th>Appel</th><th>Calcule</th><th>Renvoie</th></tr></thead><tbody>
<tr><td>factorielle(4)</td><td>4 × factorielle(3)</td><td>4 × 6 = 24</td></tr>
<tr><td>factorielle(3)</td><td>3 × factorielle(2)</td><td>3 × 2 = 6</td></tr>
<tr><td>factorielle(2)</td><td>2 × factorielle(1)</td><td>2 × 1 = 2</td></tr>
<tr><td>factorielle(1)</td><td>cas de base</td><td>1</td></tr>
</tbody></table></div>
<p>Les appels s'empilent de haut en bas, puis les résultats remontent de bas en haut. Cette pile d'appels s'appelle la <strong>pile</strong> (<em>call stack</em>).</p>` },
    { h: "La pyramide de CS50, en récursif",
      html: `<p>Une pyramide de hauteur n, c'est une pyramide de hauteur n − 1, puis une rangée de n blocs :</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

void pyramide(int n)
{
    if (n &lt;= 0)
    {
        return;
    }
    pyramide(n - 1);
    for (int i = 0; i &lt; n; i++)
    {
        printf("#");
    }
    printf("\\n");
}

int main(void)
{
    pyramide(4);
    return 0;
}</code></pre>
<p>Compare avec l'exercice de la leçon 5 : même résultat, mais le code décrit directement l'idée.</p>` },
    { h: "Le tri fusion, en une idée",
      html: `<p>Le tri fusion de la leçon 12 est récursif :</p>
<ol><li>S'il n'y a qu'un élément : c'est trié (cas de base).</li>
<li>Sinon : trier la moitié gauche (appel récursif), trier la moitié droite (appel récursif), puis fusionner les deux moitiés triées.</li></ol>
<p>Fusionner deux listes déjà triées est facile : on compare leurs premiers éléments, on prend le plus petit, et on recommence. C'est comme fusionner deux files d'élèves rangés par taille.</p>
<div class="box why"><b class="tag">À retenir</b><p>Sans cas de base, ou si le problème ne rapetisse pas, la fonction s'appelle à l'infini. La pile d'appels finit par déborder et le programme plante : c'est le célèbre <em>stack overflow</em>.</p></div>` }
  ],
  pitfalls: [
    "Oublier le cas de base : la fonction s'appelle sans fin, jusqu'au plantage.",
    "Appeler avec un problème qui ne rapetisse pas : <code>f(n)</code> qui appelle <code>f(n)</code> tourne à l'infini.",
    "Oublier le <code>return</code> devant l'appel récursif quand la fonction doit renvoyer une valeur : <code>n * factorielle(n - 1)</code> doit être renvoyé."
  ],
  remember: ["Une fonction récursive s'appelle elle-même avec un problème plus petit.", "Il faut toujours un cas de base qui répond sans s'appeler.", "Les appels s'empilent (la pile), puis les résultats remontent.", "Le tri fusion est récursif : on trie chaque moitié, puis on fusionne."],
  quiz: [
    { q: "Que se passe-t-il si une fonction récursive n'a pas de cas de base ?", options: ["Elle renvoie 0", "Elle s'appelle sans fin et le programme plante", "Le compilateur l'ajoute", "Elle s'arrête après 10 appels"], answer: 1, explain: "Sans cas de base, les appels s'empilent jusqu'à épuiser la pile : stack overflow." },
    { q: "int f(int n) { if (n == 0) return 0; return n + f(n - 1); } Que vaut f(3) ?", options: ["3", "6", "0", "9"], answer: 1, explain: "f(3) = 3 + f(2) = 3 + 2 + f(1) = 3 + 2 + 1 + f(0) = 6." },
    { q: "Dans le tri fusion, quel est le cas de base ?", options: ["Un tableau d'un seul élément", "Un tableau vide de 10 cases", "Un tableau déjà trié à moitié", "Il n'y en a pas"], answer: 0, explain: "Un tableau d'un seul élément est forcément trié." }
  ],
  exercise: {
    task: `Écris une fonction <strong>récursive</strong> <code>int somme(int n)</code> qui renvoie 1 + 2 + … + n (et 0 pour n = 0), <strong>sans boucle</strong>. Le <code>main</code> affiche <code>somme(10)</code> puis <code>somme(100)</code> : on attend <code>55</code> puis <code>5050</code>.`,
    hint: `Cas de base : si n == 0, return 0. Cas récursif : return n + somme(n - 1);`,
    start: `#include <stdio.h>

int somme(int n)
{
    // cas de base, puis appel récursif
    return 0;
}

int main(void)
{
    printf("%i\\n", somme(10));
    printf("%i\\n", somme(100));
    return 0;
}
`,
    sol: `#include <stdio.h>

int somme(int n)
{
    if (n == 0)
    {
        return 0;
    }
    return n + somme(n - 1);
}

int main(void)
{
    printf("%i\\n", somme(10));
    printf("%i\\n", somme(100));
    return 0;
}
`,
    check: (o, c) => { const l = o.trim().split("\n").map(s => s.trim()); if (l[0] !== "55" || l[1] !== "5050") return "On attend 55 puis 5050."; const f = c.slice(c.search(/int\s+somme\s*\(/), c.search(/int\s+main/)); if (/\bfor\b|\bwhile\b/.test(f)) return "Pas de boucle : ta fonction doit être récursive (elle s'appelle elle-même)."; if (!/somme\s*\(\s*n\s*-\s*1\s*\)/.test(f)) return "Ta fonction doit s'appeler elle-même avec un problème plus petit : somme(n - 1)."; return true; }
  }
}
  ]
});
