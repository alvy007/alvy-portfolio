export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  mode: string;
  type: string;
  summary: string;
  highlights: string[];
  skills: string[];
};

export const experiences: ExperienceItem[] = [
  {
    company: 'Pynexia Technology',
    role: 'Artificial Intelligence Intern',
    period: 'Oct 2026 · 1 Month',
    mode: 'Remote / Virtual',
    type: 'Internship',
    summary:
      'Selected for a virtual AI internship focused on practical coding tasks, applied problem solving, and portfolio-ready project work.',
    highlights: [
      'Built and iterated on hands-on AI projects covering search, rules, games, and computer vision.',
      'Applied structured problem solving while turning technical exercises into deployable project artifacts.',
    ],
    skills: ['Artificial Intelligence', 'Python', 'Computer Vision', 'Problem Solving'],
  },
  {
    company: 'Horizon TechX',
    role: 'AI & Data Science Intern',
    period: 'Oct 2026',
    mode: 'Virtual',
    type: 'Internship',
    summary:
      'Selected for an AI and Data Science internship centered on practical assignments, applied analysis, and hands-on technical learning.',
    highlights: [
      'Practiced data-science workflows through structured assignments and implementation tasks.',
      'Strengthened Python, data analysis, and applied AI fundamentals through project-based learning.',
    ],
    skills: ['AI', 'Data Science', 'Python', 'Data Analysis'],
  },
  {
    company: 'Oasis Infobyte',
    role: 'Data Analytics Intern',
    period: 'Oct 2026 – Present',
    mode: 'Remote',
    type: 'Internship',
    summary:
      'Applying data-analysis concepts through structured project work, data preparation, exploratory analysis, and analytical problem solving.',
    highlights: [
      'Strengthening practical Python-based analysis skills through hands-on assignments and guided project execution.',
      'Working with data preparation, exploratory analysis, and structured analytical workflows.',
    ],
    skills: ['Data Analytics', 'Python', 'EDA', 'Data Preparation'],
  },
  {
    company: 'Basic Japanese Language School / Miracle Overseas',
    role: 'WordPress Developer',
    period: 'Jun 2024 – Jan 2025',
    mode: 'Remote',
    type: 'Professional Experience',
    summary:
      'Developed and maintained substantial portions of a production institutional website using WordPress, Elementor, responsive layouts, themes, plugins, and production content.',
    highlights: [
      'Managed hosting and domain configuration, cross-device fixes, performance improvements, troubleshooting, and iterative UI/content updates.',
      'Provided approximately six months of post-development maintenance through bug fixing and ongoing content updates.',
    ],
    skills: ['WordPress', 'Elementor', 'Responsive UI', 'Hosting', 'Maintenance'],
  },
];
