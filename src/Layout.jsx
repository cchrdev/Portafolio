// src/Layout.jsx (NUEVO ARCHIVO)

import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import TargetCursor from './components/TargetCursor.jsx';

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <div className="persistent-background" />
      <TargetCursor spinDuration={2} hideDefaultCursor={true} />
      
      <AnimatePresence mode="wait">
        {/* La 'key' aquí es crucial para que AnimatePresence funcione */}
        <div key={location.pathname}>
          <Outlet />
        </div>
      </AnimatePresence>
    </>
  );
}