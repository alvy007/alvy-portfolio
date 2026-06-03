'use client';

import { useMemo, useState } from 'react';
import { projects, type Project } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailsModal } from './ProjectDetailsModal';
import { ProjectStoryModal } from './ProjectStoryModal';

const categories = [
  'All',
  'AI Robotics',
  'Mobile App',
  'IoT / Embedded',
  'Robotics',
  'Web Development',
  'Mobile / AI',
  'Browser Extension',
  'AI / Automation',
];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedStoryProject, setSelectedStoryProject] =
    useState<Project | null>(null);
  const [selectedDetailsProject, setSelectedDetailsProject] =
    useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;

    return projects.filter(project => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="projects" className="relative z-10 section-container py-24">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Featured Work
          </p>
          <h2 className="font-[var(--font-space)] text-3xl font-black tracking-tight text-white md:text-5xl">
            Projects built across software, hardware, AI, and real problems.
          </h2>
        </div>

        <p className="max-w-md text-sm leading-6 text-slate-400">
          The surface stays clean. The story stays optional. Click “Why I Built
          This” when you want to see the idea behind a project.
        </p>
      </div>

      <div className="no-scrollbar mb-8 flex gap-3 overflow-x-auto pb-2">
        {categories.map(category => {
          const active = activeCategory === category;

          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                active
                  ? 'border-cyan-300 bg-cyan-300 text-slate-950'
                  : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-cyan-300/30 hover:text-white'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {filteredProjects.map(project => (
          <ProjectCard
            key={project.title}
            project={project}
            onStoryOpen={setSelectedStoryProject}
            onDetailsOpen={setSelectedDetailsProject}
          />
        ))}
      </div>

      <ProjectDetailsModal
        project={selectedDetailsProject}
        onClose={() => setSelectedDetailsProject(null)}
      />

      <ProjectStoryModal
        project={selectedStoryProject}
        onClose={() => setSelectedStoryProject(null)}
      />
    </section>
  );
}
