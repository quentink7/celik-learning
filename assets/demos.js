/* Démos interactives du cours ML (canvas). Expose window.DEMO. */
window.DEMO = (function () {
"use strict";
/* ===== Démos interactives (canvas) ===== */
const FONT_UI = '"Bricolage Grotesque", system-ui, sans-serif';
const FONT_MONO = '"JetBrains Mono", ui-monospace, Menlo, monospace';
const LIVE = new Set();
function cssv(n) { return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); }
function prep(cv, hgt) {
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  const w = Math.max(260, cv.clientWidth || cv.parentElement.clientWidth || 300);
  cv.width = Math.round(w * dpr); cv.height = Math.round(hgt * dpr); cv.style.height = hgt + "px";
  const x = cv.getContext("2d"); x.setTransform(dpr, 0, 0, dpr, 0, 0); x.clearRect(0, 0, w, hgt);
  return { x, w, h: hgt };
}
function register(cv, draw) {
  const o = { cv, draw }; LIVE.add(o);
  if ("ResizeObserver" in window) {
    let lw = 0;
    const ro = new ResizeObserver(() => {
      if (!cv.isConnected) { ro.disconnect(); LIVE.delete(o); return; }
      if (Math.abs(cv.clientWidth - lw) > 1) { lw = cv.clientWidth; draw(); }
    });
    ro.observe(cv);
  }
  draw();
}
function redrawAll() { LIVE.forEach(o => { if (!o.cv.isConnected) { LIVE.delete(o); return; } o.draw(); }); }
try { matchMedia("(prefers-color-scheme: dark)").addEventListener("change", redrawAll); } catch (e) {}
new MutationObserver(redrawAll).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });

function rng(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function gauss(r) { let u = 0; while (u === 0) u = r(); const v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const nfx = (n, d) => Number(n).toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d });

function mark(x, kind, px, py, r, fill, ring, hollow) {
  x.beginPath();
  if (kind === "square") x.rect(px - r * .88, py - r * .88, r * 1.76, r * 1.76);
  else if (kind === "triangle") { const rr = r * 1.2; x.moveTo(px, py - rr); x.lineTo(px + rr * .95, py + rr * .62); x.lineTo(px - rr * .95, py + rr * .62); x.closePath(); }
  else x.arc(px, py, r, 0, Math.PI * 2);
  if (hollow) { x.lineWidth = 2; x.strokeStyle = fill; x.stroke(); }
  else { x.fillStyle = fill; x.fill(); if (ring) { x.lineWidth = 1.5; x.strokeStyle = ring; x.stroke(); } }
}
function legendSvg(kind, color, hollow) {
  const st = hollow ? `style="fill:none;stroke:${color};stroke-width:2"` : `style="fill:${color}"`;
  const s = kind === "square" ? `<rect x="1.5" y="1.5" width="9" height="9" ${st}/>`
    : kind === "triangle" ? `<path d="M6 1 L11.2 10.5 L0.8 10.5Z" ${st}/>`
    : kind === "line" ? `<rect x="0" y="5" width="12" height="2" style="fill:${color}"/>`
    : `<circle cx="6" cy="6" r="5" ${st}/>`;
  return `<svg viewBox="0 0 12 12" aria-hidden="true">${s}</svg>`;
}
function axes(x, P, xt, yt, fx, fy) {
  x.lineWidth = 1; x.strokeStyle = cssv("--grid"); x.fillStyle = cssv("--muted"); x.font = "11px " + FONT_MONO;
  yt.forEach(v => { const py = Math.round(P.sy(v)) + .5; x.beginPath(); x.moveTo(P.l, py); x.lineTo(P.w - P.r, py); x.stroke(); x.textAlign = "right"; x.textBaseline = "middle"; x.fillText(fy(v), P.l - 6, py); });
  x.textAlign = "center"; x.textBaseline = "top";
  xt.forEach(v => x.fillText(fx(v), P.sx(v), P.h - P.b + 6));
  x.strokeStyle = cssv("--axis"); x.beginPath(); x.moveTo(P.l, P.h - P.b + .5); x.lineTo(P.w - P.r, P.h - P.b + .5); x.stroke();
}
const minus = s => String(s).replace("-", "−");
function tipAt(tip, px, py, text) { tip.hidden = false; tip.style.left = px + "px"; tip.style.top = py + "px"; tip.textContent = text; }

const DEMO = {};

