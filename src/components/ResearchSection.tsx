'use client';

import { motion } from 'framer-motion';
import { FlaskConical, Sparkles } from 'lucide-react';
import { researchItems } from '../data/research';

export function ResearchSection() {
  return (
    <section id="research" className="relative z-10 section-container py-24">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Research & Innovation
          </p>
          <h2 className="font-[var(--font-space)] text-3xl font-black tracking-tight text-white md:text-5xl">
            Exploring AI, robotics, cybersecurity, and sustainable systems.
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-slate-400">
          These works are currently ongoing, under preparation, or connected to
          academic research and final year development.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {researchItems.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -8 }}
            className="glass-card group relative overflow-hidden rounded-[2rem] p-6"
          >
            <div className="absolute right-0 top-0 h-36 w-36 translate-x-12 -translate-y-12 rounded-full bg-violet-500/10 blur-2xl transition group-hover:bg-cyan-300/15" />

            <div className="relative mb-6 flex h-13 w-13 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
              <FlaskConical size={23} />
            </div>

            <div className="relative">
              <span className="inline-flex rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1 text-xs font-semibold text-violet-100">
                {item.status}
              </span>

              <h3 className="mt-5 font-[var(--font-space)] text-xl font-bold leading-tight text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                {item.field}
              </p>

              <p className="mt-5 text-sm leading-6 text-slate-400">
                {item.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <Sparkles size={14} />
                Publication status can be updated later
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
