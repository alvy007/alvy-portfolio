'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { profile } from '../data/profile';
import { ThreeHero } from './ThreeHero';

const roles = [
  'Full-Stack Developer',
  'AI & Robotics Enthusiast',
  'IoT Systems Builder',
  'Cybersecurity Researcher',
];

export function Hero() {
  return (
    <section className="relative z-10 pt-28 md:pt-36">
      <div className="section-container grid min-h-[calc(100vh-6rem)] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-5 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs text-cyan-100 md:text-sm"
          >
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
            Available for projects, research, and collaboration
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="font-[var(--font-space)] text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl md:text-7xl xl:text-8xl"
          >
            {profile.name}
            <span className="gradient-text block pt-3 text-3xl sm:text-4xl md:text-6xl xl:text-7xl">
              builds real-world tech.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-xl md:leading-8 lg:mx-0"
          >
            {profile.headline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.22 }}
            className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            {roles.map(role => (
              <span
                key={role}
                className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs text-slate-200 md:text-sm"
              >
                {role}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.28 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-4 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
            >
              Explore My Work
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </a>

            <a
              href={profile.cv}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-6 py-4 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10"
            >
              <Download size={18} />
              Download CV
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.34 }}
            className="mx-auto mt-8 flex max-w-xl flex-col items-center justify-center gap-3 text-sm text-slate-400 md:flex-row md:flex-wrap lg:mx-0 lg:justify-start"
          >
            <a
              href={`mailto:${profile.primaryEmail}`}
              className="flex items-center gap-2 transition hover:text-cyan-200"
            >
              <Mail size={17} />
              {profile.primaryEmail}
            </a>

            <span className="hidden h-1 w-1 rounded-full bg-slate-600 md:block" />

            <span className="flex items-center gap-2 text-center">
              <MapPin size={17} />
              {profile.location}
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.16 }}
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-cyan-300/20 blur-3xl" />

          <div className="glass-card relative overflow-hidden rounded-[2rem] p-4 md:rounded-[2.5rem] md:p-5">
            <div className="absolute right-5 top-5 z-20 flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-300" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>

            <div className="relative grid gap-4 md:gap-5 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="relative min-h-[360px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] sm:min-h-[430px] lg:min-h-[360px]">
                <Image
                  src={profile.image}
                  alt={profile.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 520px, 280px"
                  priority
                  className="object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/90 via-[#030712]/10 to-transparent" />

                <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100 backdrop-blur">
                    UIU CSE
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur-xl">
                  <p className="text-sm font-semibold text-white">
                    {profile.role}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-300">
                    {profile.title}
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/55">
                <div className="absolute inset-0 soft-grid opacity-20" />
                <ThreeHero />

                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur-xl">
                  <p className="text-sm font-semibold text-white">
                    Interactive Tech Stack
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-300">
                    Software · Robotics · IoT · AI · Cybersecurity
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3 md:mt-5">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-200"
              >
                <FaGithub size={17} />
                GitHub
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-200"
              >
                <FaLinkedin size={17} />
                LinkedIn
              </a>

              <a
                href={`mailto:${profile.primaryEmail}`}
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-200"
              >
                <Mail size={17} />
                Email
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
