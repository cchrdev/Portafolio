// src/App.jsx (VERSIÓN FINAL CON LAYOUT)

import { Routes, Route } from 'react-router-dom';

// Componentes y Páginas
import Layout from './Layout.jsx'; // <-- Importamos el nuevo Layout
import SplashScreen from './components/SplashScreen.jsx';
import InicioPage from './pages/InicioPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';


import './App.css';

export default function App() {
  return (
    <Routes>
      {/* La ruta del SplashScreen está fuera del Layout para que no tenga cursor ni fondo persistente */}
      <Route path="/" element={<SplashScreen />} />

      {/* Todas las demás rutas ahora viven DENTRO del Layout */}
      <Route element={<Layout />}>
        <Route path="/inicio" element={<InicioPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}