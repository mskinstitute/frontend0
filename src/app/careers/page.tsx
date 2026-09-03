import { Metadata } from 'next';
import { fetchCareers } from '@/services/api';
import CareersClient from '@/components/CareersClient';

export const revalidate = 1800; // Revalidate every 30 minutes

export const metadata: Metadata = {
  title: 'Careers, Internships & Jobs | MSK Institute Shikohabad',
  description: 'Explore live software development internships, full-time engineering jobs, and tech roles at MSK Institute and partner companies. Gain verified industry experience in Python, React, and Full-Stack development.',
  keywords: [
    'MSK Institute Careers',
    'Computer Internships Shikohabad',
    'Python Developer Internship',
    'Frontend Developer Jobs Shikohabad',
    'Web Development Internships UP',
    'Software Jobs Firozabad',
    'Coding Apprenticeship Shikohabad',
    'MSK Institute Jobs',
    'IT Placements Shikohabad'
  ],
  alternates: {
    canonical: 'https://mskinstitute.in/careers',
  },
  openGraph: {
    title: 'Careers, Internships & Jobs | MSK Institute Shikohabad',
    description: 'Explore live tech internships and jobs at MSK Institute and partner companies. Freshers and students welcome.',
    url: 'https://mskinstitute.in/careers',
    siteName: 'MSK Institute',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://mskinstitute.in/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'MSK Institute Careers and Internships',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers, Internships & Jobs | MSK Institute',
    description: 'Explore verified internships and software jobs at MSK Institute & partners.',
    images: ['https://mskinstitute.in/logo.jpg'],
  },
};

export default async function CareersPage() {
  const careers = await fetchCareers();
  const activeCareers = careers.filter((c) => c.active !== false);

  // Structured Data Schema for Google Jobs
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'MSK Institute Tech Careers & Internships',
    description: 'Active internship and full-time job openings at MSK Institute and partner organizations.',
    itemListElement: activeCareers.map((c, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'JobPosting',
        title: c.title,
        description: c.description,
        datePosted: c.postedAt,
        validThrough: c.deadline || '2026-12-31',
        employmentType: c.type === 'internship' ? 'INTERN' : 'FULL_TIME',
        hiringOrganization: {
          '@type': 'Organization',
          name: c.company || 'MSK Institute of Technology',
          sameAs: 'https://mskinstitute.in',
          logo: 'https://mskinstitute.in/logo.jpg',
        },
        jobLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Gali No. 3, Near Gyan Jyoti Public School',
            addressLocality: 'Shikohabad',
            addressRegion: 'Uttar Pradesh',
            postalCode: '283135',
            addressCountry: 'IN',
          },
        },
        baseSalary: {
          '@type': 'MonetaryAmount',
          currency: 'INR',
          value: {
            '@type': 'QuantitativeValue',
            value: c.stipendOrSalary,
            unitText: c.type === 'internship' ? 'MONTH' : 'YEAR',
          },
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CareersClient initialCareers={activeCareers} />
    </>
  );
}
