// src/components/ContactSection.jsx

import Magnet from "./Magnet.jsx";
import Reveal, { SectionHeading } from "./Reveal.jsx";
import { useLang } from "../i18n.jsx";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const contactLinks = [
  {
    url: "mailto:cchrdev@proton.me",
    icon: <FaEnvelope size={16} />,
    label: "email",
  },
  {
    url: "https://github.com/cchrdev",
    icon: <FaGithub size={16} />,
    label: "github",
  },
  {
    url: "https://linkedin.com/in/christopher-osiel-nava-cruz",
    icon: <FaLinkedin size={16} />,
    label: "linkedin",
  },
];

export default function ContactSection() {
  const { t } = useLang();

  return (
    <section id="contact-section" className="contact">
      <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title} />

      <h2 className="closing display">
        <Reveal as="span" stagger={22}>
          {t.contact.closingA}
        </Reveal>{" "}
        <Reveal as="em" stagger={22} delay={180}>
          {t.contact.closingB}
        </Reveal>
      </h2>

      <Reveal as="p" className="contact-subtitle">
        {t.contact.subtitle}
      </Reveal>

      <Reveal
        as="a"
        href="mailto:cchrdev@proton.me"
        className="cta cursor-target"
      >
        <i aria-hidden="true" />
        <span>{t.contact.cta}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Reveal>

      <div className="contact-links">
        {contactLinks.map((link) => (
          <Magnet key={link.label} magnetStrength={3} padding={60}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link-item cursor-target"
            >
              {link.icon}
              <span>{link.label}</span>
            </a>
          </Magnet>
        ))}
      </div>

      <footer className="footer">
        <span>© {new Date().getFullYear()} cchrdev — {t.contact.footer.rights}</span>
        <span>
          {t.contact.footer.built} <span className="foot-heart">●</span> {t.contact.footer.stack}
        </span>
      </footer>
    </section>
  );
}