/* --- 1. Descente de gradient --- */
DEMO.gradient = host => {
  const id = "gd-alpha-" + (host.dataset.key || "1");
  host.innerHTML = `<div class="demo">
<div class="cv-wrap"><canvas role="img" aria-label="Courbe de coût L(w) = (w − 3)² + 1, avec la trajectoire de la descente de gradient"></canvas><div class="tip" hidden></div></div>
<div class="ctrls"><label class="rng" for="${id}">Taux α <input type="range" id="${id}" min="0.01" max="1.1" step="0.01" value="0.05"><span class="val"></span></label></div>
<div class="ctrls"><span class="note">Essaie :</span><button type="button" class="chip" data-a="0.05">α = 0,05</button><button type="button" class="chip" data-a="0.5">0,5</button><button type="button" class="chip" data-a="0.9">0,9</button><button type="button" class="chip" data-a="1.05">1,05</button></div>
<div class="ctrls"><button type="button" class="btn primary small" data-s="1">Faire 1 pas</button><button type="button" class="btn small" data-s="10">Faire 10 pas</button><button type="button" class="btn ghost small" data-reset>Recommencer</button></div>
<div class="readout"><div><span>itération</span><b data-o="n"></b></div><div><span>w</span><b data-o="w"></b></div><div><span>coût L(w)</span><b data-o="L"></b></div><div><span>pente ∂L/∂w</span><b data-o="g"></b></div></div>
<p class="msg" aria-live="polite"></p></div>`;
  const L = w => (w - 3) ** 2 + 1, G = w => 2 * (w - 3);
  const W0 = -3, W1 = 9, LMAX = 38;
  let alpha = 0.05, hist = [-1], P = null, hover = null;
  const cv = host.querySelector("canvas"), tip = host.querySelector(".tip"), rg = host.querySelector("input"), val = host.querySelector(".val"), msg = host.querySelector(".msg");
  const fmt = v => !isFinite(v) ? "∞" : Math.abs(v) >= 1e4 ? v.toExponential(1).replace(".", ",").replace("-", "−") : minus(nfx(v, 2));
  function draw() {
    const { x, w, h } = prep(cv, 250);
    P = { l: 34, r: 12, t: 12, b: 26, w, h };
    P.sx = v => P.l + (v - W0) / (W1 - W0) * (w - P.l - P.r);
    P.sy = v => h - P.b - (v / LMAX) * (h - P.t - P.b);
    axes(x, P, [-2, 0, 2, 4, 6, 8], [0, 10, 20, 30], minus, String);
    x.setLineDash([3, 3]); x.strokeStyle = cssv("--axis"); x.beginPath(); x.moveTo(P.sx(3), P.t); x.lineTo(P.sx(3), h - P.b); x.stroke(); x.setLineDash([]);
    x.fillStyle = cssv("--muted"); x.font = "11px " + FONT_UI; x.textAlign = "left"; x.textBaseline = "top"; x.fillText("minimum, w = 3", P.sx(3) + 5, P.t);
    x.save(); x.beginPath(); x.rect(P.l, P.t - 8, w - P.l - P.r, h - P.t - P.b + 8); x.clip();
    x.beginPath();
    for (let i = 0; i <= 240; i++) { const v = W0 + (W1 - W0) * i / 240; const px = P.sx(v), py = P.sy(L(v)); i ? x.lineTo(px, py) : x.moveTo(px, py); }
    x.strokeStyle = cssv("--ink-2"); x.lineWidth = 2; x.stroke();
    const acc = cssv("--accent"), surf = cssv("--surface");
    x.lineWidth = 1.25; x.strokeStyle = acc; x.beginPath();
    hist.forEach((v, i) => { const px = P.sx(clamp(v, W0 - 5, W1 + 5)), py = P.sy(Math.min(L(v), LMAX * 3)); i ? x.lineTo(px, py) : x.moveTo(px, py); });
    x.stroke();
    hist.forEach((v, i) => { if (v >= W0 && v <= W1 && L(v) <= LMAX) mark(x, "circle", P.sx(v), P.sy(L(v)), i === hist.length - 1 ? 6.5 : 3.5, acc, surf); });
    if (hover != null) { x.strokeStyle = cssv("--axis"); x.lineWidth = 1; x.beginPath(); x.moveTo(P.sx(hover), P.t); x.lineTo(P.sx(hover), h - P.b); x.stroke(); mark(x, "circle", P.sx(hover), P.sy(L(hover)), 4, cssv("--ink"), surf); }
    x.restore();
    const cur = hist[hist.length - 1];
    if (!(cur >= W0 && cur <= W1 && L(cur) <= LMAX)) {
      x.fillStyle = cssv("--bad"); x.font = "600 12px " + FONT_UI; x.textBaseline = "top";
      if (cur < 3) { x.textAlign = "left"; x.fillText("← w est sorti du graphique", P.l + 6, P.t + 18); }
      else { x.textAlign = "right"; x.fillText("w est sorti du graphique →", w - P.r - 6, P.t + 18); }
    }
  }
  function out() {
    const cur = hist[hist.length - 1], n = hist.length - 1;
    host.querySelector("[data-o=n]").textContent = n;
    host.querySelector("[data-o=w]").textContent = fmt(cur);
    host.querySelector("[data-o=L]").textContent = fmt(L(cur));
    host.querySelector("[data-o=g]").textContent = fmt(G(cur));
    val.textContent = nfx(alpha, 2);
    let m;
    if (n === 0) m = "Le point part de w = −1. Prédis ce qui va se passer, puis avance.";
    else {
      const d0 = Math.abs(hist[n - 1] - 3), d1 = Math.abs(cur - 3);
      if (d1 < 0.005) m = `Convergé en ${n} pas : w ≈ 3, le minimum est atteint.`;
      else if (d1 > d0) m = "Chaque pas t'éloigne du minimum : α est trop grand, ça diverge.";
      else if ((hist[n - 1] - 3) * (cur - 3) < 0) m = "Le point saute d'un côté à l'autre du minimum : il oscille, tout en se rapprochant.";
      else m = "Le point descend vers le minimum." + (d0 - d1 < 0.2 && n > 3 ? " Lentement : α est petit." : "");
    }
    msg.textContent = m;
  }
  function step(k) { for (let i = 0; i < k; i++) { const c = hist[hist.length - 1]; if (!isFinite(c) || Math.abs(c) > 1e6) break; hist.push(c - alpha * G(c)); } draw(); out(); }
  function reset() { hist = [-1]; draw(); out(); }
  rg.addEventListener("input", () => { alpha = +rg.value; reset(); });
  host.querySelectorAll("[data-a]").forEach(b => b.addEventListener("click", () => { alpha = +b.dataset.a; rg.value = alpha; reset(); }));
  host.querySelectorAll("[data-s]").forEach(b => b.addEventListener("click", () => step(+b.dataset.s)));
  host.querySelector("[data-reset]").addEventListener("click", reset);
  cv.addEventListener("pointermove", e => {
    if (!P) return; const r = cv.getBoundingClientRect(); const px = e.clientX - r.left;
    if (px < P.l || px > P.w - P.r) { hover = null; tip.hidden = true; draw(); return; }
    hover = W0 + (px - P.l) / (P.w - P.l - P.r) * (W1 - W0); draw();
    tipAt(tip, P.sx(hover), Math.max(P.t + 24, P.sy(Math.min(L(hover), LMAX))), `w = ${minus(nfx(hover, 2))} · L = ${nfx(L(hover), 2)}`);
  });
  cv.addEventListener("pointerleave", () => { hover = null; tip.hidden = true; draw(); });
  register(cv, draw); out();
};

