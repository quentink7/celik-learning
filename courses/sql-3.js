/* Cours SQL — Partie 3 : concevoir et écrire (repère CS50 SQL, semaines 2 « Designing » et 3 « Writing ») */
(function () {
  /* La tontine du marché de Rood-Woko : tables créées pour les leçons 11 à 13 */
  const MEMBRES = `CREATE TABLE membres (
  id        INTEGER PRIMARY KEY,
  prenom    TEXT NOT NULL,
  nom       TEXT NOT NULL,
  telephone TEXT UNIQUE,
  adhesion  TEXT NOT NULL DEFAULT '2026-01-01'
);
INSERT INTO membres (prenom, nom, telephone, adhesion) VALUES
('Awa', 'Ouédraogo', '70 41 22 85', '2025-01-05'),
('Rasmata', 'Ouattara', '76 18 90 34', '2025-01-05'),
('Salimata', 'Compaoré', NULL, '2025-02-10'),
('Fatimata', 'Ilboudo', '71 52 67 08', '2025-03-01'),
('Djénéba', 'Sanogo', '65 30 14 77', '2025-06-15'),
('Pascaline', 'Nikiéma', '74 09 81 56', '2026-01-08');`;

  /* Contrôle d'une table créée par l'élève : colonnes attendues [nom, type, clé primaire]. */
  function columnsMsg(run, table, want) {
    const r = run(`SELECT name, upper(type), pk FROM pragma_table_info('${table}')`);
    if (r.error || !r.rows.length) return `La table ${table} n'existe pas. Vérifie ton CREATE TABLE ${table} (…) et son orthographe.`;
    if (r.rows.length !== want.length) return `La table ${table} a ${r.rows.length} colonnes, il en faut ${want.length} : ${want.map(w => w[0]).join(", ")}.`;
    for (let i = 0; i < want.length; i++) {
      const [n, t, pk] = r.rows[i], [wn, wt, wpk] = want[i];
      if (String(n).toLowerCase() !== wn) return `La colonne ${i + 1} doit s'appeler ${wn} (elle s'appelle ${n}). Respecte l'ordre de la consigne.`;
      if (t !== wt) return `La colonne ${wn} doit être de type ${wt} (elle est de type ${t || "non précisé"}).`;
      if (!!pk !== !!wpk) return wpk ? `La colonne ${wn} doit être la clé primaire : ${wn} INTEGER PRIMARY KEY.` : `Seule la colonne id doit être la clé primaire.`;
    }
    return true;
  }

(window.SQL_PARTS = window.SQL_PARTS || []).push({
  title: "Concevoir et écrire",
  lessons: [
/* ------------------------------------------------------------------ */
{ id: "s10", title: "Concevoir une base : CREATE TABLE et les types", minutes: 30, cs50: 2,
  goal: "Passer d'un besoin réel à des tables bien pensées, créer une table avec CREATE TABLE et choisir le bon type pour chaque colonne.",
  why: `<p>Jusqu'ici, tu as interrogé une base construite par quelqu'un d'autre. Maintenant, tu vas construire la tienne. Une base bien conçue dès le départ évite des années de problèmes : données en double, informations qui se contredisent, questions impossibles à poser. C'est le travail d'un concepteur de base de données.</p>`,
  sections: [
    { h: "Le besoin : la tontine du marché",
      html: `<p>Les commerçantes du marché de <strong>Rood-Woko</strong> ont une <strong>tontine</strong> : chaque mois, chaque membre verse sa cotisation, et à tour de rôle une membre reçoit la cagnotte. La trésorière tient tout dans un cahier, et veut passer à une base de données.</p>
<p>Avant d'écrire du SQL, on se pose trois questions :</p>
<ol><li><strong>De quelles choses parle-t-on ?</strong> Des membres, et des cotisations versées.</li>
<li><strong>Que sait-on de chaque chose ?</strong> Une membre a un prénom, un nom, un téléphone, une date d'adhésion. Une cotisation a un montant, un mois, et la membre qui l'a versée.</li>
<li><strong>Comment sont-elles reliées ?</strong> Une membre verse <strong>plusieurs</strong> cotisations ; une cotisation est versée par <strong>une</strong> membre.</li></ol>
<p>Chaque « chose » devient une table, chaque information une colonne, et chaque lien une clé étrangère :</p>
<div class="trace"><table><thead><tr><th>Table</th><th>Colonnes</th></tr></thead><tbody>
<tr><td>membres</td><td>id, prenom, nom, telephone, adhesion</td></tr>
<tr><td>cotisations</td><td>id, membre_id → membres.id, montant, mois</td></tr>
</tbody></table></div>
<div class="box plain"><b class="tag">En clair</b><p>On appelle ça <strong>normaliser</strong> : ranger les données pour que chaque information soit écrite <strong>une seule fois</strong>, au bon endroit. Le nom d'une membre est dans <code>membres</code>, pas recopié dans chaque cotisation.</p></div>` },
    { h: "CREATE TABLE",
      html: `<p>On crée une table en donnant son nom, puis, entre parenthèses, chaque colonne avec son <strong>type</strong>, séparées par des virgules :</p>
<pre class="sqlx"><code>CREATE TABLE membres (
  id        INTEGER PRIMARY KEY,
  prenom    TEXT,
  nom       TEXT,
  telephone TEXT,
  adhesion  TEXT
);
SELECT * FROM membres;</code></pre>
<p>La table existe, mais elle est vide : le <code>SELECT</code> ne renvoie aucune ligne. On la remplira dans la leçon 12.</p>
<ul><li><code>INTEGER PRIMARY KEY</code> : la colonne <code>id</code> est la clé primaire. Dans SQLite, elle se remplit <strong>toute seule</strong> (1, 2, 3…) quand on ajoute une ligne sans préciser l'id.</li>
<li>Les espaces pour aligner les types ne sont pas obligatoires : c'est juste plus lisible.</li></ul>
<p>Pour voir les colonnes d'une table, SQLite a une fonction spéciale :</p>
<pre class="sqlx"><code>SELECT name, type, pk FROM pragma_table_info('produits');</code></pre>` },
    { h: "Les types de SQLite",
      html: `<div class="table-wrap"><table><thead><tr><th>Type</th><th>Contient</th><th>Exemples</th></tr></thead><tbody>
<tr><td><code>INTEGER</code></td><td>des nombres entiers</td><td>un id, un stock, un prix en francs CFA</td></tr>
<tr><td><code>REAL</code></td><td>des nombres à virgule</td><td>un poids (2.5 kg), une note sur 20 (14.5)</td></tr>
<tr><td><code>TEXT</code></td><td>du texte</td><td>un nom, un téléphone, une date</td></tr>
<tr><td><code>BLOB</code></td><td>des données brutes</td><td>une image, un fichier</td></tr>
</tbody></table></div>
<p>Et <code>NULL</code> pour une case vide, quel que soit le type.</p>
<div class="box why"><b class="tag">À retenir : trois choix qui piègent</b><ul>
<li><strong>Un téléphone est un TEXT</strong>, pas un nombre : on ne fait pas de calcul avec, il a des espaces, et un numéro qui commence par 0 perdrait son zéro.</li>
<li><strong>Un prix en francs CFA est un INTEGER</strong> : il n'y a pas de centimes. Les nombres à virgule (REAL) font de petites erreurs d'arrondi, à éviter pour de l'argent.</li>
<li><strong>Une date est un TEXT</strong> au format <code>'AAAA-MM-JJ'</code> : SQLite n'a pas de type date, mais ce format se trie bien et marche avec <code>strftime</code>.</li></ul></div>
<p>SQLite est souple : il accepte d'autres noms de types (<code>VARCHAR(50)</code>, <code>NUMERIC</code>, <code>BOOLEAN</code>…) et les range dans l'une des familles ci-dessus. Les autres SGBD, comme PostgreSQL, sont plus stricts : prends l'habitude d'utiliser les quatre types du tableau.</p>` },
    { h: "Supprimer une table : DROP TABLE",
      html: `<p><code>DROP TABLE nom;</code> supprime une table <strong>et toutes ses données</strong>, sans demander de confirmation.</p>
<pre class="sqlx"><code>CREATE TABLE essai (id INTEGER PRIMARY KEY, note TEXT);
DROP TABLE essai;
SELECT name FROM sqlite_master WHERE type = 'table';</code></pre>
<p>La dernière requête liste les tables de la base : <code>essai</code> n'y est plus. Ici, rien de grave : chaque exécution repart de la base d'origine. Dans une vraie base, un <code>DROP TABLE</code> par erreur peut effacer des années de données : on fait toujours une sauvegarde avant.</p>` }
  ],
  pitfalls: [
    "Oublier une virgule entre deux colonnes, ou en mettre une en trop après la dernière : erreur de syntaxe près de la parenthèse.",
    "Stocker un téléphone en INTEGER : les espaces sont refusés et un zéro au début disparaît. Un numéro est un TEXT.",
    "Créer une table qui existe déjà : erreur <code>table … already exists</code>. <code>CREATE TABLE IF NOT EXISTS</code> évite l'erreur."
  ],
  remember: ["Concevoir : quelles choses (tables), quelles informations (colonnes), quels liens (clés étrangères).", "CREATE TABLE nom (colonne TYPE, …);", "Les types : INTEGER, REAL, TEXT, BLOB, et NULL pour une case vide.", "INTEGER PRIMARY KEY se remplit tout seul dans SQLite."],
  quiz: [
    { q: "Quel type choisir pour un numéro de téléphone ?", options: ["INTEGER", "REAL", "TEXT", "BLOB"], answer: 2, explain: "On ne calcule pas avec un téléphone, il contient des espaces et peut commencer par 0 : c'est du texte." },
    { q: "Une membre verse plusieurs cotisations. Où met-on la clé étrangère ?", options: ["Dans membres : cotisation_id", "Dans cotisations : membre_id", "Dans les deux", "Nulle part"], answer: 1, explain: "Chaque cotisation appartient à une seule membre : c'est elle qui garde membre_id. Une membre ne pourrait pas garder une liste de cotisations dans une seule case." },
    { q: "Que fait DROP TABLE cotisations; ?", options: ["Vide la table mais la garde", "Supprime la table et toutes ses données", "Affiche la table", "Annule la dernière modification"], answer: 1, explain: "DROP TABLE supprime tout : la table et son contenu, sans confirmation." }
  ],
  exercise: {
    task: `Crée la table <code>membres</code> de la tontine, avec ces 5 colonnes, dans cet ordre : <code>id</code> (entier, <strong>clé primaire</strong>), <code>prenom</code> (texte), <code>nom</code> (texte), <code>telephone</code> (texte) et <code>adhesion</code> (la date d'adhésion, en texte).`,
    hint: `CREATE TABLE membres ( id INTEGER PRIMARY KEY, prenom TEXT, … ); avec une virgule entre les colonnes, mais pas après la dernière.`,
    start: `CREATE TABLE membres (\n\n);\n`,
    sol: `CREATE TABLE membres (\n  id        INTEGER PRIMARY KEY,\n  prenom    TEXT,\n  nom       TEXT,\n  telephone TEXT,\n  adhesion  TEXT\n);`,
    test: ({ run }) => columnsMsg(run, "membres", [["id", "INTEGER", 1], ["prenom", "TEXT", 0], ["nom", "TEXT", 0], ["telephone", "TEXT", 0], ["adhesion", "TEXT", 0]])
  }
},
/* ------------------------------------------------------------------ */
{ id: "s11", title: "Les contraintes : des règles qui protègent les données", minutes: 30, cs50: 2,
  setup: MEMBRES,
  goal: "Ajouter des règles à une table (NOT NULL, UNIQUE, CHECK, DEFAULT, FOREIGN KEY) pour que la base refuse toute seule les données incorrectes, et modifier une table avec ALTER TABLE.",
  why: `<p>Une base reçoit des données de partout : un formulaire, une application, une personne pressée. Si elle accepte une cotisation de -5000 F ou un membre sans nom, tous les calculs deviennent faux. Les contraintes sont des règles que la base vérifie elle-même, à chaque ajout, sans qu'on puisse les oublier.</p>`,
  sections: [
    { h: "NOT NULL et DEFAULT",
      html: `<p>Dans la leçon 10, toutes les colonnes acceptaient <code>NULL</code>. Pour la tontine, on a recréé la table <code>membres</code> avec des règles :</p>
<pre><code>CREATE TABLE membres (
  id        INTEGER PRIMARY KEY,
  prenom    TEXT NOT NULL,
  nom       TEXT NOT NULL,
  telephone TEXT UNIQUE,
  adhesion  TEXT NOT NULL DEFAULT '2026-01-01'
);</code></pre>
<ul><li><code>NOT NULL</code> : la case est <strong>obligatoire</strong>. Une membre sans prénom est refusée.</li>
<li><code>DEFAULT valeur</code> : si on ne donne pas de valeur, la base met celle-ci.</li></ul>
<p>Cette table existe déjà dans la base de cette leçon, avec 6 membres :</p>
<pre class="sqlx"><code>SELECT * FROM membres;</code></pre>
<p>Essayons d'ajouter une membre sans prénom :</p>
<pre class="sqlx"><code>INSERT INTO membres (nom) VALUES ('Kaboré');</code></pre>
<p>La base refuse, avec un message clair : la règle a fonctionné.</p>` },
    { h: "UNIQUE et CHECK",
      html: `<ul><li><code>UNIQUE</code> : deux lignes ne peuvent pas avoir la même valeur. Deux membres avec le même téléphone, c'est sûrement une erreur de saisie.</li>
<li><code>CHECK (condition)</code> : la base refuse toute ligne pour laquelle la condition est fausse.</li></ul>
<pre class="sqlx"><code>INSERT INTO membres (prenom, nom, telephone)
VALUES ('Mariam', 'Zongo', '70 41 22 85');</code></pre>
<p>Refusé : ce numéro est déjà celui d'Awa. Un <code>CHECK</code> s'écrit dans la définition de la colonne :</p>
<pre class="sqlx"><code>CREATE TABLE epargne (
  id      INTEGER PRIMARY KEY,
  montant INTEGER NOT NULL CHECK (montant &gt; 0)
);
INSERT INTO epargne (montant) VALUES (-5000);</code></pre>
<div class="box plain"><b class="tag">En clair</b><p>Attention : <code>CHECK (montant &gt; 0)</code> laisse passer <code>NULL</code>, car « inconnu &gt; 0 » n'est pas faux, juste inconnu. Pour qu'un montant soit obligatoire <strong>et</strong> positif, il faut les deux : <code>NOT NULL CHECK (montant &gt; 0)</code>.</p></div>` },
    { h: "La clé étrangère : REFERENCES",
      html: `<p>Pour qu'une cotisation pointe forcément vers une membre qui existe, on écrit <code>REFERENCES membres(id)</code> :</p>
<pre class="sqlx"><code>CREATE TABLE prets (
  id        INTEGER PRIMARY KEY,
  membre_id INTEGER NOT NULL REFERENCES membres(id),
  montant   INTEGER NOT NULL
);
INSERT INTO prets (membre_id, montant) VALUES (99, 20000);</code></pre>
<p>Refusé : il n'y a pas de membre numéro 99. La base garantit qu'aucune ligne ne pointe dans le vide. C'est aussi pour ça qu'on ne peut pas supprimer une membre qui a encore des prêts.</p>
<div class="box why"><b class="tag">À retenir</b><p>Dans SQLite, les clés étrangères ne sont vérifiées que si on l'active avec <code>PRAGMA foreign_keys = ON;</code>. Sur ce site, c'est déjà fait pour toi. Dans un vrai projet SQLite, pense à l'écrire au début.</p></div>` },
    { h: "Modifier une table : ALTER TABLE",
      html: `<p>Une table peut évoluer. <code>ALTER TABLE</code> permet d'ajouter une colonne, ou de renommer :</p>
<pre class="sqlx"><code>ALTER TABLE membres ADD COLUMN quartier TEXT;
ALTER TABLE membres RENAME COLUMN adhesion TO date_adhesion;
SELECT * FROM membres LIMIT 3;</code></pre>
<p>Les membres déjà inscrites ont <code>NULL</code> dans la nouvelle colonne : on ne connaît pas encore leur quartier. On peut aussi renommer la table entière : <code>ALTER TABLE membres RENAME TO adherentes;</code>.</p>` }
  ],
  pitfalls: [
    "Croire que <code>CHECK (montant &gt; 0)</code> rend la colonne obligatoire : un <code>NULL</code> passe. Ajoute <code>NOT NULL</code>.",
    "Écrire <code>REFERENCES membres</code> vers une table qui n'existe pas encore : il faut créer <code>membres</code> avant <code>cotisations</code>.",
    "Ajouter avec <code>ALTER TABLE</code> une colonne <code>NOT NULL</code> sans <code>DEFAULT</code> : SQLite refuse, car les lignes existantes n'auraient pas de valeur."
  ],
  remember: ["NOT NULL : obligatoire. DEFAULT : valeur par défaut.", "UNIQUE : pas de doublon. CHECK (condition) : la condition doit être vraie.", "REFERENCES table(id) : la clé étrangère doit exister.", "ALTER TABLE … ADD COLUMN / RENAME pour faire évoluer une table."],
  quiz: [
    { q: "Quelle contrainte empêche deux membres d'avoir le même téléphone ?", options: ["NOT NULL", "UNIQUE", "CHECK", "DEFAULT"], answer: 1, explain: "UNIQUE interdit qu'une même valeur apparaisse deux fois dans la colonne." },
    { q: "Une colonne est définie montant INTEGER CHECK (montant > 0). Quelle valeur est acceptée ?", options: ["-100", "0", "NULL", "Aucune des trois"], answer: 2, explain: "NULL n'est ni vrai ni faux pour le CHECK : il passe. Pour l'interdire, il faut NOT NULL." },
    { q: "Que se passe-t-il si on ajoute une cotisation avec membre_id = 99 alors qu'il n'y a pas de membre 99 ?", options: ["La ligne est ajoutée", "La membre 99 est créée", "La base refuse (FOREIGN KEY constraint failed)", "membre_id devient NULL"], answer: 2, explain: "REFERENCES membres(id) oblige membre_id à correspondre à une membre existante." }
  ],
  exercise: {
    task: `La table <code>membres</code> existe déjà. Crée la table <code>cotisations</code> avec 4 colonnes, dans cet ordre :
<ul><li><code>id</code> : entier, clé primaire ;</li>
<li><code>membre_id</code> : entier, <strong>obligatoire</strong>, qui fait référence à <code>membres(id)</code> ;</li>
<li><code>montant</code> : entier, <strong>obligatoire</strong> et <strong>strictement positif</strong> ;</li>
<li><code>mois</code> : texte <strong>obligatoire</strong> (par exemple <code>'2026-10'</code>).</li></ul>
La correction essaie ensuite d'ajouter de bonnes et de mauvaises cotisations : ta table doit accepter les bonnes et refuser les mauvaises.`,
    hint: `montant INTEGER NOT NULL CHECK (montant > 0), et membre_id INTEGER NOT NULL REFERENCES membres(id).`,
    start: `CREATE TABLE cotisations (\n  id INTEGER PRIMARY KEY,\n\n);\n`,
    sol: `CREATE TABLE cotisations (\n  id        INTEGER PRIMARY KEY,\n  membre_id INTEGER NOT NULL REFERENCES membres(id),\n  montant   INTEGER NOT NULL CHECK (montant > 0),\n  mois      TEXT NOT NULL\n);`,
    test: ({ run }) => {
      const c = columnsMsg(run, "cotisations", [["id", "INTEGER", 1], ["membre_id", "INTEGER", 0], ["montant", "INTEGER", 0], ["mois", "TEXT", 0]]);
      if (c !== true) return c;
      const ins = v => run(`INSERT INTO cotisations (membre_id, montant, mois) VALUES (${v})`);
      if (ins("1, 5000, '2026-10'").error) return "Une cotisation correcte (membre 1, 5000 F, '2026-10') a été refusée. Vérifie tes règles.";
      const bad = [
        ["99, 5000, '2026-10'", "Une cotisation de la membre 99, qui n'existe pas, a été acceptée : ajoute REFERENCES membres(id) à membre_id."],
        ["NULL, 5000, '2026-10'", "Une cotisation sans membre a été acceptée : membre_id doit être NOT NULL."],
        ["1, 0, '2026-10'", "Une cotisation de 0 F a été acceptée : ajoute CHECK (montant > 0)."],
        ["1, -2000, '2026-10'", "Une cotisation négative a été acceptée : ajoute CHECK (montant > 0)."],
        ["1, NULL, '2026-10'", "Une cotisation sans montant a été acceptée : montant doit être NOT NULL (le CHECK seul laisse passer NULL)."],
        ["1, 5000, NULL", "Une cotisation sans mois a été acceptée : mois doit être NOT NULL."]
      ];
      for (const [v, msg] of bad) if (!ins(v).error) return msg;
      return true;
    }
  }
},
/* ------------------------------------------------------------------ */
{ id: "s12", title: "Ajouter des données : INSERT INTO", minutes: 25, cs50: 3,
  setup: MEMBRES,
  goal: "Ajouter une ou plusieurs lignes avec INSERT INTO, laisser la base remplir l'id, écrire un texte qui contient une apostrophe, et copier des lignes avec INSERT … SELECT.",
  why: `<p>Chaque inscription sur un site, chaque paiement Orange Money, chaque vente enregistrée en caisse est un <code>INSERT</code>. C'est l'instruction qui fait vivre une base de données.</p>`,
  sections: [
    { h: "Ajouter une ligne",
      html: `<p>On écrit la table, la liste des colonnes qu'on remplit, puis les valeurs <strong>dans le même ordre</strong> :</p>
<pre class="sqlx"><code>INSERT INTO produits (nom, categorie, prix, stock)
VALUES ('Attiéké 1 kg', 'Alimentation', 500, 30);
SELECT * FROM produits ORDER BY id DESC LIMIT 2;</code></pre>
<ul><li>On n'a pas donné d'<code>id</code> : SQLite a choisi le suivant tout seul (26).</li>
<li>Le message « 1 ligne ajoutée » confirme que l'instruction a marché.</li>
<li>Le <code>SELECT</code> à la fin sert à vérifier. Prends cette habitude.</li></ul>
<div class="box plain"><b class="tag">En clair</b><p>Chaque exécution sur ce site repart de la base d'origine. L'attiéké ajouté disparaît donc à l'exécution suivante. Dans une vraie base, l'ajout serait définitif.</p></div>` },
    { h: "Les colonnes oubliées",
      html: `<p>Une colonne qu'on ne cite pas reçoit sa valeur par défaut (<code>DEFAULT</code>), ou <code>NULL</code> s'il n'y en a pas. Dans la tontine, la date d'adhésion a un <code>DEFAULT</code> :</p>
<pre class="sqlx"><code>INSERT INTO membres (prenom, nom) VALUES ('Kadidia', 'Diarra');
SELECT * FROM membres WHERE nom = 'Diarra';</code></pre>
<p>Le téléphone est vide (<code>NULL</code>) et la date est celle du <code>DEFAULT</code>. Mais une colonne <code>NOT NULL</code> sans défaut doit toujours être donnée, sinon la base refuse.</p>` },
    { h: "Plusieurs lignes d'un coup",
      html: `<p>On sépare les groupes de valeurs par des virgules :</p>
<pre class="sqlx"><code>INSERT INTO membres (prenom, nom, telephone, adhesion) VALUES
  ('Bintou', 'Kinda', '78 25 40 11', '2026-10-01'),
  ('Habibou', 'Tapsoba', NULL, '2026-10-01');
SELECT prenom, nom, adhesion FROM membres;</code></pre>
<p>C'est plus rapide que deux <code>INSERT</code> séparés, et c'est tout ou rien : si une ligne est refusée, aucune n'est ajoutée.</p>` },
    { h: "Le piège de l'apostrophe",
      html: `<p>Le texte est entouré d'apostrophes. Alors comment écrire <em>Patte d'Oie</em>, un quartier de Ouagadougou ? Avec une seule apostrophe, SQLite croit que le texte s'arrête après « Patte d ». La règle : on <strong>double</strong> l'apostrophe à l'intérieur du texte.</p>
<pre class="sqlx"><code>INSERT INTO clients (prenom, nom, ville, quartier, inscrit_le)
VALUES ('Ramata', 'Ouédraogo', 'Ouagadougou', 'Patte d''Oie', '2026-10-01');
SELECT prenom, quartier FROM clients WHERE quartier LIKE 'Patte%';</code></pre>
<p>On écrit <code>''</code> (deux apostrophes), et la base garde une seule apostrophe. Même chose pour <em>Fada N'Gourma</em> : <code>'Fada N''Gourma'</code>.</p>` },
    { h: "Copier avec INSERT … SELECT",
      html: `<p>Au lieu de <code>VALUES</code>, on peut mettre une requête : toutes les lignes qu'elle renvoie sont ajoutées. Inscrivons à la tontine les clientes de Bobo-Dioulasso de la boutique :</p>
<pre class="sqlx"><code>INSERT INTO membres (prenom, nom, telephone)
SELECT prenom, nom, telephone FROM clients WHERE ville = 'Bobo-Dioulasso';
SELECT prenom, nom, telephone FROM membres;</code></pre>
<p>Les colonnes du <code>SELECT</code> remplissent celles de l'<code>INSERT</code>, dans l'ordre.</p>` }
  ],
  pitfalls: [
    "Donner les valeurs dans un autre ordre que les colonnes : <code>(nom, prix) VALUES (500, 'Attiéké')</code> met le prix dans le nom. SQLite ne dit rien : sois attentif.",
    "Écrire <code>'Patte d'Oie'</code> avec une seule apostrophe : erreur de syntaxe. Il faut <code>'Patte d''Oie'</code>.",
    "Oublier la liste des colonnes : <code>INSERT INTO produits VALUES ('Attiéké', …)</code> oblige à donner <strong>toutes</strong> les colonnes, id compris. Cite toujours les colonnes."
  ],
  remember: ["INSERT INTO table (colonnes) VALUES (valeurs);", "Sans id, SQLite le choisit tout seul.", "Une colonne oubliée prend son DEFAULT, ou NULL.", "Une apostrophe dans un texte se double : 'Patte d''Oie'."],
  quiz: [
    { q: "Comment écrire le texte Fada N'Gourma en SQL ?", options: ["'Fada N'Gourma'", "\"Fada N'Gourma\"", "'Fada N''Gourma'", "'Fada N\\Gourma'"], answer: 2, explain: "Dans un texte entre apostrophes, une apostrophe se double." },
    { q: "On ajoute un produit sans préciser d'id. Que se passe-t-il ?", options: ["Erreur : id est obligatoire", "L'id reste vide", "SQLite donne le numéro suivant tout seul", "L'id vaut 0"], answer: 2, explain: "Une colonne INTEGER PRIMARY KEY se remplit automatiquement avec le numéro suivant." },
    { q: "Dans un INSERT de 3 lignes, la 2e est refusée par une contrainte. Combien de lignes sont ajoutées ?", options: ["0", "1", "2", "3"], answer: 0, explain: "Une seule instruction INSERT est tout ou rien : si une ligne est refusée, aucune n'est ajoutée." }
  ],
  exercise: {
    task: `Deux nouvelles clientes s'inscrivent le <code>2026-10-01</code>. Ajoute-les à la table <code>clients</code>, <strong>dans cet ordre</strong>, sans donner d'id :
<ul><li><strong>Ramata Ouédraogo</strong>, Ouagadougou, quartier <strong>Patte d'Oie</strong>, téléphone <code>70 25 81 46</code> ;</li>
<li><strong>Bachir Sorgho</strong>, Koudougou, quartier et téléphone inconnus.</li></ul>`,
    hint: `INSERT INTO clients (prenom, nom, ville, quartier, telephone, inscrit_le) VALUES (…), (…); Pour Patte d'Oie, double l'apostrophe. Pour une information inconnue, écris NULL.`,
    start: `INSERT INTO clients (prenom, nom, ville, quartier, telephone, inscrit_le)\nVALUES\n`,
    sol: `INSERT INTO clients (prenom, nom, ville, quartier, telephone, inscrit_le)\nVALUES\n  ('Ramata', 'Ouédraogo', 'Ouagadougou', 'Patte d''Oie', '70 25 81 46', '2026-10-01'),\n  ('Bachir', 'Sorgho', 'Koudougou', NULL, NULL, '2026-10-01');`,
    mode: "state",
    verify: `SELECT id, prenom, nom, ville, quartier, telephone, inscrit_le FROM clients ORDER BY id`,
    stateMsg: "Après ton code, la table clients n'est pas celle attendue. Vérifie l'orthographe, le quartier « Patte d'Oie », les NULL pour ce qui est inconnu, la date, et l'ordre des deux clientes."
  }
},
/* ------------------------------------------------------------------ */
{ id: "s13", title: "Modifier et supprimer : UPDATE, DELETE et les triggers", minutes: 35, cs50: 3,
  goal: "Modifier des lignes avec UPDATE, en supprimer avec DELETE sans tout effacer par erreur, et automatiser une modification avec un trigger.",
  why: `<p>Les prix changent, les clients déménagent, des produits ne sont plus vendus. <code>UPDATE</code> et <code>DELETE</code> sont indispensables, mais ce sont aussi les instructions les plus dangereuses : une seule ligne mal écrite peut modifier toute une table. Cette leçon t'apprend les bons réflexes.</p>`,
  sections: [
    { h: "UPDATE : modifier des lignes",
      html: `<p><code>UPDATE table SET colonne = valeur WHERE condition;</code> modifie les lignes qui respectent la condition.</p>
<pre class="sqlx"><code>UPDATE clients SET telephone = '76 50 12 39' WHERE id = 5;
SELECT prenom, nom, telephone FROM clients WHERE id = 5;</code></pre>
<p>On peut modifier plusieurs colonnes à la fois, et utiliser la valeur actuelle dans un calcul. Le savon augmente de 50 F, et on reçoit 20 pièces :</p>
<pre class="sqlx"><code>UPDATE produits
SET prix = prix + 50, stock = stock + 20
WHERE nom = 'Savon en morceau';
SELECT nom, prix, stock FROM produits WHERE id = 11;</code></pre>
<div class="box pitfall"><b class="tag">Le danger</b><p>Sans <code>WHERE</code>, <strong>toutes</strong> les lignes sont modifiées : <code>UPDATE clients SET telephone = '76 50 12 39';</code> donne le même numéro aux 30 clients. Il n'y a pas de bouton « annuler ».</p></div>` },
    { h: "Le bon réflexe : SELECT d'abord",
      html: `<p>Avant un <code>UPDATE</code> ou un <code>DELETE</code>, écris d'abord un <code>SELECT</code> avec <strong>le même WHERE</strong>. Tu vois exactement quelles lignes seront touchées. Si c'est bon, tu remplaces <code>SELECT</code> par <code>UPDATE</code> ou <code>DELETE</code>.</p>
<pre class="sqlx"><code>SELECT id, nom, stock FROM produits WHERE stock = 0;</code></pre>
<p>Deux produits sont en rupture. Le message « N lignes modifiées » après un <code>UPDATE</code> est aussi un bon contrôle : si tu attends 2 et que tu lis 25, il y a un problème.</p>` },
    { h: "DELETE : supprimer des lignes",
      html: `<p><code>DELETE FROM table WHERE condition;</code> supprime les lignes qui respectent la condition. Les produits jamais vendus, par exemple :</p>
<pre class="sqlx"><code>DELETE FROM produits
WHERE id NOT IN (SELECT produit_id FROM ventes);
SELECT COUNT(*) AS produits_restants FROM produits;</code></pre>
<p>Et si on veut supprimer un produit qui a déjà été vendu ?</p>
<pre class="sqlx"><code>DELETE FROM produits WHERE id = 3;</code></pre>
<p>Refusé : des ventes pointent vers ce produit (clé étrangère). La base protège l'historique : sinon, ces ventes pointeraient vers un produit qui n'existe plus.</p>
<div class="box plain"><b class="tag">En clair : la suppression douce</b><p>Souvent, on ne supprime pas vraiment. On ajoute une colonne <code>actif</code> (1 = oui, 0 = non) et on fait <code>UPDATE produits SET actif = 0 WHERE id = 3;</code>. Le produit n'est plus proposé, mais l'historique des ventes reste juste. C'est ce que font la plupart des applications.</p></div>` },
    { h: "Les triggers : une action automatique",
      html: `<p>Un <strong>trigger</strong> (déclencheur) est une instruction que la base exécute <strong>toute seule</strong> quand quelque chose se passe. Exemple : à chaque nouvelle vente, le stock du produit doit baisser.</p>
<pre class="sqlx"><code>CREATE TRIGGER baisse_stock
AFTER INSERT ON ventes
BEGIN
  UPDATE produits SET stock = stock - NEW.quantite
  WHERE id = NEW.produit_id;
END;

INSERT INTO ventes (client_id, produit_id, quantite, date_vente, paiement)
VALUES (1, 3, 2, '2026-10-01', 'Espèces');
SELECT nom, stock FROM produits WHERE id = 3;</code></pre>
<ul><li><code>AFTER INSERT ON ventes</code> : après chaque ajout dans <code>ventes</code>.</li>
<li><code>NEW</code> désigne la ligne qu'on vient d'ajouter : <code>NEW.quantite</code>, <code>NEW.produit_id</code>.</li>
<li>Le stock du sucre est passé de 45 à 43, sans qu'on écrive l'<code>UPDATE</code> nous-mêmes.</li></ul>
<p>Il existe aussi <code>BEFORE</code>, et des triggers sur <code>UPDATE</code> et <code>DELETE</code> (avec <code>OLD</code> pour l'ancienne ligne).</p>` }
  ],
  pitfalls: [
    "Oublier le <code>WHERE</code> d'un <code>UPDATE</code> ou d'un <code>DELETE</code> : toute la table est touchée.",
    "Écrire <code>SET prix = 10%</code> pour augmenter de 10 % : il faut un calcul, <code>SET prix = prix * 1.1</code>.",
    "Utiliser <code>=</code> au lieu de <code>IN</code> avec une sous-requête qui renvoie plusieurs lignes : seule la première est prise en compte."
  ],
  remember: ["UPDATE table SET col = valeur WHERE condition;", "DELETE FROM table WHERE condition;", "Toujours un SELECT avec le même WHERE avant de modifier ou supprimer.", "Un trigger exécute une action automatiquement ; NEW est la nouvelle ligne."],
  quiz: [
    { q: "Que fait UPDATE produits SET stock = 0; ?", options: ["Met à 0 le stock du premier produit", "Met à 0 le stock de tous les produits", "Erreur : il manque WHERE", "Rien"], answer: 1, explain: "Sans WHERE, toutes les lignes sont modifiées. SQLite ne demande pas de confirmation." },
    { q: "Pourquoi DELETE FROM produits WHERE id = 3; est-il refusé ?", options: ["Le produit 3 n'existe pas", "Des ventes font référence à ce produit (clé étrangère)", "DELETE est interdit", "Il faut DROP"], answer: 1, explain: "La clé étrangère produit_id protège les ventes : on ne peut pas supprimer un produit encore utilisé." },
    { q: "Dans un trigger AFTER INSERT ON ventes, que désigne NEW.quantite ?", options: ["La quantité de la vente qu'on vient d'ajouter", "La quantité totale vendue", "Le stock du produit", "Une nouvelle colonne"], answer: 0, explain: "NEW est la ligne qui vient d'être ajoutée ; NEW.quantite est sa quantité." }
  ],
  exercise: {
    task: `Deux changements dans la boutique, en deux instructions :
<ol><li>Le prix de tous les produits de la catégorie <code>Alimentation</code> augmente de <strong>10 %</strong>.</li>
<li>La gérante retire de la vente les produits qui n'ont <strong>jamais été vendus</strong> : supprime-les de la table <code>produits</code>.</li></ol>`,
    hint: `1. UPDATE produits SET prix = prix * 1.1 WHERE categorie = 'Alimentation'; 2. DELETE FROM produits WHERE id NOT IN (SELECT produit_id FROM ventes);`,
    start: `-- 1. Augmenter les prix de l'alimentation de 10 %\n\n-- 2. Supprimer les produits jamais vendus\n\n`,
    sol: `UPDATE produits SET prix = prix * 1.1 WHERE categorie = 'Alimentation';\nDELETE FROM produits WHERE id NOT IN (SELECT produit_id FROM ventes);`,
    mode: "state",
    verify: `SELECT id, nom, categorie, prix, stock FROM produits ORDER BY id`,
    stateMsg: "Après ton code, la table produits n'est pas celle attendue. Vérifie que seuls les prix de l'alimentation augmentent (de 10 %), et que seuls les produits jamais vendus sont supprimés."
  }
}
  ]
});
})();
