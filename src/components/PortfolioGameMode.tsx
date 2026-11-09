'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ChevronUp,
  Flag,
  Gamepad2,
  RotateCcw,
  Sparkles,
  Trophy,
  X,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { profile } from '../data/profile';

type Stage = {
  id: string;
  label: string;
  subtitle: string;
  xp: number;
};

type Platform = {
  left: number;
  top: number;
  width: number;
};

const stages: Stage[] = [
  { id: 'home', label: 'Spawn Point', subtitle: 'Meet Alvy', xp: 50 },
  { id: 'toolkit', label: 'Toolkit', subtitle: 'Engineering stack', xp: 75 },
  { id: 'story', label: 'Origin Story', subtitle: 'Problems into products', xp: 75 },
  { id: 'education', label: 'Education', subtitle: 'Academic foundation', xp: 100 },
  { id: 'experience', label: 'Experience', subtitle: 'Work and internships', xp: 100 },
  { id: 'skills', label: 'Skill Tree', subtitle: 'What I build', xp: 100 },
  { id: 'profiles', label: 'Developer Stats', subtitle: 'Code activity', xp: 100 },
  { id: 'projects', label: 'Projects', subtitle: 'Real systems', xp: 150 },
  { id: 'research', label: 'Research Lab', subtitle: 'Applied research', xp: 150 },
  { id: 'achievements', label: 'Achievements', subtitle: 'Milestones', xp: 100 },
  { id: 'certifications', label: 'Certifications', subtitle: 'Credentials', xp: 75 },
  { id: 'explore-me', label: 'Social Portal', subtitle: 'Find me online', xp: 75 },
  { id: 'contact', label: 'Final Portal', subtitle: 'Start a collaboration', xp: 150 },
];

