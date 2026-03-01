// src/pages/InicioPage.jsx

import { motion } from 'framer-motion';
import FlowingMenu from '../components/FlowingMenu.jsx';

const menuItems = [
  { link: '/about', text: 'Sobre Mí' },
  { link: '/projects', text: 'Proyectos' },
  { link: '/contact', text: 'Contacto' },
];

export default function InicioPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0, ease: 'easeInOut' }}
    >
      <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
        <FlowingMenu items={menuItems} />
      </div>
    </motion.div>
  );
}