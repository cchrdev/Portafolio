// src/components/ProgressRail.jsx
// Fixed chapter rail on the right edge (desktop only): a tick per section,
// the active one extends. Click to jump.

import { useEffect, useState } from "react";
import { scrollToTarget } from "../lib/scrollTo.js";

const SECTIONS = [
  { id: "hero-section", label: "Top" },
  { id: "about-section", label: "About" },
  { id: "tools-anchor", label: "Stack" },
  { id: "contact-section", label: "Contact" },
];

export default function ProgressRail() {
  const [active, setActive] = useState("hero-section");

  useEffect(() => {
    const sections = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!sections.length || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <aside className="rail" aria-label="Chapters">
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          type="button"
          className={active === s.id ? "on" : ""}
          title={s.label}
          aria-label={`Jump to ${s.label}`}
          onClick={() => scrollToTarget(document.getElementById(s.id))}
        >
          <i />
        </button>
      ))}
    </aside>
  );
}
