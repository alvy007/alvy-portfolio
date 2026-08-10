'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { useEffect, useState, useSyncExternalStore } from 'react';

const POINTER_QUERY = '(pointer: fine)';

function subscribeToFinePointer(callback: () => void) {
  const mediaQuery = window.matchMedia(POINTER_QUERY);

  mediaQuery.addEventListener('change', callback);

  return () => {
    mediaQuery.removeEventListener('change', callback);
  };
}

function getFinePointerSnapshot() {
  return window.matchMedia(POINTER_QUERY).matches;
}

function getFinePointerServerSnapshot() {
  return false;
}

function useFinePointer() {
  return useSyncExternalStore(
    subscribeToFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot,
  );
}

export function BackgroundEffects() {
  const pointerX = useMotionValue(-300);
  const pointerY = useMotionValue(-300);

  const ringX = useSpring(pointerX, {
    stiffness: 180,
    damping: 26,
    mass: 0.35,
  });

  const ringY = useSpring(pointerY, {
    stiffness: 180,
    damping: 26,
    mass: 0.35,
  });

  const glowX = useSpring(pointerX, {
    stiffness: 70,
    damping: 28,
    mass: 0.7,
  });

  const glowY = useSpring(pointerY, {
    stiffness: 70,
    damping: 28,
    mass: 0.7,
  });

  const trailX = useSpring(pointerX, {
    stiffness: 38,
    damping: 25,
    mass: 1,
  });

  const trailY = useSpring(pointerY, {
    stiffness: 38,
    damping: 25,
    mass: 1,
  });

  const supportsPointer = useFinePointer();

  const [cursorVisible, setCursorVisible] = useState(false);

  const [interactive, setInteractive] = useState(false);

  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!supportsPointer) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        return;
      }

      pointerX.set(event.clientX);
      pointerY.set(event.clientY);

      setCursorVisible(true);

      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        setInteractive(false);
        return;
      }

      const interactiveElement = target.closest(
        [
          'a',
          'button',
          '[role="button"]',
          'input',
          'textarea',
          'select',
          'article',
          '.glass-card',
          '[data-cursor-interactive="true"]',
        ].join(','),
      );

      setInteractive(Boolean(interactiveElement));
    };

    const handlePointerDown = () => {
      setPressed(true);
    };

    const handlePointerUp = () => {
      setPressed(false);
    };

    const handleMouseLeave = () => {
      setCursorVisible(false);
      setInteractive(false);
      setPressed(false);
    };

    const handleMouseEnter = () => {
      setCursorVisible(true);
    };

    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });

    window.addEventListener('pointerdown', handlePointerDown);

    window.addEventListener('pointerup', handlePointerUp);

    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);

      window.removeEventListener('pointerdown', handlePointerDown);

      window.removeEventListener('pointerup', handlePointerUp);

      document.documentElement.removeEventListener(
        'mouseleave',
        handleMouseLeave,
      );

      document.documentElement.removeEventListener(
        'mouseenter',
        handleMouseEnter,
      );
    };
  }, [pointerX, pointerY, supportsPointer]);

  const cursorGlow = useMotionTemplate`
    radial-gradient(
      520px circle at ${glowX}px ${glowY}px,
      rgba(34, 211, 238, 0.105),
      rgba(59, 130, 246, 0.05) 32%,
      rgba(139, 92, 246, 0.035) 48%,
      transparent 72%
    )
  `;

  const gridReveal = useMotionTemplate`
    radial-gradient(
      320px circle at ${glowX}px ${glowY}px,
      rgba(103, 232, 249, 0.22),
      rgba(103, 232, 249, 0.08) 35%,
      transparent 72%
    )
  `;

  return (
    <>
      {/* GLOBAL SITE BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#030712]">
        {/* MAIN GRID */}
        <div
          className="absolute inset-0 opacity-[0.11]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(148,163,184,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.055) 1px, transparent 1px)',
            backgroundSize: '58px 58px',
          }}
        />

        {/* MICRO GRID */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(34,211,238,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.08) 1px, transparent 1px)',
            backgroundSize: '19px 19px',
          }}
        />

        {/* GLOBAL CURSOR ILLUMINATION */}
        {supportsPointer && (
          <>
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: cursorGlow,
              }}
            />

            <motion.div
              className="absolute inset-0 opacity-35"
              style={{
                backgroundImage: gridReveal,
                maskImage:
                  'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
              }}
            />
          </>
        )}

        {/* AMBIENT CYAN ATMOSPHERE */}
        <motion.div
          animate={{
            x: [0, 120, 45, 0],
            y: [0, 40, -30, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -left-[16rem] -top-[14rem] h-[42rem] w-[42rem] rounded-full bg-cyan-400/[0.10] blur-[150px]"
        />

        {/* AMBIENT VIOLET ATMOSPHERE */}
        <motion.div
          animate={{
            x: [0, -110, -30, 0],
            y: [0, 70, 10, 0],
            scale: [1, 0.95, 1.08, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -right-[18rem] top-[8%] h-[46rem] w-[46rem] rounded-full bg-violet-500/[0.10] blur-[165px]"
        />

        {/* DEEP BLUE LOWER AMBIENCE */}
        <motion.div
          animate={{
            x: [0, 80, -60, 0],
            opacity: [0.06, 0.11, 0.065, 0.06],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-[-20rem] left-[25%] h-[44rem] w-[52rem] rounded-full bg-blue-500/[0.08] blur-[170px]"
        />

        {/* ATMOSPHERIC DIAGONAL BEAMS */}
        <div className="absolute left-[28%] top-[-30%] h-[160%] w-px rotate-[18deg] bg-gradient-to-b from-transparent via-cyan-300/[0.045] to-transparent" />

        <div className="absolute right-[22%] top-[-25%] h-[150%] w-px -rotate-[15deg] bg-gradient-to-b from-transparent via-violet-300/[0.04] to-transparent" />

        {/* TOP ATMOSPHERE */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-cyan-400/[0.055] to-transparent" />

        {/* VIGNETTE */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(3,7,18,0.32)_100%)]" />

        {/* LOWER FADE */}
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent" />
      </div>

      {/* GLOBAL CURSOR INTERACTION */}
      {supportsPointer && (
        <div className="pointer-events-none fixed inset-0 z-[80]">
          {/* SLOW ENERGY TRAIL */}
          <motion.div
            animate={{
              opacity: cursorVisible ? 1 : 0,
              scale: interactive ? 1.25 : 1,
            }}
            transition={{
              opacity: {
                duration: 0.2,
              },
              scale: {
                duration: 0.3,
              },
            }}
            className="absolute h-20 w-20"
            style={{
              x: trailX,
              y: trailY,
              translateX: '-50%',
              translateY: '-50%',
            }}
          >
            <div className="absolute inset-0 rounded-full bg-cyan-300/[0.055] blur-xl" />

            <div className="absolute inset-[25%] rounded-full bg-violet-400/[0.055] blur-lg" />
          </motion.div>

          {/* DELAYED CURSOR RING */}
          <motion.div
            animate={{
              opacity: cursorVisible ? 1 : 0,

              width: interactive ? 54 : pressed ? 24 : 34,

              height: interactive ? 54 : pressed ? 24 : 34,

              borderColor: interactive
                ? 'rgba(103,232,249,0.55)'
                : 'rgba(103,232,249,0.26)',

              backgroundColor: interactive
                ? 'rgba(34,211,238,0.035)'
                : 'rgba(34,211,238,0)',
            }}
            transition={{
              width: {
                duration: 0.22,
              },

              height: {
                duration: 0.22,
              },

              opacity: {
                duration: 0.16,
              },

              borderColor: {
                duration: 0.2,
              },

              backgroundColor: {
                duration: 0.2,
              },
            }}
            className="absolute rounded-full border backdrop-blur-[1px]"
            style={{
              x: ringX,
              y: ringY,

              translateX: '-50%',
              translateY: '-50%',

              boxShadow: interactive
                ? '0 0 32px rgba(34,211,238,0.14)'
                : '0 0 18px rgba(34,211,238,0.06)',
            }}
          />

          {/* PRECISE CENTER DOT */}
          <motion.div
            animate={{
              opacity: cursorVisible ? 1 : 0,

              scale: pressed ? 0.55 : interactive ? 1.35 : 1,
            }}
            transition={{
              duration: 0.15,
            }}
            className="absolute h-[5px] w-[5px] rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(103,232,249,0.9)]"
            style={{
              x: pointerX,
              y: pointerY,

              translateX: '-50%',
              translateY: '-50%',
            }}
          />
        </div>
      )}
    </>
  );
}
