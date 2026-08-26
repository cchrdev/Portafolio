// src/game/companion.js
// El gato compañero: pasea solo por la página (espacio de viewport),
// reacciona al scroll con inercia, mira al cursor y responde a clics.
// El fondo (estratos con parallax + motas) va en un canvas separado
// detrás del contenido; el gato, en uno por encima.

import { createCatVisual } from "./cat.js";
import { createScenery } from "./scenery.js";

const FLOOR_PAD = 22; // distancia de los pies al borde inferior (deja sitio al halo)

export function createCompanion({ reduceMotion = false } = {}) {
  const catVisual = createCatVisual({ reduceMotion });
  const scenery = createScenery({
    reduceMotion,
    maxDepth: 16000,
    spanX: { x1: -900, x2: 3100 },
  });
  const { particles } = scenery;

  const cat = {
    x: 140,
    y: 0,
    vx: 0,
    vy: 0,
    dir: 1,
    state: "idle",
    walkPhase: 0,
    squash: 0,
    look: null,
  };

  let initialized = false;
  let action = { type: "idle", until: 2.5, targetX: 0 };
  let lift = 0; // elevación sobre el suelo por inercia de scroll
  let peakLift = 0;
  let airborne = false;
  let zzzT = 0;
  let startleT = 0; // pequeño respingo al hacerle clic

  function newAction(view, pointer) {
    const r = Math.random();
    if (r < 0.55) {
      // paseo a un punto aleatorio (a veces cerca del cursor, curioso)
      let tx;
      if (pointer && Math.random() < 0.3) {
        tx = pointer.x + (Math.random() - 0.5) * 120;
      } else {
        tx = 40 + Math.random() * (view.w - 80);
      }
      action = {
        type: "walk",
        targetX: Math.max(36, Math.min(view.w - 36, tx)),
        until: 12,
      };
    } else if (r < 0.8 && pointer) {
      action = { type: "watch", until: 2.5 + Math.random() * 3 };
    } else {
      action = { type: "idle", until: 2 + Math.random() * 5 };
    }
  }

  /**
   * frame: {
   *   dt, t,
   *   view: { cssW, cssH, dpr, w, h },
   *   scrollY,
   *   scrollVel,      // px/s suavizado (el caller lo calcula)
   *   pointer,        // {x,y} viewport | null
   *   userIdleT,      // segundos sin interacción (scroll/cursor/clic)
   * }
   */
  function update(frame) {
    const { dt, view, scrollVel, pointer, userIdleT } = frame;
    const floorY = view.h - FLOOR_PAD;

    if (!initialized) {
      initialized = true;
      cat.x = Math.min(160, view.w * 0.2);
      cat.y = floorY;
      cat.floorY = floorY;
    }

    // ---- inercia de scroll: la página se mueve, el gato "flota" ----
    const targetLift = reduceMotion
      ? 0
      : Math.min(110, Math.abs(scrollVel) * 0.055);
    lift += (targetLift - lift) * Math.min(1, dt * (targetLift > lift ? 10 : 4));
    peakLift = Math.max(peakLift, lift);
    cat.vy = scrollVel * 0.25;

    const nowAirborne = lift > 4;
    if (nowAirborne) {
      airborne = true;
      cat.state =
        Math.abs(scrollVel) > 2400
          ? "dive"
          : scrollVel >= 0
            ? "fall"
            : "rise";
      cat.vx *= Math.pow(0.05, dt); // en el aire no camina
    } else if (airborne) {
      // aterriza
      airborne = false;
      if (peakLift > 26) {
        cat.squash = Math.min(1, peakLift / 130 + 0.3);
        particles.burst(cat.x, floorY, Math.round(4 + peakLift / 14), {
          speed: 40 + peakLift * 1.4,
          size: 1.8,
        });
      }
      peakLift = 0;
    }
    cat.y = floorY - lift;
    cat.floorY = floorY;

    // ---- respingo por clic ----
    if (startleT > 0) startleT -= dt;

    // ---- IA de paseo (solo en el suelo) ----
    if (!nowAirborne && startleT <= 0) {
      if (userIdleT > 30) {
        cat.state = "sleep";
        cat.vx = 0;
      } else {
        action.until -= dt;
        if (action.type === "walk") {
          const dx = action.targetX - cat.x;
          if (Math.abs(dx) < 8 || action.until <= 0) {
            newAction(view, pointer);
          } else {
            const speed = 78 + 34 * Math.sin(cat.x * 0.01); // paso irregular, orgánico
            const tvx = Math.sign(dx) * speed;
            cat.vx += (tvx - cat.vx) * Math.min(1, dt * 6);
            cat.dir = dx < 0 ? -1 : 1;
          }
        } else {
          cat.vx *= Math.pow(0.002, dt);
          if (action.until <= 0) newAction(view, pointer);
        }
        cat.x += cat.vx * dt;
        cat.x = Math.max(30, Math.min(view.w - 30, cat.x));
        if (Math.abs(cat.vx) > 25) {
          cat.state = "walk";
          cat.walkPhase += Math.abs(cat.vx) * dt * 0.09;
        } else {
          cat.state = "idle";
        }
      }
    }

    // ---- mirada: sigue al cursor cuando no camina ----
    if (
      pointer &&
      cat.state !== "sleep" &&
      cat.state !== "walk" &&
      !nowAirborne
    ) {
      cat.look = {
        x: (pointer.x - cat.x) / 180,
        y: (pointer.y - (cat.y - 54)) / 180,
      };
    } else {
      cat.look = null;
    }

    // ---- zzz ----
    if (cat.state === "sleep") {
      zzzT += dt;
      if (zzzT > 1.3) {
        zzzT = 0;
        particles.push({
          x: cat.x + cat.dir * 18,
          y: cat.y - 85,
          vx: cat.dir * 7,
          vy: -16,
          life: 2,
          size: 11,
          text: "z",
        });
      }
    }

    cat.squash *= Math.pow(0.0002, dt);
  }

  // fondo con parallax sutil (canvas trasero, detrás del contenido)
  function drawBackdrop(ctx, frame) {
    const { view, scrollY, dt } = frame;
    const S = view.dpr;

    ctx.setTransform(S, 0, 0, S, 0, 0);
    ctx.fillStyle = "#050506";
    ctx.fillRect(0, 0, view.cssW, view.cssH);

    ctx.setTransform(S, 0, 0, S, 0, -scrollY * 0.42 * S);
    scenery.drawStrata(ctx, scrollY * 0.42, view);

    ctx.setTransform(S, 0, 0, S, 0, -scrollY * 0.72 * S);
    scenery.drawCracks(ctx, scrollY * 0.72, view);

    ctx.setTransform(S, 0, 0, S, 0, -scrollY * S);
    scenery.drawMotes(
      ctx,
      scrollY,
      view,
      { x1: 20, x2: view.w - 20 },
      Math.abs(frame.scrollVel) > 900 ? 3 : 1,
      dt
    );
  }

  // el gato y sus partículas (canvas frontal, por encima del contenido)
  const CAT_SCALE = 1.9; // minimalista: el gato dibuja pequeño y se amplía aquí

  function drawCat(ctx, frame) {
    const { view, dt, t } = frame;
    const S = view.dpr;
    ctx.setTransform(S, 0, 0, S, 0, 0);
    ctx.clearRect(0, 0, view.cssW, view.cssH);
    // escala alrededor de las patas para que el gato quede anclado al suelo
    ctx.setTransform(
      S * CAT_SCALE,
      0,
      0,
      S * CAT_SCALE,
      cat.x * S * (1 - CAT_SCALE),
      cat.y * S * (1 - CAT_SCALE)
    );
    catVisual.update(cat, dt, t);
    catVisual.draw(ctx, cat);
    particles.updateDraw(ctx, dt);
  }

  // ¿el punto (viewport) cae sobre el gato?
  function hitTest(px, py) {
    return Math.hypot(px - cat.x, py - (cat.y - 36)) < 62;
  }

  // reacción al clic; devuelve "wake" si estaba dormido
  function poke() {
    const wasAsleep = cat.state === "sleep";
    startleT = 0.35;
    cat.squash = -0.45; // se estira, sorprendido
    particles.burst(cat.x, cat.y - 50, 4, {
      speed: 48,
      size: 1.4,
      life: 0.4,
      grav: -40,
    });
    if (wasAsleep) cat.state = "idle";
    action = { type: "watch", until: 3 }; // tras el susto, te observa
    return wasAsleep ? "wake" : "poke";
  }

  return { update, drawBackdrop, drawCat, hitTest, poke, cat };
}
