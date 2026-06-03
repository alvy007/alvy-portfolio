'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Code2,
  ExternalLink,
  ImageIcon,
  Play,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import type { Project } from '../data/projects';

type ProjectDetailsModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectDetailsModal({
  project,
  onClose,
}: ProjectDetailsModalProps) {
  if (!project) return null;

  const hasVideos = Boolean(project.videos && project.videos.length > 0);
  const hasGallery = Boolean(project.gallery && project.gallery.length > 0);

  const mainVideo = project.videos?.[0];
  const extraVideos = project.videos?.slice(1) || [];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[75] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          onClick={event => event.stopPropagation()}
          className="glass-card relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] p-6 md:p-8"
        >
          <div className="sticky top-0 z-30 -mx-6 -mt-6 mb-5 flex justify-end border-b border-white/10 bg-[#030712]/95 px-6 py-4 backdrop-blur-xl md:-mx-8 md:-mt-8 md:px-8">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full border border-red-300/30 bg-red-400/15 px-4 py-2 text-sm font-semibold text-red-100 shadow-[0_0_25px_rgba(248,113,113,0.16)] transition hover:border-red-300/50 hover:bg-red-400/25 hover:text-white"
              aria-label="Close project details"
            >
              <X size={17} />
              Close
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-5">
              <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/70">
                <div className="border-b border-white/10 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-white">
                      {mainVideo ? mainVideo.title : 'Project Preview'}
                    </p>

                    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                      {project.category}
                    </span>
                  </div>
                </div>

                {mainVideo ? (
                  <video
                    src={mainVideo.src}
                    controls
                    muted
                    playsInline
                    preload="metadata"
                    className="aspect-video w-full bg-black object-contain"
                  />
                ) : (
                  <div className="relative flex h-72 items-center justify-center p-6">
                    <div className="absolute inset-0 soft-grid opacity-20" />
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={520}
                      height={320}
                      className="relative z-10 max-h-56 w-auto object-contain drop-shadow-[0_20px_45px_rgba(34,211,238,0.18)]"
                    />
                  </div>
                )}
              </div>

              {extraVideos.length > 0 && (
                <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-4">
                  <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-cyan-200">
                    <Play size={17} />
                    More Videos
                  </div>

                  <div className="space-y-4">
                    {extraVideos.map(video => (
                      <div
                        key={video.src}
                        className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70"
                      >
                        <div className="border-b border-white/10 px-4 py-3">
                          <p className="text-sm font-semibold text-white">
                            {video.title}
                          </p>
                        </div>

                        <video
                          src={video.src}
                          controls
                          muted
                          playsInline
                          preload="metadata"
                          className="aspect-video w-full bg-black object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {hasGallery && (
                <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-4">
                  <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-cyan-200">
                    <ImageIcon size={17} />
                    Project Gallery
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {project.gallery?.map(image => (
                      <div
                        key={image}
                        className="relative h-48 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70"
                      >
                        <Image
                          src={image}
                          alt={`${project.title} gallery`}
                          fill
                          sizes="(max-width: 768px) 100vw, 320px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Project Details
              </p>

              <h3 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white md:text-5xl">
                {project.title}
              </h3>

              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                {project.role}
              </p>

              <p className="mt-6 text-base leading-7 text-slate-300">
                {project.shortDescription}
              </p>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-cyan-200">
                  <ArrowUpRight size={17} />
                  Impact
                </p>
                <p className="text-sm leading-6 text-slate-300">
                  {project.impact}
                </p>
              </div>

              <div className="mt-6">
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyan-200">
                  <Code2 size={17} />
                  Tech Stack
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map(tech => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              {project.features && project.features.length > 0 && (
                <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <p className="mb-4 text-sm font-semibold text-cyan-200">
                    Key Features
                  </p>

                  <div className="space-y-3">
                    {project.features.map(feature => (
                      <div
                        key={feature}
                        className="flex gap-3 text-sm leading-6 text-slate-300"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
                  >
                    <ExternalLink size={17} />
                    Live Preview
                  </a>
                )}

                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10"
                  >
                    <FaGithub size={17} />
                    GitHub
                  </a>
                )}

                {!project.liveLink && !project.githubLink && (
                  <p className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-400">
                    Links can be added later from the project data file.
                  </p>
                )}
              </div>

              {(hasVideos || hasGallery) && (
                <div className="mt-8 rounded-3xl border border-cyan-300/10 bg-cyan-300/5 p-5">
                  <p className="text-sm font-semibold text-cyan-100">
                    Media available
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    This project includes demo video or visual documentation
                    inside the details view.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
