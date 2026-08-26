// src/game/scenery.js
// Escenario procedural compartido: estratos, grietas, rocas, motas,
// partículas y niebla. Determinista (misma cueva en cada visita).

import { FONT } from "./cat.js";

export function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * @param maxDepth profundidad total del mundo (unidades)
 * @param spanX    rango horizontal donde generar decoración
 */
export function createScenery({
  reduceMotion = false,
  seed = 20240117,
  maxDepth = 2600,
  spanX = { x1: -800, x2: 2200 },
} = {}) {
  const rnd = mulberry32(seed);
  const spanW = spanX.x2 - spanX.x1;

  // capa lejana (f≈0.42): estratos de roca
  const strata = [];
  for (let y = -300; y < maxDepth * 0.45 + 1200; y += 46 + rnd() * 70) {
    const cx = spanX.x1 + rnd() * spanW;
    strata.push({ y, x1: cx - 90 - rnd() * 380, x2: cx + 90 + rnd() * 380 });
  }

  // capa media (f≈0.72): grietas y marcas
  const cracks = [];
  const nCracks = Math.round((maxDepth * 0.75 + 800) / 14);
  for (let i = 0; i < nCracks; i++) {
    cracks.push({
      x: spanX.x1 + rnd() * spanW,
      y: 40 + rnd() * (maxDepth * 0.75 + 700),
      len: 8 + rnd() * 26,
      ang: rnd() * 0.7 - 0.35 + (rnd() > 0.5 ? 0 : Math.PI / 2),
    });
  }

  // capa cercana (f≈1.15): siluetas de roca en los bordes
  // fx: fracción horizontal (0 = borde izq, 1 = borde der) resuelta al dibujar
  const nearRocks = [];
  for (let y = 260; y < maxDepth * 1.15 + 600; y += 210 + rnd() * 240) {
    const side = rnd() > 0.5 ? -1 : 1;
    const w = (60 + rnd() * 120) * side;
    const h = 90 + rnd() * 150;
    const off = 20 + rnd() * 60;
    const pts = [[0, 0]];
    const n = 4 + Math.floor(rnd() * 3);
    for (let i = 1; i <= n; i++) {
      pts.push([(w * i) / n + (rnd() - 0.5) * 24, h * (0.2 + rnd() * 0.6)]);
    }
    pts.push([w, h]);
    pts.push([0, h]);
    nearRocks.push({ side, y, off, pts });
  }

  // motas de polvo (fx normalizado para adaptarse al ancho del viewport)
  const motes = [];
  if (!reduceMotion) {
    for (let i = 0; i < 56; i++) {
      motes.push({
        fx: rnd(),
        y: rnd() * (maxDepth + 100),
        r: 0.4 + rnd() * 1.3,
        v: 7 + rnd() * 16,
      });
    }
  }

  // ---------- partículas ----------
  const particles = [];
  function burst(x, y, n, opts = {}) {
    for (let i = 0; i < n; i++) {
      const a = opts.ring
        ? (i / n) * Math.PI * 2
        : Math.PI + (Math.random() - 0.5) * 2.4;
      const sp = (opts.speed || 60) * (0.4 + Math.random() * 0.9);
      particles.push({
        x,
        y,
        vx: Math.cos(a) * sp * (opts.ring ? 1 : Math.random() < 0.5 ? 1 : -1),
        vy: opts.ring ? Math.sin(a) * sp : -Math.abs(Math.sin(a)) * sp,
        life: opts.life || 0.55,
        max: opts.life || 0.55,
        size: opts.size || 1.6,
        grav: opts.grav ?? 300,
        color: opts.color || "#edece6",
        text: opts.text || null,
      });
    }
  }
  function push(p) {
    particles.push({ max: p.life, grav: 0, ...p });
  }
  function updateDrawParticles(ctx, dt) {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life -= dt;
      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      p.vy += p.grav * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      const a = p.life / p.max;
      if (p.text) {
        ctx.fillStyle = `rgba(139,138,128,${a})`;
        ctx.font = `500 ${p.size}px ${FONT}`;
        ctx.textAlign = "left";
        ctx.fillText(p.text, p.x, p.y);
      } else {
        ctx.globalAlpha = a;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        ctx.globalAlpha = 1;
      }
    }
  }

  // ---------- dibujo de capas ----------
  function drawStrata(ctx, layerCamY, view) {
    ctx.strokeStyle = "#121217";
    ctx.lineWidth = 1;
    ctx.beginPath();
    const y0 = layerCamY - 40;
    const y1 = layerCamY + view.h + 40;
    for (const s of strata) {
      if (s.y < y0 || s.y > y1) continue;
      ctx.moveTo(s.x1, s.y);
      ctx.lineTo(s.x2, s.y);
    }
    ctx.stroke();
  }

  function drawCracks(ctx, layerCamY, view) {
    ctx.strokeStyle = "#1a1a20";
    ctx.lineWidth = 1;
    ctx.beginPath();
    const y0 = layerCamY - 40;
    const y1 = layerCamY + view.h + 40;
    for (const c of cracks) {
      if (c.y < y0 || c.y > y1) continue;
      ctx.moveTo(c.x, c.y);
      ctx.lineTo(c.x + Math.cos(c.ang) * c.len, c.y + Math.sin(c.ang) * c.len);
    }
    ctx.stroke();
  }

  // bounds: {x1,x2} bordes donde anclar las rocas.
  // inward: true = las rocas asoman hacia DENTRO desde los bordes
  // (escena de scroll a sangre completa); false = cuelgan hacia fuera
  // de las paredes (modo juego, donde hay margen visible).
  function drawNearRocks(ctx, layerCamY, view, bounds, inward = false) {
    const y0 = layerCamY - 300;
    const y1 = layerCamY + view.h + 300;
    for (const r of nearRocks) {
      if (r.y < y0 || r.y > y1) continue;
      let bx;
      let mx = 1;
      if (inward) {
        bx = r.side < 0 ? bounds.x1 - 6 : bounds.x2 + 6;
        mx = -1; // espeja la silueta para que entre en pantalla
      } else {
        bx = r.side < 0 ? bounds.x1 - r.off : bounds.x2 + r.off;
      }
      ctx.fillStyle = "#060608";
      ctx.strokeStyle = "#1c1c22";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      r.pts.forEach(([x, y], i) =>
        i ? ctx.lineTo(bx + x * mx, r.y + y) : ctx.moveTo(bx + x * mx, r.y + y)
      );
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }

  function drawMotes(ctx, camY, view, bounds, boost, dt) {
    if (reduceMotion) return;
    ctx.fillStyle = "rgba(237,236,230,.25)";
    for (const m of motes) {
      m.y -= m.v * dt * boost;
      if (m.y < camY - 20) m.y = camY + view.h + 20;
      if (m.y > camY + view.h + 40) m.y = camY - 10;
      ctx.fillRect(bounds.x1 + m.fx * (bounds.x2 - bounds.x1), m.y, m.r, m.r);
    }
  }

  // en espacio de pantalla (transform = dpr)
  function drawFog(ctx, view, depthFrac) {
    if (depthFrac > 0.02) {
      ctx.fillStyle = `rgba(0,0,0,${Math.min(1, depthFrac) * 0.16})`;
      ctx.fillRect(0, 0, view.cssW, view.cssH);
    }
    const vg = ctx.createLinearGradient(0, 0, 0, view.cssH);
    vg.addColorStop(0, "rgba(0,0,0,.34)");
    vg.addColorStop(0.2, "rgba(0,0,0,0)");
    vg.addColorStop(0.82, "rgba(0,0,0,0)");
    vg.addColorStop(1, "rgba(0,0,0,.38)");
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, view.cssW, view.cssH);
  }

  return {
    drawStrata,
    drawCracks,
    drawNearRocks,
    drawMotes,
    drawFog,
    particles: { burst, push, updateDraw: updateDrawParticles },
  };
}
