'use client';

import { motion } from 'framer-motion';
import {
  Bot,
  BrainCircuit,
  Braces,
  Cpu,
  Database,
  Eye,
  Gauge,
  MapPin,
  RadioTower,
  Server,
  Sparkles,
} from 'lucide-react';
import type { ComponentType } from 'react';
import {
  SiCplusplus,
  SiCss,
  SiDocker,
  SiExpo,
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiOpencv,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';

type TechIcon = ComponentType<{
  className?: string;
}>;

type Technology = {
  name: string;
  icon: TechIcon;
  iconClass: string;
};

type TechnologyGroup = {
  number: string;
  title: string;
  description: string;
  technologies: Technology[];
};

const technologyGroups: TechnologyGroup[] = [
  {
    number: '01',
    title: 'Languages',
    description:
      'Programming languages I use across web development, AI, software engineering, and embedded systems.',
    technologies: [
      {
        name: 'JavaScript',
        icon: SiJavascript,
        iconClass: 'text-yellow-300',
      },
      {
        name: 'TypeScript',
        icon: SiTypescript,
        iconClass: 'text-sky-400',
      },
      {
        name: 'Python',
        icon: SiPython,
        iconClass: 'text-blue-300',
      },
      {
        name: 'C++',
        icon: SiCplusplus,
        iconClass: 'text-blue-400',
      },
      {
        name: 'PHP',
        icon: SiPhp,
        iconClass: 'text-violet-300',
      },
      {
        name: 'SQL',
        icon: Database,
        iconClass: 'text-cyan-300',
      },
    ],
  },

  {
    number: '02',
    title: 'Frontend Development',
    description:
      'Technologies I use to create responsive, interactive, and modern user experiences.',
    technologies: [
      {
        name: 'React',
        icon: SiReact,
        iconClass: 'text-cyan-300',
      },
      {
        name: 'Next.js',
        icon: SiNextdotjs,
        iconClass: 'text-white',
      },
      {
        name: 'React Native',
        icon: SiReact,
        iconClass: 'text-sky-300',
      },
      {
        name: 'Tailwind CSS',
        icon: SiTailwindcss,
        iconClass: 'text-cyan-300',
      },
      {
        name: 'HTML5',
        icon: SiHtml5,
        iconClass: 'text-orange-400',
      },
      {
        name: 'CSS3',
        icon: SiCss,
        iconClass: 'text-blue-400',
      },
    ],
  },

  {
    number: '03',
    title: 'Backend & APIs',
    description:
      'Backend technologies I use for APIs, authentication, realtime systems, and application logic.',
    technologies: [
      {
        name: 'Node.js',
        icon: SiNodedotjs,
        iconClass: 'text-emerald-400',
      },
      {
        name: 'Express.js',
        icon: SiExpress,
        iconClass: 'text-slate-100',
      },
      {
        name: 'Supabase',
        icon: SiSupabase,
        iconClass: 'text-emerald-300',
      },
      {
        name: 'REST API',
        icon: Braces,
        iconClass: 'text-cyan-300',
      },
      {
        name: 'Server Systems',
        icon: Server,
        iconClass: 'text-violet-300',
      },
    ],
  },

  {
    number: '04',
    title: 'Databases',
    description:
      'Database technologies I work with for structured data, realtime applications, and scalable backend systems.',
    technologies: [
      {
        name: 'PostgreSQL',
        icon: SiPostgresql,
        iconClass: 'text-sky-400',
      },
      {
        name: 'MongoDB',
        icon: SiMongodb,
        iconClass: 'text-emerald-400',
      },
      {
        name: 'MySQL',
        icon: SiMysql,
        iconClass: 'text-blue-300',
      },
      {
        name: 'Supabase DB',
        icon: SiSupabase,
        iconClass: 'text-emerald-300',
      },
      {
        name: 'SQL',
        icon: Database,
        iconClass: 'text-cyan-300',
      },
    ],
  },

  {
    number: '05',
    title: 'AI & Computer Vision',
    description:
      'Technologies and concepts I use for intelligent applications, automation, vision systems, and research.',
    technologies: [
      {
        name: 'AI / ML',
        icon: BrainCircuit,
        iconClass: 'text-violet-300',
      },
      {
        name: 'OpenCV',
        icon: SiOpencv,
        iconClass: 'text-cyan-300',
      },
      {
        name: 'Computer Vision',
        icon: Eye,
        iconClass: 'text-sky-300',
      },
      {
        name: 'Machine Learning',
        icon: Sparkles,
        iconClass: 'text-fuchsia-300',
      },
      {
        name: 'AI Automation',
        icon: Bot,
        iconClass: 'text-violet-300',
      },
      {
        name: 'Data Processing',
        icon: Cpu,
        iconClass: 'text-cyan-300',
      },
    ],
  },

  {
    number: '06',
    title: 'IoT & Robotics',
    description:
      'Technologies I use to connect software with sensors, communication systems, embedded hardware, and robotics.',
    technologies: [
      {
        name: 'ESP32',
        icon: Cpu,
        iconClass: 'text-cyan-300',
      },
      {
        name: 'LoRa',
        icon: RadioTower,
        iconClass: 'text-violet-300',
      },
      {
        name: 'GPS',
        icon: MapPin,
        iconClass: 'text-emerald-300',
      },
      {
        name: 'Embedded Systems',
        icon: Cpu,
        iconClass: 'text-sky-300',
      },
      {
        name: 'Robotics',
        icon: Bot,
        iconClass: 'text-cyan-300',
      },
      {
        name: 'PID Control',
        icon: Gauge,
        iconClass: 'text-orange-300',
      },
    ],
  },

  {
    number: '07',
    title: 'Development Tools',
    description:
      'Tools I use for coding, version control, API testing, development workflow, and collaboration.',
    technologies: [
      {
        name: 'Git',
        icon: SiGit,
        iconClass: 'text-orange-400',
      },
      {
        name: 'GitHub',
        icon: SiGithub,
        iconClass: 'text-white',
      },
      {
        name: 'VS Code',
        icon: VscCode,
        iconClass: 'text-sky-400',
      },
      {
        name: 'Postman',
        icon: SiPostman,
        iconClass: 'text-orange-400',
      },
      {
        name: 'Docker',
        icon: SiDocker,
        iconClass: 'text-blue-400',
      },
    ],
  },

  {
    number: '08',
    title: 'Deployment & Platforms',
    description:
      'Platforms I use to publish, deploy, test, and deliver applications to real users.',
    technologies: [
      {
        name: 'Vercel',
        icon: SiVercel,
        iconClass: 'text-white',
      },
      {
        name: 'Netlify',
        icon: SiNetlify,
        iconClass: 'text-cyan-300',
      },
      {
        name: 'Docker',
        icon: SiDocker,
        iconClass: 'text-blue-400',
      },
      {
        name: 'Expo',
        icon: SiExpo,
        iconClass: 'text-slate-100',
      },
      {
        name: 'GitHub',
        icon: SiGithub,
        iconClass: 'text-white',
      },
    ],
  },
];

const categoryVariant = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const techContainer = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
};

