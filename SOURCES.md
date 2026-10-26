# Sources des cours CELIK Learning

Les programmes de CELIK Learning suivent des cours reconnus, publiés gratuitement par des universités.
Les explications, les exemples, les exercices et leur correction automatique sont rédigés pour CELIK Learning, en français.
CELIK Learning n'est affilié à aucune des universités citées ci-dessous.

## Cours SQL

- **Cours** : CS50's Introduction to Databases with SQL (CS50 SQL)
- **Établissement** : Harvard University
- **Enseignants** : David J. Malan, Carter Zenke
- **Site officiel** : https://cs50.harvard.edu/sql/
- **Licence des supports** : Creative Commons BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)
- **Ce qui a été repris** : la progression en 7 semaines (Querying, Relating, Designing, Writing, Viewing, Optimizing, Scaling), répartie en 16 leçons dans le même ordre.
- **Ce qui est propre à CELIK Learning** : les explications en français, les exemples, la base de données de la boutique Nong-Taaba (Ouagadougou), les exercices et leur correction automatique.

### Supports originaux de CS50 SQL

Diapositives (PDF), vidéos, notes et code de chaque semaine, publiés par Harvard :

| Semaine | Thème | Page de la semaine | Diapositives (PDF) |
| --- | --- | --- | --- |
| 0 | Querying | https://cs50.harvard.edu/sql/2024/weeks/0/ | https://cdn.cs50.net/sql/2023/x/lectures/0/lecture0.pdf |
| 1 | Relating | https://cs50.harvard.edu/sql/2024/weeks/1/ | https://cdn.cs50.net/sql/2023/x/lectures/1/lecture1.pdf |
| 2 | Designing | https://cs50.harvard.edu/sql/2024/weeks/2/ | https://cdn.cs50.net/sql/2023/x/lectures/2/lecture2.pdf |
| 3 | Writing | https://cs50.harvard.edu/sql/2024/weeks/3/ | https://cdn.cs50.net/sql/2023/x/lectures/3/lecture3.pdf |
| 4 | Viewing | https://cs50.harvard.edu/sql/2024/weeks/4/ | https://cdn.cs50.net/sql/2023/x/lectures/4/lecture4.pdf |
| 5 | Optimizing | https://cs50.harvard.edu/sql/2024/weeks/5/ | https://cdn.cs50.net/sql/2023/x/lectures/5/lecture5.pdf |
| 6 | Scaling | https://cs50.harvard.edu/sql/2024/weeks/6/ | https://cdn.cs50.net/sql/2023/x/lectures/6/lecture6.pdf |

### Texte de mention, prêt à copier

> Le programme du cours SQL suit *CS50's Introduction to Databases with SQL* (Harvard University, David J. Malan et Carter Zenke), sous licence CC BY-NC-SA 4.0. Les textes et exercices sont rédigés par CELIK Learning. CELIK Learning n'est pas affilié à Harvard.

## Cours Python

