# CELIK Learning — plateforme de cours Python, SQL, C et Machine Learning

Site statique (HTML, CSS, JavaScript, sans étape de compilation) avec :

- une page d'accueil où l'élève choisit **Python**, **Machine Learning**, **SQL** ou **C** ;
- la **connexion par email** (mot de passe, ou lien magique sans mot de passe) via Supabase ;
- la **sauvegarde de la progression** dans le compte de l'élève (leçons terminées, scores de quiz, code en cours) ;
- un **cours Python** de 16 leçons avec une console Python intégrée (le code s'exécute dans le navigateur) et des exercices corrigés automatiquement ;
- un **cours Machine Learning** de 16 modules (9 de ML, 7 de maths placés juste avant le module qui en a besoin), avec explications « En clair », calculs « Pas à pas », pièges fréquents, démos interactives, quiz et mots-clés ;
- un **cours SQL** de 16 leçons, dont le programme suit CS50 SQL (Harvard), avec SQLite intégré (les requêtes s'exécutent dans le navigateur), une base d'exemple (la boutique Nong-Taaba, à Ouagadougou) et des exercices corrigés automatiquement ;
- un **cours de langage C** de 16 leçons, dont le programme suit les semaines 1 à 5 de CS50x (Harvard), avec un vrai compilateur C (xcc) qui tourne dans le navigateur et des exercices corrigés automatiquement.

Le nom et le slogan se changent dans `assets/config.js`. Le design (« l'étoffe ») est décrit dans `CLAUDE.md`.

---

## 1. Tester sur ton ordinateur

Le site doit être servi par un petit serveur web (pas en double-cliquant sur le fichier).

```bash
cd celik-learning
python -m http.server 8000
```

Puis ouvre http://localhost:8000 dans ton navigateur.

Tant que Supabase n'est pas configuré, le site tourne en **mode démo** : pas de connexion, la progression reste dans le navigateur. Tout le reste fonctionne.

---

## 2. Brancher la connexion et la sauvegarde (Supabase, gratuit)

### a. Créer le projet
1. Crée un compte sur https://supabase.com puis **New project** (choisis une région proche de tes élèves, par exemple en Europe).
2. Va dans **SQL Editor > New query**, colle tout le contenu de `supabase/schema.sql`, clique sur **Run**.
   Cela crée la table `progress` et les règles de sécurité : chaque élève ne voit que sa propre progression.

### b. Relier le site au projet
1. Dans **Project Settings > API**, copie **Project URL** et la clé **anon public**.
2. Colle-les dans `assets/config.js` :

```js
supabaseUrl: "https://xxxxxxxx.supabase.co",
supabaseAnonKey: "eyJhbGciOi...",
```

La clé `anon` est faite pour être visible dans le site : la sécurité vient des règles de la table. **Ne mets jamais la clé `service_role` dans le site.**

### c. Régler l'authentification
Dans **Authentication > URL Configuration** :
- **Site URL** : l'adresse de ton site en ligne (par exemple `https://celik-learning.netlify.app`) ;
- **Redirect URLs** : ajoute la même adresse, et `http://localhost:8000` pour tes tests.

### d. Les emails (important)
Le service d'email intégré à Supabase est fait pour les tests : il n'envoie qu'aux membres de ton équipe Supabase, avec une limite très basse (quelques emails par heure). Pour de vrais élèves, il faut un **SMTP personnalisé** :

1. Crée un compte chez un fournisseur d'emails qui propose une offre gratuite (Brevo ou Resend, par exemple).
2. Dans Supabase, **Authentication > Emails > SMTP Settings**, active **Custom SMTP** et colle les identifiants du fournisseur.
3. Dans **Authentication > Rate Limits**, ajuste le nombre d'emails par heure si besoin.

Astuce pour démarrer sans SMTP : dans **Authentication > Sign In / Providers > Email**, désactive **Confirm email**. L'inscription par mot de passe fonctionne alors sans envoyer d'email (mais le lien magique et « mot de passe oublié » ont toujours besoin d'emails, et n'importe qui peut s'inscrire avec une adresse qui n'est pas la sienne).

### e. Personnaliser les emails
Dans **Authentication > Emails > Templates**, traduis les modèles en français (confirmation, lien magique, réinitialisation).

---

## 3. Mettre le site en ligne

C'est un site statique : n'importe quel hébergeur gratuit convient.

- **Netlify** (le plus simple) : va sur https://app.netlify.com/drop et glisse le dossier `celik-learning`. Tu obtiens une adresse en `.netlify.app` en quelques secondes.
- **Vercel**, **Cloudflare Pages** ou **GitHub Pages** : pousse le dossier sur GitHub et connecte le dépôt.

Après la mise en ligne, mets l'adresse obtenue dans **Site URL** et **Redirect URLs** (étape 2c).

---

## 4. Organisation des fichiers

```
index.html                 la page unique du site
assets/config.js           nom du site + identifiants Supabase  ← à modifier
assets/app.js              pages, navigation, quiz, console Python, modules ML
assets/store.js            connexion et sauvegarde de la progression
assets/python-runtime.js   interpréteur Python (Skulpt) et erreurs en français
assets/sql-runtime.js      moteur SQL (SQLite via sql.js), erreurs en français, correction des exercices
assets/c-runtime.js        compilateur C (xcc) dans un Web Worker, erreurs en français, arrêt des boucles infinies
assets/demos.js            démos interactives du cours ML
assets/celik.css           le style (design « l'étoffe »)
assets/fonts/              polices hébergées avec le site
assets/lib/                bibliothèques incluses (Skulpt, sql.js, xcc, Supabase) : aucun CDN
courses/python-1.js … -4.js   les 16 leçons Python, en 4 parties
courses/python.js          assemble le cours Python
courses/ml.js              le contenu de base du cours ML (modules, quiz, mots-clés)
courses/ml-detail-1.js … -4.js   l'approfondissement débutant de chaque section ML
courses/sql-1.js … -4.js   les 16 leçons SQL, en 4 parties ; courses/sql.js les assemble
courses/sql-data.js        la base d'exemple du cours SQL (générée par tools/gen-sql-data.py)
courses/c-1.js … -4.js     les 16 leçons de C, en 4 parties ; courses/c.js les assemble
courses/sources.js         les cours de référence (Python, C, ML) et le repère de chaque leçon
tools/serve.py, tools/check-site.cjs   serveur local avec les en-têtes de sécurité, et contrôles d'avant mise en ligne
supabase/schema.sql        la table de progression et ses règles de sécurité
supabase/feedback.sql      la table des avis des élèves
supabase/cours-sql.sql     à lancer une fois pour autoriser le cours SQL dans les deux tables
supabase/cours-c.sql       à lancer une fois pour autoriser le cours C dans les deux tables
```

### Modifier ou ajouter une leçon Python
Chaque leçon est un objet dans `courses/python-N.js` : `title`, `goal`, `why`, `sections` (titre + HTML), `pitfalls`, `remember`, `quiz` et `exercise`.
L'exercice contient `task` (l'énoncé), `hint`, `start` (code de départ), `sol` (solution) et `check(sortie, code)`, une fonction qui renvoie `true` si c'est réussi, ou un message expliquant ce qui ne va pas.
**Ne change pas l'`id` d'une leçon déjà publiée** : la progression des élèves y est rattachée.

### Modifier ou ajouter une leçon SQL
Même forme qu'une leçon Python, dans `courses/sql-N.js`, avec `cs50` (la semaine de CS50 SQL correspondante) et, si besoin, `setup` (les tables propres à la leçon, ajoutées à la base de la boutique).
Les exemples écrits `<pre class="sqlx"><code>…</code></pre>` sont exécutés pour de vrai dans la page, avec leur résultat affiché dessous.
L'exercice contient `task`, `hint`, `start`, `sol`, puis la façon de corriger : par défaut, le résultat de l'élève est comparé à celui de `sol` (`ordered` pour exiger l'ordre, `names` pour exiger les noms de colonnes) ; `mode: "state"` compare le résultat de la requête `verify` après le code ; `test({ run })` permet une correction sur mesure ; `need` impose un mot-clé. La correction tourne deux fois, la seconde sur une variante des données (`SQL_BASE.variant`), pour qu'un résultat recopié à la main ne passe pas.
Pour changer la base d'exemple : modifier `tools/gen-sql-data.py`, puis `python3 tools/gen-sql-data.py courses/sql-data.js /tmp/boutique.db`.

### Modifier une section ML
Le texte de base est dans `courses/ml.js` ; les encadrés « En clair », « Pas à pas » et « Piège fréquent » sont dans `courses/ml-detail-N.js`, rangés par identifiant de module puis par titre exact de la section.

---

## 5. Voir combien d'élèves utilisent le site

Dans Supabase, **Authentication > Users** liste les inscrits. La requête commentée à la fin de `supabase/schema.sql` donne le nombre d'élèves par cours.
