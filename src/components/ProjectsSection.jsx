// src/components/ProjectsSection.jsx

import ScrollStack, { ScrollStackItem } from "./ScrollStack.jsx";
import Reveal, { SectionHeading } from "./Reveal.jsx";
import { useLang } from "../i18n.jsx";
import { projects } from "../projectData.js";

export default function ProjectsSection() {
  const { t } = useLang();

  return (
    <section id="projects-section" className="sec">
      <SectionHeading
        eyebrow={t.projects.eyebrow}
        title={t.projects.title}
        tagline={t.projects.tagline}
      />

      <div className="stack-scroller-wrap">
        <ScrollStack
          useWindowScroll={true}
          baseScale={0.9}
          rotationAmount={0}
          blurAmount={0}
          itemDistance={70}
        >
          {projects.map((project, i) => {
            const item = t.projects.items[i];
            return (
              <ScrollStackItem key={project.id}>
                <article className="project-card-content">
                  <header className="stack-head">
                    <span className="stack-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="stack-period">{project.period}</span>
                  </header>
                  <h2 className="stack-title">{item.name}</h2>
                  <p className="stack-desc">{item.description}</p>
                  <div className="stack-tech">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <footer className="stack-foot">
                    <span className="hint">{t.projects.hint}</span>
                    <span className="stack-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </span>
                  </footer>
                </article>
              </ScrollStackItem>
            );
          })}

          <ScrollStackItem itemClassName="stack-end-item">
            <div className="stack-end-note">
              <Reveal as="p" className="body">
                {t.projects.end}
              </Reveal>
            </div>
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </section>
  );
}
