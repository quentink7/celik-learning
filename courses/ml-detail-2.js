/* Approfondissement pour débutants — Maths 3, Maths 4, Module 3, Maths 5 */
window.ML_DETAIL = window.ML_DETAIL || {};
Object.assign(window.ML_DETAIL, {

/* ================================================================ */
a3: {
  intro: `<p>Un modèle de ML est, au fond, une <strong>fonction</strong> : on lui donne des entrées, il renvoie une prédiction. Et « apprendre », c'est chercher le point le plus bas d'une autre fonction, l'erreur. Ce module te donne le vocabulaire des fonctions et des courbes pour comprendre ces deux idées.</p>`,
  blocks: {
    "Une fonction, c'est une machine": {
      plain: `<p>Pense à un distributeur de boissons : tu tapes un code (l'entrée), il te donne une boisson (la sortie). Le même code donne toujours la même boisson. Une fonction mathématique, c'est pareil : <code>f(x) = 2x + 1</code> est une machine qui prend un nombre, le double, ajoute 1. En Python, c'est exactement <code>def f(x): return 2 * x + 1</code>.</p>`,
      stepsTitle: "Pas à pas : tracer f(x) = 2x + 1",
      steps: `<ol>
<li>On choisit quelques entrées : x = 0, 1, 2, 3.</li>
<li>On calcule les sorties : f(0) = 1, f(1) = 3, f(2) = 5, f(3) = 7.</li>
<li>On place les points (0 ; 1), (1 ; 3), (2 ; 5), (3 ; 7) : x en horizontal, f(x) en vertical.</li>
<li>On les relie : on obtient une droite qui monte.</li></ol>`,
      pitfall: `<p>Lire f(x) comme « f multiplié par x ». Les parenthèses après le nom d'une fonction désignent son entrée : f(3) veut dire « ce que la machine f renvoie quand on lui donne 3 ».</p>`
    },
    "La droite y = ax + b": {
      plain: `<p>Pense à un taxi : 500 F de prise en charge, puis 200 F par kilomètre. Prix = 200 × km + 500. La <strong>pente</strong> a = 200 dit « combien ça augmente à chaque kilomètre », l'<strong>ordonnée à l'origine</strong> b = 500 dit « combien ça coûte avant même de rouler ». Une régression linéaire cherche exactement ces deux nombres à partir d'exemples.</p>`,
      stepsTitle: "Pas à pas : retrouver la droite qui passe par (1 ; 3) et (4 ; 9)",
      steps: `<ol>
<li>Pente : a = Δy / Δx = (9 − 3) / (4 − 1) = 6 / 3 = 2.</li>
<li>On sait donc que y = 2x + b. On utilise un point pour trouver b : avec (1 ; 3), 3 = 2 × 1 + b, donc b = 1.</li>
<li>Droite : y = 2x + 1.</li>
<li>Vérification avec l'autre point : 2 × 4 + 1 = 9. ✓</li></ol>`,
      pitfall: `<p>Inverser Δy et Δx. La pente, c'est « combien je monte » divisé par « combien j'avance » : le vertical au-dessus, l'horizontal en dessous.</p>`
    },
    "La courbe en U et son minimum": {
      plain: `<p>La courbe en U, c'est une vallée. Le minimum est le fond de la vallée. En ML, l'erreur d'un modèle en fonction de ses réglages a souvent cette forme : trop petit, l'erreur est grande ; trop grand aussi ; quelque part au milieu, elle est minimale. Apprendre, c'est trouver le fond de la vallée.</p>`,
      stepsTitle: "Pas à pas : trouver le minimum de f(x) = (x − 3)² + 1",
      steps: `<ol>
<li>Calculons quelques valeurs : f(1) = 4 + 1 = 5 ; f(2) = 1 + 1 = 2 ; f(3) = 0 + 1 = 1 ; f(4) = 2 ; f(5) = 5.</li>
<li>Les valeurs descendent jusqu'à x = 3, puis remontent : c'est le fond.</li>
<li>Raisonnement sans calcul : un carré n'est jamais négatif, donc (x − 3)² ≥ 0. Il vaut 0 seulement si x = 3.</li>
<li>Minimum : en x = 3, et la plus petite valeur est 0 + 1 = 1.</li></ol>`,
      pitfall: `<p>Confondre « où est le minimum » (x = 3) et « combien vaut le minimum » (f = 1). En ML, ce qui nous intéresse surtout, c'est le « où » : les réglages qui donnent la plus petite erreur.</p>`
    },
    "Les polynômes et leur degré": {
      plain: `<p>Le degré, c'est la « souplesse » de la courbe. Degré 1 : une règle rigide, toute droite. Degré 2 : une règle qu'on peut courber une fois. Degré 10 : un fil de fer qu'on peut tordre dans tous les sens. Plus c'est souple, plus on peut passer par tous les points… et plus on risque de suivre du bruit au lieu de la tendance (module 6).</p>`,
      stepsTitle: "Pas à pas : lire 3x² − x + 2",
      steps: `<ol>
<li>Les morceaux (termes) : 3x², −x et 2.</li>
<li>Les puissances de x : 2 (dans 3x²), 1 (dans −x, car x = x¹), 0 (dans 2, car 2 = 2 × x⁰).</li>
<li>La plus grande est 2 : c'est un polynôme de <strong>degré 2</strong>, une parabole.</li>
<li>Valeur en x = 2 : 3 × 4 − 2 + 2 = 12.</li></ol>`,
      pitfall: `<p>Croire que plus de degré veut dire meilleur modèle. Un degré trop élevé colle aux exemples d'entraînement mais prédit mal les nouveaux : c'est le surapprentissage.</p>`
    },
    "Une fonction de plusieurs variables": {
      plain: `<p>Le prix d'un repas dépend du plat <em>et</em> de la boisson <em>et</em> du dessert : une fonction de plusieurs variables. En ML, une prédiction dépend de toutes les features, et l'erreur dépend de tous les poids du modèle. On ne peut plus dessiner une courbe : c'est un paysage avec des collines et des vallées, qu'on explore avec le gradient (Maths 4).</p>`,
      stepsTitle: "Pas à pas : évaluer f(x₁, x₂) = 3x₁ − 2x₂ + 5",
      steps: `<ol>
<li>Avec x₁ = 2 et x₂ = 4 : 3 × 2 − 2 × 4 + 5 = 6 − 8 + 5 = 3.</li>
<li>Si x₁ augmente de 1 (x₁ = 3), f augmente de 3 : f = 6. Le « 3 » devant x₁ est l'effet de x₁.</li>
<li>Si x₂ augmente de 1 (x₂ = 5), f baisse de 2. Le « −2 » est l'effet de x₂.</li>
<li>C'est exactement ainsi qu'on lit les poids d'un modèle linéaire.</li></ol>`,
      pitfall: `<p>Changer deux variables à la fois et attribuer tout l'effet à une seule. Pour mesurer l'effet d'une variable, on fixe les autres.</p>`
    }
  }
},

/* ================================================================ */
a4: {
  intro: `<p>C'est le module de maths le plus important du parcours. La <strong>dérivée</strong> répond à une seule question : « si je bouge un peu ce réglage, est-ce que l'erreur monte ou descend, et à quelle vitesse ? ». Toute la façon dont un modèle apprend repose sur cette question. Pas besoin d'être fort en maths : il faut surtout comprendre l'idée de <em>pente</em>.</p>`,
  prereq: `<p>La droite et sa pente, la courbe en U (Maths 3).</p>`,
  blocks: {
    "La dérivée, c'est la pente en un point": {
      plain: `<p>Tu marches sur une route de montagne. À chaque endroit, tu sens si ça monte fort, un peu, si c'est plat ou si ça descend. La dérivée, c'est ce « ressenti de pente » à un endroit précis. Positive : ça monte. Négative : ça descend. Zéro : c'est plat, et c'est souvent qu'on est au sommet ou au fond d'une vallée.</p>`,
      stepsTitle: "Pas à pas : estimer la pente de f(x) = x² en x = 3, sans formule",
      steps: `<ol>
<li>On fait un tout petit pas : de x = 3 à x = 3,01.</li>
<li>f(3) = 9 et f(3,01) = 9,0601. La sortie a bougé de 0,0601.</li>
<li>Pente ≈ changement de sortie / changement d'entrée = 0,0601 / 0,01 ≈ 6,01.</li>
<li>Plus le pas est petit, plus on se rapproche de <strong>6</strong>. C'est la dérivée en x = 3. (La règle « x² se dérive en 2x » donne bien 2 × 3 = 6.)</li></ol>`,
      pitfall: `<p>Confondre la valeur de la fonction et sa pente. En x = 3, f vaut 9 (la hauteur) et f′ vaut 6 (l'inclinaison). On peut être très haut sur un plateau plat (grande valeur, pente nulle).</p>`
    },
    "Les règles de base": {
      plain: `<p>Ces règles sont des raccourcis : au lieu de faire le calcul avec un tout petit pas à chaque fois, on applique une recette. Il y en a peu, et tu les utiliseras toujours dans les mêmes situations. Le plus utile : « on dérive morceau par morceau, et on peut sortir les nombres qui multiplient ».</p>`,
      stepsTitle: "Pas à pas : dériver f(x) = 4x³ − 2x² + 7x − 9",
      steps: `<ol>
<li>4x³ : la règle xⁿ → n·xⁿ⁻¹ donne 3x², fois 4 → <strong>12x²</strong>.</li>
<li>−2x² : x² → 2x, fois −2 → <strong>−4x</strong>.</li>
<li>7x : ax → a → <strong>7</strong>.</li>
<li>−9 : une constante → <strong>0</strong>.</li>
<li>Total : f′(x) = 12x² − 4x + 7. En x = 1 : 12 − 4 + 7 = 15.</li></ol>`,
      pitfall: `<p>Oublier de baisser la puissance. La dérivée de x³ est 3x² (pas 3x³) : le 3 descend devant, et la puissance diminue de 1.</p>`
    },
    "Dériver un carré : la règle de la chaîne": {
      plain: `<p>Une fonction « emboîtée », c'est comme des poupées russes : il y a une fonction à l'intérieur d'une autre. Dans (2x + 1)², l'intérieur est « 2x + 1 », l'extérieur est « mettre au carré ». La règle : on dérive l'extérieur comme si l'intérieur était une simple lettre, puis on multiplie par la dérivée de l'intérieur.</p>`,
      stepsTitle: "Pas à pas : dériver (3 − 2x)²",
      steps: `<ol>
<li>Intérieur : u = 3 − 2x. Sa dérivée : u′ = −2.</li>
<li>Extérieur : u². Sa dérivée par rapport à u : 2u.</li>
<li>On multiplie : 2u × u′ = 2(3 − 2x) × (−2) = <strong>−4(3 − 2x)</strong>.</li>
<li>Pourquoi c'est important : l'erreur d'un modèle s'écrit (y − ŷ)², avec ŷ qui dépend des poids. On dérive exactement comme ça.</li></ol>`,
      pitfall: `<p>Oublier de multiplier par la dérivée de l'intérieur. (2x + 1)² ne se dérive pas en 2(2x + 1) mais en 2(2x + 1) × 2.</p>`
    },
    "Descendre vers le minimum": {
      plain: `<p>Tu es dans le brouillard sur une colline et tu veux atteindre la vallée. Tu ne vois rien, mais tu sens la pente sous tes pieds. Règle simple : fais un pas dans le sens où ça descend. Si la pente est positive (ça monte vers la droite), va à gauche ; si elle est négative, va à droite. Répète. C'est la <strong>descente de gradient</strong>.</p>`,
      stepsTitle: "Pas à pas : 3 étapes sur f(w) = (w − 3)² + 1, départ w = −1, α = 0,1",
      steps: `<ol>
<li>Dérivée : f′(w) = 2(w − 3).</li>
<li>Étape 1 : f′(−1) = 2 × (−4) = −8. Nouveau w = −1 − 0,1 × (−8) = −1 + 0,8 = <strong>−0,2</strong>.</li>
<li>Étape 2 : f′(−0,2) = 2 × (−3,2) = −6,4. w = −0,2 + 0,64 = <strong>0,44</strong>.</li>
<li>Étape 3 : f′(0,44) = 2 × (−2,56) = −5,12. w = 0,44 + 0,512 = <strong>0,952</strong>.</li>
<li>w se rapproche de 3 (le minimum), avec des pas de plus en plus petits car la pente diminue près du fond.</li></ol>`,
      pitfall: `<p>Oublier le signe moins dans « w − α · f′(w) ». Avec un plus, on monterait la colline au lieu de la descendre.</p>`
    },
    "Plusieurs variables : le gradient": {
      plain: `<p>Sur une vraie montagne, tu peux aller dans plusieurs directions : nord-sud et est-ouest. Le gradient, c'est la liste des pentes dans chaque direction. Pour descendre, tu fais un petit pas dans chaque direction, en sens inverse de sa pente. Un modèle avec 1 000 poids, c'est une montagne à 1 000 directions : même principe.</p>`,
      stepsTitle: "Pas à pas : gradient de f(w, b) = w² + 2wb + 3b² en (1 ; 2)",
      steps: `<ol>
<li>∂f/∂w : on traite b comme un nombre fixe. w² → 2w ; 2wb → 2b ; 3b² → 0. Donc ∂f/∂w = 2w + 2b.</li>
<li>∂f/∂b : on traite w comme fixe. w² → 0 ; 2wb → 2w ; 3b² → 6b. Donc ∂f/∂b = 2w + 6b.</li>
<li>En (1 ; 2) : ∂f/∂w = 2 + 4 = 6 ; ∂f/∂b = 2 + 12 = 14.</li>
<li>Gradient : ∇f = (6 ; 14). Pour descendre : w ← w − α × 6 et b ← b − α × 14.</li></ol>`,
      pitfall: `<p>Dériver par rapport à w en oubliant que b est une constante : le terme 3b² disparaît (sa dérivée par rapport à w vaut 0), mais 2wb devient 2b, pas 0.</p>`
    }
  }
},

/* ================================================================ */
m3: {
  intro: `<p>C'est ici que tout se met en place : tu vas voir comment un modèle <strong>apprend vraiment</strong>, étape par étape. Trois idées seulement : 1) le modèle fait une prédiction avec ses réglages actuels ; 2) on mesure à quel point il se trompe ; 3) on ajuste ses réglages pour qu'il se trompe un peu moins, et on recommence. Tout le deep learning moderne repose sur ce même cycle.</p>`,
  prereq: `<p>La droite y = ax + b (Maths 3), la dérivée et la descente vers le minimum (Maths 4), le produit scalaire (Maths 2).</p>`,
  blocks: {
    "Le modèle : une droite": {
      plain: `<p>Un modèle linéaire, c'est la droite du taxi (Maths 3) avec d'autres noms : la pente s'appelle <strong>w</strong> (weight, poids) et l'ordonnée à l'origine <strong>b</strong> (bias, biais). Au début, w et b sont choisis au hasard : le modèle prédit n'importe quoi. L'entraînement va les ajuster.</p>`,
      stepsTitle: "Pas à pas : prédire avec w = 1,5 et b = 6",
      steps: `<ol>
<li>Un étudiant a révisé x = 0 heure : ŷ = 1,5 × 0 + 6 = 6.</li>
<li>x = 4 heures : ŷ = 1,5 × 4 + 6 = 12.</li>
<li>x = 8 heures : ŷ = 1,5 × 8 + 6 = 18.</li>
<li>Lecture : chaque heure de révision rapporte 1,5 point (c'est w), et sans réviser on aurait 6 (c'est b).</li></ol>`,
      pitfall: `<p>Confondre y et ŷ. y est la vraie note (connue pour les exemples d'entraînement), ŷ est ce que le modèle devine. Tout l'apprentissage consiste à rapprocher ŷ de y.</p>`
    },
    "Mesurer l'erreur : la fonction de coût": {
      plain: `<p>Pour s'améliorer, il faut d'abord un score. La fonction de coût, c'est la « note de défaillance » du modèle : un seul nombre qui résume ses erreurs sur tous les exemples. 0 = parfait. Plus c'est grand, pire c'est. Le but de l'entraînement est de faire baisser ce nombre.</p>`,
      stepsTitle: "Pas à pas : calculer la MSE avec w = 1,5 et b = 6",
      steps: `<ol>
<li>Trois étudiants : (2 h, note 10), (4 h, note 13), (6 h, note 14).</li>
<li>Prédictions : 1,5 × 2 + 6 = 9 ; 1,5 × 4 + 6 = 12 ; 1,5 × 6 + 6 = 15.</li>
<li>Erreurs y − ŷ : 10 − 9 = 1 ; 13 − 12 = 1 ; 14 − 15 = −1.</li>
<li>Au carré : 1, 1, 1.</li>
<li>Moyenne : MSE = (1 + 1 + 1) / 3 = <strong>1</strong>. Avec d'autres valeurs de w et b, on obtiendrait une autre MSE : on cherche celles qui la rendent la plus petite.</li></ol>`,
      pitfall: `<p>Faire la moyenne des erreurs sans les mettre au carré : +1, +1 et −1 donneraient 0,33, et des erreurs de +5 et −5 donneraient 0, comme un modèle parfait. Le carré empêche ces compensations.</p>`
    },
    "La descente de gradient": {
      plain: `<p>On ne trouve pas les bons w et b d'un coup. On part de valeurs au hasard, puis on les corrige petit à petit : à chaque étape, on calcule dans quel sens bouger w (et b) pour faire baisser l'erreur, et on fait un petit pas dans ce sens. Le <strong>taux d'apprentissage</strong> α règle la taille du pas.</p>`,
      stepsTitle: "Pas à pas : une mise à jour de w",
      steps: `<ol>
<li>Situation : w = 1, la pente de l'erreur par rapport à w vaut ∂L/∂w = −4, et α = 0,1.</li>
<li>Pente négative : quand w augmente, l'erreur baisse. Il faut donc <strong>augmenter</strong> w.</li>
<li>Formule : w ← w − α × ∂L/∂w = 1 − 0,1 × (−4) = 1 + 0,4 = <strong>1,4</strong>.</li>
<li>La formule fait automatiquement le bon choix : le « moins » inverse le signe de la pente.</li>
<li>On recalcule les prédictions, l'erreur, la pente, et on recommence, des centaines ou des milliers de fois.</li></ol>`,
      pitfall: `<p>Penser que la descente de gradient trouve la réponse en une étape. C'est un processus itératif : chaque pas améliore un peu, et on s'arrête quand l'erreur ne baisse presque plus.</p>`
    },
    "La taille du pas, en direct": {
      plain: `<p>Le taux d'apprentissage α, c'est la longueur de tes enjambées dans la vallée. Petits pas : tu avances sûrement mais lentement. Grands pas : tu vas vite, mais tu risques de sauter par-dessus le fond et d'atterrir sur l'autre versant, voire plus haut qu'au départ.</p>`,
      stepsTitle: "Pas à pas : ce que tu devrais observer dans la démo",
      steps: `<ol>
<li>α = 0,05 : le point descend doucement, beaucoup d'étapes pour arriver à w = 3.</li>
<li>α = 0,5 : en une étape, il arrive pile au minimum (cas particulier de cette courbe).</li>
<li>α = 0,9 : il saute d'un côté à l'autre du fond, en zigzag, mais finit par se rapprocher.</li>
<li>α = 1,05 : chaque saut l'emmène plus loin : le coût augmente au lieu de baisser. C'est la <strong>divergence</strong>.</li></ol>`,
      pitfall: `<p>Croire qu'un α plus grand est toujours plus rapide. Au-delà d'un seuil, l'entraînement explose : les valeurs deviennent énormes, parfois « NaN » (pas un nombre) dans les bibliothèques Python.</p>`
    },
    "Plusieurs features": {
      plain: `<p>Dans la vraie vie, une note ne dépend pas que des heures de révision : il y a aussi la présence en cours, le sommeil… Chaque feature reçoit son propre poids. Le modèle fait la « facture » du produit scalaire : chaque feature multipliée par son poids, tout additionné, plus le biais.</p>`,
      stepsTitle: "Pas à pas : ŷ = 1,2 × heures + 0,05 × présence(%) + 0,5 × sommeil(h) + 1",
      steps: `<ol>
<li>Étudiant : 5 heures de révision, 80 % de présence, 7 h de sommeil.</li>
<li>Heures : 1,2 × 5 = 6.</li>
<li>Présence : 0,05 × 80 = 4.</li>
<li>Sommeil : 0,5 × 7 = 3,5.</li>
<li>Total : 6 + 4 + 3,5 + 1 = <strong>14,5 / 20</strong>.</li>
<li>Pendant l'entraînement, la descente de gradient ajuste les quatre nombres (trois poids et le biais) en même temps.</li></ol>`,
      pitfall: `<p>Comparer les poids pour dire quelle feature « compte le plus » alors qu'elles ne sont pas à la même échelle. 0,05 paraît petit, mais il multiplie un pourcentage qui va jusqu'à 100. Pour comparer, il faut des features standardisées (module 2).</p>`
    }
  }
},

/* ================================================================ */
a5: {
  intro: `<p>Pour classer (spam ou pas, attaque ou pas), un modèle doit donner une <strong>probabilité</strong> entre 0 et 1. Ce module présente les trois outils qui le permettent : l'exponentielle, le logarithme et la sigmoïde. Tu n'as pas à faire ces calculs à la main dans la vraie vie (Python les fait), mais tu dois comprendre leur comportement.</p>`,
  blocks: {
    "Puissances et exponentielle": {
      plain: `<p>L'exponentielle, c'est la croissance « boule de neige » : plus il y a, plus ça augmente vite. Une rumeur que chaque personne répète à deux autres chaque jour : 1, 2, 4, 8, 16… L'important à retenir pour le ML : eˣ est <strong>toujours positif</strong>, devient énorme quand x est grand, et minuscule (proche de 0) quand x est très négatif.</p>`,
      stepsTitle: "Pas à pas : les règles des puissances avec 2",
      steps: `<ol>
<li>2³ = 2 × 2 × 2 = 8.</li>
<li>2⁰ = 1 (toute puissance 0 vaut 1).</li>
<li>2⁻² = 1 / 2² = 1/4 = 0,25 (une puissance négative, c'est « un divisé par »).</li>
<li>2³ × 2² = 2⁵ = 32 (on additionne les puissances).</li>
<li>Avec e ≈ 2,718 : e¹ ≈ 2,72 ; e² ≈ 7,39 ; e⁻¹ ≈ 0,37 ; e⁻⁵ ≈ 0,007.</li></ol>`,
      pitfall: `<p>Penser qu'une puissance négative donne un nombre négatif. 2⁻¹ = 0,5 : c'est positif, juste plus petit que 1.</p>`
    },
    "Le logarithme, l'inverse de l'exponentielle": {
      plain: `<p>Le logarithme répond à la question : « combien de fois faut-il multiplier ? ». Avec la base 10 : log(1000) = 3, car 10 × 10 × 10 = 1000. C'est un « compteur de zéros ». Le logarithme naturel ln fait pareil avec e. Il transforme les très grands écarts en petits écarts, et les produits en sommes : très pratique pour les calculs.</p>`,
      stepsTitle: "Pas à pas : comportement de −ln(p) entre 0 et 1",
      steps: `<ol>
<li>p = 1 : ln(1) = 0, donc −ln(1) = 0.</li>
<li>p = 0,5 : ln(0,5) ≈ −0,69, donc −ln(0,5) ≈ 0,69.</li>
<li>p = 0,1 : −ln(0,1) ≈ 2,30.</li>
<li>p = 0,01 : −ln(0,01) ≈ 4,61.</li>
<li>Plus p se rapproche de 0, plus −ln(p) grandit, sans limite. Retiens cette forme : elle sert à punir un modèle sûr de lui qui se trompe.</li></ol>`,
      pitfall: `<p>Essayer de calculer ln(0) ou le logarithme d'un nombre négatif : ça n'existe pas. En Python, <code>math.log(0)</code> provoque une erreur ; c'est pour ça que les bibliothèques évitent les probabilités exactement égales à 0.</p>`
    },
    "La sigmoïde": {
      plain: `<p>La sigmoïde est un « écraseur » : elle prend n'importe quel nombre, de −1 000 000 à +1 000 000, et le ramène entre 0 et 1. Un score très négatif devient presque 0 (« sûrement pas »), un score très positif presque 1 (« sûrement oui »), et 0 devient 0,5 (« je ne sais pas »). Parfait pour transformer un score en probabilité.</p>`,
      stepsTitle: "Pas à pas : σ(1) à la main",
      steps: `<ol>
<li>Formule : σ(z) = 1 / (1 + e^(−z)). Ici z = 1.</li>
<li>e^(−1) ≈ 0,368.</li>
<li>1 + 0,368 = 1,368.</li>
<li>1 / 1,368 ≈ <strong>0,73</strong>. Un score de 1 correspond à une probabilité d'environ 73 %.</li>
<li>Par symétrie, σ(−1) = 1 − 0,73 = 0,27.</li></ol>`,
      pitfall: `<p>Croire que la sigmoïde donne exactement 0 ou 1. Elle s'en approche sans jamais les atteindre : σ(10) ≈ 0,99995.</p>`
    },
    "Softmax : choisir entre plusieurs classes": {
      plain: `<p>La sigmoïde gère deux classes. Le softmax gère n'importe quel nombre de classes : il transforme une liste de scores en une liste de probabilités qui font 100 % au total. C'est comme partager un gâteau proportionnellement aux scores… mais en exagérant les écarts grâce à l'exponentielle, pour que le favori ait une part nettement plus grande.</p>`,
      stepsTitle: "Pas à pas : softmax de (1, 0, 0)",
      steps: `<ol>
<li>Exponentielles : e¹ ≈ 2,72 ; e⁰ = 1 ; e⁰ = 1.</li>
<li>Somme : 2,72 + 1 + 1 = 4,72.</li>
<li>Divisions : 2,72 / 4,72 ≈ 0,58 ; 1 / 4,72 ≈ 0,21 ; 0,21.</li>
<li>Vérification : 0,58 + 0,21 + 0,21 = 1,00. ✓</li></ol>`,
      pitfall: `<p>Diviser chaque score par la somme des scores sans passer par l'exponentielle. Ça ne marche pas avec des scores négatifs, et ce n'est pas ce que font les modèles.</p>`
    },
    "Pourquoi un logarithme dans le coût": {
      plain: `<p>Imagine un élève qui répond « je suis sûr à 99 % que c'est A » alors que c'est B. Il mérite une pénalité bien plus forte que celui qui disait « je pense A, à 55 % ». Le coût −ln(p) fait exactement ça : petite pénalité pour une hésitation, énorme pénalité pour une erreur commise avec assurance.</p>`,
      stepsTitle: "Pas à pas : comparer deux modèles sur un même email (vrai label : spam)",
      steps: `<ol>
<li>Modèle A donne P(spam) = 0,8. Perte = −ln(0,8) ≈ 0,22.</li>
<li>Modèle B donne P(spam) = 0,3. Perte = −ln(0,3) ≈ 1,20.</li>
<li>Modèle C donne P(spam) = 0,02. Perte = −ln(0,02) ≈ 3,91.</li>
<li>Le coût total d'un modèle est la moyenne de ces pertes sur tous les exemples : c'est l'<strong>entropie croisée</strong> (log loss).</li></ol>`,
      pitfall: `<p>Calculer −ln de la probabilité de la classe prédite au lieu de celle de la <strong>vraie</strong> classe. On regarde toujours quelle probabilité le modèle avait donnée à la bonne réponse.</p>`
    }
  }
}
});
