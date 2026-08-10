export type ResearchItem = {
  title: string;
  status: string;
  field: string;
  description: string;
  tags: string[];
  pdf?: string;
  image?: string;
};

export const researchItems: ResearchItem[] = [
  {
    title: 'Waste Detection and Classification Using 6DOF Robotic Hand',
    status: 'Final Year Project / Ongoing Research',
    field: 'AI Robotics · Computer Vision · Sustainable Automation',
    description:
      'A research-focused system for detecting and classifying household waste using computer vision and a 6DOF robotic hand for automated sorting.',
    tags: ['OpenCV', 'Robotics', '6DOF Arm', 'Waste Classification'],
  },

  {
    title: 'Malware Detection via File Integrity Monitoring',
    status: 'Research Member',
    field: 'Cybersecurity · Machine Learning · Threat Detection',
    description:
      'A hybrid malware and ransomware detection approach using file integrity monitoring, cryptographic fingerprints, and behaviour-focused detection logic.',
    tags: ['Cybersecurity', 'SHA-256', 'FIM', 'Ransomware Detection'],
  },

  {
    title:
      'Intelligent Classification of Concealed Household Waste in Polybags Using Computer Vision and Federated Learning',
    status: 'Under Preparation',
    field:
      'Computer Vision · Federated Learning · Sustainable Waste Management',
    description:
      'An ongoing research work focused on privacy-aware classification of concealed household waste inside polybags using computer vision and federated learning.',
    tags: ['Federated Learning', 'Computer Vision', 'Sustainable AI'],
  },

  {
    title:
      'GreenFed-WasteNet: Carbon-Aware Federated Baselines for Imbalanced Multi-Class Waste Classification',
    status: 'Submitted for Double-Blind Review',
    field:
      'Federated Learning · Green AI · Computer Vision · Sustainable Computing',
    description:
      'A carbon-aware waste-classification framework that jointly evaluates predictive performance, class imbalance, open-set uncertainty, federated learning, inference efficiency, and estimated environmental cost across an eight-class dataset of 65,669 images.',
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
  },

  {
    title:
      'X-FIBF: Explainable File Integrity Behavioral Fingerprinting and Temporal API-Call Learning for Ransomware Detection',
    status: 'Research Manuscript',
    field:
      'Cybersecurity · Explainable AI · Temporal Deep Learning · Ransomware Detection',
    description:
      'An explainable hybrid ransomware-detection framework combining static PE analysis, temporal API-call learning with MHSA-BiLSTM, attention-based explainability, and safe file-integrity behavioral fingerprinting validated through controlled host and virtual-machine simulations.',
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
  },
];
