// src/components/SpotlightCard.jsx
// OriginUI-style card: a soft monochrome spotlight follows the cursor over
// the surface. Pure CSS custom properties, zero dependencies.

import { useRef } from "react";
import "./SpotlightCard.css";

export default function SpotlightCard({ children, className = "", ...rest }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`spotlight ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
}