/* --- 2. Seuil, précision, rappel --- */
DEMO.threshold = host => {
  const id = "th-seuil-" + (host.dataset.key || "1");
  host.innerHTML = `<div class="demo">
<div class="legend"><span>${legendSvg("circle", "var(--s1)")}Connexion normale (60)</span><span>${legendSvg("triangle", "var(--s2)")}Attaque (20)</span></div>
<div class="cv-wrap"><canvas role="img" aria-label="80 connexions placées selon leur score, avec le seuil d'alerte"></canvas><div class="tip" hidden></div></div>
<div class="ctrls"><label class="rng" for="${id}">Seuil d'alerte <input type="range" id="${id}" min="0.05" max="0.95" step="0.01" value="0.5"><span class="val"></span></label></div>
<div class="grid2" style="gap:1rem">
<div class="cm-grid" aria-live="polite"><div class="h"></div><div class="h">Alerte</div><div class="h">Pas d'alerte</div>
<div class="h">Attaque</div><div>VP <b data-o="vp"></b></div><div>FN <b data-o="fn"></b></div>
<div class="h">Normal</div><div>FP <b data-o="fp"></b></div><div>VN <b data-o="vn"></b></div></div>
<div class="readout"><div><span>précision</span><b data-o="p"></b></div><div><span>rappel</span><b data-o="r"></b></div><div><span>F1</span><b data-o="f"></b></div><div><span>accuracy</span><b data-o="a"></b></div></div>
</div></div>`;
  const r = rng(5), pts = [];
  for (let i = 0; i < 60; i++) pts.push({ s: clamp(0.31 + gauss(r) * 0.13, 0.02, 0.98), atk: false, j: r() * 2 - 1 });
  for (let i = 0; i < 20; i++) pts.push({ s: clamp(0.67 + gauss(r) * 0.14, 0.02, 0.98), atk: true, j: r() * 2 - 1 });
  let th = 0.5, P = null, hov = null;
  const cv = host.querySelector("canvas"), tip = host.querySelector(".tip"), rg = host.querySelector("input");
  function geo(w, h) {
    P = { l: 64, r: 14, t: 22, b: 40, w, h };
    P.sx = v => P.l + v * (w - P.l - P.r);
    const ph = h - P.t - P.b;
    P.row = atk => P.t + (atk ? ph * 0.27 : ph * 0.73);
    P.band = ph * 0.2;
    pts.forEach(p => { p.px = P.sx(p.s); p.py = P.row(p.atk) + p.j * P.band; });
  }
  function draw() {
    const { x, w, h } = prep(cv, 230); geo(w, h);
    x.fillStyle = cssv("--accent-soft"); x.fillRect(P.sx(th), P.t - 14, w - P.r - P.sx(th), h - P.t - P.b + 14);
    x.fillStyle = cssv("--muted"); x.font = "11px " + FONT_MONO; x.textAlign = "center"; x.textBaseline = "top";
    [0, .25, .5, .75, 1].forEach(v => x.fillText(v === 0 ? "0" : v === 1 ? "1" : nfx(v, 2), P.sx(v), h - P.b + 6));
    x.font = "11px " + FONT_UI; x.fillText("score donné par le modèle", P.l + (w - P.l - P.r) / 2, h - P.b + 22);
    x.strokeStyle = cssv("--axis"); x.lineWidth = 1; x.beginPath(); x.moveTo(P.l, h - P.b + .5); x.lineTo(w - P.r, h - P.b + .5); x.stroke();
    x.strokeStyle = cssv("--grid"); x.beginPath(); x.moveTo(P.l, (P.row(true) + P.row(false)) / 2 + .5); x.lineTo(w - P.r, (P.row(true) + P.row(false)) / 2 + .5); x.stroke();
    x.fillStyle = cssv("--ink-2"); x.font = "12px " + FONT_UI; x.textAlign = "right"; x.textBaseline = "middle";
    x.fillText("Attaque", P.l - 10, P.row(true)); x.fillText("Normal", P.l - 10, P.row(false));
    const surf = cssv("--surface"), s1 = cssv("--s1"), s2 = cssv("--s2");
    pts.forEach(p => { if (!p.atk) mark(x, "circle", p.px, p.py, 4.5, s1, surf); });
    pts.forEach(p => { if (p.atk) mark(x, "triangle", p.px, p.py, 5, s2, surf); });
    if (hov) mark(x, hov.atk ? "triangle" : "circle", hov.px, hov.py, 7, hov.atk ? s2 : s1, cssv("--ink"));
    const tx = P.sx(th);
    x.strokeStyle = cssv("--accent"); x.lineWidth = 2; x.beginPath(); x.moveTo(tx, P.t - 14); x.lineTo(tx, h - P.b); x.stroke();
    x.fillStyle = cssv("--accent"); x.font = "600 11px " + FONT_UI; x.textBaseline = "top";
    const lab = "seuil " + nfx(th, 2) + " · alerte →";
    x.textAlign = tx > w - 150 ? "right" : "left"; x.fillText(lab, tx > w - 150 ? tx - 6 : tx + 6, P.t - 12);
  }
  function out() {
    let vp = 0, fn = 0, fp = 0, vn = 0;
    pts.forEach(p => { const al = p.s >= th; if (p.atk) al ? vp++ : fn++; else al ? fp++ : vn++; });
    const pr = vp + fp ? vp / (vp + fp) : null, rc = vp / (vp + fn), f1 = pr != null && pr + rc ? 2 * pr * rc / (pr + rc) : null;
    const set = (k, v) => host.querySelector(`[data-o=${k}]`).textContent = v;
    set("vp", vp); set("fn", fn); set("fp", fp); set("vn", vn);
    set("p", pr == null ? "—" : nfx(pr, 2)); set("r", nfx(rc, 2)); set("f", f1 == null ? "—" : nfx(f1, 2)); set("a", nfx((vp + vn) / pts.length, 2));
    host.querySelector(".val").textContent = nfx(th, 2);
  }
  rg.addEventListener("input", () => { th = +rg.value; draw(); out(); });
  cv.addEventListener("pointermove", e => {
    if (!P) return; const b = cv.getBoundingClientRect(); const mx = e.clientX - b.left, my = e.clientY - b.top;
    let best = null, bd = 14 * 14;
    pts.forEach(p => { const d = (p.px - mx) ** 2 + (p.py - my) ** 2; if (d < bd) { bd = d; best = p; } });
    if (best !== hov) { hov = best; draw(); }
    if (best) tipAt(tip, best.px, best.py - 6, `${best.atk ? "Attaque" : "Connexion normale"} · score ${nfx(best.s, 2)} · ${best.s >= th ? "alerte" : "pas d'alerte"}`);
    else tip.hidden = true;
  });
  cv.addEventListener("pointerleave", () => { hov = null; tip.hidden = true; draw(); });
  register(cv, draw); out();
};

