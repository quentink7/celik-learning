/* Approfondissement pour débutants — Module 7, Maths 7, Module 8, Module 9 */
window.ML_DETAIL = window.ML_DETAIL || {};
Object.assign(window.ML_DETAIL, {

/* ================================================================ */
m7: {
  intro: `<p>Jusqu'ici, on avait toujours la bonne réponse pour chaque exemple. Ici, plus de labels : l'algorithme doit trouver tout seul des groupes ou des comportements inhabituels. C'est très utile quand on ne sait pas à l'avance ce qu'on cherche : des profils de clients, des consommations anormales…</p>`,
  prereq: `<p>La distance entre deux points et la moyenne (Maths 1 et 2), la mise à l'échelle (module 2).</p>`,
  blocks: {
    "L'algorithme k-means": {
      plain: `<p>Imagine k chefs d'équipe placés au hasard dans une cour de récréation. Chaque élève rejoint le chef le plus proche. Puis chaque chef se déplace au centre de son groupe. Les élèves regardent à nouveau quel chef est le plus proche, certains changent de groupe, les chefs se recentrent… Au bout de quelques tours, plus personne ne bouge : les groupes sont formés.</p>`,
      stepsTitle: "Pas à pas : k-means sur une seule dimension",
      steps: `<ol>
<li>Points : 1, 2, 3, 10, 11, 12. On choisit k = 2. Centres de départ (au hasard) : 1 et 3.</li>
<li><strong>Assigner</strong> : 1 et 2 vont au centre 1 (2 est à égale distance : on le met au premier). 3, 10, 11, 12 vont au centre 3.</li>
<li><strong>Recentrer</strong> : centre A = moyenne(1, 2) = 1,5. Centre B = moyenne(3, 10, 11, 12) = 9.</li>
<li><strong>Assigner</strong> : 1, 2, 3 sont plus proches de 1,5 ; 10, 11, 12 plus proches de 9.</li>
<li><strong>Recentrer</strong> : A = moyenne(1, 2, 3) = 2 ; B = moyenne(10, 11, 12) = 11.</li>
<li>Nouvelle assignation : identique. Plus rien ne bouge → fin. Groupes {1, 2, 3} et {10, 11, 12}.</li></ol>`,
      pitfall: `<p>Croire que k-means donne toujours le même résultat. Le point de départ est aléatoire : on le relance plusieurs fois (scikit-learn le fait automatiquement) et on garde la meilleure solution.</p>`
    },
    "À toi de dérouler": {
      plain: `<p>Le but de cette démo n'est pas de cliquer vite, mais de <strong>prédire</strong> avant chaque clic. Si ta prédiction est juste, tu as compris l'algorithme. Si elle est fausse, regarde pourquoi : c'est là que tu apprends.</p>`,
      stepsTitle: "Pas à pas : les questions à te poser à chaque étape",
      steps: `<ol>
<li>Étape « assigner » : pour un point à la limite entre deux groupes, quel centre est le plus proche ?</li>
<li>Étape « recentrer » : dans quelle direction chaque centre va-t-il bouger ? (vers le « milieu » de ses points).</li>
<li>Quand les centres ne bougent plus, est-ce que les groupes te paraissent naturels ?</li></ol>`,
      pitfall: `<p>Croire que les centres sont des exemples réels. Un centre est une moyenne : un point « imaginaire » au milieu de son groupe.</p>`
    },
    "Choisir k": {
      plain: `<p>k-means ne sait pas combien de groupes il y a : c'est toi qui le choisis. Avec k = nombre de points, chaque point est son propre groupe et l'erreur est nulle, mais ça n'a aucun intérêt. On cherche le k à partir duquel ajouter un groupe n'apporte presque plus rien : le « coude » de la courbe.</p>`,
      stepsTitle: "Pas à pas : lire une courbe du coude",
      steps: `<ol>
<li>Inertie obtenue : k = 1 → 1000 ; k = 2 → 420 ; k = 3 → 150 ; k = 4 → 130 ; k = 5 → 118.</li>
<li>Gains : de 1 à 2, −580 ; de 2 à 3, −270 ; de 3 à 4, seulement −20 ; de 4 à 5, −12.</li>
<li>La baisse ralentit brusquement après k = 3 : c'est le coude.</li>
<li>On choisit <strong>k = 3</strong>, puis on vérifie que les trois groupes ont un sens métier.</li></ol>`,
      pitfall: `<p>Choisir le k qui donne la plus petite inertie : c'est toujours le plus grand k. L'inertie baisse forcément quand on ajoute des groupes.</p>`
    },
    "Réduire les dimensions : la PCA": {
      plain: `<p>Prends une photo d'un objet en 3D : tu obtiens une image en 2D. Si tu choisis bien l'angle, on reconnaît l'objet ; si tu le photographies de face au lieu de profil, tu perds l'essentiel. La PCA cherche automatiquement le « meilleur angle » : les directions où les données varient le plus, pour garder un maximum d'information avec un minimum de dimensions.</p>`,
      stepsTitle: "Pas à pas : pourquoi deux features peuvent devenir une",
      steps: `<ol>
<li>Features : taille en cm et taille en pouces de 500 personnes.</li>
<li>Ces deux colonnes disent exactement la même chose : sur un graphique, les points forment une ligne droite.</li>
<li>La PCA trouve cette direction et projette les points dessus : une seule colonne suffit.</li>
<li>Avec des données réelles, les colonnes sont seulement en partie redondantes : on garde par exemple 10 directions qui expliquent 95 % de la variation, au lieu de 100 colonnes.</li></ol>`,
      pitfall: `<p>Oublier de standardiser avant la PCA. Sinon, la feature aux plus grands nombres domine les « directions principales » simplement à cause de son unité.</p>`
    },
    "Détecter les anomalies": {
      plain: `<p>Un gardien qui travaille dans le même immeuble depuis des années connaît les habitudes : qui arrive à quelle heure, par quelle porte. Il remarque immédiatement quelqu'un qui entre par le parking à 3 h du matin, sans qu'on lui ait jamais décrit ce cas. La détection d'anomalies apprend le « normal » et signale ce qui s'en écarte.</p>`,
      stepsTitle: "Pas à pas : une règle simple avec la moyenne et l'écart-type",
      steps: `<ol>
<li>Un employé télécharge en moyenne μ = 200 Mo par jour, avec un écart-type σ = 50 Mo.</li>
<li>Règle : on alerte au-delà de μ + 3σ = 200 + 150 = 350 Mo.</li>
<li>Aujourd'hui : 280 Mo. z = (280 − 200) / 50 = 1,6 → normal.</li>
<li>Demain : 5 000 Mo. z = (5000 − 200) / 50 = 96 → très anormal : alerte (exfiltration de données ?).</li>
<li>Les méthodes vues dans le cours (isolation forest, densité) généralisent cette idée à plusieurs features en même temps.</li></ol>`,
      pitfall: `<p>Considérer toute anomalie comme un problème. Une anomalie est seulement inhabituelle : une fête de famille, un nouvel appareil… Un humain doit toujours vérifier.</p>`
    }
  }
},

/* ================================================================ */
a7: {
  intro: `<p>Un réseau de neurones fait des milliers de produits scalaires à la fois. Pour les écrire et les calculer d'un coup, on utilise des <strong>matrices</strong>. Et pour savoir comment corriger chaque poids, on enchaîne des dérivées avec la <strong>règle de la chaîne</strong>. Ce module te donne ces deux outils, toujours avec des calculs à la main.</p>`,
  prereq: `<p>Le produit scalaire (Maths 2), les dérivées et la règle de la chaîne pour un carré (Maths 4).</p>`,
  blocks: {
    "Une matrice, c'est un tableau de nombres": {
      plain: `<p>Une matrice, c'est un tableau Excel rempli de nombres, sans les titres. Ton dataset X en est une : une ligne par exemple, une colonne par feature. En Python avec NumPy, c'est une liste de listes : <code>[[1, 2, 0], [4, -1, 3]]</code>. Sa « forme » (shape) donne le nombre de lignes puis de colonnes.</p>`,
      stepsTitle: "Pas à pas : lire une matrice 3 × 2",
      steps: `<ol>
<li>M = [[5, 1], [2, 7], [0, 3]].</li>
<li>3 lignes, 2 colonnes : taille <strong>3 × 2</strong> (toujours lignes d'abord).</li>
<li>m₂,₁ = ligne 2, colonne 1 = 2. m₃,₂ = ligne 3, colonne 2 = 3.</li>
<li>En Python (indices à partir de 0) : <code>M[1][0]</code> = 2 et <code>M[2][1]</code> = 3.</li></ol>`,
      pitfall: `<p>Inverser lignes et colonnes en donnant la taille. Une matrice 3 × 2 et une matrice 2 × 3 ne sont pas la même chose, et les multiplications qui marchent avec l'une échouent avec l'autre.</p>`
    },
    "Matrice × vecteur": {
      plain: `<p>Multiplier une matrice par un vecteur, c'est faire plusieurs factures d'un coup. Chaque ligne de la matrice est une liste de prix différente (un magasin), le vecteur est ton panier de quantités. Le résultat donne le total dans chaque magasin. En ML : chaque ligne est un exemple, le vecteur contient les poids, le résultat donne toutes les prédictions.</p>`,
      stepsTitle: "Pas à pas : [[2, 1], [0, 3], [1, −1]] × (4, 2)",
      steps: `<ol>
<li>Ligne 1 · vecteur : 2 × 4 + 1 × 2 = 8 + 2 = 10.</li>
<li>Ligne 2 · vecteur : 0 × 4 + 3 × 2 = 0 + 6 = 6.</li>
<li>Ligne 3 · vecteur : 1 × 4 + (−1) × 2 = 4 − 2 = 2.</li>
<li>Résultat : <strong>(10, 6, 2)</strong>, un vecteur de dimension 3 (autant que de lignes).</li></ol>`,
      pitfall: `<p>Essayer de multiplier une matrice 3 × 2 par un vecteur de dimension 3 : chaque ligne a 2 nombres, le vecteur en a 3, les paires ne tombent pas juste. C'est l'erreur « shapes not aligned » de NumPy.</p>`
    },
    "Produit de matrices et dimensions": {
      plain: `<p>La règle des dimensions est comme un jeu de dominos : on ne peut poser un domino à côté d'un autre que si les deux côtés qui se touchent ont le même nombre. (2 × <strong>3</strong>) × (<strong>3</strong> × 4) : les 3 se touchent, ça marche, et il reste 2 × 4. Avant tout calcul, vérifie les dimensions : ça évite 90 % des erreurs.</p>`,
      stepsTitle: "Pas à pas : suivre les dimensions dans un réseau",
      steps: `<ol>
<li>X : 64 exemples, 10 features → 64 × 10.</li>
<li>Poids de la couche cachée W₁ : 10 × 32 (10 entrées, 32 neurones).</li>
<li>X × W₁ : (64 × <strong>10</strong>) × (<strong>10</strong> × 32) → <strong>64 × 32</strong> : 32 valeurs par exemple.</li>
<li>Poids de sortie W₂ : 32 × 1. Résultat : (64 × 32) × (32 × 1) → <strong>64 × 1</strong> : une prédiction par exemple.</li></ol>`,
      pitfall: `<p>Penser que A × B = B × A. Avec les matrices, l'ordre compte : souvent l'un des deux produits n'est même pas possible.</p>`
    },
    "Composer des fonctions": {
      plain: `<p>Composer, c'est enchaîner des machines : la sortie de la première devient l'entrée de la deuxième. Un réseau de neurones est exactement ça : une couche calcule quelque chose, la suivante prend ce résultat et calcule autre chose, et ainsi de suite jusqu'à la prédiction.</p>`,
      stepsTitle: "Pas à pas : trois machines à la suite",
      steps: `<ol>
<li>g(x) = x + 2, h(u) = 3u, f(v) = v².</li>
<li>On calcule f(h(g(1))) de l'intérieur vers l'extérieur.</li>
<li>g(1) = 3.</li>
<li>h(3) = 9.</li>
<li>f(9) = <strong>81</strong>.</li></ol>`,
      pitfall: `<p>Lire f(g(x)) de gauche à droite et appliquer f en premier. On commence toujours par la fonction la plus à l'intérieur des parenthèses.</p>`
    },
    "La règle de la chaîne": {
      plain: `<p>Si tu tournes la manivelle d'un vélo, le pédalier fait tourner la chaîne, qui fait tourner la roue. Pour savoir de combien la roue tourne quand tu bouges la manivelle, tu multiplies les rapports de chaque étape. Pour un réseau : pour savoir comment l'erreur change quand on bouge un poids tout au début, on multiplie les effets de chaque couche, de la fin vers le début. C'est la <strong>rétropropagation</strong>.</p>`,
      stepsTitle: "Pas à pas : dériver L = (σ(z) − 1)² par rapport à z, en z = 0",
      steps: `<ol>
<li>On découpe en étapes : a = σ(z), puis L = (a − 1)².</li>
<li>Dérivée de la dernière étape : dL/da = 2(a − 1).</li>
<li>Dérivée de la sigmoïde (règle connue) : da/dz = σ(z) × (1 − σ(z)).</li>
<li>En z = 0 : a = σ(0) = 0,5. Donc dL/da = 2 × (−0,5) = −1 et da/dz = 0,5 × 0,5 = 0,25.</li>
<li>On multiplie : dL/dz = −1 × 0,25 = <strong>−0,25</strong>. Pente négative : augmenter z fait baisser l'erreur.</li></ol>`,
      pitfall: `<p>Additionner les dérivées de chaque étape au lieu de les multiplier. Le long d'une chaîne, les effets se multiplient.</p>`
    }
  }
},

/* ================================================================ */
m8: {
  intro: `<p>Les réseaux de neurones sont derrière la reconnaissance d'images, la traduction automatique et les assistants comme ChatGPT ou Claude. Bonne nouvelle : tu connais déjà toutes les pièces. Un neurone, c'est une régression logistique (module 4). Un réseau, ce sont des neurones en couches (matrices, Maths 7). L'apprentissage, c'est la descente de gradient (module 3) avec la règle de la chaîne.</p>`,
  prereq: `<p>Les matrices et la règle de la chaîne (Maths 7), la sigmoïde (Maths 5), la descente de gradient (module 3).</p>`,
  blocks: {
    "Un neurone artificiel": {
      plain: `<p>Un neurone artificiel est un petit calculateur qui prend une décision pondérée. Pense à toi qui décides d'aller ou non à un concert : le prix compte un peu (poids faible), la présence de tes amis compte beaucoup (poids fort), la distance compte négativement. Tu additionnes ces « votes », tu ajoutes ton envie de base (le biais), et tu décides.</p>`,
      stepsTitle: "Pas à pas : un neurone avec la ReLU",
      steps: `<ol>
<li>Entrées : x = (2 ; 1 ; 3). Poids : w = (0,5 ; −1 ; 0,2). Biais : b = 0,4.</li>
<li>Produit scalaire : 0,5 × 2 + (−1) × 1 + 0,2 × 3 = 1 − 1 + 0,6 = 0,6.</li>
<li>Avec le biais : z = 0,6 + 0,4 = 1,0.</li>
<li>Activation ReLU : a = max(0 ; 1,0) = <strong>1,0</strong>.</li>
<li>Si z avait été −0,5, la ReLU aurait donné 0 : le neurone serait resté « éteint ».</li></ol>`,
      pitfall: `<p>Croire qu'un neurone artificiel fonctionne comme un neurone du cerveau. Le nom vient d'une inspiration lointaine ; en pratique, c'est juste un produit scalaire suivi d'une fonction simple.</p>`
    },
    "Les fonctions d'activation": {
      plain: `<p>Sans activation, empiler des couches ne sert à rien : une suite de calculs « multiplier et additionner » reste un seul calcul « multiplier et additionner », c'est-à-dire une droite. L'activation ajoute un « coude » à chaque neurone. En combinant des milliers de petits coudes, le réseau peut dessiner des formes très complexes.</p>`,
      stepsTitle: "Pas à pas : la même entrée, trois activations",
      steps: `<ol>
<li>z = −2 : ReLU → 0 ; sigmoïde → 0,12.</li>
<li>z = 0 : ReLU → 0 ; sigmoïde → 0,5.</li>
<li>z = 3 : ReLU → 3 ; sigmoïde → 0,95.</li>
<li>Règle pratique : ReLU dans les couches cachées ; sigmoïde en sortie pour deux classes ; softmax en sortie pour plusieurs classes ; rien du tout en sortie pour une régression.</li></ol>`,
      pitfall: `<p>Mettre une sigmoïde en sortie d'un réseau qui doit prédire un prix : la sortie serait coincée entre 0 et 1. Pour une régression, la couche de sortie n'a pas d'activation.</p>`
    },
    "Des couches": {
      plain: `<p>Une couche, c'est un groupe de neurones qui regardent tous les mêmes entrées, chacun avec ses propres poids : chacun « cherche » quelque chose de différent. La couche suivante combine leurs réponses. Pour une image, les premières couches repèrent des traits et des bords, les suivantes des formes (un œil, une roue), les dernières des objets entiers.</p>`,
      stepsTitle: "Pas à pas : compter les paramètres d'un réseau 4 → 5 → 2",
      steps: `<ol>
<li>Entrée vers couche cachée : 4 × 5 = 20 poids, plus 5 biais (un par neurone) = 25.</li>
<li>Couche cachée vers sortie : 5 × 2 = 10 poids, plus 2 biais = 12.</li>
<li>Total : 25 + 12 = <strong>37 paramètres</strong> à apprendre.</li>
<li>Un grand modèle de langage en a des centaines de milliards : même principe, à une autre échelle.</li></ol>`,
      pitfall: `<p>Croire que « plus de couches » donne toujours un meilleur réseau. Plus de paramètres veut dire plus de risque de surapprentissage et besoin de plus de données (module 6).</p>`
    },
    "Comment le réseau apprend": {
      plain: `<p>C'est le même cycle qu'au module 3, répété des milliers de fois : 1) le réseau fait une prédiction ; 2) on mesure l'erreur ; 3) on calcule, pour chaque poids, s'il faut l'augmenter ou le diminuer (rétropropagation, avec la règle de la chaîne) ; 4) on fait un petit pas. Ce qui change, c'est seulement le nombre de poids à ajuster.</p>`,
      stepsTitle: "Pas à pas : le vocabulaire de l'entraînement",
      steps: `<ol>
<li><strong>Batch</strong> (lot) : on ne passe pas les 60 000 exemples d'un coup, mais par paquets de 32 ou 64.</li>
<li><strong>Itération</strong> : un passage avant + rétropropagation + mise à jour sur un batch.</li>
<li><strong>Époque</strong> (epoch) : quand tous les exemples sont passés une fois. 60 000 / 64 ≈ 938 itérations par époque.</li>
<li>On entraîne pendant plusieurs époques en surveillant l'erreur de validation, et on s'arrête quand elle remonte (<strong>arrêt précoce</strong>).</li></ol>`,
      pitfall: `<p>Croire que l'entraînement se fait au moment de l'utilisation. Une fois entraîné, le réseau ne fait plus que la propagation avant : c'est rapide. C'est l'entraînement qui est long et coûteux.</p>`
    },
    "Les grandes familles": {
      plain: `<p>Toutes ces familles utilisent les mêmes briques (neurones, couches, descente de gradient). Ce qui change, c'est la façon de les connecter, adaptée au type de données : des tableaux, des images où les pixels voisins comptent, des séquences où l'ordre compte, ou du texte où chaque mot dépend des autres.</p>`,
      stepsTitle: "Pas à pas : quel réseau pour quel problème ?",
      steps: `<ol>
<li>Prédire un défaut de paiement à partir de 20 colonnes d'un tableau → réseau <strong>dense</strong> (et souvent, une forêt aléatoire fait aussi bien).</li>
<li>Reconnaître des maladies de plantes sur des photos → <strong>CNN</strong>.</li>
<li>Traduire du français vers l'anglais, résumer un texte → <strong>transformer</strong>.</li>
<li>Détecter un comportement anormal dans une suite d'événements réseau → réseau de <strong>séquences</strong> (RNN ou transformer).</li></ol>`,
      pitfall: `<p>Utiliser un réseau de neurones pour tout. Sur des données en tableau de taille modeste, les arbres et forêts (module 4) sont souvent plus simples, plus rapides et aussi performants.</p>`
    }
  }
},

/* ================================================================ */
m9: {
  intro: `<p>Dernière étape : tout assembler dans un vrai projet en Python, avec la bibliothèque <strong>scikit-learn</strong>. Tu n'as pas besoin de réécrire les algorithmes : ils sont déjà programmés. Ton travail, c'est d'enchaîner les bonnes étapes dans le bon ordre, sans fuite de données, et de lire les résultats correctement. Pour exécuter ce code, utilise Google Colab (gratuit, dans le navigateur) ou Python installé sur ton ordinateur.</p>`,
  prereq: `<p>Le cours Python (au moins jusqu'aux fonctions), et les modules 2 à 6.</p>`,
  blocks: {
    "Le déroulé d'un projet": {
      plain: `<p>Un projet de ML ressemble à une recette de cuisine : l'ordre des étapes compte autant que les ingrédients. Si tu prétraites avant de séparer train et test, tu crées une fuite ; si tu évalues sur le test pour choisir un réglage, ton score final ment. Suis toujours le même ordre.</p>`,
      stepsTitle: "Pas à pas : un projet d'aide au diagnostic",
      steps: `<ol>
<li><strong>Problème</strong> : classer des tumeurs en bénignes ou malignes, comme dans le code ci-dessous. Métrique : le rappel (ne pas rater de tumeur maligne), avec une précision acceptable.</li>
<li><strong>Données</strong> : des centaines d'examens étiquetés par des médecins, une trentaine de mesures par examen (taille, forme, texture…).</li>
<li><strong>Séparation</strong> : 80 % train, 20 % test, mis de côté.</li>
<li><strong>Prétraitement</strong> sur le train : standardisation, encodage des catégories.</li>
<li><strong>Baseline</strong> : régression logistique simple. Rappel en validation croisée : 0,82.</li>
<li><strong>Amélioration</strong> : forêt aléatoire → 0,88. Baisse du seuil à 0,35 → rappel 0,93.</li>
<li><strong>Test final</strong>, une seule fois : rappel 0,91. C'est ce chiffre qu'on annonce.</li></ol>`,
      pitfall: `<p>Sauter la baseline et commencer directement par un modèle compliqué. Sans point de comparaison, impossible de savoir si la complexité apporte vraiment quelque chose.</p>`
    },
    "Le code complet, commenté": {
      plain: `<p>Lis ce code bloc par bloc en te demandant « à quelle étape du déroulé correspond-il ? ». Le <strong>pipeline</strong> (<code>make_pipeline</code>) est une chaîne qui colle ensemble prétraitement et modèle : il garantit que la standardisation est apprise sur le train et seulement appliquée au test. C'est l'outil anti-fuite par excellence.</p>`,
      stepsTitle: "Pas à pas : ce que fait chaque partie",
      steps: `<ol>
<li><strong>Imports</strong> : on charge les outils de scikit-learn.</li>
<li><strong>Données</strong> : <code>load_breast_cancer</code> donne X (569 × 30) et y (0 ou 1).</li>
<li><strong>Séparation</strong> : <code>train_test_split</code> avec <code>stratify=y</code> garde la même proportion de chaque classe dans train et test.</li>
<li><strong>Pipeline</strong> : StandardScaler puis LogisticRegression, entraînés ensemble avec <code>.fit(X_train, y_train)</code>.</li>
<li><strong>Évaluation</strong> : <code>classification_report</code> affiche précision, rappel et F1 pour chaque classe, sur le test.</li></ol>`,
      pitfall: `<p>Copier le code sans le comprendre et le lancer. Lis-le, prédis ce que chaque ligne va afficher, puis lance-le. Sinon tu sauras exécuter du code, mais pas en écrire.</p>`
    },
    "fit, transform, predict": {
      plain: `<p>Dans scikit-learn, tout objet suit les mêmes règles : <code>fit</code> = « apprends » (à partir du train) ; <code>transform</code> = « applique ce que tu as appris » ; <code>predict</code> = « donne ta réponse ». Une fois ce trio compris, tu sais utiliser presque tous les algorithmes de la bibliothèque, qui fonctionnent tous de la même manière.</p>`,
      stepsTitle: "Pas à pas : un StandardScaler sur des âges",
      steps: `<ol>
<li><code>scaler.fit(X_train)</code> avec les âges 20, 30, 40 : il mémorise μ = 30 et σ ≈ 8,16.</li>
<li><code>scaler.transform(X_train)</code> → (−1,22 ; 0 ; 1,22).</li>
<li><code>scaler.transform(X_test)</code> avec l'âge 35 → (35 − 30) / 8,16 ≈ 0,61, avec les μ et σ du <strong>train</strong>.</li>
<li><code>fit_transform</code> fait les deux premières étapes d'un coup : à n'utiliser que sur le train.</li></ol>`,
      pitfall: `<p>Écrire <code>scaler.fit_transform(X_test)</code>. C'est l'erreur de fuite la plus courante dans le code des débutants : sur le test, c'est toujours <code>transform</code> seul.</p>`
    },
    "Code à trous": {
      plain: `<p>Compléter un code à trous de mémoire est bien plus efficace que relire un code complet : ton cerveau doit retrouver l'information, et c'est cet effort qui la fixe. Si tu hésites sur un trou, c'est exactement la notion à revoir.</p>`,
      stepsTitle: "Pas à pas : la logique pour remplir chaque trou",
      steps: `<ol>
<li>Trou 1 : sur le train, le scaler doit apprendre ET transformer → ?</li>
<li>Trou 2 : sur le test, il doit seulement appliquer ce qu'il a appris → ?</li>
<li>Trou 3 : le modèle doit apprendre à partir de X_train_s et y_train → ?</li>
<li>Trou 4 : on veut des probabilités (pour choisir notre propre seuil de 0,3), pas directement des classes → ?</li>
<li>Vérifie tes réponses avec la section « fit, transform, predict ».</li></ol>`,
      pitfall: `<p>Utiliser <code>predict</code> au lieu de <code>predict_proba</code> quand on veut changer le seuil : <code>predict</code> applique toujours le seuil de 0,5.</p>`
    },
    "Ton mini-projet": {
      plain: `<p>Refaire seul un projet complet sur de nouvelles données, c'est l'épreuve qui montre que tu as vraiment compris. Tu vas bloquer, et c'est normal : chaque blocage te montre précisément ce qu'il faut revoir. Garde ton code : c'est un premier élément de portfolio.</p>`,
      stepsTitle: "Pas à pas : comment t'y prendre",
      steps: `<ol>
<li>Ouvre Google Colab (colab.research.google.com) et crée un nouveau notebook.</li>
<li>Charge <code>load_iris</code> et affiche <code>X.shape</code> et les noms des classes.</li>
<li>Écris de mémoire : séparation, pipeline, entraînement, évaluation.</li>
<li>Prédis ton score avant de lancer, puis compare avec le score obtenu.</li>
<li>Remplace LogisticRegression par <code>KNeighborsClassifier(n_neighbors=5)</code> et compare les deux.</li>
<li>Écris trois phrases de conclusion : quel modèle, quel score, et pourquoi.</li></ol>`,
      pitfall: `<p>Regarder la solution dès le premier blocage. Donne-toi au moins 10 minutes de recherche (relire le cours, lire le message d'erreur) avant de regarder une seule ligne.</p>`
    }
  }
}
});
