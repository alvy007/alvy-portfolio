'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Boxes, Code2, Layers3, Radio, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { projects, type Project } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailsModal } from './ProjectDetailsModal';
import { ProjectStoryModal } from './ProjectStoryModal';

type GitHubStats = {
  username: string;
  publicRepos: number;
  originalRepos: number;
  languages: string[];
  languageCount: number;
  followers: number;
  following: number;
  totalStars: number;
  updatedAt: string;
};

type AnimatedCounterProps = {
  value: number | null;
  className?: string;
  pad?: number;
  duration?: number;
};

function AnimatedCounter({
  value,
  className = '',
  pad = 2,
  duration = 1350,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const inView = useInView(ref, {
    once: true,
    margin: '-70px',
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView || value === null) return;

    const startTime = performance.now();
    let frameId = 0;

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 4);

      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(update);
      }
    };

    frameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [duration, inView, value]);

  return (
    <motion.span
      ref={ref}
      initial={{
        opacity: 0,
        y: 14,
        filter: 'blur(5px)',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
      }}
      className={className}
    >
      {value === null ? '—' : String(displayValue).padStart(pad, '0')}
    </motion.span>
  );
}

type StatItemProps = {
  label: string;
  value: number | null;
  tone: 'white' | 'cyan' | 'violet' | 'emerald' | 'sky';
  icon: 'github' | 'projects' | 'featured' | 'domains' | 'languages' | 'live';
};

