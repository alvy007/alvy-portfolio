'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Cpu, ExternalLink } from 'lucide-react';
import { hardwareItems } from '../data/hardware';

export function HardwareLab() {
  return (
    <section id="hardware" className="relative z-10 section-container py-24">
      <div className="glass-card overflow-hidden rounded-[2rem] p-6 md:p-10">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Hardware Lab
            </p>
            <h2 className="font-[var(--font-space)] text-3xl font-black tracking-tight text-white md:text-5xl">
              The physical side of my engineering work.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-400">
            Short introductions are included so visitors can understand what
            each device does and how it connects to projects.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {hardwareItems.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/0 via-cyan-300/0 to-violet-500/0 transition group-hover:from-cyan-300/10 group-hover:to-violet-500/10" />

              <div className="relative mb-5 flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60">
                <div className="absolute inset-0 soft-grid opacity-20" />

                <Image
                  src={item.image}
                  alt={item.name}
                  width={240}
                  height={180}
                  className="relative z-10 max-h-36 w-auto object-contain drop-shadow-[0_18px_35px_rgba(34,211,238,0.2)] transition duration-300 group-hover:scale-110"
                />

                <div className="absolute bottom-4 right-4 rounded-full border border-cyan-300/20 bg-cyan-300/10 p-2 text-cyan-200">
                  <Cpu size={18} />
                </div>
              </div>

              <div className="relative">
                <h3 className="font-[var(--font-space)] text-xl font-bold text-white">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {item.intro}
                </p>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Used in
                  </p>
                  <p className="mt-1 text-sm font-medium text-cyan-100">
                    {item.usedIn}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <ExternalLink size={14} />
                  Visual reference placeholder
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
