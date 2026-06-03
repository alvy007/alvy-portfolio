'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Code } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { socials } from '../data/socials';

const iconMap = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  LeetCode: SiLeetcode,
};

export function CodingProfiles() {
  return (
    <section id="profiles" className="relative z-10 section-container py-24">
      <div className="glass-card rounded-[2rem] p-6 md:p-10">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Coding Profiles
          </p>
          <h2 className="font-[var(--font-space)] text-3xl font-black tracking-tight text-white md:text-5xl">
            Code, connect, and problem solve.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {socials.map((item, index) => {
            const Icon = iconMap[item.name as keyof typeof iconMap] || Code;

            return (
              <motion.a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="absolute right-0 top-0 h-28 w-28 translate-x-10 -translate-y-10 rounded-full bg-cyan-300/10 blur-2xl transition group-hover:bg-violet-400/20" />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                    <Icon size={22} />
                  </div>

                  <ArrowUpRight
                    size={20}
                    className="text-slate-500 transition group-hover:text-cyan-200"
                  />
                </div>

                <h3 className="relative mt-6 font-[var(--font-space)] text-2xl font-bold text-white">
                  {item.name}
                </h3>

                <p className="relative mt-3 text-sm leading-6 text-slate-400">
                  {item.label}
                </p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
