'use client';

import { motion } from 'framer-motion';
import { Award, Trophy } from 'lucide-react';
import { achievements } from '../data/achievements';

export function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="relative z-10 section-container py-24"
    >
      <div className="glass-card overflow-hidden rounded-[2rem] p-6 md:p-10">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Achievements
            </p>
            <h2 className="font-[var(--font-space)] text-3xl font-black tracking-tight text-white md:text-5xl">
              Competitions, recognition, and discipline beyond code.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-400">
            A small wall of moments that shaped my confidence, teamwork, and
            competitive mindset.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {achievements.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <div className="absolute right-0 top-0 h-28 w-28 translate-x-10 -translate-y-10 rounded-full bg-cyan-300/10 blur-2xl transition group-hover:bg-violet-400/20" />

              <div className="relative mb-6 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                  <Trophy size={22} />
                </div>
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-300">
                  {item.year}
                </span>
              </div>

              <p className="relative font-[var(--font-space)] text-4xl font-black text-white">
                {item.result}
              </p>

              <h3 className="relative mt-4 text-lg font-bold text-white">
                {item.title}
              </h3>

              <p className="relative mt-3 text-sm leading-6 text-slate-400">
                {item.detail}
              </p>

              <div className="relative mt-5 flex items-center gap-2 text-xs font-semibold text-cyan-200">
                <Award size={14} />
                Verified details can be updated with certificates
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
