import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

const siteUrl = 'https://alvyrahman-ar.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'Alvy Rahman Masum | Software Developer Portfolio',
    template: '%s | Alvy Rahman Masum',
  },

  description:
    'Official portfolio of Alvy Rahman Masum, a software developer and CSE student building full-stack applications, AI and robotics systems, IoT solutions, computer vision projects, and cybersecurity research.',

  applicationName: 'Alvy Rahman Masum Portfolio',

  keywords: [
    'Alvy Rahman Masum',
    'Alvy Rahman',
    'Alvy',
    'Alvy Rahman Masum portfolio',
    'Alvy Rahman portfolio',
    'Alvy software developer',
    'Software Developer Bangladesh',
    'Full Stack Developer Bangladesh',
    'Next.js Developer',
    'React Developer',
    'AI Robotics Developer',
    'IoT Developer',
    'Computer Vision Developer',
    'Cybersecurity Researcher',
    'United International University CSE',
    'UIU Shuttle Tracking App',
    'LoRa Campus Shuttle Tracker',
    'Micro Mouse Robot',
    'FitBondhu Fitness App',
  ],

  authors: [
    {
      name: 'Alvy Rahman Masum',
      url: siteUrl,
    },
  ],

  creator: 'Alvy Rahman Masum',
  publisher: 'Alvy Rahman Masum',
  category: 'Technology',

  verification: {
    google: 'CCiK3Ws-2CrcJZaizsjKFWLm7Q2rv-uSgc2PqouJMBE',
  },

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Alvy Rahman Masum Portfolio',
    title: 'Alvy Rahman Masum | Software Developer Portfolio',
    description:
      'Explore the software development, AI robotics, IoT, computer vision, cybersecurity, research, and engineering projects of Alvy Rahman Masum.',
    images: [
      {
        url: '/images/profile/alvy.jpg',
        alt: 'Alvy Rahman Masum, Software Developer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Alvy Rahman Masum | Software Developer Portfolio',
    description:
      'Software development, AI robotics, IoT, computer vision, cybersecurity, and research portfolio of Alvy Rahman Masum.',
    images: ['/images/profile/alvy.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: 'Alvy Rahman Masum',
    alternateName: ['Alvy Rahman', 'Alvy'],
    url: siteUrl,
    mainEntityOfPage: siteUrl,
    image: `${siteUrl}/images/profile/alvy.jpg`,
    email: 'mailto:contact.alvybro@gmail.com',
    jobTitle: 'Software Developer',
    description:
      'Software developer and CSE student focused on full-stack development, AI robotics, IoT systems, computer vision, cybersecurity, and practical technology projects.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dhaka',
      addressCountry: 'Bangladesh',
    },
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: 'United International University',
      url: 'https://www.uiu.ac.bd/',
    },
    knowsAbout: [
      'Software Development',
      'Full-Stack Development',
      'Next.js',
      'React',
      'React Native',
      'Node.js',
      'PHP',
      'Python',
      'Artificial Intelligence',
      'Robotics',
      'Computer Vision',
      'Internet of Things',
      'LoRa Communication',
      'Embedded Systems',
      'Cybersecurity',
      'Ransomware Detection',
    ],
    sameAs: [
      'https://github.com/alvy007',
      'https://www.linkedin.com/in/alvy-rahman-masum-7931482a1/',
      'https://leetcode.com/u/alvy_007/',
    ],
  };

  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: 'Alvy Rahman Masum Portfolio',
    alternateName: 'Alvy Rahman Portfolio',
    url: siteUrl,
    description:
      'The official software developer portfolio of Alvy Rahman Masum.',
    author: {
      '@id': `${siteUrl}/#person`,
    },
    inLanguage: 'en',
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [personStructuredData, websiteStructuredData],
  };

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />

        {children}
      </body>
    </html>
  );
}
