'use client';

import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  Code2,
  ExternalLink,
  Flame,
  Network,
  RefreshCw,
  TerminalSquare,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { socials } from '../data/socials';

type CalendarDay = {
  date: string;
  count: number;
};

type LeetCodeStats = {
  username: string;

  solved: {
    all: number;
    easy: number;
    medium: number;
    hard: number;
  };

  questions: {
    all: number;
    easy: number;
    medium: number;
    hard: number;
  };

  activity: {
    calendar: CalendarDay[];
    totalSubmissions: number;
    activeDays: number;
    maxStreak: number;
  };

  updatedAt: string;
};

const profileMeta = {
  GitHub: {
    icon: FaGithub,
    index: '01',
    signal: 'BUILD',
    title: 'Source Code & Projects',
    description:
      'Repositories, experiments, project implementations, and the code behind what I build.',
    action: 'Explore GitHub',
    accent: 'from-white via-slate-300 to-cyan-300',
    glow: 'bg-cyan-300/[0.06]',
  },

  LinkedIn: {
    icon: FaLinkedin,
    index: '02',
    signal: 'CONNECT',
    title: 'Professional Network',
    description:
      'My professional presence, technical journey, achievements, collaborations, and career network.',
    action: 'View LinkedIn',
    accent: 'from-sky-300 via-cyan-300 to-blue-400',
    glow: 'bg-sky-400/[0.06]',
  },

  LeetCode: {
    icon: SiLeetcode,
    index: '03',
    signal: 'SOLVE',
    title: 'Algorithms & Problem Solving',
    description:
      'A space where I practice structured thinking, algorithms, data structures, and coding problems.',
    action: 'Open LeetCode',
    accent: 'from-amber-300 via-orange-300 to-cyan-300',
    glow: 'bg-amber-300/[0.05]',
  },
};

const rowVariants = {
  hidden: {
    opacity: 0,
    y: 28,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function getIntensityClass(count: number) {
  if (count <= 0) {
    return 'bg-white/[0.045]';
  }

  if (count === 1) {
    return 'bg-cyan-500/25';
  }

  if (count <= 3) {
    return 'bg-cyan-400/45';
  }

  if (count <= 5) {
    return 'bg-cyan-300/70';
  }

  return 'bg-violet-300/90 shadow-[0_0_8px_rgba(196,181,253,0.28)]';
}

function SolvedRing({ solved, total }: { solved: number; total: number }) {
  const radius = 68;
  const circumference = 2 * Math.PI * radius;

  const percentage = total > 0 ? Math.min((solved / total) * 100, 100) : 0;

  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex h-[190px] w-[190px] items-center justify-center">
      <svg
        viewBox="0 0 170 170"
        className="absolute inset-0 h-full w-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="85"
          cy="85"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.055)"
          strokeWidth="8"
        />

        <motion.circle
          cx="85"
          cy="85"
          r={radius}
          fill="none"
          stroke="url(#leetcode-ring)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{
            strokeDashoffset: circumference,
          }}
          animate={{
            strokeDashoffset: offset,
          }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        <defs>
          <linearGradient
            id="leetcode-ring"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="55%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#c4b5fd" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative text-center">
        <div className="flex items-end justify-center gap-1">
          <motion.span
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="font-[var(--font-space)] text-4xl font-black text-white"
          >
            {solved}
          </motion.span>

          <span className="mb-1 text-sm font-medium text-slate-500">
            /{total}
          </span>
        </div>

        <div className="mt-1 flex items-center justify-center gap-1.5 text-sm text-slate-300">
          <Check size={14} className="text-emerald-400" />
          Solved
        </div>
      </div>
    </div>
  );
}

function DifficultyStat({
  label,
  solved,
  total,
  className,
}: {
  label: string;
  solved: number;
  total: number;
  className: string;
}) {
  return (
    <div className="border-l border-white/[0.07] pl-4 first:border-l-0 first:pl-0 sm:border-l sm:pl-5">
      <p
        className={`text-[10px] font-bold uppercase tracking-[0.2em] ${className}`}
      >
        {label}
      </p>

      <p className="mt-1 font-[var(--font-space)] text-lg font-bold text-white">
        {solved}
        <span className="text-xs font-medium text-slate-600">/{total}</span>
      </p>
    </div>
  );
}

