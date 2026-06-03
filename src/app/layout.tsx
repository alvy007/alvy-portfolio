import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
});

export const metadata: Metadata = {
  title: 'Alvy Rahman Masum | Developer Portfolio',
  description:
    'Interactive portfolio of Alvy Rahman Masum, a CSE student, full-stack developer, AI robotics enthusiast, IoT builder, and cybersecurity researcher.',
  keywords: [
    'Alvy Rahman Masum',
    'Software Developer',
    'Full Stack Developer',
    'AI Robotics',
    'IoT',
    'Computer Vision',
    'Cybersecurity',
    'Portfolio',
  ],
  authors: [{ name: 'Alvy Rahman Masum' }],
  creator: 'Alvy Rahman Masum',
  openGraph: {
    title: 'Alvy Rahman Masum | Developer Portfolio',
    description:
      'Software, IoT, robotics, cybersecurity, and research-focused portfolio.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
