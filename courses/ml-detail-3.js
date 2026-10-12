/* Approfondissement pour débutants — Module 4, Maths 6, Module 5, Module 6 */
window.ML_DETAIL = window.ML_DETAIL || {};
Object.assign(window.ML_DETAIL, {

/* ================================================================ */
m4: {
  intro: `<p>Classer, c'est ranger chaque exemple dans une boîte : spam ou normal, attaque ou trafic légitime, chat ou chien. Ce module présente trois façons très différentes de le faire : un calcul de score transformé en probabilité (régression logistique), un vote des voisins (k-NN) et une suite de questions oui / non (arbres et forêts).</p>`,
  prereq: `<p>La sigmoïde (Maths 5), la distance entre deux points (Maths 2), le modèle linéaire (module 3).</p>`,
  blocks: {
    "Du score à la probabilité : la sigmoïde": {
      plain: `<p>La régression logistique fait deux étapes. D'abord, comme en régression linéaire, elle calcule un <strong>score</strong> : une somme pondérée des features, qui peut valoir −12 ou +47. Ensuite, la sigmoïde écrase ce score entre 0 et 1 pour en faire une probabilité. Score très positif → « presque sûrement de la classe 1 ».</p>`,
      stepsTitle: "Pas à pas : probabilité qu'un email soit un spam",
      steps: `<ol>
<li>Features : nombre de liens x₁ = 4, mot « gratuit » présent x₂ = 1.</li>
<li>Poids appris : w₁ = 0,8, w₂ = 1,5, biais b = −3.</li>
<li>Score : z = 0,8 × 4 + 1,5 × 1 − 3 = 3,2 + 1,5 − 3 = 1,7.</li>
<li>Sigmoïde : σ(1,7) = 1 / (1 + e^(−1,7)) ≈ 1 / (1 + 0,18) ≈ <strong>0,85</strong>.</li>
<li>Lecture : le modèle estime à 85 % la probabilité que ce soit un spam.</li></ol>`,
      pitfall: `<p>Se laisser tromper par le nom : malgré le mot « régression », la régression logistique est un algorithme de <strong>classification</strong>.</p>`
    },
    "Le seuil de décision": {
      plain: `<p>Une probabilité ne suffit pas : à un moment, il faut décider « alerte » ou « pas d'alerte ». Le seuil est la barre à partir de laquelle on dit oui. Le placer, c'est un choix <strong>métier</strong>, pas mathématique : qu'est-ce qui coûte le plus cher, une fausse alerte ou un cas raté ?</p>`,
      stepsTitle: "Pas à pas : le même modèle, trois seuils",
      steps: `<ol>
<li>Cinq connexions ont des probabilités d'attaque : 0,95 ; 0,70 ; 0,45 ; 0,20 ; 0,05.</li>
<li>Seuil 0,5 : alertes sur 0,95 et 0,70 → 2 alertes.</li>
<li>Seuil 0,3 : alertes sur 0,95, 0,70 et 0,45 → 3 alertes. On rate moins d'attaques, mais plus de fausses alertes possibles.</li>
<li>Seuil 0,9 : une seule alerte (0,95). Très peu de fausses alertes, mais on risque de rater des attaques.</li>
<li>Dans un SOC, rater une intrusion coûte souvent plus cher qu'une fausse alerte : on baisse le seuil… sans noyer les analystes.</li></ol>`,
      pitfall: `<p>Garder 0,5 par défaut sans réfléchir. 0,5 n'a rien de spécial ; le bon seuil dépend du coût de chaque type d'erreur (tu le verras en détail au module 5).</p>`
    },
    "La frontière de décision": {
      plain: `<p>Imagine les exemples comme des points sur une carte (une feature en horizontal, une autre en vertical). La frontière de décision est la ligne qui sépare le territoire « classe 0 » du territoire « classe 1 ». La régression logistique ne sait tracer que des lignes droites : si les classes sont séparées par une courbe, elle aura du mal.</p>`,
      stepsTitle: "Pas à pas : trouver la frontière de z = 2x₁ + x₂ − 4",
      steps: `<ol>
<li>La frontière, c'est là où la probabilité vaut 0,5, donc où z = 0.</li>
<li>2x₁ + x₂ − 4 = 0, soit x₂ = 4 − 2x₁ : une droite.</li>
<li>Point (3 ; 1) : z = 6 + 1 − 4 = 3 &gt; 0 → côté classe 1.</li>
<li>Point (0 ; 1) : z = 0 + 1 − 4 = −3 &lt; 0 → côté classe 0.</li></ol>`,
      pitfall: `<p>Penser qu'un modèle linéaire ne peut jamais séparer des données en cercle. On peut ajouter des features calculées (comme x₁² + x₂²) : la frontière reste « droite » dans ce nouvel espace, mais devient un cercle sur la carte d'origine.</p>`
    },
    "k plus proches voisins (k-NN)": {
      plain: `<p>« Dis-moi qui sont tes voisins, je te dirai qui tu es. » Pour classer un nouveau point, k-NN regarde les k exemples connus les plus proches et fait voter leurs étiquettes. Il n'y a rien à apprendre à l'avance : tout se passe au moment de la prédiction, en mesurant des distances.</p>`,
      stepsTitle: "Pas à pas : classer le point P = (2 ; 2) avec k = 3",
      steps: `<ol>
<li>Exemples connus : A (1 ; 1) rouge, B (2 ; 3) rouge, C (4 ; 4) bleu, D (3 ; 2) bleu, E (6 ; 5) bleu.</li>
<li>Distances à P : A = √(1 + 1) ≈ 1,41 ; B = √(0 + 1) = 1 ; C = √(4 + 4) ≈ 2,83 ; D = √(1 + 0) = 1 ; E = √(16 + 9) = 5.</li>
<li>Les 3 plus proches : B (1), D (1), A (1,41).</li>
<li>Vote : B rouge, D bleu, A rouge → 2 rouges contre 1 bleu.</li>
<li>P est classé <strong>rouge</strong>. Avec k = 5, on aurait 2 rouges contre 3 bleus : le résultat change avec k.</li></ol>`,
      pitfall: `<p>Utiliser k-NN sans mettre les features à la même échelle : la distance est alors dominée par la feature aux plus grands nombres. Et choisir k pair pour deux classes risque des égalités.</p>`
    },
    "Arbres de décision et forêts": {
      plain: `<p>Un arbre de décision, c'est le jeu « Qui est-ce ? » : on pose des questions oui / non jusqu'à deviner. « Le lien est-il raccourci ? Oui. L'expéditeur est-il inconnu ? Oui. → phishing. » Une forêt aléatoire, c'est demander l'avis à cent personnes qui ont joué chacune avec des indices un peu différents, puis faire voter : l'avis collectif est plus fiable que celui d'un seul.</p>`,
      stepsTitle: "Pas à pas : un petit arbre pour un email",
      steps: `<ol>
<li>Question 1 : contient-il un lien raccourci (bit.ly…) ? <strong>Oui</strong> → question 2.</li>
<li>Question 2 : l'expéditeur est-il dans les contacts ? <strong>Non</strong> → question 3.</li>
<li>Question 3 : y a-t-il un mot d'urgence (« immédiatement », « suspendu ») ? <strong>Oui</strong>.</li>
<li>Feuille atteinte : <strong>phishing</strong>.</li>
<li>L'algorithme choisit lui-même les questions et leur ordre : à chaque nœud, celle qui sépare le mieux les classes dans les données d'entraînement.</li></ol>`,
      pitfall: `<p>Laisser un arbre grandir sans limite : il finit par poser des questions ultra-précises qui ne concernent qu'un seul exemple, et apprend le bruit par cœur. On limite sa profondeur, ou on passe à une forêt.</p>`
    }
  }
},

/* ================================================================ */
a6: {
  intro: `<p>Les modèles ne disent presque jamais « oui » ou « non » : ils disent « probablement oui, à 80 % ». Pour lire correctement ces résultats, et pour comprendre pourquoi un détecteur d'attaques peut produire beaucoup de fausses alertes, il faut quelques bases de probabilités. Ici, tout se fait en <strong>comptant</strong> dans des tableaux.</p>`,
  blocks: {
    "Une probabilité, c'est une proportion": {
      plain: `<p>Une probabilité, c'est la réponse à « sur 100 fois, combien de fois ? ». P = 0,3 veut dire « 30 fois sur 100 ». On peut toujours la voir comme une fraction : le nombre de cas qui nous intéressent, divisé par le nombre total de cas.</p>`,
      stepsTitle: "Pas à pas : tirer une carte au hasard dans un jeu de 52",
      steps: `<ol>
<li>Cas possibles : 52 cartes.</li>
<li>P(as) : il y a 4 as → 4 / 52 ≈ 0,077 (environ 8 %).</li>
<li>P(cœur) : 13 cœurs → 13 / 52 = 0,25.</li>
<li>P(pas un cœur) = 1 − 0,25 = 0,75.</li></ol>`,
      pitfall: `<p>Obtenir une probabilité supérieure à 1 ou négative : c'est forcément une erreur de calcul. Une probabilité est toujours entre 0 et 1 (entre 0 % et 100 %).</p>`
    },
    "ET, OU : combiner des événements": {
      plain: `<p>« ET » rend les choses plus rares : il faut que deux conditions soient vraies en même temps, donc on multiplie (et le résultat diminue). « OU » rend les choses plus fréquentes : une seule condition suffit, donc on additionne… en faisant attention à ne pas compter deux fois les cas où les deux arrivent.</p>`,
      stepsTitle: "Pas à pas : un dé, A = « pair », B = « plus grand que 3 »",
      steps: `<ol>
<li>A = {2, 4, 6} → P(A) = 3/6. B = {4, 5, 6} → P(B) = 3/6.</li>
<li>A et B = {4, 6} → P(A et B) = 2/6.</li>
<li>A ou B = {2, 4, 5, 6} → 4/6 en comptant directement.</li>
<li>Avec la formule : 3/6 + 3/6 − 2/6 = 4/6. ✓ Sans retirer 2/6, on aurait compté 4 et 6 deux fois.</li></ol>`,
      pitfall: `<p>Multiplier P(A) × P(B) pour « A et B » quand A et B ne sont pas indépendants. Ici, 3/6 × 3/6 = 0,25, alors que la vraie valeur est 2/6 ≈ 0,33 : être pair et être grand sont liés sur un dé.</p>`
    },
    "La probabilité conditionnelle": {
      plain: `<p>« Sachant que » veut dire : on ne regarde plus tout le monde, seulement un sous-groupe. P(pluie | nuages) : parmi les jours nuageux, quelle part a eu de la pluie ? On change de dénominateur : on divise par la taille du sous-groupe, pas par le total.</p>`,
      stepsTitle: "Pas à pas : lire le tableau des 1 000 connexions",
      steps: `<ol>
<li>Pour P(alerte | attaque), on se place dans la <strong>ligne</strong> « attaque » : 20 connexions.</li>
<li>Parmi elles, 18 ont déclenché une alerte → 18 / 20 = 0,90.</li>
<li>Pour P(attaque | alerte), on se place dans la <strong>colonne</strong> « alerte » : 67 connexions.</li>
<li>Parmi elles, 18 sont de vraies attaques → 18 / 67 ≈ 0,27.</li>
<li>Même nombre 18 au numérateur, mais deux groupes de référence différents : deux réponses très différentes.</li></ol>`,
      pitfall: `<p>Confondre P(A | B) et P(B | A). « 90 % des attaques déclenchent une alerte » ne veut pas dire « 90 % des alertes sont des attaques ». Ici, seulement 27 % le sont.</p>`
    },
    "La formule de Bayes": {
      plain: `<p>Bayes sert à <strong>retourner</strong> une probabilité. On connaît souvent la qualité d'un test (« il détecte 90 % des attaques »), mais on veut savoir autre chose : « mon outil a sonné, quelle est la probabilité que ce soit une vraie attaque ? ». Bayes fait le pont, en tenant compte de la rareté des attaques.</p>`,
      stepsTitle: "Pas à pas : un détecteur sur 10 000 connexions",
      steps: `<ol>
<li>1 % sont des attaques : 100 attaques et 9 900 connexions normales.</li>
<li>Le détecteur repère 95 % des attaques : 95 alertes justes.</li>
<li>Il se trompe sur 5 % du trafic normal : 0,05 × 9 900 = 495 fausses alertes.</li>
<li>Alertes au total : 95 + 495 = 590.</li>
<li>P(attaque | alerte) = 95 / 590 ≈ <strong>0,16</strong>. Seulement 16 % des alertes sont de vraies attaques, alors que le détecteur paraît excellent !</li></ol>`,
      pitfall: `<p>Oublier la fréquence de départ (la probabilité « a priori »). Quand l'événement est rare, même un très bon détecteur produit beaucoup plus de fausses alertes que de vraies. C'est le quotidien des SOC.</p>`
    },
    "Espérance et loi normale": {
      plain: `<p>L'espérance, c'est « ce qu'on obtient en moyenne si on répète l'expérience un très grand nombre de fois ». La loi normale, c'est la forme en cloche qu'on retrouve partout (tailles, erreurs de mesure, notes) : la plupart des valeurs sont près de la moyenne, et plus on s'en éloigne, plus elles sont rares.</p>`,
      stepsTitle: "Pas à pas : espérance d'un jeu à 100 F",
      steps: `<ol>
<li>Tu paies 100 F pour lancer un dé. Si tu fais 6, tu gagnes 500 F ; sinon, rien.</li>
<li>Gain net si 6 : 500 − 100 = +400, avec probabilité 1/6.</li>
<li>Gain net sinon : −100, avec probabilité 5/6.</li>
<li>Espérance : 400 × 1/6 + (−100) × 5/6 = 66,7 − 83,3 ≈ <strong>−16,7 F</strong> par partie.</li>
<li>Lecture : en jouant longtemps, tu perds en moyenne environ 17 F par partie.</li></ol>`,
      pitfall: `<p>Croire que l'espérance est la valeur la plus probable. Pour un dé, l'espérance est 3,5, une valeur qu'on n'obtient jamais.</p>`
    }
  }
},

/* ================================================================ */
m5: {
  intro: `<p>Un modèle qui annonce « 99 % de réussite » peut être totalement inutile. Ce module t'apprend à <strong>évaluer honnêtement</strong> un modèle de classification, avec les mêmes outils que les équipes de cybersécurité utilisent pour juger un détecteur d'intrusion. Tout repose sur un tableau de quatre cases.</p>`,
  prereq: `<p>La probabilité conditionnelle (Maths 6), le seuil de décision (module 4).</p>`,
  blocks: {
    "La matrice de confusion": {
      plain: `<p>La matrice de confusion, c'est le bilan des erreurs, rangé dans quatre cases. Pour chaque exemple, on se pose deux questions : qu'est-ce que c'était vraiment ? qu'est-ce que le modèle a dit ? Deux réponses possibles chacune, donc quatre combinaisons : deux bonnes réponses (VP, VN) et deux sortes d'erreurs (FP, FN).</p>`,
      stepsTitle: "Pas à pas : remplir la matrice avec 10 connexions",
      steps: `<ol>
<li>Réalité : 3 attaques, 7 normales. Le modèle déclenche 4 alertes, dont 2 sur de vraies attaques.</li>
<li><strong>VP</strong> (attaque, alerte) = 2.</li>
<li><strong>FN</strong> (attaque, pas d'alerte) = 3 − 2 = 1 : une attaque ratée.</li>
<li><strong>FP</strong> (normal, alerte) = 4 − 2 = 2 : deux fausses alertes.</li>
<li><strong>VN</strong> (normal, pas d'alerte) = 7 − 2 = 5.</li>
<li>Vérification : 2 + 1 + 2 + 5 = 10. ✓</li></ol>`,
      pitfall: `<p>Se fier à l'exactitude (accuracy) seule. Avec 1 attaque pour 999 connexions normales, un modèle qui ne déclenche <em>jamais</em> d'alerte a 99,9 % d'exactitude… et ne sert à rien.</p>`
    },
    "Précision et rappel": {
      plain: `<p>Deux questions différentes. <strong>Précision</strong> : « quand mon modèle sonne, a-t-il raison ? » (la qualité de ses alertes). <strong>Rappel</strong> : « parmi toutes les attaques réelles, combien en a-t-il trouvées ? » (sa capacité à ne rien rater). Un chien de garde qui aboie à chaque passant a un bon rappel mais une mauvaise précision ; un chien qui n'aboie qu'une fois par an a l'inverse.</p>`,
      stepsTitle: "Pas à pas : avec VP = 2, FP = 2, FN = 1",
      steps: `<ol>
<li>Précision = VP / (VP + FP) = 2 / (2 + 2) = <strong>0,50</strong> : une alerte sur deux est fondée.</li>
<li>Rappel = VP / (VP + FN) = 2 / (2 + 1) ≈ <strong>0,67</strong> : deux attaques sur trois ont été détectées.</li>
<li>Ces deux chiffres racontent deux histoires différentes : il faut toujours regarder les deux.</li></ol>`,
      pitfall: `<p>Inverser les dénominateurs. Précision : on divise par tout ce que le modèle a <strong>prédit</strong> positif (VP + FP). Rappel : par tout ce qui était <strong>réellement</strong> positif (VP + FN).</p>`
    },
    "Le compromis, en direct": {
      plain: `<p>Précision et rappel tirent dans des sens opposés, et c'est le seuil qui fait pencher la balance. Baisser le seuil, c'est être plus méfiant : on attrape plus d'attaques (rappel ↑) mais on accuse aussi plus d'innocents (précision ↓). Monter le seuil fait l'inverse.</p>`,
      stepsTitle: "Pas à pas : ce que tu devrais observer en bougeant le seuil",
      steps: `<ol>
<li>Seuil tout à gauche : tout déclenche une alerte. Rappel = 1 (aucune attaque ratée), précision très basse.</li>
<li>Seuil tout à droite : presque rien ne déclenche. Précision souvent élevée, rappel très bas.</li>
<li>Entre les deux : tu cherches le point qui correspond au besoin (ne rien rater, ou ne pas noyer l'équipe).</li></ol>`,
      pitfall: `<p>Chercher un seuil qui donne précision = rappel = 1. Sauf problème très facile, ce seuil n'existe pas : il y a toujours un compromis à choisir.</p>`
    },
    "Le score F1": {
      plain: `<p>Le F1 est une « note globale » qui ne pardonne pas les points faibles. Une moyenne normale de 1,0 et 0,1 donne 0,55 : on croirait un modèle moyen. Le F1 donne 0,18 : il signale qu'un des deux est catastrophique. Pour avoir un bon F1, il faut que précision ET rappel soient bons.</p>`,
      stepsTitle: "Pas à pas : F1 avec précision 0,5 et rappel 0,67",
      steps: `<ol>
<li>Produit : 0,5 × 0,67 ≈ 0,335.</li>
<li>Somme : 0,5 + 0,67 = 1,17.</li>
<li>F1 = 2 × 0,335 / 1,17 ≈ <strong>0,57</strong>.</li>
<li>Remarque : 0,57 est plus proche de la plus petite des deux valeurs (0,5) que la moyenne simple (environ 0,58).</li></ol>`,
      pitfall: `<p>Utiliser le F1 quand les deux erreurs n'ont pas du tout le même coût. Dans ce cas, mieux vaut fixer un objectif (« rappel au moins 95 % ») et maximiser l'autre.</p>`
    },
    "Et pour une régression ?": {
      plain: `<p>Quand on prédit un nombre (un prix, une note), il n'y a pas de « bonne » ou « mauvaise » case : on mesure simplement de combien on se trompe en moyenne. La MAE se lit très facilement (« je me trompe de 2 points en moyenne »), la RMSE punit davantage les grosses erreurs.</p>`,
      stepsTitle: "Pas à pas : MAE et RMSE sur trois prédictions",
      steps: `<ol>
<li>Erreurs : +1, −2, +6.</li>
<li>MAE : valeurs absolues 1, 2, 6 → moyenne (1 + 2 + 6) / 3 = <strong>3</strong>.</li>
<li>RMSE : carrés 1, 4, 36 → moyenne 41 / 3 ≈ 13,67 → racine ≈ <strong>3,70</strong>.</li>
<li>La RMSE est plus grande que la MAE à cause de la grosse erreur de 6 : elle « remarque » davantage les gros ratés.</li></ol>`,
      pitfall: `<p>Comparer la MSE d'un modèle avec la MAE d'un autre : ce ne sont pas les mêmes unités. Compare toujours avec la même métrique.</p>`
    }
  }
},

/* ================================================================ */
m6: {
  intro: `<p>Le vrai but du ML n'est pas d'être bon sur les exemples d'entraînement, mais sur des exemples <strong>nouveaux</strong>. Ce module explique les deux façons de rater ce but : être trop simple (on ne capte rien) ou trop compliqué (on apprend par cœur, bruit compris). C'est la notion la plus importante en pratique.</p>`,
  prereq: `<p>Les polynômes et leur degré (Maths 3), la séparation train / validation / test (module 2).</p>`,
  blocks: {
    "Trop simple, trop collé, juste bien": {
      plain: `<p>Trois élèves préparent un examen. Le premier ne retient qu'une règle vague : il rate les exercices de cours comme ceux de l'examen (<strong>sous-apprentissage</strong>). Le deuxième apprend par cœur les réponses des exercices du cours : parfait en classe, perdu dès que l'énoncé change (<strong>surapprentissage</strong>). Le troisième comprend la méthode : bon partout (<strong>bonne généralisation</strong>).</p>`,
      stepsTitle: "Pas à pas : diagnostiquer avec deux nombres",
      steps: `<ol>
<li>Modèle A : erreur train 25 %, erreur validation 27 %. Les deux sont élevées et proches → <strong>sous-apprentissage</strong>.</li>
<li>Modèle B : erreur train 1 %, erreur validation 22 %. Grand écart → <strong>surapprentissage</strong>.</li>
<li>Modèle C : erreur train 6 %, erreur validation 8 %. Les deux basses et proches → <strong>bonne généralisation</strong>.</li></ol>`,
      pitfall: `<p>Ne regarder que l'erreur d'entraînement. Elle baisse presque toujours quand le modèle devient plus complexe ; seule l'erreur de validation dit si c'est une vraie amélioration.</p>`
    },
    "Voir le phénomène": {
      plain: `<p>Dans la démo, augmenter le degré, c'est donner au modèle une courbe de plus en plus souple. Au début, il épouse mieux la tendance. Puis il se met à faire des contorsions pour passer par chaque point bleu, y compris par leur bruit : il devient très mauvais sur les carrés orange qu'il n'a pas vus.</p>`,
      stepsTitle: "Pas à pas : ce que tu devrais observer",
      steps: `<ol>
<li>Degré 1 : une droite, trop raide pour suivre la courbe. Les deux erreurs sont élevées.</li>
<li>Degré moyen : la courbe suit bien la tendance. L'erreur sur les nouvelles données est au plus bas.</li>
<li>Degré élevé : la courbe ondule entre les points. Erreur d'entraînement presque nulle, erreur sur les nouvelles données qui remonte.</li>
<li>Le bon degré est celui qui minimise l'erreur sur les données <strong>nouvelles</strong>, pas sur l'entraînement.</li></ol>`,
      pitfall: `<p>Choisir le degré qui passe par tous les points d'entraînement parce que « la courbe colle parfaitement ». C'est justement le signe du surapprentissage.</p>`
    },
    "Biais et variance": {
      plain: `<p>Pense à un tireur sur une cible. <strong>Biais</strong> élevé : tous ses tirs sont groupés, mais à côté du centre (son viseur est mal réglé : le modèle est trop simple, il se trompe toujours de la même façon). <strong>Variance</strong> élevée : ses tirs sont autour du centre, mais très dispersés (le modèle change beaucoup selon les exemples qu'on lui montre).</p>`,
      stepsTitle: "Pas à pas : reconnaître chaque cas",
      steps: `<ol>
<li>On entraîne le même type de modèle sur 5 échantillons différents des données.</li>
<li>Si les 5 modèles se ressemblent mais se trompent tous pareil → biais élevé (trop simple).</li>
<li>Si les 5 modèles sont très différents les uns des autres → variance élevée (trop sensible aux exemples, trop complexe).</li>
<li>Le bon modèle se trouve au compromis : assez souple pour capter la tendance, pas au point de suivre le bruit.</li></ol>`,
      pitfall: `<p>Confondre ce « biais » avec le biais b d'un modèle linéaire (module 3) ou avec un biais au sens éthique (discrimination). Même mot, trois notions différentes.</p>`
    },
    "Les remèdes": {
      plain: `<p>Contre le surapprentissage, on « bride » le modèle : on lui donne plus d'exemples variés, on le simplifie, ou on le pénalise quand ses poids deviennent trop grands (régularisation). Contre le sous-apprentissage, on fait l'inverse : on lui donne plus de liberté ou de meilleures informations.</p>`,
      stepsTitle: "Pas à pas : la régularisation L2 sur un exemple",
      steps: `<ol>
<li>Deux modèles ont la même MSE de 4. Modèle A : poids (1 ; 2). Modèle B : poids (10 ; −15).</li>
<li>Pénalité L2 = λ × (somme des poids au carré), avec λ = 0,1.</li>
<li>A : 0,1 × (1 + 4) = 0,5 → coût total 4,5.</li>
<li>B : 0,1 × (100 + 225) = 32,5 → coût total 36,5.</li>
<li>On préfère A : à erreur égale, des poids modérés donnent un modèle plus stable, moins sensible au bruit.</li></ol>`,
      pitfall: `<p>Appliquer un remède sans diagnostic. Ajouter de la régularisation à un modèle qui sous-apprend l'aggrave. Regarde d'abord les erreurs train et validation.</p>`
    },
    "La validation croisée": {
      plain: `<p>Avec peu de données, un seul découpage train / validation peut avoir de la chance (validation facile) ou de la malchance. La validation croisée fait <strong>tourner</strong> le rôle de validation : chaque morceau des données sert une fois d'examen blanc, puis on fait la moyenne. Le score obtenu est beaucoup plus fiable.</p>`,
      stepsTitle: "Pas à pas : 5 plis sur 100 exemples",
      steps: `<ol>
<li>On coupe les 100 exemples en 5 paquets de 20 : P1 à P5.</li>
<li>Tour 1 : entraînement sur P2 à P5 (80 exemples), validation sur P1 → score 0,81.</li>
<li>Tour 2 : validation sur P2, entraînement sur le reste → 0,78. Et ainsi de suite jusqu'au tour 5.</li>
<li>Scores obtenus : 0,81 ; 0,78 ; 0,84 ; 0,80 ; 0,77. Moyenne ≈ <strong>0,80</strong>.</li>
<li>L'écart entre les scores (de 0,77 à 0,84) indique aussi à quel point le résultat est stable.</li></ol>`,
      pitfall: `<p>Mettre le jeu de test dans la validation croisée. Le test reste à part, dans son coffre ; la validation croisée se fait uniquement sur les données d'entraînement.</p>`
    }
  }
}
});
