'use client';

import { motion } from 'framer-motion';
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { socials } from '../data/socials';

const socialVisuals = {
  GitHub: {
    icon: <FaGithub className="h-14 w-14 sm:h-16 sm:w-16" />,
    ring: 'border-cyan-300/30',
    glow: 'bg-cyan-300/12',
  },
  LinkedIn: {
    icon: <FaLinkedinIn className="h-13 w-13 sm:h-15 sm:w-15" />,
    ring: 'border-sky-300/30',
    glow: 'bg-sky-300/12',
  },
  LeetCode: {
    icon: <SiLeetcode className="h-13 w-13 sm:h-15 sm:w-15" />,
    ring: 'border-violet-300/30',
    glow: 'bg-violet-300/12',
  },
  X: {
    icon: (
      <span className="font-[var(--font-space)] text-5xl font-black leading-none sm:text-6xl">
        𝕏
      </span>
    ),
    ring: 'border-white/20',
    glow: 'bg-white/[0.08]',
  },
  Instagram: {
    icon: <FaInstagram className="h-14 w-14 sm:h-16 sm:w-16" />,
    ring: 'border-fuchsia-300/30',
    glow: 'bg-fuchsia-300/12',
  },
  Facebook: {
    icon: <FaFacebookF className="h-13 w-13 sm:h-15 sm:w-15" />,
    ring: 'border-blue-300/30',
    glow: 'bg-blue-300/12',
  },
} as const;

export function ExploreMeOn() {
  return (
    <section
      id="explore-me"
      className="relative z-10 overflow-hidden py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[12%] top-[22%] h-72 w-72 rounded-full bg-cyan-400/[0.035] blur-[120px]" />
        <div className="absolute bottom-[10%] right-[12%] h-80 w-80 rounded-full bg-violet-500/[0.04] blur-[135px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
      </div>

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65 }}
          className="mx-auto mb-16 text-center"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-cyan-300 sm:text-sm">
            Stay Connected
          </p>

          <h2 className="font-[var(--font-space)] text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Kindly{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent">
              explore
            </span>{' '}
            me on
          </h2>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-10">
          {socials.map((social, index) => {
            const visual =
              socialVisuals[social.name as keyof typeof socialVisuals];

            if (!visual) return null;

            return (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit Alvy Rahman Masum on ${social.name}`}
                data-cursor-interactive="true"
                initial={{ opacity: 0, y: 24, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                }}
                whileHover={{
                  y: [0, -16, 0, -8, 0],
                  scale: [1, 1.08, 1.02, 1.05, 1.03],
                }}
                whileTap={{
                  scale: 0.92,
                }}
                className="group relative flex h-[8.5rem] w-[8.5rem] items-center justify-center rounded-full border border-white/[0.05] bg-white/[0.018] sm:h-[10rem] sm:w-[10rem]"
              >
                <div
                  className={`pointer-events-none absolute inset-0 rounded-full border border-dashed ${visual.ring} opacity-80 transition duration-300 group-hover:opacity-100`}
                />

                <div
                  className={`pointer-events-none absolute inset-[12%] rounded-full ${visual.glow} blur-2xl opacity-35 transition duration-300 group-hover:scale-125 group-hover:opacity-100`}
                />

                <div className="absolute inset-[14%] rounded-full border border-white/[0.07] bg-[#07101c]/88 shadow-[0_18px_60px_rgba(0,0,0,0.3)] transition duration-300 group-hover:border-cyan-300/20 group-hover:bg-[#0a1422]" />

                <div className="relative z-10 text-slate-100 drop-shadow-[0_0_20px_rgba(103,232,249,0.12)] transition duration-300 group-hover:text-cyan-100">
                  {visual.icon}
                </div>

                <span className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/[0.08] bg-[#07101c]/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-200 opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition duration-200 group-hover:-bottom-10 group-hover:opacity-100">
                  {social.name}
                </span>
              </motion.a>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-16 text-center text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-600"
        >
          Hover to discover · Click to visit
        </motion.p>
      </div>
    </section>
  );
}
