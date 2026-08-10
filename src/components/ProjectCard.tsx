'use client';

import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  BookOpen,
  Code2,
  ExternalLink,
  ImageIcon,
  Play,
} from 'lucide-react';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import type { Project } from '../data/projects';

type ProjectCardProps = {
  project: Project;
  onStoryOpen: (project: Project) => void;
  onDetailsOpen: (project: Project) => void;
};

export function ProjectCard({
  project,
  onStoryOpen,
  onDetailsOpen,
}: ProjectCardProps) {
  const hasStory = Boolean(project.story && project.story.length > 0);
  const videoCount = project.videos?.length || 0;
  const imageCount = project.gallery?.length || 0;
  const hasMedia = videoCount > 0 || imageCount > 0;
  const isLive = Boolean(project.liveLink);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, rotateX: 1.5, rotateY: -1.5 }}
      className="group glass-card relative overflow-hidden rounded-[2rem] p-5"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/0 via-transparent to-violet-500/0 transition duration-500 group-hover:from-cyan-300/10 group-hover:to-violet-500/10" />

      <div className="relative mb-5 overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/70">
        <div className="absolute inset-0 soft-grid opacity-20" />

        <div className="relative flex h-56 items-center justify-center p-6">
          <Image
            src={project.image}
            alt={project.title}
            width={420}
            height={260}
            className="max-h-44 w-auto object-contain opacity-90 drop-shadow-[0_20px_45px_rgba(34,211,238,0.18)] transition duration-300 group-hover:scale-105"
          />
        </div>

        <div className="absolute left-4 top-4 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100 backdrop-blur">
          {project.category}
        </div>

        {isLive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-200 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Live
          </motion.div>
        )}

        {hasMedia && (
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            {videoCount > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-300/25 bg-violet-300/10 px-3 py-1 text-xs font-semibold text-violet-100 backdrop-blur">
                <Play size={12} />
                {videoCount} Video{videoCount > 1 ? 's' : ''}
              </span>
            )}

            {imageCount > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100 backdrop-blur">
                <ImageIcon size={12} />
                {imageCount} Image{imageCount > 1 ? 's' : ''}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="relative">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              {project.role}
            </p>

            <h3 className="font-[var(--font-space)] text-2xl font-bold leading-tight text-white">
              {project.title}
            </h3>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-cyan-200">
            <Code2 size={20} />
          </div>
        </div>

        <p className="text-sm leading-6 text-slate-400">
          {project.shortDescription}
        </p>

        <p className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-300">
          {project.impact}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map(tech => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {(project.liveLink || project.githubLink) && (
          <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-5">
            {project.liveLink && (
              <motion.a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-2.5 text-sm font-bold text-emerald-200 transition hover:border-emerald-300/50 hover:bg-emerald-400/20"
              >
                <ExternalLink size={16} />
                Live Demo
              </motion.a>
            )}

            {project.githubLink && (
              <motion.a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-300/30 hover:bg-white/10"
              >
                <FaGithub size={16} />
                GitHub
              </motion.a>
            )}
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={() => onDetailsOpen(project)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10"
          >
            View Details
            <ArrowUpRight size={16} />
          </button>

          {hasStory && (
            <button
              onClick={() => onStoryOpen(project)}
              className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
            >
              <BookOpen size={16} />
              Why I Built This
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}