function StatItem({ label, value, tone, icon }: StatItemProps) {
  const toneClasses = {
    white: 'text-white',
    cyan: 'text-cyan-200',
    violet: 'text-violet-200',
    emerald: 'text-emerald-300',
    sky: 'text-sky-200',
  };

  const iconClass = 'h-3.5 w-3.5 opacity-70';

  const renderIcon = () => {
    switch (icon) {
      case 'github':
        return <FaGithub className={iconClass} />;

      case 'projects':
        return <Layers3 className={iconClass} />;

      case 'featured':
        return <Sparkles className={iconClass} />;

      case 'domains':
        return <Boxes className={iconClass} />;

      case 'languages':
        return <Code2 className={iconClass} />;

      case 'live':
        return <Radio className={iconClass} />;

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
      }}
      className="group relative min-w-0"
    >
      <div className="flex items-center gap-2">
        <AnimatedCounter
          value={value}
          className={`font-[var(--font-space)] text-2xl font-black sm:text-[1.7rem] ${toneClasses[tone]}`}
        />

        <span
          className={`${toneClasses[tone]} transition-transform duration-300 group-hover:scale-110`}
        >
          {renderIcon()}
        </span>
      </div>

      <p className="mt-1.5 whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.19em] text-slate-600 sm:text-[9px]">
        {label}
      </p>

      <motion.div
        initial={{
          scaleX: 0,
        }}
        whileInView={{
          scaleX: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.8,
          delay: 0.15,
        }}
        className={`mt-3 h-px w-9 origin-left ${
          tone === 'emerald'
            ? 'bg-emerald-300/35'
            : tone === 'violet'
              ? 'bg-violet-300/35'
              : 'bg-cyan-300/25'
        }`}
      />
    </motion.div>
  );
}

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const [selectedStoryProject, setSelectedStoryProject] =
    useState<Project | null>(null);

  const [selectedDetailsProject, setSelectedDetailsProject] =
    useState<Project | null>(null);

  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);

  const [githubError, setGithubError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadGitHubStats = async () => {
      try {
        const response = await fetch('/api/github-stats');

        if (!response.ok) {
          throw new Error('Unable to load GitHub stats');
        }

        const data = (await response.json()) as GitHubStats;

        if (!cancelled) {
          setGithubStats(data);
          setGithubError(false);
        }
      } catch {
        if (!cancelled) {
          setGithubError(true);
        }
      }
    };

    void loadGitHubStats();

    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(
    () => [
      'All',
      ...Array.from(new Set(projects.map(project => project.category))),
    ],
    [],
  );

  const projectDomainCount = useMemo(
    () => new Set(projects.map(project => project.category)).size,
    [],
  );

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') {
      return projects;
    }

    return projects.filter(project => project.category === activeCategory);
  }, [activeCategory]);

  const spotlightProject = useMemo(() => {
    if (!filteredProjects.length) {
      return null;
    }

    if (activeCategory === 'All') {
      return (
        filteredProjects.find(project => project.liveLink) ??
        filteredProjects.find(project => project.featured) ??
        filteredProjects[0]
      );
    }

    return (
      filteredProjects.find(project => project.featured) ?? filteredProjects[0]
    );
  }, [activeCategory, filteredProjects]);

  const remainingProjects = useMemo(() => {
    if (!spotlightProject) {
      return filteredProjects;
    }

    return filteredProjects.filter(
      project => project.title !== spotlightProject.title,
    );
  }, [filteredProjects, spotlightProject]);

  const featuredCount = useMemo(
    () => projects.filter(project => project.featured).length,
    [],
  );

  const liveCount = useMemo(
    () => projects.filter(project => project.liveLink).length,
    [],
  );

  return (
    <section
      id="projects"
      className="relative z-10 overflow-hidden py-24 sm:py-28"
    >
      {/* SECTION ATMOSPHERE */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-[15%] h-96 w-96 rounded-full bg-cyan-400/[0.035] blur-[130px]" />

        <div className="absolute -right-40 top-[48%] h-[30rem] w-[30rem] rounded-full bg-violet-500/[0.04] blur-[150px]" />

        <div className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/[0.12] to-transparent" />
      </div>

      <div className="section-container relative">
        {/* HEADER */}
        <div className="grid gap-9 lg:grid-cols-[1fr_0.82fr] lg:items-end">
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: '-80px',
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/15 bg-cyan-300/[0.05] text-cyan-200">
                <Sparkles size={14} />
              </span>

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">
                Selected Work
              </p>
            </div>

            <h2 className="max-w-4xl font-[var(--font-space)] text-4xl font-black leading-[1.03] tracking-tight text-white sm:text-5xl md:text-6xl">
              Ideas engineered into
              <span className="block bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent">
                working systems.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 22,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: '-80px',
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
          >
            <p className="max-w-xl text-sm leading-7 text-slate-400 md:text-base">
              Software, AI, robotics, IoT, and product ideas built around
              practical problems. Explore the implementation, media, live
              deployments, and the reasoning behind each build.
            </p>

            {/* LIVE METRICS */}
            <div className="mt-7 border-y border-white/[0.07] py-5">
              <div className="mb-5 flex items-center justify-between gap-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-slate-600">
                  Engineering Snapshot
                </p>

                <div className="flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      githubStats
                        ? 'bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.7)]'
                        : githubError
                          ? 'bg-amber-300'
                          : 'animate-pulse bg-cyan-300'
                    }`}
                  />

                  <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                    {githubStats
                      ? 'GitHub synced'
                      : githubError
                        ? 'GitHub unavailable'
                        : 'Syncing GitHub'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3">
                <StatItem
                  label="GitHub Repos"
                  value={githubStats?.publicRepos ?? null}
                  tone="white"
                  icon="github"
                />

                <StatItem
                  label="Projects"
                  value={projects.length}
                  tone="cyan"
                  icon="projects"
                />

                <StatItem
                  label="Featured"
                  value={featuredCount}
                  tone="violet"
                  icon="featured"
                />

                <StatItem
                  label="Project Domains"
                  value={projectDomainCount}
                  tone="sky"
                  icon="domains"
                />

                <StatItem
                  label="GitHub Languages"
                  value={githubStats?.languageCount ?? null}
                  tone="cyan"
                  icon="languages"
                />

                <StatItem
                  label="Live Builds"
                  value={liveCount}
                  tone="emerald"
                  icon="live"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* CATEGORY NAVIGATION */}
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            delay: 0.15,
          }}
          className="mt-12 border-y border-white/[0.07] py-4"
        >
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {categories.map(category => {
              const active = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={active}
                  className={`relative shrink-0 rounded-full px-4 py-2.5 text-xs font-semibold transition-colors duration-300 sm:text-sm ${
                    active
                      ? 'text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="active-project-category"
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 34,
                      }}
                      className="absolute inset-0 rounded-full bg-cyan-300 shadow-[0_6px_25px_rgba(34,211,238,0.13)]"
                    />
                  )}

                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* RESULT META */}
        <div className="mt-7 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Layers3 size={14} className="text-cyan-300/70" />

            <p className="text-xs text-slate-500">
              Showing{' '}
              <span className="font-semibold text-slate-300">
                {filteredProjects.length}
              </span>{' '}
              {filteredProjects.length === 1 ? 'project' : 'projects'}
            </p>
          </div>

          <p className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-600 sm:block">
            Explore · Inspect · Experience
          </p>
        </div>

        {/* PROJECTS */}
        <div className="mt-7">
          <AnimatePresence mode="popLayout" initial={false}>
            {spotlightProject && (
              <motion.div key={`spotlight-${spotlightProject.title}`} layout>
                <ProjectCard
                  project={spotlightProject}
                  variant="spotlight"
                  onStoryOpen={setSelectedStoryProject}
                  onDetailsOpen={setSelectedDetailsProject}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {remainingProjects.length > 0 && (
            <>
              <div className="mb-7 mt-14 flex items-center gap-4">
                <p className="shrink-0 text-[10px] font-bold uppercase tracking-[0.26em] text-slate-600">
                  More Builds
                </p>

                <div className="h-px flex-1 bg-gradient-to-r from-white/[0.08] to-transparent" />
              </div>

              <motion.div layout className="grid gap-6 lg:grid-cols-2">
                <AnimatePresence mode="popLayout" initial={false}>
                  {remainingProjects.map((project, index) => (
                    <ProjectCard
                      key={project.title}
                      project={project}
                      index={index}
                      onStoryOpen={setSelectedStoryProject}
                      onDetailsOpen={setSelectedDetailsProject}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </div>

        {/* SECTION FOOTER */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="mt-14 flex items-center gap-4"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-600">
            Built beyond the tutorial
          </span>

          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        </motion.div>

        <ProjectDetailsModal
          project={selectedDetailsProject}
          onClose={() => setSelectedDetailsProject(null)}
        />

        <ProjectStoryModal
          project={selectedStoryProject}
          onClose={() => setSelectedStoryProject(null)}
        />
      </div>
    </section>
  );
}
