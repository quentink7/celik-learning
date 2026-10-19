/* Cours SQL — Partie 4 : aller plus loin (repère CS50 SQL, semaines 4 « Viewing », 5 « Optimizing » et 6 « Scaling ») */
(function () {
  const COMPTES = `CREATE TABLE comptes (
  id        INTEGER PRIMARY KEY,
  titulaire TEXT NOT NULL,
  solde     INTEGER NOT NULL CHECK (solde >= 0)
);
INSERT INTO comptes (titulaire, solde) VALUES
('Awa Ouédraogo', 25000),
('Moussa Sawadogo', 8000),
('Boutique Nong-Taaba', 150000);`;

(window.SQL_PARTS = window.SQL_PARTS || []).push({
  title: "Aller plus loin",
  lessons: [
/* ------------------------------------------------------------------ */
{ id: "s14", title: "Les vues et les CTE : nommer ses requêtes", minutes: 30, cs50: 4,
  goal: "Enregistrer une requête sous un nom avec CREATE VIEW, découper une requête difficile en étapes avec WITH (CTE), et utiliser une vue pour cacher des informations sensibles.",
  why: `<p>Les requêtes avec trois <code>JOIN</code> et un <code>GROUP BY</code> deviennent vite longues. Les réécrire à chaque fois fatigue et crée des erreurs. Les vues et les CTE permettent de donner un nom à une requête et de construire les suivantes par-dessus, comme on range un problème difficile en petites étapes.</p>`,
  sections: [
    { h: "CREATE VIEW : une requête enregistrée",
      html: `<p>Une <strong>vue</strong> est une requête à laquelle on donne un nom. Ensuite, on l'utilise <strong>comme une table</strong>.</p>
<pre class="sqlx"><code>CREATE VIEW ventes_detail AS
SELECT v.id, v.date_vente, p.nom AS produit, p.categorie,
       v.quantite, v.quantite * p.prix AS montant, v.paiement
FROM ventes v
JOIN produits p ON v.produit_id = p.id;

SELECT produit, montant FROM ventes_detail
WHERE categorie = 'Textile';</code></pre>
<p>La deuxième requête est courte : le <code>JOIN</code> et le calcul du montant sont cachés dans la vue. N'importe qui peut maintenant interroger <code>ventes_detail</code> sans savoir écrire une jointure.</p>
<div class="box plain"><b class="tag">En clair</b><p>Une vue ne recopie pas les données : elle garde seulement la requête. À chaque utilisation, SQLite la relance sur les tables. Si une vente est ajoutée, la vue la montre tout de suite. On la supprime avec <code>DROP VIEW nom;</code>.</p></div>` },
    { h: "Une vue pour résumer",
      html: `<p>Une vue peut contenir des agrégations. Le bilan par client, prêt à l'emploi :</p>
<pre class="sqlx"><code>CREATE VIEW bilan_clients AS
SELECT c.id, c.prenom, c.nom, COUNT(*) AS achats,
       SUM(v.quantite * p.prix) AS total
FROM ventes v
JOIN clients c ON v.client_id = c.id
JOIN produits p ON v.produit_id = p.id
GROUP BY c.id;

SELECT prenom, nom, total FROM bilan_clients
WHERE total &gt; 30000 ORDER BY total DESC;</code></pre>` },
    { h: "Une vue pour protéger",
      html: `<p>Un stagiaire doit appeler les clients de Ouagadougou pour une promotion, mais il n'a pas besoin de voir leurs dates d'inscription ni leurs achats. On lui donne accès à une vue qui ne montre que le nécessaire :</p>
<pre class="sqlx"><code>CREATE VIEW annuaire_ouaga AS
SELECT prenom, nom, telephone
FROM clients
WHERE ville = 'Ouagadougou' AND telephone IS NOT NULL;

SELECT * FROM annuaire_ouaga LIMIT 5;</code></pre>
<p>Dans les grands SGBD comme PostgreSQL, on peut donner à un utilisateur le droit de lire une vue <strong>sans</strong> lui donner le droit de lire la table entière. C'est une protection simple des données personnelles.</p>` },
    { h: "WITH : les CTE, une vue d'un instant",
      html: `<p>Une <strong>CTE</strong> (<em>Common Table Expression</em>) est une vue temporaire, qui n'existe que le temps d'une requête. On l'écrit avec <code>WITH nom AS (…)</code>, avant le <code>SELECT</code> principal.</p>
<p>Question : combien un client dépense-t-il en moyenne ? Il faut deux étapes : le total de chaque client, puis la moyenne de ces totaux.</p>
<pre class="sqlx"><code>WITH totaux AS (
  SELECT v.client_id, SUM(v.quantite * p.prix) AS total
  FROM ventes v
  JOIN produits p ON v.produit_id = p.id
  WHERE v.client_id IS NOT NULL
  GROUP BY v.client_id
)
SELECT COUNT(*) AS clients, ROUND(AVG(total)) AS depense_moyenne
FROM totaux;</code></pre>
<div class="box steps"><b class="tag">Pas à pas</b><ol>
<li><code>totaux</code> calcule une ligne par client, avec son total.</li>
<li>Le <code>SELECT</code> principal lit <code>totaux</code> comme une table, et en fait la moyenne.</li></ol>
<p>On pourrait l'écrire avec une sous-requête dans le <code>FROM</code>, mais la CTE se lit de haut en bas, dans l'ordre où on pense. Et on peut en enchaîner plusieurs : <code>WITH a AS (…), b AS (…) SELECT …</code>.</p></div>` }
  ],
  pitfalls: [
    "Croire qu'une vue est une copie : elle relit les tables à chaque fois. Si on supprime la table, la vue ne marche plus.",
    "Donner à deux colonnes d'une vue le même nom (deux <code>nom</code>, celui du client et celui du produit) : renomme-les avec <code>AS</code>.",
    "Oublier la virgule entre deux CTE : <code>WITH a AS (…), b AS (…)</code>. Et une CTE s'utilise seulement dans la requête qui la suit."
  ],
  remember: ["CREATE VIEW nom AS SELECT … enregistre une requête, utilisable comme une table.", "Une vue ne copie pas les données : elle relance la requête.", "Une vue peut cacher des colonnes sensibles.", "WITH nom AS (…) SELECT … : une vue temporaire pour découper un calcul en étapes."],
  quiz: [
    { q: "Une vente est ajoutée après la création de la vue ventes_detail. Apparaît-elle dans la vue ?", options: ["Non, il faut recréer la vue", "Oui, la vue relance sa requête à chaque fois", "Seulement après un COMMIT", "Seulement si on la cite dans la vue"], answer: 1, explain: "Une vue n'est pas une copie : elle relit les tables à chaque utilisation." },
    { q: "Combien de temps existe une CTE écrite avec WITH ?", options: ["Pour toujours, comme une vue", "Le temps de la requête qui la suit", "Jusqu'à la fermeture de la base", "Jusqu'au prochain COMMIT"], answer: 1, explain: "Une CTE n'existe que pour la requête dans laquelle elle est écrite." },
    { q: "À quoi peut servir une vue qui ne montre que prenom, nom et telephone ?", options: ["À accélérer les calculs", "À donner accès au nécessaire sans montrer le reste des données", "À supprimer les autres colonnes", "À rien"], answer: 1, explain: "Une vue peut limiter ce qu'une personne voit : c'est une protection des données personnelles." }
  ],
  exercise: {
    task: `Crée une vue nommée <code>ventes_detail</code> qui donne, pour chaque vente, ces 5 colonnes : <code>date_vente</code>, <code>produit</code> (le nom du produit), <code>quantite</code>, <code>montant</code> (quantité fois prix) et <code>paiement</code>.`,
    hint: `CREATE VIEW ventes_detail AS SELECT v.date_vente, p.nom AS produit, v.quantite, v.quantite * p.prix AS montant, v.paiement FROM ventes v JOIN produits p ON v.produit_id = p.id;`,
    start: `CREATE VIEW ventes_detail AS\nSELECT\nFROM ventes v\n`,
    sol: `CREATE VIEW ventes_detail AS\nSELECT v.date_vente, p.nom AS produit, v.quantite,\n       v.quantite * p.prix AS montant, v.paiement\nFROM ventes v\nJOIN produits p ON v.produit_id = p.id;`,
    need: [{ re: /\bCREATE\s+VIEW\s+ventes_detail\b/i, msg: "Crée une vue avec CREATE VIEW ventes_detail AS …" }],
    mode: "state",
    verify: `SELECT date_vente, produit, quantite, montant, paiement FROM ventes_detail ORDER BY 1, 2, 3, 4, 5`,
    stateMsg: "La vue existe, mais son contenu n'est pas celui attendu. Vérifie la jointure, le calcul du montant (quantite * prix) et que la vue garde toutes les ventes."
  }
},
/* ------------------------------------------------------------------ */
{ id: "s15", title: "Index et transactions : rapide et sûr", minutes: 35, cs50: 5, setup: COMPTES,
  goal: "Accélérer les recherches avec un index, et regrouper plusieurs modifications dans une transaction pour qu'elles réussissent ou échouent ensemble.",
  why: `<p>Quand une base grandit jusqu'à des millions de lignes, comme celle d'un opérateur de mobile money, deux problèmes arrivent : les recherches deviennent lentes, et une panne au mauvais moment peut laisser l'argent à moitié transféré. Les index règlent le premier problème, les transactions le second.</p>`,
  sections: [
    { h: "Un index, comme à la fin d'un livre",
      html: `<p>Pour trouver « Ouagadougou » dans un livre de 500 pages, on peut tout lire, page après page. Ou bien aller à l'<strong>index</strong> à la fin, qui donne directement les numéros de pages. Une base fait pareil.</p>
<p>Sans index, pour <code>WHERE date_vente = '2026-06-15'</code>, SQLite lit <strong>toutes</strong> les ventes une par une. <code>EXPLAIN QUERY PLAN</code> montre ce qu'il prévoit de faire :</p>
<pre class="sqlx"><code>EXPLAIN QUERY PLAN
SELECT * FROM ventes WHERE date_vente = '2026-06-15';</code></pre>
<p><code>SCAN ventes</code> veut dire « je parcours toute la table ». Créons un index sur la colonne :</p>
<pre class="sqlx"><code>CREATE INDEX idx_ventes_date ON ventes (date_vente);
EXPLAIN QUERY PLAN
SELECT * FROM ventes WHERE date_vente = '2026-06-15';</code></pre>
<p>Maintenant : <code>SEARCH ventes USING INDEX idx_ventes_date</code>. SQLite va directement aux bonnes lignes. Avec 160 ventes, la différence ne se voit pas. Avec 10 millions, c'est la différence entre une réponse immédiate et plusieurs secondes d'attente.</p>` },
    { h: "Le prix d'un index",
      html: `<p>Un index n'est pas gratuit :</p>
<ul><li><strong>De la place</strong> : c'est une copie triée de la colonne, stockée en plus.</li>
<li><strong>Des écritures plus lentes</strong> : à chaque <code>INSERT</code>, <code>UPDATE</code> ou <code>DELETE</code>, la base doit aussi mettre l'index à jour.</li></ul>
<div class="box why"><b class="tag">À retenir</b><p>On crée un index sur les colonnes souvent utilisées dans <code>WHERE</code>, <code>JOIN … ON</code> et <code>ORDER BY</code>, dans les grandes tables. Pas sur toutes les colonnes. La clé primaire a déjà son index, automatiquement.</p></div>` },
    { h: "Le problème du transfert",
      html: `<p>La base de cette leçon contient des comptes de mobile money :</p>
<pre class="sqlx"><code>SELECT * FROM comptes;</code></pre>
<p>Awa paie 5000 F à la boutique. Il faut <strong>deux</strong> modifications : retirer 5000 F du compte d'Awa, et ajouter 5000 F à celui de la boutique. Imagine une coupure de courant entre les deux : l'argent a quitté Awa, mais n'est jamais arrivé. 5000 F ont disparu.</p>
<p>Il faut que les deux modifications réussissent <strong>ensemble</strong>, ou échouent <strong>ensemble</strong>. C'est une <strong>transaction</strong>.</p>` },
    { h: "BEGIN, COMMIT, ROLLBACK",
      html: `<pre class="sqlx"><code>BEGIN TRANSACTION;
UPDATE comptes SET solde = solde - 5000 WHERE id = 1;
UPDATE comptes SET solde = solde + 5000 WHERE id = 3;
COMMIT;
SELECT * FROM comptes;</code></pre>
<ul><li><code>BEGIN TRANSACTION</code> ouvre la transaction.</li>
<li>Les modifications sont faites, mais pas encore définitives.</li>
<li><code>COMMIT</code> les valide toutes d'un coup. Si une panne arrive avant le <code>COMMIT</code>, la base revient automatiquement à l'état d'avant.</li></ul>
<p>Et si on change d'avis, <code>ROLLBACK</code> annule tout ce qui a été fait depuis le <code>BEGIN</code>. Moussa veut envoyer 10 000 F, mais il n'en a que 8000 :</p>
<pre class="sqlx"><code>BEGIN TRANSACTION;
UPDATE comptes SET solde = solde + 10000 WHERE id = 3;
SELECT titulaire, solde FROM comptes;
ROLLBACK;
SELECT titulaire, solde FROM comptes;</code></pre>
<p>Le premier <code>SELECT</code> montre la boutique créditée, le second montre que tout a été annulé. Dans une vraie application, le programme fait <code>ROLLBACK</code> dès qu'une étape échoue : ici, le retrait sur le compte de Moussa aurait été refusé par la règle <code>CHECK (solde &gt;= 0)</code>.</p>
<div class="box plain"><b class="tag">En clair</b><p>Une transaction protège aussi contre deux opérations <strong>en même temps</strong>. Si Awa paie depuis deux téléphones à la même seconde, la base les fait passer l'une après l'autre : son solde ne peut pas être dépensé deux fois.</p></div>` }
  ],
  pitfalls: [
    "Créer un index sur chaque colonne « pour aller plus vite » : les ajouts et modifications deviennent lents, et la base grossit.",
    "Oublier le <code>COMMIT</code> : la transaction reste ouverte, et dans une vraie base les modifications seront perdues à la fermeture.",
    "Faire un transfert en deux instructions sans transaction : une panne entre les deux et la base devient fausse."
  ],
  remember: ["CREATE INDEX nom ON table (colonne); accélère les recherches sur cette colonne.", "Un index prend de la place et ralentit les écritures : à réserver aux colonnes souvent cherchées.", "BEGIN TRANSACTION … COMMIT : tout réussit ensemble, ou rien.", "ROLLBACK annule tout depuis le BEGIN."],
  quiz: [
    { q: "Que veut dire SCAN ventes dans EXPLAIN QUERY PLAN ?", options: ["La table est vide", "SQLite parcourt toute la table", "SQLite utilise un index", "La requête a une erreur"], answer: 1, explain: "SCAN = lecture de toutes les lignes. Avec un index utile, on lit SEARCH … USING INDEX." },
    { q: "Une panne survient entre les deux UPDATE d'un transfert, dans une transaction. Que devient la base ?", options: ["L'argent est perdu", "Elle revient à l'état d'avant le BEGIN", "Le premier UPDATE est gardé", "Elle est corrompue"], answer: 1, explain: "Sans COMMIT, rien n'est définitif : la base annule la transaction et revient à l'état d'avant." },
    { q: "Quel est l'inconvénient d'un index ?", options: ["Il rend les SELECT plus lents", "Il prend de la place et ralentit les écritures", "Il supprime les doublons", "Il empêche les JOIN"], answer: 1, explain: "Un index doit être tenu à jour à chaque écriture, et il occupe de la place." }
  ],
  exercise: {
    task: `Deux tâches :
<ol><li>Awa (compte <code>1</code>) paie <strong>5000 F</strong> à la boutique (compte <code>3</code>). Fais le transfert <strong>dans une transaction</strong>, de <code>BEGIN TRANSACTION</code> à <code>COMMIT</code>.</li>
<li>Les recherches par date sont lentes : crée un index nommé <code>idx_ventes_date</code> sur la colonne <code>date_vente</code> de la table <code>ventes</code>.</li></ol>`,
    hint: `BEGIN TRANSACTION; deux UPDATE comptes SET solde = … WHERE id = …; COMMIT; puis CREATE INDEX idx_ventes_date ON ventes (date_vente);`,
    start: `-- 1. Le transfert de 5000 F, dans une transaction\n\n-- 2. L'index sur les dates de vente\n\n`,
    sol: `BEGIN TRANSACTION;\nUPDATE comptes SET solde = solde - 5000 WHERE id = 1;\nUPDATE comptes SET solde = solde + 5000 WHERE id = 3;\nCOMMIT;\n\nCREATE INDEX idx_ventes_date ON ventes (date_vente);`,
    need: [{ re: /\bBEGIN\b/i, msg: "Ouvre la transaction avec BEGIN TRANSACTION avant les deux UPDATE." }, { re: /\b(COMMIT|END)\b/i, msg: "Termine la transaction avec COMMIT, sinon rien n'est validé." }],
    test: ({ run }) => {
      const open = run("BEGIN"); if (open.error) return "La transaction est restée ouverte : termine-la avec COMMIT."; run("ROLLBACK");
      const s = run("SELECT id, solde FROM comptes ORDER BY id");
      if (s.error) return "La table comptes n'est plus lisible : " + s.error;
      const sol = Object.fromEntries(s.rows);
      if (sol[1] !== 20000 || sol[3] !== 155000 || sol[2] !== 8000) return `Les soldes ne sont pas bons : Awa doit avoir 20000 F (elle a ${sol[1]}), la boutique 155000 F (elle a ${sol[3]}), et Moussa garder 8000 F.`;
      const ix = run("SELECT name FROM pragma_index_info('idx_ventes_date')");
      const tb = run("SELECT tbl_name FROM sqlite_master WHERE type = 'index' AND name = 'idx_ventes_date'");
      if (ix.error || !tb.rows.length) return "L'index idx_ventes_date n'existe pas. Crée-le avec CREATE INDEX idx_ventes_date ON ventes (date_vente);";
      if (String(tb.rows[0][0]).toLowerCase() !== "ventes" || ix.rows.length !== 1 || String(ix.rows[0][0]).toLowerCase() !== "date_vente") return "L'index idx_ventes_date doit porter sur la seule colonne date_vente de la table ventes.";
      return true;
    }
  }
},
/* ------------------------------------------------------------------ */
{ id: "s16", title: "Projet final : le bilan de la boutique", minutes: 45, cs50: 6,
  goal: "Répondre seul à de vraies questions de gestion en combinant tout le cours, comprendre l'injection SQL et savoir s'en protéger, et savoir où continuer.",
  why: `<p>C'est la fin de l'année pour la boutique Nong-Taaba. La gérante veut un bilan : ses meilleurs clients, ses meilleurs mois, les produits à recommander. C'est exactement ce que fait un analyste de données dans une entreprise. Tu as maintenant tous les outils pour le faire.</p>`,
  sections: [
    { h: "La méthode : une question, une requête",
      html: `<p>Devant une question, ne te lance pas tout de suite dans le code. Réponds d'abord à quatre questions :</p>
<ol><li><strong>Quelles tables</strong> contiennent les informations ? (FROM, JOIN)</li>
<li><strong>Quelles lignes</strong> garder ? (WHERE)</li>
<li>Faut-il <strong>regrouper</strong> ? Par quoi ? (GROUP BY, HAVING)</li>
<li>Comment <strong>présenter</strong> le résultat ? (SELECT, ORDER BY, LIMIT)</li></ol>
<p>Puis construis la requête petit à petit, en l'exécutant à chaque étape. Une erreur trouvée tout de suite est facile à corriger.</p>` },
    { h: "Étape 1 : les produits qui rapportent le plus",
      html: `<pre class="sqlx"><code>SELECT p.nom, SUM(v.quantite) AS vendus,
       SUM(v.quantite * p.prix) AS chiffre_affaires
FROM ventes v
JOIN produits p ON v.produit_id = p.id
GROUP BY p.id
ORDER BY chiffre_affaires DESC
LIMIT 5;</code></pre>
<p>Le sac de riz n'a été vendu que 7 fois, mais il arrive en tête : chaque sac rapporte 17 500 F. À l'inverse, le savon est le produit le plus vendu en nombre (enlève <code>LIMIT 5</code> et trie par <code>vendus</code> pour le voir), mais à 250 F pièce, il rapporte peu. Les deux classements disent des choses différentes : choisis celui qui répond à ta question.</p>` },
    { h: "Étape 2 : le meilleur mois, et les produits à recommander",
      html: `<p>Le mois qui a rapporté le plus :</p>
<pre class="sqlx"><code>SELECT strftime('%m', v.date_vente) AS mois,
       COUNT(*) AS ventes,
       SUM(v.quantite * p.prix) AS total
FROM ventes v
JOIN produits p ON v.produit_id = p.id
GROUP BY mois
ORDER BY total DESC
LIMIT 3;</code></pre>
<p>Les produits à recommander d'urgence : ceux qui se vendent (au moins 5 articles vendus) mais dont le stock est presque vide (moins de 15).</p>
<pre class="sqlx"><code>SELECT p.nom, p.stock, SUM(v.quantite) AS vendus
FROM produits p
JOIN ventes v ON v.produit_id = p.id
WHERE p.stock &lt; 15
GROUP BY p.id
HAVING SUM(v.quantite) &gt;= 5
ORDER BY p.stock;</code></pre>` },
    { h: "La sécurité : l'injection SQL",
      html: `<p>Dans une application, les requêtes sont souvent construites avec ce que l'utilisateur tape. Par exemple, une page « Retrouve ton compte avec ton téléphone » qui colle le texte saisi dans la requête :</p>
<pre><code>"SELECT prenom, nom FROM clients WHERE telephone = '" + saisie + "'"</code></pre>
<p>Si quelqu'un tape <code>' OR '1'='1</code>, la requête devient :</p>
<pre class="sqlx"><code>SELECT prenom, nom, telephone FROM clients
WHERE telephone = '' OR '1'='1';</code></pre>
<p>La condition <code>'1'='1'</code> est toujours vraie : la page affiche <strong>tous</strong> les clients et leurs numéros. C'est une <strong>injection SQL</strong>, l'une des failles les plus exploitées du web depuis 25 ans. Elle permet de voler des données, de contourner une connexion, voire d'effacer des tables.</p>
<div class="box why"><b class="tag">À retenir : la protection</b><p>Ne jamais coller un texte saisi dans une requête. On utilise des <strong>requêtes préparées</strong> : la requête contient un <code>?</code> à la place de la valeur, et la base reçoit la valeur à part. Elle la traite alors toujours comme une donnée, jamais comme du code SQL. En Python, avec le module <code>sqlite3</code> :</p>
<pre><code>cur.execute("SELECT prenom, nom FROM clients WHERE telephone = ?", (saisie,))</code></pre></div>` },
    { h: "Et après ?",
      html: `<p>Tu sais maintenant interroger, relier, concevoir, modifier, optimiser et protéger une base de données. Pour aller plus loin :</p>
<ul><li><strong>SQL depuis Python</strong> : le module <code>sqlite3</code> (inclus dans Python) permet d'utiliser une base dans tes programmes. Le cours Python de CELIK Learning te donne les bases pour ça.</li>
<li><strong>PostgreSQL et MySQL</strong> : les SGBD utilisés par les grandes applications. Leur SQL est presque le même que celui de SQLite. Ils ajoutent les comptes utilisateurs, les droits d'accès et le travail à plusieurs serveurs.</li>
<li><strong>CS50 SQL</strong> : le cours de l'université Harvard qui a servi de programme à celui-ci, gratuit et en anglais, avec des exercices plus longs.</li></ul>` }
  ],
  pitfalls: [
    "Écrire toute une longue requête d'un coup, puis chercher où est l'erreur. Construis-la étape par étape.",
    "Coller ce que tape un utilisateur dans une requête : c'est la porte ouverte à l'injection SQL. Utilise des requêtes préparées (<code>?</code>).",
    "Oublier que <code>JOIN clients</code> retire les ventes sans client : pour un chiffre d'affaires total, ne joins pas la table <code>clients</code> si tu n'en as pas besoin."
  ],
  remember: ["Une question : quelles tables, quelles lignes, quels groupes, quelle présentation.", "Construis une requête étape par étape, en l'exécutant à chaque fois.", "L'injection SQL : un texte saisi qui devient du code. La protection : les requêtes préparées avec ?.", "Le même SQL marche dans SQLite, PostgreSQL et MySQL, à quelques détails près."],
  quiz: [
    { q: "Pourquoi la saisie ' OR '1'='1 est-elle dangereuse ?", options: ["Elle fait planter SQLite", "Elle rend la condition toujours vraie et affiche toutes les lignes", "Elle supprime la table", "Elle n'est pas dangereuse"], answer: 1, explain: "Collée dans la requête, elle ajoute OR '1'='1', toujours vrai : le filtre ne filtre plus rien." },
    { q: "Quelle est la bonne protection contre l'injection SQL ?", options: ["Interdire les apostrophes", "Les requêtes préparées avec ? et les valeurs à part", "Écrire les requêtes en minuscules", "Utiliser LIMIT"], answer: 1, explain: "Avec une requête préparée, la valeur n'est jamais lue comme du code SQL, quoi qu'elle contienne." },
    { q: "Pour un classement des clients par total dépensé, quel ensemble d'outils faut-il ?", options: ["WHERE seulement", "JOIN, GROUP BY, SUM, ORDER BY et LIMIT", "INSERT et UPDATE", "CREATE TABLE"], answer: 1, explain: "Il faut assembler ventes, clients et produits, regrouper par client, sommer les montants, trier et garder les premiers." },
    { type: "open", q: "La gérante te demande : « Est-ce que les clients qui paient par Orange Money dépensent plus que ceux qui paient en espèces ? ». Décris en français les étapes de la requête que tu écrirais.", a: "Joindre ventes et produits pour avoir le montant de chaque vente (quantite * prix). Regrouper par paiement (GROUP BY paiement). Pour chaque moyen de paiement, calculer le montant moyen par vente (AVG du montant), et éventuellement le nombre de ventes (COUNT). Comparer les deux lignes Orange Money et Espèces. On peut aussi raisonner par client, avec une CTE qui calcule le total de chaque client par moyen de paiement." }
  ],
  exercise: {
    task: `Le classement des <strong>3 meilleurs clients</strong> de l'année. Pour chacun, affiche : <code>prenom</code>, <code>nom</code>, <code>ville</code>, le nombre d'achats nommé <code>nb_achats</code>, et le total dépensé (somme des quantité fois prix) nommé <code>total_depense</code>. Du plus gros total au plus petit.`,
    hint: `FROM ventes v JOIN clients c ON v.client_id = c.id JOIN produits p ON v.produit_id = p.id, puis GROUP BY c.id, puis ORDER BY total_depense DESC LIMIT 3.`,
    start: `-- 1. Quelles tables ? 2. Quelles lignes ? 3. Quels groupes ? 4. Quelle présentation ?\nSELECT c.prenom, c.nom, c.ville\nFROM ventes v\n`,
    sol: `SELECT c.prenom, c.nom, c.ville,\n       COUNT(*) AS nb_achats,\n       SUM(v.quantite * p.prix) AS total_depense\nFROM ventes v\nJOIN clients c ON v.client_id = c.id\nJOIN produits p ON v.produit_id = p.id\nGROUP BY c.id\nORDER BY total_depense DESC\nLIMIT 3;`,
    names: true, ordered: true
  }
}
  ]
});
})();