/* --- 3. Surapprentissage : polynômes --- */
DEMO.overfit = host => {
  const id = "of-deg-" + (host.dataset.key || "1");
  host.innerHTML = `<div class="demo">
<div class="legend"><span>${legendSvg("circle", "var(--s1)")}Données d'entraînement (12)</span><span>${legendSvg("square", "var(--s2)", true)}Nouvelles données (40)</span><span>${legendSvg("line", "var(--ink)")}Modèle</span></div>
<div class="cv-wrap"><canvas data-c="fit" role="img" aria-label="Points d'entraînement, nouvelles données et courbe du modèle polynomial"></canvas></div>
<div class="ctrls"><label class="rng" for="${id}">Degré du polynôme <input type="range" id="${id}" min="1" max="11" step="1" value="1"><span class="val"></span></label></div>
<div class="readout"><div><span>erreur entraînement (MSE)</span><b data-o="tr"></b></div><div><span>erreur nouvelles données (MSE)</span><b data-o="te"></b></div><div><span>diagnostic</span><b data-o="dg" style="font-family:var(--f-display);font-weight:600"></b></div></div>
<p class="note">Erreur selon le degré, sur une échelle logarithmique. Touche ou survole un degré pour le choisir.</p>
<div class="legend"><span>${legendSvg("circle", "var(--s1)")}Erreur entraînement</span><span>${legendSvg("square", "var(--s2)")}Erreur nouvelles données</span></div>
<div class="cv-wrap"><canvas data-c="err" role="img" aria-label="Erreur d'entraînement et erreur sur les nouvelles données pour les degrés 1 à 11"></canvas><div class="tip" hidden></div></div>
</div>`;
  const f = x => Math.sin(3 * x) + 0.2 * x;
  const r = rng(21), tr = [], te = [];
  for (let i = 0; i < 12; i++) { const xv = -1 + 2 * (i + 0.5) / 12 + (r() - 0.5) * 0.08; tr.push([xv, f(xv) + gauss(r) * 0.22]); }
  for (let i = 0; i < 40; i++) { const xv = -1 + 2 * r(); te.push([xv, f(xv) + gauss(r) * 0.22]); }
  function fit(pts, deg) {
    const n = deg + 1, A = Array.from({ length: n }, () => Array(n + 1).fill(0));
    for (const [xv, yv] of pts) { const p = []; for (let j = 0; j < n; j++) p.push(Math.pow(xv, j)); for (let i = 0; i < n; i++) { for (let j = 0; j < n; j++) A[i][j] += p[i] * p[j]; A[i][n] += p[i] * yv; } }
    for (let i = 0; i < n; i++) A[i][i] += 1e-9;
    for (let c = 0; c < n; c++) {
      let m = c; for (let q = c + 1; q < n; q++) if (Math.abs(A[q][c]) > Math.abs(A[m][c])) m = q;
      [A[c], A[m]] = [A[m], A[c]];
      for (let q = 0; q < n; q++) { if (q === c) continue; const k = A[q][c] / A[c][c]; for (let j = c; j <= n; j++) A[q][j] -= k * A[c][j]; }
    }
    return A.map((row, i) => row[n] / row[i]);
  }
  const ev = (w, xv) => w.reduce((s, c, j) => s + c * Math.pow(xv, j), 0);
  const mse = (w, pts) => pts.reduce((s, [xv, yv]) => s + (ev(w, xv) - yv) ** 2, 0) / pts.length;
  const FITS = [];
  for (let d = 1; d <= 11; d++) { const w = fit(tr, d); FITS[d] = { w, tr: mse(w, tr), te: mse(w, te) }; }
  let deg = 1, hovD = null, PE = null;
  const cvF = host.querySelector('[data-c="fit"]'), cvE = host.querySelector('[data-c="err"]'), tip = host.querySelector(".tip"), rg = host.querySelector("input");
  const fe = v => v < 0.001 ? "< 0,001" : nfx(v, v < 0.1 ? 3 : 2);
  function drawFit() {
    const { x, w, h } = prep(cvF, 240);
    const P = { l: 34, r: 12, t: 10, b: 24, w, h };
    P.sx = v => P.l + (v + 1.08) / 2.16 * (w - P.l - P.r);
    P.sy = v => h - P.b - (v + 2.4) / 4.8 * (h - P.t - P.b);
    axes(x, P, [-1, -.5, 0, .5, 1], [-2, -1, 0, 1, 2], v => minus(v === 0 ? "0" : nfx(v, Number.isInteger(v) ? 0 : 1)), v => minus(v));
    const surf = cssv("--surface"), s1 = cssv("--s1"), s2 = cssv("--s2");
    x.save(); x.beginPath(); x.rect(P.l, P.t, w - P.l - P.r, h - P.t - P.b); x.clip();
    te.forEach(([a, b]) => mark(x, "square", P.sx(a), P.sy(b), 3.6, s2, null, true));
    x.beginPath();
    const W = FITS[deg].w;
    for (let i = 0; i <= 300; i++) { const xv = -1.08 + 2.16 * i / 300; const yv = clamp(ev(W, xv), -50, 50); const px = P.sx(xv), py = P.sy(yv); i ? x.lineTo(px, py) : x.moveTo(px, py); }
    x.strokeStyle = cssv("--ink"); x.lineWidth = 2; x.stroke();
    tr.forEach(([a, b]) => mark(x, "circle", P.sx(a), P.sy(b), 5, s1, surf));
    x.restore();
  }
  function drawErr() {
    const { x, w, h } = prep(cvE, 190);
    const P = { l: 44, r: 16, t: 12, b: 24, w, h }; PE = P;
    const LO = -3, HI = Math.log10(50);
    P.sx = d => P.l + (d - 1) / 10 * (w - P.l - P.r);
    P.sy = v => h - P.b - (Math.log10(Math.max(v, 1e-3)) - LO) / (HI - LO) * (h - P.t - P.b);
    x.fillStyle = cssv("--accent-soft"); const bw = (w - P.l - P.r) / 10;
    x.fillRect(P.sx(deg) - bw / 2, P.t, bw, h - P.t - P.b);
    axes(x, P, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0.001, 0.01, 0.1, 1, 10], String, v => v >= 1 ? String(v) : nfx(v, String(v).split(".")[1].length));
    const surf = cssv("--surface");
    [["tr", "--s1", "circle"], ["te", "--s2", "square"]].forEach(([k, c, sh]) => {
      const col = cssv(c); x.beginPath();
      for (let d = 1; d <= 11; d++) { const px = P.sx(d), py = P.sy(FITS[d][k]); d > 1 ? x.lineTo(px, py) : x.moveTo(px, py); }
      x.strokeStyle = col; x.lineWidth = 2; x.stroke();
      for (let d = 1; d <= 11; d++) mark(x, sh, P.sx(d), P.sy(FITS[d][k]), d === deg || d === hovD ? 5.5 : 4, col, surf);
    });
    x.fillStyle = cssv("--ink-2"); x.font = "11px " + FONT_UI; x.textAlign = "right"; x.textBaseline = "bottom";
    x.fillText("nouvelles données", P.sx(10) - 8, P.sy(FITS[10].te) - 4);
    x.textBaseline = "bottom"; x.fillText("entraînement", P.sx(10) - 8, P.sy(FITS[10].tr) - 6);
      }
  function out() {
    const F = FITS[deg];
    host.querySelector("[data-o=tr]").textContent = fe(F.tr);
    host.querySelector("[data-o=te]").textContent = fe(F.te);
    host.querySelector("[data-o=dg]").textContent = deg <= 2 ? "sous-apprentissage" : F.te > 3 * F.tr + 0.05 && F.te > 0.12 ? "surapprentissage" : "bonne généralisation";
    host.querySelector(".val").textContent = deg;
  }
  const setDeg = d => { deg = d; rg.value = d; drawFit(); drawErr(); out(); };
  rg.addEventListener("input", () => setDeg(+rg.value));
  const pickD = e => { const b = cvE.getBoundingClientRect(); const mx = e.clientX - b.left; return clamp(Math.round((mx - PE.l) / (PE.w - PE.l - PE.r) * 10) + 1, 1, 11); };
  cvE.addEventListener("pointermove", e => {
    if (!PE) return; const d = pickD(e);
    if (d !== hovD) { hovD = d; drawErr(); }
    tipAt(tip, PE.sx(d), PE.t + 18, `Degré ${d} · entraînement ${fe(FITS[d].tr)} · nouvelles ${fe(FITS[d].te)}`);
  });
  cvE.addEventListener("pointerleave", () => { hovD = null; tip.hidden = true; drawErr(); });
  cvE.addEventListener("click", e => { if (PE) setDeg(pickD(e)); });
  register(cvF, drawFit); register(cvE, drawErr); out();
};

