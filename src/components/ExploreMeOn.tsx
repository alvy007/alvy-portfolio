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
    icon: <FaGithub className="h-10 w-10 sm:h-12 sm:w-12" />,
    ring: 'border-cyan-300/30',
    glow: 'bg-cyan-300/10',
  },
  LinkedIn: {
    icon: <FaLinkedinIn className="h-9 w-9 sm:h-11 sm:w-11" />,
    ring: 'border-sky-300/30',
    glow: 'bg-sky-300/10',
  },
  LeetCode: {
    icon: <SiLeetcode className="h-9 w-9 sm:h-11 sm:w-11" />,
    ring: 'border-violet-300/30',
    glow: 'bg-violet-300/10',
  },
  X: {
    icon: (
      <span className="font-[var(--font-space)] text-4xl font-black leading-none sm:text-5xl">
        𝕏
      </span>
    ),
    ring: 'border-white/20',
    glow: 'bg-white/[0.07]',
  },
  Instagram: {
    icon: <FaInstagram className="h-10 w-10 sm:h-12 sm:w-12" />,
    ring: 'border-fuchsia-300/30',
    glow: 'bg-fuchsia-300/10',
  },
  Facebook: {
    icon: <FaFacebookF className="h-9 w-9 sm:h-11 sm:w-11" />,
    ring: 'border-blue-300/30',
    glow: 'bg-blue-300/10',
  },
} as const;

export function ExploreMeOn() {
  const visibleSocials = socials.filter(social => social.name !== 'Portfolio');

  return (
    <section
      id="explore-me"
      className="relative z-10 overflow-hidden py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[12%] top-[20%] h-72 w-72 rounded-full bg-cyan-400/[0.035] blur-[120px]" />
        <div className="absolute bottom-[8%] right-[12%] h-80 w-80 rounded-full bg-violet-500/[0.04] blur-[135px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
      </div>

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65 }}
          className="mx-auto mb-14 text-center"
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

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-500 md:text-base">
            Find my code, professional updates, problem solving, and social
            presence across the platforms below.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-start justify-center gap-x-6 gap-y-10 sm:gap-x-8 lg:gap-x-10">
          {visibleSocials.map((social, index) => {
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
                initial={{ opacity: 0, y: 24, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.06,
                }}
                className="group flex w-[7.75rem] flex-col items-center text-center sm:w-[9rem] md:w-[9.5rem]"
              >
                <motion.div
                  whileHover={{
                    y: -10,
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 18,
                  }}
                  className={`relative flex aspect-square w-full items-center justify-center rounded-full border border-dashed ${visual.ring} bg-white/[0.025]`}
                >
                  <div
                    className={`absolute inset-[12%] rounded-full ${visual.glow} blur-2xl opacity-40 transition duration-500 group-hover:opacity-100`}
                  />

                  <div className="absolute inset-[14%] rounded-full border border-white/[0.06] bg-[#07101c]/85 shadow-[0_18px_60px_rgba(0,0,0,0.28)] transition duration-500 group-hover:border-cyan-300/20 group-hover:bg-[#0a1422]" />

                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 16 + index * 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute inset-[7%] rounded-full border border-white/[0.025] border-t-cyan-300/20"
                  />

                  <div className="relative z-10 bg-gradient-to-br from-white via-cyan-100 to-violet-200 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(103,232,249,0.12)] transition duration-300 group-hover:scale-110">
                    {visual.icon}
                  </div>
                </motion.div>

                <motion.span
                  className="mt-4 font-[var(--font-space)] text-base font-bold text-slate-300 transition-colors duration-300 group-hover:text-cyan-200 sm:text-lg"
                >
                  {social.name}
                </motion.span>
              </motion.a>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-14 flex max-w-2xl items-center gap-4"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-300/15 to-transparent" />
          <span className="text-[9px] font-semibold uppercase tracking-[0.26em] text-slate-600">
            Click a platform to visit
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-300/15 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
