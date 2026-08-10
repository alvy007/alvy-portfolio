'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export function HeroQuote() {
  return (
    <section
      id="hero-quote"
      className="relative z-10 overflow-hidden py-20 sm:py-24 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-72 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.045] blur-[120px]" />

        <motion.div
          animate={{
            x: ['-20%', '20%', '-20%'],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent"
        />

        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(103,232,249,0.8) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="section-container relative">
        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: '-100px',
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-6xl"
        >
          <div className="mb-8 flex justify-center">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                y: [0, -4, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.05] text-cyan-200 backdrop-blur-xl"
            >
              <Quote size={20} />
            </motion.div>
          </div>

          <motion.blockquote
            initial={{
              opacity: 0,
              scale: 0.98,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              delay: 0.12,
            }}
            className="text-center font-[var(--font-space)] text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
          >
            I turn real problems into practical{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent">
              software, IoT, and AI-powered solutions.
            </span>
          </motion.blockquote>

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
              duration: 1,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto mt-10 h-px max-w-3xl origin-center bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent"
          />

          <motion.p
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
              duration: 0.6,
              delay: 0.45,
            }}
            className="mt-6 text-center text-xs font-semibold uppercase tracking-[0.3em] text-slate-500"
          >
            Build with purpose · Engineer for impact
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