/* --- 4. k-means pas à pas --- */
DEMO.kmeans = host => {
  host.innerHTML = `<div class="demo">
<div class="ctrls"><span class="note">Nombre de groupes :</span><button type="button" class="chip" data-k="2" aria-pressed="false">k = 2</button><button type="button" class="chip" data-k="3" aria-pressed="true">k = 3</button></div>
<div class="legend" data-leg></div>
<div class="cv-wrap"><canvas role="img" aria-label="Points à regrouper et centres de k-means"></canvas><div class="tip" hidden></div></div>
<div class="ctrls"><button type="button" class="btn primary small" data-step>Étape suivante</button><button type="button" class="btn small" data-run>Aller jusqu'au bout</button><button type="button" class="btn ghost small" data-init>Nouvelle initialisation</button></div>
<div class="readout"><div><span>étape</span><b data-o="n"></b></div><div><span>prochaine action</span><b data-o="nx" style="font-family:var(--f-display);font-weight:600"></b></div><div><span>inertie</span><b data-o="in"></b></div></div>
<p class="msg" aria-live="polite"></p></div>`;
  const r0 = rng(9), pts = [];
  [[.25, .3], [.75, .3], [.5, .76]].forEach(([cx, cy]) => { for (let i = 0; i < 16; i++) pts.push([clamp(cx + gauss(r0) * .08, .03, .97), clamp(cy + gauss(r0) * .08, .03, .97)]); });
  const SH = ["circle", "square", "triangle"], CV = ["--s1", "--s2", "--s3"];
  let k = 3, seed = 3, C = [], A = null, prevC = null, nxt = "assign", n = 0, conv = false, P = null, hov = null, msgTxt = "";
  const cv = host.querySelector("canvas"), tip = host.querySelector(".tip");
  const d2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
  const nearest = p => { let bj = 0, bd = Infinity; C.forEach((c, j) => { const d = d2(p, c); if (d < bd) { bd = d; bj = j; } }); return bj; };
  const inertia = () => A ? pts.reduce((s, p, i) => s + d2(p, C[A[i]]), 0) : null;
  function init() {
    const r = rng(seed * 7919 + k), idx = new Set();
    while (idx.size < k) idx.add(Math.floor(r() * pts.length));
    C = [...idx].map(i => pts[i].slice()); A = null; prevC = null; nxt = "assign"; n = 0; conv = false;
    msgTxt = `${k} centres placés au hasard sur des points existants. Prochaine étape : assigner chaque point au centre le plus proche.`;
    legend(); draw(); out();
  }
  function step() {
    if (conv) return;
    if (nxt === "assign") {
      const nA = pts.map(nearest); const changed = !A || nA.some((a, i) => a !== A[i]); const moved = A ? nA.filter((a, i) => a !== A[i]).length : pts.length;
      A = nA; n++; prevC = null; nxt = "recenter";
      if (!changed) { conv = true; msgTxt = `Aucun point n'a changé de groupe : l'algorithme a convergé en ${n} étapes.`; }
      else msgTxt = n === 1 ? "Assignation : chaque point prend la couleur et la forme du centre le plus proche." : `Assignation : ${moved} point${moved > 1 ? "s changent" : " change"} de groupe.`;
    } else {
      prevC = C.map(c => c.slice());
      C = C.map((c, j) => { const mem = pts.filter((p, i) => A[i] === j); if (!mem.length) return c; return [mem.reduce((s, p) => s + p[0], 0) / mem.length, mem.reduce((s, p) => s + p[1], 0) / mem.length]; });
      n++; nxt = "assign"; msgTxt = "Recentrage : chaque centre se déplace à la moyenne de ses points (le trait pointillé montre le déplacement).";
    }
    draw(); out();
  }
  function legend() {
    host.querySelector("[data-leg]").innerHTML = Array.from({ length: k }, (_, j) => `<span>${legendSvg(SH[j], `var(${CV[j]})`)}Groupe ${j + 1}</span>`).join("") + `<span><svg viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="4.5" style="fill:none;stroke:var(--ink);stroke-width:2"/></svg>Centre</span>`;
  }
  function draw() {
    const cw = cv.clientWidth || 300; const hh = Math.round(clamp(cw * 0.66, 240, 340));
    const { x, w, h } = prep(cv, hh);
    const side = Math.min(w - 16, h - 16), ox = (w - side) / 2, oy = (h - side) / 2;
    P = { sx: v => ox + v * side, sy: v => oy + (1 - v) * side };
    x.strokeStyle = cssv("--grid"); x.lineWidth = 1;
    for (let i = 0; i <= 4; i++) { const a = ox + side * i / 4, b = oy + side * i / 4; x.beginPath(); x.moveTo(a + .5, oy); x.lineTo(a + .5, oy + side); x.stroke(); x.beginPath(); x.moveTo(ox, b + .5); x.lineTo(ox + side, b + .5); x.stroke(); }
    const surf = cssv("--surface"), muted = cssv("--muted"), ink = cssv("--ink");
    pts.forEach((p, i) => { const px = P.sx(p[0]), py = P.sy(p[1]); if (!A) mark(x, "circle", px, py, 4.5, muted, surf); else mark(x, SH[A[i]], px, py, 4.8, cssv(CV[A[i]]), surf); });
    if (hov && hov.t === "p") mark(x, "circle", P.sx(hov.p[0]), P.sy(hov.p[1]), 8, "rgba(0,0,0,0)", ink);
    if (prevC) { x.setLineDash([4, 3]); x.strokeStyle = cssv("--ink-2"); x.lineWidth = 1.5; prevC.forEach((c, j) => { x.beginPath(); x.moveTo(P.sx(c[0]), P.sy(c[1])); x.lineTo(P.sx(C[j][0]), P.sy(C[j][1])); x.stroke(); }); x.setLineDash([]); }
    C.forEach((c, j) => {
      const px = P.sx(c[0]), py = P.sy(c[1]);
      x.beginPath(); x.arc(px, py, 10, 0, Math.PI * 2); x.fillStyle = surf; x.fill(); x.lineWidth = 3; x.strokeStyle = cssv(CV[j]); x.stroke();
      x.beginPath(); x.arc(px, py, 12.5, 0, Math.PI * 2); x.lineWidth = 1.5; x.strokeStyle = ink; x.stroke();
      x.fillStyle = ink; x.font = "600 11px " + FONT_MONO; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(String(j + 1), px, py + .5);
    });
  }
  function out() {
    host.querySelector("[data-o=n]").textContent = n;
    host.querySelector("[data-o=nx]").textContent = conv ? "terminé" : nxt === "assign" ? "assigner" : "recentrer";
    const I = inertia(); host.querySelector("[data-o=in]").textContent = I == null ? "—" : nfx(I, 3);
    host.querySelector(".msg").textContent = msgTxt;
    host.querySelector("[data-step]").disabled = conv; host.querySelector("[data-run]").disabled = conv;
  }
  host.querySelector("[data-step]").addEventListener("click", step);
  host.querySelector("[data-run]").addEventListener("click", () => { let g = 0; while (!conv && g++ < 60) step(); });
  host.querySelector("[data-init]").addEventListener("click", () => { seed++; init(); });
  host.querySelectorAll("[data-k]").forEach(b => b.addEventListener("click", () => { k = +b.dataset.k; host.querySelectorAll("[data-k]").forEach(o => o.setAttribute("aria-pressed", String(o === b))); init(); }));
  cv.addEventListener("pointermove", e => {
    if (!P) return; const b = cv.getBoundingClientRect(); const mx = e.clientX - b.left, my = e.clientY - b.top;
    let best = null, bd = 14 * 14;
    C.forEach((c, j) => { const d = (P.sx(c[0]) - mx) ** 2 + (P.sy(c[1]) - my) ** 2; if (d < bd) { bd = d; best = { t: "c", j, p: c }; } });
    if (!best) pts.forEach((p, i) => { const d = (P.sx(p[0]) - mx) ** 2 + (P.sy(p[1]) - my) ** 2; if (d < bd) { bd = d; best = { t: "p", i, p }; } });
    const changed = (best && best.p) !== (hov && hov.p); hov = best; if (changed) draw();
    if (!best) { tip.hidden = true; return; }
    const label = best.t === "c" ? `Centre ${best.j + 1}` : A ? `Point du groupe ${A[best.i] + 1}` : "Point pas encore assigné";
    tipAt(tip, P.sx(best.p[0]), P.sy(best.p[1]) - 8, label);
  });
  cv.addEventListener("pointerleave", () => { hov = null; tip.hidden = true; draw(); });
  register(cv, draw); init();
};

