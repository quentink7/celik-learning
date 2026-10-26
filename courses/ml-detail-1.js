/* Approfondissement pour débutants — Module 1, Maths 1, Maths 2, Module 2 */
window.ML_DETAIL = window.ML_DETAIL || {};
Object.assign(window.ML_DETAIL, {

/* ================================================================ */
m1: {
  intro: `<p>Le machine learning (ML, « apprentissage automatique ») est une façon de fabriquer des programmes <strong>en leur montrant des exemples</strong> plutôt qu'en leur écrivant des règles. Ce module ne contient aucune formule : il installe le vocabulaire et les trois grandes familles, qui reviendront dans tout le cours. Prends le temps de bien les comprendre, tout le reste s'appuie dessus.</p>`,
  blocks: {
    "Programmer ou apprendre": {
      plain: `<p>Pense à la façon dont un enfant apprend à reconnaître un chien. Personne ne lui donne la règle « quatre pattes, des poils, une queue, aboie » : on lui montre des chiens en disant « chien », d'autres animaux en disant « pas chien ». Après assez d'exemples, il reconnaît un chien qu'il n'a jamais vu. Le machine learning fait la même chose avec un ordinateur.</p>`,
      stepsTitle: "Pas à pas : un filtre anti-spam, de deux façons",
      steps: `<ol>
<li><strong>Programmation classique.</strong> Tu écris : « si le message contient “gagnez” ou “gratuit”, c'est un spam ». Les spammeurs écrivent « g@gnez » : ta règle rate. Tu dois sans cesse en ajouter.</li>
<li><strong>Machine learning.</strong> Tu rassembles 10 000 emails déjà triés à la main : « spam » ou « normal ».</li>
<li>Tu donnes ces exemples à un algorithme. Il repère tout seul ce qui distingue les deux tas (mots, liens, heure d'envoi, expéditeur…).</li>
<li>Le résultat est un <strong>modèle</strong> : une sorte de règle apprise, que tu appliques aux nouveaux emails.</li>
<li>Quand les spammeurs changent de technique, tu ajoutes des exemples récents et tu réentraînes : pas besoin de réécrire les règles.</li></ol>`,
      pitfall: `<p>Croire que le ML est « magique » ou intelligent au sens humain. Un modèle ne fait que reproduire les régularités de ses exemples : s'ils sont mauvais ou incomplets, il le sera aussi.</p>`
    },
    "Le vocabulaire de base": {
      plain: `<p>Imagine un cahier où tu notes chaque maison vendue dans ton quartier. Chaque <strong>ligne</strong> du cahier est un <strong>exemple</strong> (une maison). Chaque <strong>colonne</strong> d'informations (surface, nombre de pièces, quartier) est une <strong>feature</strong>. La colonne qu'on veut deviner pour les futures maisons (le prix) est le <strong>label</strong>. Le <strong>modèle</strong> est ce que l'ordinateur retient de ce cahier pour estimer le prix d'une maison qui n'y figure pas encore.</p>`,
      stepsTitle: "Pas à pas : reconnaître chaque mot dans une situation réelle",
      steps: `<ol>
<li>Situation : prévoir si un étudiant va réussir son examen.</li>
<li><strong>Exemple</strong> : un étudiant de l'an dernier.</li>
<li><strong>Features</strong> : heures de révision, taux de présence, note au partiel.</li>
<li><strong>Label</strong> : réussi ou échoué (on le connaît, puisque c'est l'an dernier).</li>
<li><strong>Entraînement</strong> : l'algorithme étudie les étudiants de l'an dernier.</li>
<li><strong>Inférence</strong> : on applique le modèle à un étudiant de cette année, dont on ne connaît pas encore le résultat.</li></ol>`,
      pitfall: `<p>Mettre le label parmi les features. Si tu donnes au modèle « résultat de l'examen » pour prédire « résultat de l'examen », il paraîtra parfait… et ne servira à rien. On en reparle au module 2 (« fuite de données »).</p>`
    },
    "Supervisé : on connaît les réponses": {
      plain: `<p>« Supervisé » veut dire qu'il y a un professeur : pour chaque exemple d'entraînement, on donne la bonne réponse. Le modèle s'entraîne comme un élève qui fait des exercices <strong>avec le corrigé</strong>.</p>`,
      stepsTitle: "Pas à pas : régression ou classification ?",
      steps: `<ol>
<li>Pose-toi la question : la réponse est-elle un <strong>nombre qui se mesure</strong> ou une <strong>catégorie</strong> ?</li>
<li>« Combien coûtera ce terrain ? » → un nombre (12 500 000 F) → <strong>régression</strong>.</li>
<li>« Cette transaction est-elle frauduleuse ? » → oui / non → <strong>classification</strong> (deux classes).</li>
<li>« Quelle langue parle ce message : français, mooré, dioula ? » → une catégorie parmi trois → <strong>classification</strong> (multi-classes).</li>
<li>« Quelle température demain ? » → un nombre → <strong>régression</strong>.</li></ol>`,
      pitfall: `<p>Se fier au fait que la réponse soit écrite avec des chiffres. Une note de 1 à 5 étoiles peut être traitée en classification (5 boîtes) ; un code postal est un nombre mais n'a aucun sens en régression (faire la moyenne de deux codes postaux n'a pas de sens).</p>`
    },
    "Non supervisé : trouver la structure seul": {
      plain: `<p>Ici, pas de corrigé. Imagine qu'on te donne un sac de 500 boutons sans rien te dire. Tu vas spontanément les trier en tas : par couleur, par taille, par nombre de trous. Personne ne t'a dit quels tas faire : tu as trouvé une <strong>structure</strong> toi-même. C'est l'apprentissage non supervisé.</p>`,
      stepsTitle: "Pas à pas : à quoi ça sert concrètement",
      steps: `<ol>
<li><strong>Clustering</strong> : un restaurant regroupe ses clients selon leurs habitudes (heure de visite, montant, fréquence). Il découvre trois profils : « déjeuner de bureau », « famille du week-end », « soirée entre amis ». Il peut adapter sa communication à chacun.</li>
<li><strong>Réduction de dimension</strong> : un fichier a 300 colonnes ; on le résume en 2 pour pouvoir le dessiner sur un graphique.</li>
<li><strong>Anomalies</strong> : la société d'électricité apprend à quoi ressemble la consommation normale de chaque quartier, puis signale les compteurs qui s'en écartent beaucoup (fuite, compteur défectueux…).</li></ol>`,
      pitfall: `<p>Croire que les groupes trouvés ont forcément un sens. L'algorithme trouvera toujours des groupes, même dans des données sans structure. C'est à toi de vérifier qu'ils veulent dire quelque chose.</p>`
    },
    "Renforcement : essais, erreurs, récompenses": {
      plain: `<p>Pense à la façon dont on apprend à faire du vélo : personne ne te dit l'angle exact du guidon. Tu essaies, tu tombes (pénalité), tu ajustes, tu tiens quelques mètres (récompense). À force d'essais, tu trouves une stratégie qui marche. Un agent d'apprentissage par renforcement apprend exactement ainsi.</p>`,
      stepsTitle: "Pas à pas : les quatre éléments à reconnaître",
      steps: `<ol>
<li><strong>Agent</strong> : celui qui apprend (un programme qui joue aux échecs).</li>
<li><strong>Environnement</strong> : le monde dans lequel il agit (l'échiquier et l'adversaire).</li>
<li><strong>Action</strong> : ce qu'il peut faire (déplacer une pièce).</li>
<li><strong>Récompense</strong> : le signal reçu (+1 s'il gagne la partie, −1 s'il perd). Souvent, elle n'arrive qu'à la fin : l'agent doit deviner lesquels de ses coups l'ont fait gagner.</li></ol>`,
      pitfall: `<p>Confondre renforcement et supervisé. En supervisé, on dit « la bonne réponse était B ». En renforcement, on dit seulement « c'était bien » ou « c'était mal », sans dire ce qu'il aurait fallu faire.</p>`
    }
  }
},

/* ================================================================ */
a1: {
  intro: `<p>Beaucoup de gens bloquent en ML non pas sur les idées, mais sur l'<strong>écriture</strong> des maths : des lettres grecques, des petits chiffres, des Σ. Ce module te les traduit une par une en français. Aucun calcul difficile : seulement des additions, des multiplications et un peu de patience. Prends une feuille et refais chaque exemple à la main.</p>`,
  blocks: {
    "Une formule, c'est une phrase abrégée": {
      plain: `<p>Une formule est un raccourci d'écriture, exactement comme « RDV 14h » est un raccourci pour « rendez-vous à quatorze heures ». <code>y = 2x + 10</code> se lit : « pour obtenir y, prends x, multiplie-le par 2, puis ajoute 10 ». Pour lire une formule, remplace chaque lettre par un nombre et calcule.</p>`,
      stepsTitle: "Pas à pas : utiliser y = 2x + 10",
      steps: `<ol>
<li>On choisit une valeur pour x, par exemple x = 5.</li>
<li>On remplace x par 5 : y = 2 × 5 + 10.</li>
<li>On calcule la multiplication d'abord : 2 × 5 = 10.</li>
<li>Puis l'addition : 10 + 10 = 20. Donc y = 20.</li>
<li>Avec x = 0 : y = 2 × 0 + 10 = 10. Avec x = 100 : y = 210.</li></ol>`,
      pitfall: `<p>Lire <code>2x</code> comme « 2 et x » ou « vingt-quelque chose ». Deux symboles collés se multiplient : <code>2x</code> = 2 × x, et <code>ab</code> = a × b.</p>`
    },
    "Les indices : numéroter les exemples": {
      plain: `<p>L'indice, c'est comme un numéro de maillot. Dans une équipe, tous les joueurs s'appellent « joueur », alors on les distingue par un numéro : joueur 1, joueur 2… En maths, toutes les surfaces s'appellent x, et on les distingue avec un petit numéro en bas : x₁, x₂, x₃. Le <code>i</code> dans xᵢ veut dire « le numéro qu'on veut, n'importe lequel ».</p>`,
      stepsTitle: "Pas à pas : lire un tableau avec deux indices",
      steps: `<ol>
<li>Tableau de 3 maisons (lignes) et 2 features (colonnes : surface, pièces) : maison 1 = (85, 3), maison 2 = (120, 5), maison 3 = (60, 2).</li>
<li>Le premier indice est la ligne (la maison), le second la colonne (la feature).</li>
<li>x₂,₁ = ligne 2, colonne 1 = la surface de la maison 2 = <strong>120</strong>.</li>
<li>x₃,₂ = ligne 3, colonne 2 = les pièces de la maison 3 = <strong>2</strong>.</li>
<li>Remarque : en maths on compte à partir de 1, en Python à partir de 0. x₂,₁ s'écrirait <code>X[1][0]</code> en Python.</li></ol>`,
      pitfall: `<p>Confondre l'indice et une puissance. x₂ (en bas) est « le deuxième x » ; x² (en haut) est « x au carré ». Ce n'est pas du tout la même chose.</p>`
    },
    "Σ, la grande somme": {
      plain: `<p>Σ (sigma) est simplement une instruction : « additionne tout ». Pense à une boucle <code>for</code> en Python : Σ xᵢ pour i de 1 à n, c'est <code>total = 0 ; for i in range(1, n+1): total += x[i]</code>. Ce qui est écrit à droite du Σ, c'est ce qu'on additionne à chaque tour.</p>`,
      stepsTitle: "Pas à pas : calculer Σ (xᵢ − 3)² avec x = (2, 5, 1)",
      steps: `<ol>
<li>Tour i = 1 : x₁ = 2. On calcule (2 − 3)² = (−1)² = 1.</li>
<li>Tour i = 2 : x₂ = 5. (5 − 3)² = 2² = 4.</li>
<li>Tour i = 3 : x₃ = 1. (1 − 3)² = (−2)² = 4.</li>
<li>On additionne les trois résultats : 1 + 4 + 4 = <strong>9</strong>.</li>
<li>Ce calcul (écart à une valeur, au carré, puis somme) est exactement celui de l'erreur d'un modèle, que tu verras au module 3.</li></ol>`,
      pitfall: `<p>Faire l'opération sur la somme au lieu de chaque élément. Σ xᵢ² (somme des carrés : 4 + 25 + 1 = 30) n'est pas (Σ xᵢ)² (carré de la somme : 8² = 64).</p>`
    },
    "Carrés, racines et ordre des calculs": {
      plain: `<p>Le carré, c'est « multiplier un nombre par lui-même » : l'aire d'un carré de côté 3 est 3 × 3 = 9. La racine carrée fait le chemin inverse : « quel côté donne une aire de 9 ? » → 3. En ML, on met souvent les erreurs au carré pour qu'elles soient toutes positives.</p>`,
      stepsTitle: "Pas à pas : calculer 2 × (4 − 1)² + √16",
      steps: `<ol>
<li>Parenthèses d'abord : 4 − 1 = 3.</li>
<li>Puissances et racines : 3² = 9 et √16 = 4.</li>
<li>Multiplications : 2 × 9 = 18.</li>
<li>Additions : 18 + 4 = <strong>22</strong>.</li></ol>`,
      pitfall: `<p>Écrire −3² et penser que ça vaut 9. Sans parenthèses, le carré s'applique seulement au 3 : −3² = −9. Pour le carré de −3, il faut (−3)² = 9. Sur une calculatrice ou en Python, mets toujours les parenthèses.</p>`
    },
    "Moyenne, variance, écart-type": {
      plain: `<p>Deux classes ont la même moyenne de 10/20. Dans la première, tout le monde a entre 9 et 11. Dans la seconde, la moitié a 2 et l'autre moitié 18. La moyenne ne voit pas la différence ! La <strong>variance</strong> et l'<strong>écart-type</strong> mesurent cette dispersion : « en général, à quelle distance de la moyenne sont les valeurs ? ».</p>`,
      stepsTitle: "Pas à pas : notes 4, 10, 16",
      steps: `<ol>
<li>Moyenne : μ = (4 + 10 + 16) / 3 = 30 / 3 = 10.</li>
<li>Écarts à la moyenne : 4 − 10 = −6 ; 10 − 10 = 0 ; 16 − 10 = 6.</li>
<li>Écarts au carré : 36, 0, 36. (Le carré évite que −6 et +6 s'annulent.)</li>
<li>Variance = moyenne des carrés : σ² = (36 + 0 + 36) / 3 = 72 / 3 = 24.</li>
<li>Écart-type : σ = √24 ≈ 4,9. Lecture : « en général, une note s'écarte d'environ 5 points de la moyenne ».</li>
<li>Compare avec 9, 10, 11 : écarts −1, 0, 1 → carrés 1, 0, 1 → variance 2/3 → σ ≈ 0,8. Même moyenne, dispersion beaucoup plus faible.</li></ol>`,
      pitfall: `<p>Oublier de prendre la racine. La variance est dans une unité « au carré » (des points²), difficile à interpréter. L'écart-type revient dans l'unité des données (des points) : c'est lui qu'on commente.</p>`
    }
  }
},

/* ================================================================ */
a2: {
  intro: `<p>En ML, chaque exemple est décrit par une <strong>liste de nombres</strong> : c'est un vecteur. Pour comparer deux exemples (« ces deux maisons se ressemblent-elles ? ») ou calculer une prédiction, on a besoin de quelques opérations simples sur ces listes. Ce module te les donne, avec des calculs faits à la main.</p>`,
  blocks: {
    "Un vecteur, c'est une liste de nombres": {
      plain: `<p>Un vecteur, c'est une fiche d'identité chiffrée. Une maison = (surface, pièces, âge) = (85, 3, 12). Un client = (âge, nombre de visites, panier moyen) = (34, 12, 4500). En Python, c'est tout simplement une liste : <code>[85, 3, 12]</code>. L'<strong>ordre</strong> compte : la première case est toujours la surface.</p>`,
      stepsTitle: "Pas à pas : du tableau aux vecteurs",
      steps: `<ol>
<li>Tableau de 3 maisons avec 3 features chacune.</li>
<li>Chaque ligne est un vecteur de dimension 3 : (85, 3, 12), (120, 5, 4), (60, 2, 30).</li>
<li>On les empile : c'est la matrice X, de taille 3 × 3 (3 exemples, 3 features).</li>
<li>Les prix (42, 61, 30) forment un autre vecteur, y, de dimension 3 (un label par exemple).</li></ol>`,
      pitfall: `<p>Changer l'ordre des composantes d'un exemple à l'autre. Si une maison est écrite (surface, pièces) et une autre (pièces, surface), tous les calculs suivants seront faux sans aucun message d'erreur.</p>`
    },
    "Additionner, soustraire, multiplier par un nombre": {
      plain: `<p>On fait les opérations <strong>case par case</strong>, comme deux colonnes d'un tableau qu'on additionne ligne à ligne. Multiplier un vecteur par un nombre, c'est multiplier chaque case : c'est comme convertir toutes les valeurs d'une unité à une autre d'un coup.</p>`,
      stepsTitle: "Pas à pas : (2, −1, 4) − 2 × (1, 3, 0)",
      steps: `<ol>
<li>D'abord la multiplication : 2 × (1, 3, 0) = (2, 6, 0).</li>
<li>Puis la soustraction case par case : (2 − 2, −1 − 6, 4 − 0).</li>
<li>Résultat : <strong>(0, −7, 4)</strong>.</li></ol>`,
      pitfall: `<p>Additionner deux vecteurs de tailles différentes : (1, 2) + (3, 4, 5) n'a pas de sens. En Python avec NumPy, ce genre d'erreur provoque un message sur les « shapes » (formes) : c'est l'une des erreurs les plus fréquentes en ML.</p>`
    },
    "Le produit scalaire": {
      plain: `<p>Le produit scalaire, c'est le calcul d'une <strong>facture</strong>. Tu achètes 3 riz à 500 F et 2 huiles à 1200 F. Quantités (3, 2), prix (500, 1200). Total = 3 × 500 + 2 × 1200 = 3900 F. On multiplie les cases deux à deux, puis on additionne : c'est exactement ça. Un modèle linéaire fait la même chose : il multiplie chaque feature par son poids et additionne.</p>`,
      stepsTitle: "Pas à pas : (2, −1, 3) · (4, 5, 1)",
      steps: `<ol>
<li>Case 1 : 2 × 4 = 8.</li>
<li>Case 2 : (−1) × 5 = −5.</li>
<li>Case 3 : 3 × 1 = 3.</li>
<li>Somme : 8 + (−5) + 3 = <strong>6</strong>. Le résultat est un seul nombre.</li></ol>`,
      pitfall: `<p>Croire que le résultat est un vecteur (8, −5, 3). Ce vecteur est l'étape intermédiaire ; le produit scalaire, c'est la somme finale, un seul nombre.</p>`
    },
    "La longueur d'un vecteur": {
      plain: `<p>Dessine le vecteur (3, 4) comme une flèche : 3 pas vers la droite, 4 pas vers le haut. Sa longueur est la distance parcourue « à vol d'oiseau » depuis le départ. Pythagore donne cette distance : on additionne les carrés des côtés, puis on prend la racine.</p>`,
      stepsTitle: "Pas à pas : longueur de (1, 2, 2)",
      steps: `<ol>
<li>Carrés de chaque composante : 1² = 1, 2² = 4, 2² = 4.</li>
<li>Somme : 1 + 4 + 4 = 9.</li>
<li>Racine : √9 = <strong>3</strong>.</li></ol>`,
      pitfall: `<p>Additionner les composantes sans les mettre au carré : 1 + 2 + 2 = 5 n'est pas la longueur. Et ne pas oublier la racine à la fin.</p>`
    },
    "La distance entre deux points": {
      plain: `<p>Pour savoir si deux exemples se ressemblent, on mesure la distance entre eux : petite distance = exemples semblables. C'est la base de k-NN (module 4) et de k-means (module 7). On fait la différence case par case, puis on prend la longueur de ce vecteur différence.</p>`,
      stepsTitle: "Pas à pas : distance entre A = (1, 5) et B = (4, 1)",
      steps: `<ol>
<li>Différence case par case : (1 − 4, 5 − 1) = (−3, 4).</li>
<li>Carrés : (−3)² = 9 et 4² = 16.</li>
<li>Somme : 9 + 16 = 25.</li>
<li>Racine : √25 = <strong>5</strong>.</li>
<li>Avec des données réelles, si une feature va jusqu'à des millions (salaire) et une autre jusqu'à 5 (enfants), la première écrase la seconde dans la distance : d'où la mise à l'échelle du module 2.</li></ol>`,
      pitfall: `<p>Comparer des distances calculées avec des features dans des unités très différentes, sans les mettre à la même échelle. Le résultat dépend alors surtout de la feature qui a les plus grands nombres.</p>`
    }
  }
},

/* ================================================================ */
m2: {
  intro: `<p>Un modèle n'apprend que de ce qu'on lui montre. Ce module parle de la <strong>préparation des données</strong>, qui représente souvent 70 à 80 % du travail réel en ML. Les erreurs faites ici (mélanger les données de test, oublier de nettoyer) sont invisibles au début et catastrophiques à la fin.</p>`,
  prereq: `<p>Les vecteurs (Maths 2) et la moyenne / l'écart-type (Maths 1).</p>`,
  blocks: {
    "Un dataset, c'est un tableau": {
      plain: `<p>Un dataset ressemble à une feuille Excel : une ligne par exemple, une colonne par information. Par convention, on sépare le tableau en deux : <strong>X</strong> (majuscule) contient toutes les colonnes d'entrée, <strong>y</strong> (minuscule) contient la colonne à prédire. La majuscule rappelle que X est un tableau entier, la minuscule que y est une seule colonne.</p>`,
      stepsTitle: "Pas à pas : préparer X et y en Python",
      steps: `<ol>
<li>On charge le tableau (souvent avec la bibliothèque pandas) : <code>df = pd.read_csv("maisons.csv")</code>.</li>
<li>On sépare le label : <code>y = df["prix"]</code>.</li>
<li>Le reste forme les features : <code>X = df.drop(columns=["prix"])</code>.</li>
<li>On vérifie les tailles : <code>X.shape</code> donne (n, d), par exemple (500, 3) ; <code>y.shape</code> donne (500,).</li></ol>`,
      pitfall: `<p>Laisser dans X une colonne d'identifiant (numéro de client, numéro de ligne). Elle ne porte aucune information utile, mais le modèle peut s'y accrocher par hasard.</p>`
    },
    "Entraînement, validation, test": {
      plain: `<p>Si un professeur donne à l'examen exactement les exercices corrigés en classe, un élève qui a tout appris par cœur aura 20/20 sans rien comprendre. Pour savoir si un modèle a vraiment appris, il faut l'évaluer sur des exemples <strong>qu'il n'a jamais vus</strong>. D'où la séparation des données <em>avant</em> de commencer.</p>`,
      stepsTitle: "Pas à pas : découper 1 000 exemples",
      steps: `<ol>
<li>On mélange les exemples au hasard (pour éviter que tous les cas récents soient dans le même groupe).</li>
<li>700 exemples (70 %) pour l'<strong>entraînement</strong>.</li>
<li>150 (15 %) pour la <strong>validation</strong> : on teste plusieurs réglages, on garde le meilleur.</li>
<li>150 (15 %) pour le <strong>test</strong> : on les met dans un coffre, et on ne les ouvre qu'une seule fois, à la toute fin.</li>
<li>En Python : <code>train_test_split(X, y, test_size=0.15, random_state=42)</code>, appliqué deux fois.</li></ol>`,
      pitfall: `<p>Regarder le score de test, ajuster le modèle, regarder à nouveau, ajuster encore… Chaque coup d'œil transforme le test en validation : le score final devient trop optimiste.</p>`
    },
    "La fuite de données": {
      plain: `<p>Une fuite, c'est quand le modèle triche sans le vouloir : il reçoit pendant l'entraînement une information qu'il n'aura pas dans la vraie vie. Comme un élève qui aurait aperçu le corrigé : excellent en classe, perdu le jour de l'examen.</p>`,
      stepsTitle: "Pas à pas : repérer une fuite",
      steps: `<ol>
<li>Pour chaque feature, pose la question : « au moment où je dois faire la prédiction, est-ce que je connais déjà cette valeur ? »</li>
<li>Exemple : prédire si un patient va être hospitalisé, avec la feature « nombre de jours d'hospitalisation ». Cette valeur n'existe qu'après l'hospitalisation : <strong>fuite</strong>.</li>
<li>Autre cas : calculer la moyenne et l'écart-type pour la standardisation sur <em>toutes</em> les données, test compris. Le train « connaît » un peu le test : fuite plus discrète.</li>
<li>Signal d'alarme : un score presque parfait (99 %) sur un problème réputé difficile. Méfie-toi toujours d'un résultat trop beau.</li></ol>`,
      pitfall: `<p>Croire qu'une fuite se verra toute seule. Au contraire : elle améliore les scores, donc elle fait plaisir. On ne la découvre souvent qu'en production, quand le modèle s'effondre.</p>`
    },
    "Nettoyer : garbage in, garbage out": {
      plain: `<p>« Garbage in, garbage out » : déchets en entrée, déchets en sortie. Un modèle entraîné sur des données pleines d'erreurs apprendra ces erreurs. Nettoyer, c'est faire le ménage avant de cuisiner : trier ce qui manque, ce qui est en double et ce qui est absurde.</p>`,
      stepsTitle: "Pas à pas : nettoyer une colonne « âge »",
      steps: `<ol>
<li>Valeurs : 25, 31, (vide), 28, 230, 31, 27.</li>
<li><strong>Aberrante</strong> : 230 ans est impossible, sûrement une faute de frappe (23 ?). Si on ne peut pas vérifier, on la traite comme manquante.</li>
<li><strong>Manquantes</strong> : 2 valeurs (le vide et le 230). On les remplace par la médiane des autres : 25, 27, 28, 31, 31 → médiane = 28.</li>
<li>Pourquoi la médiane plutôt que la moyenne ? Parce que la moyenne serait tirée vers le haut par une valeur aberrante, pas la médiane.</li>
<li>Comme pour la standardisation : la médiane se calcule sur le <strong>train</strong> seulement.</li></ol>`,
      pitfall: `<p>Supprimer toutes les lignes incomplètes sans réfléchir. Si les valeurs manquent toujours pour le même type de personnes (par exemple les plus âgés), on retire tout un groupe et le modèle devient biaisé.</p>`
    },
    "Mettre les features à la même échelle": {
      plain: `<p>Imagine comparer deux personnes avec (salaire en francs, nombre d'enfants) : (300 000, 2) et (310 000, 5). En distance, l'écart de 10 000 F écrase complètement l'écart de 3 enfants. Mettre à l'échelle, c'est convertir toutes les features dans une « unité commune » pour qu'elles comptent de façon comparable.</p>`,
      stepsTitle: "Pas à pas : standardiser les âges 20, 30, 40",
      steps: `<ol>
<li>Moyenne : μ = (20 + 30 + 40) / 3 = 30.</li>
<li>Écart-type : écarts −10, 0, 10 → carrés 100, 0, 100 → variance 200/3 ≈ 66,7 → σ ≈ 8,16.</li>
<li>z = (x − μ) / σ : 20 → (20 − 30) / 8,16 ≈ <strong>−1,22</strong> ; 30 → <strong>0</strong> ; 40 → <strong>+1,22</strong>.</li>
<li>Lecture : z = −1,22 veut dire « 1,22 écart-type en dessous de la moyenne ». Peu importe l'unité d'origine.</li>
<li>Un nouvel exemple de 35 ans, en test, se transforme avec les <strong>mêmes</strong> μ = 30 et σ = 8,16 : z ≈ 0,61.</li></ol>`,
      pitfall: `<p>Recalculer μ et σ sur le jeu de test. Le test doit être transformé avec les paramètres appris sur le train, sinon les deux jeux ne sont plus dans la même « unité ».</p>`
    }
  }
}
});
