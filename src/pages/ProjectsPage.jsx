// src/pages/ProjectsPage.jsx
import { motion } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack.jsx';
import GradientText from '../components/GradientText.jsx';
import { projects } from '../projectData.js';
import { rgbColors } from '../config.js';

export default function ProjectsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0, ease: 'easeInOut' }}
    >
        <section className="projects-section-standalone">
          {/* Aquí está el truco: rotationAmount={0} y ajustamos el scale */}
          <ScrollStack useWindowScroll={true} baseScale={0.95} rotationAmount={0} blurAmount={0}>
            
            <ScrollStackItem>
              <div className="project-card-title-card">
                  <GradientText colors={rgbColors} animationSpeed={5}>
                      Proyectos Destacados
                  </GradientText>
              </div>
            </ScrollStackItem>

            {projects.map((project) => (
              <ScrollStackItem key={project.id}>
                <div className="project-card-content">
                    {/* Eliminamos el bloque de la imagen por completo */}
                    
                    <div className="project-info">
                      <h2>{project.title}</h2>
                      <span className="project-period">{project.period}</span>
                      <p>{project.description}</p>
                      
                      <div className="project-card-tech">
                      {project.technologies.map((tech) => (
                          <span key={tech} className="tech-badge">{tech}</span>
                      ))}
                      </div>
                    </div>
                </div>
              </ScrollStackItem>
            ))}
            
          </ScrollStack>
        </section>
    </motion.div>
  );
}