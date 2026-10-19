/* Cours SQL — Partie 2 : relier les tables (repère CS50 SQL, semaine 1 « Relating ») */
(window.SQL_PARTS = window.SQL_PARTS || []).push({
  title: "Relier les tables",
  lessons: [
/* ------------------------------------------------------------------ */
{ id: "s06", title: "Plusieurs tables : les clés qui les relient", minutes: 30, cs50: 1,
  goal: "Comprendre pourquoi on sépare les données en plusieurs tables, ce que sont une clé primaire et une clé étrangère, et utiliser une première sous-requête.",
  why: `<p>Dans une vraie application, les données ne tiennent jamais dans une seule table. Orange Money a une table des comptes, une table des transactions, une table des agents… Comprendre comment les tables sont reliées, c'est comprendre comment toute application est construite, et c'est la clé de toute la suite du cours.</p>`,
  sections: [
    { h: "Pourquoi pas une seule grande table ?",
      html: `<p>Imagine qu'on note chaque vente avec toutes les informations du client et du produit :</p>
<div class="trace"><table><thead><tr><th>date</th><th>client</th><th>ville</th><th>téléphone</th><th>produit</th><th>prix</th></tr></thead><tbody>
<tr><td>2026-01-04</td><td>Mariam Sanou</td><td>Bobo-Dioulasso</td><td>61 33 …</td><td>Sucre 1 kg</td><td>800</td></tr>
<tr><td>2026-01-09</td><td>Mariam Sanou</td><td>Bobo-Dioulasso</td><td>61 33 …</td><td>Riz 25 kg</td><td>17500</td></tr>
<tr><td>2026-02-15</td><td>Mariam Sanou</td><td>Bobo-Dioulasso</td><td>61 33 …</td><td>Sucre 1 kg</td><td>800</td></tr>
</tbody></table></div>
<p>Trois problèmes :</p>
<ul><li><strong>Répétition</strong> : la ville et le téléphone de Mariam sont recopiés à chaque achat.</li>
<li><strong>Erreurs</strong> : si Mariam change de numéro, il faut le modifier partout. On en oubliera un, et la base se contredira.</li>
<li><strong>Trous</strong> : un client inscrit qui n'a encore rien acheté n'a aucune ligne, on ne peut pas l'enregistrer.</li></ul>
<p>La solution : <strong>une table par sorte de chose</strong> (les clients, les produits, les ventes), et des numéros pour les relier. Chaque information est écrite à un seul endroit.</p>` },
    { h: "La clé primaire : le numéro unique",
      html: `<p>Dans chaque table, la colonne <code>id</code> est la <strong>clé primaire</strong> (en anglais <em>primary key</em>). C'est un numéro unique qui identifie une ligne, comme le numéro de ta carte d'identité (CNIB) t'identifie toi, même si quelqu'un d'autre porte le même nom.</p>
<p>Il y a trois Kaboré parmi nos clients. Leur nom ne suffit pas à les distinguer, leur <code>id</code> oui :</p>
<pre class="sqlx"><code>SELECT id, prenom, nom FROM clients WHERE nom = 'Kaboré';</code></pre>` },
    { h: "La clé étrangère : le lien vers une autre table",
      html: `<p>Regarde une vente :</p>
<pre class="sqlx"><code>SELECT * FROM ventes WHERE id = 12;</code></pre>
<p>La vente ne recopie pas le nom du client : elle garde seulement son numéro, dans <code>client_id</code>. Pareil pour le produit, avec <code>produit_id</code>. Ces colonnes sont des <strong>clés étrangères</strong> (<em>foreign keys</em>) : elles contiennent la clé primaire d'une ligne d'une <strong>autre</strong> table.</p>
<div class="trace"><table><thead><tr><th>Table</th><th>Clé primaire</th><th>Clés étrangères</th></tr></thead><tbody>
<tr><td>clients</td><td>id</td><td>aucune</td></tr>
<tr><td>produits</td><td>id</td><td>aucune</td></tr>
<tr><td>ventes</td><td>id</td><td>client_id → clients.id<br>produit_id → produits.id</td></tr>
</tbody></table></div>
<div class="box plain"><b class="tag">En clair</b><p>Un client peut faire <strong>plusieurs</strong> ventes, mais une vente n'a qu'<strong>un</strong> client : c'est une relation « un à plusieurs ». Et comme un client peut acheter plusieurs produits, et un produit être acheté par plusieurs clients, la table <code>ventes</code> sert de pont entre les deux : c'est une relation « plusieurs à plusieurs ».</p></div>
<p>Certaines ventes ont un <code>client_id</code> vide (<code>NULL</code>) : ce sont des achats au comptoir, par quelqu'un qui n'a pas de carte client.</p>` },
    { h: "Une première sous-requête",
      html: `<p>Question : quelles sont les ventes du produit « Sac de riz 25 kg » ? La table <code>ventes</code> ne connaît que <code>produit_id</code>. On pourrait chercher l'id à la main, puis l'utiliser :</p>
<pre class="sqlx"><code>SELECT id FROM produits WHERE nom = 'Sac de riz 25 kg';</code></pre>
<p>Mais SQL sait faire les deux étapes d'un coup : on met la première requête <strong>entre parenthèses</strong> à l'intérieur de la seconde. C'est une <strong>sous-requête</strong>.</p>
<pre class="sqlx"><code>SELECT id, date_vente, quantite
FROM ventes
WHERE produit_id = (
  SELECT id FROM produits WHERE nom = 'Sac de riz 25 kg'
);</code></pre>
<div class="box steps"><b class="tag">Pas à pas</b><ol>
<li>SQLite exécute d'abord la sous-requête, entre parenthèses : elle renvoie <code>1</code>, l'id du sac de riz.</li>
<li>La requête principale devient <code>WHERE produit_id = 1</code>.</li>
<li>Elle renvoie les ventes de ce produit.</li></ol>
<p>Avantage : si l'id change un jour, ou si on veut un autre produit, on change seulement le nom. On n'a pas besoin de connaître les numéros par cœur.</p></div>` }
  ],
  pitfalls: [
    "Chercher le nom du client dans la table <code>ventes</code> : il n'y est pas. Elle ne contient que <code>client_id</code>, il faut aller voir dans <code>clients</code>.",
    "Oublier les parenthèses autour de la sous-requête : c'est une erreur de syntaxe.",
    "Utiliser <code>=</code> avec une sous-requête qui renvoie plusieurs lignes : SQLite ne garde alors que la première, sans prévenir. Pour plusieurs valeurs, on utilisera <code>IN</code> (leçon suivante)."
  ],
  remember: ["Une table par sorte de chose : chaque information est écrite à un seul endroit.", "La clé primaire (id) identifie une ligne de façon unique.", "Une clé étrangère (client_id, produit_id) contient l'id d'une ligne d'une autre table.", "Une sous-requête entre parenthèses est exécutée d'abord, et son résultat sert à la requête principale."],
  quiz: [
    { q: "Dans la table ventes, que contient client_id ?", options: ["Le nom du client", "Le numéro (id) du client dans la table clients", "Le numéro de la vente", "Le téléphone du client"], answer: 1, explain: "C'est une clé étrangère : elle contient l'id d'une ligne de la table clients." },
    { q: "Pourquoi ne pas recopier la ville du client dans chaque vente ?", options: ["SQLite l'interdit", "Pour éviter les répétitions et les contradictions", "Parce que la ville n'est pas importante", "Pour aller plus vite à écrire"], answer: 1, explain: "Une information écrite à un seul endroit ne peut pas se contredire : si le client déménage, on la change une seule fois." },
    { q: "Dans une requête avec une sous-requête, laquelle est exécutée en premier ?", options: ["La requête principale", "La sous-requête entre parenthèses", "Les deux en même temps", "Celle qui est écrite en premier"], answer: 1, explain: "La sous-requête est calculée d'abord ; son résultat est ensuite utilisé par la requête principale." }
  ],
  exercise: {
    task: `Affiche l'<strong>id</strong>, la <strong>date_vente</strong> et la <strong>quantite</strong> de toutes les ventes du produit <code>Pagne Faso Dan Fani</code>. Utilise une <strong>sous-requête</strong> pour trouver l'id du produit à partir de son nom.`,
    hint: `WHERE produit_id = (SELECT id FROM produits WHERE nom = 'Pagne Faso Dan Fani')`,
    start: `SELECT id, date_vente, quantite\nFROM ventes\nWHERE produit_id = (\n  -- la sous-requête ici\n);\n`,
    sol: `SELECT id, date_vente, quantite\nFROM ventes\nWHERE produit_id = (\n  SELECT id FROM produits WHERE nom = 'Pagne Faso Dan Fani'\n);`,
    need: [{ re: /\(\s*SELECT\b[\s\S]*\bFROM\s+produits\b/i, msg: "Utilise une sous-requête (SELECT id FROM produits WHERE nom = …) pour trouver l'id du produit, au lieu de l'écrire à la main." }]
  }
},
/* ------------------------------------------------------------------ */
{ id: "s07", title: "Sous-requêtes, IN et opérations d'ensembles", minutes: 30, cs50: 1,
  goal: "Utiliser une sous-requête qui renvoie plusieurs valeurs avec IN et NOT IN, éviter le piège des NULL, et combiner deux résultats avec UNION, INTERSECT et EXCEPT.",
  why: `<p>« Quels clients ont acheté du riz ? », « Quels clients n'ont jamais rien acheté ? » : ces questions demandent de croiser deux tables. Les sous-requêtes avec <code>IN</code> permettent d'y répondre pas à pas, en lisant la requête presque comme une phrase.</p>`,
  sections: [
    { h: "Comparer à une moyenne",
      html: `<p>Dans la leçon 5, on a vu que <code>WHERE prix &gt; AVG(prix)</code> provoque une erreur. La solution : calculer la moyenne dans une sous-requête. Elle renvoie un seul chiffre, qu'on peut comparer avec <code>&gt;</code> :</p>
<pre class="sqlx"><code>SELECT nom, prix
FROM produits
WHERE prix &gt; (SELECT AVG(prix) FROM produits)
ORDER BY prix DESC;</code></pre>
<p>La sous-requête calcule le prix moyen. La requête principale garde les produits plus chers que cette moyenne.</p>` },
    { h: "IN avec une sous-requête",
      html: `<p>Dans la leçon 3, on a vu <code>IN ('Kaya', 'Banfora')</code> avec une liste écrite à la main. La liste peut aussi venir d'une sous-requête. Quels clients ont acheté une lampe solaire ?</p>
<pre class="sqlx"><code>SELECT prenom, nom
FROM clients
WHERE id IN (
  SELECT client_id FROM ventes WHERE produit_id = 16
);</code></pre>
<p>La sous-requête renvoie la liste des <code>client_id</code> des ventes de lampes (produit 16). La requête principale garde les clients dont l'<code>id</code> est dans cette liste.</p>
<p>On peut même emboîter deux sous-requêtes pour partir du nom du produit :</p>
<pre class="sqlx"><code>SELECT prenom, nom
FROM clients
WHERE id IN (
  SELECT client_id FROM ventes
  WHERE produit_id = (SELECT id FROM produits WHERE nom = 'Lampe solaire')
);</code></pre>
<div class="box steps"><b class="tag">Pas à pas : lire de l'intérieur vers l'extérieur</b><ol>
<li>La sous-requête la plus profonde trouve l'id de la lampe solaire.</li>
<li>La suivante trouve les clients qui l'ont achetée.</li>
<li>La requête principale affiche leurs noms.</li></ol></div>` },
    { h: "NOT IN, et le piège du NULL",
      html: `<p>Qui n'a jamais rien acheté ? On veut les clients dont l'id n'est <strong>pas</strong> dans les ventes. Essayons :</p>
<pre class="sqlx"><code>SELECT prenom, nom
FROM clients
WHERE id NOT IN (SELECT client_id FROM ventes);</code></pre>
<p>Aucun résultat ! Pourtant certains clients n'ont rien acheté. Le coupable : les ventes au comptoir, dont le <code>client_id</code> est <code>NULL</code>. Pour SQL, « 14 n'est pas dans (2, 5, inconnu) » n'est pas sûr : l'inconnu pourrait être 14. Alors il ne garde rien.</p>
<p>La solution : retirer les <code>NULL</code> de la liste.</p>
<pre class="sqlx"><code>SELECT prenom, nom
FROM clients
WHERE id NOT IN (
  SELECT client_id FROM ventes WHERE client_id IS NOT NULL
);</code></pre>
<div class="box why"><b class="tag">À retenir</b><p>Avec <code>NOT IN</code> et une sous-requête, ajoute toujours <code>WHERE colonne IS NOT NULL</code> dans la sous-requête si la colonne peut être vide. C'est un des pièges les plus connus de SQL, même chez les professionnels.</p></div>` },
    { h: "Combiner deux résultats : UNION, INTERSECT, EXCEPT",
      html: `<p>Deux requêtes qui renvoient les <strong>mêmes colonnes</strong> peuvent être combinées comme des ensembles :</p>
<div class="table-wrap"><table><thead><tr><th>Opération</th><th>Garde</th></tr></thead><tbody>
<tr><td><code>UNION</code></td><td>les lignes de l'une <strong>ou</strong> de l'autre (sans doublons)</td></tr>
<tr><td><code>INTERSECT</code></td><td>les lignes présentes dans les <strong>deux</strong></td></tr>
<tr><td><code>EXCEPT</code></td><td>les lignes de la première <strong>sauf</strong> celles de la seconde</td></tr>
</tbody></table></div>
<p>Les clients qui ont payé <strong>à la fois</strong> en espèces et par Orange Money :</p>
<pre class="sqlx"><code>SELECT client_id FROM ventes WHERE paiement = 'Espèces' AND client_id IS NOT NULL
INTERSECT
SELECT client_id FROM ventes WHERE paiement = 'Orange Money';</code></pre>
<p>Les clients qui ont utilisé Orange Money mais <strong>jamais</strong> les espèces :</p>
<pre class="sqlx"><code>SELECT client_id FROM ventes WHERE paiement = 'Orange Money' AND client_id IS NOT NULL
EXCEPT
SELECT client_id FROM ventes WHERE paiement = 'Espèces';</code></pre>
<p>On a retiré les ventes sans client (<code>IS NOT NULL</code>) pour ne pas avoir une ligne vide dans le résultat. Pour avoir leurs noms, on peut mettre tout ça dans un <code>IN (…)</code>.</p>` }
  ],
  pitfalls: [
    "Oublier <code>IS NOT NULL</code> dans la sous-requête d'un <code>NOT IN</code> : le résultat est vide, sans aucune erreur.",
    "Faire une UNION de requêtes qui n'ont pas le même nombre de colonnes : SQLite refuse.",
    "Mettre dans la sous-requête une colonne qui ne correspond pas : <code>WHERE id IN (SELECT produit_id …)</code> compare des numéros de clients à des numéros de produits. Ça marche sans erreur, mais le résultat n'a aucun sens."
  ],
  remember: ["colonne IN (sous-requête) garde les lignes dont la valeur est dans la liste renvoyée.", "NOT IN avec une sous-requête : retire les NULL avec IS NOT NULL.", "UNION = l'un ou l'autre, INTERSECT = les deux, EXCEPT = l'un sauf l'autre.", "Lis les sous-requêtes de l'intérieur vers l'extérieur."],
  quiz: [
    { q: "Pourquoi WHERE id NOT IN (SELECT client_id FROM ventes) ne renvoie-t-il rien ?", options: ["Tous les clients ont acheté", "La liste contient des NULL", "NOT IN n'existe pas", "Il faut NOT EXISTS"], answer: 1, explain: "Avec un NULL dans la liste, SQL ne peut jamais affirmer qu'une valeur n'y est pas : la condition n'est jamais vraie." },
    { q: "Quelle opération garde les lignes présentes dans les deux résultats ?", options: ["UNION", "INTERSECT", "EXCEPT", "IN"], answer: 1, explain: "INTERSECT veut dire intersection : ce qui est commun aux deux." },
    { q: "Dans WHERE id IN (SELECT client_id FROM ventes WHERE produit_id = 3), que renvoie la sous-requête ?", options: ["Le nom du produit 3", "Les numéros des clients qui ont acheté le produit 3", "Le nombre de ventes du produit 3", "Les ventes du client 3"], answer: 1, explain: "Elle lit la colonne client_id des ventes du produit 3 : une liste de numéros de clients." }
  ],
  exercise: {
    task: `La gérante veut relancer les clients inscrits qui n'ont <strong>jamais rien acheté</strong>. Affiche leur <strong>prénom</strong> et leur <strong>nom</strong>. Attention au piège des ventes sans client.`,
    hint: `WHERE id NOT IN (SELECT client_id FROM ventes WHERE client_id IS NOT NULL)`,
    start: `SELECT prenom, nom\nFROM clients\n`,
    sol: `SELECT prenom, nom\nFROM clients\nWHERE id NOT IN (\n  SELECT client_id FROM ventes WHERE client_id IS NOT NULL\n);`
  }
},
/* ------------------------------------------------------------------ */
{ id: "s08", title: "JOIN : assembler deux tables", minutes: 35, cs50: 1,
  goal: "Assembler les lignes de plusieurs tables avec JOIN … ON, utiliser des alias de tables, et choisir entre JOIN et LEFT JOIN.",
  why: `<p>Une sous-requête répond à « qui a acheté ? ». Mais pour afficher <strong>en même temps</strong> le nom du client, le nom du produit et le montant de chaque vente, il faut coller les tables côte à côte. C'est le rôle de <code>JOIN</code>, l'outil le plus puissant de SQL et le plus demandé en entretien d'embauche.</p>`,
  sections: [
    { h: "Coller deux tables avec JOIN … ON",
      html: `<p><code>JOIN</code> assemble chaque vente avec la ligne du produit qui lui correspond. <code>ON</code> dit comment les reconnaître : le <code>produit_id</code> de la vente doit être égal à l'<code>id</code> du produit.</p>
<pre class="sqlx"><code>SELECT ventes.id, ventes.date_vente, produits.nom, ventes.quantite
FROM ventes
JOIN produits ON ventes.produit_id = produits.id
LIMIT 6;</code></pre>
<div class="box steps"><b class="tag">Pas à pas : ce que fait SQLite</b><ol>
<li>Il prend la première vente : <code>produit_id = 3</code>.</li>
<li>Il cherche dans <code>produits</code> la ligne où <code>id = 3</code> : le sucre.</li>
<li>Il colle les deux lignes en une seule, plus large.</li>
<li>Il recommence pour chaque vente.</li></ol></div>
<p>Comme deux tables ont une colonne <code>id</code>, on précise <code>table.colonne</code> : <code>ventes.id</code> ou <code>produits.id</code>. Sinon SQLite répond <code>ambiguous column name</code>.</p>` },
    { h: "Les alias de tables",
      html: `<p>Écrire <code>ventes.</code> et <code>produits.</code> partout, c'est long. On donne un nom court à chaque table, juste après son nom :</p>
<pre class="sqlx"><code>SELECT v.date_vente, p.nom, v.quantite, v.quantite * p.prix AS montant
FROM ventes v
JOIN produits p ON v.produit_id = p.id
LIMIT 6;</code></pre>
<p><code>v</code> veut dire <code>ventes</code>, <code>p</code> veut dire <code>produits</code>. Et on peut maintenant calculer le <strong>montant</strong> de chaque vente : la quantité (dans <code>ventes</code>) fois le prix (dans <code>produits</code>).</p>` },
    { h: "Trois tables d'un coup",
      html: `<p>On enchaîne les <code>JOIN</code>. Chaque vente avec le prénom du client et le nom du produit :</p>
<pre class="sqlx"><code>SELECT v.date_vente, c.prenom, c.nom, p.nom AS produit, v.quantite
FROM ventes v
JOIN clients c ON v.client_id = c.id
JOIN produits p ON v.produit_id = p.id
ORDER BY v.date_vente DESC
LIMIT 6;</code></pre>
<p>Remarque : le produit a été renommé <code>produit</code> avec <code>AS</code>, pour ne pas confondre avec le <code>nom</code> du client.</p>` },
    { h: "JOIN ou LEFT JOIN ?",
      html: `<p>Combien de lignes donne la jointure ventes-clients ?</p>
<pre class="sqlx"><code>SELECT COUNT(*) AS lignes
FROM ventes v
JOIN clients c ON v.client_id = c.id;</code></pre>
<p>Moins de 160 : les ventes au comptoir (client <code>NULL</code>) ont disparu, car elles n'ont aucun client à qui se coller. <code>JOIN</code> (on dit aussi <code>INNER JOIN</code>) garde seulement les lignes qui ont un partenaire des deux côtés.</p>
<p><code>LEFT JOIN</code> garde <strong>toutes</strong> les lignes de la table de gauche (celle écrite avant), et remplit avec <code>NULL</code> quand il n'y a pas de partenaire :</p>
<pre class="sqlx"><code>SELECT v.id, v.date_vente, c.prenom
FROM ventes v
LEFT JOIN clients c ON v.client_id = c.id
WHERE c.id IS NULL
LIMIT 5;</code></pre>
<p>Ici, on a même gardé seulement les ventes sans client. Dans l'autre sens, <code>clients LEFT JOIN ventes</code> montrerait aussi les clients qui n'ont rien acheté.</p>
<div class="box plain"><b class="tag">En clair</b><p><code>JOIN</code> : seulement les couples qui se trouvent. <code>LEFT JOIN</code> : toute la table de gauche, avec ou sans partenaire. Avant d'écrire une jointure, demande-toi : est-ce que je veux garder les lignes sans partenaire ?</p></div>` }
  ],
  pitfalls: [
    "Oublier <code>ON</code> : chaque vente est alors collée à <strong>chaque</strong> produit (160 × 25 = 4000 lignes). Ce résultat géant est presque toujours une erreur.",
    "Écrire <code>id</code> seul quand deux tables ont une colonne <code>id</code> : erreur <code>ambiguous column name</code>. Écris <code>v.id</code> ou <code>p.id</code>.",
    "Se tromper de colonnes dans <code>ON</code> : <code>ON v.client_id = p.id</code> relie des clients à des produits. Pas d'erreur, mais un résultat faux."
  ],
  remember: ["JOIN table ON condition colle les lignes qui se correspondent.", "Précise table.colonne (ou alias.colonne) quand deux tables ont une colonne du même nom.", "JOIN garde les couples trouvés ; LEFT JOIN garde aussi les lignes de gauche sans partenaire.", "On peut enchaîner plusieurs JOIN."],
  quiz: [
    { q: "Dans FROM ventes v JOIN produits p ON v.produit_id = p.id, que représente p ?", options: ["Une colonne", "Un nom court pour la table produits", "Le prix", "Une erreur"], answer: 1, explain: "C'est un alias de table : p remplace produits dans le reste de la requête." },
    { q: "Une vente a un client_id NULL. Avec JOIN clients, que devient-elle ?", options: ["Elle apparaît avec un client vide", "Elle disparaît du résultat", "Elle provoque une erreur", "Elle est collée au client 1"], answer: 1, explain: "JOIN ne garde que les lignes qui ont un partenaire. Pour la garder, il faut LEFT JOIN." },
    { q: "Que se passe-t-il si on oublie ON dans un JOIN ?", options: ["Erreur de syntaxe dans tous les cas", "Chaque ligne est collée à toutes les lignes de l'autre table", "Rien ne change", "SQLite devine la condition"], answer: 1, explain: "Sans condition, SQLite fait toutes les combinaisons possibles : un résultat énorme et faux." }
  ],
  exercise: {
    task: `Pour chaque vente <strong>payée par Moov Money</strong> faite à un client enregistré, affiche : la <strong>date_vente</strong>, le <strong>prénom</strong> du client, le <strong>nom du produit</strong> et le <strong>montant</strong> (quantité fois prix).`,
    hint: `FROM ventes v JOIN clients c ON v.client_id = c.id JOIN produits p ON v.produit_id = p.id, puis WHERE v.paiement = 'Moov Money'. Le montant : v.quantite * p.prix.`,
    start: `SELECT v.date_vente, c.prenom, p.nom, v.quantite * p.prix AS montant\nFROM ventes v\n`,
    sol: `SELECT v.date_vente, c.prenom, p.nom, v.quantite * p.prix AS montant\nFROM ventes v\nJOIN clients c ON v.client_id = c.id\nJOIN produits p ON v.produit_id = p.id\nWHERE v.paiement = 'Moov Money';`,
    need: [{ re: /\bJOIN\b/i, msg: "Utilise JOIN pour assembler les tables ventes, clients et produits." }]
  }
},
/* ------------------------------------------------------------------ */
{ id: "s09", title: "Regrouper : GROUP BY et HAVING", minutes: 35, cs50: 1,
  goal: "Calculer un résumé par groupe (par catégorie, par client, par mois) avec GROUP BY, et filtrer les groupes avec HAVING.",
  why: `<p>« Combien a rapporté chaque catégorie ? », « Qui sont nos 3 meilleurs clients ? », « Quel mois a été le plus actif ? » : ce sont les questions d'un bilan, et toutes se résolvent avec <code>GROUP BY</code>. Avec <code>JOIN</code>, c'est l'outil qui fait passer du niveau débutant au niveau intermédiaire.</p>`,
  sections: [
    { h: "GROUP BY : un résumé par groupe",
      html: `<p>Dans la leçon 5, <code>COUNT(*)</code> donnait un seul chiffre pour toute la table. <code>GROUP BY</code> range d'abord les lignes en <strong>paquets</strong> qui ont la même valeur, puis calcule le résumé pour chaque paquet.</p>
<pre class="sqlx"><code>SELECT paiement, COUNT(*) AS nb_ventes
FROM ventes
GROUP BY paiement;</code></pre>
<div class="box steps"><b class="tag">Pas à pas</b><ol>
<li>SQLite range les 160 ventes en trois paquets : Espèces, Moov Money, Orange Money.</li>
<li>Pour chaque paquet, il compte les lignes.</li>
<li>Il renvoie une ligne par paquet.</li></ol></div>
<p>Le nombre de produits et le prix moyen par catégorie :</p>
<pre class="sqlx"><code>SELECT categorie, COUNT(*) AS produits, ROUND(AVG(prix)) AS prix_moyen
FROM produits
GROUP BY categorie
ORDER BY prix_moyen DESC;</code></pre>
<div class="box why"><b class="tag">À retenir</b><p>Après <code>SELECT</code>, on met la colonne du regroupement et des agrégations (<code>COUNT</code>, <code>SUM</code>…). Une autre colonne simple n'aurait pas de sens : quel <code>nom</code> afficher pour un paquet qui contient 10 produits ?</p></div>` },
    { h: "GROUP BY avec JOIN",
      html: `<p>Le chiffre d'affaires (l'argent encaissé) par moyen de paiement demande le prix, qui est dans <code>produits</code> :</p>
<pre class="sqlx"><code>SELECT v.paiement, SUM(v.quantite * p.prix) AS total
FROM ventes v
JOIN produits p ON v.produit_id = p.id
GROUP BY v.paiement
ORDER BY total DESC;</code></pre>
<p>Et par mois ? La fonction <code>strftime('%m', date)</code> extrait le mois d'une date. On regroupe par ce mois :</p>
<pre class="sqlx"><code>SELECT strftime('%m', v.date_vente) AS mois, SUM(v.quantite * p.prix) AS total
FROM ventes v
JOIN produits p ON v.produit_id = p.id
GROUP BY mois
ORDER BY mois;</code></pre>` },
    { h: "HAVING : filtrer les groupes",
      html: `<p><code>WHERE</code> filtre les <strong>lignes</strong>, avant le regroupement. Pour filtrer les <strong>groupes</strong> selon leur total, il faut <code>HAVING</code>, qui se place après <code>GROUP BY</code>.</p>
<p>Les clients qui ont fait au moins 8 achats :</p>
<pre class="sqlx"><code>SELECT client_id, COUNT(*) AS achats
FROM ventes
WHERE client_id IS NOT NULL
GROUP BY client_id
HAVING COUNT(*) &gt;= 8
ORDER BY achats DESC;</code></pre>
<div class="box steps"><b class="tag">Pas à pas : l'ordre complet</b><ol>
<li><code>FROM</code> et <code>JOIN</code> : les tables.</li>
<li><code>WHERE</code> : on retire des lignes (ici, les ventes sans client).</li>
<li><code>GROUP BY</code> : on fait les paquets.</li>
<li><code>HAVING</code> : on retire des paquets (ici, ceux de moins de 8 achats).</li>
<li><code>SELECT</code> : on calcule les colonnes.</li>
<li><code>ORDER BY</code> puis <code>LIMIT</code> : on trie et on coupe.</li></ol></div>` }
  ],
  pitfalls: [
    "Mettre une agrégation dans <code>WHERE</code> : <code>WHERE COUNT(*) &gt;= 8</code> provoque l'erreur <code>misuse of aggregate</code>. Pour filtrer sur un total, c'est <code>HAVING</code>.",
    "Afficher une colonne qui n'est pas dans <code>GROUP BY</code> : SQLite l'accepte et prend une valeur au hasard dans le paquet. Le résultat a l'air juste mais ne l'est pas.",
    "Oublier <code>GROUP BY</code> : <code>SELECT categorie, COUNT(*) FROM produits</code> donne une seule ligne pour toute la table."
  ],
  remember: ["GROUP BY colonne fait des paquets de lignes qui ont la même valeur.", "Les agrégations (COUNT, SUM, AVG…) sont alors calculées pour chaque paquet.", "WHERE filtre les lignes avant ; HAVING filtre les groupes après.", "Ordre : FROM, JOIN, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT."],
  quiz: [
    { q: "Que renvoie SELECT ville, COUNT(*) FROM clients GROUP BY ville; ?", options: ["Le nombre total de clients", "Une ligne par ville, avec son nombre de clients", "La liste de tous les clients", "Une erreur"], answer: 1, explain: "GROUP BY ville fait un paquet par ville, et COUNT(*) compte les clients de chaque paquet." },
    { q: "Pour garder les catégories dont le total dépasse 50 000 F, on utilise :", options: ["WHERE SUM(...) > 50000", "HAVING SUM(...) > 50000", "LIMIT 50000", "ORDER BY 50000"], answer: 1, explain: "Le filtre porte sur un total de groupe : il se fait avec HAVING, après GROUP BY." },
    { q: "Dans quel ordre SQLite applique-t-il WHERE et HAVING ?", options: ["HAVING puis WHERE", "WHERE puis HAVING", "En même temps", "Ça dépend de l'ordre d'écriture"], answer: 1, explain: "WHERE retire des lignes avant le regroupement ; HAVING retire des groupes après." }
  ],
  exercise: {
    task: `Calcule le <strong>chiffre d'affaires par catégorie</strong> : pour chaque <code>categorie</code>, la somme des montants (quantité fois prix) nommée <code>total</code>. Garde seulement les catégories dont le total <strong>dépasse 50 000 F</strong>, de la plus grande à la plus petite.`,
    hint: `JOIN entre ventes et produits, GROUP BY p.categorie, HAVING SUM(v.quantite * p.prix) > 50000, ORDER BY total DESC.`,
    start: `SELECT p.categorie, SUM(v.quantite * p.prix) AS total\nFROM ventes v\nJOIN produits p ON v.produit_id = p.id\n`,
    sol: `SELECT p.categorie, SUM(v.quantite * p.prix) AS total\nFROM ventes v\nJOIN produits p ON v.produit_id = p.id\nGROUP BY p.categorie\nHAVING SUM(v.quantite * p.prix) > 50000\nORDER BY total DESC;`,
    names: true, ordered: true
  }
}
  ]
});
