'use client';

import { motion } from 'framer-motion';
import { Download, Mail, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { profile } from '../data/profile';

export function ContactSection() {
  return (
    <section id="contact" className="relative z-10 section-container py-24">
      <div className="glass-card relative overflow-hidden rounded-[2.5rem] p-8 md:p-12">
        <div className="absolute right-[-8rem] top-[-8rem] h-80 w-80 rounded-full bg-cyan-300/15 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[-8rem] h-80 w-80 rounded-full bg-violet-500/15 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Contact
            </p>

            <h2 className="font-[var(--font-space)] text-4xl font-black tracking-tight text-white md:text-6xl">
              Have an idea, project, or research collaboration?
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Let’s connect and build something practical, intelligent, and
              useful for real people.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`mailto:${profile.primaryEmail}`}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-4 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
              >
                <Mail size={18} />
                Email Me
              </a>

              <a
                href={profile.cv}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-6 py-4 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10"
              >
                <Download size={18} />
                Download CV
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="rounded-[2rem] border border-white/10 bg-black/20 p-6"
          >
            <div className="space-y-4">
              <a
                href={`mailto:${profile.primaryEmail}`}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-100"
              >
                <Mail size={18} />
                {profile.primaryEmail}
              </a>

              <a
                href={`mailto:${profile.secondaryEmail}`}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-100"
              >
                <Mail size={18} />
                {profile.secondaryEmail}
              </a>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300">
                <MapPin size={18} />
                {profile.location}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-100"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-100"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href={profile.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-100"
                aria-label="LeetCode"
              >
                <SiLeetcode size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
