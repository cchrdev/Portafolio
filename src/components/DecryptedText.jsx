// src/components/DecryptedText.jsx (VERSIÓN FINAL CON 'memo')

import { useEffect, useState, useRef, memo } from 'react'; // <-- 1. Importamos 'memo'

// Tu componente se queda igual, pero ahora lo envolvemos en una constante
const DecryptedTextComponent = ({
  text,
  speed = 50,
  sequential = false,
  revealDirection = 'start',
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  className = '',
  startAnimation = false,
  onAnimationComplete,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const animationFrameRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!startAnimation) return;

    let revealedText = '';
    const availableChars = characters.split('');
    const textToAnimate = text.split('');

    const revealLetter = (index) => {
      if (index >= textToAnimate.length) {
        onAnimationComplete?.();
        return;
      }

      let scrambleCount = 0;
      const maxScrambles = 5;

      const scramble = () => {
        if (scrambleCount >= maxScrambles) {
          revealedText += textToAnimate[index];
          setDisplayedText(revealedText);
          timeoutRef.current = setTimeout(() => revealLetter(index + 1), speed);
          return;
        }

        const randomChar = availableChars[Math.floor(Math.random() * availableChars.length)];
        setDisplayedText(revealedText + randomChar);
        scrambleCount++;
        animationFrameRef.current = requestAnimationFrame(scramble);
      };

      animationFrameRef.current = requestAnimationFrame(scramble);
    };

    revealLetter(0);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [startAnimation, text, speed, characters, onAnimationComplete]);

  // Al principio, antes de que empiece la animación, mostramos espacios para mantener el layout
  const initialText = text ? text.replace(/[^\s]/g, '\u00A0') : '';

  return (
    <span className={className} {...props}>
      {startAnimation ? displayedText : initialText}
    </span>
  );
};

// --- 2. EXPORTAMOS LA VERSIÓN "MEMORIZADA" DEL COMPONENTE ---
const DecryptedText = memo(DecryptedTextComponent);

export default DecryptedText;