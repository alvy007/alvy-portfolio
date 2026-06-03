'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Project } from '../data/projects';

type ProjectStoryModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectStoryModal({
  project,
  onClose,
}: ProjectStoryModalProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  function handleClose() {
    setStep(0);
    onClose();
  }

  if (!project || !project.story || project.story.length === 0) {
    return null;
  }

  const current = project.story[step];
  const isFirst = step === 0;
  const isLast = step === project.story.length - 1;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          onClick={event => event.stopPropagation()}
          className="glass-card relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-[2rem] p-6 md:p-8"
        >
          <button
            onClick={handleClose}
            className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/[0.05] p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
            aria-label="Close story modal"
          >
            <X size={18} />
          </button>

          <div className="pr-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Why I Built This
            </p>

            <h3 className="font-[var(--font-space)] text-2xl font-black text-white md:text-4xl">
              {project.title}
            </h3>
          </div>

          <div className="mt-8">
            <div className="mb-5 flex items-center justify-between text-xs text-slate-400">
              <span>
                Step {step + 1} of {project.story.length}
              </span>
              <span>
                {Math.round(((step + 1) / project.story.length) * 100)}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-400"
                initial={false}
                animate={{
                  width: `${((step + 1) / project.story.length) * 100}%`,
                }}
                transition={{ duration: 0.25 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.22 }}
              className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
                {current.label}
              </p>

              <p className="mt-5 text-xl font-medium leading-8 text-white md:text-2xl md:leading-10">
                {current.text}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setStep(value => Math.max(0, value - 1))}
              disabled={isFirst}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft size={17} />
              Back
            </button>

            {isLast ? (
              <button
                onClick={handleClose}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
              >
                Done
              </button>
            ) : (
              <button
                onClick={() =>
                  setStep(value =>
                    Math.min(project.story!.length - 1, value + 1),
                  )
                }
                className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
              >
                Next
                <ArrowRight size={17} />
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