/* --- 5. Dérivée = pente de la tangente --- */
DEMO.tangent = host => {
  const id = "tg-x-" + (host.dataset.key || "1");
  host.innerHTML = `<div class="demo">
<div class="legend"><span>${legendSvg("line", "var(--ink-2)")}Courbe f(x) = 0,5(x − 2)² + 1</span><span>${legendSvg("line", "var(--accent)")}Tangente au point choisi</span></div>
<div class="cv-wrap"><canvas role="img" aria-label="Courbe en U avec la tangente au point choisi"></canvas></div>
<div class="ctrls"><label class="rng" for="${id}">Position x <input type="range" id="${id}" min="-1.5" max="5.5" step="0.05" value="-0.5"><span class="val"></span></label></div>
<div class="readout"><div><span>x</span><b data-o="x"></b></div><div><span>f(x)</span><b data-o="f"></b></div><div><span>pente f′(x) = x − 2</span><b data-o="d"></b></div><div><span>la courbe</span><b data-o="s" style="font-family:var(--f-display);font-weight:600"></b></div></div>
<p class="note">Fais glisser le curseur, ou touche la courbe pour déplacer le point.</p></div>`;
  const f = x => 0.5 * (x - 2) ** 2 + 1, d = x => x - 2;
  const X0 = -2, X1 = 6, Y1 = 10;
  let xv = -0.5, P = null, drag = false;
  const cv = host.querySelector("canvas"), rg = host.querySelector("input");
  function draw() {
    const { x, w, h } = prep(cv, 240);
    P = { l: 34, r: 12, t: 12, b: 26, w, h };
    P.sx = v => P.l + (v - X0) / (X1 - X0) * (w - P.l - P.r);
    P.sy = v => h - P.b - v / Y1 * (h - P.t - P.b);
    axes(x, P, [-2, 0, 2, 4, 6], [0, 2, 4, 6, 8, 10], v => minus(v), String);
    x.setLineDash([3, 3]); x.strokeStyle = cssv("--axis"); x.beginPath(); x.moveTo(P.sx(2), P.t); x.lineTo(P.sx(2), h - P.b); x.stroke(); x.setLineDash([]);
    x.fillStyle = cssv("--muted"); x.font = "11px " + FONT_UI; x.textAlign = "left"; x.textBaseline = "top"; x.fillText("minimum, x = 2", P.sx(2) + 5, P.t);
    x.save(); x.beginPath(); x.rect(P.l, P.t, w - P.l - P.r, h - P.t - P.b); x.clip();
    x.beginPath();
    for (let i = 0; i <= 200; i++) { const v = X0 + (X1 - X0) * i / 200; const px = P.sx(v), py = P.sy(f(v)); i ? x.lineTo(px, py) : x.moveTo(px, py); }
    x.strokeStyle = cssv("--ink-2"); x.lineWidth = 2; x.stroke();
    const acc = cssv("--accent"), y0 = f(xv), s = d(xv), a = xv - 1.6, b = xv + 1.6;
    x.beginPath(); x.moveTo(P.sx(a), P.sy(y0 + s * (a - xv))); x.lineTo(P.sx(b), P.sy(y0 + s * (b - xv)));
    x.strokeStyle = acc; x.lineWidth = 2; x.stroke();
    x.restore();
    mark(x, "circle", P.sx(xv), P.sy(y0), 6.5, acc, cssv("--surface"));
  }
  function out() {
    const s = d(xv);
    host.querySelector("[data-o=x]").textContent = minus(nfx(xv, 2));
    host.querySelector("[data-o=f]").textContent = nfx(f(xv), 2);
    host.querySelector("[data-o=d]").textContent = minus(nfx(s, 2));
    host.querySelector("[data-o=s]").textContent = s > 0.02 ? "monte" : s < -0.02 ? "descend" : "est plate : minimum";
    host.querySelector(".val").textContent = minus(nfx(xv, 2));
  }
  const setX = v => { xv = Math.round(clamp(v, -1.5, 5.5) * 20) / 20; rg.value = xv; draw(); out(); };
  rg.addEventListener("input", () => setX(+rg.value));
  const fromEvent = e => { if (!P) return; const r = cv.getBoundingClientRect(); setX(X0 + (e.clientX - r.left - P.l) / (P.w - P.l - P.r) * (X1 - X0)); };
  cv.addEventListener("pointerdown", e => { drag = true; fromEvent(e); });
  cv.addEventListener("pointermove", e => { if (drag) fromEvent(e); });
  ["pointerup", "pointerleave", "pointercancel"].forEach(t => cv.addEventListener(t, () => { drag = false; }));
  register(cv, draw); out();
};

