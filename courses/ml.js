/* Cours Machine Learning : contenu de base (modules ML + parcours maths). L'approfondissement pour débutants est dans ml-detail.js. */
window.COURSE_ML_MODULES = (function () {
"use strict";
const MODULES = [
{
  id: "m1", num: 1, title: "Qu'est-ce que le machine learning ?", short: "Les bases",
  kind: "Concepts et vocabulaire", method: "Analogies, Feynman, flashcards", minutes: 30,
  objective: "Savoir expliquer en deux phrases ce qu'est le machine learning et classer un problème dans la bonne famille.",
  pre: {
    q: "Un filtre anti-spam fait de 500 règles écrites à la main (« si le mail contient “gagnez”, alors spam »). Est-ce du machine learning ?",
    a: "Non. Les règles viennent d'un humain. Ce serait du machine learning si le programme avait déduit ses règles lui-même à partir de milliers d'e-mails déjà étiquetés spam / pas spam."
  },
  blocks: [
    { title: "Programmer ou apprendre",
      html: `<p>En programmation classique, tu écris les règles : <em>données + règles → réponses</em>. En machine learning, tu fournis des exemples avec leurs réponses et l'algorithme trouve les règles : <em>données + réponses → règles</em>. Ces règles apprises forment le <strong>modèle</strong>.</p><p>On utilise le ML quand les règles sont trop nombreuses ou trop floues pour être écrites à la main : reconnaître un visage, comprendre une phrase, repérer une fraude.</p>`,
      example: "Reconnaître un chiffre écrit à la main : impossible d'écrire toutes les règles (« un 7 a une barre en haut… sauf quand… »). On montre au modèle des dizaines de milliers de chiffres étiquetés et il apprend seul à les distinguer.",
      recall: { q: "Complète de mémoire : en ML, on donne à la machine ___ et ___ ; elle produit ___.",
        a: "Des données et les réponses attendues (des exemples étiquetés). Elle produit les règles, c'est-à-dire un modèle capable de prédire sur des données nouvelles." } },
    { title: "Le vocabulaire de base",
      html: `<div class="table-wrap"><table><thead><tr><th>Terme</th><th>Sens</th><th>Exemple : prix d'une maison</th></tr></thead><tbody>
<tr><td>Exemple</td><td>une observation, une ligne du tableau</td><td>une maison déjà vendue</td></tr>
<tr><td>Feature</td><td>une information d'entrée (caractéristique)</td><td>surface, quartier, nombre de pièces</td></tr>
<tr><td>Label</td><td>la réponse à prédire (étiquette, cible)</td><td>le prix de vente</td></tr>
<tr><td>Modèle</td><td>la fonction apprise</td><td>prix ≈ f(surface, quartier, pièces)</td></tr>
<tr><td>Entraînement</td><td>ajuster le modèle sur des exemples</td><td>apprendre à partir de 5 000 ventes</td></tr>
<tr><td>Inférence</td><td>utiliser le modèle sur un cas nouveau</td><td>estimer une maison pas encore vendue</td></tr>
</tbody></table></div>`,
      recall: { q: "Dans un détecteur de phishing, cite deux features possibles et le label.",
        a: "Features : présence d'un lien raccourci, domaine de l'expéditeur, mots d'urgence (« votre compte sera suspendu »), pièce jointe… Label : phishing ou légitime." } },
    { title: "Supervisé : on connaît les réponses",
      html: `<p>Chaque exemple d'entraînement a son label. Deux sous-familles, selon ce qu'on prédit :</p><ul><li><strong>Régression</strong> : un nombre continu (prix, température, durée).</li><li><strong>Classification</strong> : une catégorie (spam / pas spam ; chat, chien ou oiseau).</li></ul><p>Réflexe : demande-toi si la réponse <em>se mesure</em> ou <em>se range dans une boîte</em>. Si elle se mesure, c'est une régression. Si elle se range, c'est une classification.</p>`,
      recall: { q: "Prédire si un étudiant réussira son examen (oui / non), c'est quoi ? Et prédire sa note sur 20 ?",
        a: "Oui / non : classification (deux boîtes). La note sur 20 : régression (une valeur qui se mesure)." } },
    { title: "Non supervisé : trouver la structure seul",
      html: `<p>Pas de labels. L'algorithme cherche des régularités dans les données :</p><ul><li><strong>Clustering</strong> : regrouper ce qui se ressemble (segmenter des clients selon leurs habitudes).</li><li><strong>Réduction de dimension</strong> : résumer beaucoup de variables en quelques-unes.</li><li><strong>Détection d'anomalies</strong> : repérer ce qui ne ressemble à rien de connu (une connexion à 3 h du matin depuis un pays inhabituel).</li></ul>`,
      recall: { q: "Pourquoi la détection d'anomalies est-elle utile face à une attaque jamais vue ?",
        a: "Parce qu'elle n'a pas besoin d'exemples étiquetés d'attaques : elle apprend ce qui est « normal » et signale ce qui s'en écarte, même si c'est une attaque inédite." } },
    { title: "Renforcement : essais, erreurs, récompenses",
      html: `<p>Un <strong>agent</strong> agit dans un <strong>environnement</strong>, reçoit des <strong>récompenses</strong> ou des pénalités, et apprend une stratégie qui maximise la récompense sur la durée. C'est ainsi qu'on entraîne des programmes à jouer aux échecs ou au go, ou des robots à marcher.</p><p>Différence clé avec le supervisé : personne ne dit quelle était la bonne action. L'agent sait seulement si le résultat a été bon ou mauvais, parfois bien plus tard.</p>`,
      recall: { q: "Quels sont les trois éléments de base de l'apprentissage par renforcement ?",
        a: "Un agent, un environnement dans lequel il agit, et des récompenses (ou pénalités) qui évaluent ses actions." } }
  ],
  feynman: { prompt: "Explique à un ami qui n'a jamais codé ce qu'est le machine learning, puis donne-lui un exemple pour chacune des trois familles.",
    points: ["Le modèle apprend ses règles à partir d'exemples au lieu de les recevoir d'un humain", "Supervisé : des exemples avec réponses (régression ou classification)", "Non supervisé : pas de réponses, on cherche des groupes ou des anomalies", "Renforcement : un agent apprend grâce à des récompenses"] },
  quiz: [
    { id: "m1q1", type: "mcq", q: "Une banque veut prédire le montant qu'un client dépensera le mois prochain. Quel type de problème ?", options: ["Classification", "Régression", "Clustering", "Renforcement"], answer: 1,
      explain: "Un montant est une valeur numérique continue : c'est une régression, en apprentissage supervisé." },
    { id: "m1q2", type: "mcq", q: "Tu as 10 000 logs de connexion sans aucune étiquette et tu veux repérer les comportements étranges. Quelle approche ?", options: ["Régression linéaire", "Classification supervisée", "Détection d'anomalies (non supervisé)", "Apprentissage par renforcement"], answer: 2,
      explain: "Sans labels, le supervisé est impossible. La détection d'anomalies apprend le « normal » et isole ce qui s'en écarte." },
    { id: "m1q3", type: "mcq", q: "Dans un dataset de maisons, la colonne « prix de vente » que l'on veut prédire est :", options: ["une feature", "le label (la cible)", "un hyperparamètre", "le modèle"], answer: 1,
      explain: "C'est la réponse à prédire : le label, ou variable cible. La surface et le quartier sont des features." },
    { id: "m1q4", type: "mcq", q: "Quelle phrase décrit le mieux le machine learning ?", options: ["Un programme qui suit des règles écrites par un expert", "Un programme qui apprend ses règles à partir d'exemples", "Une base de données très rapide", "Un robot qui pense comme un humain"], answer: 1,
      explain: "Le cœur du ML : les règles sont apprises à partir des données, pas codées à la main." },
    { id: "m1q5", type: "open", q: "Donne un exemple de problème tiré de ta vie ou de tes projets qui pourrait être résolu par du ML. Précise les features, le label s'il existe, et la famille.",
      a: "Exemples : prédire l'affluence d'un restaurant selon le jour, la météo et les événements (régression) ; classer des e-mails de phishing (classification) ; regrouper des auditeurs selon leurs goûts musicaux (clustering, pas de label). L'essentiel : nommer les features, le label s'il existe, et en déduire la famille." }
  ],
  keypoints: ["Qu'est-ce qui change entre programmer et entraîner un modèle ?", "Comment distinguer une régression d'une classification ?", "Que peut-on faire quand on n'a pas de labels ?", "Qu'est-ce qu'une feature ? Et un label ?"],
  cards: [
    { id: "m1c1", f: "ML ou programmation classique : qu'est-ce qui change ?", b: "En ML, on fournit des données et les réponses, l'algorithme produit les règles (le modèle). En programmation classique, l'humain écrit les règles." },
    { id: "m1c2", f: "Qu'est-ce qu'une feature ?", b: "Une information d'entrée qui décrit un exemple. Ex. : la surface d'une maison." },
    { id: "m1c3", f: "Qu'est-ce que le label ?", b: "La réponse à prédire, connue pour les exemples d'entraînement. Ex. : le prix de vente." },
    { id: "m1c4", f: "Régression ou classification : comment choisir ?", b: "La réponse se mesure (nombre continu) → régression. Elle se range dans une catégorie → classification." },
    { id: "m1c5", f: "Quelle famille travaille sur des données sans labels ?", b: "Le non supervisé : clustering, réduction de dimension, détection d'anomalies." },
    { id: "m1c6", f: "Principe de l'apprentissage par renforcement ?", b: "Un agent agit dans un environnement et apprend à maximiser ses récompenses." },
    { id: "m1c7", f: "Entraînement ou inférence ?", b: "Entraînement : ajuster le modèle sur des exemples. Inférence : utiliser le modèle entraîné sur un cas nouveau." }
  ]
},
{
  id: "m2", num: 2, title: "Les données, matière première", short: "Préparer les données",
  kind: "Concepts et procédure", method: "Analogies, étapes justifiées, flashcards", minutes: 40,
  objective: "Préparer un dataset correctement : le découper, éviter les fuites, le nettoyer et le mettre à l'échelle.",
  pre: {
    q: "Tu entraînes un modèle puis tu le testes sur exactement les mêmes exemples. Il obtient 99 %. Peux-tu être content ?",
    a: "Non. C'est comme réviser avec les questions de l'examen : le score mesure la mémoire, pas la capacité à répondre à des questions nouvelles. Il faut tester sur des données jamais vues."
  },
  blocks: [
    { title: "Un dataset, c'est un tableau",
      html: `<p>Chaque <strong>ligne</strong> est un exemple, chaque <strong>colonne</strong> une feature, et une colonne à part contient le label. On note souvent la matrice des features <code>X</code> (n lignes × d colonnes) et le vecteur des labels <code>y</code>.</p><div class="table-wrap"><table><thead><tr><th>surface (m²)</th><th>pièces</th><th>quartier</th><th>prix (label)</th></tr></thead><tbody><tr><td class="num">85</td><td class="num">3</td><td>A</td><td class="num">42</td></tr><tr><td class="num">120</td><td class="num">5</td><td>C</td><td class="num">61</td></tr><tr><td class="num">60</td><td class="num">2</td><td>B</td><td class="num">30</td></tr></tbody></table></div><p class="note">Données inventées pour l'exemple. Ici X a 3 lignes et 3 colonnes, y a 3 valeurs.</p>`,
      recall: { q: "1 000 e-mails décrits par 20 features : quelle est la forme de X ? Et de y ?",
        a: "X a 1 000 lignes et 20 colonnes (1 000 × 20). y contient 1 000 labels, un par e-mail." } },
    { title: "Entraînement, validation, test",
      html: `<p>On découpe les données en trois parts, par exemple 70 / 15 / 15 :</p><ul><li><strong>Train</strong> : le modèle apprend dessus.</li><li><strong>Validation</strong> : on compare des réglages et des modèles.</li><li><strong>Test</strong> : on mesure la performance finale, une seule fois, à la fin.</li></ul><p>Analogie : le train, ce sont les exercices du cours ; la validation, les examens blancs ; le test, le vrai examen. Si tu regardes le sujet du vrai examen pour choisir ta méthode, ta note ne veut plus rien dire.</p>`,
      recall: { q: "Pourquoi ne faut-il utiliser le jeu de test qu'une seule fois ?",
        a: "Si on s'en sert pour faire des choix (modèle, réglages), on finit par s'adapter à lui : le score n'est plus une estimation honnête de la performance sur des données nouvelles." } },
    { title: "La fuite de données",
      html: `<p>Il y a <strong>fuite</strong> (<em>data leakage</em>) quand une information indisponible au moment de la prédiction, ou venue du jeu de test, se glisse dans l'entraînement. Le modèle paraît excellent en test, puis s'effondre en production.</p><p>Deux cas classiques :</p><ul><li>Une feature qui « contient » la réponse : pour prédire si un client ne remboursera pas son prêt, utiliser la colonne « dossier transmis au contentieux ».</li><li>Calculer la moyenne et l'écart-type de mise à l'échelle sur <em>tout</em> le dataset avant de le découper : le train « voit » un peu le test.</li></ul>`,
      recall: { q: "Quelle règle pratique évite la seconde fuite ?",
        a: "Séparer d'abord train et test, puis calculer les paramètres de prétraitement (moyenne, écart-type…) uniquement sur le train, et les appliquer tels quels au test." } },
    { title: "Nettoyer : garbage in, garbage out",
      html: `<p>Un modèle ne peut pas être meilleur que ses données. Avant tout entraînement :</p><ul><li><strong>Valeurs manquantes</strong> : supprimer la ligne, ou remplacer (par la médiane, par exemple).</li><li><strong>Doublons</strong> : les supprimer, sinon ils peuvent se retrouver à la fois dans le train et dans le test.</li><li><strong>Valeurs aberrantes</strong> : 8 000 m² pour un studio ? Probablement une erreur de saisie à vérifier.</li><li><strong>Catégories</strong> : les convertir en nombres, souvent par <em>one-hot encoding</em> : une colonne 0/1 par catégorie. Le quartier A, B ou C devient trois colonnes <code>quartier_A</code>, <code>quartier_B</code>, <code>quartier_C</code>.</li></ul>`,
      recall: { q: "Pourquoi ne pas coder simplement les quartiers A, B, C par 1, 2, 3 ?",
        a: "Le modèle croirait qu'il existe un ordre et des distances entre quartiers (C vaudrait « trois fois » A). Le one-hot encoding évite d'inventer cette relation." } },
    { title: "Mettre les features à la même échelle",
      html: `<p>Si une feature va de 0 à 1 et une autre de 0 à 1 000 000, beaucoup d'algorithmes (k-NN, descente de gradient, réseaux de neurones) sont dominés par la grande. On les ramène à une échelle comparable.</p><p><strong>Standardisation</strong> :</p><p class="formula">z = (x − μ) / σ</p><p>μ est la moyenne et σ l'écart-type, calculés sur le train. Résultat : moyenne 0, écart-type 1.</p><p><strong>Normalisation min-max</strong> :</p><p class="formula">x' = (x − min) / (max − min)</p><p>Résultat : des valeurs entre 0 et 1.</p>`,
      recall: { q: "Un salaire de 300 000 avec μ = 200 000 et σ = 50 000 : que vaut z ?",
        a: "z = (300 000 − 200 000) / 50 000 = 2. Ce salaire est à deux écarts-types au-dessus de la moyenne." } }
  ],
  feynman: { prompt: "Explique pourquoi on découpe les données en train, validation et test, et ce qu'est une fuite de données. Donne un exemple de fuite à toi.",
    points: ["Train pour apprendre, validation pour choisir, test pour mesurer une seule fois", "Tester sur les données d'entraînement mesure la mémoire, pas la généralisation", "Une fuite = une information du futur ou du test qui entre dans l'entraînement", "Le prétraitement s'ajuste sur le train seulement"] },
  quiz: [
    { id: "m2q1", type: "mcq", q: "Quel est le bon ordre ?", options: ["Standardiser tout le dataset, puis séparer train et test", "Séparer train et test, calculer la standardisation sur le train, l'appliquer au test", "Séparer, puis standardiser le test avec ses propres moyennes", "L'ordre n'a pas d'importance"], answer: 1,
      explain: "Les paramètres de prétraitement doivent venir du train seulement, puis être appliqués au test. Sinon le test influence l'entraînement (fuite), ou n'est pas transformé comme le train." },
    { id: "m2q2", type: "mcq", q: "À quoi sert le jeu de validation ?", options: ["À entraîner le modèle", "À choisir entre plusieurs modèles ou réglages", "À mesurer la performance finale publiée", "À stocker les valeurs manquantes"], answer: 1,
      explain: "La validation sert d'examen blanc pour comparer des options. Le test, lui, est réservé à la mesure finale." },
    { id: "m2q3", type: "mcq", q: "Une colonne « ville » avec 4 valeurs possibles devient, après one-hot encoding :", options: ["1 colonne avec des valeurs de 1 à 4", "4 colonnes de 0 et de 1", "2 colonnes", "Elle est supprimée"], answer: 1,
      explain: "Une colonne binaire par valeur possible : 1 pour la ville de l'exemple, 0 pour les autres." },
    { id: "m2q4", type: "mcq", q: "Un modèle de détection de fraude atteint 99,9 % en test, puis échoue en production. Cause la plus probable ?", options: ["Trop peu de features", "Une fuite de données", "La normalisation min-max au lieu de la standardisation", "Un jeu de test trop grand"], answer: 1,
      explain: "Un score trop beau pour être vrai, suivi d'un effondrement en conditions réelles, est le symptôme typique d'une fuite : le modèle a eu accès à une information qu'il n'aura pas en production." },
    { id: "m2q5", type: "open", q: "Avec l'analogie de l'école, explique le rôle des jeux train, validation et test.",
      a: "Train = les exercices pour apprendre. Validation = les examens blancs pour ajuster sa méthode. Test = le vrai examen, passé une seule fois, qui dit le vrai niveau." }
  ],
  keypoints: ["Que contiennent X et y ?", "Quel est le rôle de chacun des trois jeux de données ?", "Comment une fuite de données se produit-elle ?", "Pourquoi et comment mettre les features à la même échelle ?"],
  cards: [
    { id: "m2c1", f: "Que représentent X et y ?", b: "X : la matrice des features (n exemples × d features). y : le vecteur des labels." },
    { id: "m2c2", f: "Rôle du jeu de validation ?", b: "Comparer des modèles et des réglages (examen blanc)." },
    { id: "m2c3", f: "Rôle du jeu de test ?", b: "Mesurer la performance finale, une seule fois, sur des données jamais utilisées pour faire des choix." },
    { id: "m2c4", f: "Qu'est-ce qu'une fuite de données ?", b: "Une information indisponible au moment de la prédiction (ou venue du test) qui entre dans l'entraînement. Score gonflé, échec en production." },
    { id: "m2c5", f: "Sur quelles données ajuster le prétraitement ?", b: "Sur le train uniquement, puis appliquer les mêmes paramètres à la validation et au test." },
    { id: "m2c6", f: "One-hot encoding ?", b: "Une colonne 0/1 par catégorie, pour ne pas inventer d'ordre entre les catégories." },
    { id: "m2c7", f: "Formule de la standardisation ?", b: "z = (x − μ) / σ, avec μ et σ calculés sur le train. Résultat : moyenne 0, écart-type 1." }
  ]
},
{
  id: "m3", num: 3, title: "Régression linéaire et descente de gradient", short: "Comment un modèle apprend",
  kind: "Formules et mécanisme", method: "Formules comprises puis reconstruites, démo à prédire", minutes: 45,
  objective: "Comprendre comment un modèle linéaire apprend : la prédiction, l'erreur à minimiser et la descente de gradient.",
  pre: {
    q: "Tu dois prédire la note d'un étudiant à partir de ses heures de révision avec une seule droite. Quels deux nombres dois-tu trouver ?",
    a: "La pente (combien de points gagnés par heure) et l'ordonnée à l'origine (la note avec zéro heure). En ML, on les appelle le poids w et le biais b."
  },
  blocks: [
    { title: "Le modèle : une droite",
      html: `<p>Avec une seule feature :</p><p class="formula">ŷ = w · x + b</p><ul><li><code>x</code> : l'entrée (heures de révision).</li><li><code>ŷ</code> (« y chapeau ») : la prédiction (la note).</li><li><code>w</code> : le <strong>poids</strong>, la pente.</li><li><code>b</code> : le <strong>biais</strong>, la valeur quand x = 0.</li></ul><p>Entraîner le modèle, c'est trouver les valeurs de w et b qui collent le mieux aux données. Ce sont les <strong>paramètres</strong> du modèle.</p>`,
      example: "Avec w = 1,5 et b = 6 : 4 heures de révision → ŷ = 1,5 × 4 + 6 = 12 sur 20.",
      recall: { q: "Avec w = 2 et b = 5, que prédit le modèle pour x = 3 ?", a: "ŷ = 2 × 3 + 5 = 11." } },
    { title: "Mesurer l'erreur : la fonction de coût",
      html: `<p>Pour chaque exemple, l'erreur est <code>y − ŷ</code>. On la résume avec l'<strong>erreur quadratique moyenne</strong> (MSE) :</p><p class="formula">MSE = (1/n) · Σ (yᵢ − ŷᵢ)²</p><p>Pourquoi le carré ? Les erreurs positives et négatives ne s'annulent plus, les grosses erreurs pèsent davantage, et la fonction est lisse, donc facile à dériver.</p><p>Apprendre, c'est <strong>trouver w et b qui rendent la MSE la plus petite possible</strong>.</p>`,
      recall: { q: "Deux prédictions ont des erreurs de +2 et de −2. Que vaut la moyenne des erreurs brutes ? Et la MSE ?",
        a: "Moyenne brute : 0, ce qui est trompeur (on croirait qu'il n'y a aucune erreur). MSE : (4 + 4) / 2 = 4." } },
    { title: "La descente de gradient",
      html: `<p>Imagine-toi sur une colline dans le brouillard. Tu veux atteindre la vallée : tu sens la pente sous tes pieds, tu fais un pas vers le bas, et tu recommences.</p><p>La colline, c'est la fonction de coût ; ta position, ce sont les valeurs de w et b. Le <strong>gradient</strong> (la dérivée) donne la pente. À chaque étape :</p><p class="formula">w ← w − α · ∂L/∂w</p><p>Le signe moins fait descendre : si la pente est positive, w diminue ; si elle est négative, w augmente. <code>α</code> est le <strong>taux d'apprentissage</strong>, la taille du pas. On le choisit avant l'entraînement : c'est un <strong>hyperparamètre</strong>.</p>`,
      recall: { q: "Si ∂L/∂w = 4 et α = 0,1, de combien w change-t-il, et dans quel sens ?", a: "w diminue de 0,1 × 4 = 0,4." } },
    { title: "La taille du pas, en direct",
      html: `<p>La courbe est une fonction de coût dont le minimum est en w = 3. Le point part de w = −1. <strong>Avant de cliquer</strong>, prédis ce qui va se passer avec α = 0,05, puis 0,9, puis 1,05.</p>`,
      demo: "gradient",
      after: `<p>Trop petit : ça converge, mais lentement. Trop grand : on saute par-dessus la vallée ; au-delà d'un certain seuil, chaque pas nous en éloigne davantage (divergence).</p>`,
      recall: { q: "Ton coût augmente à chaque itération au lieu de baisser. Cause la plus probable, et que fais-tu ?",
        a: "Le taux d'apprentissage est trop grand : les pas sautent par-dessus le minimum et s'en éloignent. Il faut diminuer α." } },
    { title: "Plusieurs features",
      html: `<p>Avec d features :</p><p class="formula">ŷ = w₁x₁ + w₂x₂ + … + w_d·x_d + b</p><p>On l'écrit de façon compacte <code>ŷ = w · x + b</code> : un produit scalaire entre le vecteur des poids et celui des features. Chaque poids indique de combien la prédiction change quand sa feature augmente d'une unité, les autres restant fixes.</p><p>C'est là que l'algèbre linéaire intervient : pour n exemples, toutes les prédictions se calculent d'un coup avec <code>ŷ = Xw + b</code>.</p>`,
      recall: { q: "Prix = 0,5 × surface + 3 × pièces + 10. Maison de 100 m² avec 4 pièces ?", a: "0,5 × 100 + 3 × 4 + 10 = 50 + 12 + 10 = 72." } }
  ],
  feynman: { prompt: "Explique comment un modèle de régression linéaire « apprend » : ce qu'il cherche, comment il mesure qu'il se trompe, et comment il s'améliore.",
    points: ["Il cherche les paramètres w et b", "Il mesure son erreur avec une fonction de coût comme la MSE", "Il suit la pente (le gradient) vers le bas, par pas de taille α", "Pas trop grand : divergence ; pas trop petit : lenteur"] },
  quiz: [
    { id: "m3q1", type: "mcq", q: "Dans ŷ = w · x + b, que sont w et b ?", options: ["Des hyperparamètres choisis à la main", "Les paramètres appris pendant l'entraînement", "Les features", "Les labels"], answer: 1,
      explain: "w et b sont appris. Un hyperparamètre, comme le taux d'apprentissage α, est choisi avant l'entraînement." },
    { id: "m3q2", type: "mcq", q: "Pourquoi met-on les erreurs au carré dans la MSE ?", options: ["Pour que le calcul soit plus rapide", "Pour que les erreurs positives et négatives ne s'annulent pas et que les grosses erreurs pèsent plus", "Parce que les labels sont toujours positifs", "Pour obtenir un pourcentage"], answer: 1,
      explain: "Le carré rend chaque erreur positive et amplifie les grosses erreurs. Il donne aussi une fonction lisse, facile à dériver." },
    { id: "m3q3", type: "mcq", q: "La courbe de coût oscille puis explose. Que fais-tu ?", options: ["J'augmente α", "Je diminue α", "J'ajoute des features", "Je supprime le biais b"], answer: 1,
      explain: "Oscillation puis explosion : les pas sont trop grands et passent par-dessus le minimum. On réduit le taux d'apprentissage." },
    { id: "m3q4", type: "mcq", q: "Dans w ← w − α · ∂L/∂w, pourquoi le signe moins ?", options: ["Pour que w reste positif", "Pour aller dans le sens opposé à la pente, donc vers le bas", "Pour inverser le label", "Pour normaliser w"], answer: 1,
      explain: "Le gradient indique la direction de la montée. En allant dans le sens opposé, on fait baisser le coût." },
    { id: "m3q5", type: "open", q: "Réécris de mémoire la formule de la MSE et la règle de mise à jour de la descente de gradient, puis explique chaque symbole.",
      a: "MSE = (1/n) Σ (yᵢ − ŷᵢ)² : n exemples, y la vraie valeur, ŷ la prédiction. Mise à jour : w ← w − α · ∂L/∂w : α le taux d'apprentissage, ∂L/∂w la pente du coût par rapport à w." }
  ],
  keypoints: ["Que représentent w et b ?", "Que mesure la MSE, et pourquoi le carré ?", "Pourquoi le signe moins dans la mise à jour ?", "Que se passe-t-il si α est trop grand ? trop petit ?"],
  cards: [
    { id: "m3c1", f: "Régression linéaire à une feature : formule ?", b: "ŷ = w · x + b (w : poids ou pente ; b : biais)." },
    { id: "m3c2", f: "Paramètre ou hyperparamètre ?", b: "Paramètre : appris pendant l'entraînement (w, b). Hyperparamètre : choisi avant (α, degré, k…)." },
    { id: "m3c3", f: "Formule de la MSE ?", b: "MSE = (1/n) · Σ (yᵢ − ŷᵢ)²" },
    { id: "m3c4", f: "Règle de mise à jour de la descente de gradient ?", b: "w ← w − α · ∂L/∂w" },
    { id: "m3c5", f: "Taux d'apprentissage trop grand : symptôme ?", b: "Le coût oscille ou augmente (divergence)." },
    { id: "m3c6", f: "Taux d'apprentissage trop petit : symptôme ?", b: "Le coût baisse, mais très lentement." },
    { id: "m3c7", f: "Écriture compacte avec plusieurs features ?", b: "ŷ = w · x + b (produit scalaire), ou ŷ = Xw + b pour tous les exemples d'un coup." }
  ]
},
{
  id: "m4", num: 4, title: "Classification", short: "Du score à la décision",
  kind: "Concepts à comparer", method: "Tableau comparatif, exemples contrastés", minutes: 40,
  objective: "Comprendre comment un modèle transforme un score en décision de classe, et connaître trois algorithmes de classification.",
  pre: {
    q: "Un modèle estime qu'un e-mail a 70 % de chances d'être du phishing. Qui décide si on le bloque ?",
    a: "Un seuil de décision choisi par l'humain. Avec un seuil de 50 %, on bloque ; avec un seuil de 80 %, on laisse passer. Le modèle donne une probabilité, pas une décision."
  },
  blocks: [
    { title: "Du score à la probabilité : la sigmoïde",
      html: `<p>La <strong>régression logistique</strong> calcule d'abord un score comme en régression linéaire, <code>z = w · x + b</code>, qui peut valoir n'importe quoi. Elle l'écrase ensuite entre 0 et 1 avec la fonction <strong>sigmoïde</strong> :</p><p class="formula">σ(z) = 1 / (1 + e^(−z))</p><ul><li>z très négatif → σ proche de 0</li><li>z = 0 → σ = 0,5</li><li>z très positif → σ proche de 1</li></ul><p>Malgré son nom, c'est un algorithme de <strong>classification</strong>.</p>`,
      recall: { q: "Que vaut σ(0) ? Que signifie un score z = 0 ?", a: "σ(0) = 1 / (1 + 1) = 0,5 : le modèle hésite complètement entre les deux classes." } },
    { title: "Le seuil de décision",
      html: `<p>Pour décider, on compare la probabilité à un <strong>seuil</strong>, souvent 0,5 : si p ≥ 0,5, classe 1 ; sinon, classe 0. Mais ce seuil se choisit selon le coût des erreurs.</p><p>Dépistage d'une maladie grave : on préfère un seuil bas, quitte à inquiéter pour rien, plutôt que de rater un malade. Filtre anti-spam : on préfère un seuil haut, pour ne pas envoyer un e-mail important dans les spams. Tu verras ce compromis en chiffres au module 5.</p>`,
      recall: { q: "Seuil haut ou bas pour ne presque jamais rater une attaque, quitte à avoir plus de fausses alertes ?",
        a: "Un seuil bas : l'alerte se déclenche dès que la probabilité est modérée. On rate moins d'attaques, mais on génère plus de faux positifs." } },
    { title: "La frontière de décision",
      html: `<p>Les points où p = 0,5 forment la <strong>frontière de décision</strong>. Pour la régression logistique, c'est là où <code>w · x + b = 0</code> : une droite en 2D, un plan en 3D. C'est donc un classifieur <strong>linéaire</strong>.</p><p>Si les deux classes sont séparées par une courbe (un cercle de points rouges entouré de bleus), une droite ne suffit pas : il faut des features supplémentaires ou un modèle non linéaire.</p>`,
      recall: { q: "Pourquoi la régression logistique est-elle un classifieur linéaire, alors qu'elle utilise une sigmoïde (une courbe) ?",
        a: "Parce que la frontière de décision, là où p = 0,5, correspond à w · x + b = 0, qui est une droite (ou un plan). La sigmoïde ne change que la façon de transformer le score en probabilité." } },
    { title: "k plus proches voisins (k-NN)",
      html: `<p>Pas d'équation à apprendre : on garde tous les exemples en mémoire. Pour classer un nouveau point, on cherche ses <strong>k voisins les plus proches</strong> et on fait voter leurs classes.</p><ul><li>k petit (1 ou 3) : suit chaque détail, sensible au bruit.</li><li>k grand : décisions plus lisses, mais les petits groupes peuvent être ignorés.</li></ul><p>Comme il compare des distances, k-NN a absolument besoin de features à la même échelle (module 2).</p>`,
      recall: { q: "Pourquoi k-NN est-il sensible à la mise à l'échelle des features ?",
        a: "Parce qu'il compare des distances : une feature aux grands nombres (un salaire) écrase une feature aux petits nombres (un âge) si on ne les met pas à la même échelle." } },
    { title: "Arbres de décision et forêts",
      html: `<p>Un <strong>arbre de décision</strong> pose une suite de questions : « le lien est-il raccourci ? » → oui → « l'expéditeur est-il connu ? » → … jusqu'à une feuille qui donne la classe. Très lisible, mais un arbre profond apprend facilement le bruit par cœur.</p><p>Une <strong>forêt aléatoire</strong> entraîne beaucoup d'arbres, chacun sur un échantillon différent des données et des features, puis les fait voter. Elle est plus robuste qu'un arbre seul.</p><div class="table-wrap"><table><thead><tr><th>Algorithme</th><th>Idée</th><th>Point fort</th><th>Point faible</th></tr></thead><tbody>
<tr><td>Régression logistique</td><td>score + sigmoïde</td><td>simple, donne des probabilités</td><td>frontière linéaire</td></tr>
<tr><td>k-NN</td><td>vote des voisins</td><td>aucune hypothèse de forme</td><td>lent sur gros volumes, sensible à l'échelle</td></tr>
<tr><td>Arbre</td><td>suite de questions</td><td>lisible, pas besoin de mise à l'échelle</td><td>surapprend facilement</td></tr>
<tr><td>Forêt aléatoire</td><td>vote de nombreux arbres</td><td>robuste et performante</td><td>moins lisible</td></tr>
</tbody></table></div>`,
      recall: { q: "Pourquoi une forêt de 100 arbres est-elle généralement plus fiable qu'un seul arbre ?",
        a: "Chaque arbre fait des erreurs différentes, car il a vu des données et des features différentes. Le vote moyenne ces erreurs, ce qui réduit le surapprentissage." } }
  ],
  feynman: { prompt: "Explique comment un modèle décide qu'un e-mail est du phishing, de la probabilité jusqu'à la décision, puis présente deux algorithmes de classification avec leur idée principale.",
    points: ["Le modèle produit un score, transformé en probabilité (sigmoïde)", "Un seuil, choisi selon le coût des erreurs, transforme la probabilité en décision", "k-NN : vote des voisins les plus proches", "Arbre : suite de questions ; forêt : vote de nombreux arbres"] },
  quiz: [
    { id: "m4q1", type: "mcq", q: "σ(z) donne 0,92. Avec un seuil de 0,5, la classe prédite est :", options: ["0", "1", "Impossible à dire", "0,92"], answer: 1,
      explain: "0,92 ≥ 0,5, donc classe 1. La probabilité n'est pas la classe : c'est le seuil qui décide." },
    { id: "m4q2", type: "mcq", q: "Pour k-NN, que se passe-t-il typiquement avec k = 1 ?", options: ["Le modèle est très lisse", "Le modèle suit chaque point, y compris le bruit", "Le modèle ignore les données", "k-NN ne fonctionne pas avec k = 1"], answer: 1,
      explain: "Avec un seul voisin, chaque point bruité crée sa petite zone : le modèle colle aux détails, c'est une forme de surapprentissage." },
    { id: "m4q3", type: "mcq", q: "Quel algorithme n'a pas besoin de mise à l'échelle des features ?", options: ["k-NN", "Arbre de décision", "Régression logistique entraînée par descente de gradient", "Réseau de neurones"], answer: 1,
      explain: "Un arbre compare une feature à un seuil à la fois (« surface > 80 ? ») : changer l'échelle ne change pas l'ordre des valeurs, donc pas les découpes." },
    { id: "m4q4", type: "mcq", q: "La régression logistique est un algorithme de :", options: ["régression", "classification", "clustering", "réduction de dimension"], answer: 1,
      explain: "Le nom est trompeur : elle prédit une probabilité d'appartenance à une classe, puis une classe." },
    { id: "m4q5", type: "open", q: "Quand choisirais-tu un seuil de décision supérieur à 0,5 ? Donne un exemple.",
      a: "Quand un faux positif coûte cher : bloquer un paiement légitime, envoyer un e-mail important dans les spams, couper l'accès d'un employé. On ne déclenche alors que si le modèle est très sûr." }
  ],
  keypoints: ["Que fait la sigmoïde, et que vaut σ(0) ?", "Qui choisit le seuil, et selon quel critère ?", "Pourquoi k-NN a-t-il besoin de features à la même échelle ?", "Qu'apporte une forêt par rapport à un arbre seul ?"],
  cards: [
    { id: "m4c1", f: "Formule de la sigmoïde ?", b: "σ(z) = 1 / (1 + e^(−z)). Sortie entre 0 et 1 ; σ(0) = 0,5." },
    { id: "m4c2", f: "La régression logistique : régression ou classification ?", b: "Classification, malgré son nom." },
    { id: "m4c3", f: "Rôle du seuil de décision ?", b: "Transformer une probabilité en classe. Il se choisit selon le coût des faux positifs et des faux négatifs." },
    { id: "m4c4", f: "Frontière de décision de la régression logistique ?", b: "w · x + b = 0 : une droite en 2D, un plan en 3D. Classifieur linéaire." },
    { id: "m4c5", f: "Principe de k-NN ?", b: "Classer un point par le vote de ses k voisins les plus proches." },
    { id: "m4c6", f: "k-NN : effet de k petit et de k grand ?", b: "k petit : sensible au bruit (surapprentissage). k grand : plus lisse, peut ignorer les petits groupes." },
    { id: "m4c7", f: "Forêt aléatoire ?", b: "Beaucoup d'arbres entraînés sur des échantillons différents, qui votent. Plus robuste qu'un arbre seul." }
  ]
},
{
  id: "m5", num: 5, title: "Évaluer un modèle", short: "Précision, rappel, F1",
  kind: "Formules et cas pratiques", method: "Moyen mnémotechnique, démo, calculs", minutes: 45,
  objective: "Lire une matrice de confusion et choisir la bonne métrique (précision, rappel, F1) selon le coût des erreurs.",
  pre: {
    q: "Sur un réseau, 1 connexion sur 100 est malveillante. Un modèle qui répond toujours « normal » a quelle accuracy ? Est-il utile ?",
    a: "99 % d'accuracy, et il est totalement inutile : il ne détecte aucune attaque. L'accuracy est trompeuse quand les classes sont déséquilibrées."
  },
  blocks: [
    { title: "La matrice de confusion",
      html: `<p>Prenons un détecteur d'intrusion. La classe « positive » est l'attaque.</p><div class="table-wrap"><table class="confusion"><thead><tr><th></th><th>Prédit : attaque</th><th>Prédit : normal</th></tr></thead><tbody><tr><th>Vraie attaque</th><td><strong>VP</strong> vrai positif<br><span class="note">attaque détectée</span></td><td><strong>FN</strong> faux négatif<br><span class="note">attaque ratée</span></td></tr><tr><th>Trafic normal</th><td><strong>FP</strong> faux positif<br><span class="note">fausse alerte</span></td><td><strong>VN</strong> vrai négatif<br><span class="note">trafic laissé passer</span></td></tr></tbody></table></div><p>Pour lire le nom : le second mot dit ce que le modèle a prédit (positif ou négatif), le premier dit s'il avait raison (vrai ou faux).</p>`,
      recall: { q: "Une alerte se déclenche pour un administrateur qui se connecte normalement. VP, FP, VN ou FN ?",
        a: "Faux positif : le modèle a prédit « attaque » (positif) et il avait tort (faux)." } },
    { title: "Précision et rappel",
      html: `<p class="formula">Précision = VP / (VP + FP)</p><p>Quand le modèle crie au loup, combien de fois y a-t-il vraiment un loup ?</p><p class="formula">Rappel = VP / (VP + FN)</p><p>Sur tous les loups qui sont venus, combien le modèle en a-t-il vus ?</p><p class="mnemo"><strong>Moyen mnémotechnique.</strong> Au dénominateur de la <strong>P</strong>récision : tout ce qui a été <strong>P</strong>rédit positif. Au dénominateur du <strong>R</strong>appel : tout ce qui était <strong>R</strong>éellement positif.</p>`,
      recall: { q: "80 attaques réelles. Le modèle émet 100 alertes, dont 60 correspondent à de vraies attaques. Précision ? Rappel ?",
        a: "VP = 60, FP = 40, FN = 20. Précision = 60 / 100 = 0,60. Rappel = 60 / 80 = 0,75." } },
    { title: "Le compromis, en direct",
      html: `<p>Chaque point est une connexion, placée selon le score donné par le modèle. Tout ce qui est à droite du seuil déclenche une alerte. <strong>Avant de bouger le curseur</strong>, prédis : si tu baisses le seuil, la précision monte ou descend ? Et le rappel ?</p>`,
      demo: "threshold",
      after: `<p>Baisser le seuil attrape plus d'attaques (rappel ↑) mais produit plus de fausses alertes (précision ↓). Monter le seuil fait l'inverse. Il n'existe pas de seuil parfait, seulement un seuil adapté au coût des erreurs.</p>`,
      recall: { q: "Dans un SOC, les analystes sont débordés par les fausses alertes. Tu montes ou tu baisses le seuil ? Qu'est-ce que tu risques ?",
        a: "On monte le seuil pour réduire les faux positifs (précision ↑). Le risque : rater davantage de vraies attaques (rappel ↓)." } },
    { title: "Le score F1",
      html: `<p>Pour résumer précision et rappel en un seul nombre, on prend leur <strong>moyenne harmonique</strong> :</p><p class="formula">F1 = 2 · (précision · rappel) / (précision + rappel)</p><p>La moyenne harmonique punit les déséquilibres : une précision de 1,0 et un rappel de 0,1 donnent une moyenne simple de 0,55, mais un F1 d'environ 0,18. Un bon F1 exige que les deux soient bons.</p>`,
      recall: { q: "Précision 0,60 et rappel 0,75 : calcule le F1.", a: "F1 = 2 × 0,60 × 0,75 / (0,60 + 0,75) = 0,9 / 1,35 ≈ 0,67." } },
    { title: "Et pour une régression ?",
      html: `<p>Pas de matrice de confusion quand on prédit un nombre. On mesure l'écart :</p><ul><li><strong>MAE</strong> (erreur absolue moyenne) : la moyenne des |y − ŷ|, dans l'unité du label. « En moyenne, je me trompe de 1,2 point sur 20. »</li><li><strong>RMSE</strong> : la racine de la MSE, aussi dans l'unité du label. Elle pénalise davantage les grosses erreurs.</li></ul>`,
      recall: { q: "Erreurs de 1, 1 et 4 points. MAE ? RMSE ?",
        a: "MAE = (1 + 1 + 4) / 3 = 2. MSE = (1 + 1 + 16) / 3 = 6, donc RMSE = √6 ≈ 2,45. La RMSE est plus grande car l'erreur de 4 pèse lourd." } }
  ],
  feynman: { prompt: "Explique à un collègue du SOC pourquoi « 99 % d'accuracy » ne suffit pas pour juger un détecteur d'intrusion, et quelles métriques regarder.",
    points: ["Les classes sont déséquilibrées : prédire toujours « normal » donne une accuracy élevée", "Précision : parmi les alertes, combien sont de vraies attaques", "Rappel : parmi les vraies attaques, combien sont détectées", "Le seuil règle le compromis ; le F1 résume les deux"] },
  quiz: [
    { id: "m5q1", type: "mcq", q: "Rappel = ?", options: ["VP / (VP + FP)", "VP / (VP + FN)", "(VP + VN) / total", "VN / (VN + FP)"], answer: 1,
      explain: "Au dénominateur du Rappel : tout ce qui était Réellement positif, soit VP + FN." },
    { id: "m5q2", type: "mcq", q: "Pour un détecteur de ransomware, où rater une attaque coûte extrêmement cher, quelle métrique surveiller en priorité ?", options: ["La précision", "Le rappel", "L'accuracy", "La MAE"], answer: 1,
      explain: "Rater une attaque = un faux négatif. Le rappel mesure justement la part des vraies attaques détectées." },
    { id: "m5q3", type: "mcq", q: "Un modèle a 50 VP, 50 FP et 0 FN. Sa précision et son rappel valent :", options: ["0,5 et 1,0", "1,0 et 0,5", "0,5 et 0,5", "1,0 et 1,0"], answer: 0,
      explain: "Précision = 50 / (50 + 50) = 0,5. Rappel = 50 / (50 + 0) = 1,0 : il trouve tout, mais une alerte sur deux est fausse." },
    { id: "m5q4", type: "mcq", q: "Pourquoi l'accuracy est-elle trompeuse avec des classes très déséquilibrées ?", options: ["Elle est difficile à calculer", "Un modèle qui prédit toujours la classe majoritaire obtient un score élevé sans rien détecter", "Elle ne fonctionne qu'en régression", "Elle ignore les vrais négatifs"], answer: 1,
      explain: "Avec 99 % de trafic normal, répondre toujours « normal » donne 99 % d'accuracy et zéro attaque détectée." },
    { id: "m5q5", type: "open", q: "Sur papier, dessine de mémoire la matrice de confusion avec VP, FP, FN et VN, puis écris les formules de la précision et du rappel.",
      a: "Lignes = la réalité (attaque, normal), colonnes = la prédiction (attaque, normal). VP en haut à gauche, FN en haut à droite, FP en bas à gauche, VN en bas à droite. Précision = VP / (VP + FP). Rappel = VP / (VP + FN)." }
  ],
  keypoints: ["Que signifient VP, FP, FN et VN ?", "Quelles sont les formules de la précision et du rappel ?", "Que se passe-t-il quand on baisse le seuil ?", "Pourquoi l'accuracy trompe-t-elle sur des classes déséquilibrées ?"],
  cards: [
    { id: "m5c1", f: "Faux positif (FP) ?", b: "Le modèle prédit « positif » (alerte) et il a tort : une fausse alerte." },
    { id: "m5c2", f: "Faux négatif (FN) ?", b: "Le modèle prédit « négatif » et il a tort : une attaque ratée." },
    { id: "m5c3", f: "Formule et sens de la précision ?", b: "VP / (VP + FP). Parmi les alertes, la part de vraies attaques." },
    { id: "m5c4", f: "Formule et sens du rappel ?", b: "VP / (VP + FN). Parmi les vraies attaques, la part détectée." },
    { id: "m5c5", f: "Formule du F1 ?", b: "F1 = 2 · P · R / (P + R), la moyenne harmonique de la précision et du rappel." },
    { id: "m5c6", f: "Baisser le seuil de décision : effet ?", b: "Rappel ↑, précision ↓ (plus d'alertes, donc plus de fausses alertes)." },
    { id: "m5c7", f: "Piège de l'accuracy ?", b: "Avec des classes déséquilibrées, prédire toujours la classe majoritaire donne un score élevé sans rien détecter." },
    { id: "m5c8", f: "MAE ou RMSE ?", b: "MAE : moyenne des |erreurs|. RMSE : racine de la MSE, pénalise davantage les grosses erreurs. Toutes deux dans l'unité du label." }
  ]
},
{
  id: "m6", num: 6, title: "Surapprentissage et généralisation", short: "Apprendre sans réciter",
  kind: "Concept et diagnostic", method: "Analogie, démo, questions de diagnostic mélangées", minutes: 40,
  objective: "Reconnaître le sous-apprentissage et le surapprentissage à partir des erreurs, et connaître les remèdes.",
  pre: {
    q: "Un étudiant apprend par cœur les corrigés des annales. Il obtient 20/20 sur les annales et 6/20 à l'examen. Quel est son problème ?",
    a: "Il a mémorisé des réponses au lieu de comprendre les méthodes : il ne généralise pas à des questions nouvelles. En ML, c'est le surapprentissage (overfitting)."
  },
  blocks: [
    { title: "Trop simple, trop collé, juste bien",
      html: `<ul><li><strong>Sous-apprentissage</strong> (<em>underfitting</em>) : le modèle est trop simple pour capter la tendance. Erreur élevée sur le train <em>et</em> sur la validation.</li><li><strong>Surapprentissage</strong> (<em>overfitting</em>) : le modèle apprend aussi le bruit des exemples. Erreur très faible sur le train, élevée sur la validation.</li><li><strong>Bonne généralisation</strong> : les deux erreurs sont basses et proches.</li></ul><p>Le but du ML n'est pas de réussir sur les données vues, mais sur les données <strong>nouvelles</strong>.</p>`,
      recall: { q: "Erreur train 2 %, erreur validation 25 %. Diagnostic ?", a: "Surapprentissage : excellent sur ce qu'il a vu, mauvais sur le nouveau. C'est l'écart entre les deux erreurs qui alerte." } },
    { title: "Voir le phénomène",
      html: `<p>Les ronds bleus servent à l'entraînement ; les carrés orange sont des données nouvelles. Le modèle est un polynôme dont tu choisis le degré. <strong>Prédis d'abord</strong> : que devient l'erreur sur les nouvelles données quand le degré devient très grand ?</p>`,
      demo: "overfit",
      after: `<p>Degré 1 : une droite qui rate la courbure (sous-apprentissage). Degré 3 à 6 : la tendance est captée. Au-delà, la courbe passe presque par chaque rond bleu et ondule entre eux : l'erreur d'entraînement continue de baisser, l'erreur sur les nouvelles données s'envole.</p>`,
      recall: { q: "Sur la démo, quel type de degré donne la plus petite erreur sur les nouvelles données, et pourquoi pas le plus grand ?",
        a: "Un degré intermédiaire (ici entre 3 et 6). Le plus grand degré colle au bruit des points d'entraînement et ondule, ce qui le fait se tromper sur les nouvelles données." } },
    { title: "Biais et variance",
      html: `<p>Deux sources d'erreur qui tirent en sens opposés :</p><ul><li><strong>Biais</strong> : erreur due à des hypothèses trop simples. Beaucoup de biais = sous-apprentissage.</li><li><strong>Variance</strong> : sensibilité aux exemples précis vus à l'entraînement. Si on change un peu les données, le modèle change beaucoup. Beaucoup de variance = surapprentissage.</li></ul><p>Image : une cible de tir. Biais élevé, les tirs sont groupés mais décalés du centre. Variance élevée, les tirs sont éparpillés. Augmenter la complexité du modèle réduit le biais mais augmente la variance : on cherche l'équilibre.</p>`,
      recall: { q: "Un modèle change complètement quand on l'entraîne sur un autre échantillon des mêmes données. Biais ou variance élevé ?",
        a: "Variance élevée : il dépend trop des exemples précis, signe de surapprentissage." } },
    { title: "Les remèdes",
      html: `<div class="table-wrap"><table><thead><tr><th>Problème</th><th>Remèdes</th></tr></thead><tbody><tr><td>Surapprentissage</td><td>plus de données ; modèle plus simple ; régularisation ; arrêt précoce (<em>early stopping</em>) ; dropout pour les réseaux de neurones</td></tr><tr><td>Sous-apprentissage</td><td>modèle plus complexe ; meilleures features ; moins de régularisation ; entraînement plus long</td></tr></tbody></table></div><p>La <strong>régularisation</strong> ajoute une pénalité au coût, par exemple L2 :</p><p class="formula">L = MSE + λ · Σ wⱼ²</p><p>Le modèle doit garder des poids modestes, donc une courbe plus sage. λ est un hyperparamètre : trop grand, le modèle devient trop simple.</p>`,
      recall: { q: "Ton modèle surapprend. Cite trois remèdes.", a: "Au choix : récolter plus de données, simplifier le modèle, ajouter de la régularisation, arrêter l'entraînement plus tôt (early stopping), utiliser le dropout pour un réseau de neurones." } },
    { title: "La validation croisée",
      html: `<p>Avec peu de données, un seul découpage train / validation est fragile : le score dépend du hasard du découpage. La <strong>validation croisée à k plis</strong> (<em>k-fold</em>) découpe les données en k parts. On entraîne k fois, en gardant chaque fois une part différente pour valider, puis on fait la moyenne des k scores.</p><p>Avec k = 5 : 5 entraînements, chacun sur 80 % des données, validé sur les 20 % restants.</p>`,
      recall: { q: "Avec une validation croisée à 10 plis, combien d'entraînements, et sur quelle part des données chacun ?", a: "10 entraînements, chacun sur 90 % des données et validé sur les 10 % restants." } }
  ],
  feynman: { prompt: "Explique le surapprentissage à un camarade avec l'analogie des annales, puis dis-lui comment le détecter et comment le corriger.",
    points: ["Surapprendre = réciter les exemples (et leur bruit) au lieu de capter la tendance", "Signe : erreur train basse, erreur validation haute", "Sous-apprentissage : les deux erreurs sont hautes", "Remèdes : plus de données, modèle plus simple, régularisation, arrêt précoce"] },
  quiz: [
    { id: "m6q1", type: "mcq", q: "Erreur train 30 %, erreur validation 31 %, alors que les meilleurs modèles connus font 5 %. Diagnostic le plus probable ?", options: ["Surapprentissage", "Sous-apprentissage", "Modèle parfait", "Fuite de données"], answer: 1,
      explain: "Les deux erreurs sont hautes et proches : le modèle est trop simple pour capter la tendance." },
    { id: "m6q2", type: "mcq", q: "Laquelle de ces actions réduit le surapprentissage ?", options: ["Augmenter le degré du polynôme", "Ajouter une régularisation L2", "Supprimer le jeu de validation", "Entraîner plus longtemps sans surveiller"], answer: 1,
      explain: "La régularisation pénalise les grands poids et force un modèle plus sage. Les autres options aggravent le problème ou empêchent de le voir." },
    { id: "m6q3", type: "mcq", q: "Dans L = MSE + λ Σ w², que se passe-t-il si λ est très grand ?", options: ["Les poids deviennent énormes", "Les poids sont poussés vers 0 et le modèle devient trop simple", "λ n'a aucun effet", "Le modèle surapprend davantage"], answer: 1,
      explain: "La pénalité domine le coût : le modèle préfère des poids presque nuls, quitte à mal coller aux données. On passe en sous-apprentissage." },
    { id: "m6q4", type: "mcq", q: "L'arrêt précoce (early stopping) consiste à :", options: ["arrêter quand l'erreur d'entraînement atteint zéro", "arrêter quand l'erreur de validation recommence à monter", "arrêter après une seule époque", "supprimer les features inutiles"], answer: 1,
      explain: "Quand la validation se dégrade alors que le train continue de s'améliorer, le modèle commence à apprendre le bruit : on s'arrête là." },
    { id: "m6q5", type: "open", q: "Explique la différence entre biais et variance avec l'image d'une cible de tir.",
      a: "Biais élevé : les tirs sont groupés mais loin du centre (erreur systématique, modèle trop simple). Variance élevée : les tirs sont éparpillés (le résultat dépend trop des données, modèle trop complexe). L'idéal : groupés au centre." }
  ],
  keypoints: ["Comment reconnaître le surapprentissage à partir des erreurs ?", "Et le sous-apprentissage ?", "Que fait la régularisation, et quel est le rôle de λ ?", "Pourquoi utiliser la validation croisée ?"],
  cards: [
    { id: "m6c1", f: "Surapprentissage : symptôme ?", b: "Erreur train très basse, erreur validation élevée." },
    { id: "m6c2", f: "Sous-apprentissage : symptôme ?", b: "Erreur élevée sur le train et sur la validation." },
    { id: "m6c3", f: "Biais élevé ou variance élevée : lequel correspond au surapprentissage ?", b: "Variance élevée. Le biais élevé correspond au sous-apprentissage." },
    { id: "m6c4", f: "Régularisation L2 ?", b: "Ajouter λ · Σ w² au coût pour garder des poids modestes. λ grand → modèle plus simple." },
    { id: "m6c5", f: "Arrêt précoce (early stopping) ?", b: "Stopper l'entraînement quand l'erreur de validation recommence à monter." },
    { id: "m6c6", f: "Validation croisée à k plis ?", b: "k entraînements, chacun validé sur une part différente des données ; on moyenne les k scores." },
    { id: "m6c7", f: "Trois remèdes au surapprentissage ?", b: "Plus de données, modèle plus simple, régularisation (aussi : early stopping, dropout)." }
  ]
},
{
  id: "m7", num: 7, title: "Apprentissage non supervisé", short: "k-means, PCA, anomalies",
  kind: "Procédure et concepts", method: "Étapes déroulées à la main, démo pas à pas", minutes: 40,
  objective: "Savoir dérouler k-means, choisir k, et comprendre à quoi servent la PCA et la détection d'anomalies.",
  pre: {
    q: "Tu as les habitudes d'écoute de 5 000 auditeurs (genres, heures, durée), mais aucune catégorie. Comment faire apparaître des « profils » d'auditeurs ?",
    a: "En regroupant automatiquement les auditeurs qui se ressemblent : c'est du clustering, par exemple avec k-means."
  },
  blocks: [
    { title: "L'algorithme k-means",
      html: `<ol><li>Choisir k, le nombre de groupes.</li><li>Placer k <strong>centres</strong> au hasard.</li><li><strong>Assigner</strong> chaque point au centre le plus proche.</li><li><strong>Recentrer</strong> : déplacer chaque centre à la moyenne de ses points.</li><li>Répéter 3 et 4 jusqu'à ce que plus rien ne bouge.</li></ol><p class="mnemo"><strong>À retenir :</strong> on assigne, on recentre, on recommence.</p>`,
      recall: { q: "Complète la boucle de k-means : on ______ chaque point au centre le plus proche, puis on ______ chaque centre.",
        a: "On assigne chaque point au centre le plus proche, puis on recentre chaque centre à la moyenne de ses points. Et on recommence jusqu'à stabilité." } },
    { title: "À toi de dérouler",
      html: `<p>Fais avancer l'algorithme étape par étape. <strong>Avant chaque clic</strong>, dis à voix haute ce qui va se passer : assignation ou recentrage ? Quels points vont changer de groupe ?</p>`,
      demo: "kmeans",
      after: `<p>Relance avec une autre initialisation : le résultat final peut changer. k-means trouve un bon regroupement, pas forcément le meilleur possible. En pratique, on le lance plusieurs fois et on garde la solution à la plus petite inertie.</p>`,
      recall: { q: "Pourquoi lance-t-on souvent k-means plusieurs fois avec des centres de départ différents ?",
        a: "Parce que le résultat dépend de l'initialisation : l'algorithme peut s'arrêter sur une solution moins bonne. On garde le lancement où les points sont le plus proches de leurs centres (inertie minimale)." } },
    { title: "Choisir k",
      html: `<p>k-means ne devine pas le nombre de groupes. <strong>Méthode du coude</strong> : on lance k-means pour k = 1, 2, 3… et on trace l'<strong>inertie</strong>, la somme des distances au carré entre chaque point et son centre. L'inertie baisse toujours quand k augmente ; on choisit le k où la baisse ralentit nettement, le « coude ».</p><p>Le bon sens métier compte aussi : 3 profils de clients exploitables valent mieux que 12 profils que personne n'utilise.</p>`,
      recall: { q: "Pourquoi ne pas simplement choisir le k qui donne la plus petite inertie ?",
        a: "Parce que l'inertie diminue toujours quand k augmente. Avec autant de groupes que de points, elle vaut 0 (chaque point est son propre centre), ce qui ne sert à rien." } },
    { title: "Réduire les dimensions : la PCA",
      html: `<p>Quand chaque exemple a des dizaines de features, beaucoup sont redondantes. L'<strong>analyse en composantes principales</strong> (PCA) cherche de nouvelles directions, combinaisons des features d'origine, qui capturent le plus de variation possible. On garde les premières et on laisse tomber les autres.</p><p>Usages : visualiser des données en 2D, accélérer un modèle, réduire le bruit. Image : photographier un objet 3D sous l'angle qui montre le mieux sa forme.</p>`,
      recall: { q: "Que cherche la première composante principale ?", a: "La direction selon laquelle les données varient le plus, c'est-à-dire où elles sont le plus étalées." } },
    { title: "Détecter les anomalies",
      html: `<p>Idée : apprendre à quoi ressemble le « normal », puis signaler ce qui s'en écarte trop. Méthodes courantes : distance au centre du groupe le plus proche, densité locale (un point isolé est suspect), ou <em>isolation forest</em> (un point qu'on isole avec très peu de découpes aléatoires est probablement anormal).</p><p>En cybersécurité : un compte qui télécharge 50 fois plus que d'habitude, une connexion depuis un pays jamais vu. Une anomalie n'est pas forcément une attaque : c'est un signal à investiguer.</p>`,
      recall: { q: "Pourquoi une anomalie détectée ne prouve-t-elle pas une attaque ?",
        a: "Parce qu'elle signale seulement un comportement inhabituel, qui peut avoir une explication légitime (un employé en voyage, une sauvegarde exceptionnelle). C'est à l'analyste d'investiguer." } }
  ],
  feynman: { prompt: "Explique k-means étape par étape à quelqu'un, puis explique comment tu choisirais k.",
    points: ["Choisir k et placer k centres", "Assigner chaque point au centre le plus proche", "Recentrer chaque centre à la moyenne de ses points, recommencer", "Choisir k avec la méthode du coude et le bon sens métier"] },
  quiz: [
    { id: "m7q1", type: "mcq", q: "Dans k-means, après avoir assigné les points, l'étape suivante est :", options: ["Choisir un nouveau k", "Recentrer chaque centre à la moyenne de ses points", "Supprimer les points éloignés", "Étiqueter les points à la main"], answer: 1,
      explain: "La boucle est : assigner, recentrer, recommencer." },
    { id: "m7q2", type: "mcq", q: "La méthode du coude sert à :", options: ["choisir le nombre de clusters k", "normaliser les données", "choisir le seuil de décision", "calculer le F1"], answer: 0,
      explain: "On trace l'inertie en fonction de k et on repère le point où la baisse ralentit nettement." },
    { id: "m7q3", type: "mcq", q: "La PCA est une méthode de :", options: ["classification supervisée", "réduction de dimension", "régression", "renforcement"], answer: 1,
      explain: "Elle résume beaucoup de features en quelques directions qui capturent l'essentiel de la variation." },
    { id: "m7q4", type: "mcq", q: "k-means peut donner des résultats différents d'un lancement à l'autre parce que :", options: ["les données changent", "les centres de départ sont tirés au hasard", "k change tout seul", "il utilise des labels aléatoires"], answer: 1,
      explain: "L'initialisation aléatoire des centres peut mener à des solutions finales différentes." },
    { id: "m7q5", type: "open", q: "Sans regarder, écris les étapes de k-means dans l'ordre.",
      a: "1. Choisir k. 2. Placer k centres au hasard. 3. Assigner chaque point au centre le plus proche. 4. Recentrer chaque centre à la moyenne de ses points. 5. Répéter 3 et 4 jusqu'à stabilité." }
  ],
  keypoints: ["Quelles sont les étapes de k-means ?", "Pourquoi le résultat dépend-il de l'initialisation ?", "Comment choisir k ?", "À quoi sert la PCA ?"],
  cards: [
    { id: "m7c1", f: "La boucle de k-means ?", b: "Assigner chaque point au centre le plus proche, recentrer chaque centre, recommencer jusqu'à stabilité." },
    { id: "m7c2", f: "Inertie (k-means) ?", b: "La somme des distances au carré entre chaque point et le centre de son groupe." },
    { id: "m7c3", f: "Méthode du coude ?", b: "Tracer l'inertie selon k et choisir le k où la baisse ralentit nettement." },
    { id: "m7c4", f: "Pourquoi relancer k-means plusieurs fois ?", b: "Le résultat dépend des centres de départ ; on garde la solution à la plus petite inertie." },
    { id: "m7c5", f: "PCA : que fait-elle ?", b: "Elle trouve les directions qui capturent le plus de variation, pour réduire le nombre de dimensions." },
    { id: "m7c6", f: "Détection d'anomalies : principe ?", b: "Apprendre le « normal » et signaler ce qui s'en écarte. Une anomalie est un signal à investiguer, pas une preuve." }
  ]
},
{
  id: "m8", num: 8, title: "Réseaux de neurones", short: "Du neurone au deep learning",
  kind: "Mécanisme", method: "Trois niveaux d'explication, schémas, Feynman", minutes: 45,
  objective: "Comprendre ce que calcule un neurone, pourquoi on empile des couches avec des activations non linéaires, et comment le réseau apprend.",
  pre: {
    q: "Tu connais déjà un réseau de neurones à un seul neurone, vu au module 4. Lequel ?",
    a: "La régression logistique : une somme pondérée des entrées plus un biais, passée dans une sigmoïde. C'est exactement ce que calcule un neurone."
  },
  blocks: [
    { title: "Un neurone artificiel",
      html: `<p>Un neurone fait trois choses :</p><ol><li>Il multiplie chaque entrée par un poids : <code>w₁x₁, w₂x₂, …</code></li><li>Il additionne et ajoute un biais : <code>z = w · x + b</code></li><li>Il applique une <strong>fonction d'activation</strong> : <code>a = f(z)</code></li></ol>NEURON_SVG<p>Avec f = sigmoïde, c'est une régression logistique. Un réseau, ce sont des centaines ou des millions de ces petites unités reliées entre elles.</p>`,
      recall: { q: "Entrées x = (2 ; 1), poids w = (0,5 ; −1), biais b = 1. Que vaut z ?", a: "z = 0,5 × 2 + (−1) × 1 + 1 = 1 − 1 + 1 = 1." } },
    { title: "Les fonctions d'activation",
      html: `<ul><li><strong>ReLU</strong> : <code>max(0, z)</code>. Laisse passer le positif, coupe le négatif. La plus utilisée dans les couches cachées.</li><li><strong>Sigmoïde</strong> : une sortie entre 0 et 1, pour une probabilité (classification à deux classes).</li><li><strong>Softmax</strong> : transforme un vecteur de scores en probabilités qui somment à 1, pour choisir parmi plusieurs classes.</li></ul><p><strong>Pourquoi c'est indispensable</strong> : sans activation non linéaire, empiler des couches revient à enchaîner des multiplications de matrices, et le tout reste une seule fonction linéaire. Le réseau ne pourrait pas apprendre de frontière courbe, même avec 100 couches.</p>`,
      recall: { q: "Que valent ReLU(−3) et ReLU(2,5) ?", a: "ReLU(−3) = 0 et ReLU(2,5) = 2,5." } },
    { title: "Des couches",
      html: `<p>Un réseau est organisé en <strong>couches</strong> : la couche d'entrée (les features), une ou plusieurs couches <strong>cachées</strong>, puis la couche de sortie (la prédiction). Dans un réseau dense, chaque neurone reçoit toutes les sorties de la couche précédente.</p>NETWORK_SVG<p>Les premières couches repèrent des motifs simples, les suivantes les combinent en motifs plus abstraits. Pour une image : bords → formes → objets. <em>Deep learning</em> signifie qu'il y a beaucoup de couches cachées.</p>`,
      recall: { q: "3 entrées, une couche cachée de 4 neurones, 1 sortie. Combien de poids, sans compter les biais ?",
        a: "3 × 4 = 12 poids vers la couche cachée, plus 4 × 1 = 4 vers la sortie : 16 poids. S'y ajoutent 5 biais (4 + 1)." } },
    { title: "Comment le réseau apprend",
      html: `<p>Le cycle d'entraînement se répète des milliers de fois :</p><ol><li><strong>Propagation avant</strong> : les données traversent le réseau, on obtient une prédiction.</li><li><strong>Perte</strong> : on la compare à la bonne réponse (MSE, entropie croisée…).</li><li><strong>Rétropropagation</strong> : on calcule le gradient de la perte par rapport à chaque poids, de la sortie vers l'entrée, grâce à la règle de dérivation en chaîne.</li><li><strong>Mise à jour</strong> : descente de gradient sur tous les poids (module 3).</li></ol><p class="mnemo"><strong>À retenir :</strong> prédire, mesurer, remonter, corriger.</p><p>Vocabulaire : un <strong>batch</strong> est un paquet d'exemples traités ensemble ; une <strong>époque</strong> est un passage complet sur tout le jeu d'entraînement.</p>`,
      recall: { q: "Donne les quatre étapes d'une itération d'entraînement, dans l'ordre.", a: "Prédire (propagation avant), mesurer (perte), remonter (rétropropagation du gradient), corriger (mise à jour des poids)." } },
    { title: "Les grandes familles",
      html: `<ul><li><strong>Réseaux denses</strong> (perceptron multicouche) : données en tableau.</li><li><strong>Réseaux convolutifs</strong> (CNN) : images. De petits filtres glissent sur l'image et détectent des motifs locaux, où qu'ils se trouvent.</li><li><strong>Réseaux récurrents</strong> (RNN) : séquences traitées pas à pas ; aujourd'hui largement remplacés par les transformers.</li><li><strong>Transformers</strong> : séquences (texte, code, audio), traitées grâce au mécanisme d'<em>attention</em>, qui permet à chaque élément de tenir compte de tous les autres. C'est l'architecture des grands modèles de langage.</li></ul>`,
      recall: { q: "Quelle architecture choisirais-tu pour classer des photos, et laquelle pour traduire des phrases ?", a: "Photos : un réseau convolutif (CNN), ou un transformer adapté aux images. Traduction : un transformer." } }
  ],
  feynman: { prompt: "Explique ce qu'est un réseau de neurones et comment il apprend, en partant d'un seul neurone.",
    points: ["Un neurone : somme pondérée + biais, puis activation", "Sans activation non linéaire, les couches empilées restent linéaires", "Couches : entrée, cachées, sortie", "Apprentissage : prédire, mesurer la perte, rétropropager, mettre à jour"] },
  quiz: [
    { id: "m8q1", type: "mcq", q: "Pourquoi utilise-t-on des fonctions d'activation non linéaires ?", options: ["Pour accélérer le calcul", "Sans elles, un empilement de couches reste une fonction linéaire", "Pour normaliser les données", "Pour réduire le nombre de poids"], answer: 1,
      explain: "La composition de fonctions linéaires est linéaire. La non-linéarité permet d'apprendre des frontières courbes." },
    { id: "m8q2", type: "mcq", q: "Une époque, c'est :", options: ["un passage complet sur tout le jeu d'entraînement", "la mise à jour d'un seul poids", "un paquet d'exemples traités ensemble", "une couche cachée"], answer: 0,
      explain: "Le paquet d'exemples, c'est le batch. L'époque est un passage complet sur tout le train." },
    { id: "m8q3", type: "mcq", q: "La rétropropagation sert à :", options: ["calculer le gradient de la perte par rapport à chaque poids", "générer de nouvelles données", "choisir le nombre de couches", "transformer des scores en probabilités"], answer: 0,
      explain: "Elle propage l'erreur de la sortie vers l'entrée avec la règle de dérivation en chaîne. La descente de gradient utilise ensuite ces gradients." },
    { id: "m8q4", type: "mcq", q: "Pour une sortie qui choisit entre 10 classes, on utilise en général :", options: ["ReLU", "Softmax", "Aucune activation", "La MSE"], answer: 1,
      explain: "Softmax transforme les 10 scores en 10 probabilités qui somment à 1." },
    { id: "m8q5", type: "open", q: "Explique pourquoi la régression logistique est « un réseau de neurones à un seul neurone ».",
      a: "Un neurone calcule une somme pondérée des entrées plus un biais, puis applique une activation. La régression logistique fait exactement cela, avec la sigmoïde comme activation." }
  ],
  keypoints: ["Que calcule un neurone ?", "Pourquoi faut-il des activations non linéaires ?", "Quelles sont les quatre étapes de l'entraînement ?", "Quelle différence entre batch et époque ?"],
  cards: [
    { id: "m8c1", f: "Que calcule un neurone ?", b: "a = f(w · x + b) : somme pondérée des entrées, plus un biais, puis activation." },
    { id: "m8c2", f: "ReLU ?", b: "max(0, z). Coupe le négatif, laisse passer le positif." },
    { id: "m8c3", f: "Softmax ?", b: "Transforme un vecteur de scores en probabilités qui somment à 1 (plusieurs classes)." },
    { id: "m8c4", f: "Pourquoi une activation non linéaire ?", b: "Sinon l'empilement de couches reste une seule fonction linéaire." },
    { id: "m8c5", f: "Les 4 étapes d'une itération d'entraînement ?", b: "Prédire (propagation avant), mesurer (perte), remonter (rétropropagation), corriger (mise à jour)." },
    { id: "m8c6", f: "Batch ou époque ?", b: "Batch : paquet d'exemples traités ensemble. Époque : passage complet sur le jeu d'entraînement." },
    { id: "m8c7", f: "CNN ou transformer ?", b: "CNN : images (filtres locaux). Transformer : séquences comme le texte (attention)." }
  ]
},
{
  id: "m9", num: 9, title: "Un projet de A à Z en Python", short: "scikit-learn en pratique",
  kind: "Savoir-faire pratique", method: "Pratique délibérée, code à trous, mini-projet", minutes: 60,
  objective: "Enchaîner les étapes d'un projet de machine learning avec scikit-learn et écrire le code de base sans aide.",
  pre: {
    q: "Dans quel ordre fais-tu ces quatre étapes : entraîner, séparer train et test, évaluer, mettre à l'échelle ?",
    a: "Séparer train et test → mettre à l'échelle (ajustée sur le train) → entraîner → évaluer sur le test."
  },
  blocks: [
    { title: "Le déroulé d'un projet",
      html: `<ol><li>Définir le problème : que prédit-on, pour quoi faire, quelle métrique compte ?</li><li>Charger et explorer les données.</li><li>Séparer train et test.</li><li>Prétraiter (nettoyage, encodage, mise à l'échelle), ajusté sur le train uniquement.</li><li>Entraîner un modèle simple de référence, la <strong>baseline</strong>.</li><li>Évaluer sur la validation, améliorer, recommencer.</li><li>Évaluer une seule fois sur le test.</li></ol><p>Toujours commencer par une baseline simple : si un modèle complexe ne fait pas mieux, il ne sert à rien.</p>`,
      recall: { q: "Pourquoi commencer par un modèle simple plutôt que par un réseau de neurones ?", a: "Pour avoir vite un point de référence, facile à comprendre. Un modèle plus complexe doit prouver qu'il fait mieux que cette baseline." } },
    { title: "Le code complet, commenté",
      html: `<pre class="code"><code><span class="cm"># 1. Imports</span>
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report

<span class="cm"># 2. Données : 569 tumeurs, 30 features, label 0 = maligne, 1 = bénigne</span>
X, y = load_breast_cancer(return_X_y=True)

<span class="cm"># 3. Séparation (stratify garde la même proportion de classes)</span>
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42)

<span class="cm"># 4. Pipeline : mise à l'échelle puis modèle</span>
model = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))

<span class="cm"># 5. Entraînement : le scaler apprend μ et σ sur le train seulement</span>
model.fit(X_train, y_train)

<span class="cm"># 6. Évaluation sur le test</span>
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))</code></pre><p>Le <strong>pipeline</strong> te protège de la fuite de données : <code>fit</code> ajuste le scaler et le modèle sur le train, puis <code>predict</code> applique au test la même transformation, sans rien réapprendre.</p>`,
      recall: { q: "Dans ce code, où est calculée la moyenne utilisée pour standardiser les données de test ?", a: "Sur le train, pendant model.fit(X_train, y_train). Au moment de predict(X_test), le scaler réutilise cette moyenne sans la recalculer." } },
    { title: "fit, transform, predict",
      html: `<div class="table-wrap"><table><thead><tr><th>Méthode</th><th>Qui l'a</th><th>Ce qu'elle fait</th></tr></thead><tbody>
<tr><td><code>fit(X, y)</code></td><td>prétraitements et modèles</td><td>apprendre (μ et σ, ou les poids)</td></tr>
<tr><td><code>transform(X)</code></td><td>prétraitements</td><td>appliquer la transformation apprise</td></tr>
<tr><td><code>fit_transform(X)</code></td><td>prétraitements</td><td>fit puis transform : sur le train seulement</td></tr>
<tr><td><code>predict(X)</code></td><td>modèles</td><td>prédire des classes ou des valeurs</td></tr>
<tr><td><code>predict_proba(X)</code></td><td>classifieurs</td><td>donner la probabilité de chaque classe</td></tr>
</tbody></table></div><p>Piège classique : appeler <code>fit_transform</code> sur le test. Le scaler réapprend μ et σ sur le test, qui n'est plus transformé comme le train : l'évaluation est faussée.</p>`,
      recall: { q: "Sur quelles données appelle-t-on fit_transform, et sur lesquelles transform seulement ?", a: "fit_transform sur le train ; transform seulement sur la validation et le test." } },
    { title: "Code à trous",
      html: `<p>Sans regarder plus haut, complète les quatre trous dans ta tête ou dans ton éditeur.</p><pre class="code"><code>scaler = StandardScaler()
X_train_s = scaler.<span class="gap">______</span>(X_train)
X_test_s  = scaler.<span class="gap">______</span>(X_test)
clf = LogisticRegression(max_iter=1000)
clf.<span class="gap">______</span>(X_train_s, y_train)
proba = clf.<span class="gap">______</span>(X_test_s)[:, 1]
y_pred = (proba &gt;= 0.3).astype(int)</code></pre>`,
      recall: { q: "Donne les quatre mots manquants, puis explique ce que fait la dernière ligne.", a: "fit_transform, transform, fit, predict_proba. La dernière ligne applique un seuil de décision de 0,3 au lieu de 0,5 : plus de prédictions positives, donc un rappel plus élevé et une précision plus basse (module 5)." } },
    { title: "Ton mini-projet",
      html: `<p>Refais le projet toi-même, sans copier, sur un autre dataset intégré à scikit-learn : <code>load_iris</code> (150 fleurs, 4 features, 3 espèces) ou <code>load_wine</code> (178 vins, 13 features, 3 cultivars).</p><ol><li>Écris le code de mémoire. Tu bloques ? Regarde une seule ligne, referme, continue.</li><li>Prédis ton score avant de lancer le code.</li><li>Compare deux modèles : <code>LogisticRegression</code> et <code>KNeighborsClassifier</code>.</li><li>Change un seul réglage à la fois (le k de k-NN, par exemple) et note l'effet.</li><li>Rédige cinq lignes : ce que tu as fait, le meilleur modèle, sa métrique, ce que tu essaierais ensuite.</li></ol><p>Ces cinq lignes peuvent devenir une entrée de portfolio.</p>`,
      recall: { q: "Pourquoi prédire ton score avant de lancer le code ?", a: "Comparer ta prédiction au résultat montre ce que tu as vraiment compris. Une surprise signale une notion à revoir." } }
  ],
  feynman: { prompt: "Explique à voix haute, sans regarder, chaque ligne du code complet et pourquoi elle est à cet endroit.",
    points: ["Charger X et y", "Séparer avec train_test_split, stratify pour garder les proportions", "Pipeline : StandardScaler puis modèle, pour éviter la fuite", "fit sur le train, predict et rapport sur le test"] },
  quiz: [
    { id: "m9q1", type: "mcq", q: "Que fait model.fit(X_train, y_train) dans un pipeline StandardScaler + LogisticRegression ?", options: ["Il standardise le test", "Il apprend μ et σ sur le train, standardise le train, puis entraîne le modèle", "Il prédit les labels du train", "Il sépare les données"], answer: 1,
      explain: "Le pipeline enchaîne fit_transform du scaler puis fit du modèle, uniquement sur les données qu'on lui passe : le train." },
    { id: "m9q2", type: "mcq", q: "Pourquoi stratify=y dans train_test_split ?", options: ["Pour mélanger les features", "Pour garder la même proportion de chaque classe dans le train et le test", "Pour normaliser y", "Pour accélérer l'entraînement"], answer: 1,
      explain: "Sans stratification, le hasard peut déséquilibrer les classes entre train et test, surtout avec peu de données." },
    { id: "m9q3", type: "mcq", q: "Quelle méthode renvoie des probabilités plutôt que des classes ?", options: ["predict", "predict_proba", "transform", "score"], answer: 1,
      explain: "predict_proba renvoie une probabilité par classe ; predict applique le seuil par défaut et renvoie la classe." },
    { id: "m9q4", type: "mcq", q: "Tu appelles scaler.fit_transform(X_test). Quel est le problème ?", options: ["Aucun", "Le scaler réapprend ses paramètres sur le test : le test n'est plus transformé comme le train et l'évaluation est faussée", "Le test devient plus grand", "Le modèle ne peut plus prédire"], answer: 1,
      explain: "Le modèle a appris sur des données standardisées avec μ et σ du train. Le test doit être transformé avec ces mêmes valeurs : transform, pas fit_transform." },
    { id: "m9q5", type: "open", q: "Écris de mémoire les lignes essentielles d'un projet scikit-learn : chargement, séparation, pipeline, fit, predict, rapport.",
      a: "X, y = load_breast_cancer(return_X_y=True) ; X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y) ; model = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000)) ; model.fit(X_train, y_train) ; y_pred = model.predict(X_test) ; print(classification_report(y_test, y_pred))." }
  ],
  keypoints: ["Quelles sont les étapes d'un projet, dans l'ordre ?", "Pourquoi utiliser un pipeline ?", "Quelle différence entre fit, transform et fit_transform ?", "Qu'est-ce qu'une baseline, et pourquoi commencer par elle ?"],
  cards: [
    { id: "m9c1", f: "Ordre des étapes d'un projet ML ?", b: "Problème → données → séparation → prétraitement (sur le train) → baseline → validation et itération → test final unique." },
    { id: "m9c2", f: "À quoi sert un pipeline scikit-learn ?", b: "Enchaîner prétraitement et modèle pour que tout soit ajusté sur le train et appliqué tel quel au test (pas de fuite)." },
    { id: "m9c3", f: "fit_transform ou transform ?", b: "fit_transform sur le train ; transform sur la validation et le test." },
    { id: "m9c4", f: "predict ou predict_proba ?", b: "predict : la classe. predict_proba : la probabilité de chaque classe (utile pour choisir son seuil)." },
    { id: "m9c5", f: "stratify=y dans train_test_split ?", b: "Garde la même proportion de classes dans le train et le test." },
    { id: "m9c6", f: "Baseline ?", b: "Un modèle simple de référence. Un modèle plus complexe doit faire mieux pour être justifié." }
  ]
}
];

const DIAG = [
  { id: "d1", area: "maths", label: "Dérivées", q: "La dérivée de f(w) = (w − 3)² vaut :", options: ["2(w − 3)", "w − 3", "2w", "w² − 9"], answer: 0 },
  { id: "d2", area: "maths", label: "Algèbre linéaire", q: "Le produit scalaire de (1, 2) et (3, 4) vaut :", options: ["11", "10", "(3, 8)", "24"], answer: 0 },
  { id: "d3", area: "maths", label: "Probabilités", q: "On lance un dé équilibré. Probabilité d'obtenir un nombre pair :", options: ["1/6", "1/3", "1/2", "2/3"], answer: 2 },
  { id: "d4", area: "python", label: "Python", q: "Que renvoie [x * 2 for x in range(3)] ?", options: ["[0, 2, 4]", "[2, 4, 6]", "[0, 1, 2]", "6"], answer: 0 },
  { id: "d5", area: "m1", q: "Prédire le prix d'un appartement est un problème de :", options: ["classification", "régression", "clustering", "renforcement"], answer: 1 },
  { id: "d6", area: "m2", q: "Pourquoi garde-t-on un jeu de test séparé ?", options: ["Pour entraîner plus vite", "Pour mesurer la performance sur des données jamais vues", "Pour avoir plus de features", "Pour stocker les erreurs"], answer: 1 },
  { id: "d7", area: "m3", q: "Le taux d'apprentissage est beaucoup trop grand. Que se passe-t-il typiquement ?", options: ["L'entraînement est très lent", "Le coût oscille ou diverge", "Le modèle surapprend forcément", "Rien de particulier"], answer: 1 },
  { id: "d8", area: "m5", q: "La précision d'un classifieur vaut :", options: ["VP / (VP + FP)", "VP / (VP + FN)", "(VP + VN) / total", "FP / (FP + VN)"], answer: 0 },
  { id: "d9", area: "m6", q: "Erreur d'entraînement très basse, erreur de validation élevée :", options: ["Sous-apprentissage", "Surapprentissage", "Bonne généralisation", "Données manquantes"], answer: 1 },
  { id: "d10", area: "m7", q: "k-means est un algorithme :", options: ["supervisé", "non supervisé", "de renforcement", "de régression"], answer: 1 },
  { id: "d11", area: "m8", q: "Dans un réseau de neurones, la rétropropagation sert à :", options: ["calculer les gradients de la perte par rapport aux poids", "ajouter des couches", "normaliser les entrées", "choisir le seuil de décision"], answer: 0 }
];

const NEURON_SVG = `<figure class="fig"><svg viewBox="0 0 440 150" role="img" aria-label="Schéma d'un neurone : trois entrées pondérées, une somme avec biais, une activation, une sortie">
<g class="svg-line"><line x1="62" y1="30" x2="200" y2="75"/><line x1="62" y1="75" x2="200" y2="75"/><line x1="62" y1="120" x2="200" y2="75"/><line x1="236" y1="75" x2="292" y2="75"/><line x1="340" y1="75" x2="392" y2="75"/></g>
<g class="svg-node"><circle cx="48" cy="30" r="14"/><circle cx="48" cy="75" r="14"/><circle cx="48" cy="120" r="14"/><circle cx="218" cy="75" r="20"/><rect x="292" y="55" width="48" height="40" rx="4"/></g>
<g class="svg-txt"><text x="48" y="34">x₁</text><text x="48" y="79">x₂</text><text x="48" y="124">x₃</text><text x="218" y="80" class="big">Σ</text><text x="316" y="80">f</text><text x="412" y="80">a</text></g>
<g class="svg-lab"><text x="128" y="42">w₁</text><text x="128" y="68">w₂</text><text x="128" y="112">w₃</text><text x="218" y="118">+ b</text><text x="316" y="118">activation</text></g>
</svg><figcaption>z = w₁x₁ + w₂x₂ + w₃x₃ + b, puis a = f(z).</figcaption></figure>`;

const NETWORK_SVG = (() => {
  const cols = [{ x: 60, n: 3, lab: "entrée" }, { x: 220, n: 4, lab: "couche cachée" }, { x: 380, n: 1, lab: "sortie" }];
  const ys = n => Array.from({ length: n }, (_, i) => 90 + (i - (n - 1) / 2) * 44);
  let lines = "", nodes = "", labs = "";
  for (let c = 0; c < cols.length - 1; c++) for (const y1 of ys(cols[c].n)) for (const y2 of ys(cols[c + 1].n))
    lines += `<line x1="${cols[c].x}" y1="${y1}" x2="${cols[c + 1].x}" y2="${y2}"/>`;
  for (const col of cols) { for (const y of ys(col.n)) nodes += `<circle cx="${col.x}" cy="${y}" r="12"/>`; labs += `<text x="${col.x}" y="190">${col.lab}</text>`; }
  return `<figure class="fig"><svg viewBox="0 0 440 200" role="img" aria-label="Réseau dense : 3 entrées, 4 neurones cachés, 1 sortie"><g class="svg-line thin">${lines}</g><g class="svg-node">${nodes}</g><g class="svg-lab">${labs}</g></svg><figcaption>Chaque trait porte un poids : 3 × 4 + 4 × 1 = 16 poids.</figcaption></figure>`;
})();

for (const m of MODULES) for (const b of m.blocks) b.html = b.html.replace("NEURON_SVG", NEURON_SVG).replace("NETWORK_SVG", NETWORK_SVG);

/* ===== Parcours maths pour le ML ===== */
const MATHS = [
{
  id: "a1", num: 1, track: "maths", prepares: "m2", title: "Lire une formule", short: "Symboles, Σ, moyenne",
  kind: "Notations et calculs simples", method: "Exemples chiffrés, lecture pas à pas", minutes: 35,
  objective: "Lire sans paniquer les symboles qu'on voit dans tous les cours de ML, et calculer une moyenne, une variance et un écart-type.",
  pre: {
    q: "Que veut dire, d'après toi, l'écriture Σ xᵢ (pour i de 1 à 3) si x₁ = 2, x₂ = 5 et x₃ = 1 ?",
    a: "C'est la somme x₁ + x₂ + x₃ = 2 + 5 + 1 = 8. Le grand Σ (la lettre grecque sigma) veut juste dire « additionne tout ». Tu le verras partout en machine learning."
  },
  blocks: [
    { title: "Une formule, c'est une phrase abrégée",
      html: `<p>Une formule remplace une phrase. « Le prix vaut deux fois la surface, plus dix » s'écrit <code>y = 2x + 10</code>. Les lettres désignent des nombres qui peuvent changer : ce sont des <strong>variables</strong>.</p><div class="table-wrap"><table><thead><tr><th>Symbole</th><th>Se lit</th><th>Sens habituel en ML</th></tr></thead><tbody>
<tr><td><code>x</code></td><td>x</td><td>une entrée, une feature</td></tr>
<tr><td><code>y</code></td><td>y</td><td>la vraie réponse, le label</td></tr>
<tr><td><code>ŷ</code></td><td>y chapeau</td><td>la prédiction du modèle</td></tr>
<tr><td><code>w</code>, <code>b</code></td><td>w, b</td><td>les nombres que le modèle apprend (poids et biais)</td></tr>
<tr><td><code>n</code></td><td>n</td><td>le nombre d'exemples</td></tr>
<tr><td><code>f(x)</code></td><td>f de x</td><td>ce que la fonction f renvoie pour l'entrée x</td></tr>
</tbody></table></div><p>Deux symboles collés, ou séparés par un point, se multiplient : <code>2x</code> veut dire 2 × x, et <code>w · x</code> veut dire w × x.</p>`,
      example: "ŷ = 3x + 1 avec x = 4 : on remplace x par 4, donc ŷ = 3 × 4 + 1 = 13.",
      ml: "Toutes les formules du cours se lisent ainsi : x pour les données, y pour la réponse, ŷ pour la prédiction, w et b pour ce que le modèle apprend.",
      recall: { q: "Dans ŷ = 3x + 1, que représente ŷ, et que vaut-il si x = 2 ?", a: "ŷ est la prédiction du modèle (« y chapeau »). Avec x = 2 : ŷ = 3 × 2 + 1 = 7." } },
    { title: "Les indices : numéroter les exemples",
      html: `<p>Quand on a plusieurs valeurs du même genre, on les numérote avec un petit chiffre en bas, l'<strong>indice</strong>. Pour trois maisons : x₁ = 85, x₂ = 120, x₃ = 60 (leurs surfaces).</p><p><code>xᵢ</code> se lit « x indice i » : c'est la valeur numéro i, quelle qu'elle soit. Et <code>n</code> est le nombre total de valeurs : ici n = 3.</p><p>Avec un tableau, on utilise deux indices : <code>x₂,₃</code> est la valeur à la <strong>ligne 2</strong> (l'exemple n° 2), <strong>colonne 3</strong> (la feature n° 3).</p>`,
      ml: "Quand le prof parle de « l'exemple i » ou de « la feature j », il pointe simplement une case du tableau de données X.",
      recall: { q: "Dans un tableau de données, que désigne x₄,₂ ? Et si le tableau a 50 lignes, que vaut n ?", a: "x₄,₂ est la valeur de la feature n° 2 pour l'exemple n° 4 (ligne 4, colonne 2). Avec 50 lignes, n = 50 exemples." } },
    { title: "Σ, la grande somme",
      html: `<p class="formula">Σ xᵢ (pour i de 1 à n) = x₁ + x₂ + … + xₙ</p><p>Ça se lit « somme pour i allant de 1 à n de x indice i ». Le Σ dit : <em>remplace i par 1, puis 2, puis 3… jusqu'à n, et additionne tout</em>.</p><p>Avec x = (2, 5, 1) :</p><ul><li><code>Σ xᵢ</code> = 2 + 5 + 1 = 8</li><li><code>Σ xᵢ²</code> = 4 + 25 + 1 = 30 (on met chaque valeur au carré, puis on additionne)</li><li><code>Σ 3xᵢ</code> = 6 + 15 + 3 = 24, c'est-à-dire 3 × 8 : un nombre fixe peut sortir de la somme.</li></ul>`,
      ml: "L'erreur d'un modèle (la MSE du module 3) s'écrit avec un Σ : on additionne les erreurs de tous les exemples, puis on divise par n.",
      recall: { q: "Avec x₁ = 1, x₂ = 3, x₃ = 4, calcule Σ xᵢ, puis Σ 2xᵢ.", a: "Σ xᵢ = 1 + 3 + 4 = 8. Σ 2xᵢ = 2 + 6 + 8 = 16, c'est-à-dire 2 × 8 : le 2 peut sortir de la somme." } },
    { title: "Carrés, racines et ordre des calculs",
      html: `<p><code>x²</code> veut dire x × x. Un carré n'est jamais négatif : 3² = 9 et (−3)² = (−3) × (−3) = 9.</p><p>La racine carrée <code>√</code> fait l'inverse : √9 = 3, car 3² = 9.</p><p>L'ordre des calculs compte : d'abord les <strong>parenthèses</strong>, puis les <strong>puissances</strong>, puis × et ÷, et enfin + et −.</p><ul><li>(2 + 3)² = 5² = 25</li><li>2 + 3² = 2 + 9 = 11</li></ul>`,
      ml: "Une erreur au carré, (y − ŷ)², est toujours positive : c'est pour ça qu'on l'utilise pour mesurer l'erreur d'un modèle, que la prédiction soit trop haute ou trop basse.",
      recall: { q: "Calcule (4 − 7)², puis 4 − 7².", a: "(4 − 7)² = (−3)² = 9. Et 4 − 7² = 4 − 49 = −45. Les parenthèses changent tout : sans elles, la puissance s'applique d'abord au 7 seul." } },
    { title: "Moyenne, variance, écart-type",
      html: `<p>La <strong>moyenne</strong>, notée μ (« mu ») :</p><p class="formula">μ = (1/n) · Σ xᵢ</p><p>La <strong>variance</strong> mesure à quel point les valeurs s'éloignent de la moyenne. C'est la moyenne des écarts au carré :</p><p class="formula">σ² = (1/n) · Σ (xᵢ − μ)²</p><p>L'<strong>écart-type</strong>, σ (« sigma » minuscule), est la racine de la variance. Il est dans la même unité que les données.</p><p>Exemple avec les notes 8, 10 et 12 : μ = 30 / 3 = 10. Les écarts à la moyenne sont −2, 0 et 2 ; leurs carrés 4, 0 et 4. Variance = 8 / 3 ≈ 2,67, donc σ ≈ 1,63. Avec les notes 0, 10 et 20, la moyenne est aussi 10, mais σ ≈ 8,16 : les notes sont bien plus dispersées.</p><p class="note">Certains cours divisent par n − 1 au lieu de n pour la variance d'un échantillon. L'idée reste exactement la même.</p>`,
      ml: "La standardisation du module 2, z = (x − μ) / σ, utilise exactement ces deux nombres : elle dit de combien d'écarts-types une valeur s'éloigne de la moyenne.",
      recall: { q: "Calcule la moyenne, la variance et l'écart-type de 1, 3, 5, 7.", a: "μ = 16 / 4 = 4. Écarts : −3, −1, 1, 3. Carrés : 9, 1, 1, 9, total 20. Variance = 20 / 4 = 5. Écart-type σ = √5 ≈ 2,24." } }
  ],
  feynman: { prompt: "Explique à un ami ce que veulent dire Σ, μ et σ, avec un petit exemple chiffré à toi.",
    points: ["Σ veut dire « additionne tous les termes »", "μ, la moyenne : la somme divisée par le nombre de valeurs", "La variance : la moyenne des écarts à la moyenne, mis au carré", "σ, l'écart-type : la racine de la variance, qui mesure la dispersion dans l'unité des données"] },
  quiz: [
    { id: "a1q1", type: "mcq", q: "x₁ = 3, x₂ = 1, x₃ = 2. Que vaut Σ xᵢ² ?", options: ["6", "14", "36", "12"], answer: 1,
      explain: "On met chaque valeur au carré, puis on additionne : 9 + 1 + 4 = 14. Attention : (Σ xᵢ)² = 6² = 36, ce n'est pas la même chose." },
    { id: "a1q2", type: "mcq", q: "Que vaut (2 − 5)² ?", options: ["−9", "9", "−6", "6"], answer: 1,
      explain: "2 − 5 = −3, et (−3)² = 9. Un carré n'est jamais négatif." },
    { id: "a1q3", type: "mcq", q: "Deux classes ont la même moyenne, 12/20. Dans la classe A, σ = 1 ; dans la classe B, σ = 5. Que peut-on dire ?", options: ["La classe A a de meilleures notes", "Les notes de B sont plus dispersées", "Les notes de A sont plus dispersées", "Les deux classes ont les mêmes notes"], answer: 1,
      explain: "Même moyenne, mais un écart-type plus grand en B : ses notes s'éloignent davantage de 12, certaines très hautes, d'autres très basses." },
    { id: "a1q4", type: "mcq", q: "Dans un dataset noté x₁, x₂, …, xₙ, que désigne xᵢ ?", options: ["La i-ème feature", "Le i-ème exemple", "La moyenne", "La prédiction"], answer: 1,
      explain: "L'indice i numérote les valeurs, ici les exemples. n est leur nombre total." },
    { id: "a1q5", type: "open", q: "Calcule à la main la moyenne et l'écart-type de 2, 4, 4, 4, 5, 5, 7, 9, en montrant les étapes.",
      a: "Somme = 40, donc μ = 40 / 8 = 5. Écarts à la moyenne : −3, −1, −1, −1, 0, 0, 2, 4. Carrés : 9, 1, 1, 1, 0, 0, 4, 16, total 32. Variance = 32 / 8 = 4. Écart-type σ = √4 = 2." }
  ],
  keypoints: ["Comment lit-on Σ xᵢ, et que calcule-t-on ?", "Que désignent ŷ, xᵢ et n ?", "Pourquoi un carré n'est-il jamais négatif ?", "Comment calcule-t-on la variance, puis l'écart-type ?"],
  cards: [
    { id: "a1c1", f: "Que signifie Σ xᵢ (i de 1 à n) ?", b: "La somme x₁ + x₂ + … + xₙ : on additionne tous les termes." },
    { id: "a1c2", f: "Que désigne ŷ ?", b: "La prédiction du modèle (« y chapeau »), à comparer à la vraie valeur y." },
    { id: "a1c3", f: "Que désigne xᵢ dans un dataset x₁, …, xₙ ?", b: "Le i-ème exemple. n est le nombre d'exemples." },
    { id: "a1c4", f: "Formule de la moyenne μ ?", b: "μ = (1/n) · Σ xᵢ : la somme divisée par le nombre de valeurs." },
    { id: "a1c5", f: "Formule de la variance ?", b: "σ² = (1/n) · Σ (xᵢ − μ)² : la moyenne des écarts à la moyenne, au carré." },
    { id: "a1c6", f: "Qu'est-ce que l'écart-type σ ?", b: "La racine de la variance. Il mesure la dispersion, dans la même unité que les données." },
    { id: "a1c7", f: "Σ xᵢ² ou (Σ xᵢ)² : quelle différence ?", b: "Σ xᵢ² : on met au carré puis on additionne. (Σ xᵢ)² : on additionne puis on met au carré. Ex. avec 1, 2 : 5 contre 9." }
  ]
},
{
  id: "a2", num: 2, track: "maths", prepares: "m2", title: "Vecteurs et distances", short: "Produit scalaire, distance",
  kind: "Objets et calculs", method: "Exemples chiffrés, schéma, calcul à la main", minutes: 35,
  objective: "Voir un exemple de données comme un vecteur, calculer un produit scalaire, une longueur et une distance.",
  pre: {
    q: "Une maison est décrite par (85 m², 3 pièces, 12 ans), une autre par (90 m², 3 pièces, 10 ans). Comment pourrais-tu mesurer à quel point elles se ressemblent ?",
    a: "En calculant une distance entre les deux listes de nombres : on regarde les écarts feature par feature (5, 0 et 2) et on les combine en un seul nombre. C'est la distance euclidienne, qu'on calcule dans ce module."
  },
  blocks: [
    { title: "Un vecteur, c'est une liste de nombres",
      html: `<p>Un <strong>vecteur</strong> est une liste ordonnée de nombres, par exemple <code>x = (85, 3, 12)</code>. Chaque nombre est une <strong>composante</strong>, et le nombre de composantes est la <strong>dimension</strong> (ici 3).</p><p>En ML, un exemple de données <em>est</em> un vecteur : une maison = (surface, pièces, âge). Le dataset est une pile de vecteurs, le tableau X. Et la colonne des labels forme elle aussi un vecteur, <code>y</code>.</p>`,
      ml: "Au module 2, chaque ligne du tableau X est le vecteur de features d'un exemple, et y est le vecteur des labels.",
      recall: { q: "Un e-mail est décrit par 20 features. Quelle est la dimension de son vecteur ? Quelle est la taille du tableau X pour 1 000 e-mails ?", a: "Un vecteur de dimension 20. Le tableau X a 1 000 lignes (une par e-mail) et 20 colonnes : 1 000 × 20." } },
    { title: "Additionner, soustraire, multiplier par un nombre",
      html: `<p>On calcule <strong>composante par composante</strong> :</p><ul><li>(1, 2) + (3, 5) = (1 + 3, 2 + 5) = (4, 7)</li><li>(4, 7) − (1, 2) = (3, 5)</li><li>3 × (1, 2) = (3, 6)</li></ul><p>Les deux vecteurs doivent avoir la même dimension pour être additionnés.</p>`,
      ml: "La mise à jour de tous les poids d'un modèle, w ← w − α · gradient, est exactement ça : un vecteur multiplié par un nombre, puis une soustraction de vecteurs.",
      recall: { q: "Calcule (2, −1, 4) − 2 × (1, 1, 1).", a: "D'abord 2 × (1, 1, 1) = (2, 2, 2). Puis (2, −1, 4) − (2, 2, 2) = (0, −3, 2)." } },
    { title: "Le produit scalaire",
      html: `<p class="formula">w · x = w₁x₁ + w₂x₂ + … + w_d·x_d = Σ wⱼxⱼ</p><p>On multiplie les composantes deux à deux, puis on additionne tout. Le résultat est <strong>un seul nombre</strong>, pas un vecteur.</p><p>Exemple : w = (0,5 ; 3) et x = (100 ; 4). w · x = 0,5 × 100 + 3 × 4 = 50 + 12 = 62.</p><p>Comme pour l'addition, les deux vecteurs doivent avoir la même dimension.</p>`,
      ml: "La prédiction d'un modèle linéaire, ŷ = w · x + b, et le calcul de chaque neurone reposent sur ce produit scalaire : chaque feature est multipliée par son poids.",
      recall: { q: "Calcule (1, 2, 3) · (4, 0, −1).", a: "1 × 4 + 2 × 0 + 3 × (−1) = 4 + 0 − 3 = 1. Le résultat est un seul nombre." } },
    { title: "La longueur d'un vecteur",
      html: `<p>La longueur, ou <strong>norme</strong>, d'un vecteur se calcule avec le théorème de Pythagore :</p><p class="formula">‖x‖ = √(x₁² + x₂² + … + x_d²)</p>PYTHA_SVG<p>Pour (3, 4) : √(9 + 16) = √25 = 5. La formule marche pareil en 3, 10 ou 1 000 dimensions : on ajoute simplement plus de carrés.</p>`,
      ml: "La régularisation du module 6 pénalise Σ wⱼ², le carré de la norme des poids : elle empêche les poids de devenir trop grands.",
      recall: { q: "Quelle est la norme du vecteur (6, 8) ?", a: "√(6² + 8²) = √(36 + 64) = √100 = 10." } },
    { title: "La distance entre deux points",
      html: `<p>La distance entre deux points est la longueur du vecteur qui va de l'un à l'autre :</p><p class="formula">d(a, b) = ‖a − b‖ = √((a₁ − b₁)² + (a₂ − b₂)² + …)</p><p>Les deux maisons du début : (85, 3, 12) et (90, 3, 10). Différence : (−5, 0, 2). Carrés : 25, 0, 4. Distance = √29 ≈ 5,39.</p><p>Remarque : l'écart de surface (5) pèse beaucoup plus que l'écart d'âge, simplement parce que les surfaces sont de grands nombres. D'où l'intérêt de mettre les features à la même échelle.</p>`,
      ml: "k-NN (module 4) et k-means (module 7) cherchent les points les plus proches avec cette distance. C'est aussi pour ça que le module 2 standardise les features.",
      recall: { q: "Quelle est la distance entre A = (1, 2) et B = (4, 6) ?", a: "Différences : 3 et 4. Carrés : 9 et 16. Distance = √25 = 5." } }
  ],
  feynman: { prompt: "Explique ce qu'est un vecteur en ML, ce que calcule un produit scalaire, et comment on mesure la distance entre deux exemples.",
    points: ["Un vecteur est une liste de nombres ; un exemple de données en est un", "Produit scalaire : multiplier composante par composante, puis additionner ; le résultat est un nombre", "Norme : la longueur, racine de la somme des carrés (Pythagore)", "Distance entre deux points : la norme de leur différence"] },
  quiz: [
    { id: "a2q1", type: "mcq", q: "(2, 3) · (4, −1) = ?", options: ["5", "11", "(8, −3)", "−5"], answer: 0,
      explain: "2 × 4 + 3 × (−1) = 8 − 3 = 5. Le produit scalaire donne un nombre, pas un vecteur." },
    { id: "a2q2", type: "mcq", q: "La norme de (5, 12) vaut :", options: ["17", "13", "60", "√17"], answer: 1,
      explain: "√(25 + 144) = √169 = 13." },
    { id: "a2q3", type: "mcq", q: "Pourquoi met-on les features à la même échelle avant de calculer des distances ?", options: ["Pour que le calcul soit plus rapide", "Sinon la feature aux plus grands nombres domine la distance", "Parce qu'une distance doit rester entre 0 et 1", "Ce n'est jamais nécessaire"], answer: 1,
      explain: "Une feature qui varie de 0 à 100 000 écrase une feature qui varie de 0 à 5 dans la somme des carrés." },
    { id: "a2q4", type: "mcq", q: "Peut-on calculer le produit scalaire de (1, 2, 3) et (4, 5) ?", options: ["Oui, il vaut 14", "Non, les vecteurs n'ont pas la même dimension", "Oui, il vaut 32", "Oui, en ajoutant un zéro"], answer: 1,
      explain: "Il faut autant de composantes de chaque côté pour les multiplier deux à deux." },
    { id: "a2q5", type: "open", q: "Calcule la distance entre A = (2, 1, 3) et B = (5, 1, −1) en montrant les étapes, puis dis à quoi ce calcul sert en machine learning.",
      a: "Différence : (−3, 0, 4). Carrés : 9, 0, 16, total 25. Distance = √25 = 5. En ML, ce calcul sert à trouver les voisins les plus proches (k-NN) ou le centre le plus proche (k-means)." }
  ],
  keypoints: ["Qu'est-ce qu'un vecteur, et quelle est sa dimension ?", "Comment calcule-t-on un produit scalaire ?", "Comment calcule-t-on la norme d'un vecteur ?", "Pourquoi l'échelle des features compte-t-elle pour les distances ?"],
  cards: [
    { id: "a2c1", f: "Qu'est-ce qu'un vecteur ?", b: "Une liste ordonnée de nombres. En ML, un exemple de données est un vecteur de features." },
    { id: "a2c2", f: "Dimension d'un vecteur ?", b: "Son nombre de composantes. (85, 3, 12) est de dimension 3." },
    { id: "a2c3", f: "Formule du produit scalaire w · x ?", b: "w₁x₁ + w₂x₂ + … = Σ wⱼxⱼ. Le résultat est un nombre." },
    { id: "a2c4", f: "Norme d'un vecteur ?", b: "‖x‖ = √(x₁² + x₂² + …), sa longueur (Pythagore)." },
    { id: "a2c5", f: "Distance entre deux points a et b ?", b: "‖a − b‖ = √((a₁ − b₁)² + (a₂ − b₂)² + …)." },
    { id: "a2c6", f: "Où sert le produit scalaire en ML ?", b: "Dans la prédiction linéaire ŷ = w · x + b et dans le calcul de chaque neurone." }
  ]
},
{
  id: "a3", num: 3, track: "maths", prepares: "m3", title: "Fonctions et courbes", short: "Droites, pente, minimum",
  kind: "Fonctions et graphiques", method: "Graphiques, calculs de pente, exemples", minutes: 35,
  objective: "Lire une fonction et son graphique, calculer la pente d'une droite et trouver le minimum d'une courbe en U.",
  pre: {
    q: "Une droite passe par les points (0, 1) et (2, 5). De combien monte-t-elle quand x augmente de 1 ?",
    a: "Quand x passe de 0 à 2 (+2), y passe de 1 à 5 (+4). Elle monte donc de 4 / 2 = 2 pour chaque unité de x : c'est sa pente."
  },
  blocks: [
    { title: "Une fonction, c'est une machine",
      html: `<p>Une <strong>fonction</strong> prend une entrée et renvoie une sortie, toujours selon la même règle. <code>f(x) = 2x + 1</code> : pour x = 3, f(3) = 2 × 3 + 1 = 7.</p><p>Son <strong>graphique</strong> place tous les points (x, f(x)) : x en horizontal, f(x) en vertical. À chaque entrée correspond une seule sortie.</p>`,
      ml: "Un modèle de ML est une fonction : il reçoit les features x et renvoie une prédiction ŷ = f(x). Entraîner un modèle, c'est choisir la bonne fonction.",
      recall: { q: "Si f(x) = x² − 1, que valent f(0), f(2) et f(−2) ?", a: "f(0) = 0 − 1 = −1. f(2) = 4 − 1 = 3. f(−2) = 4 − 1 = 3. Deux entrées différentes peuvent donner la même sortie." } },
    { title: "La droite y = ax + b",
      html: `<p>Une droite s'écrit <code>y = ax + b</code> :</p><ul><li><code>a</code> est la <strong>pente</strong> : de combien y change quand x augmente de 1. Si a &gt; 0, la droite monte ; si a &lt; 0, elle descend ; si a = 0, elle est plate.</li><li><code>b</code> est l'<strong>ordonnée à l'origine</strong> : la valeur de y quand x = 0.</li></ul><p class="formula">pente = Δy / Δx = (y₂ − y₁) / (x₂ − x₁)</p>LINE_SVG<p>Δ (« delta ») veut dire « variation de ».</p>`,
      ml: "La régression linéaire du module 3 cherche exactement une droite, notée ŷ = wx + b : le poids w joue le rôle de la pente a.",
      recall: { q: "Une droite passe par (1, 3) et (4, 9). Quelle est sa pente ? Et son ordonnée à l'origine ?", a: "Pente = (9 − 3) / (4 − 1) = 6 / 3 = 2. Avec y = 2x + b et le point (1, 3) : 3 = 2 + b, donc b = 1. La droite est y = 2x + 1." } },
    { title: "La courbe en U et son minimum",
      html: `<p><code>f(x) = x²</code> dessine une courbe en U, une <strong>parabole</strong>. Son point le plus bas, le <strong>minimum</strong>, est en x = 0.</p><p><code>f(x) = (x − 3)² + 1</code> est le même U, décalé : un carré vaut au moins 0, et il vaut 0 quand x − 3 = 0. Le minimum est donc en x = 3, et il vaut 0 + 1 = 1.</p>`,
      ml: "La fonction de coût d'un modèle a souvent cette forme de U. Apprendre, c'est trouver le fond du U : la valeur des paramètres qui donne la plus petite erreur. C'est la courbe de la démo du module 3.",
      recall: { q: "Où est le minimum de f(x) = (x + 2)² + 5, et combien vaut-il ?", a: "Le carré vaut au moins 0, et vaut 0 quand x + 2 = 0, donc en x = −2. Le minimum vaut alors 0 + 5 = 5." } },
    { title: "Les polynômes et leur degré",
      html: `<p>Un <strong>polynôme</strong> est une somme de puissances de x multipliées par des nombres : <code>3x² − x + 2</code>. Son <strong>degré</strong> est la plus grande puissance (ici 2).</p><ul><li>Degré 1 : une droite.</li><li>Degré 2 : une parabole, un virage.</li><li>Degré d : jusqu'à d − 1 virages. Plus le degré est élevé, plus la courbe peut onduler.</li></ul>`,
      ml: "Au module 6, le degré règle la souplesse du modèle : trop bas, il rate la tendance ; trop haut, il ondule pour passer par chaque point et surapprend.",
      recall: { q: "Quel est le degré de 4x³ − 2x + 7 ? Combien de virages sa courbe peut-elle faire au maximum ?", a: "Degré 3, la plus grande puissance. Sa courbe peut faire au plus 2 virages (degré − 1)." } },
    { title: "Une fonction de plusieurs variables",
      html: `<p>Une fonction peut dépendre de plusieurs entrées : <code>f(x₁, x₂) = 2x₁ + 3x₂ + 1</code>. Pour x₁ = 1 et x₂ = 2 : f = 2 + 6 + 1 = 9.</p><p>Son graphique n'est plus une courbe mais une <strong>surface</strong>, comme un paysage avec des collines et des vallées. Le minimum est le point le plus bas de la vallée.</p>`,
      ml: "Un vrai modèle a beaucoup de paramètres. Sa fonction de coût dépend de tous : c'est un paysage à plusieurs dimensions, dont on cherche le point le plus bas.",
      recall: { q: "f(x₁, x₂) = x₁² + x₂². Combien vaut f(1, 2) ? Où est son minimum ?", a: "f(1, 2) = 1 + 4 = 5. Les deux carrés valent au moins 0, donc le minimum est en (0, 0), où f vaut 0." } }
  ],
  feynman: { prompt: "Explique ce qu'est la pente d'une droite, et pourquoi le minimum d'une courbe en U intéresse le machine learning.",
    points: ["Une fonction associe une sortie à chaque entrée ; un modèle de ML est une fonction", "La pente : de combien y change quand x augmente de 1 (Δy / Δx)", "Une courbe en U a un point le plus bas, le minimum", "Entraîner un modèle, c'est trouver les paramètres qui minimisent l'erreur"] },
  quiz: [
    { id: "a3q1", type: "mcq", q: "Pour y = −3x + 6, que se passe-t-il quand x augmente de 1 ?", options: ["y augmente de 3", "y diminue de 3", "y augmente de 6", "y ne change pas"], answer: 1,
      explain: "La pente vaut −3 : chaque fois que x augmente de 1, y diminue de 3." },
    { id: "a3q2", type: "mcq", q: "Où se trouve le minimum de f(x) = (x − 4)² ?", options: ["x = 0", "x = 4", "x = −4", "x = 16"], answer: 1,
      explain: "Le carré vaut 0, sa plus petite valeur possible, quand x − 4 = 0, donc en x = 4." },
    { id: "a3q3", type: "mcq", q: "Le degré du polynôme 5x⁴ + x² − 3 est :", options: ["2", "4", "5", "3"], answer: 1,
      explain: "Le degré est la plus grande puissance de x : 4. Le 5 est un coefficient." },
    { id: "a3q4", type: "mcq", q: "Dans y = ax + b, que représente b ?", options: ["La pente", "La valeur de y quand x = 0", "Le minimum", "Le nombre d'exemples"], answer: 1,
      explain: "En x = 0, y = a × 0 + b = b : c'est l'ordonnée à l'origine." },
    { id: "a3q5", type: "open", q: "Une droite passe par (0, 2) et (3, 8). Trouve son équation y = ax + b en expliquant chaque étape.",
      a: "Pente a = (8 − 2) / (3 − 0) = 6 / 3 = 2. En x = 0, y = 2, donc b = 2. L'équation est y = 2x + 2." }
  ],
  keypoints: ["Pourquoi dit-on qu'un modèle de ML est une fonction ?", "Comment calcule-t-on la pente d'une droite ?", "Où est le minimum de (x − c)² + d ?", "Qu'est-ce que le degré d'un polynôme change à sa courbe ?"],
  cards: [
    { id: "a3c1", f: "Qu'est-ce qu'une fonction ?", b: "Une règle qui associe une seule sortie f(x) à chaque entrée x. Un modèle de ML en est une." },
    { id: "a3c2", f: "Dans y = ax + b, que sont a et b ?", b: "a : la pente (variation de y quand x augmente de 1). b : la valeur de y en x = 0." },
    { id: "a3c3", f: "Formule de la pente entre deux points ?", b: "Δy / Δx = (y₂ − y₁) / (x₂ − x₁)." },
    { id: "a3c4", f: "Minimum de f(x) = (x − c)² + d ?", b: "En x = c, où il vaut d (car un carré vaut au moins 0)." },
    { id: "a3c5", f: "Degré d'un polynôme ?", b: "La plus grande puissance de x. Degré d : jusqu'à d − 1 virages." },
    { id: "a3c6", f: "Pourquoi chercher le minimum d'une fonction en ML ?", b: "La fonction de coût mesure l'erreur : son minimum donne les meilleurs paramètres." }
  ]
},
{
  id: "a4", num: 4, track: "maths", prepares: "m3", title: "Dérivées et gradient", short: "La pente qui guide l'apprentissage",
  kind: "Mécanisme et calcul", method: "Démo de la tangente, règles appliquées à de petits exemples", minutes: 45,
  objective: "Comprendre qu'une dérivée est une pente, calculer quelques dérivées simples, et savoir ce qu'est un gradient.",
  pre: {
    q: "Sur une courbe en U, tout au fond, la courbe monte-t-elle, descend-elle, ou est-elle plate ?",
    a: "Elle est plate : juste avant le fond elle descend, juste après elle monte. Au fond, la pente vaut 0. Le machine learning utilise cette idée pour trouver le minimum."
  },
  blocks: [
    { title: "La dérivée, c'est la pente en un point",
      html: `<p>Sur une droite, la pente est la même partout. Sur une courbe, elle change d'un point à l'autre. La <strong>dérivée</strong> <code>f′(x)</code> (« f prime de x ») donne la pente de la courbe au point x : c'est la pente de la <strong>tangente</strong>, la droite qui frôle la courbe en ce point.</p><ul><li>f′(x) &gt; 0 : la courbe monte.</li><li>f′(x) &lt; 0 : la courbe descend.</li><li>f′(x) = 0 : la courbe est plate (au fond d'un U, par exemple).</li></ul><p><strong>Avant de toucher la démo</strong>, prédis le signe de la pente à gauche du fond, puis à droite.</p>`,
      demo: "tangent",
      after: `<p>À gauche du minimum, la pente est négative ; à droite, positive ; au fond, elle vaut 0. Et plus on s'éloigne du fond, plus elle est raide.</p>`,
      ml: "En descente de gradient, la dérivée du coût dit dans quel sens bouger un paramètre pour faire baisser l'erreur.",
      recall: { q: "La dérivée de f en x = 2 vaut −3. Que fait la courbe à cet endroit ?", a: "Elle descend (pente négative), et assez fortement : si x augmente d'un tout petit peu, f(x) diminue d'environ 3 fois cette petite quantité." } },
    { title: "Les règles de base",
      html: `<div class="table-wrap"><table><thead><tr><th>Fonction</th><th>Dérivée</th><th>Exemple</th></tr></thead><tbody>
<tr><td>une constante c</td><td>0</td><td>(7)′ = 0</td></tr>
<tr><td>ax</td><td>a</td><td>(5x)′ = 5</td></tr>
<tr><td>x²</td><td>2x</td><td>en x = 3, la pente vaut 6</td></tr>
<tr><td>xⁿ</td><td>n · xⁿ⁻¹</td><td>(x³)′ = 3x²</td></tr>
<tr><td>c · f</td><td>c · f′</td><td>(4x²)′ = 4 × 2x = 8x</td></tr>
<tr><td>f + g</td><td>f′ + g′</td><td>(x² + 5x)′ = 2x + 5</td></tr>
</tbody></table></div><p>Exemple complet : f(x) = 3x² + 5x − 2. On dérive chaque morceau : 3 × 2x = 6x, puis 5, puis 0. Donc f′(x) = 6x + 5.</p>`,
      ml: "Pas besoin de centaines de règles : avec celles-ci, tu peux suivre les calculs de gradient du cours.",
      recall: { q: "Dérive f(x) = 4x³ − 2x + 7.", a: "On dérive morceau par morceau : 4 × 3x² = 12x², puis −2, puis 0. Donc f′(x) = 12x² − 2." } },
    { title: "Dériver un carré : la règle de la chaîne",
      html: `<p>Pour une fonction « emboîtée » comme <code>(x − 3)²</code>, on dérive l'extérieur, puis on multiplie par la dérivée de l'intérieur :</p><p class="formula">(u²)′ = 2u · u′</p><ul><li>(x − 3)² : u = x − 3, u′ = 1. Dérivée : 2(x − 3) × 1 = 2(x − 3).</li><li>(2x + 1)² : u = 2x + 1, u′ = 2. Dérivée : 2(2x + 1) × 2 = 4(2x + 1).</li></ul><p>Vérification en développant : (2x + 1)² = 4x² + 4x + 1, dont la dérivée est 8x + 4 = 4(2x + 1). Même résultat.</p>`,
      ml: "C'est le calcul qu'on fait sur l'erreur au carré (y − ŷ)². Et la même règle, appliquée couche après couche, s'appelle la rétropropagation dans les réseaux de neurones (Maths 7).",
      recall: { q: "Dérive f(w) = (w − 5)². Pour quelle valeur de w la dérivée vaut-elle 0 ?", a: "f′(w) = 2(w − 5) × 1 = 2(w − 5). Elle vaut 0 quand w = 5 : c'est le minimum de f." } },
    { title: "Descendre vers le minimum",
      html: `<p>Au minimum, la dérivée vaut 0. Et le signe de la dérivée dit où aller :</p><ul><li>f′ &gt; 0 : la courbe monte vers la droite, donc on descend en allant à <strong>gauche</strong> (diminuer x).</li><li>f′ &lt; 0 : on descend en allant à <strong>droite</strong> (augmenter x).</li></ul><p>Dans les deux cas, on va dans le sens <em>opposé</em> à la dérivée :</p><p class="formula">x ← x − α · f′(x)</p><p>Exemple : f(w) = (w − 3)² + 1, w = −1, α = 0,1. f′(−1) = 2(−1 − 3) = −8. Nouveau w = −1 − 0,1 × (−8) = −1 + 0,8 = −0,2. On s'est rapproché de 3.</p>`,
      ml: "C'est exactement la descente de gradient du module 3, que tu verras en action avec la démo du taux d'apprentissage α.",
      recall: { q: "f(w) = (w − 3)² + 1, w = 5 et α = 0,25. Calcule la dérivée, puis la nouvelle valeur de w.", a: "f′(5) = 2(5 − 3) = 4. Nouvelle valeur : 5 − 0,25 × 4 = 5 − 1 = 4. On s'est rapproché du minimum, situé en w = 3." } },
    { title: "Plusieurs variables : le gradient",
      html: `<p>Si f dépend de plusieurs variables, f(w, b), on dérive par rapport à une seule à la fois, en traitant les autres comme des constantes : c'est la <strong>dérivée partielle</strong>, notée <code>∂f/∂w</code> (« d rond f sur d rond w »).</p><p>Exemple : f(w, b) = w² + 3b. ∂f/∂w = 2w (3b est une constante, sa dérivée est 0). ∂f/∂b = 3.</p><p>Le <strong>gradient</strong> <code>∇f</code> (« nabla f ») rassemble toutes les dérivées partielles dans un vecteur : ∇f = (∂f/∂w, ∂f/∂b). En (1, 2), il vaut (2, 3). Il pointe vers la montée la plus raide ; on va donc dans le sens opposé.</p>`,
      ml: "Un modèle a des milliers de paramètres : le gradient rassemble leurs dérivées partielles, et la descente de gradient les met tous à jour d'un coup, w ← w − α · ∇L.",
      recall: { q: "f(w, b) = 2w² + wb. Calcule ∂f/∂w et ∂f/∂b.", a: "∂f/∂w = 4w + b (b est traité comme une constante). ∂f/∂b = w (w est traité comme une constante, 2w² ne dépend pas de b)." } }
  ],
  feynman: { prompt: "Explique ce qu'est une dérivée, comment elle aide à trouver le minimum d'une fonction, et ce qu'est un gradient.",
    points: ["Dérivée = pente de la courbe en un point (positive : elle monte, négative : elle descend)", "Au minimum, la dérivée vaut 0", "On fait un pas dans le sens opposé à la dérivée : x ← x − α · f′(x)", "Le gradient est le vecteur des dérivées partielles, une par paramètre"] },
  quiz: [
    { id: "a4q1", type: "mcq", q: "La dérivée de f(x) = 5x² − 3x + 2 est :", options: ["10x − 3", "5x − 3", "10x + 2", "10x² − 3"], answer: 0,
      explain: "5x² → 10x ; −3x → −3 ; 2 → 0. Donc f′(x) = 10x − 3." },
    { id: "a4q2", type: "mcq", q: "En un point, f′(x) = 0. Que peut-on dire ?", options: ["La fonction vaut 0", "La courbe est plate en ce point, par exemple au fond d'un U", "La courbe est au-dessus de l'axe", "La fonction n'existe pas"], answer: 1,
      explain: "Une dérivée nulle signifie une pente nulle : la courbe est plate. C'est ce qui se passe au minimum." },
    { id: "a4q3", type: "mcq", q: "f′(x) = 4 au point actuel. Pour faire baisser f, il faut :", options: ["augmenter x", "diminuer x", "ne rien changer", "doubler x"], answer: 1,
      explain: "Pente positive : la courbe monte vers la droite, donc on descend en allant vers la gauche. C'est le signe moins de x ← x − α · f′(x)." },
    { id: "a4q4", type: "mcq", q: "Pour f(w, b) = 3w + b², la dérivée partielle ∂f/∂b vaut :", options: ["3", "2b", "3 + 2b", "b²"], answer: 1,
      explain: "On traite w comme une constante : 3w disparaît, et b² donne 2b." },
    { id: "a4q5", type: "open", q: "Dérive f(w) = (2w − 4)², trouve où la dérivée s'annule, et explique ce que représente ce point.",
      a: "Règle de la chaîne : f′(w) = 2(2w − 4) × 2 = 4(2w − 4) = 8w − 16. Elle s'annule quand w = 2. C'est le minimum de f : en w = 2, 2w − 4 = 0 et f vaut 0." }
  ],
  keypoints: ["Que représente la dérivée en un point ?", "Que vaut la dérivée au minimum ?", "Pourquoi le signe moins dans x ← x − α · f′(x) ?", "Qu'est-ce qu'une dérivée partielle, et qu'est-ce que le gradient ?"],
  cards: [
    { id: "a4c1", f: "Que représente f′(x) ?", b: "La pente de la courbe au point x (la pente de la tangente)." },
    { id: "a4c2", f: "f′(x) > 0, f′(x) < 0, f′(x) = 0 ?", b: "La courbe monte ; elle descend ; elle est plate (par exemple au minimum)." },
    { id: "a4c3", f: "Dérivée de xⁿ ?", b: "n · xⁿ⁻¹. Ex. : (x³)′ = 3x², (x²)′ = 2x." },
    { id: "a4c4", f: "Dérivée de u² (règle de la chaîne) ?", b: "2u · u′. Ex. : ((x − 3)²)′ = 2(x − 3)." },
    { id: "a4c5", f: "Comment descendre vers le minimum ?", b: "x ← x − α · f′(x) : un pas dans le sens opposé à la pente." },
    { id: "a4c6", f: "Dérivée partielle ∂f/∂w ?", b: "La dérivée par rapport à w, en traitant les autres variables comme des constantes." },
    { id: "a4c7", f: "Qu'est-ce que le gradient ∇f ?", b: "Le vecteur de toutes les dérivées partielles. Il pointe vers la montée la plus raide." }
  ]
},
{
  id: "a5", num: 5, track: "maths", prepares: "m4", title: "Exponentielle, logarithme et sigmoïde", short: "Des scores aux probabilités",
  kind: "Fonctions à connaître", method: "Valeurs repères, démo, petits calculs", minutes: 40,
  objective: "Connaître le comportement de l'exponentielle et du logarithme, et comprendre comment la sigmoïde transforme un score en probabilité.",
  pre: {
    q: "Une somme double chaque année : 1, 2, 4, 8… Combien vaut-elle au bout de 10 ans ? Et combien d'années faut-il pour atteindre 1 024 ?",
    a: "2¹⁰ = 1 024 au bout de 10 ans. Inversement, il faut 10 ans pour atteindre 1 024 : retrouver cet exposant, c'est ce que fait un logarithme (ici, le logarithme en base 2 de 1 024 vaut 10)."
  },
  blocks: [
    { title: "Puissances et exponentielle",
      html: `<p>Rappels sur les puissances : 2³ = 2 × 2 × 2 = 8 ; a⁰ = 1 ; a⁻ⁿ = 1 / aⁿ (donc 2⁻¹ = 0,5) ; aᵐ × aⁿ = aᵐ⁺ⁿ.</p><p>Le nombre <strong>e</strong> ≈ 2,718 joue un rôle spécial. La fonction <strong>exponentielle</strong> <code>eˣ</code>, aussi notée <code>exp(x)</code> :</p><ul><li>est <strong>toujours positive</strong> ;</li><li>grandit très vite quand x augmente ;</li><li>s'approche de 0, sans l'atteindre, quand x devient très négatif.</li></ul><div class="table-wrap"><table><thead><tr><th>x</th><th class="num">−2</th><th class="num">−1</th><th class="num">0</th><th class="num">1</th><th class="num">2</th></tr></thead><tbody><tr><td>eˣ ≈</td><td class="num">0,14</td><td class="num">0,37</td><td class="num">1</td><td class="num">2,72</td><td class="num">7,39</td></tr></tbody></table></div>`,
      ml: "Les modèles de classification utilisent eˣ pour transformer n'importe quel score, même négatif, en nombre positif.",
      recall: { q: "Que valent e⁰ et 2⁻² ? L'exponentielle peut-elle être négative ?", a: "e⁰ = 1 et 2⁻² = 1 / 4 = 0,25. Non : eˣ est toujours strictement positive, même pour x très négatif (elle s'approche de 0 sans l'atteindre)." } },
    { title: "Le logarithme, l'inverse de l'exponentielle",
      html: `<p>Le <strong>logarithme naturel</strong> <code>ln(x)</code> répond à la question : « à quelle puissance faut-il élever e pour obtenir x ? »</p><ul><li>ln(1) = 0, car e⁰ = 1 ; ln(e) = 1.</li><li>Entre 0 et 1, le logarithme est négatif : ln(0,5) ≈ −0,69 ; ln(0,1) ≈ −2,30 ; ln(0,01) ≈ −4,61.</li><li>ln(x) n'existe pas pour x ≤ 0.</li></ul><p>Sa règle clé transforme un produit en somme :</p><p class="formula">ln(a × b) = ln(a) + ln(b)</p>`,
      ml: "Multiplier beaucoup de petites probabilités donne des nombres minuscules ; avec le logarithme, on additionne à la place. C'est pour ça qu'il apparaît dans les fonctions de coût de classification.",
      recall: { q: "Que valent ln(1) et ln(e) ? Pourquoi ln(0,01) est-il très négatif ?", a: "ln(1) = 0 et ln(e) = 1. ln(0,01) ≈ −4,6 : plus un nombre s'approche de 0, plus son logarithme plonge vers les valeurs négatives." } },
    { title: "La sigmoïde",
      html: `<p class="formula">σ(z) = 1 / (1 + e^(−z))</p><p>Elle transforme n'importe quel nombre en une valeur entre 0 et 1. Calculons-en trois :</p><ul><li>z = 0 : e⁰ = 1, donc σ = 1 / (1 + 1) = 0,5.</li><li>z = 2 : e⁻² ≈ 0,135, donc σ ≈ 1 / 1,135 ≈ 0,88.</li><li>z = −2 : e² ≈ 7,39, donc σ ≈ 1 / 8,39 ≈ 0,12.</li></ul><p>Remarque la symétrie : σ(−z) = 1 − σ(z). <strong>Avant de bouger le curseur</strong>, prédis σ(6) et σ(−6).</p>`,
      demo: "sigmoid",
      after: `<p>Loin de 0, la courbe s'aplatit : σ(6) ≈ 0,998 et σ(−6) ≈ 0,002. Le modèle devient alors presque certain.</p>`,
      ml: "Au module 4, la régression logistique calcule un score z = w · x + b, puis le passe dans la sigmoïde pour obtenir une probabilité.",
      recall: { q: "Calcule σ(0). Sachant que σ(3) ≈ 0,95, que vaut σ(−3) ?", a: "σ(0) = 1 / (1 + 1) = 0,5. Par symétrie, σ(−3) = 1 − σ(3) ≈ 1 − 0,95 = 0,05." } },
    { title: "Softmax : choisir entre plusieurs classes",
      html: `<p>Avec plus de deux classes, on a un score par classe. Le <strong>softmax</strong> les transforme en probabilités : on prend l'exponentielle de chaque score, puis on divise par la somme.</p><p>Scores (2, 1, 0) → exponentielles (7,39 ; 2,72 ; 1), dont la somme vaut 11,11 → probabilités (0,67 ; 0,24 ; 0,09). Elles somment à 1, et le plus grand score garde la plus grande probabilité.</p>`,
      ml: "La couche de sortie d'un réseau qui reconnaît 10 chiffres utilise un softmax : 10 scores deviennent 10 probabilités.",
      recall: { q: "Deux classes ont les scores (1, 1). Quelles probabilités donne le softmax ?", a: "e¹ et e¹ sont égaux, donc chaque classe reçoit e / (e + e) = 0,5." } },
    { title: "Pourquoi un logarithme dans le coût",
      html: `<p>Pour un exemple, la perte de classification la plus courante est :</p><p class="formula">perte = −ln(p)</p><p>où p est la probabilité que le modèle a donnée à la <strong>bonne</strong> classe.</p><ul><li>p = 0,9 : perte ≈ 0,11. Bonne réponse, avec assurance : presque aucune pénalité.</li><li>p = 0,5 : perte ≈ 0,69. Le modèle hésitait.</li><li>p = 0,01 : perte ≈ 4,61. Le modèle était presque sûr de lui, et il avait tort : grosse pénalité.</li></ul>`,
      ml: "Tu verras cette perte sous le nom d'entropie croisée (cross-entropy) ou de log-loss dans tous les cours de classification.",
      recall: { q: "Le modèle donne une probabilité de 0,01 à la bonne classe. La perte −ln(p) est-elle petite ou grande ? Pourquoi est-ce voulu ?", a: "Grande (environ 4,6). C'est voulu : le modèle était presque sûr de lui et il avait tort, donc il doit être fortement corrigé." } }
  ],
  feynman: { prompt: "Explique comment la sigmoïde transforme un score en probabilité, et pourquoi la perte −ln(p) punit fort les erreurs commises avec assurance.",
    points: ["eˣ est toujours positive ; ln en est l'inverse", "σ(z) = 1 / (1 + e^(−z)) donne un nombre entre 0 et 1, avec σ(0) = 0,5", "Softmax : exponentielle de chaque score, puis division par la somme", "−ln(p) est petite si p est proche de 1, énorme si p est proche de 0"] },
  quiz: [
    { id: "a5q1", type: "mcq", q: "e⁰ vaut :", options: ["0", "1", "e", "Ce n'est pas défini"], answer: 1,
      explain: "Tout nombre (non nul) à la puissance 0 vaut 1." },
    { id: "a5q2", type: "mcq", q: "ln(1) vaut :", options: ["1", "0", "e", "−1"], answer: 1,
      explain: "e⁰ = 1, donc la puissance cherchée est 0." },
    { id: "a5q3", type: "mcq", q: "σ(z) = 0,5 quand :", options: ["z = 1", "z = 0", "z = 0,5", "z est très grand"], answer: 1,
      explain: "σ(0) = 1 / (1 + e⁰) = 1 / 2. Un score nul correspond à une hésitation totale." },
    { id: "a5q4", type: "mcq", q: "Le softmax transforme les scores (3, 1, 0) en probabilités. Laquelle est la plus grande ?", options: ["Celle du score 0", "Celle du score 1", "Celle du score 3", "Elles sont égales"], answer: 2,
      explain: "L'exponentielle conserve l'ordre : le plus grand score donne la plus grande probabilité." },
    { id: "a5q5", type: "open", q: "Pourquoi utilise-t-on la sigmoïde en classification ? Que vaut-elle pour un score très positif, nul, puis très négatif ?",
      a: "Elle transforme un score quelconque en probabilité, entre 0 et 1. Score très positif : proche de 1. Score nul : 0,5. Score très négatif : proche de 0." }
  ],
  keypoints: ["Que vaut eˣ pour x très négatif, et pour x = 0 ?", "Que vaut ln(1), et comment ln transforme-t-il un produit ?", "Que fait la sigmoïde, et que vaut σ(0) ?", "Pourquoi −ln(p) punit-il fort une erreur commise avec assurance ?"],
  cards: [
    { id: "a5c1", f: "Propriétés de eˣ ?", b: "Toujours positive ; e⁰ = 1 ; grandit très vite ; tend vers 0 quand x est très négatif." },
    { id: "a5c2", f: "Qu'est-ce que ln(x) ?", b: "La puissance à laquelle élever e pour obtenir x. ln(1) = 0, ln(e) = 1." },
    { id: "a5c3", f: "ln(a × b) = ?", b: "ln(a) + ln(b) : le logarithme transforme un produit en somme." },
    { id: "a5c4", f: "Formule de la sigmoïde ?", b: "σ(z) = 1 / (1 + e^(−z)). Sortie entre 0 et 1." },
    { id: "a5c5", f: "σ(0), et symétrie de la sigmoïde ?", b: "σ(0) = 0,5 et σ(−z) = 1 − σ(z)." },
    { id: "a5c6", f: "Comment fonctionne le softmax ?", b: "Exponentielle de chaque score, divisée par la somme des exponentielles. Les probabilités somment à 1." },
    { id: "a5c7", f: "Perte −ln(p) ?", b: "Petite si le modèle donne une forte probabilité à la bonne classe, énorme s'il lui en donne une toute petite." }
  ]
},
{
  id: "a6", num: 6, track: "maths", prepares: "m5", title: "Probabilités", short: "Conditionnelles et Bayes",
  kind: "Concepts et calculs", method: "Tableaux de comptage, exemples de cybersécurité", minutes: 40,
  objective: "Calculer une probabilité et une probabilité conditionnelle, utiliser la formule de Bayes, et lire une loi normale.",
  pre: {
    q: "Un détecteur repère 99 % des attaques. Une alerte sonne. Y a-t-il 99 % de chances que ce soit une vraie attaque ?",
    a: "Pas forcément. Si les attaques sont très rares, la plupart des alertes peuvent être fausses, même avec un bon détecteur. Ce piège classique se résout avec les probabilités conditionnelles et la formule de Bayes, que ce module explique."
  },
  blocks: [
    { title: "Une probabilité, c'est une proportion",
      html: `<p>Une probabilité est un nombre entre 0 (impossible) et 1 (certain). Quand tous les cas sont équiprobables :</p><p class="formula">P(A) = cas favorables / cas possibles</p><p>Un dé : P(pair) = 3 / 6 = 0,5. Et le contraire d'un événement : <code>P(non A) = 1 − P(A)</code>.</p>`,
      ml: "Une sortie de classifieur comme « 70 % de chances que ce soit du phishing » est une probabilité.",
      recall: { q: "Sur 200 connexions, 10 sont malveillantes. Quelle est la probabilité qu'une connexion prise au hasard soit malveillante ? Et normale ?", a: "10 / 200 = 0,05, soit 5 %. Normale : 1 − 0,05 = 0,95." } },
    { title: "ET, OU : combiner des événements",
      html: `<ul><li>Si A et B sont <strong>indépendants</strong> (l'un n'influence pas l'autre) : <code>P(A et B) = P(A) × P(B)</code>. Deux pièces : P(pile et pile) = 0,5 × 0,5 = 0,25.</li><li>En général : <code>P(A ou B) = P(A) + P(B) − P(A et B)</code>. On retire P(A et B), sinon ces cas seraient comptés deux fois.</li></ul>`,
      ml: "Le classifieur « Naive Bayes » suppose que les features sont indépendantes, pour pouvoir multiplier leurs probabilités : c'est la partie « naïve ».",
      recall: { q: "On lance deux dés. Quelle est la probabilité d'obtenir deux 6 ?", a: "Les deux dés sont indépendants : 1/6 × 1/6 = 1/36 ≈ 0,028." } },
    { title: "La probabilité conditionnelle",
      html: `<p><code>P(A | B)</code> se lit « probabilité de A sachant B » : la probabilité de A <em>parmi les cas où B est vrai</em>.</p><p class="formula">P(A | B) = P(A et B) / P(B)</p><p>Exemple sur 1 000 connexions :</p><div class="table-wrap"><table><thead><tr><th></th><th class="num">Alerte</th><th class="num">Pas d'alerte</th><th class="num">Total</th></tr></thead><tbody><tr><td>Attaque</td><td class="num">18</td><td class="num">2</td><td class="num">20</td></tr><tr><td>Normal</td><td class="num">49</td><td class="num">931</td><td class="num">980</td></tr><tr><td>Total</td><td class="num">67</td><td class="num">933</td><td class="num">1 000</td></tr></tbody></table></div><ul><li>P(alerte | attaque) = 18 / 20 = 0,90 : on regarde la ligne des attaques.</li><li>P(attaque | alerte) = 18 / 67 ≈ 0,27 : on regarde la colonne des alertes.</li></ul>`,
      ml: "Tu viens de calculer un rappel (0,90) et une précision (0,27) : ce sont deux probabilités conditionnelles. Tout le module 5 repose sur cette idée.",
      recall: { q: "Avec ce tableau, pourquoi P(alerte | attaque) et P(attaque | alerte) sont-elles si différentes ?", a: "On ne divise pas par le même groupe : les 20 attaques dans un cas, les 67 alertes dans l'autre. Et comme le trafic normal est énorme, ses 49 fausses alertes pèsent lourd parmi les alertes." } },
    { title: "La formule de Bayes",
      html: `<p>Bayes permet de « retourner » une probabilité conditionnelle :</p><p class="formula">P(A | B) = P(B | A) × P(A) / P(B)</p><p>Avec le tableau précédent : P(attaque) = 20 / 1 000 = 0,02 ; P(alerte | attaque) = 0,90 ; P(alerte) = 67 / 1 000 = 0,067.</p><p>P(attaque | alerte) = 0,90 × 0,02 / 0,067 ≈ 0,27. On retrouve le même résultat que par comptage.</p><p>À retenir : quand A est rare (P(A) petite), même un bon détecteur donne beaucoup de fausses alertes.</p>`,
      ml: "Bayes sert à classer : on connaît, grâce aux données, la probabilité de voir certains mots dans un spam, P(mots | spam), et on veut P(spam | mots).",
      recall: { q: "Un détecteur repère 90 % des attaques ; 1 % des connexions sont des attaques ; 10 % des connexions déclenchent une alerte. Quelle est la probabilité qu'une alerte soit une vraie attaque ?", a: "Bayes : 0,9 × 0,01 / 0,10 = 0,009 / 0,1 = 0,09. Seulement 9 % des alertes sont de vraies attaques." } },
    { title: "Espérance et loi normale",
      html: `<p>L'<strong>espérance</strong> est la moyenne à long terme, chaque valeur pesée par sa probabilité : <code>E[X] = Σ x · P(x)</code>. Pour un dé : (1 + 2 + 3 + 4 + 5 + 6) / 6 = 3,5.</p><p>La <strong>loi normale</strong> est la courbe en cloche : centrée sur la moyenne μ, de largeur réglée par l'écart-type σ.</p>BELL_SVG<ul><li>environ 68 % des valeurs entre μ − σ et μ + σ ;</li><li>environ 95 % entre μ − 2σ et μ + 2σ ;</li><li>presque toutes (99,7 %) entre μ − 3σ et μ + 3σ.</li></ul>`,
      ml: "On suppose souvent que le bruit dans les données suit une loi normale. Et une valeur à plus de 3 écarts-types de la moyenne est un candidat classique pour la détection d'anomalies.",
      recall: { q: "Les temps de réponse d'un serveur suivent une loi normale de moyenne 200 ms et d'écart-type 20 ms. Entre quelles valeurs se trouvent environ 95 % des temps ?", a: "μ ± 2σ = 200 ± 40, donc entre 160 et 240 ms. Un temps de 300 ms serait très inhabituel : une anomalie à examiner." } }
  ],
  feynman: { prompt: "Explique, avec l'exemple du détecteur d'intrusion, la différence entre P(alerte | attaque) et P(attaque | alerte).",
    points: ["Une probabilité est une proportion entre 0 et 1", "P(A | B) : la probabilité de A parmi les cas où B est vrai", "P(alerte | attaque) correspond au rappel, P(attaque | alerte) à la précision", "Si les attaques sont rares, même un bon détecteur produit beaucoup de fausses alertes (Bayes)"] },
  quiz: [
    { id: "a6q1", type: "mcq", q: "P(A) = 0,3. Que vaut P(non A) ?", options: ["0,3", "0,7", "1,3", "0"], answer: 1,
      explain: "P(non A) = 1 − P(A) = 1 − 0,3 = 0,7." },
    { id: "a6q2", type: "mcq", q: "On lance une pièce deux fois. Probabilité d'obtenir pile les deux fois ?", options: ["0,5", "0,25", "1", "0,75"], answer: 1,
      explain: "Les lancers sont indépendants : 0,5 × 0,5 = 0,25." },
    { id: "a6q3", type: "mcq", q: "Dans un détecteur d'intrusion, la précision correspond à :", options: ["P(alerte | attaque)", "P(attaque | alerte)", "P(attaque)", "P(alerte)"], answer: 1,
      explain: "La précision : parmi les alertes, la part de vraies attaques. Le rappel, c'est P(alerte | attaque)." },
    { id: "a6q4", type: "mcq", q: "Pour une loi normale, quelle part des valeurs se trouve environ entre μ − 2σ et μ + 2σ ?", options: ["50 %", "68 %", "95 %", "100 %"], answer: 2,
      explain: "Règle 68-95-99,7 : 68 % à un écart-type, 95 % à deux, 99,7 % à trois." },
    { id: "a6q5", type: "open", q: "Explique avec tes mots pourquoi un détecteur qui repère 99 % des attaques peut quand même produire surtout de fausses alertes.",
      a: "Parce que les attaques sont rares : le trafic normal est si nombreux que même un petit pourcentage de fausses alertes sur lui dépasse le nombre de vraies attaques détectées. P(alerte | attaque) est élevée, mais P(attaque | alerte) peut rester faible (formule de Bayes)." }
  ],
  keypoints: ["Que vaut P(non A) ?", "Comment calcule-t-on P(A | B) avec un tableau de comptage ?", "Que dit la formule de Bayes ?", "Que dit la règle 68-95-99,7 ?"],
  cards: [
    { id: "a6c1", f: "Probabilité du contraire ?", b: "P(non A) = 1 − P(A)." },
    { id: "a6c2", f: "P(A et B) si A et B sont indépendants ?", b: "P(A) × P(B)." },
    { id: "a6c3", f: "Probabilité conditionnelle P(A | B) ?", b: "P(A et B) / P(B) : la probabilité de A parmi les cas où B est vrai." },
    { id: "a6c4", f: "Formule de Bayes ?", b: "P(A | B) = P(B | A) × P(A) / P(B)." },
    { id: "a6c5", f: "Précision et rappel en probabilités ?", b: "Précision = P(attaque | alerte). Rappel = P(alerte | attaque)." },
    { id: "a6c6", f: "Règle 68-95-99,7 ?", b: "Loi normale : 68 % des valeurs à ±1σ de la moyenne, 95 % à ±2σ, 99,7 % à ±3σ." },
    { id: "a6c7", f: "Espérance E[X] ?", b: "Σ x · P(x) : la moyenne à long terme. Pour un dé, 3,5." }
  ]
},
{
  id: "a7", num: 7, track: "maths", prepares: "m8", title: "Matrices et règle de la chaîne", short: "Le calcul des réseaux",
  kind: "Calcul et mécanisme", method: "Calculs pas à pas, dimensions vérifiées", minutes: 45,
  objective: "Multiplier une matrice par un vecteur, vérifier les dimensions, et comprendre la règle de la chaîne qu'utilise la rétropropagation.",
  pre: {
    q: "Trois neurones reçoivent chacun les deux mêmes entrées, avec leurs propres poids. Comment écrire tous ces calculs d'un coup ?",
    a: "En rangeant les poids dans un tableau à 3 lignes (une par neurone) et 2 colonnes (une par entrée), puis en le multipliant par le vecteur des entrées. Ce tableau est une matrice : c'est le sujet de ce module."
  },
  blocks: [
    { title: "Une matrice, c'est un tableau de nombres",
      html: `<p>Une <strong>matrice</strong> est un tableau de nombres avec m lignes et n colonnes : on dit qu'elle est de taille <strong>m × n</strong> (lignes d'abord).</p><p class="formula">A = [[1, 2, 0], [4, −1, 3]]   → taille 2 × 3</p><p><code>aᵢⱼ</code> désigne le nombre à la ligne i, colonne j : ici a₂,₁ = 4. Un vecteur est une matrice à une seule colonne.</p>`,
      ml: "Ton dataset X est une matrice (une ligne par exemple, une colonne par feature), et les poids d'une couche de neurones aussi.",
      recall: { q: "Une matrice a 4 lignes et 2 colonnes. Combien de nombres contient-elle ? Que désigne a₃,₁ ?", a: "4 × 2 = 8 nombres. a₃,₁ est le nombre à la ligne 3, colonne 1." } },
    { title: "Matrice × vecteur",
      html: `<p>Pour multiplier une matrice par un vecteur, on fait le <strong>produit scalaire de chaque ligne</strong> avec le vecteur (Maths 2).</p><p>W = [[1, 2], [0, −1], [3, 1]] et x = (2, 1) :</p><ul><li>ligne 1 : 1 × 2 + 2 × 1 = 4</li><li>ligne 2 : 0 × 2 + (−1) × 1 = −1</li><li>ligne 3 : 3 × 2 + 1 × 1 = 7</li></ul><p>Résultat : Wx = (4, −1, 7). Le nombre de colonnes de W doit égaler la dimension de x, et le résultat a autant de composantes que W a de lignes.</p>`,
      ml: "Une couche de neurones calcule exactement ça : z = Wx + b. Chaque ligne de W contient les poids d'un neurone.",
      recall: { q: "Calcule [[2, 0], [1, 3]] × (1, 2).", a: "Ligne 1 : 2 × 1 + 0 × 2 = 2. Ligne 2 : 1 × 1 + 3 × 2 = 7. Résultat : (2, 7)." } },
    { title: "Produit de matrices et dimensions",
      html: `<p>Règle des dimensions :</p><p class="formula">(m × n) × (n × p) → (m × p)</p><p>Les deux nombres « intérieurs » doivent être égaux, et ils disparaissent. Attention, l'ordre compte : en général AB ≠ BA.</p><p>La <strong>transposée</strong> <code>Aᵀ</code> échange lignes et colonnes : une matrice 2 × 3 devient 3 × 2.</p><p>Exemple : X de taille 100 × 5 et w de taille 5 × 1. Xw est de taille 100 × 1 : une prédiction pour chacun des 100 exemples.</p>`,
      ml: "Vérifier les dimensions est le premier réflexe quand une formule du cours paraît obscure. C'est aussi l'erreur la plus fréquente en code (« shapes not aligned »).",
      recall: { q: "X est de taille 100 × 5 et w de taille 5 × 1. Quelle est la taille de Xw ? Peut-on calculer wX ?", a: "Xw est de taille 100 × 1 : une prédiction par exemple. wX est impossible : (5 × 1) × (100 × 5), les dimensions intérieures 1 et 100 ne correspondent pas." } },
    { title: "Composer des fonctions",
      html: `<p>Composer, c'est enchaîner : <code>f(g(x))</code> veut dire « on applique g, puis f au résultat ».</p><p>Avec g(x) = 2x + 1 et f(u) = u² : g(3) = 7, puis f(7) = 49. Donc f(g(3)) = 49.</p><p>L'ordre compte : g(f(3)) = g(9) = 19.</p>`,
      ml: "Un réseau de neurones est une longue composition : couche 1, activation, couche 2, activation… La sortie de chaque étape devient l'entrée de la suivante.",
      recall: { q: "g(x) = x − 1 et f(u) = 3u. Que valent f(g(5)) et g(f(5)) ?", a: "f(g(5)) = f(4) = 12. g(f(5)) = g(15) = 14. L'ordre compte." } },
    { title: "La règle de la chaîne",
      html: `<p>Pour dériver une composition, on <strong>multiplie les dérivées le long de la chaîne</strong> :</p><p class="formula">dy/dx = dy/du × du/dx</p><p>Image : trois engrenages. Si A tourne 2 fois plus vite que B, et B 3 fois plus vite que C, alors A tourne 2 × 3 = 6 fois plus vite que C.</p><p>Exemple : y = u² et u = 2x + 1. dy/du = 2u et du/dx = 2, donc dy/dx = 2u × 2 = 4(2x + 1). C'est la règle vue en Maths 4, écrite autrement.</p>`,
      ml: "La rétropropagation applique la règle de la chaîne de la sortie vers l'entrée : elle multiplie les dérivées couche après couche pour savoir comment chaque poids influence l'erreur.",
      recall: { q: "y = 3u et u = x² + 1. Combien vaut dy/dx en x = 2 ?", a: "dy/du = 3 et du/dx = 2x, qui vaut 4 en x = 2. Règle de la chaîne : dy/dx = 3 × 4 = 12." } }
  ],
  feynman: { prompt: "Explique ce que calcule une couche de neurones avec une matrice, et comment la règle de la chaîne permet la rétropropagation.",
    points: ["Une matrice est un tableau m × n ; X et les poids d'une couche en sont", "Matrice × vecteur : un produit scalaire par ligne ; les dimensions intérieures doivent correspondre", "Un réseau est une composition de fonctions", "Règle de la chaîne : on multiplie les dérivées le long de la chaîne ; la rétropropagation l'applique couche par couche"] },
  quiz: [
    { id: "a7q1", type: "mcq", q: "Une matrice 3 × 4 multipliée par un vecteur de dimension 4 donne :", options: ["un vecteur de dimension 4", "un vecteur de dimension 3", "un nombre", "c'est impossible"], answer: 1,
      explain: "Un produit scalaire par ligne : 3 lignes, donc 3 résultats." },
    { id: "a7q2", type: "mcq", q: "Peut-on multiplier une matrice 2 × 3 par une matrice 2 × 3 ?", options: ["Oui, on obtient une 2 × 3", "Non, les dimensions intérieures (3 et 2) ne correspondent pas", "Oui, on obtient une 3 × 3", "Oui, on obtient une 2 × 2"], answer: 1,
      explain: "(2 × 3) × (2 × 3) : le 3 et le 2 du milieu doivent être égaux. Ils ne le sont pas." },
    { id: "a7q3", type: "mcq", q: "La transposée d'une matrice 5 × 2 est de taille :", options: ["5 × 2", "2 × 5", "5 × 5", "2 × 2"], answer: 1,
      explain: "La transposée échange lignes et colonnes." },
    { id: "a7q4", type: "mcq", q: "y = f(u) avec dy/du = 4, et u = g(x) avec du/dx = 0,5. Que vaut dy/dx ?", options: ["4,5", "2", "8", "0,5"], answer: 1,
      explain: "Règle de la chaîne : 4 × 0,5 = 2." },
    { id: "a7q5", type: "open", q: "Calcule [[1, −1], [2, 0]] × (3, 1), puis explique à quoi correspond ce calcul dans un réseau de neurones.",
      a: "Ligne 1 : 1 × 3 + (−1) × 1 = 2. Ligne 2 : 2 × 3 + 0 × 1 = 6. Résultat : (2, 6). Dans un réseau, c'est le calcul d'une couche de 2 neurones qui reçoivent 2 entrées : chaque ligne contient les poids d'un neurone (on ajoute ensuite le biais, puis l'activation)." }
  ],
  keypoints: ["Que veut dire « matrice 3 × 4 » ?", "Comment multiplie-t-on une matrice par un vecteur ?", "Quelle est la règle des dimensions pour un produit de matrices ?", "Que dit la règle de la chaîne, et où sert-elle ?"],
  cards: [
    { id: "a7c1", f: "Taille m × n d'une matrice ?", b: "m lignes et n colonnes (lignes d'abord)." },
    { id: "a7c2", f: "Matrice × vecteur ?", b: "Le produit scalaire de chaque ligne avec le vecteur. Résultat : un vecteur avec autant de composantes que de lignes." },
    { id: "a7c3", f: "Règle des dimensions d'un produit ?", b: "(m × n) × (n × p) → (m × p). Les dimensions intérieures doivent être égales." },
    { id: "a7c4", f: "AB = BA ?", b: "En général non : l'ordre compte pour les matrices." },
    { id: "a7c5", f: "Transposée Aᵀ ?", b: "On échange lignes et colonnes : 2 × 3 devient 3 × 2." },
    { id: "a7c6", f: "Règle de la chaîne ?", b: "dy/dx = dy/du × du/dx : on multiplie les dérivées le long de la chaîne." },
    { id: "a7c7", f: "Une couche de neurones en une formule ?", b: "z = Wx + b, puis une activation. Chaque ligne de W = les poids d'un neurone." }
  ]
}
];

/* Figures des modules de maths */
const PYTHA_SVG = `<figure class="fig"><svg viewBox="0 0 220 180" role="img" aria-label="Triangle rectangle de côtés 3 et 4 : l'hypoténuse mesure 5">
<g class="svg-line"><line x1="40" y1="155" x2="145" y2="155"/><line x1="145" y1="155" x2="145" y2="15"/></g>
<line x1="40" y1="155" x2="145" y2="15" class="svg-accent"/>
<rect x="133" y="143" width="12" height="12" class="svg-sq"/>
<g class="svg-txt"><text x="92" y="174">3</text><text x="160" y="90">4</text><text x="76" y="80" class="acc">5</text></g>
</svg><figcaption>Le vecteur (3, 4) : √(3² + 4²) = √25 = 5.</figcaption></figure>`;
const LINE_SVG = `<figure class="fig"><svg viewBox="0 0 300 185" role="img" aria-label="Droite y = 2x + 1 avec un triangle de pente : Δx = 1, Δy = 2">
<g class="svg-line thin"><line x1="30" y1="160.5" x2="290" y2="160.5"/><line x1="60.5" y1="178" x2="60.5" y2="8"/></g>
<line x1="40" y1="153.3" x2="230" y2="26.7" class="svg-accent"/>
<g class="svg-line dash"><line x1="120" y1="100" x2="180" y2="100"/><line x1="180" y1="100" x2="180" y2="60"/></g>
<circle cx="60.5" cy="140" r="3.5" class="svg-dot"/>
<g class="svg-lab"><text x="150" y="116">Δx = 1</text><text x="210" y="84">Δy = 2</text><text x="48" y="138" style="text-anchor:end">b = 1</text></g>
<g class="svg-txt"><text x="258" y="66" class="acc">y = 2x + 1</text></g>
</svg><figcaption>Pente = Δy / Δx = 2 / 1 = 2 ; la droite coupe l'axe vertical en b = 1.</figcaption></figure>`;
const BELL_SVG = (() => {
  const W = 320, H = 150, x0 = 20, x1 = 300, base = 120, top = 18;
  const sx = z => x0 + (z + 3.5) / 7 * (x1 - x0), sy = z => base - Math.exp(-z * z / 2) * (base - top);
  const path = (a, b, close) => { let d = ""; for (let i = 0; i <= 80; i++) { const z = a + (b - a) * i / 80; d += (i ? "L" : "M") + sx(z).toFixed(1) + " " + sy(z).toFixed(1) + " "; } return close ? d + `L${sx(b).toFixed(1)} ${base} L${sx(a).toFixed(1)} ${base} Z` : d; };
  const ticks = [-2, -1, 0, 1, 2].map(z => `<text x="${sx(z).toFixed(1)}" y="${base + 16}">${["−2σ", "−σ", "μ", "+σ", "+2σ"][z + 2]}</text>`).join("");
  return `<figure class="fig"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Courbe en cloche de la loi normale avec les zones à un et deux écarts-types">
<path d="${path(-2, 2, true)}" class="svg-band2"/><path d="${path(-1, 1, true)}" class="svg-band1"/>
<path d="${path(-3.5, 3.5, false)}" class="svg-curve"/>
<line x1="${x0}" y1="${base}" x2="${x1}" y2="${base}" class="svg-axis"/>
<g class="svg-lab">${ticks}<text x="${sx(0)}" y="${sy(0.2) + 40}" class="dark">68 %</text></g>
</svg><figcaption>Zone foncée : 68 % des valeurs, entre −σ et +σ. Zone foncée et zone claire ensemble : 95 %, entre −2σ et +2σ.</figcaption></figure>`;
})();
for (const m of MATHS) for (const b of m.blocks) b.html = b.html.replace("PYTHA_SVG", PYTHA_SVG).replace("LINE_SVG", LINE_SVG).replace("BELL_SVG", BELL_SVG);

/* Parcours : chaque module de maths juste avant le module de ML qui l'utilise */
(function () {
  const all = {};
  MODULES.forEach(m => { m.track = m.track || "ml"; all[m.id] = m; });
  MATHS.forEach(m => { all[m.id] = m; });
  const ORDER = ["m1", "a1", "a2", "m2", "a3", "a4", "m3", "a5", "m4", "a6", "m5", "m6", "m7", "a7", "m8", "m9"];
  MODULES.length = 0;
  ORDER.forEach(id => MODULES.push(all[id]));
})();

return MODULES;
})();
