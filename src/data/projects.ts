export type StoryStep = {
  label: string;
  text: string;
};

export type ProjectVideo = {
  title: string;
  src: string;
};

export type Project = {
  title: string;
  category: string;
  role: string;
  shortDescription: string;
  impact: string;
  tech: string[];
  image: string;
  featured: boolean;
  liveLink?: string;
  githubLink?: string;
  videos?: ProjectVideo[];
  gallery?: string[];
  features?: string[];
  story?: StoryStep[];
};

export const projects: Project[] = [
  {
    title: 'AI Robotic Waste Management System',
    category: 'AI Robotics',
    role: 'Final Year Project Lead',
    shortDescription:
      'A six-class computer-vision waste detection pipeline integrated with automated 6-DOF robotic sorting.',
    impact:
      'The YOLOv8n baseline achieved 0.666 mAP50, 0.539 mAP50-95, and 3.85 ms/image test inference while supporting real-time robotic sorting.',
    tech: ['YOLOv8n', 'OpenCV', 'Python', 'Computer Vision', '6-DOF Robotics'],
    image: '/window.svg',
    featured: true,
    githubLink: 'https://github.com/alvy007/waste-classification-robot',
    features: [
      'Six-class waste detection pipeline',
      'Real-time visual inference',
      'Automated 6-DOF robotic sorting',
      'Human-in-the-loop capture of uncertain samples',
    ],
  },
  {
    title: 'FitBondhu – Fitness Guide',
    category: 'Full-Stack Product',
    role: 'Full-Stack Developer',
    shortDescription:
      'A beginner-focused fitness platform with workout guidance, diet planning, account flows, streaks, badges, and reusable React/TypeScript components.',
    impact:
      'Built and deployed to make structured fitness guidance easier for beginners while combining product thinking, frontend architecture, and backend workflows.',
    tech: ['Next.js', 'React', 'TypeScript', 'Supabase'],
    image: '/window.svg',
    featured: true,
    liveLink: 'https://fitbondhu.netlify.app/',
    githubLink: 'https://github.com/alvy007/gym_app',
    story: [
      {
        label: 'The Problem',
        text: 'Many beginners at the gym feel confused about workouts, machines, diet, and how to stay consistent.',
      },
      {
        label: 'Personal Experience',
        text: 'I faced similar problems myself and also saw people around me struggling with the same issues.',
      },
      {
        label: 'The Idea',
        text: 'I wanted to build a fitness companion that could guide people step by step instead of overwhelming them.',
      },
      {
        label: 'The Solution',
        text: 'FitBondhu combines workout guidance, diet planning, account flows, streaks, badges, and reusable product components.',
      },
      {
        label: 'The Impact',
        text: 'The platform turns a common beginner problem into a practical, accessible digital fitness experience.',
      },
    ],
  },
  {
    title: 'ThiKorben – Local Service Marketplace',
    category: 'Mobile Marketplace',
    role: 'React Native Contributor',
    shortDescription:
      'A local-service marketplace app with worker profiles, community and marketplace flows, job-board features, chat, and service screens.',
    impact:
      'Contributed within a shared feature-branch and pull-request workflow, strengthening collaborative mobile development and product delivery experience.',
    tech: ['React Native', 'Expo', 'Git', 'GitHub'],
    image: '/window.svg',
    featured: true,
    githubLink: 'https://github.com/Mahmoud-Hussain/ThiKorben',
    features: [
      'Worker profile flows',
      'Community and marketplace screens',
      'Job board and chat experiences',
      'Collaborative Git feature-branch workflow',
    ],
  },
  {
    title: 'UIU Shuttle Management',
    category: 'Mobile App',
    role: 'Mobile App Developer',
    shortDescription:
      'A driver-to-student shuttle tracking system with live-map visualization and Supabase-backed application workflows.',
    impact:
      'Built to reduce uncertainty for students waiting for university shuttle buses by making live vehicle location visible.',
    tech: ['React Native', 'Expo Location', 'React Native Maps', 'Supabase'],
    image: '/window.svg',
    featured: true,
    githubLink: 'https://github.com/alvy007/uiu-shuttle-management',
    story: [
      {
        label: 'The Problem',
        text: 'I often had to wait for the university shuttle without knowing where the bus was.',
      },
      {
        label: 'The Frustration',
        text: 'Waiting without information wasted time and made campus travel uncertain.',
      },
      {
        label: 'The Idea',
        text: 'I thought, what if students could see the bus location in real time?',
      },
      {
        label: 'The Solution',
        text: 'I built driver-to-student tracking flows with live-map visualization and Supabase-backed application workflows.',
      },
      {
        label: 'The Impact',
        text: 'The system helps students reduce uncertainty and plan campus travel more effectively.',
      },
    ],
  },
  {
    title: 'Secure Vault Extension',
    category: 'Browser Extension',
    role: 'Extension Developer',
    shortDescription:
      'A privacy-focused Chrome extension for encrypted local storage of passwords, API keys, notes, and other sensitive data.',
    impact:
      'Designed around local encryption and secure backup flows using AES-256-GCM, PBKDF2, SHA-256 verification, and auto-lock behavior.',
    tech: ['Manifest V3', 'JavaScript', 'Web Crypto API', 'AES-256-GCM', 'PBKDF2'],
    image: '/window.svg',
    featured: true,
    githubLink: 'https://github.com/alvy007/secure-vault-extension',
    features: [
      'Encrypted local secret storage',
      'AES-256-GCM encryption',
      'PBKDF2 key derivation',
      'SHA-256 verification',
      'Auto-lock and encrypted backup flows',
    ],
    story: [
      {
        label: 'The Problem',
        text: 'I used to forget passwords but did not want to write them somewhere unsafe.',
      },
      {
        label: 'The Risk',
        text: 'Saving passwords or API keys openly creates avoidable privacy and security risks.',
      },
      {
        label: 'The Idea',
        text: 'I wanted a personal browser-based vault that kept sensitive information encrypted locally.',
      },
      {
        label: 'The Solution',
        text: 'I built a Chrome Manifest V3 extension using the Web Crypto API and modern encryption primitives.',
      },
      {
        label: 'The Impact',
        text: 'The project became a practical exercise in secure local storage, key derivation, verification, and privacy-first UX.',
      },
    ],
  },
  {
    title: 'Live LoRa Campus Shuttle Tracker',
    category: 'IoT / Embedded',
    role: 'Project Lead',
    shortDescription:
      'Offline-capable campus shuttle communication system using LoRa, GPS, and ESP32.',
    impact:
      'Designed to support location-aware shuttle communication without continuous internet dependency.',
    tech: ['LoRa', 'ESP32', 'GPS', 'IoT', 'Embedded Systems'],
    image: '/window.svg',
    featured: true,
    videos: [
      {
        title: 'App Communication Demo',
        src: '/videos/projects/lora-shuttle/demo1.mp4',
      },
      {
        title: 'Hardware Prototype Demo',
        src: '/videos/projects/lora-shuttle/demo2.mp4',
      },
    ],
  },
  {
    title: 'Micro-Mouse Autonomous Maze Solver',
    category: 'Robotics',
    role: 'Lead Developer',
    shortDescription:
      'Autonomous maze-solving robot using flood-fill path planning, IR sensing, and PID-based motion control.',
    impact:
      'Built as an embedded robotics project focused on autonomous navigation, sensing, precision movement, and decision making.',
    tech: ['C++', 'Flood-Fill', 'IR Sensors', 'PID Control', 'Motor Driver'],
    image: '/window.svg',
    featured: true,
    videos: [
      {
        title: 'Robot Demo',
        src: '/videos/projects/micromouse/demo.mp4',
      },
    ],
    gallery: [
      '/videos/projects/micromouse/image1.jpg',
      '/videos/projects/micromouse/image2.jpg',
    ],
  },
  {
    title: 'Travel & Tourism Management Website',
    category: 'Web Development',
    role: 'Web Developer',
    shortDescription:
      'A database-backed multi-page tourism platform covering registration, authentication, booking, hotel, transport, billing, and payment-related workflows.',
    impact:
      'Built to practice end-to-end CRUD workflows and service-oriented web application design.',
    tech: ['PHP', 'MySQL', 'HTML', 'CSS'],
    image: '/window.svg',
    featured: false,
    githubLink: 'https://github.com/alvy007/TourPlanningWebsiteProject',
  },
  {
    title: 'Full-Stack E-Commerce Platform',
    category: 'Web Development',
    role: 'Full-Stack Developer',
    shortDescription:
      'A scalable e-commerce platform with authentication, inventory, and REST API architecture.',
    impact:
      'Built to practice production-style full-stack development and user-focused commerce systems.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT', 'Docker'],
    image: '/window.svg',
    featured: false,
  },
  {
    title: 'PromoGen AI',
    category: 'AI / Automation',
    role: 'AI Workflow Developer',
    shortDescription:
      'AI-assisted promotional content generation workflow for creative automation.',
    impact:
      'Explores how AI can accelerate repeatable creative marketing content production.',
    tech: ['Python', 'AI Workflow', 'Automation', 'Video Processing'],
    image: '/window.svg',
    featured: false,
  },
];
