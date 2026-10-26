/* Assemble le cours Python à partir des fichiers python-1.js … python-4.js */
window.COURSE_PYTHON = (function () {
  const parts = window.PY_PARTS || [];
  parts.forEach(p => p.lessons.forEach(l => {
    const ex = l.exercise;
    if (ex && !ex.sol && ex.solTail) {
      const head = ex.start.slice(0, ex.start.indexOf("]\n") + 2);
      ex.sol = head + "\n" + ex.solTail;
    }
  }));
  return {
    id: "python",
    title: "Python",
    tagline: "Programmer de zéro, jusqu'à calculer un vrai bulletin de notes",
    intro: "Aucune connaissance requise. Chaque leçon explique une notion avec des exemples suivis ligne par ligne, puis tu la pratiques directement dans la console intégrée : ton code s'exécute dans le navigateur, rien à installer.",
    parts
  };
})();
