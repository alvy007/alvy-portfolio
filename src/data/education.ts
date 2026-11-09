export type EducationItem = {
  institution: string;
  qualification: string;
  period: string;
  location: string;
  result: string;
  detail?: string;
  primary?: boolean;
};

export const educationItems: EducationItem[] = [
  {
    institution: 'United International University (UIU)',
    qualification: 'B.Sc. in Computer Science & Engineering',
    period: '2022 – Oct 2026',
    location: 'Dhaka, Bangladesh',
    result: 'CGPA 3.22 / 4.00',
    detail: 'Final Year Design Project: AI Robotic Waste Management System',
    primary: true,
  },
  {
    institution: 'Dhaka Imperial College',
    qualification: 'Higher Secondary Certificate · Science',
    period: '2020',
    location: 'Dhaka, Bangladesh',
    result: 'GPA 5.00 / 5.00',
  },
  {
    institution: 'National Ideal School',
    qualification: 'Secondary School Certificate · Science',
    period: '2018',
    location: 'Dhaka, Bangladesh',
    result: 'GPA 5.00 / 5.00',
  },
];
