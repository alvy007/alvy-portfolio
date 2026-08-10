'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Code2, FileText, Radio, Sparkles } from 'lucide-react';

const spotlightItems = [
  {
    eyebrow: 'LIVE PROJECT',
    title: 'FitBondhu',
    description:
      'A real-world fitness companion built to make workouts, progress tracking, and personal fitness guidance easier to access.',
    href: 'https://fitbondhu.netlify.app/',
    cta: 'Open Live Project',
    icon: Radio,
  },
  {
    eyebrow: 'RESEARCH',
    title: 'X-FIBF Ransomware Research',
    description:
      'Explainable behavior-focused ransomware detection research combining intelligent monitoring, machine learning, and interpretable security analysis.',
    href: '#research',
    cta: 'Explore Research',
    icon: FileText,
  },
  {
    eyebrow: 'DEVELOPER ACTIVITY',
    title: 'GitHub + LeetCode',
    description:
      'A live view of my development consistency, contribution history, coding practice, repositories, and problem-solving journey.',
    href: '#coding-profiles',
    cta: 'View Coding Activity',
    icon: Code2,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 34,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function FeaturedSpotlight() {
  return (
    <section
      id="featured-spotlight"
      className="relative z-10 section-container pb-20 pt-8 md:pb-28 md:pt-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
      >
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2">
            <Sparkles className="h-4 w-4 text-cyan-300" />

            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
              Featured right now
            </span>
          </div>

          <h2 className="font-[var(--font-space)] text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Building products.
            <span className="block bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">
              Publishing research. Solving real problems.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
            A quick look at the work I am actively building, researching, and
            improving across software engineering, AI, IoT, robotics, and
            cybersecurity.
          </p>
        </div>

        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="inline-flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 backdrop-blur-xl"
        >
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
          </span>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Current Status
            </p>
            <p className="text-sm font-medium text-slate-200">
              Building & researching
            </p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-5 lg:grid-cols-3"
      >
        {spotlightItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.a
              key={item.title}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={
                item.href.startsWith('http') ? 'noopener noreferrer' : undefined
              }
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: {
                  duration: 0.25,
                },
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-300/30 hover:bg-white/[0.055] md:p-7"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/[0.07] via-transparent to-violet-500/[0.06] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/[0.07] blur-3xl transition-all duration-500 group-hover:bg-cyan-400/[0.12]" />

              <div className="relative">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                    <Icon className="h-5 w-5 text-cyan-300" />
                  </div>

                  <span className="font-[var(--font-space)] text-5xl font-bold text-white/[0.035] transition-colors duration-300 group-hover:text-white/[0.07]">
                    0{index + 1}
                  </span>
                </div>

                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
                  {item.eyebrow}
                </p>

                <h3 className="font-[var(--font-space)] text-2xl font-semibold tracking-tight text-white">
                  {item.title}
                </h3>

                <p className="mt-4 min-h-[112px] text-sm leading-7 text-slate-400">
                  {item.description}
                </p>

                <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-sm font-medium text-slate-200 transition-colors duration-300 group-hover:text-cyan-200">
                    {item.cta}
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition-all duration-300 group-hover:border-cyan-300/30 group-hover:bg-cyan-300/10">
                    <ArrowUpRight className="h-4 w-4 text-slate-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-200" />
                  </span>
                </div>
              </div>
            </motion.a>
          );
        })}
      </motion.div>
    </section>
  );
}
