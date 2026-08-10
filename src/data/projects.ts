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
    role: 'Lead Engineer',
    shortDescription:
      'A computer vision-powered 6DOF robotic waste classification and sorting system.',
    impact:
      'Designed to support smarter and safer waste handling through automation.',
    tech: ['OpenCV', '6DOF Arm', 'Python', 'Computer Vision', 'Robotics'],
    image: '/window.svg',
    featured: true,
  },
  {
    title: 'UIU Shuttle Tracking App',
    category: 'Mobile App',
    role: 'Mobile App Developer',
    shortDescription:
      'A realtime shuttle tracking app where drivers share location and students track the bus on a live map.',
    impact:
      'Built to reduce uncertainty for students waiting for university shuttle buses.',
    tech: ['React Native', 'Expo', 'Maps', 'Realtime Location', 'Supabase'],
    image: '/window.svg',
    featured: true,

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
        text: 'I built a shuttle tracking app where drivers can share live location and students can follow the bus on a map.',
      },
      {
        label: 'The Impact',
        text: 'The system helps students reduce uncertainty and plan their travel better.',
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
      'Built to support shuttle tracking and communication without depending on internet connectivity.',
    tech: ['LoRa', 'ESP32', 'GPS', 'IoT', 'Embedded System'],
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
      'Autonomous maze-solving robot using sensors, PID control, and pathfinding logic.',
    impact:
      'Built as an embedded robotics project for precision movement and decision making.',
    tech: ['C++', 'PID Control', 'IR Sensors', 'Motor Driver', 'Flood-Fill'],
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
    title: 'Full-Stack E-Commerce Platform',
    category: 'Web Development',
    role: 'Full-Stack Developer',
    shortDescription:
      'Scalable e-commerce platform with authentication, inventory, and REST API architecture.',
    impact:
      'Built to practice production-style full-stack development and user-focused commerce systems.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT', 'Docker'],
    image: '/window.svg',
    featured: true,
  },
  {
    title: 'FitBondhu Fitness App',
    category: 'Mobile / AI',
    role: 'App Developer',
    shortDescription:
      'Fitness companion app with workout guidance, diet planning, streaks, badges, and future AI scan features.',
    impact: 'Created to make gym guidance easier and more beginner-friendly.',
    tech: ['React', 'React Native', 'Supabase', 'AI Planning', 'Fitness Tech'],
    image: '/window.svg',
    featured: true,
    liveLink: 'https://fitbondhu.netlify.app/',
    story: [
      {
        label: 'The Problem',
        text: 'Many beginners at the gym feel confused about workouts, machines, and diet.',
      },
      {
        label: 'Personal Experience',
        text: 'I faced similar problems myself and also saw people around me struggling with the same issues.',
      },
      {
        label: 'The Idea',
        text: 'I wanted to build a fitness companion that could guide people step by step.',
      },
      {
        label: 'The Solution',
        text: 'FitBondhu was designed with workout guidance, diet planning, streaks, badges, and future AI machine scanning.',
      },
      {
        label: 'The Impact',
        text: 'The goal is to make fitness guidance easier, smarter, and beginner-friendly.',
      },
    ],
  },
  {
    title: 'Secure Vault Extension',
    category: 'Browser Extension',
    role: 'Extension Developer',
    shortDescription:
      'Encryption-based browser extension for safer personal credential and sensitive data storage.',
    impact:
      'Built as a personal security tool for safer and easier password management.',
    tech: ['JavaScript', 'Chrome Extension', 'Encryption', 'Security'],
    image: '/window.svg',
    featured: true,
    story: [
      {
        label: 'The Problem',
        text: 'I used to forget passwords but did not want to write them somewhere unsafe.',
      },
      {
        label: 'The Risk',
        text: 'Saving passwords openly can create privacy and security problems if someone sees them.',
      },
      {
        label: 'The Idea',
        text: 'I wanted a simple personal tool where I could store sensitive information more safely.',
      },
      {
        label: 'The Solution',
        text: 'I built an encryption-based browser extension for secure and convenient access.',
      },
      {
        label: 'The Impact',
        text: 'It helped me manage important credentials with more confidence.',
      },
    ],
  },
  {
    title: 'Travel and Tourism Management Website',
    category: 'Web Development',
    role: 'Web Developer',
    shortDescription:
      'A tourism management website for destination, package, and booking-related information.',
    impact:
      'Built to understand service-based web platforms and management workflows.',
    tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
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
      'Explores how AI can speed up creative marketing content production.',
    tech: ['Python', 'AI Workflow', 'Automation', 'Video Processing'],
    image: '/window.svg',
    featured: false,
  },
];
