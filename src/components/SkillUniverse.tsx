'use client';

import { motion } from 'framer-motion';
import {
  Brain,
  Code2,
  Cpu,
  DatabaseZap,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import { skills } from '../data/skills';

const icons = [Code2, Brain, Cpu, Wrench, ShieldCheck, DatabaseZap];

export function SkillUniverse() {
  return (
    <section id="skills" className="relative z-10 section-container py-24">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Skill Universe
          </p>
          <h2 className="font-[var(--font-space)] text-3xl font-black tracking-tight text-white md:text-5xl">
            A stack that connects software with the real world.
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-slate-400">
          From web interfaces to robotic movement and secure systems, each skill
          supports a different layer of my work.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skills.map((skill, index) => {
          const Icon = icons[index % icons.length];

          return (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
              className="group glass-card relative overflow-hidden rounded-3xl p-6"
            >
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-10 -translate-y-10 rounded-full bg-cyan-300/10 blur-2xl transition group-hover:bg-violet-400/20" />

              <div className="relative flex items-start justify-between gap-5">
                <div>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-[var(--font-space)] text-xl font-bold text-white">
                    {skill.category}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {skill.intro}
                  </p>
                </div>
              </div>

              <div className="relative mt-6 flex flex-wrap gap-2">
                {skill.items.map(item => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-slate-300 transition group-hover:border-cyan-300/25 group-hover:text-cyan-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
