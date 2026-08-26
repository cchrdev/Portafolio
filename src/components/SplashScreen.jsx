// src/components/SplashScreen.jsx
// Cinematic preloader: the brand mark sits over the live WebGL well while a
// hairline progress bar fills and a counter climbs. When the descent is done
// the whole sheet fades, dropping us into the page.

import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n.jsx";
import CatMark from "./CatMark.jsx";

export default function SplashScreen({ onEnter }) {
  const { t } = useLang();
  const barRef = useRef(null);
  const pctRef = useRef(null);
  const statusRef = useRef(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 500 : 2300;
    document.body.classList.add("is-locked");

    let statusIdx = 0;
    if (statusRef.current) statusRef.current.textContent = t.splash.status[0];
    const statusTimer = setInterval(() => {
      statusIdx = (statusIdx + 1) % t.splash.status.length;
      if (statusRef.current) statusRef.current.textContent = t.splash.status[statusIdx];
    }, 640);

    const start = performance.now();
    let raf = 0;
    const tick = (now) => {
      const elapsed = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      const pct = Math.round(eased * 100);
      if (barRef.current) barRef.current.style.right = `${100 - pct}%`;
      if (pctRef.current) pctRef.current.textContent = String(pct).padStart(3, "0");
      if (elapsed < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
        setTimeout(() => {
          document.body.classList.remove("is-locked");
          onEnter?.();
        }, reduceMotion ? 150 : 750);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(statusTimer);
      document.body.classList.remove("is-locked");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`pre ${done ? "done" : ""}`} role="status" aria-label={t.splash.aria}>
      <div className="pre-in">
        <div className="pre-mark">
          <CatMark />
        </div>
        <div className="pre-word">{t.splash.brand}</div>
        <div className="pre-bar">
          <i ref={barRef} />
        </div>
        <div className="pre-meta">
          <span ref={statusRef}>{t.splash.status[0]}</span>
          <b ref={pctRef}>000</b>
        </div>
      </div>
    </div>
  );
}
