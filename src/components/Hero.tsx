'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Download, Mail } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { profile } from '../data/profile';
import { ThreeHero } from './ThreeHero';

const roles = [
  'FULL-STACK DEVELOPER',
  'MERN STACK DEVELOPER',
  'REACT DEVELOPER',
  'AI / ML DEVELOPER',
  'AI + ROBOTICS',
  'IoT SYSTEMS BUILDER',
  'CYBERSECURITY RESEARCHER',
];

const nameLines = ['ALVY', 'RAHMAN', 'MASUM'];

const backgroundNodes = [
  { left: '8%', top: '20%', delay: 0 },
  { left: '18%', top: '74%', delay: 0.8 },
  { left: '37%', top: '16%', delay: 1.4 },
  { left: '46%', top: '82%', delay: 0.4 },
  { left: '64%', top: '12%', delay: 1.8 },
  { left: '73%', top: '73%', delay: 1.1 },
  { left: '88%', top: '24%', delay: 0.6 },
  { left: '94%', top: '67%', delay: 1.6 },
];

const nameContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.12,
    },
  },
};

const nameItem = {
  hidden: {
    opacity: 0,
    y: 55,
    rotateX: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function Hero() {
  const [activeRole, setActiveRole] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveRole(current => (current + 1) % roles.length);
    }, 2300);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative z-10 min-h-screen overflow-hidden pt-24 md:pt-28"
    >
      {/* HERO-SPECIFIC ATMOSPHERE */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 90, 20, 0],
            y: [0, -25, 45, 0],
            rotate: [0, 8, -4, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -left-[12%] top-[8%] h-[430px] w-[620px] rounded-full bg-cyan-400/[0.055] blur-[135px]"
        />

        <motion.div
          animate={{
            x: [0, -75, -20, 0],
            y: [0, 45, -20, 0],
            rotate: [0, -7, 5, 0],
          }}
          transition={{
            duration: 21,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -right-[10%] top-[12%] h-[520px] w-[650px] rounded-full bg-violet-500/[0.065] blur-[150px]"
        />

        <div className="absolute inset-x-0 top-[22%] h-px bg-gradient-to-r from-transparent via-cyan-200/[0.10] to-transparent" />

        <div className="absolute inset-x-0 top-[74%] h-px bg-gradient-to-r from-transparent via-violet-300/[0.07] to-transparent" />

        {backgroundNodes.map((node, index) => (
          <motion.div
            key={`${node.left}-${node.top}`}
            className="absolute"
            style={{
              left: node.left,
              top: node.top,
            }}
            animate={{
              opacity: [0.16, 0.7, 0.16],
              scale: [0.8, 1.22, 0.8],
            }}
            transition={{
              duration: 3.2,
              delay: node.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/[0.06]" />

            <span
              className={`block rounded-full ${
                index % 3 === 0
                  ? 'h-1.5 w-1.5 bg-violet-300/50'
                  : 'h-1 w-1 bg-cyan-300/60'
              } shadow-[0_0_15px_rgba(34,211,238,0.35)]`}
            />
          </motion.div>
        ))}

        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030712]/75 to-transparent" />
      </div>

      <div className="section-container relative min-h-[calc(100vh-6rem)]">
        <div className="grid min-h-[calc(100vh-8rem)] items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-0">
          {/* LEFT CONTENT */}
          <div className="relative z-20 pb-8 pt-8 text-center lg:py-16 lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-4 py-2 backdrop-blur-xl"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>

              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-100 sm:text-xs">
                Open to projects · research · collaboration
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="mb-2 text-sm font-semibold uppercase tracking-[0.45em] text-slate-400 sm:text-base"
            >
              Hello, I&apos;m
            </motion.p>

            <motion.div
              variants={nameContainer}
              initial="hidden"
              animate="visible"
              className="relative mx-auto max-w-[760px] lg:mx-0"
              style={{ perspective: 1000 }}
            >
              {nameLines.map((line, index) => (
                <motion.div
                  key={line}
                  variants={nameItem}
                  className={`font-[var(--font-space)] text-[19vw] font-black uppercase leading-[0.78] tracking-[-0.065em] sm:text-[7.2rem] md:text-[8.6rem] lg:text-[7.5rem] xl:text-[9.5rem] ${
                    index === 1
                      ? 'bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent'
                      : 'text-white'
                  }`}
                >
                  {line}
                </motion.div>
              ))}

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mx-auto mt-6 h-px max-w-xl origin-left bg-gradient-to-r from-cyan-300 via-white/30 to-transparent lg:mx-0"
              />
            </motion.div>

            {/* ANIMATED ROLE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.55,
              }}
              className="mx-auto mt-6 flex min-h-[64px] max-w-xl items-center justify-center lg:mx-0 lg:justify-start"
            >
              <div
                data-cursor-interactive="true"
                className="relative inline-flex min-w-[280px] items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] px-5 py-3 backdrop-blur-sm sm:min-w-[360px]"
              >
                <motion.span
                  animate={{
                    opacity: [0.35, 1, 0.35],
                    scaleY: [0.65, 1, 0.65],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="h-8 w-[2px] rounded-full bg-gradient-to-b from-cyan-300 to-violet-400"
                />

                <div className="relative min-h-[30px] flex-1 overflow-hidden text-left">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={roles[activeRole]}
                      initial={{
                        opacity: 0,
                        y: 22,
                        filter: 'blur(9px)',
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                      }}
                      exit={{
                        opacity: 0,
                        y: -22,
                        filter: 'blur(9px)',
                      }}
                      transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="font-[var(--font-space)] text-base font-bold uppercase tracking-[0.13em] sm:text-lg"
                    >
                      <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent">
                        {roles[activeRole]}
                      </span>
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div className="hidden items-center gap-1.5 sm:flex">
                  {roles.map((role, index) => (
                    <motion.span
                      key={role}
                      animate={{
                        height: index === activeRole ? 16 : 5,
                        opacity: index === activeRole ? 1 : 0.22,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className={`w-1 rounded-full ${
                        index === activeRole ? 'bg-cyan-300' : 'bg-slate-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.64 }}
              className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
            >
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
              >
                Explore My Work
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <a
                href={profile.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.045] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-cyan-300/40 hover:bg-white/[0.08]"
              >
                <Download size={17} />
                Download CV
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.78 }}
              className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/40 hover:text-cyan-200"
              >
                <FaGithub size={18} />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/40 hover:text-cyan-200"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href={profile.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/40 hover:text-cyan-200"
              >
                <SiLeetcode size={18} />
              </a>

              <a
                href={`mailto:${profile.primaryEmail}`}
                aria-label="Email"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/40 hover:text-cyan-200"
              >
                <Mail size={18} />
              </a>
            </motion.div>
          </div>

          {/* RIGHT 3D AREA */}
          <div className="relative z-10 mx-auto min-h-[600px] w-full max-w-[690px] lg:min-h-[740px] lg:max-w-none">
            <div className="absolute inset-[-10%]">
              <ThreeHero />
            </div>

            <motion.div
              data-cursor-interactive="true"
              initial={{
                opacity: 0,
                scale: 0.82,
                rotateY: -12,
                y: 35,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateY: 0,
                y: 0,
              }}
              transition={{
                duration: 1,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                rotateY: -4,
                rotateX: 3,
                y: -10,
                scale: 1.02,
              }}
              className="absolute left-1/2 top-1/2 z-20 w-[285px] -translate-x-1/2 -translate-y-1/2 sm:w-[325px] lg:w-[360px] xl:w-[390px]"
              style={{
                perspective: 1200,
                transformStyle: 'preserve-3d',
              }}
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 28,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute -inset-7 rounded-[42%] border border-cyan-300/[0.13]"
              />

              <motion.div
                animate={{
                  rotate: [360, 0],
                }}
                transition={{
                  duration: 34,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute -inset-12 rounded-[48%] border border-violet-300/[0.08]"
              />

              <div className="absolute -inset-14 rounded-full bg-gradient-to-br from-cyan-300/[0.18] via-transparent to-violet-500/[0.16] blur-3xl" />

              <div className="relative">
                <motion.div
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 4.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute -left-4 top-8 z-30 rounded-full border border-white/15 bg-[#05101d]/75 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-100 backdrop-blur-xl"
                >
                  UIU · CSE
                </motion.div>

                <div
                  className="relative overflow-hidden shadow-[0_45px_110px_rgba(0,0,0,0.48)]"
                  style={{
                    aspectRatio: '4 / 5',
                    borderRadius: '39% 61% 56% 44% / 36% 35% 65% 64%',
                  }}
                >
                  <Image
                    src={profile.image}
                    alt={profile.name}
                    fill
                    priority
                    sizes="(max-width: 640px) 285px, (max-width: 1024px) 325px, 390px"
                    className="object-cover object-center"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/25 via-transparent to-cyan-300/[0.04]" />

                  <div className="absolute inset-0 ring-1 ring-inset ring-white/15" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="absolute left-[0%] top-[13%] z-30 hidden rounded-2xl border border-cyan-300/20 bg-[#07111f]/75 px-4 py-3 shadow-xl backdrop-blur-xl sm:block"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                Focus 01
              </p>

              <p className="mt-1 text-sm font-bold text-cyan-200">
                AI + ROBOTICS
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="absolute right-[0%] top-[21%] z-30 hidden rounded-2xl border border-violet-300/20 bg-[#0b0a18]/75 px-4 py-3 shadow-xl backdrop-blur-xl sm:block"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                Focus 02
              </p>

              <p className="mt-1 text-sm font-bold text-violet-200">
                FULL-STACK
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 1.15 }}
              className="absolute bottom-[16%] left-[0%] z-30 hidden rounded-2xl border border-white/10 bg-[#07111f]/75 px-4 py-3 shadow-xl backdrop-blur-xl sm:block"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                Focus 03
              </p>

              <p className="mt-1 text-sm font-bold text-slate-100">
                IoT SYSTEMS
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 1.3 }}
              className="absolute bottom-[7%] right-[1%] z-30 hidden rounded-2xl border border-white/10 bg-[#07111f]/75 px-4 py-3 shadow-xl backdrop-blur-xl sm:block"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                Focus 04
              </p>

              <p className="mt-1 text-sm font-bold text-slate-100">
                CYBERSECURITY
              </p>
            </motion.div>
          </div>
        </div>

        {/* HERO FOOTER */}
        <div className="relative z-30 -mt-2 flex justify-center border-t border-white/[0.07] py-5 md:justify-end">
          <motion.a
            href="#hero-quote"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 1.5,
              duration: 0.6,
            }}
            className="group flex items-center gap-2 text-xs text-slate-400 transition hover:text-cyan-200"
          >
            Scroll to explore
            <motion.span
              animate={{
                y: [0, 4, 0],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <ChevronDown
                size={16}
                className="transition group-hover:text-cyan-200"
              />
            </motion.span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
