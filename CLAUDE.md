# Brief CELIK Learning pour Claude Code

Copie de travail du document « Brief CELIK Learning pour Claude Code » (12 octobre 2026, Quentin). Si les deux divergent, la version en ligne du document fait foi.

## Objectif et ce qui ne change pas

CELIK Learning est une plateforme web gratuite, en français, qui apprend à de vrais débutants Python et le machine learning, avec un compte par élève et une progression sauvegardée. Le site existe déjà et fonctionne ; ce brief sert à le reprendre pour l'améliorer et le mettre en ligne.

Ce qui ne doit pas changer :

- **Trois cours au choix** dès l'accueil : Python (16 leçons), Machine Learning (16 modules, dont 7 de maths) et SQL (16 leçons, ajouté le 19 octobre 2026 à la demande de Quentin).
- **Connexion par email avant d'accéder aux cours** : mot de passe, lien magique par email, mot de passe oublié.
- **Progression enregistrée dans Supabase** : leçons terminées, scores des quiz, code en cours de chaque exercice. L'élève reprend où il s'est arrêté, sur n'importe quel appareil.
- **Pas d'assistant IA dans les cours** : l'option a été retirée volontairement. Les cours doivent être assez détaillés pour s'en passer.
- **Site statique**, sans étape de compilation, hébergeable gratuitement (Netlify, Vercel, Cloudflare Pages).
- **Public visé** : débutants complets, francophones, notamment en Afrique de l'Ouest. Exemples ancrés dans leur quotidien (francs CFA, Ouagadougou, Orange Money, école, marché, santé). Depuis le 26 octobre 2026, pas d'exemples centrés sur la cybersécurité : tous les élèves n'en font pas (demande de Quentin).

## État actuel

| Partie | État | Vérifié |
| --- | --- | --- |
| Accueil, choix du cours, sommaires | Terminé, design « étoffe » | Bureau et téléphone, thèmes clair et sombre |
| Cours Python (16 leçons) | Terminé | Les 16 solutions passent la correction ; aucun code de départ ne passe seul |
| Cours Machine Learning (16 modules) | Terminé | Les 80 sections ont leur approfondissement ; 6 démos sans erreur |
| Connexion et sauvegarde | Code prêt, testé en mode démo et avec un faux projet | Pas encore testé avec un vrai projet Supabase |
| Mise en ligne | En ligne sur Vercel (celik-learning.vercel.app), code sur GitHub (privé) | — |
| Cours SQL (16 leçons) | Ajouté le 19/10/2026 : programme de CS50 SQL (Harvard), SQLite dans la page, base « boutique Nong-Taaba » | Les 16 solutions passent ; aucun code de départ ne passe ; 84 exemples exécutés |

Sans identifiants Supabase dans `assets/config.js`, le site passe en **mode démo** : pas de connexion, progression gardée dans le navigateur. Un bandeau jaune le signale.

## Architecture technique

Une seule page (`index.html`) charge tout ; la navigation se fait par l'ancre de l'URL (`#/python/p03`, `#/ml/m3`). Seul Supabase vit en dehors du navigateur.

```
Navigateur de l'élève (site statique)
  courses/python-1.js … -4.js, python.js   16 leçons + exercices
  courses/ml.js + ml-detail-1.js … -4.js   16 modules, 80 sections
  courses/sql-1.js … -4.js, sql.js, sql-data.js   16 leçons SQL + base d'exemple
        │
        ▼
  assets/app.js            routeur, pages, quiz, atelier, étoffe de progression
        ├─► assets/python-runtime.js   Python (Skulpt, assets/lib/) dans la page
        ├─► assets/sql-runtime.js      SQLite (sql.js, assets/lib/) dans la page
        ├─► assets/demos.js            6 démos ML en canvas
        └─► assets/store.js            connexion + progression, cache localStorage
                  │  lit et enregistre
                  ▼
           Supabase (en ligne) : Auth email / lien magique, table progress (RLS)
```