const techVariant = {
  hidden: {
    opacity: 0,
    y: 14,
    scale: 0.92,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function TechStackShowcase() {
  return (
    <section
      id="toolkit"
      className="relative z-10 overflow-hidden py-20 sm:py-24 md:py-28"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(103,232,249,0.75) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <motion.div
          animate={{
            x: ['-10%', '12%', '-10%'],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute left-[5%] top-[12%] h-72 w-[45%] rounded-full bg-cyan-400/[0.045] blur-[130px]"
        />

        <motion.div
          animate={{
            x: ['10%', '-12%', '10%'],
          }}
          transition={{
            duration: 21,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-[10%] right-[5%] h-80 w-[45%] rounded-full bg-violet-500/[0.045] blur-[140px]"
        />
      </div>

      <div className="section-container relative">
        {/* INTRO */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
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
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mb-20 max-w-5xl text-center"
        >
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300 sm:text-sm">
            Technologies I Work With
          </p>

          <h2 className="font-[var(--font-space)] text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Languages, tools, and technologies
            <span className="block bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent">
              I use to build and ship.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-slate-400 md:text-lg">
            My stack spans software development, frontend and backend systems,
            databases, AI and computer vision, IoT, robotics, development
            workflows, and production deployment.
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
              duration: 1,
              delay: 0.25,
            }}
            className="mx-auto mt-10 h-px max-w-3xl origin-center bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent"
          />
        </motion.div>

        {/* TECHNOLOGY GROUPS */}
        <div>
          {technologyGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              variants={categoryVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                margin: '-90px',
              }}
              className="relative border-t border-white/[0.08] py-10 md:py-12"
            >
              <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
                {/* CATEGORY INFO */}
                <div className="relative">
                  <div className="flex items-center gap-4">
                    <span className="font-[var(--font-space)] text-xs font-bold tracking-[0.25em] text-cyan-300/60">
                      {group.number}
                    </span>

                    <span className="h-px w-8 bg-cyan-300/30" />

                    <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-600">
                      Category
                    </p>
                  </div>

                  <h3 className="mt-4 font-[var(--font-space)] text-2xl font-bold text-white md:text-3xl">
                    {group.title}
                  </h3>

                  <p className="mt-4 max-w-sm text-sm leading-7 text-slate-500">
                    {group.description}
                  </p>
                </div>

                {/* TECHNOLOGIES */}
                <motion.div
                  variants={techContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                    margin: '-80px',
                  }}
                  className="grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-3 xl:grid-cols-4"
                >
                  {group.technologies.map(technology => {
                    const Icon = technology.icon;

                    return (
                      <motion.div
                        key={technology.name}
                        variants={techVariant}
                        whileHover={{
                          y: -5,
                          x: 2,
                        }}
                        className="group/tech relative flex cursor-default items-center gap-3"
                      >
                        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
                          <div className="absolute inset-0 rounded-full bg-cyan-300/[0.04] opacity-0 blur-lg transition duration-300 group-hover/tech:opacity-100" />

                          <motion.div
                            whileHover={{
                              rotate: [0, -5, 5, 0],
                              scale: 1.12,
                            }}
                            transition={{
                              duration: 0.35,
                            }}
                            className="relative"
                          >
                            <Icon
                              className={`h-7 w-7 ${technology.iconClass} transition duration-300 group-hover/tech:drop-shadow-[0_0_12px_rgba(103,232,249,0.35)]`}
                            />
                          </motion.div>
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-300 transition-colors duration-300 group-hover/tech:text-white">
                            {technology.name}
                          </p>

                          <motion.div
                            initial={{
                              scaleX: 0,
                            }}
                            whileHover={{
                              scaleX: 1,
                            }}
                            className="mt-1 h-px w-full origin-left bg-gradient-to-r from-cyan-300/60 to-transparent"
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>

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
                  delay: 0.15,
                }}
                className="absolute left-0 top-0 h-px w-24 origin-left bg-gradient-to-r from-cyan-300/70 to-transparent"
              />

              {groupIndex === technologyGroups.length - 1 && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.08]" />
              )}
            </motion.div>
          ))}
        </div>

        {/* FOOTER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mt-12 flex flex-col items-center justify-between gap-5 md:flex-row"
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-30" />

              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>

            <p className="text-xs text-slate-500">
              Continuously learning and expanding my engineering stack.
            </p>
          </div>

          <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-600 sm:text-xs">
            <span>Design</span>
            <span className="h-1 w-1 rounded-full bg-cyan-300/50" />

            <span>Develop</span>
            <span className="h-1 w-1 rounded-full bg-cyan-300/50" />

            <span>Deploy</span>
            <span className="h-1 w-1 rounded-full bg-cyan-300/50" />

            <span>Improve</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
