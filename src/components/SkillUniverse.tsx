'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  BrainCircuit,
  Code2,
  Cpu,
  ShieldCheck,
} from 'lucide-react';

const capabilities = [
  {
    number: '01',
    signal: 'BUILD',
    title: 'Full-Stack Systems',
    description:
      'I design complete application flows — from user-facing interfaces to backend logic, data handling, authentication, and production delivery.',
    icon: Code2,
    steps: [
      'Interface',
      'Application Logic',
      'API Layer',
      'Data Flow',
      'Deployment',
    ],
  },
  {
    number: '02',
    signal: 'THINK',
    title: 'AI & Intelligent Systems',
    description:
      'I work on systems that can interpret data, understand visual information, automate decisions, and support research-driven problem solving.',
    icon: BrainCircuit,
    steps: ['Data', 'Vision', 'Model Logic', 'Automation', 'Insight'],
  },
  {
    number: '03',
    signal: 'CONNECT',
    title: 'IoT & Robotics',
    description:
      'I connect software with physical hardware to create sensing, communication, control, tracking, and autonomous system workflows.',
    icon: Cpu,
    steps: ['Sensors', 'Communication', 'Control', 'Motion', 'Telemetry'],
  },
  {
    number: '04',
    signal: 'SECURE',
    title: 'Security Engineering',
    description:
      'I approach software with security in mind — protecting sensitive information, controlling access, and designing systems with safer data handling.',
    icon: ShieldCheck,
    steps: [
      'Access',
      'Encryption',
      'Data Safety',
      'Defensive Design',
      'Reliability',
    ],
  },
];

const rowVariant = {
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

export function SkillUniverse() {
  return (
    <section
      id="skills"
      className="relative z-10 overflow-hidden py-24 sm:py-28"
    >
      {/* BACKGROUND ATMOSPHERE */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12rem] top-[10%] h-[28rem] w-[28rem] rounded-full bg-cyan-400/[0.035] blur-[130px]" />

        <div className="absolute right-[-14rem] bottom-[5%] h-[32rem] w-[32rem] rounded-full bg-violet-500/[0.04] blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(103,232,249,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(103,232,249,0.08) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
          }}
        />
      </div>

      <div className="section-container relative">
        {/* SECTION INTRO */}
        <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
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
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-cyan-300 sm:text-sm">
              What I Build
            </p>

            <h2 className="max-w-4xl font-[var(--font-space)] text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl md:text-6xl">
              Technology becomes valuable
              <span className="block bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent">
                when it solves something.
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
              My work sits across software, intelligence, hardware, and
              security. These are the kinds of systems I focus on turning from
              ideas into working solutions.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-12 bg-cyan-300/50" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-600 sm:text-xs">
                Engineer the complete system
              </span>
            </div>
          </motion.div>
        </div>

        {/* CAPABILITY ROWS */}
        <div className="border-b border-white/[0.08]">
          {capabilities.map((capability, capabilityIndex) => {
            const Icon = capability.icon;

            return (
              <motion.article
                key={capability.title}
                variants={rowVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  margin: '-90px',
                }}
                data-cursor-interactive="true"
                className="group relative border-t border-white/[0.08] py-10 md:py-14"
              >
                {/* ACTIVE LINE */}
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
                  className="absolute left-0 top-0 h-px w-28 origin-left bg-gradient-to-r from-cyan-300/80 to-transparent"
                />

                <div className="grid gap-8 lg:grid-cols-[0.1fr_0.36fr_0.54fr] lg:items-center lg:gap-10">
                  {/* NUMBER */}
                  <div className="flex items-center gap-4 lg:block">
                    <span className="font-[var(--font-space)] text-xs font-bold tracking-[0.25em] text-cyan-300/55">
                      {capability.number}
                    </span>

                    <span className="h-px w-8 bg-white/10 lg:hidden" />

                    <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-600 lg:mt-3 lg:block">
                      {capability.signal}
                    </span>
                  </div>

                  {/* DESCRIPTION */}
                  <div>
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{
                          rotate: -6,
                          scale: 1.08,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.055] text-cyan-200 transition group-hover:border-cyan-300/25 group-hover:bg-cyan-300/[0.08]"
                      >
                        <Icon size={20} />
                      </motion.div>

                      <h3 className="font-[var(--font-space)] text-2xl font-bold tracking-tight text-white md:text-3xl">
                        {capability.title}
                      </h3>
                    </div>

                    <p className="mt-5 max-w-lg text-sm leading-7 text-slate-400">
                      {capability.description}
                    </p>
                  </div>

                  {/* SYSTEM FLOW */}
                  <div className="relative">
                    <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-600">
                      System Flow
                    </p>

                    <div className="relative">
                      <div className="absolute left-3 right-3 top-[13px] hidden h-px bg-gradient-to-r from-cyan-300/10 via-cyan-300/30 to-violet-300/10 sm:block" />

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
                          duration: 1,
                          delay: 0.2,
                        }}
                        className="absolute left-3 right-3 top-[13px] hidden h-px origin-left bg-gradient-to-r from-cyan-300/40 via-sky-300/25 to-violet-300/30 sm:block"
                      />

                      <div className="relative grid gap-4 sm:grid-cols-5 sm:gap-2">
                        {capability.steps.map((step, stepIndex) => (
                          <motion.div
                            key={step}
                            initial={{
                              opacity: 0,
                              y: 10,
                            }}
                            whileInView={{
                              opacity: 1,
                              y: 0,
                            }}
                            viewport={{
                              once: true,
                            }}
                            transition={{
                              duration: 0.4,
                              delay: 0.18 + stepIndex * 0.07,
                            }}
                            className="relative flex items-center gap-3 sm:flex-col sm:items-start sm:gap-3"
                          >
                            <motion.span
                              whileHover={{
                                scale: 1.4,
                              }}
                              className={`relative z-10 h-[7px] w-[7px] shrink-0 rounded-full ${
                                stepIndex === 0
                                  ? 'bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.75)]'
                                  : stepIndex === capability.steps.length - 1
                                    ? 'bg-violet-300 shadow-[0_0_12px_rgba(196,181,253,0.55)]'
                                    : 'bg-slate-500'
                              }`}
                            />

                            <span className="text-xs font-medium leading-5 text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                              {step}
                            </span>

                            {stepIndex !== capability.steps.length - 1 && (
                              <ArrowRight
                                size={12}
                                className="ml-auto text-slate-700 sm:hidden"
                              />
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* HOVER ATMOSPHERE */}
                <div
                  className={`pointer-events-none absolute inset-y-0 ${
                    capabilityIndex % 2 === 0 ? 'left-0' : 'right-0'
                  } w-1/2 bg-gradient-to-r from-cyan-300/[0.018] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />
              </motion.article>
            );
          })}
        </div>

        {/* ENDING MESSAGE */}
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
            duration: 0.7,
          }}
          className="mt-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center"
        >
          <p className="max-w-xl text-xs leading-6 text-slate-500">
            The stack changes with the problem. The goal stays the same: create
            systems that are useful, reliable, and built with purpose.
          </p>

          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-25" />

              <span className="relative h-2.5 w-2.5 rounded-full bg-cyan-300" />
            </span>

            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-300/60">
              Build beyond the stack
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