- **Cours** : Python for Everybody (PY4E)
- **Auteur** : Charles R. Severance (université du Michigan)
- **Site officiel** : https://www.py4e.com/ (leçons : https://www.py4e.com/lessons)
- **Licence** : Creative Commons Attribution 4.0 (mention en pied de page du site py4e.com)
- **Ce qui a été repris** : la progression des chapitres de base, dans cet ordre de notions : Why Program?, Variables, expressions and statements, Conditional Execution, Functions, Loops and Iterations, Strings, Lists, Dictionaries.
- **Correspondance** : chaque leçon affiche son repère (par exemple p08 → « Loops and Iterations »). La liste complète est dans `courses/sources.js`.
- **Pour aller plus loin** : CS50's Introduction to Programming with Python (Harvard University, David J. Malan), https://cs50.harvard.edu/python/, licence CC BY-NC-SA 4.0.
- **Ce qui est propre à CELIK Learning** : les explications en français, les exemples, les exercices et leur correction automatique, le projet final (le bulletin d'une classe).

> Le programme du cours Python suit *Python for Everybody* (Charles Severance, université du Michigan), sous licence CC BY 4.0. Les textes et exercices sont rédigés par CELIK Learning. CELIK Learning n'est pas affilié à l'université du Michigan.

## Cours de langage C

- **Cours** : CS50x, CS50's Introduction to Computer Science, semaines 1 à 5 (la partie en langage C)
- **Établissement** : Harvard University
- **Enseignant** : David J. Malan
- **Site officiel** : https://cs50.harvard.edu/x/
- **Licence** : Creative Commons BY-NC-SA 4.0 (https://cs50.harvard.edu/x/license/)
- **Ce qui a été repris** : la progression des semaines 1 « C », 2 « Arrays », 3 « Algorithms », 4 « Memory » et 5 « Data Structures », dans le même ordre, réparties en 16 leçons (repère affiché sur chaque leçon).
- **Différence assumée** : CS50 utilise sa bibliothèque cs50.h (get_int, get_string) pour lire au clavier ; CELIK Learning utilise scanf, du C standard.
- **Compilateur** : xcc, de tyfkda, https://github.com/tyfkda/xcc, licence MIT. Il compile vraiment le C dans le navigateur (fichiers dans `assets/lib/xcc/`, avec un petit correctif de scanf documenté dans `assets/lib/xcc/README.txt`).
- **Ce qui est propre à CELIK Learning** : les explications en français, les exemples (marché, tontine, guichet, répertoire), les exercices et leur correction automatique, le projet final (la file d'attente du guichet).

> Le programme du cours de C suit la partie en langage C de *CS50x, CS50's Introduction to Computer Science* (Harvard University, David J. Malan), sous licence CC BY-NC-SA 4.0. Le code est compilé dans le navigateur par xcc (licence MIT). Les textes et exercices sont rédigés par CELIK Learning. CELIK Learning n'est affilié ni à Harvard, ni à CS50.

## Cours Machine Learning

- **Cours principal** : 6.036 Introduction to Machine Learning, Massachusetts Institute of Technology (MIT), automne 2020
- **Enseignants** : Leslie Kaelbling, Tomás Lozano-Pérez, Isaac Chuang, Duane Boning
- **Site officiel** : https://ocw.mit.edu/courses/6-036-introduction-to-machine-learning-fall-2020/ (gratuit, MIT OpenCourseWare et Open Learning Library)
- **Licence** : Creative Commons BY-NC-SA 4.0
- **Semaines utilisées** : 1 Basics, 3 Features, 4 Margin Maximization (Logistic Regression, Gradient Descent), 5 Regression, 6–7 Neural Networks, 12 Decision Trees, 13 Clustering.
- **Ordre des modules** : Machine Learning Specialization d'Andrew Ng (Stanford Online et DeepLearning.AI), https://www.coursera.org/specializations/machine-learning-introduction : cours 1 « Supervised Machine Learning: Regression and Classification », cours 2 « Advanced Learning Algorithms », cours 3 « Unsupervised Learning, Recommenders, Reinforcement Learning ». Ce cours est payant sur Coursera (aide financière possible) : il est cité comme référence, pas comme cours gratuit.
- **Maths, pour aller plus loin** : Mathematics for Machine Learning, Marc Peter Deisenroth, A. Aldo Faisal, Cheng Soon Ong, Cambridge University Press (2020), https://mml-book.github.io/ (PDF gratuit, usage personnel). Chapitres cités : 2 Linear Algebra, 3 Analytic Geometry, 5 Vector Calculus, 6 Probability and Distribution.
- **Correspondance** : chaque module affiche son repère (par exemple m7 → MIT semaine 13 « Clustering », Andrew Ng cours 3). La liste complète est dans `courses/sources.js`.
- **Ce qui est propre à CELIK Learning** : les explications en français, les modules de maths (plus simples que le livre, repris depuis le début), les exemples (dépistage du paludisme, SMS de spam, consommation d'électricité), les démos et les quiz.

> Le programme du cours de machine learning suit *6.036 Introduction to Machine Learning* (MIT, CC BY-NC-SA 4.0), dans l'ordre de la *Machine Learning Specialization* d'Andrew Ng (Stanford Online et DeepLearning.AI). Les textes, démos et exercices sont rédigés par CELIK Learning. CELIK Learning n'est affilié ni au MIT, ni à Stanford, ni à DeepLearning.AI.
