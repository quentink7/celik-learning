/* Cours SQL — Partie 1 : interroger une base (repère CS50 SQL, semaine 0 « Querying ») */
(window.SQL_PARTS = window.SQL_PARTS || []).push({
  title: "Interroger une base",
  lessons: [
/* ------------------------------------------------------------------ */
{ id: "s01", title: "Une base de données, c'est quoi ? Ton premier SELECT", minutes: 20, cs50: 0,
  goal: "Comprendre ce qu'est une base de données et une table, puis afficher des données avec SELECT … FROM.",
  why: `<p>Une boutique, une école, une banque, Orange Money, Facebook : tous rangent leurs informations dans des <strong>bases de données</strong>. Savoir les interroger, c'est pouvoir répondre seul à des questions comme « quel produit se vend le mieux ? » ou « quels clients n'ont rien acheté depuis 3 mois ? ». Le langage pour poser ces questions s'appelle <strong>SQL</strong>, et il est demandé dans presque tous les métiers du numérique.</p>`,
  sections: [
    { h: "Du cahier de la boutique à la base de données",
      html: `<p>Imagine la boutique <strong>Nong-Taaba</strong>, à Ouagadougou. Au début, la gérante note tout dans un cahier : les clients, les produits, les ventes du jour. Au bout d'un an, le cahier fait 200 pages. Pour savoir combien de sacs de riz elle a vendus en juin, il faut tout relire à la main.</p>
<p>Une <strong>base de données</strong>, c'est ce cahier, mais rangé par l'ordinateur pour qu'on puisse le questionner en une seconde. Les informations y sont rangées dans des <strong>tables</strong>, comme des tableaux :</p>
<div class="trace"><table><thead><tr><th>id</th><th>nom</th><th>categorie</th><th>prix</th><th>stock</th></tr></thead><tbody>
<tr><td>1</td><td>Sac de riz 25 kg</td><td>Alimentation</td><td>17500</td><td>12</td></tr>
<tr><td>2</td><td>Bidon d'huile 5 L</td><td>Alimentation</td><td>6500</td><td>20</td></tr>
<tr><td>3</td><td>Sucre en morceaux 1 kg</td><td>Alimentation</td><td>800</td><td>45</td></tr>
</tbody></table></div>
<ul><li>Chaque <strong>ligne</strong> est un élément : ici, un produit.</li>
<li>Chaque <strong>colonne</strong> est une information sur cet élément : son nom, son prix (en francs CFA), son stock…</li>
<li>La colonne <code>id</code> donne à chaque ligne un numéro unique, pour la retrouver sans hésitation.</li></ul>
<div class="box plain"><b class="tag">En clair</b><p>Notre boutique a trois tables : <code>clients</code> (30 clients), <code>produits</code> (25 produits) et <code>ventes</code> (160 ventes de janvier à septembre 2026). Tu les retrouves toujours dans l'encadré « Les tables de la base », à côté de l'éditeur. Les données sont inventées pour le cours.</p></div>` },
    { h: "SQL : la langue pour parler à la base",
      html: `<p><strong>SQL</strong> (on dit « ess-ku-elle » ou « sequel ») veut dire <em>Structured Query Language</em> : langage de requêtes structurées. Une <strong>requête</strong>, c'est une question posée à la base. La base répond par un tableau de résultats.</p>
<p>Le logiciel qui garde la base et répond aux requêtes s'appelle un <strong>SGBD</strong> (système de gestion de base de données). Ici, on utilise <strong>SQLite</strong> : il tourne directement dans ta page, rien à installer. Il est dans tous les téléphones Android et iPhone. Les autres SGBD connus (MySQL, PostgreSQL) parlent presque le même SQL : ce que tu apprends ici te servira partout.</p>` },
    { h: "Ton premier SELECT",
      html: `<p>Pour lire des données, on écrit <code>SELECT</code> (« sélectionne »), puis ce qu'on veut voir, puis <code>FROM</code> (« depuis ») et le nom de la table. L'étoile <code>*</code> veut dire « toutes les colonnes » :</p>
<pre class="sqlx"><code>SELECT * FROM produits;</code></pre>
<p>Décortiquons :</p>
<ul><li><code>SELECT</code> : je veux lire des données.</li>
<li><code>*</code> : toutes les colonnes.</li>
<li><code>FROM produits</code> : dans la table <code>produits</code>.</li>
<li><code>;</code> : le point-virgule marque la fin de l'instruction, comme le point à la fin d'une phrase.</li></ul>
<p>Le résultat s'affiche sous l'exemple : SQLite l'a vraiment calculé dans ta page. Tu peux cliquer sur « Essayer dans l'éditeur » pour le relancer toi-même et le modifier.</p>` },
    { h: "Choisir ses colonnes",
      html: `<p>Souvent, on n'a pas besoin de tout. On écrit alors les noms des colonnes voulues, <strong>séparés par des virgules</strong>, dans l'ordre où on veut les voir :</p>
<pre class="sqlx"><code>SELECT nom, prix FROM produits;</code></pre>
<p>Même table, mais seulement deux colonnes. Et on peut les mettre dans l'ordre qu'on veut :</p>
<pre class="sqlx"><code>SELECT prix, nom FROM produits;</code></pre>
<div class="box steps"><b class="tag">Pas à pas : ce que fait SQLite</b><ol>
<li>Il lit <code>FROM produits</code> : il ouvre la table des produits.</li>
<li>Il parcourt les 25 lignes, une par une.</li>
<li>Pour chaque ligne, il garde seulement les colonnes écrites après <code>SELECT</code>.</li>
<li>Il t'affiche le tableau obtenu.</li></ol></div>
<div class="box why"><b class="tag">À retenir</b><p>Les mots-clés SQL s'écrivent souvent en MAJUSCULES (<code>SELECT</code>, <code>FROM</code>) pour les repérer d'un coup d'œil. SQLite accepte aussi <code>select</code>, mais l'habitude des majuscules rend le code plus lisible. Les noms de tables et de colonnes, eux, s'écrivent comme ils ont été créés.</p></div>` }
  ],
  pitfalls: [
    "Oublier la virgule entre deux colonnes : <code>SELECT nom prix FROM produits</code> ne donne pas deux colonnes. SQLite croit que <code>prix</code> est un nouveau nom donné à la colonne <code>nom</code>.",
    "Mal écrire un nom : <code>SELECT * FROM produit</code> (sans s) provoque l'erreur <code>no such table</code>. Vérifie toujours la liste des tables.",
    "Mettre une virgule en trop avant <code>FROM</code> : <code>SELECT nom, prix, FROM produits</code> provoque une erreur de syntaxe."
  ],
  remember: ["Une base de données range les informations dans des tables : lignes = éléments, colonnes = informations.", "SELECT colonnes FROM table; lit des données.", "* veut dire « toutes les colonnes ».", "Les colonnes sont séparées par des virgules, et l'instruction finit par un point-virgule."],
  quiz: [
    { q: "Dans la table produits, que représente une ligne ?", options: ["Une information, comme le prix", "Un produit", "Toute la boutique", "Une requête"], answer: 1, explain: "Chaque ligne est un élément de la table : ici un produit. Les colonnes sont les informations sur ce produit." },
    { q: "Que fait SELECT * FROM clients; ?", options: ["Supprime tous les clients", "Affiche toutes les colonnes de tous les clients", "Compte les clients", "Affiche seulement la colonne id"], answer: 1, explain: "SELECT lit des données. L'étoile veut dire toutes les colonnes, et sans filtre on obtient toutes les lignes." },
    { q: "Quelle requête affiche seulement le nom et le stock des produits ?", options: ["SELECT nom stock FROM produits;", "SELECT produits FROM nom, stock;", "SELECT nom, stock FROM produits;", "FROM produits SELECT nom, stock;"], answer: 2, explain: "On écrit SELECT, les colonnes séparées par des virgules, puis FROM et la table, dans cet ordre." }
  ],
  exercise: {
    task: `Affiche le <strong>prénom</strong>, le <strong>nom</strong> et la <strong>ville</strong> de tous les clients, dans cet ordre de colonnes.`,
    hint: `SELECT, puis les trois colonnes séparées par des virgules (regarde leurs noms exacts dans « Les tables de la base »), puis FROM clients.`,
    start: `-- Écris ta requête ici\n`,
    sol: `SELECT prenom, nom, ville FROM clients;`,
    names: true
  }
},
/* ------------------------------------------------------------------ */
{ id: "s02", title: "Filtrer les lignes : WHERE et LIMIT", minutes: 25, cs50: 0,
  goal: "Ne garder que les lignes qui t'intéressent avec WHERE, combiner des conditions avec AND, OR et NOT, et limiter le nombre de lignes avec LIMIT.",
  why: `<p>Une vraie base contient des milliers, voire des millions de lignes. On ne veut presque jamais tout voir : on veut les clients de Bobo-Dioulasso, les produits à moins de 1000 F, les ventes payées par Orange Money. <code>WHERE</code> est l'outil que tu utiliseras le plus souvent en SQL.</p>`,
  sections: [
    { h: "Voir seulement quelques lignes : LIMIT",
      html: `<p>Quand on découvre une table, on commence par regarder quelques lignes pour comprendre ce qu'elle contient. <code>LIMIT</code> se place à la fin et dit combien de lignes afficher au maximum :</p>
<pre class="sqlx"><code>SELECT * FROM ventes LIMIT 5;</code></pre>
<p>La table <code>ventes</code> a 160 lignes, mais on n'en voit que 5. Chaque vente dit qui a acheté (<code>client_id</code>), quoi (<code>produit_id</code>), combien (<code>quantite</code>), quand (<code>date_vente</code>) et comment le client a payé (<code>paiement</code>).</p>` },
    { h: "Filtrer avec WHERE",
      html: `<p><code>WHERE</code> (« où ») se place après <code>FROM</code>. Il est suivi d'une <strong>condition</strong> : SQLite garde seulement les lignes pour lesquelles la condition est vraie.</p>
<pre class="sqlx"><code>SELECT prenom, nom, ville
FROM clients
WHERE ville = 'Bobo-Dioulasso';</code></pre>
<ul><li>Le texte se met entre <strong>apostrophes</strong> : <code>'Bobo-Dioulasso'</code>.</li>
<li>Les nombres s'écrivent sans apostrophes : <code>WHERE prix = 800</code>.</li>
<li>On peut écrire la requête sur plusieurs lignes : SQLite s'en moque, et c'est plus lisible.</li></ul>
<div class="box plain"><b class="tag">En clair</b><p>Avec <code>=</code>, le texte doit être <strong>exactement</strong> le même, majuscules et tirets compris : <code>'bobo-dioulasso'</code> ou <code>'Bobo Dioulasso'</code> ne trouvent rien.</p></div>` },
    { h: "Les comparaisons",
      html: `<div class="table-wrap"><table><thead><tr><th>Symbole</th><th>Sens</th><th>Exemple</th></tr></thead><tbody>
<tr><td><code>=</code></td><td>égal à</td><td><code>categorie = 'Soins'</code></td></tr>
<tr><td><code>!=</code> ou <code>&lt;&gt;</code></td><td>différent de</td><td><code>paiement != 'Espèces'</code></td></tr>
<tr><td><code>&lt;</code> et <code>&gt;</code></td><td>plus petit, plus grand</td><td><code>prix &lt; 1000</code></td></tr>
<tr><td><code>&lt;=</code> et <code>&gt;=</code></td><td>plus petit ou égal, plus grand ou égal</td><td><code>stock &gt;= 50</code></td></tr>
</tbody></table></div>
<p>Les produits qui coûtent moins de 500 F :</p>
<pre class="sqlx"><code>SELECT nom, prix FROM produits WHERE prix &lt; 500;</code></pre>
<p>Les produits en rupture de stock :</p>
<pre class="sqlx"><code>SELECT nom, stock FROM produits WHERE stock = 0;</code></pre>` },
    { h: "Plusieurs conditions : AND, OR, NOT",
      html: `<ul><li><code>AND</code> (et) : les <strong>deux</strong> conditions doivent être vraies.</li>
<li><code>OR</code> (ou) : <strong>au moins une</strong> des deux doit être vraie.</li>
<li><code>NOT</code> (non) : inverse une condition.</li></ul>
<p>Les ventes payées par Orange Money avec plus de 4 articles :</p>
<pre class="sqlx"><code>SELECT id, quantite, paiement
FROM ventes
WHERE paiement = 'Orange Money' AND quantite &gt; 4;</code></pre>
<p>Les clients de Kaya ou de Banfora :</p>
<pre class="sqlx"><code>SELECT prenom, nom, ville
FROM clients
WHERE ville = 'Kaya' OR ville = 'Banfora';</code></pre>
<div class="box steps"><b class="tag">Pas à pas : les parenthèses</b><p>Quand on mélange <code>AND</code> et <code>OR</code>, SQL fait d'abord les <code>AND</code>, comme la multiplication passe avant l'addition. Mets des parenthèses pour dire ce que tu veux :</p>
<pre><code>WHERE categorie = 'Soins' AND (prix &lt; 300 OR stock &gt; 50)</code></pre>
<p>Ici : un produit de soins, <strong>et</strong> (pas cher <strong>ou</strong> beaucoup en stock). Sans les parenthèses, SQL comprendrait : (soins et pas cher) ou (n'importe quel produit avec un stock de plus de 50).</p></div>` }
  ],
  pitfalls: [
    "Oublier les apostrophes autour d'un texte : <code>WHERE ville = Kaya</code> donne l'erreur <code>no such column: Kaya</code>. Sans apostrophes, SQLite croit que c'est un nom de colonne.",
    "Utiliser des guillemets doubles pour un texte : <code>\"Kaya\"</code>. En SQL, les guillemets doubles désignent une colonne. Le texte se met entre apostrophes simples.",
    "Écrire <code>WHERE ville = 'Kaya' OR 'Banfora'</code> : il faut répéter la colonne, <code>ville = 'Kaya' OR ville = 'Banfora'</code>."
  ],
  remember: ["WHERE condition garde seulement les lignes où la condition est vraie.", "Texte entre apostrophes, nombres sans.", "AND : les deux conditions ; OR : au moins une ; NOT : l'inverse.", "LIMIT n, à la fin, affiche au plus n lignes."],
  quiz: [
    { q: "Quelle condition trouve les produits qui coûtent 1000 F ou plus ?", options: ["prix > 1000", "prix >= 1000", "prix => 1000", "prix = 1000+"], answer: 1, explain: ">= veut dire « plus grand ou égal ». > seul exclurait les produits à 1000 F pile." },
    { q: "Que renvoie WHERE ville = 'Kaya' AND ville = 'Banfora' ?", options: ["Les clients des deux villes", "Aucune ligne", "Une erreur", "Les clients de Kaya seulement"], answer: 1, explain: "Une même ligne ne peut pas avoir deux villes à la fois : la condition n'est jamais vraie. Pour les deux villes, il faut OR." },
    { q: "Où se place WHERE dans la requête ?", options: ["Avant SELECT", "Entre SELECT et FROM", "Après FROM", "Après LIMIT"], answer: 2, explain: "L'ordre est : SELECT … FROM … WHERE … LIMIT …" }
  ],
  exercise: {
    task: `La gérante prépare une promotion. Affiche le <strong>nom</strong> et le <strong>prix</strong> des produits de la catégorie <code>Alimentation</code> qui coûtent <strong>moins de 1000 F</strong>.`,
    hint: `Deux conditions reliées par AND : categorie = 'Alimentation' et prix < 1000.`,
    start: `SELECT nom, prix\nFROM produits\n`,
    sol: `SELECT nom, prix\nFROM produits\nWHERE categorie = 'Alimentation' AND prix < 1000;`
  }
},
/* ------------------------------------------------------------------ */
{ id: "s03", title: "Cases vides et recherches : NULL, LIKE, BETWEEN, IN", minutes: 25, cs50: 0,
  goal: "Trouver les informations manquantes avec IS NULL, chercher un morceau de texte avec LIKE, et filtrer un intervalle ou une liste avec BETWEEN et IN.",
  why: `<p>Dans la vraie vie, les données sont incomplètes : un client n'a pas donné son numéro, un quartier n'a pas été noté. Et on cherche souvent « à peu près » : tous les noms qui commencent par « Ou », toutes les ventes du mois de juin. Ces quatre outils couvrent la plupart de ces besoins.</p>`,
  sections: [
    { h: "NULL : quand on ne sait pas",
      html: `<p>Quand une case est vide, SQL y met une valeur spéciale : <code>NULL</code>. Elle veut dire « inconnu » ou « absent ». Ce n'est ni zéro, ni un texte vide : c'est « on ne sait pas ».</p>
<p>Pour trouver les cases vides, on n'utilise pas <code>=</code>, mais <code>IS NULL</code> :</p>
<pre class="sqlx"><code>SELECT prenom, nom, telephone
FROM clients
WHERE telephone IS NULL;</code></pre>
<p>Et l'inverse, <code>IS NOT NULL</code> : les clients dont on connaît le quartier.</p>
<pre class="sqlx"><code>SELECT prenom, quartier FROM clients WHERE quartier IS NOT NULL LIMIT 5;</code></pre>
<div class="box plain"><b class="tag">En clair</b><p>Pourquoi pas <code>= NULL</code> ? Parce que « inconnu = inconnu », SQL ne peut pas dire si c'est vrai. Deux numéros inconnus ne sont pas forcément le même numéro. La comparaison <code>= NULL</code> n'est donc jamais vraie, et la requête ne renvoie rien, sans erreur. C'est un piège classique.</p></div>` },
    { h: "LIKE : chercher un morceau de texte",
      html: `<p><code>LIKE</code> compare un texte à un <strong>modèle</strong>, avec deux jokers :</p>
<ul><li><code>%</code> remplace <strong>n'importe quelle suite de caractères</strong> (même aucun).</li>
<li><code>_</code> remplace <strong>exactement un</strong> caractère.</li></ul>
<div class="table-wrap"><table><thead><tr><th>Modèle</th><th>Trouve</th></tr></thead><tbody>
<tr><td><code>'Ou%'</code></td><td>les textes qui commencent par Ou : Ouédraogo, Ouattara…</td></tr>
<tr><td><code>'%gaz%'</code></td><td>les textes qui contiennent gaz, n'importe où</td></tr>
<tr><td><code>'%1 kg'</code></td><td>les textes qui finissent par 1 kg</td></tr>
<tr><td><code>'K_nda'</code></td><td>K, une lettre, puis nda : Kinda</td></tr>
</tbody></table></div>
<pre class="sqlx"><code>SELECT prenom, nom FROM clients WHERE nom LIKE 'Ou%';</code></pre>
<pre class="sqlx"><code>SELECT nom, prix FROM produits WHERE nom LIKE '%recharge%';</code></pre>
<p>Remarque : dans SQLite, <code>LIKE</code> ne fait pas la différence entre majuscules et minuscules pour les lettres sans accent. <code>'%recharge%'</code> trouve donc « Recharge gaz » et « Recharge de crédit ».</p>` },
    { h: "BETWEEN : un intervalle",
      html: `<p><code>BETWEEN a AND b</code> garde les valeurs entre a et b, <strong>a et b compris</strong>. Les produits entre 1000 et 3000 F :</p>
<pre class="sqlx"><code>SELECT nom, prix FROM produits WHERE prix BETWEEN 1000 AND 3000;</code></pre>
<p>Ça marche aussi pour les dates. Dans notre base, elles sont écrites <code>'AAAA-MM-JJ'</code> (année, mois, jour). Dans ce format, l'ordre alphabétique est aussi l'ordre du temps : on peut comparer les dates comme des textes.</p>
<pre class="sqlx"><code>SELECT id, date_vente, paiement
FROM ventes
WHERE date_vente BETWEEN '2026-03-01' AND '2026-03-07';</code></pre>
<div class="box why"><b class="tag">À retenir</b><p>Écris toujours les dates <code>'2026-03-07'</code>, avec les zéros. <code>'2026-3-7'</code> ne serait pas bien rangé, et la comparaison donnerait de faux résultats.</p></div>` },
    { h: "IN : une liste de valeurs",
      html: `<p>Au lieu d'enchaîner les <code>OR</code>, on donne une liste entre parenthèses :</p>
<pre class="sqlx"><code>SELECT prenom, nom, ville
FROM clients
WHERE ville IN ('Kaya', 'Banfora', 'Dédougou');</code></pre>
<p>C'est exactement la même chose que <code>ville = 'Kaya' OR ville = 'Banfora' OR ville = 'Dédougou'</code>, en plus court. Et <code>NOT IN (…)</code> garde tout ce qui n'est <strong>pas</strong> dans la liste.</p>` }
  ],
  pitfalls: [
    "Écrire <code>WHERE telephone = NULL</code> : la requête ne renvoie rien, sans erreur. Il faut <code>IS NULL</code>.",
    "Oublier le <code>%</code> dans LIKE : <code>nom LIKE 'Ou'</code> ne trouve que le texte « Ou » exactement.",
    "Inverser les bornes de BETWEEN : <code>BETWEEN 3000 AND 1000</code> ne renvoie rien. La plus petite valeur se met en premier."
  ],
  remember: ["NULL = valeur inconnue ; on la teste avec IS NULL ou IS NOT NULL, jamais avec =.", "LIKE avec % (n'importe quelle suite) et _ (un caractère).", "BETWEEN a AND b inclut a et b.", "IN ('x', 'y') remplace une série de OR."],
  quiz: [
    { q: "Comment trouver les clients dont le quartier est inconnu ?", options: ["WHERE quartier = NULL", "WHERE quartier = ''", "WHERE quartier IS NULL", "WHERE quartier = 0"], answer: 2, explain: "Une case vide contient NULL, qu'on teste avec IS NULL. La comparaison = NULL n'est jamais vraie." },
    { q: "Lequel de ces noms est trouvé par nom LIKE '%ogo' ?", options: ["Ouédraogo", "Sawadogo", "Les deux", "Aucun"], answer: 2, explain: "%ogo veut dire « finit par ogo ». Ouédraogo et Sawadogo finissent tous les deux par ogo." },
    { q: "prix BETWEEN 500 AND 1000 garde-t-il un produit à 1000 F ?", options: ["Oui, les bornes sont comprises", "Non, seulement jusqu'à 999", "Seulement avec >=", "Ça dépend de SQLite"], answer: 0, explain: "BETWEEN inclut les deux bornes : c'est la même chose que prix >= 500 AND prix <= 1000." }
  ],
  exercise: {
    task: `Affiche l'<strong>id</strong>, la <strong>date_vente</strong> et le <strong>paiement</strong> des ventes du <strong>mois de juin 2026</strong> payées par <strong>mobile money</strong>, c'est-à-dire <code>Orange Money</code> ou <code>Moov Money</code>.`,
    hint: `Le mois de juin : date_vente BETWEEN '2026-06-01' AND '2026-06-30'. Le paiement : paiement IN ('Orange Money', 'Moov Money'). Relie les deux avec AND.`,
    start: `SELECT id, date_vente, paiement\nFROM ventes\n`,
    sol: `SELECT id, date_vente, paiement\nFROM ventes\nWHERE date_vente BETWEEN '2026-06-01' AND '2026-06-30'\n  AND paiement IN ('Orange Money', 'Moov Money');`
  }
},
/* ------------------------------------------------------------------ */
{ id: "s04", title: "Trier et calculer : ORDER BY, AS, DISTINCT", minutes: 25, cs50: 0,
  goal: "Trier un résultat avec ORDER BY, faire des calculs dans SELECT et les nommer avec AS, et retirer les doublons avec DISTINCT.",
  why: `<p>« Les 5 produits les plus chers », « les dernières ventes », « la liste des villes où on a des clients » : dès qu'on présente des résultats à quelqu'un, il faut les ranger et souvent calculer une nouvelle valeur. C'est ce qui transforme une liste brute en vraie réponse.</p>`,
  sections: [
    { h: "Trier avec ORDER BY",
      html: `<p><code>ORDER BY colonne</code> range les lignes. Par défaut, du plus petit au plus grand (<code>ASC</code>, croissant). Avec <code>DESC</code>, du plus grand au plus petit (décroissant).</p>
<pre class="sqlx"><code>SELECT nom, prix FROM produits ORDER BY prix DESC LIMIT 5;</code></pre>
<p>Combiné avec <code>LIMIT</code>, on obtient un « top 5 ». Pour le texte, l'ordre est alphabétique :</p>
<pre class="sqlx"><code>SELECT prenom, nom FROM clients ORDER BY nom, prenom LIMIT 8;</code></pre>
<p>Avec deux colonnes, SQLite trie d'abord par <code>nom</code>, puis, pour les mêmes noms (les Kaboré, les Sawadogo…), par <code>prenom</code>.</p>
<div class="box steps"><b class="tag">Pas à pas : l'ordre des mots-clés</b><ol>
<li><code>SELECT</code> les colonnes</li><li><code>FROM</code> la table</li><li><code>WHERE</code> le filtre</li><li><code>ORDER BY</code> le tri</li><li><code>LIMIT</code> le nombre de lignes</li></ol>
<p>Cet ordre est obligatoire. <code>LIMIT</code> avant <code>ORDER BY</code> provoque une erreur.</p></div>` },
    { h: "Calculer dans SELECT, et nommer avec AS",
      html: `<p>Après <code>SELECT</code>, on peut écrire un <strong>calcul</strong> avec <code>+</code>, <code>-</code>, <code>*</code> et <code>/</code>. Combien vaut le stock de chaque produit ? Le prix fois la quantité en stock :</p>
<pre class="sqlx"><code>SELECT nom, prix * stock FROM produits LIMIT 5;</code></pre>
<p>Le titre de la colonne est peu lisible (<code>prix * stock</code>). <code>AS</code> lui donne un nom, qu'on appelle un <strong>alias</strong> :</p>
<pre class="sqlx"><code>SELECT nom, prix * stock AS valeur_stock FROM produits LIMIT 5;</code></pre>
<p>On peut ensuite trier par cet alias : <code>ORDER BY valeur_stock DESC</code>.</p>
<div class="box plain"><b class="tag">En clair</b><p>Le calcul ne modifie pas la table : il fabrique une colonne seulement dans le résultat. La base reste la même.</p></div>` },
    { h: "Attention à la division",
      html: `<p>Quand on divise deux nombres entiers, SQLite donne un résultat <strong>entier</strong> : il coupe les décimales.</p>
<pre class="sqlx"><code>SELECT 7 / 2 AS entier, 7 / 2.0 AS decimal;</code></pre>
<p>Pour garder les décimales, il suffit qu'un des deux nombres ait une virgule (écrite avec un point en SQL) : <code>7 / 2.0</code> donne 3.5. On verra la fonction <code>ROUND</code> pour arrondir dans la prochaine leçon.</p>` },
    { h: "DISTINCT : sans les doublons",
      html: `<p>Dans quelles villes habitent nos clients ? <code>SELECT ville FROM clients</code> donne 30 lignes, avec Ouagadougou répété. <code>DISTINCT</code> garde chaque valeur une seule fois :</p>
<pre class="sqlx"><code>SELECT DISTINCT ville FROM clients ORDER BY ville;</code></pre>
<p>Même idée pour les moyens de paiement utilisés :</p>
<pre class="sqlx"><code>SELECT DISTINCT paiement FROM ventes;</code></pre>` }
  ],
  pitfalls: [
    "Oublier <code>DESC</code> pour un « top » : <code>ORDER BY prix LIMIT 5</code> donne les 5 produits les <strong>moins</strong> chers.",
    "Mettre <code>LIMIT</code> avant <code>ORDER BY</code> : l'ordre des mots-clés est fixe, c'est une erreur de syntaxe.",
    "Diviser deux entiers et s'étonner de perdre les décimales : <code>stock / 100</code> donne 0 pour un stock de 45. Écris <code>stock / 100.0</code>."
  ],
  remember: ["ORDER BY colonne trie (ASC croissant par défaut, DESC décroissant).", "On peut calculer dans SELECT : prix * stock.", "AS donne un nom à une colonne du résultat.", "DISTINCT retire les doublons."],
  quiz: [
    { q: "Comment afficher les 3 ventes les plus récentes ?", options: ["ORDER BY date_vente LIMIT 3", "ORDER BY date_vente DESC LIMIT 3", "LIMIT 3 ORDER BY date_vente DESC", "WHERE date_vente = DESC LIMIT 3"], answer: 1, explain: "Les plus récentes ont les dates les plus grandes : tri décroissant (DESC), puis LIMIT 3, dans cet ordre." },
    { q: "Que donne SELECT 9 / 2; dans SQLite ?", options: ["4.5", "4", "5", "Une erreur"], answer: 1, explain: "Deux entiers donnent une division entière : les décimales sont coupées. Pour avoir 4.5, il faut 9 / 2.0." },
    { q: "À quoi sert AS dans SELECT prix * 2 AS double ?", options: ["À modifier la table", "À nommer la colonne calculée", "À trier", "À filtrer"], answer: 1, explain: "AS donne un nom (un alias) à la colonne du résultat. La table n'est pas modifiée." }
  ],
  exercise: {
    task: `Quels produits immobilisent le plus d'argent dans la boutique ? Affiche le <strong>nom</strong> et la valeur du stock (<code>prix * stock</code>), nommée <code>valeur_stock</code>, pour les <strong>5 produits</strong> dont cette valeur est la plus grande, de la plus grande à la plus petite.`,
    hint: `SELECT nom, prix * stock AS valeur_stock FROM produits, puis ORDER BY valeur_stock DESC, puis LIMIT 5.`,
    start: `SELECT nom\nFROM produits\n`,
    sol: `SELECT nom, prix * stock AS valeur_stock\nFROM produits\nORDER BY valeur_stock DESC\nLIMIT 5;`,
    names: true, ordered: true
  }
},
/* ------------------------------------------------------------------ */
{ id: "s05", title: "Compter et résumer : COUNT, SUM, AVG, MIN, MAX", minutes: 25, cs50: 0,
  goal: "Résumer une table en un seul chiffre avec les fonctions d'agrégation, et comprendre comment elles traitent les cases vides.",
  why: `<p>« Combien de ventes ce mois-ci ? », « Quel est le prix moyen ? », « Combien d'argent est entré par Orange Money ? » : ce sont les questions d'un vrai bilan. Les fonctions d'agrégation résument des centaines de lignes en un chiffre, et c'est la base de tout tableau de bord.</p>`,
  sections: [
    { h: "COUNT : compter",
      html: `<p>Une fonction d'<strong>agrégation</strong> prend toutes les lignes et les résume en une seule valeur. La plus simple, <code>COUNT(*)</code>, compte les lignes :</p>
<pre class="sqlx"><code>SELECT COUNT(*) AS nb_ventes FROM ventes;</code></pre>
<p>Avec <code>WHERE</code>, on compte seulement les lignes filtrées. Combien de ventes payées par Orange Money ?</p>
<pre class="sqlx"><code>SELECT COUNT(*) AS nb FROM ventes WHERE paiement = 'Orange Money';</code></pre>
<div class="box steps"><b class="tag">Pas à pas : dans quel ordre ?</b><ol>
<li><code>FROM ventes</code> : les 160 ventes.</li>
<li><code>WHERE</code> : on garde seulement celles payées par Orange Money.</li>
<li><code>COUNT(*)</code> : on compte ce qui reste. Résultat : une seule ligne, un seul chiffre.</li></ol></div>` },
    { h: "COUNT(colonne) et COUNT(DISTINCT colonne)",
      html: `<p>Il y a trois façons de compter, et elles ne donnent pas le même chiffre :</p>
<pre class="sqlx"><code>SELECT COUNT(*) AS lignes,
       COUNT(telephone) AS avec_telephone,
       COUNT(DISTINCT ville) AS villes
FROM clients;</code></pre>
<ul><li><code>COUNT(*)</code> compte toutes les lignes : 30 clients.</li>
<li><code>COUNT(telephone)</code> compte seulement les cases <strong>non vides</strong> : les <code>NULL</code> sont ignorés.</li>
<li><code>COUNT(DISTINCT ville)</code> compte les valeurs <strong>différentes</strong> : le nombre de villes.</li></ul>` },
    { h: "SUM, AVG, MIN, MAX",
      html: `<div class="table-wrap"><table><thead><tr><th>Fonction</th><th>Donne</th></tr></thead><tbody>
<tr><td><code>SUM(col)</code></td><td>la somme</td></tr>
<tr><td><code>AVG(col)</code></td><td>la moyenne (average)</td></tr>
<tr><td><code>MIN(col)</code></td><td>la plus petite valeur</td></tr>
<tr><td><code>MAX(col)</code></td><td>la plus grande valeur</td></tr>
</tbody></table></div>
<pre class="sqlx"><code>SELECT MIN(prix) AS moins_cher,
       MAX(prix) AS plus_cher,
       AVG(prix) AS prix_moyen
FROM produits;</code></pre>
<p>La moyenne a beaucoup de décimales. <code>ROUND(valeur, n)</code> arrondit à n chiffres après la virgule (à l'unité si on ne met pas n) :</p>
<pre class="sqlx"><code>SELECT ROUND(AVG(prix)) AS prix_moyen FROM produits;</code></pre>
<p>Combien d'articles sont sortis de la boutique en tout ? La somme des quantités :</p>
<pre class="sqlx"><code>SELECT SUM(quantite) AS articles_vendus FROM ventes;</code></pre>
<p><code>MIN</code> et <code>MAX</code> marchent aussi sur les dates : la première et la dernière vente.</p>
<pre class="sqlx"><code>SELECT MIN(date_vente) AS premiere, MAX(date_vente) AS derniere FROM ventes;</code></pre>
<div class="box why"><b class="tag">À retenir</b><p>Comme <code>COUNT(colonne)</code>, les fonctions <code>SUM</code>, <code>AVG</code>, <code>MIN</code> et <code>MAX</code> ignorent les <code>NULL</code>. Une moyenne calculée sur une colonne à trous ne porte que sur les cases remplies.</p></div>` }
  ],
  pitfalls: [
    "Croire que <code>COUNT(telephone)</code> compte tous les clients : il ignore ceux dont le téléphone est <code>NULL</code>. Pour compter les lignes, c'est <code>COUNT(*)</code>.",
    "Mettre une agrégation dans <code>WHERE</code> : <code>WHERE prix &gt; AVG(prix)</code> provoque une erreur. On verra comment faire avec une sous-requête (leçon 7).",
    "Mélanger une colonne simple et une agrégation : <code>SELECT nom, MAX(prix)</code> ne dit pas clairement ce qu'on veut. On verra GROUP BY (leçon 9) pour ça."
  ],
  remember: ["COUNT(*) compte les lignes, COUNT(col) les cases non vides, COUNT(DISTINCT col) les valeurs différentes.", "SUM, AVG, MIN, MAX résument une colonne en un chiffre.", "Les agrégations ignorent les NULL.", "ROUND(x, n) arrondit à n décimales."],
  quiz: [
    { q: "La table clients a 30 lignes, dont 5 sans téléphone. Que donne COUNT(telephone) ?", options: ["30", "25", "5", "Une erreur"], answer: 1, explain: "COUNT(colonne) ignore les NULL : il compte les 25 clients dont le téléphone est connu." },
    { q: "Quelle requête donne le prix du produit le plus cher ?", options: ["SELECT TOP(prix) FROM produits;", "SELECT MAX(prix) FROM produits;", "SELECT prix FROM produits LIMIT 1;", "SELECT COUNT(prix) FROM produits;"], answer: 1, explain: "MAX donne la plus grande valeur. LIMIT 1 sans tri donnerait juste la première ligne de la table." },
    { q: "Que fait ROUND(2733.4) ?", options: ["2733", "2734", "2733.4", "2700"], answer: 0, explain: "Sans deuxième argument, ROUND arrondit à l'unité : 2733.4 devient 2733." }
  ],
  exercise: {
    task: `En une seule requête, affiche deux chiffres sur les clients : le nombre de clients dont on connaît le <strong>téléphone</strong>, nommé <code>avec_telephone</code>, et le nombre de <strong>villes différentes</strong>, nommé <code>villes</code>.`,
    hint: `COUNT(telephone) ignore les cases vides. COUNT(DISTINCT ville) compte les villes différentes. Sépare les deux par une virgule et nomme-les avec AS.`,
    start: `SELECT\nFROM clients;\n`,
    sol: `SELECT COUNT(telephone) AS avec_telephone,\n       COUNT(DISTINCT ville) AS villes\nFROM clients;`,
    names: true
  }
}
  ]
});
