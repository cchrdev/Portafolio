// src/components/CountUp.jsx
// ReactBits-style counter: climbs from 0 to `end` once the element scrolls
// into view, with cubic ease-out. Pads to two digits (editorial look).

import { useEffect, useRef, useState } from "react";
import useInView from "./useInView.js";

export default function CountUp({
  end,
  duration = 1.7,
  suffix = "",
  pad = 2,
  className = "",
  ...rest
}) {
  const [ref, inView] = useInView({ once: true, threshold: 0.4 });
  const [val, setVal] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!inView) return undefined;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    const tick = (now) => {
      // reduced motion: jump straight to the final value (async, so no
      // synchronous setState inside the effect body)
      if (reduceMotion) {
        setVal(end);
        return;
      }
      const p = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * end));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, end, duration]);

  return (
    <b ref={ref} className={`num ${className}`.trim()} {...rest}>
      {String(val).padStart(pad, "0")}
      {suffix}
    </b>
  );
}