const TOTAL_XP = stages.reduce((sum, stage) => sum + stage.xp, 0);
const PLAYER_WIDTH = 58;
const PLAYER_HEIGHT = 78;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function PortfolioGameMode() {
  const reduceMotion = useReducedMotion();

  const [active, setActive] = useState(false);
  const [introOpen, setIntroOpen] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [playerProgress, setPlayerProgress] = useState(0.06);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [walking, setWalking] = useState(false);
  const [jumping, setJumping] = useState(false);
  const [platform, setPlatform] = useState<Platform>({
    left: 48,
    top: 360,
    width: 720,
  });
  const [toast, setToast] = useState<string | null>(null);
  const [victoryOpen, setVictoryOpen] = useState(false);

  const keysRef = useRef(new Set<string>());
  const toastTimerRef = useRef<number | null>(null);
  const jumpTimerRef = useRef<number | null>(null);
  const transitionLockRef = useRef(false);
  const lastFrameRef = useRef<number | null>(null);

  const currentStage = stages[stageIndex];

  const currentXp = useMemo(
    () =>
      stages
        .filter(stage => completed.includes(stage.id))
        .reduce((sum, stage) => sum + stage.xp, 0),
    [completed],
  );

  const progressPercent = Math.round(
    (completed.length / stages.length) * 100,
  );

  const showToast = useCallback((message: string) => {
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }

    setToast(message);

    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
    }, 1400);
  }, []);

  const syncPlatform = useCallback(() => {
    if (!active) return;

    const section = document.getElementById(currentStage.id);
    if (!section) return;

    const heading =
      section.querySelector<HTMLElement>('h1, h2, h3') ??
      section.querySelector<HTMLElement>('p');

    if (!heading) return;

    const rect = heading.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const minWidth = Math.min(520, viewportWidth - 48);
    const desiredWidth = Math.max(rect.width, minWidth);
    const maxWidth = viewportWidth - 48;
    const width = Math.min(desiredWidth, maxWidth);

    const center = clamp(
      rect.left + rect.width / 2,
      width / 2 + 24,
      viewportWidth - width / 2 - 24,
    );

    const left = center - width / 2;
    const top = clamp(
      rect.top - 8,
      170,
      viewportHeight - 150,
    );

    setPlatform({
      left,
      top,
      width,
    });
  }, [active, currentStage.id]);

  const scrollToStage = useCallback(
    (index: number) => {
      const nextStage = stages[index];
      const target = document.getElementById(nextStage.id);

      if (!target) return;

      target.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      });

      window.setTimeout(() => {
        window.requestAnimationFrame(syncPlatform);
      }, reduceMotion ? 0 : 520);
    },
    [reduceMotion, syncPlatform],
  );

  const jump = useCallback(() => {
    if (!active || introOpen || jumping) return;

    setJumping(true);

    if (jumpTimerRef.current) {
      window.clearTimeout(jumpTimerRef.current);
    }

    jumpTimerRef.current = window.setTimeout(() => {
      setJumping(false);
    }, 460);
  }, [active, introOpen, jumping]);

  const completeStage = useCallback(
    (index: number) => {
      if (transitionLockRef.current) return;

      const stage = stages[index];
      transitionLockRef.current = true;

      setCompleted(items =>
        items.includes(stage.id) ? items : [...items, stage.id],
      );

      showToast(`+${stage.xp} XP · ${stage.label} cleared`);

      if (index === stages.length - 1) {
        window.setTimeout(() => {
          setVictoryOpen(true);
          transitionLockRef.current = false;
        }, 450);
        return;
      }

      window.setTimeout(() => {
        const nextIndex = index + 1;

        setStageIndex(nextIndex);
        setPlayerProgress(0.06);
        setDirection(1);
        scrollToStage(nextIndex);

        window.setTimeout(() => {
          transitionLockRef.current = false;
        }, reduceMotion ? 120 : 650);
      }, 380);
    },
    [reduceMotion, scrollToStage, showToast],
  );

  const goToPreviousStage = useCallback(() => {
    if (stageIndex === 0 || transitionLockRef.current) return;

    transitionLockRef.current = true;
    const previousIndex = stageIndex - 1;

    setStageIndex(previousIndex);
    setPlayerProgress(0.9);
    setDirection(-1);
    scrollToStage(previousIndex);

    window.setTimeout(() => {
      transitionLockRef.current = false;
    }, reduceMotion ? 120 : 650);
  }, [reduceMotion, scrollToStage, stageIndex]);

  const startGame = useCallback(() => {
    setActive(true);
    setIntroOpen(true);
    setVictoryOpen(false);
    setStageIndex(0);
    setCompleted([]);
    setPlayerProgress(0.06);
    setDirection(1);
    setWalking(false);
    setJumping(false);

    window.requestAnimationFrame(() => {
      document.getElementById('home')?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      });

      window.setTimeout(() => {
        window.requestAnimationFrame(syncPlatform);
      }, reduceMotion ? 0 : 450);
    });
  }, [reduceMotion, syncPlatform]);

  const exitGame = useCallback(() => {
    keysRef.current.clear();
    setWalking(false);
    setActive(false);
    setIntroOpen(false);
    setVictoryOpen(false);
    setJumping(false);
  }, []);

  const restartGame = useCallback(() => {
    transitionLockRef.current = false;
    setCompleted([]);
    setStageIndex(0);
    setPlayerProgress(0.06);
    setDirection(1);
    setWalking(false);
    setJumping(false);
    setVictoryOpen(false);

    window.requestAnimationFrame(() => {
      scrollToStage(0);
    });
  }, [scrollToStage]);

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
    if (!active) return;

    const handleViewportChange = () => {
      window.requestAnimationFrame(syncPlatform);
    };

    window.addEventListener('scroll', handleViewportChange, { passive: true });
    window.addEventListener('resize', handleViewportChange);

    window.requestAnimationFrame(syncPlatform);

    return () => {
      window.removeEventListener('scroll', handleViewportChange);
      window.removeEventListener('resize', handleViewportChange);
    };
  }, [active, syncPlatform]);

  useEffect(() => {
    if (!active || introOpen || victoryOpen) return;

    const movementKeys = new Set([
      'a',
      'd',
      'arrowleft',
      'arrowright',
    ]);

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

      if (key === 'w' || key === 'arrowup' || key === ' ') {
        event.preventDefault();
        jump();
        return;
      }

      if (movementKeys.has(key)) {
        event.preventDefault();
        keysRef.current.add(key);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keysRef.current.delete(event.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      keysRef.current.clear();
    };
  }, [active, exitGame, introOpen, jump, victoryOpen]);

  useEffect(() => {
    if (!active || introOpen || victoryOpen) return;

    let rafId = 0;

    const frame = (time: number) => {
      const previous = lastFrameRef.current ?? time;
      const delta = Math.min((time - previous) / 1000, 0.04);
      lastFrameRef.current = time;

      const keys = keysRef.current;
      const movingRight =
        keys.has('d') || keys.has('arrowright');
      const movingLeft =
        keys.has('a') || keys.has('arrowleft');

      const movement = movingRight === movingLeft
        ? 0
        : movingRight
          ? 1
          : -1;

      setWalking(Boolean(movement));

      if (movement !== 0 && !transitionLockRef.current) {
        setDirection(movement as 1 | -1);

        setPlayerProgress(previousProgress => {
          const next = clamp(
            previousProgress + movement * delta * 0.42,
            0.035,
            0.965,
          );

          if (movement > 0 && next >= 0.935) {
            window.requestAnimationFrame(() => {
              completeStage(stageIndex);
            });
          }

          if (movement < 0 && next <= 0.045 && stageIndex > 0) {
            window.requestAnimationFrame(goToPreviousStage);
          }

          return next;
        });
      }

      rafId = window.requestAnimationFrame(frame);
    };

    rafId = window.requestAnimationFrame(frame);

    return () => {
      window.cancelAnimationFrame(rafId);
      lastFrameRef.current = null;
      setWalking(false);
    };
  }, [
    active,
    completeStage,
    goToPreviousStage,
    introOpen,
    stageIndex,
    victoryOpen,
  ]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }

      if (jumpTimerRef.current) {
        window.clearTimeout(jumpTimerRef.current);
      }
    };
  }, []);

  const playerLeft =
    platform.left + platform.width * playerProgress - PLAYER_WIDTH / 2;

  const playerTop = platform.top - PLAYER_HEIGHT + 2;

  const handlePressStart = (key: 'left' | 'right') => {
    if (!active || introOpen || victoryOpen) return;

    const mappedKey = key === 'left' ? 'arrowleft' : 'arrowright';
    keysRef.current.add(mappedKey);
  };

  const handlePressEnd = (key: 'left' | 'right') => {
    const mappedKey = key === 'left' ? 'arrowleft' : 'arrowright';
    keysRef.current.delete(mappedKey);
  };

  return (
    <>
      {!active && (
        <motion.button
          type="button"
          onClick={startGame}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          data-cursor-interactive="true"
          className="fixed bottom-5 right-4 z-[70] hidden items-center gap-3 rounded-full border border-cyan-300/20 bg-[#07101d]/92 px-4 py-3 text-sm font-bold text-white shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur-2xl xl:flex"
          aria-label="Start Portfolio Quest game mode"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200">
            <Gamepad2 size={19} />
          </span>

          <span className="text-left">
            <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-300">
              Side-Scroller
            </span>
            <span className="mt-0.5 block">Play Portfolio Quest</span>
          </span>
        </motion.button>
      )}

      <AnimatePresence>
        {active && (
          <>
            <div className="pointer-events-none fixed inset-0 z-[58]">
              <div className="absolute inset-x-0 top-[92px] h-px bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent" />

              <motion.div
                animate={{
                  left: platform.left,
                  top: platform.top,
                  width: platform.width,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute h-[4px] rounded-full bg-gradient-to-r from-cyan-300/25 via-cyan-200/70 to-violet-300/35 shadow-[0_0_22px_rgba(34,211,238,0.22)]"
              >
                <div className="absolute inset-x-0 top-[4px] h-[2px] bg-white/[0.035]" />

                <div className="absolute left-0 top-[-5px] h-3 w-3 rounded-full border border-cyan-200/40 bg-[#06111e]" />

                <motion.div
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          y: [0, -6, 0],
                          rotate: [0, -5, 5, 0],
                        }
                  }
                  transition={{
                    duration: 1.25,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute right-[-5px] top-[-42px] flex flex-col items-center"
                >
                  <Flag size={28} className="text-violet-200" />
                  <span className="mt-1 rounded-full border border-violet-300/15 bg-[#07101d]/90 px-2 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-violet-100">
                    Goal
                  </span>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              animate={{
                left: playerLeft,
                top: playerTop,
                y: jumping ? -78 : walking && !reduceMotion ? [0, -2, 0] : 0,
                rotate: jumping
                  ? direction * 7
                  : walking
                    ? direction * 2
                    : 0,
              }}
              transition={{
                left: {
                  duration: 0.04,
                  ease: 'linear',
                },
                top: {
                  duration: reduceMotion ? 0 : 0.28,
                  ease: [0.22, 1, 0.36, 1],
                },
                y: jumping
                  ? {
                      duration: 0.46,
                      ease: [0.2, 0.85, 0.35, 1],
                    }
                  : walking && !reduceMotion
                    ? {
                        duration: 0.22,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }
                    : {
                        duration: 0.15,
                      },
                rotate: {
                  duration: 0.16,
                },
              }}
              className="pointer-events-none fixed z-[68] h-[78px] w-[58px]"
              style={{
                transformOrigin: '50% 100%',
              }}
              aria-hidden="true"
            >
              <div
                className="relative h-full w-full"
                style={{
                  transform:
                    direction === -1 ? 'scaleX(-1)' : 'scaleX(1)',
                }}
              >
                <motion.div
                  animate={
                    walking && !jumping && !reduceMotion
                      ? { y: [0, -1.5, 0] }
                      : { y: 0 }
                  }
                  transition={{
                    duration: 0.22,
                    repeat: walking ? Infinity : 0,
                  }}
                  className="absolute left-1/2 top-0 h-[46px] w-[46px] -translate-x-1/2 overflow-hidden rounded-[15px] border-2 border-cyan-200/50 bg-[#07101d] shadow-[0_8px_28px_rgba(34,211,238,0.28)]"
                >
                  <Image
                    src={profile.image}
                    alt=""
                    fill
                    sizes="46px"
                    className="object-cover"
                    priority
                  />
                </motion.div>

                <div className="absolute left-1/2 top-[42px] h-[25px] w-[30px] -translate-x-1/2 rounded-[7px_7px_5px_5px] border border-cyan-200/25 bg-gradient-to-b from-cyan-300 to-sky-500 shadow-[0_0_18px_rgba(34,211,238,0.18)]">
                  <div className="absolute left-[5px] top-[6px] h-[8px] w-[4px] rounded-full bg-white/55" />
                  <div className="absolute right-[5px] top-[6px] h-[8px] w-[4px] rounded-full bg-white/55" />
                </div>

                <motion.div
                  animate={
                    walking && !jumping && !reduceMotion
                      ? { rotate: [22, -22, 22] }
                      : { rotate: 0 }
                  }
                  transition={{
                    duration: 0.28,
                    repeat: walking ? Infinity : 0,
                    ease: 'linear',
                  }}
                  className="absolute bottom-0 left-[16px] h-[17px] w-[7px] origin-top rounded-full bg-violet-300"
                />

                <motion.div
                  animate={
                    walking && !jumping && !reduceMotion
                      ? { rotate: [-22, 22, -22] }
                      : { rotate: 0 }
                  }
                  transition={{
                    duration: 0.28,
                    repeat: walking ? Infinity : 0,
                    ease: 'linear',
                  }}
                  className="absolute bottom-0 right-[16px] h-[17px] w-[7px] origin-top rounded-full bg-cyan-200"
                />

                {jumping && (
                  <motion.div
                    initial={{ opacity: 0.8, scale: 0.6 }}
                    animate={{ opacity: 0, scale: 1.8 }}
                    transition={{ duration: 0.4 }}
                    className="absolute bottom-[-3px] left-1/2 h-5 w-10 -translate-x-1/2 rounded-full border border-cyan-200/30"
                  />
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed left-3 right-3 top-[84px] z-[69] mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#07101d]/88 px-3 py-3 shadow-[0_16px_50px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:left-5 sm:right-5 sm:px-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-300/[0.06] text-cyan-200">
                <Gamepad2 size={17} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200 sm:text-xs">
                      Stage {stageIndex + 1}/{stages.length} · {currentStage.label}
                    </p>
                    <p className="mt-0.5 truncate text-[9px] uppercase tracking-[0.14em] text-slate-500">
                      {currentStage.subtitle}
                    </p>
                  </div>

                  <div className="hidden items-center gap-2 sm:flex">
                    <span className="rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.13em] text-cyan-100">
                      {currentXp}/{TOTAL_XP} XP
                    </span>
                    <span className="rounded-full border border-violet-300/15 bg-violet-300/[0.06] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.13em] text-violet-100">
                      {progressPercent}%
                    </span>
                  </div>
                </div>

                <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    animate={{ width: `${progressPercent}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-400"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={exitGame}
                aria-label="Exit game mode"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-400 transition hover:border-red-300/20 hover:bg-red-300/[0.05] hover:text-red-200"
              >
                <X size={16} />
              </button>
            </motion.div>

            <div className="fixed bottom-4 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-2xl border border-white/[0.08] bg-[#07101d]/90 p-2 shadow-[0_18px_55px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:bottom-5">
              <button
                type="button"
                onPointerDown={() => handlePressStart('left')}
                onPointerUp={() => handlePressEnd('left')}
                onPointerLeave={() => handlePressEnd('left')}
                onPointerCancel={() => handlePressEnd('left')}
                aria-label="Move left"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-slate-200 transition hover:border-cyan-300/25 hover:text-cyan-200"
              >
                <ArrowLeft size={20} />
              </button>

              <button
                type="button"
                onClick={jump}
                aria-label="Jump"
                className="flex h-12 min-w-[66px] items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 text-xs font-black uppercase tracking-[0.1em] text-slate-950 transition hover:bg-cyan-200"
              >
                <ChevronUp size={18} />
                Jump
              </button>

              <button
                type="button"
                onPointerDown={() => handlePressStart('right')}
                onPointerUp={() => handlePressEnd('right')}
                onPointerLeave={() => handlePressEnd('right')}
                onPointerCancel={() => handlePressEnd('right')}
                aria-label="Move right"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-slate-200 transition hover:border-cyan-300/25 hover:text-cyan-200"
              >
                <ArrowRight size={20} />
              </button>
            </div>

            <div className="pointer-events-none fixed bottom-[86px] left-1/2 z-[69] hidden -translate-x-1/2 rounded-full border border-white/[0.07] bg-[#07101d]/75 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 backdrop-blur-xl md:block">
              A / D or ← / → to walk · W / ↑ / Space to jump
            </div>

            <AnimatePresence>
              {toast && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.96 }}
                  className="fixed bottom-28 left-1/2 z-[74] -translate-x-1/2 rounded-full border border-cyan-300/15 bg-[#07101d]/95 px-4 py-2 text-center text-xs font-bold text-cyan-100 shadow-[0_16px_45px_rgba(0,0,0,0.42)] backdrop-blur-xl"
                >
                  {toast}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {introOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[76] flex items-center justify-center bg-[#030712]/80 px-4 py-20 backdrop-blur-xl"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.97 }}
                    className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-cyan-300/[0.14] bg-[#07101d] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.55)] sm:p-8"
                  >
                    <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-300/[0.08] blur-[85px]" />
                    <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-violet-500/[0.08] blur-[90px]" />

                    <div className="relative">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-cyan-300/25">
                          <Image
                            src={profile.image}
                            alt={profile.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>

                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">
                            Side-Scroller Mode
                          </p>
                          <h2 className="mt-1 font-[var(--font-space)] text-2xl font-black text-white sm:text-3xl">
                            Walk across the portfolio.
                          </h2>
                        </div>
                      </div>

                      <p className="mt-6 text-sm leading-7 text-slate-300 sm:text-base">
                        Your mini Alvy avatar will land on each portfolio
                        section heading. Walk across the text, jump while you
                        move, and reach the flag on the right to unlock the next
                        section.
                      </p>

                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        {[
                          ['A / D', 'Walk'],
                          ['W / Space', 'Jump'],
                          [String(stages.length), 'Stages'],
                        ].map(([value, label]) => (
                          <div
                            key={label}
                            className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4"
                          >
                            <p className="font-[var(--font-space)] text-xl font-black text-white">
                              {value}
                            </p>
                            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">
                              {label}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex gap-3 rounded-2xl border border-violet-300/[0.1] bg-violet-300/[0.04] p-4">
                        <Sparkles
                          size={18}
                          className="mt-0.5 shrink-0 text-violet-200"
                        />
                        <p className="text-xs leading-6 text-slate-400">
                          This uses the real portfolio as the game world. No
                          duplicate pages. Each real heading becomes your next
                          platform.
                        </p>
                      </div>

                      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        <button
                          type="button"
                          onClick={() => {
                            setIntroOpen(false);
                            window.requestAnimationFrame(syncPlatform);
                          }}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3.5 text-sm font-black text-slate-950 transition hover:bg-cyan-200"
                        >
                          <Gamepad2 size={17} />
                          Start Walking
                        </button>

                        <button
                          type="button"
                          onClick={exitGame}
                          className="inline-flex items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.035] px-5 py-3.5 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
                        >
                          Continue Normal Mode
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {victoryOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[77] flex items-center justify-center bg-[#030712]/76 px-4 py-20 backdrop-blur-xl"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-cyan-300/[0.15] bg-[#07101d] p-7 text-center shadow-[0_30px_100px_rgba(0,0,0,0.55)] sm:p-9"
                  >
                    <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/[0.1] blur-[90px]" />

                    <div className="relative">
                      <motion.div
                        animate={
                          reduceMotion
                            ? undefined
                            : { y: [0, -8, 0], rotate: [0, -4, 4, 0] }
                        }
                        transition={{
                          duration: 1.4,
                          repeat: Infinity,
                          repeatDelay: 0.8,
                        }}
                        className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.7rem] border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200"
                      >
                        <Trophy size={36} />
                      </motion.div>

                      <p className="mt-6 text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">
                        Full Run Complete
                      </p>

                      <h2 className="mt-2 font-[var(--font-space)] text-3xl font-black text-white sm:text-4xl">
                        You walked through the entire portfolio.
                      </h2>

                      <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-400">
                        All {stages.length} stages cleared and {TOTAL_XP} XP
                        collected.
                      </p>

                      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <button
                          type="button"
                          onClick={restartGame}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-white transition hover:border-cyan-300/20 hover:bg-white/[0.07]"
                        >
                          <RotateCcw size={16} />
                          Replay
                        </button>

                        <button
                          type="button"
                          onClick={exitGame}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3.5 text-sm font-black text-slate-950 transition hover:bg-cyan-200"
                        >
                          <Zap size={16} />
                          Back to Portfolio
                        </button>
                      </div>
                    </div>
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
