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
      'Selected for a virtual AI internship focused on practical coding tasks, hands-on technical challenges, and portfolio-ready project work.',
    highlights: [
      'Working through real-world AI coding tasks and practical technical challenges.',
      'Building verifiable project artifacts while strengthening applied AI problem-solving skills.',
    ],
    skills: ['Artificial Intelligence', 'Python', 'Problem Solving', 'Project Work'],
  },
  {
    company: 'Horizon TechX',
    role: 'AI & Data Science Intern',
    period: 'Oct 2026',
    mode: 'Virtual',
    type: 'Internship',
    summary:
      'Selected for an AI & Data Science internship designed around hands-on learning, practical assignments, and applied technical skill development.',
    highlights: [
      'Gaining practical exposure to AI and data-science workflows through guided assignments.',
      'Applying learned concepts through hands-on tasks and structured technical practice.',
    ],
    skills: ['AI', 'Data Science', 'Python', 'Data Analysis'],
  },
  {
    company: 'Oasis Infobyte',
    role: 'Data Analytics Intern',
    period: 'Oct 2026 · 1 Month',
    mode: 'Remote',
    type: 'Internship',
    summary:
      'Applying data-analysis concepts through structured project work, data preparation, exploratory analysis, and analytical problem solving.',
    highlights: [
      'Strengthening Python-based data analysis through hands-on assignments and guided project execution.',
      'Practicing data preparation, exploratory analysis, and structured analytical thinking.',
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
      'Developed and maintained substantial portions of a production institutional website, covering frontend presentation, configuration, troubleshooting, and ongoing updates.',
    highlights: [
      'Built and customized responsive pages using WordPress, Elementor, themes, plugins, and production content.',
      'Handled hosting and domain configuration, cross-device fixes, performance improvements, troubleshooting, and post-launch maintenance.',
    ],
    skills: ['WordPress', 'Elementor', 'Responsive UI', 'Hosting', 'Maintenance'],
  },
];
