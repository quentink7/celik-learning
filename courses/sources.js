/* Sources des cours Python, C et Machine Learning : le cours reconnu dont chaque programme suit la progression,
   et, pour chaque leçon ou module, la partie correspondante de ce cours. (La source du cours SQL est dans sql.js.) */
window.COURSE_SOURCES = {
  python: {
    html: `<p>Ce cours suit la progression de <a href="https://www.py4e.com/" target="_blank" rel="noopener noreferrer">Python for Everybody</a>, le cours d'initiation à la programmation de Charles Severance (université du Michigan), l'un des cours de Python les plus suivis au monde, publié sous licence <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>. Ses chapitres de base (variables, conditions, fonctions, boucles, textes, listes, dictionnaires) sont repris dans les 16 leçons.</p>
<p>Pour aller plus loin, après ce cours : <a href="https://cs50.harvard.edu/python/" target="_blank" rel="noopener noreferrer">CS50's Introduction to Programming with Python</a> (université Harvard), gratuit.</p>
<p>Les explications, les exemples et les exercices sont rédigés pour CELIK Learning, en français. CELIK Learning n'est affilié ni à l'université du Michigan, ni à Harvard.</p>`,
    label: "Python for Everybody",
    refs: {
      p01: "« Why Program? »", p02: "« Variables, expressions and statements »", p03: "« Variables, expressions and statements »",
      p04: "« Variables, expressions and statements »", p05: "« Variables, expressions and statements »",
      p06: "« Conditional Execution »", p07: "« Conditional Execution »",
      p08: "« Loops and Iterations »", p09: "« Loops and Iterations »",
      p10: "« Lists »", p11: "« Lists »", p12: "« Dictionaries »", p13: "« Strings »",
      p14: "« Functions »", p15: "« Conditional Execution » (try / except)", p16: "« Lists » et « Dictionaries »"
    }
  },
  c: {
    html: `<p>Ce cours suit la partie en langage C de <a href="https://cs50.harvard.edu/x/" target="_blank" rel="noopener noreferrer">CS50x, CS50's Introduction to Computer Science</a>, le cours d'introduction à l'informatique de l'université Harvard (David J. Malan), publié sous licence <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>. Ses semaines 1 à 5 (C, Arrays, Algorithms, Memory, Data Structures) sont reprises dans le même ordre, réparties en 16 leçons. CS50 utilise sa propre bibliothèque (cs50.h) pour lire au clavier ; ici, on utilise directement scanf, du C standard.</p>
<p>Le code est compilé dans ta page par <a href="https://github.com/tyfkda/xcc" target="_blank" rel="noopener noreferrer">xcc</a>, un compilateur C libre (licence MIT) qui fonctionne dans le navigateur.</p>
<p>Les explications, les exemples et les exercices sont rédigés pour CELIK Learning, en français. CELIK Learning n'est affilié ni à Harvard, ni à CS50.</p>`,
    label: "CS50x"
  },
  ml: {
    html: `<p>Ce cours suit les grands thèmes de <a href="https://ocw.mit.edu/courses/6-036-introduction-to-machine-learning-fall-2020/" target="_blank" rel="noopener noreferrer">6.036 Introduction to Machine Learning</a> du MIT (Leslie Kaelbling, Tomás Lozano-Pérez, Isaac Chuang et Duane Boning), gratuit sur MIT OpenCourseWare et publié sous licence <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>. L'ordre des modules suit celui de la <a href="https://www.coursera.org/specializations/machine-learning-introduction" target="_blank" rel="noopener noreferrer">Machine Learning Specialization</a> d'Andrew Ng (Stanford Online et DeepLearning.AI), le cours de machine learning le plus suivi au monde.</p>
<p>Pour les maths, la référence pour aller plus loin est le livre <a href="https://mml-book.github.io/" target="_blank" rel="noopener noreferrer">Mathematics for Machine Learning</a> (Deisenroth, Faisal et Ong, Cambridge University Press), dont le PDF est gratuit. Les modules de maths de CELIK Learning sont plus simples : ils reprennent les bases nécessaires, depuis le début.</p>
<p>Les explications, les exemples, les démos et les quiz sont rédigés pour CELIK Learning, en français. CELIK Learning n'est affilié ni au MIT, ni à Stanford, ni à DeepLearning.AI.</p>`,
    label: "MIT 6.036 et Andrew Ng",
    refs: {
      m1: "MIT 6.036 semaine 1 « Basics » · Andrew Ng, cours 1",
      m2: "MIT 6.036 semaine 3 « Features » · Andrew Ng, cours 1 et 2",
      m3: "MIT 6.036 semaines 4 et 5 « Gradient Descent », « Regression » · Andrew Ng, cours 1",
      m4: "MIT 6.036 semaines 1, 2, 4 et 12 (classifieurs linéaires, logistic regression, decision trees) · Andrew Ng, cours 1 et 2",
      m5: "Andrew Ng, cours 2 (bonnes pratiques : évaluer un modèle)",
      m6: "MIT 6.036 semaine 5 « Regression » (régularisation) · Andrew Ng, cours 1 et 2",
      m7: "MIT 6.036 semaine 13 « Clustering » · Andrew Ng, cours 3",
      m8: "MIT 6.036 semaines 6 et 7 « Neural Networks » · Andrew Ng, cours 2",
      m9: "Andrew Ng, cours 1 et 2 (travaux pratiques avec scikit-learn)",
      a2: "pour aller plus loin : Mathematics for Machine Learning, chap. 2 et 3",
      a4: "pour aller plus loin : Mathematics for Machine Learning, chap. 5",
      a6: "pour aller plus loin : Mathematics for Machine Learning, chap. 6",
      a7: "pour aller plus loin : Mathematics for Machine Learning, chap. 2 et 5"
    }
  }
};
