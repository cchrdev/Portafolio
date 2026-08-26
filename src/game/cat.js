// src/game/cat.js
// El gato: poses interpoladas, cola con física de cadena, parpadeo y mirada.
// La cabeza es — literalmente — el icono del logo (CatMark): misma silueta
// contorneada, mismos ojos y nariz en hueso. El cuerpo es una pera suave
// (cuello angosto, grupa ancha, panza recogida) con patas cortas y cola.

export const INK = "#e9e9e7";
export const FONT =
  "'Terminus', 'Cascadia Mono', Consolas, ui-monospace, monospace";

// Silueta del logo: la cabeza del gato (idéntica al <path> de CatMark)
const HEAD = new Path2D(
  "M20,80 L20,40 L10,20 L40,35 L50,30 L60,35 L90,20 L80,40 L80,80 Z"
);
// Ojos y nariz del icono, en coordenadas del logo (0..100)
const EYE_L = { x: 35, y: 55 };
const EYE_R = { x: 65, y: 55 };
const EYE_RADIUS = 2.6; // un pelín mayor que el icono para que se lean a escala
const NOSE = [50, 65, 47, 68, 53, 68];

export const shortAngle = (a) => Math.atan2(Math.sin(a), Math.cos(a));

export function createCatVisual({ reduceMotion = false } = {}) {
  const pose = {
    bodyRx: 8.5,
    bodyRy: 9,
    bodyCy: -12,
    headX: 4,
    headY: -48,
    rot: 0,
  };

  const TAIL_N = 7;
  const SEG = 3.4;
  const tail = Array.from({ length: TAIL_N }, () => ({ x: 0, y: 0 }));
  let tailInit = false;

  let blinkT = 0;
  let blinkNext = 2.4;

  function targetPose(cat, t) {
    const sway = reduceMotion ? 0 : Math.sin(t * 3.1) * 0.09;
    switch (cat.state) {
      case "walk": {
        const bob = reduceMotion ? 0 : Math.abs(Math.sin(cat.walkPhase)) * 1.2;
        return {
          bodyRx: 10,
          bodyRy: 7.5,
          bodyCy: -9 - bob,
          headX: 10,
          headY: -42 - bob,
          rot: 0,
        };
      }
      case "fall":
        return {
          bodyRx: 8,
          bodyRy: 10,
          bodyCy: -14,
          headX: 0,
          headY: -48,
          rot: sway,
        };
      case "rise": // asciende (scroll hacia arriba): compacto, cola abajo
        return {
          bodyRx: 8.5,
          bodyRy: 10.5,
          bodyCy: -15,
          headX: 0,
          headY: -50,
          rot: -sway * 0.7,
        };
      case "dive":
        return {
          bodyRx: 7,
          bodyRy: 11,
          bodyCy: -16,
          headX: 0,
          headY: -52,
          rot: 0,
        };
      case "sleep": {
        const breath = reduceMotion ? 0 : Math.sin(t * 1.6) * 0.6;
        return {
          bodyRx: 10,
          bodyRy: 6.5 + breath,
          bodyCy: -7,
          headX: -3,
          headY: -32,
          rot: 0,
        };
      }
      default: {
        // idle: respiración sutil, casi imperceptible
        const breath = reduceMotion ? 0 : Math.sin(t * 1.5) * 0.5;
        const bob = reduceMotion ? 0 : Math.sin(t * 1.5) * 0.35;
        return {
          bodyRx: 8.5,
          bodyRy: 9 + breath,
          bodyCy: -12,
          headX: 4,
          headY: -48 - bob,
          rot: 0,
        };
      }
    }
  }

  function tailAngle(i, cat, t) {
    const w = reduceMotion ? 0 : 1;
    let a;
    switch (cat.state) {
      case "fall":
        a = -Math.PI / 2 - 0.35 + Math.sin(t * 5.5 - i * 0.7) * 0.25 * w;
        break;
      case "rise":
        a = Math.PI / 2 + 0.5 + Math.sin(t * 4 - i * 0.6) * 0.18 * w;
        break;
      case "dive":
        a = -Math.PI / 2 + Math.sin(t * 12 - i) * 0.06 * w;
        break;
      case "walk":
        a = Math.PI - 0.35 + Math.sin(t * 7 - i * 0.55) * 0.18 * w;
        break;
      case "sleep":
        a = Math.PI * 0.8 - i * 0.34;
        break;
      default:
        a =
          Math.PI * 0.86 - i * 0.15 + Math.sin(t * 1.9 + i * 0.45) * 0.09 * w;
    }
    return cat.dir === 1 ? a : Math.PI - a;
  }

  function update(cat, dt, t) {
    // pose suavizada: las transiciones entre estados son continuas
    const tp = targetPose(cat, t);
    const k = Math.min(1, dt * 10);
    pose.bodyRx += (tp.bodyRx - pose.bodyRx) * k;
    pose.bodyRy += (tp.bodyRy - pose.bodyRy) * k;
    pose.bodyCy += (tp.bodyCy - pose.bodyCy) * k;
    pose.headX += (tp.headX - pose.headX) * k;
    pose.headY += (tp.headY - pose.headY) * k;
    pose.rot += shortAngle(tp.rot - pose.rot) * k;

    // cola
    const baseX = cat.x - cat.dir * pose.bodyRx * 0.8;
    const baseY = cat.y + pose.bodyCy + 3;
    if (!tailInit) {
      tail.forEach((p, i) => {
        p.x = baseX - cat.dir * i * SEG;
        p.y = baseY;
      });
      tailInit = true;
    }
    tail[0].x = baseX;
    tail[0].y = baseY;
    const stiff = cat.state === "dive" ? 9 : cat.state === "fall" ? 6 : 4;
    for (let i = 1; i < TAIL_N; i++) {
      const dx = tail[i].x - tail[i - 1].x;
      const dy = tail[i].y - tail[i - 1].y;
      let ang = Math.atan2(dy, dx);
      const target = tailAngle(i, cat, t);
      ang += shortAngle(target - ang) * Math.min(1, dt * stiff);
      tail[i].x = tail[i - 1].x + Math.cos(ang) * SEG;
      tail[i].y = tail[i - 1].y + Math.sin(ang) * SEG;
    }

    // parpadeo
    blinkT += dt;
    if (blinkT > blinkNext) {
      blinkT = 0;
      blinkNext = 2 + Math.random() * 3.5;
    }
  }

  function drawTail(ctx) {
    ctx.strokeStyle = INK;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (let i = 1; i < TAIL_N; i++) {
      ctx.lineWidth = 3.0 - (i / TAIL_N) * 1.8;
      ctx.beginPath();
      ctx.moveTo(tail[i - 1].x, tail[i - 1].y);
      ctx.lineTo(tail[i].x, tail[i].y);
      ctx.stroke();
    }
  }

  // sombra de contacto + halo monocromo: ancla al gato al suelo y lo hace
  // legible sobre cualquier fondo oscuro
  function drawShadow(ctx, cat) {
    if (cat.floorY === undefined) return;
    const lift = Math.max(0, cat.floorY - cat.y);
    const s = Math.max(0.42, 1 - lift / 260);
    const rx = 26 * s;
    // halo de luz suave (el gato brilla sobre el negro)
    const glow = ctx.createRadialGradient(
      cat.x, cat.floorY + 4, 0,
      cat.x, cat.floorY + 4, rx * 1.6
    );
    glow.addColorStop(0, "rgba(233,233,231,0.3)");
    glow.addColorStop(0.5, "rgba(233,233,231,0.09)");
    glow.addColorStop(1, "rgba(233,233,231,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.ellipse(cat.x, cat.floorY + 4, rx * 1.55, 8 * s * 1.55, 0, 0, Math.PI * 2);
    ctx.fill();
    // sombra de contacto oscura
    const a = Math.max(0.1, 0.34 * (1 - lift / 320));
    const g = ctx.createRadialGradient(
      cat.x, cat.floorY + 3, 0,
      cat.x, cat.floorY + 3, rx
    );
    g.addColorStop(0, `rgba(0,0,0,${a.toFixed(3)})`);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(cat.x, cat.floorY + 3, rx, 6 * s, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // cuerpo compacto tipo chibi: pecho redondo delante, grupa redondeada
  // detrás, cintura sutil — pequeño frente a la cabeza (proporción linda)
  function bodyPath(p) {
    const cy = p.bodyCy;
    const rx = p.bodyRx, ry = p.bodyRy;
    const path = new Path2D();
    // nuca (arriba-delante)
    path.moveTo(rx * 0.55, cy - ry * 1.0);
    // pecho: arco redondo hacia delante y abajo
    path.bezierCurveTo(
      rx * 1.05, cy - ry * 0.6,
      rx * 1.1, cy - ry * 0.05,
      rx * 0.9, cy + ry * 0.5
    );
    // panza redondeada (no colgante)
    path.bezierCurveTo(
      rx * 0.6, cy + ry * 0.9,
      rx * 0.05, cy + ry * 1.0,
      -rx * 0.4, cy + ry * 0.9
    );
    // grupa: redonda, moderada
    path.bezierCurveTo(
      -rx * 0.85, cy + ry * 0.8,
      -rx * 1.1, cy + ry * 0.4,
      -rx * 1.05, cy - ry * 0.05
    );
    // lomo: sube cerrando la silueta
    path.bezierCurveTo(
      -rx * 1.0, cy - ry * 0.5,
      -rx * 0.6, cy - ry * 0.9,
      -rx * 0.15, cy - ry * 1.02
    );
    path.bezierCurveTo(
      rx * 0.15, cy - ry * 1.1,
      rx * 0.4, cy - ry * 1.08,
      rx * 0.55, cy - ry * 1.0
    );
    path.closePath();
    return path;
  }

  // patas: 4 apoyos cortos con patita redondeada
  function drawLegs(ctx, cat) {
    const p = pose;
    const legs = cat.state === "sleep"
      ? [ // encogidas bajo el cuerpo
          { x: -p.bodyRx * 0.7, y: -2.5 },
          { x: -p.bodyRx * 0.2, y: -1.5 },
          { x: p.bodyRx * 0.35, y: -1.5 },
          { x: p.bodyRx * 0.8, y: -2.5 },
        ]
      : [
          { x: -p.bodyRx * 0.85, y: 0 },
          { x: -p.bodyRx * 0.3, y: 0 },
          { x: p.bodyRx * 0.45, y: 0 },
          { x: p.bodyRx * 0.95, y: 0 },
        ];
    ctx.strokeStyle = INK;
    ctx.lineCap = "round";
    ctx.lineWidth = 2;
    legs.forEach((l, i) => {
      const walk = cat.state === "walk";
      let lift = 0, off = 0;
      if (walk) {
        const ph = cat.walkPhase + (i % 2 ? 0 : Math.PI);
        lift = Math.max(0, Math.sin(ph)) * 2.2;
        off = Math.sin(ph) * 2.6;
      }
      const fy = l.y + 1 - lift; // pie (y=0 piso)
      const hipY = Math.min(p.bodyCy + p.bodyRy * 0.5, -6);
      ctx.beginPath();
      ctx.moveTo(l.x, hipY);
      ctx.lineTo(l.x + off, fy);
      ctx.stroke();
      // patita
      ctx.beginPath();
      ctx.ellipse(l.x + off, fy + 0.3, 2, 1.3, 0, 0, Math.PI * 2);
      ctx.fillStyle = INK;
      ctx.fill();
    });
  }

  function drawBody(ctx, cat) {
    const p = pose;
    ctx.save();
    ctx.translate(cat.x, cat.y);
    const sq = cat.squash || 0;
    ctx.scale(1 + Math.max(0, sq) * 0.2, 1 - sq * 0.18);
    ctx.scale(cat.dir, 1);
    ctx.rotate(p.rot);

    // patas detrás del cuerpo
    drawLegs(ctx, cat);

    // cuerpo con degradado vertical (arriba hueso, abajo gris profundo)
    const bodyGrad = ctx.createLinearGradient(0, p.bodyCy - p.bodyRy, 0, p.bodyCy + p.bodyRy);
    bodyGrad.addColorStop(0, INK);
    bodyGrad.addColorStop(0.62, INK);
    bodyGrad.addColorStop(1, "#9a9a96");
    const body = bodyPath(p);
    ctx.fillStyle = bodyGrad;
    ctx.fill(body);
    // contorno en hueso puro: el cuerpo se lee sobre cualquier fondo
    ctx.strokeStyle = INK;
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.stroke(body);

    // pecho: media luna clara para dar volumen
    ctx.beginPath();
    ctx.ellipse(
      p.bodyRx * 0.55, p.bodyCy + p.bodyRy * 0.05,
      p.bodyRx * 0.3, p.bodyRy * 0.26,
      -0.2, Math.PI * 0.9, Math.PI * 2.1
    );
    ctx.strokeStyle = "rgba(233,233,231,0.5)";
    ctx.lineWidth = 1.4;
    ctx.stroke();

    ctx.restore();
  }

  // la cabeza = el icono: silueta contorneada, ojos y nariz rellenos en hueso,
  // exactamente como el CatMark del nav (estructura y colores). Se voltea con
  // cat.dir igual que el cuerpo para que la cara mire hacia donde camina.
  function drawHead(ctx, cat) {
    const p = pose;
    const hs = 0.36; // escala de la silueta del logo (más pequeña, minimalista)
    ctx.save();
    ctx.translate(cat.x, cat.y);
    // mismas transformaciones que el cuerpo para que cabeza y cuerpo se
    // muevan en sincronía: espejo, squash de aterrizaje y balanceo
    const sq = cat.squash || 0;
    ctx.scale(1 + Math.max(0, sq) * 0.2, 1 - sq * 0.18);
    ctx.scale(cat.dir, 1); // espejo: la cabeza gira con el cuerpo
    ctx.rotate(p.rot);
    ctx.translate(p.headX - 15, p.headY);
    ctx.scale(hs, hs);

    // silueta = el path del icono (HEAD). Como el logo aparece sobre fondo
    // oscuro, aquí se rellena con el negro del tema para que la cara (ojos y
    // nariz en hueso) se lea igual que el icono: mismos colores y estructura.
    ctx.fillStyle = "#0a0a0b"; // raised black del tema
    ctx.fill(HEAD);
    // contorno de la silueta (igual al icono: stroke 2.4 en unidades del logo)
    ctx.strokeStyle = INK;
    ctx.lineWidth = 2.4;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke(HEAD);

    // ojos: mirada hacia el puntero si se indica, si no hacia el movimiento.
    // El offset horizontal se multiplica por cat.dir porque la cabeza está
    // espejada: así los ojos miran SIEMPRE hacia el cursor en pantalla.
    const eyesClosed = cat.state === "sleep" || blinkT < 0.11;
    let lx = 0;
    let ly = 0;
    if (cat.look) {
      lx = Math.max(-2, Math.min(2, cat.look.x * cat.dir));
      ly = Math.max(-1.5, Math.min(2, cat.look.y));
    } else if (cat.state !== "sleep") {
      lx = Math.max(-2, Math.min(2, cat.vx * 0.006 * cat.dir));
      ly = Math.max(-1.2, Math.min(1.8, cat.vy * 0.003));
    }
    ctx.fillStyle = INK;
    if (eyesClosed) {
      ctx.strokeStyle = INK;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(EYE_L.x - 3, EYE_L.y);
      ctx.lineTo(EYE_L.x + 3, EYE_L.y);
      ctx.moveTo(EYE_R.x - 3, EYE_R.y);
      ctx.lineTo(EYE_R.x + 3, EYE_R.y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(EYE_L.x + lx, EYE_L.y + ly, EYE_RADIUS, 0, Math.PI * 2);
      ctx.arc(EYE_R.x + lx, EYE_R.y + ly, EYE_RADIUS, 0, Math.PI * 2);
      ctx.fill();
    }

    // nariz: el triángulo del icono
    ctx.beginPath();
    ctx.moveTo(NOSE[0], NOSE[1]);
    ctx.lineTo(NOSE[2], NOSE[3]);
    ctx.lineTo(NOSE[4], NOSE[5]);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  // líneas de velocidad en picada
  function drawDiveLines(ctx, cat) {
    if (cat.state !== "dive" || Math.abs(cat.vy) <= 300 || reduceMotion) return;
    const len = (Math.abs(cat.vy) - 260) * 0.1;
    ctx.strokeStyle = "rgba(237,236,230,.16)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (const ox of [-16, -9, 10, 17]) {
      ctx.moveTo(cat.x + ox, cat.y - 68 - len);
      ctx.lineTo(cat.x + ox, cat.y - 68);
    }
    ctx.stroke();
  }

  // dibuja cola detrás del cuerpo (salvo dormido: encima, enroscada)
  function draw(ctx, cat) {
    drawShadow(ctx, cat);
    if (cat.state !== "sleep") drawTail(ctx);
    drawBody(ctx, cat);
    drawHead(ctx, cat);
    if (cat.state === "sleep") drawTail(ctx);
    drawDiveLines(ctx, cat);
  }

  return { update, draw };
}
