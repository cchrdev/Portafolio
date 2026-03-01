// src/components/TargetCursor.jsx (VERSIÓN FINAL COMPLETA + REINICIO DE GIRO CORREGIDO)
import { useEffect, useRef, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { gsap } from 'gsap';
import './TargetCursor.css';

const TargetCursor = ({
  targetSelector = '.cursor-target',
  spinDuration = 2,
  hideDefaultCursor = true,
}) => {
  const cursorRef = useRef(null);
  const cornersRef = useRef(null);
  const spinTl = useRef(null);
  const dotRef = useRef(null);
  const hasMovedOnce = useRef(false);

  const constants = useMemo(
    () => ({
      borderWidth: 9,
      cornerSize: 12,
      parallaxStrength: 0.00005,
    }),
    []
  );

  const moveCursor = useCallback((x, y) => {
    if (!cursorRef.current) return;

    if (!hasMovedOnce.current) {
      gsap.to(cursorRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      hasMovedOnce.current = true;
    }

    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.1,
      ease: 'power3.out',
    });
  }, []);

  useEffect(() => {
    if (!cursorRef.current) return;

    const cursor = cursorRef.current;
    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) document.body.style.cursor = 'none';

    cornersRef.current = cursor.querySelectorAll('.target-cursor-corner');

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      opacity: 0,
    });

    let activeTarget = null;
    let currentTargetMove = null;
    let currentLeaveHandler = null;
    let isAnimatingToTarget = false;
    let resumeTimeout = null;

    const cleanupTarget = (target) => {
      if (currentTargetMove) target.removeEventListener('mousemove', currentTargetMove);
      if (currentLeaveHandler) target.removeEventListener('mouseleave', currentLeaveHandler);
      currentTargetMove = null;
      currentLeaveHandler = null;
    };

    const createSpinTimeline = () => {
      if (spinTl.current) spinTl.current.kill();
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });
    };
    createSpinTimeline();

    // 🟢 FUNCIÓN DE RESETEO MANUAL (ACTUALIZADA CON REINICIO DE GIRO CORREGIDO)
    const resetCursorState = () => {
      activeTarget = null;
      isAnimatingToTarget = false;
      if (cornersRef.current) {
        const corners = Array.from(cornersRef.current);
        gsap.killTweensOf(corners);
        const { cornerSize } = constants;
        const positions = [
          { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
          { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
          { x: cornerSize * 0.5, y: cornerSize * 0.5 },
          { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
        ];
        const tl = gsap.timeline();
        corners.forEach((corner, index) => {
          tl.to(
            corner,
            { x: positions[index].x, y: positions[index].y, duration: 0.3, ease: 'power3.out' },
            0
          );
        });
      }

      // 🔄 Reinicio de giro corregido
      if (cursorRef.current && spinTl.current) {
        const currentRotation = gsap.getProperty(cursorRef.current, 'rotation');
        const normalizedRotation = currentRotation % 360;

        spinTl.current.kill();
        spinTl.current = gsap
          .timeline({ repeat: -1 })
          .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });

        gsap.to(cursorRef.current, {
          rotation: normalizedRotation + 360,
          duration: spinDuration * (1 - normalizedRotation / 360),
          ease: 'none',
          onComplete: () => spinTl.current?.restart(),
        });
      }
    };

    const handleManualReset = () => resetCursorState();
    window.addEventListener('resetcursor', handleManualReset);

    // --- Eventos globales ---
    const moveHandler = (e) => moveCursor(e.clientX, e.clientY);
    window.addEventListener('mousemove', moveHandler);

    const scrollHandler = () => {
      if (!activeTarget || !cursorRef.current) return;
      const mouseX = gsap.getProperty(cursorRef.current, 'x');
      const mouseY = gsap.getProperty(cursorRef.current, 'y');
      const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
      const isStillOverTarget =
        elementUnderMouse &&
        (elementUnderMouse === activeTarget ||
          elementUnderMouse.closest(targetSelector) === activeTarget);
      if (!isStillOverTarget && currentLeaveHandler) currentLeaveHandler();
    };
    window.addEventListener('scroll', scrollHandler, { passive: true });

    const mouseDownHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 0.9, duration: 0.2 });
    };
    const mouseUpHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
    };
    window.addEventListener('mousedown', mouseDownHandler);
    window.addEventListener('mouseup', mouseUpHandler);

    const enterHandler = (e) => {
      const directTarget = e.target;
      const allTargets = [];
      let current = directTarget;
      while (current && current !== document.body) {
        if (current.matches(targetSelector)) allTargets.push(current);
        current = current.parentElement;
      }
      const target = allTargets[0] || null;
      if (!target || !cursorRef.current || !cornersRef.current) return;
      if (activeTarget === target) return;

      if (activeTarget) cleanupTarget(activeTarget);
      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
        resumeTimeout = null;
      }

      activeTarget = target;
      const corners = Array.from(cornersRef.current);
      corners.forEach((corner) => gsap.killTweensOf(corner));

      gsap.killTweensOf(cursorRef.current, 'rotation');
      spinTl.current?.pause();
      gsap.set(cursorRef.current, { rotation: 0 });

      const updateCorners = (mouseX, mouseY) => {
        const rect = target.getBoundingClientRect();
        const cursorRect = cursorRef.current.getBoundingClientRect();
        const cursorCenterX = cursorRect.left + cursorRect.width / 2;
        const cursorCenterY = cursorRect.top + cursorRect.height / 2;
        const [tlc, trc, brc, blc] = Array.from(cornersRef.current);
        const { borderWidth, cornerSize, parallaxStrength } = constants;

        let tlOffset = { x: rect.left - cursorCenterX - borderWidth, y: rect.top - cursorCenterY - borderWidth };
        let trOffset = { x: rect.right - cursorCenterX + borderWidth - cornerSize, y: rect.top - cursorCenterY - borderWidth };
        let brOffset = { x: rect.right - cursorCenterX + borderWidth - cornerSize, y: rect.bottom - cursorCenterY + borderWidth - cornerSize };
        let blOffset = { x: rect.left - cursorCenterX - borderWidth, y: rect.bottom - cursorCenterY + borderWidth - cornerSize };

        if (mouseX !== undefined && mouseY !== undefined) {
          const targetCenterX = rect.left + rect.width / 2;
          const targetCenterY = rect.top + rect.height / 2;
          const mouseOffsetX = (mouseX - targetCenterX) * parallaxStrength;
          const mouseOffsetY = (mouseY - targetCenterY) * parallaxStrength;
          tlOffset.x += mouseOffsetX; tlOffset.y += mouseOffsetY;
          trOffset.x += mouseOffsetX; trOffset.y += mouseOffsetY;
          brOffset.x += mouseOffsetX; brOffset.y += mouseOffsetY;
          blOffset.x += mouseOffsetX; blOffset.y += mouseOffsetY;
        }

        const tl = gsap.timeline();
        const cornersList = [tlc, trc, brc, blc];
        const offsets = [tlOffset, trOffset, brOffset, blOffset];
        cornersList.forEach((corner, index) => {
          tl.to(corner, { x: offsets[index].x, y: offsets[index].y, duration: 0.2, ease: 'power2.out' }, 0);
        });
      };

      isAnimatingToTarget = true;
      updateCorners();
      setTimeout(() => (isAnimatingToTarget = false), 1);

      let moveThrottle = null;
      const targetMove = (ev) => {
        if (moveThrottle || isAnimatingToTarget) return;
        moveThrottle = requestAnimationFrame(() => {
          updateCorners(ev.clientX, ev.clientY);
          moveThrottle = null;
        });
      };

      const leaveHandler = () => {
        resetCursorState();
        cleanupTarget(target);
      };

      currentTargetMove = targetMove;
      currentLeaveHandler = leaveHandler;
      target.addEventListener('mousemove', targetMove);
      target.addEventListener('mouseleave', leaveHandler);
    };

    window.addEventListener('mouseover', enterHandler, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseover', enterHandler);
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('mousedown', mouseDownHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
      window.removeEventListener('resetcursor', handleManualReset);
      if (activeTarget) cleanupTarget(activeTarget);
      spinTl.current?.kill();
      document.body.style.cursor = originalCursor;
    };
  }, [targetSelector, spinDuration, moveCursor, constants, hideDefaultCursor]);

  useEffect(() => {
    if (!cursorRef.current || !spinTl.current) return;
    if (spinTl.current.isActive()) {
      spinTl.current.kill();
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });
    }
  }, [spinDuration]);

  const cursorMarkup = (
    <div ref={cursorRef} className="target-cursor-wrapper">
      <div ref={dotRef} className="target-cursor-dot" />
      <div className="target-cursor-corner corner-tl" />
      <div className="target-cursor-corner corner-tr" />
      <div className="target-cursor-corner corner-br" />
      <div className="target-cursor-corner corner-bl" />
    </div>
  );

  return ReactDOM.createPortal(cursorMarkup, document.getElementById('cursor-root'));
};

export default TargetCursor;
