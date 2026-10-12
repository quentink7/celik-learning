/*
 * Connexion (Supabase Auth) et sauvegarde de la progression.
 * Mode « cloud » si config.js contient l'URL et la clé Supabase, sinon mode « démo » (navigateur seulement).
 *
 * État d'un cours : { units: { <id>: { done, score, at } }, drafts: { <id>: "code" }, quiz: { <id>: {...} }, last, updated }
 */
window.Store = (function () {
  "use strict";
  const cfg = window.SITE_CONFIG || {};
  const cloud = !!(cfg.supabaseUrl && cfg.supabaseAnonKey);
  let sb = null, user = null;
  const listeners = new Set();
  const states = {};
  const timers = {};
  let saveStatus = "idle";
  const statusListeners = new Set();

  const fresh = () => ({ units: {}, drafts: {}, quiz: {}, last: null, updated: 0 });
  const lsKey = c => `celik:${user ? user.id : "demo"}:${c}`;
  function lsGet(k) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  function setStatus(s) { saveStatus = s; statusListeners.forEach(f => f(s)); }

  /* Fusion de deux états : une leçon terminée le reste, on garde le meilleur score et le brouillon le plus récent. */
  function merge(a, b) {
    a = a || fresh(); b = b || fresh();
    const out = fresh();
    const ids = new Set([...Object.keys(a.units || {}), ...Object.keys(b.units || {})]);
    ids.forEach(id => {
      const x = (a.units || {})[id] || {}, y = (b.units || {})[id] || {};
      out.units[id] = { done: !!(x.done || y.done), score: Math.max(x.score || 0, y.score || 0), at: Math.max(x.at || 0, y.at || 0) };
    });
    const newer = (a.updated || 0) >= (b.updated || 0) ? a : b, older = newer === a ? b : a;
    out.drafts = Object.assign({}, older.drafts || {}, newer.drafts || {});
    out.quiz = Object.assign({}, older.quiz || {}, newer.quiz || {});
    out.last = newer.last || older.last || null;
    out.updated = Math.max(a.updated || 0, b.updated || 0);
    return out;
  }

  async function init() {
    if (!cloud) return;
    if (!window.supabase || !window.supabase.createClient) throw new Error("La bibliothèque Supabase n'a pas pu se charger.");
    sb = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
    const { data } = await sb.auth.getSession();
    user = data && data.session ? data.session.user : null;
    sb.auth.onAuthStateChange((_evt, session) => {
      const prev = user ? user.id : null;
      user = session ? session.user : null;
      if ((user ? user.id : null) !== prev) { Object.keys(states).forEach(k => delete states[k]); listeners.forEach(f => f(user)); }
    });
  }

  function err(e) {
    const m = (e && (e.message || e.error_description)) || String(e);
    const fr = {
      "Invalid login credentials": "Email ou mot de passe incorrect.",
      "Email not confirmed": "Ton adresse n'est pas encore confirmée : clique sur le lien reçu par email.",
      "User already registered": "Un compte existe déjà avec cet email. Connecte-toi.",
      "Password should be at least 6 characters": "Le mot de passe doit faire au moins 6 caractères."
    };
    for (const k in fr) if (m.indexOf(k) >= 0) return fr[k];
    if (/failed to fetch|networkerror|load failed/i.test(m)) return "Impossible de joindre le serveur. Vérifie ta connexion internet et réessaie.";
    if (/rate limit/i.test(m)) return "Trop de tentatives ou d'emails envoyés. Réessaie dans quelques minutes.";
    return m;
  }
  const redirect = () => location.origin + location.pathname;

  async function signIn(email, password) { const { error } = await sb.auth.signInWithPassword({ email, password }); if (error) throw new Error(err(error)); }
  async function signUp(email, password) {
    const { data, error } = await sb.auth.signUp({ email, password, options: { emailRedirectTo: redirect() } });
    if (error) throw new Error(err(error));
    return { needsConfirm: !(data && data.session) };
  }
  async function magic(email) { const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: redirect() } }); if (error) throw new Error(err(error)); }
  async function resetPassword(email) { const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: redirect() + "#/compte" }); if (error) throw new Error(err(error)); }
  async function updatePassword(password) { const { error } = await sb.auth.updateUser({ password }); if (error) throw new Error(err(error)); }
  async function signOut() { if (sb) await sb.auth.signOut(); user = null; Object.keys(states).forEach(k => delete states[k]); listeners.forEach(f => f(null)); }

  /* Lecture : cache local immédiat, puis fusion avec la copie en ligne. */
  function get(course) {
    if (!states[course]) states[course] = merge(lsGet(lsKey(course)), null);
    return states[course];
  }
  async function load(course) {
    const local = get(course);
    if (!cloud || !user) return local;
    try {
      setStatus("loading");
      const { data, error } = await sb.from("progress").select("state").eq("user_id", user.id).eq("course", course).maybeSingle();
      if (error) throw error;
      states[course] = merge(local, data ? data.state : null);
      lsSet(lsKey(course), states[course]);
      setStatus("saved");
    } catch (e) { setStatus("offline"); }
    return states[course];
  }
  function update(course, fn) {
    const s = get(course);
    fn(s);
    s.updated = Date.now();
    lsSet(lsKey(course), s);
    if (cloud && user) { setStatus("pending"); clearTimeout(timers[course]); timers[course] = setTimeout(() => push(course), 1200); }
    return s;
  }
  async function push(course) {
    if (!cloud || !user) return;
    try {
      const { error } = await sb.from("progress").upsert({ user_id: user.id, course, state: states[course], updated_at: new Date().toISOString() }, { onConflict: "user_id,course" });
      if (error) throw error;
      setStatus("saved");
    } catch (e) { setStatus("offline"); }
  }
  window.addEventListener("beforeunload", () => { Object.keys(timers).forEach(c => { clearTimeout(timers[c]); push(c); }); });

  return {
    cloud, init, signIn, signUp, magic, resetPassword, updatePassword, signOut, get, load, update,
    get user() { return user; },
    get status() { return saveStatus; },
    onAuth: f => listeners.add(f),
    onStatus: f => statusListeners.add(f)
  };
})();