function ActivityHeatmap({ calendar }: { calendar: CalendarDay[] }) {
  const cells = useMemo(() => {
    if (!calendar.length) return [];

    const firstDate = new Date(`${calendar[0].date}T00:00:00Z`);

    const leadingEmpty = firstDate.getUTCDay();

    return [
      ...Array.from(
        {
          length: leadingEmpty,
        },
        () => null,
      ),
      ...calendar,
    ];
  }, [calendar]);

  const months = useMemo(() => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      month: 'short',
    });

    const result: string[] = [];

    const now = new Date();

    for (let index = 11; index >= 0; index -= 1) {
      const date = new Date(now.getFullYear(), now.getMonth() - index, 1);

      result.push(formatter.format(date));
    }

    return result;
  }, []);

  return (
    <div className="min-w-0">
      <div className="no-scrollbar overflow-x-auto pb-2">
        <div className="min-w-[760px]">
          <div className="mb-3 flex justify-between px-1 text-[10px] font-medium text-slate-600">
            {months.map((month, index) => (
              <span key={`${month}-${index}`}>{month}</span>
            ))}
          </div>

          <div
            className="grid w-max grid-flow-col gap-[3px]"
            style={{
              gridTemplateRows: 'repeat(7, 11px)',
            }}
          >
            {cells.map((day, index) => {
              if (!day) {
                return (
                  <span key={`empty-${index}`} className="h-[11px] w-[11px]" />
                );
              }

              return (
                <motion.span
                  key={day.date}
                  initial={{
                    opacity: 0,
                    scale: 0.7,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.2,
                    delay: Math.min(index * 0.0015, 0.35),
                  }}
                  title={`${day.date}: ${day.count} ${
                    day.count === 1 ? 'submission' : 'submissions'
                  }`}
                  className={`h-[11px] w-[11px] rounded-[3px] ${getIntensityClass(
                    day.count,
                  )} transition duration-200 hover:scale-125 hover:ring-1 hover:ring-cyan-200/50`}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <span className="text-[9px] uppercase tracking-[0.18em] text-slate-700">
          Less
        </span>

        {[0, 1, 2, 4, 7].map(value => (
          <span
            key={value}
            className={`h-2.5 w-2.5 rounded-[3px] ${getIntensityClass(value)}`}
          />
        ))}

        <span className="text-[9px] uppercase tracking-[0.18em] text-slate-700">
          More
        </span>
      </div>
    </div>
  );
}

function LiveLeetCodeDashboard({ profileUrl }: { profileUrl: string }) {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadStats = async () => {
      try {
        const response = await fetch('/api/leetcode');

        if (!response.ok) {
          throw new Error('Unable to load LeetCode stats');
        }

        const data = (await response.json()) as LeetCodeStats;

        if (!cancelled) {
          setStats(data);
          setError(false);
        }
      } catch {
        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadStats();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="mt-14 border-y border-white/[0.08] py-10">
        <div className="animate-pulse">
          <div className="h-4 w-44 rounded-full bg-white/[0.06]" />

          <div className="mt-6 grid gap-5 lg:grid-cols-[0.36fr_0.64fr]">
            <div className="h-64 rounded-[2rem] bg-white/[0.035]" />

            <div className="h-64 rounded-[2rem] bg-white/[0.035]" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="mt-14 border-y border-white/[0.08] py-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">
              Live LeetCode
            </p>

            <p className="mt-3 text-sm text-slate-400">
              Live statistics are temporarily unavailable. The portfolio remains
              fully functional.
            </p>
          </div>

          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200"
          >
            Open LeetCode
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: '-80px',
      }}
      transition={{
        duration: 0.7,
      }}
      className="mt-14"
    >
      {/* LIVE HEADER */}
      <div className="flex flex-col justify-between gap-5 border-y border-white/[0.08] py-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/15 bg-amber-300/[0.05] text-amber-300">
            <SiLeetcode size={17} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-[var(--font-space)] text-lg font-bold text-white">
                Live Problem-Solving Activity
              </h3>

              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-35" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
            </div>

            <p className="mt-1 text-xs text-slate-600">
              @{stats.username} · synced from LeetCode
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <RefreshCw size={13} className="text-slate-600" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
            Live data
          </span>

          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-slate-500 transition hover:border-amber-300/25 hover:text-amber-200"
            aria-label="Open LeetCode profile"
          >
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      {/* DASHBOARD */}
      <div className="grid gap-5 py-6 lg:grid-cols-[0.36fr_0.64fr]">
        {/* SOLVED */}
        <div
          data-cursor-interactive="true"
          className="relative overflow-hidden rounded-[2rem] border border-white/[0.075] bg-[#07101d]/48 p-6 backdrop-blur-xl"
        >
          <div className="pointer-events-none absolute -left-12 -top-14 h-40 w-40 rounded-full bg-amber-300/[0.045] blur-[60px]" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-600">
                  Progress
                </p>

                <h4 className="mt-1 font-[var(--font-space)] text-xl font-bold text-white">
                  Problems Solved
                </h4>
              </div>

              <SiLeetcode className="h-6 w-6 text-amber-300/70" />
            </div>

            <div className="mt-4 flex justify-center">
              <SolvedRing
                solved={stats.solved.all}
                total={stats.questions.all}
              />
            </div>

            <div className="grid grid-cols-3 gap-3 border-t border-white/[0.07] pt-5">
              <DifficultyStat
                label="Easy"
                solved={stats.solved.easy}
                total={stats.questions.easy}
                className="text-cyan-300"
              />

              <DifficultyStat
                label="Medium"
                solved={stats.solved.medium}
                total={stats.questions.medium}
                className="text-amber-300"
              />

              <DifficultyStat
                label="Hard"
                solved={stats.solved.hard}
                total={stats.questions.hard}
                className="text-rose-300"
              />
            </div>
          </div>
        </div>

        {/* ACTIVITY */}
        <div
          data-cursor-interactive="true"
          className="relative overflow-hidden rounded-[2rem] border border-white/[0.075] bg-[#07101d]/48 p-6 backdrop-blur-xl"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-300/[0.045] blur-[75px]" />

          <div className="relative">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-600">
                  Consistency
                </p>

                <h4 className="mt-1 font-[var(--font-space)] text-xl font-bold text-white">
                  Past 12 Months
                </h4>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-3">
                <div>
                  <p className="font-[var(--font-space)] text-xl font-black text-white">
                    {stats.activity.totalSubmissions}
                  </p>

                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                    Submissions
                  </p>
                </div>

                <div>
                  <p className="font-[var(--font-space)] text-xl font-black text-cyan-200">
                    {stats.activity.activeDays}
                  </p>

                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                    Active Days
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-[var(--font-space)] text-xl font-black text-violet-200">
                      {stats.activity.maxStreak}
                    </p>

                    <Flame size={14} className="text-orange-300" />
                  </div>

                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                    Max Streak
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-9">
              <ActivityHeatmap calendar={stats.activity.calendar} />
            </div>

            <div className="mt-7 flex items-center gap-3 border-t border-white/[0.07] pt-5">
              <span className="h-px w-8 bg-cyan-300/40" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                Consistency over intensity
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function CodingProfiles() {
  const leetcodeProfile =
    socials.find(item => item.name === 'LeetCode')?.url ??
    'https://leetcode.com/';

  return (
    <section
      id="profiles"
      className="relative z-10 overflow-hidden py-24 sm:py-28"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[12%] top-[8%] h-80 w-80 rounded-full bg-cyan-400/[0.035] blur-[130px]" />

        <div className="absolute bottom-[5%] right-[8%] h-96 w-96 rounded-full bg-violet-500/[0.035] blur-[145px]" />

        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(103,232,249,0.8) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
          }}
        />
      </div>

      <div className="section-container relative">
        {/* HEADER */}
        <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <motion.div
            initial={{
              opacity: 0,
              x: -24,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              margin: '-80px',
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/15 bg-cyan-300/[0.05] text-cyan-200">
                <TerminalSquare size={16} />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300 sm:text-sm">
                Developer Footprint
              </p>
            </div>

            <h2 className="max-w-4xl font-[var(--font-space)] text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl md:text-6xl">
              The work continues
              <span className="block bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent">
                beyond this portfolio.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: '-80px',
            }}
            transition={{
              duration: 0.7,
              delay: 0.12,
            }}
          >
            <p className="max-w-xl text-sm leading-7 text-slate-400 md:text-base">
              Explore the places where I build, practice problem solving,
              document my work, and connect with the wider developer community.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-12 bg-cyan-300/45" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-600 sm:text-xs">
                Build · Solve · Connect
              </span>
            </div>
          </motion.div>
        </div>

        {/* TERMINAL */}
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.65,
          }}
          className="mb-4 flex items-center justify-between gap-5 border-y border-white/[0.07] py-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-400/60" />
              <span className="h-2 w-2 rounded-full bg-amber-300/60" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/60" />
            </div>

            <div className="h-4 w-px bg-white/[0.08]" />

            <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500 sm:text-xs">
              <span className="text-cyan-300/60">$</span>

              <span>explore --developer-footprint</span>

              <motion.span
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
                className="h-3.5 w-[5px] bg-cyan-300/70"
              />
            </div>
          </div>

          <Code2 size={15} className="hidden text-slate-700 sm:block" />
        </motion.div>

        {/* SOCIAL PROFILES */}
        <div className="border-b border-white/[0.08]">
          {socials.map(item => {
            const meta = profileMeta[item.name as keyof typeof profileMeta];

            if (!meta) return null;

            const Icon = meta.icon;

            return (
              <motion.a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-interactive="true"
                variants={rowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  margin: '-80px',
                }}
                whileHover="hover"
                className="group relative block overflow-hidden border-t border-white/[0.08]"
              >
                <motion.div
                  variants={{
                    hover: {
                      opacity: 1,
                    },
                  }}
                  initial={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-300/[0.025] via-white/[0.015] to-violet-400/[0.02]"
                />

                <div
                  className={`pointer-events-none absolute right-[10%] top-1/2 h-40 w-40 -translate-y-1/2 rounded-full ${meta.glow} opacity-0 blur-[65px] transition duration-500 group-hover:opacity-100`}
                />

                <div className="relative grid gap-7 py-9 sm:py-11 lg:grid-cols-[0.12fr_0.22fr_0.46fr_0.2fr] lg:items-center lg:gap-8">
                  <div className="flex items-center gap-3">
                    <span className="font-[var(--font-space)] text-xs font-bold tracking-[0.22em] text-cyan-300/50">
                      {meta.index}
                    </span>

                    <span className="h-px w-7 bg-white/10 lg:hidden" />

                    <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-slate-600 lg:hidden">
                      {meta.signal}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <motion.div
                      variants={{
                        hover: {
                          y: -4,
                          rotate: -4,
                          scale: 1.08,
                        },
                      }}
                      transition={{
                        duration: 0.28,
                      }}
                      className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.025]"
                    >
                      <Icon className="relative h-6 w-6 text-slate-200 transition-colors duration-300 group-hover:text-cyan-200" />
                    </motion.div>

                    <div>
                      <p className="hidden text-[9px] font-bold uppercase tracking-[0.24em] text-slate-600 lg:block">
                        {meta.signal}
                      </p>

                      <h3 className="font-[var(--font-space)] text-xl font-bold text-white md:text-2xl">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  <div>
                    <p
                      className={`bg-gradient-to-r ${meta.accent} bg-clip-text font-[var(--font-space)] text-lg font-bold text-transparent md:text-xl`}
                    >
                      {meta.title}
                    </p>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 transition-colors duration-300 group-hover:text-slate-400">
                      {meta.description}
                    </p>

                    <p className="mt-2 text-[11px] text-slate-600">
                      {item.label}
                    </p>
                  </div>

                  <div className="flex items-center lg:justify-end">
                    <motion.div
                      variants={{
                        hover: {
                          x: 5,
                        },
                      }}
                      className="inline-flex items-center gap-3"
                    >
                      <span className="text-xs font-semibold text-slate-400 transition group-hover:text-cyan-200">
                        {meta.action}
                      </span>

                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] text-slate-500 transition group-hover:border-cyan-300/25 group-hover:text-cyan-200">
                        <ArrowUpRight size={16} />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* LIVE LEETCODE */}
        <LiveLeetCodeDashboard profileUrl={leetcodeProfile} />

        {/* FOOTER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <Network size={14} className="text-cyan-300/55" />

            <p className="text-xs text-slate-500">
              Follow the links to explore my work beyond this website.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-600">
            <span>Code</span>

            <span className="h-1 w-1 rounded-full bg-cyan-300/40" />

            <span>Practice</span>

            <span className="h-1 w-1 rounded-full bg-cyan-300/40" />

            <span>Connect</span>

            <ExternalLink size={11} className="ml-1" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
