'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Globe2, Sparkles } from 'lucide-react';
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { socials } from '../data/socials';

const socialStyles = {
  GitHub: {
    accent: 'from-white via-slate-300 to-cyan-300',
    glow: 'bg-cyan-300/[0.08]',
    icon: <FaGithub className="h-6 w-6" />,
  },
  LinkedIn: {
    accent: 'from-sky-300 via-cyan-300 to-blue-400',
    glow: 'bg-sky-400/[0.08]',
    icon: <FaLinkedin className="h-6 w-6" />,
  },
  LeetCode: {
    accent: 'from-amber-300 via-orange-300 to-cyan-300',
    glow: 'bg-amber-300/[0.08]',
    icon: <SiLeetcode className="h-6 w-6" />,
  },
  X: {
    accent: 'from-white via-slate-200 to-violet-300',
    glow: 'bg-violet-400/[0.07]',
    icon: (
      <span className="font-[var(--font-space)] text-2xl font-black leading-none">
        𝕏
      </span>
    ),
  },
  Instagram: {
    accent: 'from-fuchsia-300 via-violet-300 to-amber-300',
    glow: 'bg-fuchsia-400/[0.08]',
    icon: <FaInstagram className="h-6 w-6" />,
  },
  Facebook: {
    accent: 'from-blue-300 via-sky-300 to-cyan-300',
    glow: 'bg-blue-400/[0.08]',
    icon: <FaFacebookF className="h-5 w-5" />,
  },
  Portfolio: {
    accent: 'from-cyan-300 via-sky-200 to-violet-300',
    glow: 'bg-cyan-300/[0.08]',
    icon: <Globe2 className="h-6 w-6" />,
  },
} as const;

export function ExploreMeOn() {
  return (
    <section
      id="explore-me"
      className="relative z-10 overflow-hidden py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[15%] h-72 w-72 rounded-full bg-cyan-400/[0.035] blur-[120px]" />
        <div className="absolute bottom-[8%] right-[8%] h-80 w-80 rounded-full bg-violet-500/[0.04] blur-[135px]" />

        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 34,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute left-1/2 top-[42%] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/[0.025]"
        />

        <motion.div
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 42,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute left-1/2 top-[42%] h-[25rem] w-[25rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/[0.025]"
        />
      </div>

      <div className="section-container relative">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mb-5 flex items-center justify-center gap-3"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/15 bg-cyan-300/[0.05] text-cyan-200">
              <Sparkles size={15} />
            </span>

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300 sm:text-sm">
              Stay Connected
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-[var(--font-space)] text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Kindly explore me on
            <span className="block bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent">
              the platforms I use.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 md:text-base"
          >
            Follow my code, professional journey, problem-solving practice,
            updates, and social profiles from one place.
          </motion.p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {socials.map((social, index) => {
            const style =
              socialStyles[social.name as keyof typeof socialStyles];

            if (!style) return null;

            const isPortfolio = social.name === 'Portfolio';

            return (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-interactive="true"
                initial={{
                  opacity: 0,
                  y: 24,
                  scale: 0.98,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  margin: '-70px',
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.05,
                }}
                whileHover={{
                  y: -7,
                  scale: 1.015,
                }}
                className={
                  isPortfolio
                    ? 'group relative overflow-hidden rounded-[1.8rem] border border-cyan-300/15 bg-cyan-300/[0.04] p-6 sm:col-span-2 lg:col-span-2'
                    : 'group relative overflow-hidden rounded-[1.8rem] border border-white/[0.08] bg-white/[0.025] p-6'
                }
              >
                <div
                  className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full ${style.glow} blur-3xl transition duration-500 group-hover:scale-125`}
                />

                <div
                  className={`absolute left-0 top-0 h-px w-28 bg-gradient-to-r ${style.accent}`}
                />

                <div className="relative flex items-start justify-between gap-5">
                  <motion.div
                    whileHover={{
                      rotate: -6,
                      scale: 1.08,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.09] bg-white/[0.035] text-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.16)] transition-colors duration-300 group-hover:text-cyan-100"
                  >
                    {style.icon}
                  </motion.div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-slate-600 transition duration-300 group-hover:border-cyan-300/20 group-hover:text-cyan-200">
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                </div>

                <div className="relative mt-8">
                  <p
                    className={`bg-gradient-to-r ${style.accent} bg-clip-text font-[var(--font-space)] text-xl font-black text-transparent`}
                  >
                    {social.name}
                  </p>

                  <p className="mt-2 min-h-10 text-sm leading-6 text-slate-500 transition-colors duration-300 group-hover:text-slate-400">
                    {social.label}
                  </p>
                </div>

                <div className="relative mt-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-cyan-300/25 transition-all duration-300 group-hover:w-12 group-hover:bg-cyan-300/45" />

                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600 transition-colors group-hover:text-cyan-300/60">
                    Visit profile
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-10 flex items-center gap-4"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-slate-600">
            Code · Connect · Follow
          </span>

          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
