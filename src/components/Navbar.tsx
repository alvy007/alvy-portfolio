'use client';

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { profile } from '../data/profile';

const navItems = [
  { label: 'Toolkit', href: '#toolkit', id: 'toolkit' },
  { label: 'Education', href: '#education', id: 'education' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Research', href: '#research', id: 'research' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

const trackedSections = [
  'home',
  'toolkit',
  'education',
  'experience',
  'projects',
  'research',
  'contact',
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, 'change', latest => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    const sections = trackedSections
      .map(id => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      entries => {
        const visibleEntries = entries
          .filter(entry => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top),
          );

        if (visibleEntries[0]) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -58% 0px',
        threshold: [0, 0.15, 0.35, 0.6],
      },
    );

    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/[0.08] bg-[#030712]/78 shadow-[0_12px_45px_rgba(0,0,0,0.22)] backdrop-blur-2xl'
            : 'border-b border-transparent bg-[#030712]/28 backdrop-blur-md'
        }`}
      >
        {/* SCROLL PROGRESS */}
        <motion.div
          style={{
            scaleX: scrollYProgress,
            transformOrigin: '0%',
          }}
          className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-400 shadow-[0_0_14px_rgba(34,211,238,0.45)]"
        />

        <nav
          className={`section-container flex items-center justify-between transition-[height] duration-500 ${
            scrolled ? 'h-[72px]' : 'h-20'
          }`}
        >
          {/* BRAND */}
          <a
            href="#home"
            aria-label="Go to home"
            className="group relative flex items-center gap-3"
          >
            <motion.div
              whileHover={{
                rotate: -5,
                scale: 1.04,
              }}
              transition={{
                duration: 0.25,
              }}
              className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-cyan-300/25 bg-cyan-300/[0.08] text-lg font-black text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
            >
              <span className="relative z-10">A</span>

              <motion.span
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute h-16 w-4 bg-gradient-to-b from-transparent via-cyan-200/20 to-transparent"
              />
            </motion.div>

            <div className="hidden sm:block">
              <p className="font-[var(--font-space)] text-sm font-bold tracking-tight text-white">
                Alvy Rahman
              </p>

              <p className="mt-0.5 text-[11px] text-slate-500 transition-colors duration-300 group-hover:text-slate-400">
                Developer Portfolio
              </p>
            </div>
          </a>

          {/* DESKTOP NAV */}
          <div className="hidden items-center rounded-full border border-white/[0.06] bg-white/[0.025] p-1 lg:flex">
            {navItems.map(item => {
              const active = activeSection === item.id;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 ${
                    active
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-100'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="desktop-active-nav"
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-full border border-cyan-300/[0.13] bg-cyan-300/[0.075] shadow-[0_0_20px_rgba(34,211,238,0.055)]"
                    />
                  )}

                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] text-slate-400 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-cyan-300/[0.05] hover:text-cyan-200"
              aria-label="GitHub"
            >
              <FaGithub
                size={17}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] text-slate-400 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-cyan-300/[0.05] hover:text-cyan-200"
              aria-label="LinkedIn"
            >
              <FaLinkedin
                size={17}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </a>

            <a
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="group ml-1 inline-flex items-center gap-2 rounded-full bg-cyan-300 px-4.5 py-2.5 text-sm font-bold text-slate-950 shadow-[0_8px_28px_rgba(34,211,238,0.12)] transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-200 hover:shadow-[0_12px_36px_rgba(34,211,238,0.18)]"
            >
              <Download
                size={16}
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              />
              CV
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setOpen(value => !value)}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.035] text-white backdrop-blur-xl transition hover:border-cyan-300/25 hover:bg-cyan-300/[0.06] lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'close' : 'menu'}
                initial={{
                  opacity: 0,
                  rotate: -20,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotate: 20,
                  scale: 0.8,
                }}
                transition={{
                  duration: 0.18,
                }}
                className="absolute"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </nav>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                y: -14,
                height: 0,
              }}
              animate={{
                opacity: 1,
                y: 0,
                height: 'auto',
              }}
              exit={{
                opacity: 0,
                y: -10,
                height: 0,
              }}
              transition={{
                duration: 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden border-t border-white/[0.06] lg:hidden"
            >
              <div className="section-container pb-5 pt-4">
                <div className="overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-[#07101d]/88 p-3 shadow-[0_25px_70px_rgba(0,0,0,0.32)] backdrop-blur-2xl">
                  <div className="grid gap-1">
                    {navItems.map((item, index) => {
                      const active = activeSection === item.id;

                      return (
                        <motion.a
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          initial={{
                            opacity: 0,
                            x: -12,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay: index * 0.035,
                            duration: 0.28,
                          }}
                          className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm transition ${
                            active
                              ? 'bg-cyan-300/[0.08] text-cyan-100'
                              : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
                          }`}
                        >
                          <span>{item.label}</span>

                          {active && (
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                          )}
                        </motion.a>
                      );
                    })}
                  </div>

                  <div className="my-3 h-px bg-white/[0.07]" />

                  <div className="grid grid-cols-3 gap-2">
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3 text-xs font-medium text-slate-300 transition hover:border-cyan-300/20 hover:text-white"
                    >
                      <FaGithub size={15} />
                      GitHub
                    </a>

                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3 text-xs font-medium text-slate-300 transition hover:border-cyan-300/20 hover:text-white"
                    >
                      <FaLinkedin size={15} />
                      LinkedIn
                    </a>

                    <a
                      href={profile.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-cyan-300 p-3 text-xs font-bold text-slate-950 transition hover:bg-cyan-200"
                    >
                      <Download size={14} />
                      CV
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
