// src/components/HeroSection.jsx
// First chapter: editorial copy on the left (serif-free display name, role
// line, decrypted subtitle, magnetic CTAs, CountUp stats) and a live, self-
// typing terminal on the right. A stack ticker closes the hero.

import DecryptedText from "./DecryptedText.jsx";
import Reveal from "./Reveal.jsx";
import SplitText from "./SplitText.jsx";
import CountUp from "./CountUp.jsx";
import LogoLoop from "./LogoLoop.jsx";
import Magnet from "./Magnet.jsx";
import Terminal from "./Terminal.jsx";
import useInView from "./useInView.js";
import { scrollToTarget } from "../lib/scrollTo.js";
import { useLang } from "../i18n.jsx";
import { courseList } from "../coursesData.js";
import {
  languages,
  frameworksFrontend,
  frameworksBackend,
  databases,
  operatingSystems,
  otherSoftware,
  networking,
} from "../skillsData.jsx";
import "./HeroSection.css";

// condensed strip of the main stack for the hero ticker
const HERO_TECH = [
  ...languages.slice(0, 3),
  ...frameworksFrontend.slice(0, 2),
  ...databases.slice(0, 2),
  ...networking.slice(0, 4),
  ...operatingSystems.slice(0, 1),
];

const techCount =
  languages.length +
  frameworksFrontend.length +
  frameworksBackend.length +
  databases.length +
  operatingSystems.length +
  otherSoftware.length +
  networking.length;

export default function HeroSection() {
  const { t } = useLang();
  const [subRef, subInView] = useInView({ threshold: 0.4 });
  const go = (id) => {
    scrollToTarget(document.getElementById(id));
  };

  const statValues = {
    certs: { end: courseList.length },
    tech: { end: techCount, suffix: "+" },
  };

  return (
    <section id="hero-section" className="hero">
      <div className="hero-copy">
        <Reveal as="div" direction="fade" delay={0} className="hero-eyebrow">
          <span className="dot" aria-hidden="true" />
          {t.hero.eyebrow}
        </Reveal>

        <h1 className="hero-title">
          <SplitText as="span" text="Christopher" className="hero-name" />
        </h1>

        <div className="hero-sub" ref={subRef}>
          <DecryptedText
            text={t.hero.subtitle}
            sequential
            revealDirection="start"
            speed={34}
            startAnimation={subInView}
            className="hero-subtitle mono"
          />
        </div>

        <Reveal as="p" className="hero-tagline" stagger={8}>
          {t.hero.tagline}
        </Reveal>

        <div className="hero-ctas">
          <Magnet magnetStrength={3} padding={44}>
            <a
              href="#contact-section"
              className="cta-primary cursor-target"
              onClick={(e) => {
                e.preventDefault();
                go("contact-section");
              }}
            >
              {t.hero.ctas.primary}
              <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Magnet>
          <Magnet magnetStrength={2} padding={44}>
            <a
              href="#tools-anchor"
              className="cta-ghost cursor-target"
              onClick={(e) => {
                e.preventDefault();
                go("tools-anchor");
              }}
            >
              {t.hero.ctas.secondary}
            </a>
          </Magnet>
        </div>

        <div className="hero-stats">
          {t.hero.stats.map((stat) => (
            <div key={stat.key}>
              <CountUp
                end={statValues[stat.key].end}
                suffix={statValues[stat.key].suffix}
              />
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-side">
        <Reveal as="div" direction="up" delay={120}>
          <Terminal />
        </Reveal>
      </div>

      <div className="hero-ticker">
        <span className="hero-ticker-label mono">{t.hero.ticker}</span>
        <LogoLoop
          logos={HERO_TECH}
          speed={55}
          direction="left"
          logoHeight={20}
          gap={38}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="var(--ink)"
          ariaLabel={t.hero.ticker}
        />
      </div>
    </section>
  );
}