- **store.js** écrit d'abord dans le navigateur, puis envoie à Supabase 1,2 s après la dernière modification. Au chargement, il fusionne les deux copies : une leçon terminée le reste, le meilleur score est gardé, le brouillon le plus récent gagne.
- **python-runtime.js** charge Skulpt depuis `assets/lib/`, simule les réponses à `input()` pour la correction, et traduit les erreurs Python en français.
- **Thèmes** clair et sombre automatiques ; toutes les couleurs sont des variables CSS dans `assets/celik.css`.

## Supabase

Une seule table, `progress` : une ligne par élève et par cours, avec l'état complet en JSON. Les règles RLS empêchent un élève de lire ou modifier la progression d'un autre. Script complet : `supabase/schema.sql`.

Forme de `state` :

```json
{ "units":  { "p03": { "done": true, "score": 100, "at": 1760275200000 } },
  "drafts": { "p03": "solde = 5000\n..." },
  "quiz":   { "p03": { "0": 1, "1": 3 } },
  "last": "p03", "updated": 1760275200000 }
```

Réglages dans le tableau de bord Supabase :

1. **SQL Editor** : exécuter `supabase/schema.sql`.
2. **Project Settings > API** : copier l'URL et la clé `anon public` dans `assets/config.js`. Jamais la clé `service_role`.
3. **Authentication > URL Configuration** : Site URL = l'adresse en ligne ; Redirect URLs = cette adresse et `http://localhost:8000`.
4. **Authentication > Emails > SMTP Settings** : brancher un fournisseur (Brevo ou Resend). Le service intégré n'envoie qu'aux membres de l'équipe Supabase, 2 emails par heure (https://supabase.com/docs/guides/auth/auth-smtp).
5. **Authentication > Emails > Templates** : traduire les emails en français, au nom de CELIK Learning.

Le retour d'un lien email (jetons dans l'ancre de l'URL) est déjà géré par le routeur.

## Contenu des cours

Le contenu est rédigé et ne doit pas être réécrit : seulement corrigé ou complété. Il est séparé du code, dans `courses/`.

