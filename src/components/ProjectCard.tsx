'use client';

import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  BookOpen,
  ExternalLink,
  ImageIcon,
  Layers3,
  Play,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import type { Project } from '../data/projects';

type ProjectCardProps = {
  project: Project;
  onStoryOpen: (project: Project) => void;
  onDetailsOpen: (project: Project) => void;
  variant?: 'spotlight' | 'standard';
  index?: number;
};

const categoryAccent: Record<string, string> = {
  'AI Robotics': 'from-cyan-300 via-sky-300 to-violet-400',
  'Mobile App': 'from-sky-300 via-cyan-300 to-emerald-300',
  'IoT / Embedded': 'from-emerald-300 via-cyan-300 to-sky-300',
  Robotics: 'from-orange-300 via-cyan-300 to-violet-300',
  'Web Development': 'from-violet-300 via-sky-300 to-cyan-300',
  'Mobile / AI': 'from-fuchsia-300 via-violet-300 to-cyan-300',
  'Browser Extension': 'from-amber-300 via-orange-300 to-cyan-300',
  'AI / Automation': 'from-violet-300 via-fuchsia-300 to-sky-300',
};

function ProjectActions({
  project,
  onStoryOpen,
  onDetailsOpen,
  spotlight = false,
}: {
  project: Project;
  onStoryOpen: (project: Project) => void;
  onDetailsOpen: (project: Project) => void;
  spotlight?: boolean;
}) {
  const hasStory = Boolean(project.story?.length);

  return (
    <div className="flex flex-wrap gap-2.5">
      <button
        type="button"
        onClick={() => onDetailsOpen(project)}
        className={`group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.045] font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-cyan-300/[0.06] ${
          spotlight ? 'px-5 py-3 text-sm' : 'px-4 py-2.5 text-xs sm:text-sm'
        }`}
      >
        View Project
        <ArrowUpRight
          size={spotlight ? 17 : 15}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </button>

      {hasStory && (
        <button
          type="button"
          onClick={() => onStoryOpen(project)}
          className={`inline-flex items-center justify-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] font-semibold text-cyan-100 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-cyan-300/[0.11] ${
            spotlight ? 'px-5 py-3 text-sm' : 'px-4 py-2.5 text-xs sm:text-sm'
          }`}
        >
          <BookOpen size={spotlight ? 16 : 14} />
          Build Story
        </button>
      )}

      {project.liveLink && (
        <a
          href={project.liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center gap-2 rounded-full bg-emerald-300 font-bold text-slate-950 shadow-[0_8px_28px_rgba(110,231,183,0.12)] transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-200 ${
            spotlight ? 'px-5 py-3 text-sm' : 'px-4 py-2.5 text-xs sm:text-sm'
          }`}
        >
          <ExternalLink size={spotlight ? 16 : 14} />
          Live Demo
        </a>
      )}

      {project.githubLink && (
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] font-semibold text-slate-200 transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:text-white ${
            spotlight ? 'px-5 py-3 text-sm' : 'px-4 py-2.5 text-xs sm:text-sm'
          }`}
        >
          <FaGithub size={spotlight ? 16 : 14} />
          GitHub
        </a>
      )}
    </div>
  );
}

