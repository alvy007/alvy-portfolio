export type ResearchItem = {
  title: string;
  status: string;
  field: string;
  description: string;
  tags: string[];
  pdf?: string;
  image?: string;
  active?: boolean;
};

export const researchItems: ResearchItem[] = [
  {
    title: 'Human-AI Reliance & Trust in Generative AI',
    status: '2026 · Ongoing',
    field: 'Human-Computer Interaction · Generative AI · Mixed-Method Research',
    description:
      'Investigating how confidence indicators, verified citations, and uncertainty warnings influence reliance on Generative AI among Bangladeshi users through a multi-condition mixed-method study.',
    tags: [
      'Human-Computer Interaction',
      'Generative AI',
      'Trust',
      'Mixed Methods',
      'User Research',
    ],
    active: true,
  },
  {
    title: 'AI Robotic Waste Management System',
    status: 'Final Year Design Project · 2025–2026',
    field: 'Computer Vision · YOLOv8n · 6-DOF Robotics',
    description:
      'A six-class computer-vision waste detection and robotic sorting system. The YOLOv8n baseline achieved 0.666 mAP50, 0.539 mAP50-95, and 3.85 ms/image test inference, with real-time inference integrated into automated 6-DOF sorting.',
    tags: [
      'YOLOv8n',
      'OpenCV',
      'Python',
      '6-DOF Robotics',
      'Computer Vision',
    ],
    active: false,
  },
  {
    title:
      'GreenFed-WasteNet: Carbon-Aware Federated Baselines for Imbalanced Multi-Class Waste Classification',
    status: 'Submitted for Double-Blind Review',
    field:
      'Federated Learning · Green AI · Computer Vision · Sustainable Computing',
    description:
      'A carbon-aware waste-classification framework evaluating predictive performance, class imbalance, open-set uncertainty, federated learning, inference efficiency, and estimated environmental cost across an eight-class dataset of 65,669 images.',
    tags: [
      'Federated Learning',
      'Green AI',
      'EfficientNet-B0',
      'MobileNetV3',
      'Open-Set Recognition',
      'Carbon-Aware Computing',
    ],
    pdf: '/research/greenfed-wastenet.pdf',
    image: '/images/research/greenfed-wastenet-cover.png',
    active: false,
  },
  {
    title:
      'X-FIBF: Explainable File Integrity Behavioral Fingerprinting and Temporal API-Call Learning for Ransomware Detection',
    status: 'Research Manuscript · 2024–2025',
    field:
      'Cybersecurity · Explainable AI · Temporal Deep Learning · Ransomware Detection',
    description:
      'A hybrid ransomware-detection framework combining static PE analysis, temporal API-call learning with MHSA-BiLSTM, attention-based explainability, and safe file-integrity behavioral fingerprinting. The temporal classifier achieved 98.28% accuracy and 99.22% ROC-AUC.',
    tags: [
      'Ransomware Detection',
      'MHSA-BiLSTM',
      'Explainable AI',
      'API-Call Sequences',
      'FIBF',
      'File Integrity Monitoring',
    ],
    pdf: '/research/x-fibf-ransomware-detection.pdf',
    image: '/images/research/x-fibf-cover.png',
    active: false,
  },
];
