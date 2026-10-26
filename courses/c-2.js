/* Cours C — Partie 2 : tableaux et chaînes (repère CS50x, semaine 2 « Arrays ») */
(window.C_PARTS = window.C_PARTS || []).push({
  title: "Tableaux et chaînes",
  lessons: [
/* ------------------------------------------------------------------ */
{ id: "c07", title: "Les tableaux : plusieurs valeurs côte à côte", minutes: 30, cs50x: 2,
  goal: "Ranger plusieurs valeurs du même type dans un tableau, le parcourir avec une boucle, et le passer à une fonction.",
  why: `<p>Pour les ventes des 7 jours de la semaine, il faudrait 7 variables : <code>lundi</code>, <code>mardi</code>… Pour les notes de 500 élèves, 500 variables. Un <strong>tableau</strong> range toutes ces valeurs sous un seul nom, côte à côte dans la mémoire, et une boucle les traite toutes en quelques lignes.</p>`,
  sections: [
    { h: "Déclarer et remplir un tableau",
      html: `<pre class="cx"><code>#include &lt;stdio.h&gt;

int main(void)
{
    int notes[3];
    notes[0] = 12;
    notes[1] = 15;
    notes[2] = 9;
    printf("Première note : %i\\n", notes[0]);
    printf("Dernière note : %i\\n", notes[2]);
    return 0;
}</code></pre>
<ul><li><code>int notes[3]</code> : un tableau de 3 entiers. Sa taille est fixée une fois pour toutes.</li>
<li>Les cases sont numérotées à partir de <strong>0</strong> : <code>notes[0]</code>, <code>notes[1]</code>, <code>notes[2]</code>. Ce numéro s'appelle l'<strong>indice</strong>.</li></ul>
<div class="trace"><table><thead><tr><th>Indice</th><th>0</th><th>1</th><th>2</th></tr></thead><tbody>
<tr><td>Valeur</td><td>12</td><td>15</td><td>9</td></tr>
</tbody></table></div>
<p>On peut aussi tout donner d'un coup : <code>int notes[] = {12, 15, 9};</code> (le compilateur compte lui-même la taille).</p>` },
    { h: "Parcourir un tableau avec une boucle",
      html: `<p>La boucle <code>for</code> et le tableau vont ensemble : l'indice <code>i</code> passe de 0 à la taille moins 1.</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

const int N = 5;

int main(void)
{
    int notes[] = {12, 15, 9, 18, 11};
    int somme = 0;
    for (int i = 0; i &lt; N; i++)
    {
        somme += notes[i];
    }
    printf("Moyenne : %.2f\\n", somme / (float) N);
    return 0;
}</code></pre>
<p><code>const</code> rend la variable <code>N</code> constante : impossible de la modifier par erreur. On l'écrit en majuscules, par habitude, et on l'utilise partout où la taille sert. Si la classe passe à 6 notes, on ne change qu'une ligne.</p>` },
    { h: "Passer un tableau à une fonction",
      html: `<p>Une fonction peut recevoir un tableau. Comme le C ne sait pas tout seul combien de cases il contient, on donne aussi la <strong>taille</strong> :</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

int maximum(int t[], int n)
{
    int max = t[0];
    for (int i = 1; i &lt; n; i++)
    {
        if (t[i] &gt; max)
        {
            max = t[i];
        }
    }
    return max;
}

int main(void)
{
    int ventes[] = {15000, 22500, 8000, 31000, 12000};
    printf("Meilleure vente : %i F\\n", maximum(ventes, 5));
    return 0;
}</code></pre>
<div class="box steps"><b class="tag">Pas à pas : maximum</b><ol>
<li>On suppose que le maximum est la première case : 15000.</li>
<li>On compare avec chaque case suivante : 22500 est plus grand, il devient le maximum.</li>
<li>8000 non ; 31000 oui ; 12000 non.</li>
<li>On renvoie 31000.</li></ol></div>` },
    { h: "Le C ne vérifie pas les limites",
      html: `<p>Un tableau de 3 cases a les indices 0, 1 et 2. Que se passe-t-il avec <code>notes[5]</code> ?</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

int main(void)
{
    int notes[3] = {12, 15, 9};
    printf("%i\\n", notes[5]);
    return 0;
}</code></pre>
<p>Pas d'erreur ! Le C lit simplement ce qui se trouve en mémoire après le tableau : une valeur au hasard, qu'on appelle une <strong>valeur poubelle</strong>. En écriture, c'est pire : on peut abîmer d'autres variables. C'est la cause de nombreux bugs et de failles célèbres. En C, <strong>c'est à toi</strong> de rester dans les limites.</p>` }
  ],
  pitfalls: [
    "Commencer à 1 au lieu de 0 : la première case est <code>t[0]</code>, la dernière <code>t[n - 1]</code>.",
    "Écrire <code>i &lt;= n</code> dans la boucle : on lit une case de trop, en dehors du tableau.",
    "Oublier de donner la taille à une fonction qui reçoit un tableau : elle ne peut pas la deviner.",
    "Additionner sans initialiser : <code>int somme;</code> contient une valeur poubelle. Écris <code>int somme = 0;</code>."
  ],
  remember: ["int t[5] : 5 cases, numérotées de 0 à 4.", "for (int i = 0; i < n; i++) parcourt un tableau de n cases.", "Une fonction reçoit le tableau et sa taille : f(int t[], int n).", "Le C ne vérifie pas les limites : sortir du tableau donne des valeurs poubelle."],
  quiz: [
    { q: "int t[] = {4, 8, 15, 16}; Que vaut t[2] ?", options: ["8", "15", "16", "4"], answer: 1, explain: "Indices 0, 1, 2, 3 : t[2] est la troisième case, 15." },
    { q: "Combien de tours fait for (int i = 0; i < 10; i++) pour un tableau de 10 cases ?", options: ["9", "10", "11"], answer: 1, explain: "i va de 0 à 9 : 10 tours, une par case." },
    { q: "Que se passe-t-il si on lit t[10] dans un tableau de 3 cases ?", options: ["Erreur de compilation", "Le programme affiche une valeur au hasard", "Le tableau s'agrandit", "On obtient 0"], answer: 1, explain: "Le C ne vérifie pas : il lit la mémoire qui suit, une valeur poubelle." }
  ],
  exercise: {
    task: `Voici les ventes d'une boutique pendant 7 jours : <code>int ventes[] = {15000, 22500, 8000, 31000, 12000, 27500, 9000};</code>. Avec une boucle, calcule et affiche exactement :<br><code>Total : 125000 F</code><br><code>Meilleur jour : 4</code> (le numéro du jour, en comptant à partir de 1).`,
    hint: `Une boucle for de 0 à 6 : ajoute ventes[i] au total, et retiens l'indice du plus grand. Le numéro du jour est l'indice + 1.`,
    start: `#include <stdio.h>

int main(void)
{
    int ventes[] = {15000, 22500, 8000, 31000, 12000, 27500, 9000};

    return 0;
}
`,
    sol: `#include <stdio.h>

int main(void)
{
    int ventes[] = {15000, 22500, 8000, 31000, 12000, 27500, 9000};
    int total = 0;
    int meilleur = 0;
    for (int i = 0; i < 7; i++)
    {
        total += ventes[i];
        if (ventes[i] > ventes[meilleur])
        {
            meilleur = i;
        }
    }
    printf("Total : %i F\\n", total);
    printf("Meilleur jour : %i\\n", meilleur + 1);
    return 0;
}
`,
    check: (o, c) => { const l = o.trim().split("\n").map(s => s.trim()); if (l[0] !== "Total : 125000 F") return "Première ligne attendue : Total : 125000 F"; if (l[1] !== "Meilleur jour : 4") return "Deuxième ligne attendue : Meilleur jour : 4 (le jour 4, indice 3, avec 31000 F)."; if (!/\bfor\b|\bwhile\b/.test(c)) return "Utilise une boucle pour parcourir le tableau."; if (/125000/.test(c)) return "Ne recopie pas le total : laisse la boucle le calculer."; return true; }
  }
},
/* ------------------------------------------------------------------ */
{ id: "c08", title: "Les chaînes de caractères", minutes: 30, cs50x: 2,
  goal: "Comprendre qu'un texte est un tableau de caractères terminé par '\\0', le parcourir, mesurer sa longueur, le transformer et le comparer.",
  why: `<p>Un nom, un message, une adresse : les programmes manipulent du texte en permanence. En C, il n'y a pas de type « texte » tout fait : un texte est un <strong>tableau de caractères</strong>. Comprendre comment il est rangé en mémoire t'évitera les bugs les plus courants du C.</p>`,
  sections: [
    { h: "Un texte, c'est un tableau de char",
      html: `<p>Le texte <code>"Awa"</code> occupe <strong>4</strong> cases : une par lettre, plus une case spéciale, <code>'\\0'</code> (le caractère nul), qui marque la fin.</p>
<div class="trace"><table><thead><tr><th>Indice</th><th>0</th><th>1</th><th>2</th><th>3</th></tr></thead><tbody>
<tr><td>Caractère</td><td>'A'</td><td>'w'</td><td>'a'</td><td>'\\0'</td></tr>
</tbody></table></div>
<pre class="cx"><code>#include &lt;stdio.h&gt;

int main(void)
{
    char nom[] = "Awa";
    printf("%s\\n", nom);
    printf("%c %c\\n", nom[0], nom[2]);
    return 0;
}</code></pre>
<p>Chaque caractère est en réalité un petit <strong>nombre</strong> (son code ASCII) : <code>'A'</code> vaut 65, <code>'B'</code> 66, <code>'a'</code> 97. C'est pour ça qu'on peut écrire <code>'A' + 1</code>, qui donne <code>'B'</code>.</p>` },
    { h: "Longueur et parcours",
      html: `<p><code>strlen</code> (de <code>&lt;string.h&gt;</code>) compte les caractères jusqu'au <code>'\\0'</code>, sans le compter. On parcourt ensuite le texte comme n'importe quel tableau :</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main(void)
{
    char ville[] = "Ouagadougou";
    int n = strlen(ville);
    printf("%s a %i lettres\\n", ville, n);
    int nb_o = 0;
    for (int i = 0; i &lt; n; i++)
    {
        if (ville[i] == 'o' || ville[i] == 'O')
        {
            nb_o++;
        }
    }
    printf("Nombre de o : %i\\n", nb_o);
    return 0;
}</code></pre>` },
    { h: "Transformer : ctype.h",
      html: `<p><code>&lt;ctype.h&gt;</code> contient des outils pour un caractère : <code>toupper</code> (en majuscule), <code>tolower</code> (en minuscule), <code>isdigit</code> (est-ce un chiffre ?), <code>isalpha</code> (est-ce une lettre ?).</p>
<pre class="cx"><code>#include &lt;ctype.h&gt;
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main(void)
{
    char code[] = "bf226x";
    for (int i = 0, n = strlen(code); i &lt; n; i++)
    {
        code[i] = toupper(code[i]);
    }
    printf("%s\\n", code);
    printf("%i\\n", isdigit('7') != 0);
    return 0;
}</code></pre>
<p>Remarque : <code>int i = 0, n = strlen(code)</code> calcule la longueur une seule fois, au début de la boucle, au lieu de la recalculer à chaque tour.</p>` },
    { h: "Comparer et copier : string.h",
      html: `<p>Piège majeur : on ne compare pas deux textes avec <code>==</code> (on comparerait leurs adresses en mémoire, leçon 14). On utilise <code>strcmp</code>, qui renvoie <strong>0 si les textes sont identiques</strong> :</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main(void)
{
    char reponse[] = "Kaya";
    if (strcmp(reponse, "Kaya") == 0)
    {
        printf("Bonne réponse !\\n");
    }
    char copie[20];
    strcpy(copie, reponse);
    strcat(copie, " et Koudougou");
    printf("%s\\n", copie);
    return 0;
}</code></pre>
<ul><li><code>strcpy(dest, source)</code> copie un texte dans un autre tableau, qui doit être assez grand.</li>
<li><code>strcat(dest, source)</code> ajoute un texte à la fin d'un autre.</li></ul>
<div class="box why"><b class="tag">À retenir</b><p>Avec <code>strcpy</code> et <code>strcat</code>, le tableau de destination doit avoir de la place pour toutes les lettres <strong>et</strong> le <code>'\\0'</code>. Sinon, on écrit en dehors du tableau.</p></div>` }
  ],
  pitfalls: [
    "Comparer deux textes avec <code>==</code> : utilise <code>strcmp(a, b) == 0</code>.",
    "Oublier la case du <code>'\\0'</code> : <code>char ville[4] = \"Kaya\";</code> n'a pas de place pour la fin du texte. Il faut 5 cases.",
    "Confondre <code>'A'</code> (un caractère, entre apostrophes) et <code>\"A\"</code> (un texte de 2 cases, entre guillemets).",
    "Oublier <code>#include &lt;string.h&gt;</code> pour <code>strlen</code>, ou <code>&lt;ctype.h&gt;</code> pour <code>toupper</code>."
  ],
  remember: ["Un texte est un tableau de char qui finit par '\\0'.", "strlen donne la longueur, sans compter le '\\0'.", "toupper, tolower, isdigit, isalpha travaillent sur un caractère (ctype.h).", "strcmp(a, b) == 0 veut dire « textes identiques » ; jamais ==."],
  quiz: [
    { q: "Combien de cases occupe le texte \"Bobo\" en mémoire ?", options: ["4", "5", "3", "8"], answer: 1, explain: "4 lettres + le '\\0' de fin = 5 cases." },
    { q: "Que renvoie strcmp(\"Awa\", \"Awa\") ?", options: ["1", "0", "true", "3"], answer: 1, explain: "strcmp renvoie 0 quand les deux textes sont identiques." },
    { q: "Que vaut 'A' + 2 ?", options: ["'C'", "'A2'", "Une erreur", "2"], answer: 0, explain: "Un caractère est un nombre : 'A' vaut 65, 65 + 2 = 67, c'est 'C'." }
  ],
  exercise: {
    task: `Écris un programme qui lit un prénom (un seul mot) et l'affiche <strong>en majuscules</strong>, suivi de son nombre de lettres. Avec <code>awa</code>, on attend exactement <code>AWA (3 lettres)</code>.`,
    hint: `char prenom[50]; scanf("%49s", prenom); puis une boucle for sur strlen(prenom) avec prenom[i] = toupper(prenom[i]); et enfin printf("%s (%i lettres)\\n", …). N'oublie pas string.h et ctype.h.`,
    start: `#include <ctype.h>
#include <stdio.h>
#include <string.h>

int main(void)
{
    char prenom[50];
    scanf("%49s", prenom);

    return 0;
}
`,
    sol: `#include <ctype.h>
#include <stdio.h>
#include <string.h>

int main(void)
{
    char prenom[50];
    scanf("%49s", prenom);
    int n = strlen(prenom);
    for (int i = 0; i < n; i++)
    {
        prenom[i] = toupper(prenom[i]);
    }
    printf("%s (%i lettres)\\n", prenom, n);
    return 0;
}
`,
    inputs: "awa",
    check: (o, c) => { if (o.trim().split("\n").pop().trim() !== "AWA (3 lettres)") return "Avec awa, on attend : AWA (3 lettres)"; if (!/toupper/.test(c)) return "Utilise toupper pour passer chaque lettre en majuscule."; return true; },
    extra: { inputs: "Moussa", check: (o) => o.trim().split("\n").pop().trim() === "MOUSSA (6 lettres)" || "Avec Moussa, on attend : MOUSSA (6 lettres). Ton programme doit marcher pour n'importe quel prénom." }
  }
},
/* ------------------------------------------------------------------ */
{ id: "c09", title: "Arguments du programme et code de sortie", minutes: 25, cs50x: 2,
  goal: "Recevoir des informations au lancement du programme avec argc et argv, et signaler une erreur avec le code de sortie.",
  why: `<p>Beaucoup de programmes ne posent pas de question : on leur donne les informations au moment de les lancer, comme <code>copier photo.jpg sauvegarde.jpg</code>. C'est ainsi que fonctionnent les outils des informaticiens, et c'est ce qui permet de les enchaîner automatiquement. Et chaque programme dit, en se terminant, s'il a réussi ou échoué.</p>`,
  sections: [
    { h: "argc et argv",
      html: `<p>Au lieu de <code>int main(void)</code>, on écrit :</p>
<pre class="cx" data-args="Awa Ouagadougou"><code>#include &lt;stdio.h&gt;

int main(int argc, char *argv[])
{
    printf("Nombre de mots : %i\\n", argc);
    for (int i = 0; i &lt; argc; i++)
    {
        printf("argv[%i] = %s\\n", i, argv[i]);
    }
    return 0;
}</code></pre>
<ul><li><code>argc</code> (<em>argument count</em>) : le nombre de mots sur la ligne de commande, <strong>nom du programme compris</strong>.</li>
<li><code>argv</code> (<em>argument vector</em>) : un tableau de textes. <code>argv[0]</code> est le nom du programme, <code>argv[1]</code> le premier argument, etc.</li></ul>
<div class="box plain"><b class="tag">En clair</b><p>Dans l'atelier, la case <strong>« Arguments »</strong> joue le rôle de la ligne de commande : ce que tu y tapes est donné au programme quand il démarre. Ici, l'exemple a été lancé comme <code>programme Awa Ouagadougou</code>.</p></div>` },
    { h: "Utiliser un nombre passé en argument",
      html: `<p>Les arguments arrivent toujours sous forme de <strong>texte</strong>. Pour faire un calcul, on les convertit avec <code>atoi</code> (« ASCII to integer », dans <code>&lt;stdlib.h&gt;</code>) :</p>
<pre class="cx" data-args="3500 4"><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main(int argc, char *argv[])
{
    int prix = atoi(argv[1]);
    int quantite = atoi(argv[2]);
    printf("Total : %i F\\n", prix * quantite);
    return 0;
}</code></pre>` },
    { h: "Le code de sortie",
      html: `<p>Le nombre renvoyé par <code>main</code> est le <strong>code de sortie</strong> : 0 veut dire « réussi », tout autre nombre veut dire « erreur ». Un programme bien écrit vérifie ses arguments et s'arrête proprement s'il en manque :</p>
<pre class="cx"><code>#include &lt;stdio.h&gt;

int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        printf("Usage : saluer NOM\\n");
        return 1;
    }
    printf("Bonjour, %s !\\n", argv[1]);
    return 0;
}</code></pre>
<p>Ici, on l'a lancé sans argument : il affiche comment l'utiliser et se termine avec le code 1. L'atelier affiche toujours le code de sortie à la fin de l'exécution.</p>
<div class="box why"><b class="tag">À retenir</b><p>Vérifie toujours <code>argc</code> <strong>avant</strong> de lire <code>argv[1]</code>. Lire un argument qui n'existe pas, c'est sortir d'un tableau : le programme peut planter.</p></div>` }
  ],
  pitfalls: [
    "Oublier que <code>argv[0]</code> est le nom du programme : le premier vrai argument est <code>argv[1]</code>, et <code>argc</code> vaut 2 quand il y en a un.",
    "Lire <code>argv[1]</code> sans vérifier <code>argc</code> : s'il manque, le programme lit en dehors du tableau.",
    "Faire un calcul directement avec <code>argv[1]</code> : c'est un texte. Convertis-le avec <code>atoi</code>."
  ],
  remember: ["int main(int argc, char *argv[]) reçoit les arguments.", "argc compte les mots, nom du programme compris ; argv[0] est ce nom.", "atoi convertit un texte en entier (stdlib.h).", "return 0 = réussite, return 1 (ou autre) = erreur."],
  quiz: [
    { q: "On lance : programme Awa Kaya. Que vaut argc ?", options: ["2", "3", "1", "0"], answer: 1, explain: "Trois mots : programme, Awa, Kaya. argc compte aussi le nom du programme." },
    { q: "Dans le même cas, que contient argv[1] ?", options: ["programme", "Awa", "Kaya", "rien"], answer: 1, explain: "argv[0] est le nom du programme, argv[1] le premier argument." },
    { q: "Quel code de sortie signale une erreur ?", options: ["0", "1", "Aucun", "-0"], answer: 1, explain: "0 veut dire réussite ; tout autre nombre (souvent 1) signale une erreur." }
  ],
  exercise: {
    task: `Écris le programme <code>saluer</code> : s'il reçoit <strong>exactement un</strong> argument (un nom), il affiche <code>Bonjour, NOM !</code> et se termine avec le code <code>0</code>. Sinon, il affiche <code>Usage : saluer NOM</code> et se termine avec le code <code>1</code>. La correction le lance avec <code>Awa</code>, puis sans argument.`,
    hint: `int main(int argc, char *argv[]) ; si argc != 2 : printf de l'usage, puis return 1. Sinon printf("Bonjour, %s !\\n", argv[1]); return 0;`,
    start: `#include <stdio.h>

int main(int argc, char *argv[])
{

    return 0;
}
`,
    sol: `#include <stdio.h>

int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        printf("Usage : saluer NOM\\n");
        return 1;
    }
    printf("Bonjour, %s !\\n", argv[1]);
    return 0;
}
`,
    args: ["Awa"],
    check: (o, c, x) => { if (o.trim() !== "Bonjour, Awa !") return "Lancé avec Awa, le programme doit afficher : Bonjour, Awa !"; if (x !== 0) return "Lancé avec un nom, le programme doit se terminer avec le code 0 (return 0)."; return true; },
    extra: { args: [], check: (o, c, x) => { if (o.trim() !== "Usage : saluer NOM") return "Lancé sans argument, le programme doit afficher : Usage : saluer NOM"; if (x !== 1) return "Lancé sans argument, le programme doit se terminer avec le code 1 (return 1)."; return true; },
      extra: { args: ["Awa", "Moussa"], check: (o, c, x) => x === 1 || "Lancé avec deux noms, le programme doit aussi afficher l'usage et se terminer avec le code 1 : il faut exactement un argument." } }
  }
}
  ]
});
