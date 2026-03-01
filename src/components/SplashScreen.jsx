// src/components/SplashScreen.jsx (VERSIÓN FINAL CON useCallback)

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react'; // <-- 1. Importamos useCallback
import { useNavigate } from 'react-router-dom';
import DecryptedText from './DecryptedText.jsx';
import Magnet from './Magnet.jsx';

export default function SplashScreen() {
  const navigate = useNavigate();
  const [startTitle, setStartTitle] = useState(false);
  const [startSubtitle, setStartSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const titleTimer = setTimeout(() => setStartTitle(true), 500);
    return () => clearTimeout(titleTimer);
  }, []);

  // --- 2. Envolvemos las funciones en useCallback ---
  const onTitleComplete = useCallback(() => {
    setTimeout(() => {
        setStartSubtitle(true);
    }, 500);
  }, []); // El array vacío asegura que la función NUNCA se vuelva a crear

  const onSubtitleComplete = useCallback(() => {
    setTimeout(() => {
        setShowButton(true);
    }, 800);
  }, []); // El array vacío asegura que la función NUNCA se vuelva a crear

  const handleEnter = () => {
    navigate('/inicio');
  };

  return (
    <motion.div 
      className="splash-screen"
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="decrypt-container">
        <DecryptedText 
          text="Christopher Nava"
          className="splash-title-decrypt"
          sequential={true}
          revealDirection="start"
          speed={120}
          startAnimation={startTitle}
          onAnimationComplete={onTitleComplete} // <-- Ahora recibe una función memorizada
        />
        <DecryptedText 
          text="Developer"
          className="splash-subtitle-decrypt"
          sequential={true}
          revealDirection="start"
          speed={150}
          startAnimation={startSubtitle}
          onAnimationComplete={onSubtitleComplete} // <-- Ahora recibe una función memorizada
        />
      </div>

      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.2 } }}
            exit={{ opacity: 0 }}
          >
            <Magnet>
              <button
                className="splash-button cursor-target"
                onClick={handleEnter}
              >
                Learn more
              </button>
            </Magnet>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}