export function ProjectCard({
  project,
  onStoryOpen,
  onDetailsOpen,
  variant = 'standard',
  index = 0,
}: ProjectCardProps) {
  const videoCount = project.videos?.length ?? 0;
  const imageCount = project.gallery?.length ?? 0;
  const hasMedia = videoCount > 0 || imageCount > 0;

  const accent =
    categoryAccent[project.category] ??
    'from-cyan-300 via-sky-300 to-violet-300';

  if (variant === 'spotlight') {
    return (
      <motion.article
        layout
        data-cursor-interactive="true"
        initial={{
          opacity: 0,
          y: 35,
          scale: 0.985,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: -20,
          scale: 0.985,
        }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="group relative overflow-hidden rounded-[2.2rem] border border-white/[0.09] bg-[#07101d]/58 shadow-[0_30px_100px_rgba(0,0,0,0.26)] backdrop-blur-xl"
      >
        <div
          className={`pointer-events-none absolute -left-32 top-[-14rem] h-[34rem] w-[34rem] rounded-full bg-gradient-to-br ${accent} opacity-[0.07] blur-[100px] transition-opacity duration-700 group-hover:opacity-[0.11]`}
        />

        <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
          {/* VISUAL */}
          <div className="relative min-h-[330px] overflow-hidden border-b border-white/[0.07] lg:min-h-[570px] lg:border-b-0 lg:border-r">
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)',
                backgroundSize: '46px 46px',
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/[0.025] via-transparent to-violet-500/[0.055]" />

            <div className="absolute left-5 top-5 z-20 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/[0.1] bg-[#030712]/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-200 backdrop-blur-xl">
                {project.category}
              </span>

              {project.featured && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-100 backdrop-blur-xl">
                  <Sparkles size={11} />
                  Featured
                </span>
              )}
            </div>

            {project.liveLink && (
              <div className="absolute right-5 top-5 z-20 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/[0.08] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-200 backdrop-blur-xl">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Live
              </div>
            )}

            <motion.div
              whileHover={{
                scale: 1.035,
                rotate: -0.7,
              }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-10 top-20 flex items-center justify-center sm:inset-16 sm:top-24 lg:inset-16"
            >
              <div className="absolute h-[70%] w-[70%] rounded-full bg-cyan-300/[0.07] blur-[65px]" />

              <Image
                src={project.image}
                alt={project.title}
                width={760}
                height={520}
                className="relative max-h-[330px] w-auto max-w-full object-contain drop-shadow-[0_35px_65px_rgba(34,211,238,0.18)]"
              />
            </motion.div>

            {hasMedia && (
              <div className="absolute bottom-5 left-5 z-20 flex flex-wrap gap-2">
                {videoCount > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-300/20 bg-[#030712]/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-violet-200 backdrop-blur-xl">
                    <Play size={11} />
                    {videoCount} Demo{videoCount > 1 ? 's' : ''}
                  </span>
                )}

                {imageCount > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/20 bg-[#030712]/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-200 backdrop-blur-xl">
                    <ImageIcon size={11} />
                    {imageCount} Image{imageCount > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            )}

            <div className="absolute bottom-5 right-6 font-[var(--font-space)] text-7xl font-black text-white/[0.025] sm:text-8xl">
              01
            </div>
          </div>

          {/* CONTENT */}
          <div className="relative flex flex-col justify-center p-7 sm:p-9 lg:p-11">
            <div className="mb-5 flex items-center gap-3">
              <span className={`h-px w-10 bg-gradient-to-r ${accent}`} />

              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                Selected Build
              </span>
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
              {project.role}
            </p>

            <h3 className="mt-4 font-[var(--font-space)] text-3xl font-black leading-[1.08] tracking-tight text-white sm:text-4xl xl:text-5xl">
              {project.title}
            </h3>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              {project.shortDescription}
            </p>

            <div className="mt-7 border-l border-cyan-300/30 pl-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-600">
                Why it matters
              </p>

              <p className="mt-2 text-sm leading-7 text-slate-300">
                {project.impact}
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2.5">
              {project.tech.map(tech => (
                <div
                  key={tech}
                  className="flex items-center gap-2 text-xs font-medium text-slate-400"
                >
                  <span className="h-1 w-1 rounded-full bg-cyan-300/70" />
                  {tech}
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-white/[0.07] pt-6">
              <ProjectActions
                project={project}
                onStoryOpen={onStoryOpen}
                onDetailsOpen={onDetailsOpen}
                spotlight
              />
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      layout
      data-cursor-interactive="true"
      initial={{
        opacity: 0,
        y: 28,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 18,
        scale: 0.98,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -7,
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.9rem] border border-white/[0.075] bg-[#07101d]/48 backdrop-blur-xl transition-colors duration-500 hover:border-white/[0.14]"
    >
      <div
        className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br ${accent} opacity-[0.045] blur-[70px] transition-all duration-700 group-hover:scale-150 group-hover:opacity-[0.08]`}
      />

      {/* IMAGE */}
      <div className="relative h-60 overflow-hidden border-b border-white/[0.065]">
        <div
          className="absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)',
            backgroundSize: '38px 38px',
          }}
        />

        <motion.div
          whileHover={{
            scale: 1.055,
            rotate: -0.8,
          }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-8 flex items-center justify-center"
        >
          <Image
            src={project.image}
            alt={project.title}
            width={460}
            height={280}
            className="max-h-40 w-auto max-w-full object-contain opacity-90 drop-shadow-[0_22px_45px_rgba(34,211,238,0.14)]"
          />
        </motion.div>

        <div className="absolute left-4 top-4 rounded-full border border-white/[0.09] bg-[#030712]/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-300 backdrop-blur-xl">
          {project.category}
        </div>

        {project.liveLink && (
          <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-400/[0.08] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-200 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
            Live
          </div>
        )}

        <span className="absolute bottom-4 right-5 font-[var(--font-space)] text-5xl font-black text-white/[0.035]">
          {String(index + 2).padStart(2, '0')}
        </span>

        {hasMedia && (
          <div className="absolute bottom-4 left-4 flex gap-2">
            {videoCount > 0 && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-violet-200/80">
                <Play size={11} />
                {videoCount}
              </span>
            )}

            {imageCount > 0 && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-cyan-200/80">
                <ImageIcon size={11} />
                {imageCount}
              </span>
            )}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="relative flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
              {project.role}
            </p>

            <h3 className="mt-2 font-[var(--font-space)] text-2xl font-bold leading-tight tracking-tight text-white">
              {project.title}
            </h3>
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08] text-cyan-200/70 transition duration-300 group-hover:border-cyan-300/20 group-hover:bg-cyan-300/[0.05] group-hover:text-cyan-200">
            <Layers3 size={16} />
          </div>
        </div>

        <p className="text-sm leading-6 text-slate-400">
          {project.shortDescription}
        </p>

        <p className="mt-4 text-sm leading-6 text-slate-300/85">
          {project.impact}
        </p>

        <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
          {project.tech.slice(0, 5).map(tech => (
            <span
              key={tech}
              className="text-[11px] font-medium text-slate-500 transition-colors duration-300 group-hover:text-slate-400"
            >
              #{tech.replace(/\s+/g, '')}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6">
          <div className="mb-5 h-px bg-gradient-to-r from-white/[0.08] via-white/[0.05] to-transparent" />

          <ProjectActions
            project={project}
            onStoryOpen={onStoryOpen}
            onDetailsOpen={onDetailsOpen}
          />
        </div>
      </div>
    </motion.article>
  );
}
