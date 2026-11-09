'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Flame,
  Gamepad2,
  Keyboard,
  MousePointer2,
  X,
} from 'lucide-react';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

const DRAGON_HEIGHT = 96;
const SPIKE_BOTTOM = 122;

const stageIds = [
  'home',
  'toolkit',
  'story',
  'education',
  'experience',
  'skills',
  'profiles',
  'projects',
  'research',
  'achievements',
  'certifications',
  'explore-me',
  'contact',
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function formatScore(value: number) {
  return String(value).padStart(6, '0');
}

function BabyDragon({
  direction,
  jumping,
  running,
  reduceMotion,
}: {
  direction: 1 | -1;
  jumping: boolean;
  running: boolean;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      animate={
        reduceMotion
          ? undefined
          : jumping
            ? { rotate: direction * 5 }
            : { y: [0, -2, 0] }
      }
      transition={
        jumping
          ? { duration: 0.2 }
          : {
              duration: running ? 0.28 : 1.7,
              repeat: Infinity,
              ease: 'easeInOut',
            }
      }
      className="h-[96px] w-[124px] origin-bottom"
      style={{
        transform: direction === -1 ? 'scaleX(-1)' : 'scaleX(1)',
      }}
    >
      <svg
        viewBox="0 0 180 140"
        className="h-full w-full overflow-visible drop-shadow-[0_14px_24px_rgba(34,211,238,0.26)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="dragonBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="58%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>

          <linearGradient id="dragonBelly" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>

          <linearGradient id="dragonWing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.42" />
          </linearGradient>
        </defs>

        <motion.path
          d="M50 94 C28 101 17 94 15 80 C25 88 34 82 43 72"
          fill="none"
          stroke="url(#dragonBody)"
          strokeWidth="13"
          strokeLinecap="round"
          animate={
            reduceMotion
              ? undefined
              : {
                  d: [
                    'M50 94 C28 101 17 94 15 80 C25 88 34 82 43 72',
                    'M50 94 C27 94 19 86 17 74 C27 83 35 78 43 72',
                    'M50 94 C28 101 17 94 15 80 C25 88 34 82 43 72',
                  ],
                }
          }
          transition={{
            duration: 0.65,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.path
          d="M71 67 C49 41 44 30 50 18 C66 27 76 38 82 55"
          fill="url(#dragonWing)"
          stroke="#a5f3fc"
          strokeWidth="2"
          animate={
            reduceMotion
              ? undefined
              : {
                  rotate: running ? [0, -10, 6, 0] : [0, -4, 0],
                }
          }
          transition={{
            duration: running ? 0.38 : 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ transformOrigin: '73px 63px' }}
        />

        <motion.path
          d="M94 64 C111 39 124 31 139 32 C137 47 125 59 108 69"
          fill="url(#dragonWing)"
          stroke="#c4b5fd"
          strokeWidth="2"
          animate={
            reduceMotion
              ? undefined
              : {
                  rotate: running ? [0, 9, -6, 0] : [0, 4, 0],
                }
          }
          transition={{
            duration: running ? 0.38 : 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ transformOrigin: '103px 65px' }}
        />

        <ellipse
          cx="86"
          cy="82"
          rx="39"
          ry="35"
          fill="url(#dragonBody)"
          stroke="#cffafe"
          strokeWidth="2.5"
        />

        <ellipse
          cx="88"
          cy="89"
          rx="19"
          ry="24"
          fill="url(#dragonBelly)"
          opacity="0.92"
        />

        <path
          d="M67 63 L60 44 L76 55"
          fill="#a78bfa"
          stroke="#ede9fe"
          strokeWidth="2"
        />
        <path
          d="M92 52 L91 33 L104 50"
          fill="#8b5cf6"
          stroke="#ede9fe"
          strokeWidth="2"
        />

        <ellipse
          cx="112"
          cy="58"
          rx="27"
          ry="23"
          fill="url(#dragonBody)"
          stroke="#cffafe"
          strokeWidth="2.5"
        />

        <path
          d="M101 39 L106 23 L116 42"
          fill="#fbbf24"
          stroke="#fef3c7"
          strokeWidth="2"
        />
        <path
          d="M120 39 L129 25 L132 45"
          fill="#f59e0b"
          stroke="#fef3c7"
          strokeWidth="2"
        />

        <ellipse cx="121" cy="55" rx="5" ry="6" fill="#020617" />
        <circle cx="123" cy="53" r="1.5" fill="#ffffff" />

        <ellipse cx="137" cy="64" rx="3.6" ry="2.5" fill="#0f172a" />

        <path
          d="M126 72 C132 76 139 76 144 71"
          fill="none"
          stroke="#0f172a"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        <motion.g
          animate={
            reduceMotion
              ? undefined
              : running
                ? { rotate: [16, -20, 16] }
                : { rotate: 0 }
          }
          transition={{
            duration: 0.3,
            repeat: running ? Infinity : 0,
            ease: 'linear',
          }}
          style={{ transformOrigin: '72px 104px' }}
        >
          <rect
            x="67"
            y="101"
            width="12"
            height="25"
            rx="6"
            fill="#22d3ee"
          />
          <path
            d="M67 124 C73 127 80 127 85 123"
            fill="none"
            stroke="#e0f2fe"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </motion.g>

        <motion.g
          animate={
            reduceMotion
              ? undefined
              : running
                ? { rotate: [-20, 16, -20] }
                : { rotate: 0 }
          }
          transition={{
            duration: 0.3,
            repeat: running ? Infinity : 0,
            ease: 'linear',
          }}
          style={{ transformOrigin: '98px 105px' }}
        >
          <rect
            x="94"
            y="102"
            width="12"
            height="25"
            rx="6"
            fill="#8b5cf6"
          />
          <path
            d="M94 124 C100 127 107 127 112 123"
            fill="none"
            stroke="#ede9fe"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </motion.g>

        <motion.path
          d="M145 62 C156 58 164 60 169 65 C161 68 154 69 146 68 Z"
          fill="#fb7185"
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.35, 0.75, 0.35],
                  scaleX: [0.8, 1.05, 0.8],
                }
          }
          transition={{
            duration: 1.1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ transformOrigin: '145px 65px' }}
        />
      </svg>
    </motion.div>
  );
}

