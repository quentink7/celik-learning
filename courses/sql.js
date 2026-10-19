/* Assemble le cours SQL à partir des fichiers sql-1.js … sql-4.js (la base d'exemple est dans sql-data.js) */
window.COURSE_SQL = (function () {
  return {
    id: "sql",
    title: "SQL",
    tagline: "Interroger et construire une base de données, de zéro",
    intro: "Aucune connaissance requise. Tu apprends à questionner une vraie base de données, celle d'une boutique de Ouagadougou, puis à construire la tienne. Chaque requête s'exécute dans ta page, avec le résultat sous tes yeux : rien à installer.",
    source: {
      name: "CS50's Introduction to Databases with SQL",
      org: "Université Harvard",
      authors: "David J. Malan et Carter Zenke",
      url: "https://cs50.harvard.edu/sql/",
      license: "CC BY-NC-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
      weeks: ["Querying", "Relating", "Designing", "Writing", "Viewing", "Optimizing", "Scaling"]
    },
    parts: window.SQL_PARTS || []
  };
})();