/* --- 6. Sigmoïde --- */
DEMO.sigmoid = host => {
  const id = "sg-z-" + (host.dataset.key || "1");
  host.innerHTML = `<div class="demo">
<div class="cv-wrap"><canvas role="img" aria-label="Courbe de la sigmoïde σ(z), avec le point choisi"></canvas></div>
<div class="ctrls"><label class="rng" for="${id}">Score z <input type="range" id="${id}" min="-6" max="6" step="0.1" value="2"><span class="val"></span></label></div>
<div class="readout"><div><span>z</span><b data-o="z"></b></div><div><span>e^(−z)</span><b data-o="e"></b></div><div><span>σ(z) = 1 / (1 + e^(−z))</span><b data-o="s"></b></div><div><span>classe prédite (seuil 0,5)</span><b data-o="c" style="font-family:var(--f-display);font-weight:600"></b></div></div></div>`;
  const sg = z => 1 / (1 + Math.exp(-z));
  let zv = 2;
  const cv = host.querySelector("canvas"), rg = host.querySelector("input");
  function draw() {
    const { x, w, h } = prep(cv, 220);
    const P = { l: 40, r: 12, t: 12, b: 26, w, h };
    P.sx = v => P.l + (v + 6.5) / 13 * (w - P.l - P.r);
    P.sy = v => h - P.b - v * (h - P.t - P.b);
    axes(x, P, [-6, -4, -2, 0, 2, 4, 6], [0, 0.5, 1], v => minus(v), v => v === 0.5 ? "0,5" : String(v));
    x.setLineDash([3, 3]); x.strokeStyle = cssv("--axis"); x.beginPath(); x.moveTo(P.l, P.sy(0.5)); x.lineTo(w - P.r, P.sy(0.5)); x.stroke();
    x.beginPath(); x.moveTo(P.sx(zv), P.sy(sg(zv))); x.lineTo(P.sx(zv), h - P.b); x.stroke(); x.setLineDash([]);
    x.beginPath();
    for (let i = 0; i <= 200; i++) { const v = -6.5 + 13 * i / 200; const px = P.sx(v), py = P.sy(sg(v)); i ? x.lineTo(px, py) : x.moveTo(px, py); }
    x.strokeStyle = cssv("--ink-2"); x.lineWidth = 2; x.stroke();
    mark(x, "circle", P.sx(zv), P.sy(sg(zv)), 6.5, cssv("--accent"), cssv("--surface"));
  }
  function out() {
    const s = sg(zv), e = Math.exp(-zv);
    host.querySelector("[data-o=z]").textContent = minus(nfx(zv, 1));
    host.querySelector("[data-o=e]").textContent = e >= 100 ? nfx(e, 0) : nfx(e, 3);
    host.querySelector("[data-o=s]").textContent = nfx(s, 3);
    host.querySelector("[data-o=c]").textContent = s >= 0.5 ? "classe 1" : "classe 0";
    host.querySelector(".val").textContent = minus(nfx(zv, 1));
  }
  rg.addEventListener("input", () => { zv = +rg.value; draw(); out(); });
  register(cv, draw); out();
};

return DEMO;
})();