**Python : 16 leçons en 4 parties** (`courses/python-1.js` à `python-4.js`, assemblées par `python.js`) : premiers pas ; décider et répéter ; ranger les données ; organiser son code (projet final : le bulletin d'une classe). Programme aligné sur Python for Everybody (Charles Severance, université du Michigan, CC BY 4.0) ; repère de chaque leçon dans `courses/sources.js`.
Chaque leçon : `id` (p01…p16), `title`, `minutes`, `goal`, `why`, `sections`, `pitfalls`, `remember`, `quiz`, `exercise` (`task`, `hint`, `start`, `sol`, `inputs`, `check(sortie, code)` → `true` ou message d'aide, `extra`).

**SQL : 16 leçons en 4 parties** (`courses/sql-1.js` à `sql-4.js`, assemblées par `sql.js`, ids s01…s16) : interroger une base ; relier les tables ; concevoir et écrire ; aller plus loin (projet final + injection SQL). Le programme suit les 7 semaines de CS50's Introduction to Databases with SQL (Harvard, CC BY-NC-SA 4.0), crédité sur la page du cours ; les textes et exercices sont propres à CELIK Learning. Chaque leçon a les mêmes champs qu'une leçon Python, plus `cs50` et éventuellement `setup` ; voir le README pour la correction.

**Machine Learning : 16 étapes**, programme aligné sur MIT 6.036 (CC BY-NC-SA 4.0) dans l'ordre de la Machine Learning Specialization d'Andrew Ng ; repères dans `courses/sources.js`. Exemple fil rouge des modules 5 et Maths 6 : le dépistage du paludisme. Dans cet ordre : m1, a1, a2, m2, a3, a4, m3, a5, m4, a6, m5, m6, m7, a7, m8, m9 (aN = maths placées juste avant le module qui en a besoin).
- `courses/ml.js` : contenu de base (objectif, question « devine », sections, démos, quiz, mots-clés, « explique avec tes mots »).
- `courses/ml-detail-1.js` à `-4.js` : approfondissement de chacune des 80 sections, rangé par id de module puis par **titre exact** de section : `plain`, `steps`, `stepsTitle`, `pitfall`, plus `intro` et `prereq` par module.
- Un titre de section modifié dans `ml.js` doit l'être aussi dans `ml-detail-*.js`, sinon son approfondissement disparaît sans erreur.

## Direction artistique : l'étoffe

La progression de l'élève est un tissu : une bande par cours, un carreau tissé par leçon, pâle tant qu'elle n'est pas faite, en couleur une fois terminée. Inspiration : les bandes tissées assemblées du Faso Dan Fani, et les identités ouest-africaines qui retravaillent des motifs géométriques en formes modernes. Le motif n'est pas décoratif : c'est la carte de progression, cliquable.

| Élément | Choix |
| --- | --- |
| Fond | Kaolin `#F1F2F6` (clair), nuit indigo `#0A0E22` (sombre) |
| Encre | Indigo-noir `#10142B` |
| Fils | Mil `#D99A00` = Python ; indigo `#27348B` = ML ; sarcelle `#0C7773` = maths |
| Couleurs de sens | Vert feuille = réussi ; garance `#B0281F` = erreur ou piège |
| Titres | Archivo variable, très large (font-stretch 112 à 125 %), graisse 800 à 900 |
| Texte | Atkinson Hyperlegible Next |
| Code | IBM Plex Mono, atelier de code toujours sombre |
| Polices | Hébergées dans `assets/fonts/`, aucun CDN |

Signatures à garder : l'étoffe de l'accueil (32 carreaux, 6 motifs en CSS) et la bande du sommaire ; grands numéros de leçon dans la couleur du fil ; étiquettes cousues en haut des encadrés (jamais de filet coloré à gauche) ; filets pointillés « points de couture » ; boutons à ombre pleine décalée ; coins presque droits (2 à 3 px).

À éviter : dégradés violet-bleu, emojis comme icônes, Inter ou Space Grotesk, cartes arrondies à ombre douce, tout centré, fond crème avec titres en serif.

Pistes à valider avec Quentin : animation du carreau qui se tisse à la validation ; image de partage générée à partir de l'étoffe ; certificat de fin de parcours.

## Travail demandé

1. Mettre le projet sous Git et lancer le site en local (`python -m http.server 8000`). Critère : accueil en mode démo, aucune erreur console.
2. Brancher Supabase avec Quentin. Critère : inscription, connexion, déconnexion et lien magique fonctionnent ; une leçon validée sur ordinateur apparaît terminée sur téléphone.
3. Tester la sécurité : avec deux comptes, un élève ne peut pas lire la ligne de l'autre via l'API (zéro ligne).
4. Emails en français via SMTP Brevo ou Resend. Critère : l'email arrive dans Gmail, hors spam.
5. Mettre en ligne sur Vercel (compte de Quentin), depuis GitHub, et mettre à jour la Site URL Supabase.
6. Peaufiner le design sans changer la direction. Critère : aucune régression à 390 px ni en thème sombre.
7. Ajouter des tests Playwright : chaque exercice passe avec sa solution et échoue avec son code de départ ; chaque module ML s'affiche sans erreur.

Hors périmètre : assistant IA dans les cours, paiement. (Les nouveaux cours étaient hors périmètre ; Quentin a demandé le cours SQL le 19 octobre 2026.)

## Règles

- Ne jamais changer l'`id` d'une leçon ou d'un module publié (p01…p16, s01…s16, m1…m9, a1…a7).
- Ne jamais mettre la clé `service_role` dans le site.
- Garder le site statique : pas de framework ni de compilation sans l'accord de Quentin.
- Pas de dépendance à un CDN : Skulpt, sql.js, le client Supabase et les polices sont dans `assets/`.
- Français simple, tutoiement, phrases courtes, exemples du quotidien ouest-africain.
- Pas de `confirm()` ni `alert()` : confirmations en deux clics dans la page.
- Accessibilité : focus visible, contraste suffisant dans les deux thèmes, `prefers-reduced-motion` respecté.

Avant chaque mise en ligne : 16 exercices Python et 16 exercices SQL (solution = réussi, départ = échec), 16 modules ML sans erreur, affichage à 390 px sans défilement horizontal, connexion complète avec un vrai compte.