function SpikeLane() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-[92px] z-[66] h-[30px]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-300/55 to-transparent" />

      <div className="absolute inset-x-0 top-[2px] flex h-[24px] overflow-hidden opacity-90">
        {Array.from({ length: 46 }).map((_, index) => (
          <motion.span
            key={index}
            animate={{ y: [0, 2, 0] }}
            transition={{
              duration: 0.8 + (index % 4) * 0.12,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: (index % 7) * 0.04,
            }}
            className="h-0 w-0 shrink-0 border-x-[18px] border-b-0 border-t-[24px] border-x-transparent border-t-red-400/75 drop-shadow-[0_0_8px_rgba(248,113,113,0.35)]"
          />
        ))}
      </div>
    </div>
  );
}

function FireIntro({
  onStart,
  onExit,
}: {
  onStart: () => void;
  onExit: () => void;
}) {
  const flameBands = [
    'left-0 top-0 h-full w-10 sm:w-16',
    'right-0 top-0 h-full w-10 sm:w-16',
    'left-0 top-0 h-10 w-full sm:h-16',
    'bottom-0 left-0 h-10 w-full sm:h-16',
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[#02050c]/84 px-4 backdrop-blur-md"
    >
      {flameBands.map((className, index) => (
        <motion.div
          key={className}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{
            opacity: [0, 0.9, 0.62, 0.9, 0.48],
            scale: [0.88, 1.05, 0.98, 1.03, 1],
          }}
          transition={{
            duration: 1.15,
            delay: index * 0.05,
            ease: 'easeOut',
          }}
          className={`pointer-events-none absolute ${className}`}
          style={{
            background:
              'radial-gradient(circle at center, rgba(254,240,138,.95) 0%, rgba(251,146,60,.88) 28%, rgba(239,68,68,.68) 56%, rgba(127,29,29,.18) 76%, transparent 100%)',
            filter: 'blur(7px)',
            boxShadow:
              '0 0 28px rgba(251,146,60,.6), 0 0 70px rgba(239,68,68,.34)',
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.32, duration: 0.55 }}
        className="relative w-full max-w-xl rounded-[2rem] border border-orange-300/15 bg-[#07101d]/96 p-6 text-center shadow-[0_30px_100px_rgba(0,0,0,0.58)] sm:p-8"
      >
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(251,146,60,.08),transparent_45%)]" />

        <div className="relative">
          <motion.div
            animate={{ rotate: [-5, 4, -5] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-300/20 bg-orange-300/[0.08] text-orange-200"
          >
            <Flame size={26} />
          </motion.div>

          <p className="mt-5 text-[10px] font-black uppercase tracking-[0.32em] text-orange-300">
            Dragon Run
          </p>

          <h2 className="mt-2 font-[var(--font-space)] text-4xl font-black tracking-tight text-white sm:text-5xl">
            GAME MODE
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-400">
            Scroll through the real portfolio while the baby dragon runs across
            the headings. New text platforms trigger automatic jumps.
          </p>

          <div className="mt-6 grid gap-3 text-left sm:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4">
              <div className="flex items-center gap-2 text-cyan-200">
                <MousePointer2 size={16} />
                <span className="text-[10px] font-black uppercase tracking-[0.18em]">
                  Move
                </span>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                Mouse wheel, trackpad, swipe, S / D, or ↓ / → moves forward.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4">
              <div className="flex items-center gap-2 text-violet-200">
                <Keyboard size={16} />
                <span className="text-[10px] font-black uppercase tracking-[0.18em]">
                  Jump
                </span>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                Space or W / ↑ jumps. A fast second jump can hit the spikes.
              </p>
            </div>
          </div>

          <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-red-300/80">
            Spike lane under the navbar = game over
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onStart}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3.5 text-sm font-black text-slate-950 transition hover:bg-cyan-200"
            >
              <Gamepad2 size={17} />
              Start Dragon Run
            </button>

            <button
              type="button"
              onClick={onExit}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.035] px-5 py-3.5 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
            >
              <X size={16} />
              Normal Mode
            </button>
          </div>

          <p className="mt-4 text-[10px] text-slate-600">
            Esc exits game mode anytime. On mobile, a quick tap performs a jump.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function PortfolioGameMode() {
  const reduceMotion = Boolean(useReducedMotion());

  const [active, setActive] = useState(false);
  const [introOpen, setIntroOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [dragonX, setDragonX] = useState(0);
  const [dragonFeetY, setDragonFeetY] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [jumpLevel, setJumpLevel] = useState<0 | 1 | 2>(0);
  const [autoHop, setAutoHop] = useState(false);
  const [running, setRunning] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const lastScrollYRef = useRef(0);
  const scoreRef = useRef(0);
  const headingKeyRef = useRef<string | null>(null);
  const headingIndexRef = useRef(-1);
  const dragonFeetRef = useRef(0);
  const jumpTimerRef = useRef<number | null>(null);
  const autoHopTimerRef = useRef<number | null>(null);
  const runningTimerRef = useRef<number | null>(null);
  const gameOverTimerRef = useRef<number | null>(null);
  const lastJumpAtRef = useRef(0);
  const touchStartRef = useRef<{
    x: number;
    y: number;
    time: number;
  } | null>(null);

  const updateScore = useCallback((points: number) => {
    if (points <= 0) return;

    scoreRef.current += points;
    setScore(scoreRef.current);
  }, []);

  const triggerGameOver = useCallback(() => {
    if (gameOverTimerRef.current) {
      window.clearTimeout(gameOverTimerRef.current);
    }

    setGameOver(true);
    setJumpLevel(0);
    setAutoHop(false);

    gameOverTimerRef.current = window.setTimeout(() => {
      setActive(false);
      setIntroOpen(false);
      setGameOver(false);
      setRunning(false);
    }, 1050);
  }, []);

  const measureWorld = useCallback(() => {
    if (!active || introOpen || gameOver) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const centerX = viewportWidth * 0.5;
    const centerY = viewportHeight * 0.55;

    const candidates = stageIds
      .map((id, index) => {
        const section = document.getElementById(id);
        const heading =
          section?.querySelector<HTMLElement>('h1, h2, h3') ?? null;

        if (!heading) return null;

        const rect = heading.getBoundingClientRect();

        return {
          id,
          index,
          heading,
          rect,
          distance: Math.abs(rect.top - centerY),
        };
      })
      .filter(
        (
          item,
        ): item is {
          id: string;
          index: number;
          heading: HTMLElement;
          rect: DOMRect;
          distance: number;
        } => Boolean(item),
      )
      .filter(
        item =>
          item.rect.bottom > -160 &&
          item.rect.top < viewportHeight + 160,
      )
      .sort((a, b) => a.distance - b.distance);

    const activeHeading = candidates[0];

    if (!activeHeading) {
      const fallbackFeet = centerY + 48;
      dragonFeetRef.current = fallbackFeet;
      setDragonX(centerX - 62);
      setDragonFeetY(fallbackFeet);
      return;
    }

    const headingCenterX =
      activeHeading.rect.left + activeHeading.rect.width / 2;

    const lockedCenterX = clamp(
      headingCenterX,
      centerX - 110,
      centerX + 110,
    );

    const feetY = clamp(
      activeHeading.rect.top - 2,
      centerY - 64,
      centerY + 72,
    );

    dragonFeetRef.current = feetY;
    setDragonX(lockedCenterX - 62);
    setDragonFeetY(feetY);

    const headingKey = `${activeHeading.id}:${activeHeading.heading.textContent ?? ''}`;

    if (
      headingKeyRef.current &&
      headingKeyRef.current !== headingKey
    ) {
      setAutoHop(true);

      if (autoHopTimerRef.current) {
        window.clearTimeout(autoHopTimerRef.current);
      }

      autoHopTimerRef.current = window.setTimeout(() => {
        setAutoHop(false);
      }, 430);

      if (activeHeading.index > headingIndexRef.current) {
        updateScore(50);
      }
    }

    headingKeyRef.current = headingKey;
    headingIndexRef.current = activeHeading.index;
  }, [active, gameOver, introOpen, updateScore]);

  const performJump = useCallback(() => {
    if (!active || introOpen || gameOver) return;

    const now = performance.now();
    const isDoubleJump =
      jumpLevel === 1 && now - lastJumpAtRef.current < 330;

    lastJumpAtRef.current = now;

    if (isDoubleJump) {
      setJumpLevel(2);

      window.setTimeout(() => {
        const projectedTop =
          dragonFeetRef.current - DRAGON_HEIGHT - 310;

        if (projectedTop <= SPIKE_BOTTOM) {
          triggerGameOver();
        }
      }, 120);
    } else {
      setJumpLevel(1);
    }

    if (jumpTimerRef.current) {
      window.clearTimeout(jumpTimerRef.current);
    }

    jumpTimerRef.current = window.setTimeout(() => {
      setJumpLevel(0);
    }, isDoubleJump ? 560 : 470);
  }, [
    active,
    gameOver,
    introOpen,
    jumpLevel,
    triggerGameOver,
  ]);

  const startGame = useCallback(() => {
    scoreRef.current = 0;
    headingKeyRef.current = null;
    headingIndexRef.current = -1;
    lastScrollYRef.current = window.scrollY;

    setScore(0);
    setActive(true);
    setIntroOpen(true);
    setGameOver(false);
    setJumpLevel(0);
    setAutoHop(false);
    setRunning(true);

    window.requestAnimationFrame(() => {
      measureWorld();
    });
  }, [measureWorld]);

  const exitGame = useCallback(() => {
    setActive(false);
    setIntroOpen(false);
    setGameOver(false);
    setRunning(false);
    setJumpLevel(0);
    setAutoHop(false);
  }, []);

  useEffect(() => {
    const handleExternalLaunch = () => {
      startGame();
    };

    window.addEventListener('portfolio-quest:start', handleExternalLaunch);

    return () => {
      window.removeEventListener('portfolio-quest:start', handleExternalLaunch);
    };
  }, [startGame]);

  useEffect(() => {
    if (!active || introOpen || gameOver) return;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollYRef.current;

      if (delta > 0) {
        updateScore(Math.max(1, Math.round(delta / 10)));
        setDirection(1);
      } else if (delta < 0) {
        setDirection(-1);
      }

      lastScrollYRef.current = currentY;

      setRunning(true);

      if (runningTimerRef.current) {
        window.clearTimeout(runningTimerRef.current);
      }

      runningTimerRef.current = window.setTimeout(() => {
        setRunning(true);
      }, 150);

      window.requestAnimationFrame(measureWorld);
    };

    const handleResize = () => {
      window.requestAnimationFrame(measureWorld);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    window.requestAnimationFrame(measureWorld);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [
    active,
    gameOver,
    introOpen,
    measureWorld,
    updateScore,
  ]);

  useEffect(() => {
    if (!active || introOpen || gameOver) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;

      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
      ) {
        return;
      }

      const key = event.key.toLowerCase();

      if (key === 'escape') {
        event.preventDefault();
        exitGame();
        return;
      }

      if (key === ' ' || key === 'w' || key === 'arrowup') {
        event.preventDefault();
        performJump();
        return;
      }

      if (key === 'd' || key === 'arrowright' || key === 's' || key === 'arrowdown') {
        event.preventDefault();
        setDirection(1);
        window.scrollBy({
          top: 210,
          behavior: reduceMotion ? 'auto' : 'smooth',
        });
        return;
      }

      if (key === 'a' || key === 'arrowleft') {
        event.preventDefault();
        setDirection(-1);
        window.scrollBy({
          top: -180,
          behavior: reduceMotion ? 'auto' : 'smooth',
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    active,
    exitGame,
    gameOver,
    introOpen,
    performJump,
    reduceMotion,
  ]);

  useEffect(() => {
    if (!active || introOpen || gameOver) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') return;

      touchStartRef.current = {
        x: event.clientX,
        y: event.clientY,
        time: performance.now(),
      };
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') return;

      const start = touchStartRef.current;
      touchStartRef.current = null;

      if (!start) return;

      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      const distance = Math.hypot(dx, dy);
      const duration = performance.now() - start.time;

      if (distance < 14 && duration < 260) {
        performJump();
      }
    };

    window.addEventListener('pointerdown', handlePointerDown, {
      passive: true,
    });
    window.addEventListener('pointerup', handlePointerUp, {
      passive: true,
    });

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [
    active,
    gameOver,
    introOpen,
    performJump,
  ]);

  useEffect(() => {
    return () => {
      if (jumpTimerRef.current) {
        window.clearTimeout(jumpTimerRef.current);
      }

      if (autoHopTimerRef.current) {
        window.clearTimeout(autoHopTimerRef.current);
      }

      if (runningTimerRef.current) {
        window.clearTimeout(runningTimerRef.current);
      }

      if (gameOverTimerRef.current) {
        window.clearTimeout(gameOverTimerRef.current);
      }
    };
  }, []);

  const jumpOffset =
    jumpLevel === 2
      ? 310
      : jumpLevel === 1
        ? 145
        : autoHop
          ? 86
          : 0;

  const dragonTop =
    dragonFeetY - DRAGON_HEIGHT - jumpOffset;

  return (
    <>
      <AnimatePresence>
        {active && (
          <>
            {!introOpen && !gameOver && <SpikeLane />}

            {!introOpen && !gameOver && (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="fixed right-4 top-[132px] z-[72] rounded-xl border border-cyan-300/15 bg-[#07101d]/88 px-3 py-2 text-right shadow-[0_14px_40px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:right-6"
                >
                  <p className="text-[8px] font-black uppercase tracking-[0.22em] text-slate-500">
                    Score
                  </p>
                  <p className="mt-0.5 font-[var(--font-space)] text-lg font-black tracking-[0.12em] text-cyan-200">
                    {formatScore(score)}
                  </p>
                </motion.div>

                <motion.div
                  animate={{
                    left: dragonX,
                    top: dragonTop,
                  }}
                  transition={{
                    left: {
                      duration: reduceMotion ? 0 : 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    },
                    top: jumpLevel > 0 || autoHop
                      ? {
                          duration:
                            jumpLevel === 2
                              ? 0.28
                              : 0.34,
                          ease: [0.2, 0.85, 0.3, 1],
                        }
                      : {
                          duration: reduceMotion ? 0 : 0.16,
                          ease: 'easeOut',
                        },
                  }}
                  className="pointer-events-none fixed z-[70]"
                  aria-hidden="true"
                >
                  <BabyDragon
                    direction={direction}
                    jumping={jumpLevel > 0 || autoHop}
                    running={running}
                    reduceMotion={reduceMotion}
                  />

                  <motion.div
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            scaleX: running ? [0.9, 1.12, 0.9] : [0.96, 1.03, 0.96],
                            opacity: [0.24, 0.42, 0.24],
                          }
                    }
                    transition={{
                      duration: running ? 0.28 : 1.4,
                      repeat: Infinity,
                    }}
                    className="mx-auto -mt-2 h-2 w-20 rounded-full bg-cyan-300/20 blur-[2px]"
                  />
                </motion.div>
              </>
            )}

            <AnimatePresence>
              {introOpen && (
                <FireIntro
                  onStart={() => {
                    setIntroOpen(false);
                    lastScrollYRef.current = window.scrollY;

                    window.requestAnimationFrame(() => {
                      measureWorld();
                    });
                  }}
                  onExit={exitGame}
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {gameOver && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-none fixed inset-0 z-[92] flex items-center justify-center bg-red-950/18 backdrop-blur-[2px]"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.84, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.06 }}
                    className="rounded-2xl border border-red-300/20 bg-[#08090f]/94 px-7 py-5 text-center shadow-[0_24px_80px_rgba(127,29,29,0.4)]"
                  >
                    <p className="text-[9px] font-black uppercase tracking-[0.25em] text-red-300">
                      Spike Hit
                    </p>
                    <p className="mt-1 font-[var(--font-space)] text-3xl font-black text-white">
                      GAME OVER
                    </p>
                    <p className="mt-2 text-xs text-slate-400">
                      Score {formatScore(score)} · continuing normal portfolio
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
