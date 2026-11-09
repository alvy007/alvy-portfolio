'use client';

import { motion } from 'framer-motion';
import {
  BookOpenCheck,
  CalendarDays,
  GraduationCap,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { educationItems } from '../data/education';

export function EducationSection() {
  return (
    <section
      id="education"
      className="relative z-10 overflow-hidden py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[12%] h-72 w-72 rounded-full bg-cyan-400/[0.035] blur-[120px]" />
        <div className="absolute bottom-[6%] right-[8%] h-80 w-80 rounded-full bg-violet-500/[0.04] blur-[135px]" />
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
                <GraduationCap size={17} />
              </span>

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300 sm:text-sm">
                Academic Foundation
              </p>
            </div>

            <h2 className="max-w-4xl font-[var(--font-space)] text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl md:text-6xl">
              Computer science built on
              <span className="block bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent">
                strong fundamentals.
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="max-w-xl text-sm leading-7 text-slate-400 md:text-base"
          >
            My academic path combines a completed CSE degree with a final-year
            engineering project in AI, computer vision, and robotics.
          </motion.p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          {educationItems.map((item, index) => (
            <motion.article
              key={item.institution}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: index * 0.07 }}
              whileHover={{ y: -6 }}
              data-cursor-interactive="true"
              className={
                item.primary
                  ? 'group relative overflow-hidden rounded-[2rem] border border-cyan-300/[0.14] bg-gradient-to-br from-cyan-300/[0.055] via-white/[0.025] to-violet-500/[0.04] p-6 md:p-8 lg:row-span-2'
                  : 'group relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-6 md:p-8'
              }
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-300/[0.045] blur-3xl transition duration-500 group-hover:scale-125" />

              <div className="relative">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.06] text-cyan-200">
                    {item.primary ? (
                      <GraduationCap size={22} />
                    ) : (
                      <BookOpenCheck size={20} />
                    )}
                  </div>

                  <span className="rounded-full border border-white/[0.08] bg-black/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    {item.result}
                  </span>
                </div>

                <h3
                  className={
                    item.primary
                      ? 'mt-6 font-[var(--font-space)] text-3xl font-black tracking-tight text-white md:text-4xl'
                      : 'mt-6 font-[var(--font-space)] text-2xl font-black tracking-tight text-white'
                  }
                >
                  {item.qualification}
                </h3>

                <p className="mt-3 text-sm font-semibold text-cyan-200">
                  {item.institution}
                </p>

                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                  <span className="flex items-center gap-2">
                    <CalendarDays size={14} className="text-cyan-300/60" />
                    {item.period}
                  </span>

                  <span className="flex items-center gap-2">
                    <MapPin size={14} className="text-violet-300/60" />
                    {item.location}
                  </span>
                </div>

                {item.detail && (
                  <div className="mt-7 flex gap-3 rounded-2xl border border-white/[0.07] bg-black/15 p-4">
                    <Sparkles
                      size={16}
                      className="mt-0.5 shrink-0 text-cyan-300/75"
                    />
                    <p className="text-sm leading-6 text-slate-300">
                      {item.detail}
                    </p>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
