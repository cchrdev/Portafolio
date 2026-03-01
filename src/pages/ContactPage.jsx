// src/pages/ContactPage.jsx
import { motion } from 'framer-motion';
import GradientText from '../components/GradientText.jsx';
import Magnet from '../components/Magnet.jsx';
import { rgbColors } from '../config.js';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const contactLinks = [
    { url: 'mailto:cchrdev@proton.me', icon: <FaEnvelope size={36} />, label: 'Email' },
    { url: 'https://github.com/cchrdev', icon: <FaGithub size={36} />, label: 'GitHub' },
    { url: 'https://linkedin.com/in/christopher-osiel-nava-cruz', icon: <FaLinkedin size={36} />, label: 'LinkedIn' },
];

export default function ContactPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
        >
            <section className="contact-section">
                <h2 className="section-title">
                    <GradientText colors={rgbColors} animationSpeed={5}>
                        Hablemos
                    </GradientText>
                </h2>
                <p className="contact-subtitle">
                    Siempre estoy abierto a conectar y explorar nuevas oportunidades. ¡No dudes en contactarme!
                </p>
                <div className="contact-links">
                    {contactLinks.map((link) => (
                        <Magnet key={link.label}>
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="contact-link-item cursor-target">
                                {link.icon}
                                <span>{link.label}</span>
                            </a>
                        </Magnet>
                    ))}
                </div>
                <footer className="footer">
                    <p>&copy; {new Date().getFullYear()} c.chr.dev. Todos los derechos reservados.</p>
                </footer>
            </section>
        </motion.div>
    );
}
