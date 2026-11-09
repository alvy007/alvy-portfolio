'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  Crosshair,
  Flag,
  Gamepad2,
  Map,
  Play,
  RotateCcw,
  Sparkles,
  Trophy,
  X,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { profile } from '../data/profile';

type Mission = {
  id: string;
  title: string;
  subtitle: string;
  objective: string;
  xp: number;
};

const missions: Mission[] = [
  {
    id: 'home',
    title: 'Spawn Point',
    subtitle: 'Meet the builder',
    objective: 'Enter the portfolio and meet Alvy.',
    xp: 50,
  },
  {
    id: 'toolkit',
    title: 'Loadout',
    subtitle: 'Unlock the engineering stack',
    objective: 'Inspect the technologies used to build and ship.',
    xp: 75,
  },
  {
    id: 'story',
    title: 'Origin Story',
    subtitle: 'Problems became products',
    objective: 'Discover the real problems behind the builds.',
    xp: 75,
  },
  {
    id: 'education',
    title: 'Academic Base',
    subtitle: 'CSE foundation',
    objective: 'Explore the academic journey and final-year project.',
    xp: 100,
  },
  {
    id: 'experience',
    title: 'Field Experience',
    subtitle: 'Work and internships',
    objective: 'Review professional work and hands-on internship missions.',
    xp: 100,
  },
  {
    id: 'skills',
    title: 'Skill Tree',
    subtitle: 'What I can build',
    objective: 'Unlock the four core engineering capability paths.',
    xp: 100,
  },
  {
    id: 'profiles',
    title: 'Developer Stats',
    subtitle: 'Code activity',
    objective: 'Inspect live coding profiles and problem-solving activity.',
    xp: 100,
  },
  {
    id: 'projects',
    title: 'Build Arena',
    subtitle: 'Real systems',
    objective: 'Explore software, AI, robotics, IoT, and security projects.',
    xp: 150,
  },
  {
    id: 'research',
    title: 'Research Lab',
    subtitle: 'Investigate and evaluate',
    objective: 'Enter the research lab and inspect current manuscripts.',
    xp: 150,
  },
  {
    id: 'achievements',
    title: 'Trophy Room',
    subtitle: 'Milestones unlocked',
    objective: 'Collect the competition and leadership milestones.',
    xp: 100,
  },
  {
    id: 'certifications',
    title: 'Credential Vault',
    subtitle: 'Verified learning',
    objective: 'Review focused professional credentials.',
    xp: 75,
  },
  {
    id: 'explore-me',
    title: 'Social Portal',
    subtitle: 'Open the network',
    objective: 'Find the social and developer profile gateways.',
    xp: 75,
  },
  {
    id: 'contact',
    title: 'Final Portal',
    subtitle: 'Start a collaboration',
    objective: 'Reach the contact portal and complete the quest.',
    xp: 150,
  },
];

const TOTAL_XP = missions.reduce((sum, mission) => sum + mission.xp, 0);

