/* Assemble le cours C à partir des fichiers c-1.js … c-4.js */
window.COURSE_C = (function () {
  return {
    id: "c",
    title: "Langage C",
    tagline: "Comprendre comment marche vraiment un ordinateur",
    intro: "Aucune connaissance requise. Le C est le langage des systèmes, des téléphones et des machines : en l'apprenant, tu comprends ce qui se passe sous le capot, de la mémoire aux algorithmes. Ton code est vraiment compilé et exécuté dans la page : rien à installer.",
    weeks: { 1: "C", 2: "Arrays", 3: "Algorithms", 4: "Memory", 5: "Data Structures" },
    parts: window.C_PARTS || []
  };
})();
