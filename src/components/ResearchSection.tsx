'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import {
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  FileText,
  FlaskConical,
  Leaf,
  Microscope,
  ShieldCheck,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { researchItems } from '../data/research';

const researchVisuals = [
  {
    icon: Leaf,
    signal: 'RESEARCH',
    accent: 'from-emerald-300 via-cyan-300 to-sky-300',
    glow: 'bg-emerald-400/[0.045]',
  },
  {
    icon: ShieldCheck,
    signal: 'SECURITY',
    accent: 'from-cyan-300 via-blue-300 to-violet-300',
    glow: 'bg-cyan-400/[0.045]',
  },
  {
    icon: BrainCircuit,
    signal: 'AI SYSTEMS',
    accent: 'from-violet-300 via-fuchsia-300 to-cyan-300',
    glow: 'bg-violet-500/[0.045]',
  },
];

const itemVariant = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

type CounterProps = {
  value: number;
  className?: string;
};

function AnimatedCounter({ value, className = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const isInView = useInView(ref, {
    once: true,
    margin: '-60px',
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1100;
    const startTime = performance.now();

    let animationFrame = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isInView, value]);

  return (
    <motion.span
      ref={ref}
      initial={{
        opacity: 0,
        y: 8,
        filter: 'blur(4px)',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.45,
      }}
      className={className}
    >
      {String(displayValue).padStart(2, '0')}
    </motion.span>
  );
}

export function ResearchSection() {
  const paperCount = useMemo(
    () => researchItems.filter(item => Boolean(item.pdf)).length,
    [],
  );

  const activeResearchCount = researchItems.filter(item => item.active).length;

  return (
    <section
      id="research"
      className="relative z-10 overflow-hidden py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-[8%] h-[28rem] w-[28rem] rounded-full bg-cyan-400/[0.035] blur-[135px]" />

        <div className="absolute -right-44 bottom-[5%] h-[32rem] w-[32rem] rounded-full bg-violet-500/[0.04] blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(103,232,249,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(103,232,249,0.08) 1px, transparent 1px)',
            backgroundSize: '54px 54px',
          }}
        />
      </div>

      <div className="section-container relative">
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
                <FlaskConical size={16} />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300 sm:text-sm">
                Research & Innovation
              </p>
            </div>

            <h2 className="max-w-4xl font-[var(--font-space)] text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl md:text-6xl">
              Research shaped around
              <span className="block bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent">
                real technical problems.
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
              My research interests connect artificial intelligence, robotics,
              cybersecurity, computer vision, and sustainable systems with
              practical engineering challenges.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-12 bg-cyan-300/45" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-600 sm:text-xs">
                Investigate · Build · Evaluate
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 16,
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
          className="mb-4 flex flex-col gap-6 border-y border-white/[0.07] py-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <Microscope size={15} className="text-cyan-300/70" />

            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-600">
              Active Research Portfolio
            </span>
          </div>

          <div className="grid grid-cols-3 gap-x-7 gap-y-4">
            <div>
              <AnimatedCounter
                value={researchItems.length}
                className="font-[var(--font-space)] text-xl font-black text-white"
              />

              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                Research Works
              </p>
            </div>

            <div className="border-l border-white/[0.08] pl-7">
              <AnimatedCounter
                value={paperCount}
                className="font-[var(--font-space)] text-xl font-black text-cyan-200"
              />

              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                Paper Records
              </p>
            </div>

            <div className="border-l border-white/[0.08] pl-7">
              <AnimatedCounter
                value={activeResearchCount}
                className="font-[var(--font-space)] text-xl font-black text-violet-200"
              />

              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                Active Works
              </p>
            </div>
          </div>
        </motion.div>

        <div className="border-b border-white/[0.08]">
          {researchItems.map((item, index) => {
            const visual = researchVisuals[index % researchVisuals.length];
            const isPaper = Boolean(item.pdf);
            const hasPreview = Boolean(item.pdf && item.image);
            const Icon = visual.icon;

            return (
              <motion.article
                key={item.title}
                variants={itemVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  margin: '-80px',
                }}
                data-cursor-interactive="true"
                className={`group relative overflow-hidden border-t py-10 sm:py-12 ${
                  isPaper ? 'border-cyan-300/[0.12]' : 'border-white/[0.08]'
                }`}
              >
                {isPaper && (
                  <>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-300/[0.018] via-transparent to-violet-400/[0.02]" />
                    <div className="pointer-events-none absolute right-[6%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-cyan-300/[0.04] opacity-60 blur-[100px]" />
                  </>
                )}

                <div
                  className={`pointer-events-none absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full ${visual.glow} opacity-0 blur-[90px] transition duration-500 group-hover:opacity-100`}
                />

                <motion.div
                  initial={{
                    scaleX: 0,
                  }}
                  whileInView={{
                    scaleX: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.9,
                    delay: 0.12,
                  }}
                  className={`absolute left-0 top-0 h-px origin-left bg-gradient-to-r ${
                    isPaper
                      ? 'w-52 from-amber-300 via-cyan-300 to-violet-300'
                      : `w-28 ${visual.accent}`
                  }`}
                />

                <div className="relative grid gap-8 lg:grid-cols-[0.11fr_0.28fr_0.61fr] lg:gap-10">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-[var(--font-space)] text-xs font-bold tracking-[0.22em] text-cyan-300/50">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span className="h-px w-7 bg-white/10 lg:hidden" />

                      <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-600 lg:hidden">
                        {isPaper ? 'PAPER' : visual.signal}
                      </span>
                    </div>
                  </div>

                  <div>
                    {hasPreview ? (
                      <a
                        href={item.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/preview block"
                        data-cursor-interactive="true"
                      >
                        <div className="overflow-hidden rounded-3xl border border-amber-300/15 bg-white/[0.03] shadow-[0_18px_60px_rgba(0,0,0,0.28)] transition duration-500 group-hover/preview:-translate-y-1 group-hover/preview:border-cyan-300/25">
                          <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-900">
                            <Image
                              src={item.image!}
                              alt={`${item.title} paper preview`}
                              fill
                              className="object-cover object-top transition duration-700 group-hover/preview:scale-[1.03]"
                            />

                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-transparent p-4">
                              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-200/90">
                                <FileText size={12} />
                                Paper Preview
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    ) : (
                      <>
                        <motion.div
                          whileHover={{
                            rotate: -5,
                            scale: 1.06,
                          }}
                          transition={{
                            duration: 0.25,
                          }}
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                            isPaper
                              ? 'border-amber-300/15 bg-amber-300/[0.055] text-amber-200'
                              : 'border-white/[0.08] bg-white/[0.025] text-cyan-200'
                          }`}
                        >
                          {isPaper ? (
                            <FileText size={21} />
                          ) : (
                            <Icon size={21} />
                          )}
                        </motion.div>
                      </>
                    )}

                    <p
                      className={`mt-5 hidden text-[9px] font-bold uppercase tracking-[0.22em] lg:block ${
                        isPaper ? 'text-amber-300/60' : 'text-slate-600'
                      }`}
                    >
                      {isPaper ? 'PAPER' : visual.signal}
                    </p>

                    <span className="mt-3 inline-flex rounded-full border border-violet-300/15 bg-violet-300/[0.055] px-3 py-1.5 text-[10px] font-semibold leading-4 text-violet-100">
                      {item.status}
                    </span>

                    {isPaper && (
                      <div className="mt-4 flex items-center gap-2">
                        <BookOpen size={12} className="text-cyan-300/55" />

                        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-300/50">
                          PDF Available
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                      <div className="max-w-4xl">
                        <h3 className="font-[var(--font-space)] text-2xl font-bold leading-[1.18] tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-50 md:text-3xl">
                          {item.title}
                        </h3>

                        <p
                          className={`mt-4 bg-gradient-to-r ${
                            isPaper
                              ? 'from-amber-300 via-cyan-300 to-violet-300'
                              : visual.accent
                          } bg-clip-text text-[10px] font-bold uppercase tracking-[0.2em] text-transparent sm:text-xs`}
                        >
                          {item.field}
                        </p>
                      </div>

                      {item.pdf && (
                        <a
                          href={item.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor-interactive="true"
                          className="group/paper inline-flex shrink-0 items-center gap-3 self-start rounded-full border border-cyan-300/15 bg-cyan-300/[0.045] px-4 py-2.5 text-xs font-semibold text-cyan-100 transition duration-300 hover:border-cyan-300/30 hover:bg-cyan-300/[0.08]"
                        >
                          <FileText size={14} />
                          Read Paper
                          <ArrowUpRight
                            size={14}
                            className="transition-transform duration-300 group-hover/paper:-translate-y-0.5 group-hover/paper:translate-x-0.5"
                          />
                        </a>
                      )}
                    </div>

                    <p className="mt-6 max-w-4xl text-sm leading-7 text-slate-400 md:text-base">
                      {item.description}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
                      {item.tags.map(tag => (
                        <div key={tag} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-cyan-300/65" />

                          <span className="text-xs font-medium text-slate-500 transition-colors duration-300 group-hover:text-slate-400">
                            {tag}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-col gap-4 border-t border-white/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <span className="relative flex h-2 w-2">
                          <span
                            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-20 ${
                              isPaper ? 'bg-amber-300' : 'bg-cyan-300'
                            }`}
                          />

                          <span
                            className={`relative inline-flex h-2 w-2 rounded-full ${
                              isPaper ? 'bg-amber-300/80' : 'bg-cyan-300/80'
                            }`}
                          />
                        </span>

                        <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-600">
                          {isPaper ? 'Paper record' : 'Research record'} ·{' '}
                          {item.status}
                        </p>
                      </div>

                      {item.pdf && (
                        <a
                          href={item.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600 transition hover:text-cyan-300"
                        >
                          View PDF
                          <ArrowUpRight size={11} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

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
          transition={{
            duration: 0.7,
          }}
          className="mt-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center"
        >
          <p className="max-w-xl text-xs leading-6 text-slate-500">
            Research evolves through experimentation, implementation,
            evaluation, and refinement — with completed manuscripts and active
            studies documented as the work progresses.
          </p>

          <div className="flex items-center gap-2">
            <FlaskConical size={13} className="text-cyan-300/55" />

            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300/55">
              Research in motion
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
