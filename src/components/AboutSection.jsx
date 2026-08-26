// src/components/AboutSection.jsx
// Second chapter: intro copy, capability spotlight cards, certifications and
// a grouped chip grid of the full stack.

import { FaCode, FaNetworkWired, FaChartLine, FaShieldAlt } from "react-icons/fa";
import SpotlightCard from "./SpotlightCard.jsx";
import Reveal, { SectionHeading } from "./Reveal.jsx";
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
import { scrollToTarget } from "../lib/scrollTo.js";

const TOOL_SOURCES = [
  languages,
  frameworksFrontend,
  frameworksBackend,
  databases,
  operatingSystems,
  otherSoftware,
  networking,
];

const CAP_ICONS = [<FaCode />, <FaNetworkWired />, <FaChartLine />, <FaShieldAlt />];

export default function AboutSection() {
  const { t } = useLang();

  const handleScrollToContact = () => {
    window.dispatchEvent(new Event("resetcursor"));
    scrollToTarget(document.getElementById("contact-section"));
  };

  return (
    <section id="about-section" className="sec">
      <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />

      <div className="about-copy">
        <Reveal as="p" className="lead">
          {t.about.lead}
        </Reveal>
        <Reveal as="p" className="body">
          {t.about.body}
        </Reveal>
        <Reveal
          as="a"
          className="arrowlink cursor-target"
          href="#contact-section"
          onClick={(e) => {
            e.preventDefault();
            handleScrollToContact();
          }}
        >
          <span className="ar" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M4 12h15M13 5l7 7-7 7" /></svg>
          </span>
          {t.about.contact}
        </Reveal>
      </div>

      <div className="cap-grid">
        {t.about.cards.map((card, i) => (
          <Reveal key={card.title} as="div" direction="up" delay={i * 60}>
            <SpotlightCard className="cap-card cursor-target">
              <span className="cap-icon" aria-hidden="true">
                {CAP_ICONS[i % CAP_ICONS.length]}
              </span>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <div className="subhead" style={{ marginTop: "clamp(50px, 9vh, 110px)" }}>
        <span>{t.about.certs}</span>
        <i aria-hidden="true" />
      </div>

      <div className="cert-list">
        {courseList.map((course, i) => (
          <a
            key={course.name}
            className="cert-row cursor-target"
            href={course.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="k">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3>{course.name}</h3>
              <span className="issuer">{course.issuer}</span>
            </div>
            <span className="t">{course.date}</span>
            <span className="bar" aria-hidden="true" />
          </a>
        ))}
      </div>

      <div id="tools-anchor" className="tools-wrap">
        <div className="subhead">
          <span>{t.about.tools}</span>
          <i aria-hidden="true" />
        </div>
        {t.about.toolsGroups.map((title, i) => (
          <div className="tool-group" key={title}>
            <h3>{title}</h3>
            <div className="tool-chips">
              {TOOL_SOURCES[i].map((item) => (
                <span key={item.title} className="tool-chip cursor-target" title={item.title}>
                  <span className="tool-chip-icon" aria-hidden="true">
                    {item.node}
                  </span>
                  <b>{item.title}</b>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
