'use client';

import { motion } from 'framer-motion';
import {
  BrainCircuit,
  BriefcaseBusiness,
  CalendarDays,
  Code2,
  Database,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { experiences } from '../data/experience';

const experienceIcons = [
  BrainCircuit,
  BrainCircuit,
  Database,
  Code2,
];

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative z-10 overflow-hidden py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[6%] top-[14%] h-72 w-72 rounded-full bg-cyan-400/[0.035] blur-[120px]" />
        <div className="absolute bottom-[10%] right-[7%] h-80 w-80 rounded-full bg-violet-500/[0.04] blur-[135px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
      </div>

      <div className="section-container relative">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/15 bg-cyan-300/[0.05] text-cyan-200">
                <BriefcaseBusiness size={16} />
              </span>

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300 sm:text-sm">
                Experience & Internships
              </p>
            </div>

            <h2 className="max-w-4xl font-[var(--font-space)] text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl md:text-6xl">
              Learning by building,
              <span className="block bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent">
                contributing, and shipping.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            <p className="max-w-xl text-sm leading-7 text-slate-400 md:text-base">
              My experience spans software delivery, AI, data analytics, and
              hands-on technical learning through professional work and
              structured internship programs.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-12 bg-cyan-300/45" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-600 sm:text-xs">
                Learn · Build · Apply
              </span>
            </div>
          </motion.div>
        </div>

        <div className="relative">
          <div className="absolute bottom-0 left-[1.35rem] top-0 hidden w-px bg-gradient-to-b from-cyan-300/40 via-white/10 to-transparent md:block" />

          <div className="space-y-5">
            {experiences.map((item, index) => {
              const Icon = experienceIcons[index] ?? BriefcaseBusiness;

              return (
                <motion.article
                  key={`${item.company}-${item.role}`}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, delay: index * 0.06 }}
                  whileHover={{ y: -5 }}
                  data-cursor-interactive="true"
                  className="group relative md:pl-16"
                >
                  <div className="absolute left-0 top-8 z-10 hidden h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-[#07101d] text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.08)] md:flex">
                    <Icon size={19} />
                  </div>

                  <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-white/[0.035] p-6 md:p-8">
                    <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-300/[0.045] blur-3xl transition duration-500 group-hover:scale-125" />

                    <div className="absolute left-0 top-0 h-px w-40 bg-gradient-to-r from-cyan-300 via-sky-300 to-transparent" />

                    <div className="relative grid gap-7 lg:grid-cols-[0.38fr_0.62fr]">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-100">
                            {item.type}
                          </span>

                          <span className="rounded-full border border-white/[0.08] bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        <h3 className="mt-5 font-[var(--font-space)] text-2xl font-black tracking-tight text-white md:text-3xl">
                          {item.role}
                        </h3>

                        <p className="mt-2 text-sm font-semibold text-cyan-200">
                          {item.company}
                        </p>

                        <div className="mt-5 space-y-2 text-xs text-slate-500">
                          <div className="flex items-center gap-2">
                            <CalendarDays size={14} className="text-cyan-300/60" />
                            <span>{item.period}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-violet-300/60" />
                            <span>{item.mode}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm leading-7 text-slate-300 md:text-[15px]">
                          {item.summary}
                        </p>

                        <div className="mt-5 grid gap-3">
                          {item.highlights.map(highlight => (
                            <div
                              key={highlight}
                              className="flex gap-3 rounded-2xl border border-white/[0.06] bg-black/15 p-4"
                            >
                              <Sparkles
                                size={15}
                                className="mt-0.5 shrink-0 text-cyan-300/70"
                              />
                              <p className="text-sm leading-6 text-slate-400">
                                {highlight}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {item.skills.map(skill => (
                            <span
                              key={skill}
                              className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 transition-colors duration-300 group-hover:border-cyan-300/15 group-hover:text-slate-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
