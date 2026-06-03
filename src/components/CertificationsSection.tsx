'use client';

import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import Image from 'next/image';
import { certifications } from '../data/certifications';

export function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="relative z-10 section-container py-24"
    >
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Certifications
          </p>
          <h2 className="font-[var(--font-space)] text-3xl font-black tracking-tight text-white md:text-5xl">
            Learning through platforms, practice, and professional courses.
          </h2>
        </div>

        <p className="max-w-md text-sm leading-6 text-slate-400">
          Certificate images and credential links can be added later from one
          data file without changing the design.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((item, index) => (
          <motion.article
            key={`${item.platform}-${item.title}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            className="group glass-card relative overflow-hidden rounded-3xl p-5"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/0 to-violet-500/0 transition group-hover:from-cyan-300/10 group-hover:to-violet-500/10" />

            <div className="relative flex items-center gap-4">
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white p-3">
                <Image
                  src={item.image}
                  alt={item.platform}
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  {item.platform}
                </p>
                <h3 className="mt-1 font-[var(--font-space)] text-lg font-bold text-white">
                  {item.title}
                </h3>
              </div>
            </div>

            <div className="relative mt-5 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
              <BadgeCheck size={17} className="text-cyan-200" />
              Credential placeholder
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
