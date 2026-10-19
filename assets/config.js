/*
 * Réglages du site.
 *
 * 1. Crée un projet sur https://supabase.com (gratuit).
 * 2. Dans Project Settings > API, copie « Project URL » et la clé « anon public ».
 * 3. Colle-les ci-dessous.
 *
 * Tant que ces deux champs sont vides, le site tourne en « mode démo » :
 * pas de connexion, progression gardée seulement dans le navigateur.
 * La clé « anon » est faite pour être publique ; ne mets JAMAIS ici la clé « service_role ».
 */
window.SITE_CONFIG = {
  siteName: "CELIK Learning",
  tagline: "Apprendre Python, SQL et l'IA, fil après fil",
  supabaseUrl: "https://aisalnafbiulizdqdeql.supabase.co",
  supabaseAnonKey: "sb_publishable_l2v0KRJe4N8nESQ9WknTVg_3qtjbtSU",
  // false tant qu'aucun service d'envoi (SMTP) n'est branché dans Supabase :
  // masque « Lien par email » et « Mot de passe oublié ? », qui ont besoin d'un email.
  emailEnabled: false
};
