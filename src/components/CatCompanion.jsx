// src/components/CatCompanion.jsx
// The logo cat wanders the page on its own. Click to talk to it.
// A single foreground canvas draws the cat; the WebGL well is the backdrop now.

import { useEffect, useRef, useState } from "react";
import { createCompanion } from "../game/companion.js";
import { scrollToTarget } from "../lib/scrollTo.js";
import { useLang } from "../i18n.jsx";
import "./CatCompanion.css";

export default function CatCompanion({ greet = false }) {
  const { t } = useLang();
  const fgRef = useRef(null);
  const bubbleRef = useRef(null);
  const companionRef = useRef(null);
  const [bubble, setBubble] = useState(null); // {text, action} | null
  const bubbleTimer = useRef(null);
  const msgIndex = useRef(0);
  const wakeIndex = useRef(0);
  const greetRef = useRef(greet); // valor al montar: saluda tras la cortina
  const tRef = useRef(t);
  useEffect(() => {
    tRef.current = t;
  }, [t]);

  useEffect(() => {
    const fg = fgRef.current;
    const fgCtx = fg.getContext("2d");
    const reduceMotion = matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const companion = createCompanion({ reduceMotion });
    companionRef.current = companion;

    // ---- interacción del usuario ----
    let pointer = null;
    let lastUserAct = performance.now();
    const onMove = (e) => {
      pointer = { x: e.clientX, y: e.clientY };
      lastUserAct = performance.now();
    };
    const onClick = (e) => {
      lastUserAct = performance.now();
      if (!companion.hitTest(e.clientX, e.clientY)) return;
      const kind = companion.poke();
      const dict = tRef.current.cat;
      const pool = kind === "wake" ? dict.wake : dict.messages;
      const idx = kind === "wake" ? wakeIndex : msgIndex;
      const msg = pool[idx.current % pool.length];
      idx.current += 1;
      setBubble(msg);
      clearTimeout(bubbleTimer.current);
      bubbleTimer.current = setTimeout(() => setBubble(null), 6000);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick);

    // ---- velocidad de scroll suavizada ----
    let lastScrollY = window.scrollY;
    let scrollVel = 0;
    const onScroll = () => {
      lastUserAct = performance.now();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ---- tamaño ----
    let view = null;
    const resize = () => {
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      // Piso de 1: con zoom < 100% (dpr<1) el navegador estiraba el canvas
      // 1/0.8 = 1.25× y el gato se veía borroso y más grande solo al 80%.
      // Con el piso, el canvas nunca es menor que su tamaño CSS: el gato se
      // renderiza nítido y del mismo tamaño a cualquier zoom.
      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
      fg.width = Math.round(cssW * dpr);
      fg.height = Math.round(cssH * dpr);
      view = { cssW, cssH, dpr, w: cssW, h: cssH };
    };
    resize();
    window.addEventListener("resize", resize);

    // ---- bucle ----
    // saludo automático: el gato se presenta cuando la cortina termina de abrir
    let greetTimer;
    if (greetRef.current) {
      greetTimer = setTimeout(() => {
        setBubble(tRef.current.cat.messages[0]);
        msgIndex.current = 1;
        bubbleTimer.current = setTimeout(() => setBubble(null), 6500);
      }, 3400);
    }

    let raf = 0;
    let last = performance.now();
    const loop = (now) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      const scrollY = window.scrollY;
      const rawVel = (scrollY - lastScrollY) / Math.max(dt, 1e-4);
      lastScrollY = scrollY;
      scrollVel += (rawVel - scrollVel) * Math.min(1, dt * 8);

      const frame = {
        dt,
        t: now / 1000,
        view,
        scrollY,
        scrollVel,
        pointer,
        userIdleT: (now - lastUserAct) / 1000,
      };
      companion.update(frame);
      companion.drawCat(fgCtx, frame);

      // el bocadillo sigue al gato
      if (bubbleRef.current) {
        const c = companion.cat;
        const x = Math.max(12, Math.min(view.cssW - 232, c.x - 60));
        const y = Math.max(12, c.y - 140);
        bubbleRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(bubbleTimer.current);
      clearTimeout(greetTimer);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const runAction = (type) => {
    setBubble(null);
    if (type === "contact") {
      scrollToTarget(document.getElementById("contact-section"));
    }
  };

  return (
    <>
      <canvas ref={fgRef} className="companion-cat" aria-hidden="true" />
      <div
        ref={bubbleRef}
        className={`cat-bubble ${bubble ? "show" : ""}`}
        role="status"
      >
        {bubble && (
          <>
            <p>{bubble.text}</p>
            {bubble.action && (
              <button
                type="button"
                onClick={() => runAction(bubble.action.type)}
              >
                {bubble.action.label}
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}