export function PortfolioGameMode() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [currentVisible, setCurrentVisible] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  const currentMission = missions[currentIndex];

  const currentXp = useMemo(
    () =>
      missions
        .filter(mission => completed.includes(mission.id))
        .reduce((sum, mission) => sum + mission.xp, 0),
    [completed],
  );

  const progress = Math.round((completed.length / missions.length) * 100);
  const victory = completed.length === missions.length;

  const scrollToMission = (index: number) => {
    const mission = missions[index];
    const target = document.getElementById(mission.id);

    if (!target) return;

    setCurrentIndex(index);

    target.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const goPrevious = () => {
    scrollToMission(Math.max(0, currentIndex - 1));
  };

  const goNext = () => {
    scrollToMission(Math.min(missions.length - 1, currentIndex + 1));
  };

  const showToast = (message: string) => {
    if (toastTimer.current) {
      window.clearTimeout(toastTimer.current);
    }

    setToast(message);

    toastTimer.current = window.setTimeout(() => {
      setToast(null);
    }, 1500);
  };

  const claimMission = () => {
    if (!currentVisible) {
      showToast('Move to the checkpoint first.');
      return;
    }

    if (completed.includes(currentMission.id)) {
      showToast('Checkpoint already collected.');
      return;
    }

    setCompleted(items => [...items, currentMission.id]);
    showToast(`+${currentMission.xp} XP · ${currentMission.title} cleared`);
  };

  const startGame = () => {
    setActive(true);
    setBriefingOpen(true);
    setCurrentIndex(0);
    setCompleted([]);
    setCurrentVisible(false);

    window.requestAnimationFrame(() => {
      const home = document.getElementById('home');

      home?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    });
  };

  const exitGame = () => {
    setActive(false);
    setBriefingOpen(false);
    setCurrentVisible(false);
  };

  const restartGame = () => {
    setCompleted([]);
    setCurrentIndex(0);
    setBriefingOpen(false);

    const home = document.getElementById('home');

    home?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  useEffect(() => {
    if (!active || briefingOpen) return;

    const target = document.getElementById(currentMission.id);

    if (!target) return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];

        setCurrentVisible(
          Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.18),
        );
      },
      {
        threshold: [0, 0.18, 0.35, 0.6],
        rootMargin: '-12% 0px -18% 0px',
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [active, briefingOpen, currentMission.id]);

  useEffect(() => {
    if (!active || briefingOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;

      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (event.key === 'Escape') {
        exitGame();
        return;
      }

      if (
        event.key === 'ArrowRight' ||
        event.key.toLowerCase() === 'd' ||
        event.key.toLowerCase() === 's'
      ) {
        event.preventDefault();
        goNext();
        return;
      }

      if (
        event.key === 'ArrowLeft' ||
        event.key.toLowerCase() === 'a' ||
        event.key.toLowerCase() === 'w'
      ) {
        event.preventDefault();
        goPrevious();
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        claimMission();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        window.clearTimeout(toastTimer.current);
      }
    };
  }, []);

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
          className="fixed bottom-5 right-4 z-[70] flex items-center gap-3 rounded-full border border-cyan-300/20 bg-[#07101d]/92 px-4 py-3 text-sm font-bold text-white shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:bottom-7 sm:right-7 sm:px-5"
          aria-label="Start Portfolio Quest game mode"
        >
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200">
            <span className="absolute inset-1 rounded-full border border-violet-300/10" />
            <Gamepad2 size={19} className="relative" />
          </span>

          <span className="text-left">
            <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-300">
              Optional Mode
            </span>
            <span className="mt-0.5 block">Play Portfolio Quest</span>
          </span>
        </motion.button>
      )}

      <AnimatePresence>
        {active && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none fixed inset-0 z-[58]"
              aria-hidden="true"
            >
              <div className="absolute inset-3 rounded-[2rem] border border-cyan-300/[0.08] sm:inset-5" />

              <div className="absolute left-4 top-4 h-10 w-10 border-l border-t border-cyan-300/30 sm:left-7 sm:top-7" />
              <div className="absolute right-4 top-4 h-10 w-10 border-r border-t border-violet-300/30 sm:right-7 sm:top-7" />
              <div className="absolute bottom-4 left-4 h-10 w-10 border-b border-l border-violet-300/25 sm:bottom-7 sm:left-7" />
              <div className="absolute bottom-4 right-4 h-10 w-10 border-b border-r border-cyan-300/25 sm:bottom-7 sm:right-7" />

              <div className="absolute inset-x-0 top-[88px] h-px bg-gradient-to-r from-transparent via-cyan-300/15 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="fixed left-3 right-3 top-[84px] z-[65] mx-auto max-w-5xl rounded-2xl border border-white/[0.08] bg-[#07101d]/88 px-3 py-3 shadow-[0_18px_55px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:left-5 sm:right-5 sm:px-4"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-cyan-300/25 bg-cyan-300/[0.06]">
                  <Image
                    src={profile.image}
                    alt={profile.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-black uppercase tracking-[0.16em] text-white sm:text-sm">
                        Portfolio Quest
                      </p>

                      <p className="mt-0.5 truncate text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500 sm:text-[10px]">
                        Level {currentIndex + 1}/{missions.length} · {currentMission.title}
                      </p>
                    </div>

                    <div className="hidden items-center gap-2 sm:flex">
                      <span className="rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-200">
                        {currentXp}/{TOTAL_XP} XP
                      </span>

                      <span className="rounded-full border border-violet-300/15 bg-violet-300/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-violet-200">
                        {progress}%
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.07]">
                    <motion.div
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.45 }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-400"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={exitGame}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-slate-400 transition hover:border-red-300/25 hover:bg-red-400/[0.07] hover:text-red-200"
                  aria-label="Exit game mode"
                >
                  <X size={17} />
                </button>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 18 }}
              className="fixed right-4 top-[162px] z-[64] hidden w-[270px] rounded-3xl border border-white/[0.08] bg-[#07101d]/86 p-4 shadow-[0_22px_65px_rgba(0,0,0,0.38)] backdrop-blur-2xl xl:block"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-cyan-200">
                  <Map size={15} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                    Quest Map
                  </span>
                </div>

                <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-600">
                  {completed.length}/{missions.length}
                </span>
              </div>

              <div className="mt-4 max-h-[52vh] space-y-1 overflow-y-auto pr-1">
                {missions.map((mission, index) => {
                  const done = completed.includes(mission.id);
                  const current = index === currentIndex;

                  return (
                    <button
                      key={mission.id}
                      type="button"
                      onClick={() => scrollToMission(index)}
                      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition ${
                        current
                          ? 'bg-cyan-300/[0.08] text-white'
                          : 'text-slate-500 hover:bg-white/[0.035] hover:text-slate-300'
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[9px] font-black ${
                          done
                            ? 'border-emerald-300/25 bg-emerald-300/[0.08] text-emerald-200'
                            : current
                              ? 'border-cyan-300/25 bg-cyan-300/[0.08] text-cyan-200'
                              : 'border-white/[0.08] bg-white/[0.025] text-slate-600'
                        }`}
                      >
                        {done ? <Check size={13} /> : String(index + 1).padStart(2, '0')}
                      </span>

                      <span className="min-w-0">
                        <span className="block truncate text-[11px] font-bold">
                          {mission.title}
                        </span>
                        <span className="mt-0.5 block truncate text-[9px] uppercase tracking-[0.12em] opacity-60">
                          {mission.subtitle}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.aside>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              className="fixed bottom-3 left-3 right-3 z-[66] mx-auto max-w-3xl rounded-[1.65rem] border border-white/[0.09] bg-[#07101d]/92 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:bottom-5 sm:left-5 sm:right-5 sm:p-4"
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={goPrevious}
                  disabled={currentIndex === 0}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-slate-300 transition hover:border-cyan-300/25 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-25"
                  aria-label="Previous mission"
                >
                  <ArrowLeft size={17} />
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Crosshair
                      size={14}
                      className={currentVisible ? 'text-emerald-300' : 'text-slate-600'}
                    />

                    <p className="truncate text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">
                      {currentMission.title}
                    </p>

                    <span
                      className={`ml-auto hidden rounded-full px-2 py-1 text-[8px] font-black uppercase tracking-[0.13em] sm:inline-flex ${
                        currentVisible
                          ? 'bg-emerald-300/[0.08] text-emerald-200'
                          : 'bg-white/[0.04] text-slate-600'
                      }`}
                    >
                      {currentVisible ? 'Core in range' : 'Find checkpoint'}
                    </span>
                  </div>

                  <p className="mt-1 hidden truncate text-xs text-slate-500 sm:block">
                    {currentMission.objective}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={claimMission}
                  disabled={!currentVisible || completed.includes(currentMission.id)}
                  className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-3 text-xs font-black uppercase tracking-[0.11em] text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-white/[0.07] disabled:text-slate-600 sm:px-4"
                >
                  {completed.includes(currentMission.id) ? (
                    <>
                      <Check size={15} />
                      <span className="hidden sm:inline">Collected</span>
                    </>
                  ) : (
                    <>
                      <Zap size={15} />
                      <span className="hidden sm:inline">Collect +{currentMission.xp}</span>
                      <span className="sm:hidden">+{currentMission.xp}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  disabled={currentIndex === missions.length - 1}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-slate-300 transition hover:border-cyan-300/25 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-25"
                  aria-label="Next mission"
                >
                  <ArrowRight size={17} />
                </button>
              </div>

              <div className="mt-3 hidden items-center justify-between border-t border-white/[0.06] pt-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-600 sm:flex">
                <span>W/A or ← Previous</span>
                <span>Enter / Space Collect</span>
                <span>S/D or → Next</span>
              </div>
            </motion.div>

            <AnimatePresence>
              {toast && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.96 }}
                  className="fixed bottom-24 left-1/2 z-[72] -translate-x-1/2 rounded-full border border-cyan-300/15 bg-[#07101d]/95 px-4 py-2 text-center text-xs font-bold text-cyan-100 shadow-[0_16px_45px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:bottom-32"
                >
                  {toast}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {briefingOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[75] flex items-center justify-center bg-[#030712]/78 px-4 py-24 backdrop-blur-xl"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 18, scale: 0.97 }}
                    className="w-full max-w-2xl overflow-hidden rounded-[2rem] border border-cyan-300/[0.14] bg-[#07101d] shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
                  >
                    <div className="relative overflow-hidden p-6 sm:p-8">
                      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-300/[0.08] blur-[80px]" />
                      <div className="pointer-events-none absolute -bottom-28 -left-24 h-64 w-64 rounded-full bg-violet-500/[0.08] blur-[90px]" />

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
                              Mission Briefing
                            </p>

                            <h2 className="mt-1 font-[var(--font-space)] text-2xl font-black text-white sm:text-3xl">
                              Portfolio Quest
                            </h2>
                          </div>
                        </div>

                        <p className="mt-6 text-sm leading-7 text-slate-300 sm:text-base">
                          Explore the real portfolio as a guided game. Move through
                          each checkpoint, inspect the actual section, then collect
                          its energy core to earn XP. Finish all checkpoints to
                          unlock the final quest completion screen.
                        </p>

                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                          {[
                            ['13', 'Checkpoints'],
                            [String(TOTAL_XP), 'Total XP'],
                            ['1', 'Full Portfolio'],
                          ].map(([value, label]) => (
                            <div
                              key={label}
                              className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4"
                            >
                              <p className="font-[var(--font-space)] text-2xl font-black text-white">
                                {value}
                              </p>
                              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">
                                {label}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-cyan-300/[0.1] bg-cyan-300/[0.04] p-4">
                          <Gamepad2
                            size={18}
                            className="mt-0.5 shrink-0 text-cyan-200"
                          />
                          <p className="text-xs leading-6 text-slate-400">
                            Desktop: use W/A or ← for previous, S/D or → for next,
                            and Enter/Space to collect. Mobile: use the on-screen
                            controls. Normal scrolling still works.
                          </p>
                        </div>

                        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                          <button
                            type="button"
                            onClick={() => setBriefingOpen(false)}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3.5 text-sm font-black text-slate-950 transition hover:bg-cyan-200"
                          >
                            <Play size={17} />
                            Enter the Quest
                          </button>

                          <button
                            type="button"
                            onClick={exitGame}
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.035] px-5 py-3.5 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
                          >
                            Continue Normal Mode
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {victory && !briefingOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[74] flex items-center justify-center bg-[#030712]/72 px-4 py-24 backdrop-blur-xl"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-cyan-300/[0.15] bg-[#07101d] p-7 text-center shadow-[0_30px_100px_rgba(0,0,0,0.55)] sm:p-9"
                  >
                    <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/[0.1] blur-[90px]" />

                    <div className="relative">
                      <motion.div
                        animate={reduceMotion ? undefined : { rotate: [0, -8, 8, 0] }}
                        transition={{
                          duration: 1.4,
                          repeat: Infinity,
                          repeatDelay: 1.2,
                        }}
                        className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.7rem] border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200"
                      >
                        <Trophy size={36} />
                      </motion.div>

                      <p className="mt-6 text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">
                        Quest Complete
                      </p>

                      <h2 className="mt-2 font-[var(--font-space)] text-3xl font-black text-white sm:text-4xl">
                        You explored the full portfolio.
                      </h2>

                      <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-400">
                        All {missions.length} checkpoints cleared and {TOTAL_XP} XP
                        collected. You have seen the stack, education, experience,
                        projects, research, achievements, profiles, and contact
                        portal.
                      </p>

                      <div className="mt-7 flex items-center justify-center gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.06] px-4 py-2 text-xs font-bold text-emerald-200">
                          <Flag size={14} />
                          {TOTAL_XP} XP
                        </span>

                        <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/15 bg-violet-300/[0.06] px-4 py-2 text-xs font-bold text-violet-200">
                          <Sparkles size={14} />
                          100% Explored
                        </span>
                      </div>

                      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <button
                          type="button"
                          onClick={restartGame}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-white transition hover:border-cyan-300/20 hover:bg-white/[0.07]"
                        >
                          <RotateCcw size={16} />
                          Replay Quest
                        </button>

                        <button
                          type="button"
                          onClick={exitGame}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3.5 text-sm font-black text-slate-950 transition hover:bg-cyan-200"
                        >
                          <ArrowDown size={16} />
                          Continue Portfolio
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
