// src/components/Nav.jsx
// Fixed editorial navigation: blur wash once scrolled, hides on scroll down,
// reveals on scroll up, tracks the active section, slides a full-height
// sheet on mobile, and toggles the site language (ES/EN).

import { useEffect, useRef, useState } from "react";
import { scrollToTarget } from "../lib/scrollTo.js";
import { useLang } from "../i18n.jsx";
import CatMark from "./CatMark.jsx";
import "./Nav.css";

const SECTION_IDS = [
  "hero-section",
  "about-section",
  "tools-anchor",
  "contact-section",
];

export default function Nav() {
  const { lang, setLang, t } = useLang();
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero-section");
  const openRef = useRef(false);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // fixed element width follows the layout viewport, not the wider ICB
  useEffect(() => {
    const setVw = () => document.documentElement.style.setProperty("--vw", `${window.innerWidth}px`);
    setVw();
    window.addEventListener("resize", setVw);
    return () => window.removeEventListener("resize", setVw);
  }, []);

  // scroll: blur wash + hide/show direction
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setStuck(y > 40);
      if (!openRef.current) {
        if (y > last + 8 && y > 180) setHidden(true);
        else if (y < last - 8 || y <= 180) setHidden(false);
      }
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // active section tracking
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
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

  // mobile sheet: scroll lock + Escape
  useEffect(() => {
    document.documentElement.classList.toggle("nav-open", open);
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("nav-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    scrollToTarget(document.getElementById(id));
  };

  const links = [
    { id: "hero-section", label: t.nav.links.top },
    { id: "about-section", label: t.nav.links.about },
    { id: "tools-anchor", label: t.nav.links.stack },
    { id: "contact-section", label: t.nav.links.contact },
  ];

  return (
    <header className={`nav ${stuck ? "stuck" : ""} ${hidden ? "hide" : ""} ${open ? "menu-open" : ""}`}>
      <a
        className="brand cursor-target"
        href="#hero-section"
        aria-label={t.nav.links.top}
        onClick={(e) => {
          e.preventDefault();
          go("hero-section");
        }}
      >
        <CatMark size={30} />
        <span className="brand-tx">
          <b>CCHRDEV</b>
          <i>{t.nav.brandSub}</i>
        </span>
      </a>

      <nav className="nav-links" aria-label="Primary">
        {links.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className={`nav-link cursor-target ${active === l.id ? "on" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              go(l.id);
            }}
          >
            <span>{l.label}</span>
            <span className="alt" aria-hidden="true">{l.label}</span>
          </a>
        ))}

        <button
          type="button"
          className={`lang-switch cursor-target ${lang === "es" ? "on-es" : "on-en"}`}
          aria-label={t.nav.langAria}
          title={t.nav.langAria}
          onClick={() => setLang(lang === "es" ? "en" : "es")}
        >
          <span className="lang-slider" aria-hidden="true" />
          <span className={lang === "es" ? "active" : ""}>ES</span>
          <span className={lang === "en" ? "active" : ""}>EN</span>
        </button>
      </nav>

      <button
        type="button"
        className={`nav-burger ${open ? "active" : ""}`}
        aria-label={t.nav.menuAria}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <i />
        <i />
      </button>
    </header>
  );
}
