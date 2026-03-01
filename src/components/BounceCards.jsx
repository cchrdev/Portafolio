// src/components/BounceCards.jsx (VERSIÓN FINAL CON LA ANIMACIÓN ORIGINAL CORREGIDA)

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './BounceCards.css';

export default function BounceCards({
  className = '',
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [
    'rotate(10deg) translate(-170px)',
    'rotate(5deg) translate(-85px)',
    'rotate(-3deg)',
    'rotate(-10deg) translate(85px)',
    'rotate(2deg) translate(170px)',
    'rotate(8deg) translate(250px)'
  ],
  enableHover = true
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.bc-card');

      // 1. GSAP establece la posición inicial en abanico de cada tarjeta
      cards.forEach((card, index) => {
        gsap.set(card, { transform: transformStyles[index] ?? 'none' });
      });

      // 2. Animación de entrada (escala desde 0)
      gsap.from(cards, {
        scale: 0,
        stagger: animationStagger,
        delay: animationDelay,
        duration: 1,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [images, transformStyles, animationStagger, easeType, animationDelay]);

  // --- LÓGICA DE HOVER ORIGINAL Y FUNCIONAL ---

  const getNoRotationTransform = (transformStr) => {
    return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
  };

  const getPushedTransform = (baseTransform, offsetX) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    }
    return `${baseTransform} translate(${offsetX}px)`;
  };

  const pushSiblings = (hoveredIdx) => {
    if (!enableHover) return;
    const cards = gsap.utils.toArray('.bc-card');
    cards.forEach((card, i) => {
      gsap.killTweensOf(card);
      const baseTransform = transformStyles[i] || 'none';

      if (i === hoveredIdx) {
        gsap.to(card, {
          transform: getNoRotationTransform(baseTransform),
          duration: 0.4,
          ease: 'back.out(1.4)',
        });
      } else {
        const offsetX = i < hoveredIdx ? -150 : 150; // Reducido el offset para un efecto más sutil
        const pushedTransform = getPushedTransform(baseTransform, offsetX);
        const distance = Math.abs(hoveredIdx - i);
        const delay = distance * 0.05;
        gsap.to(card, {
          transform: pushedTransform,
          duration: 0.4,
          ease: 'back.out(1.4)',
          delay,
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover) return;
    const cards = gsap.utils.toArray('.bc-card');
    cards.forEach((card, i) => {
      gsap.killTweensOf(card);
      gsap.to(card, {
        transform: transformStyles[i] || 'none',
        duration: 0.4,
        ease: 'back.out(1.4)',
      });
    });
  };

  return (
    <div
      ref={containerRef}
      className={`bc-container ${className}`}
      style={{
        width: containerWidth,
        height: containerHeight
      }}
      // IMPORTANTE: El onMouseLeave va aquí, en el contenedor, para evitar glitches
      onMouseLeave={resetSiblings}
    >
      {images.map((src, idx) => (
        <div
          key={idx}
          className={`bc-card bc-card-${idx}`}
          // Ya no ponemos el style de transform aquí
          onMouseEnter={() => pushSiblings(idx)}
        >
          <img className="image cursor-target" src={src} alt={`card-${idx}`} />
        </div>
      ))}
    </div>
  );
}