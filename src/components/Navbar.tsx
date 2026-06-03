'use client';

import { motion } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useState } from 'react';
import { profile } from '../data/profile';

const navItems = [
  { label: 'Story', href: '#story' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#030712]/70 backdrop-blur-xl">
      <nav className="section-container flex h-20 items-center justify-between">
        <a href="#" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 text-lg font-black text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.18)]">
            A
          </div>
          <div>
            <p className="font-[var(--font-space)] text-sm font-bold text-white">
              Alvy Rahman
            </p>
            <p className="text-xs text-slate-400">Developer Portfolio</p>
          </div>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={profile.github}
            target="_blank"
            className="rounded-full border border-white/10 bg-white/[0.04] p-3 text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-200"
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            className="rounded-full border border-white/10 bg-white/[0.04] p-3 text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-200"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={18} />
          </a>

          <a
            href={profile.cv}
            className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            <Download size={17} />
            CV
          </a>
        </div>

        <button
          onClick={() => setOpen(value => !value)}
          className="rounded-full border border-white/10 bg-white/[0.04] p-3 text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-container pb-5 lg:hidden"
        >
          <div className="glass-card rounded-3xl p-4">
            <div className="grid gap-2">
              {navItems.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm text-slate-200 hover:bg-white/10"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <a
                href={profile.github}
                target="_blank"
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center text-sm text-slate-200"
              >
                GitHub
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center text-sm text-slate-200"
              >
                LinkedIn
              </a>

              <a
                href={profile.cv}
                className="rounded-2xl bg-cyan-300 p-3 text-center text-sm font-semibold text-slate-950"
              >
                CV
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
