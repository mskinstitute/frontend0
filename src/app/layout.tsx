import type { Metadata, Viewport } from 'next';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import PwaRegister from '@/components/PwaRegister';
import InstallAppModal from '@/components/InstallAppModal';
import { PwaProvider } from '@/context/PwaContext';
import Analytics from '@/components/Analytics';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#0A2540',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: "MSK Institute | Shikohabad's Leading Coding & Computer Training Academy",
  applicationName: 'MSK Institute',
  description: 'Learn Python programming, Full-Stack Web Development, CCC, and MS Office with practical, offline lab training at MSK Institute in Shikohabad. Verified graduation certificates.',
  keywords: ['MSK Institute', 'Computer Center Shikohabad', 'Coding Classes Shikohabad', 'Python Training', 'Web Development Shikohabad', 'NIELIT CCC Course'],
  metadataBase: new URL('https://mskinstitute.in'),
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MSK Institute',
  },
  formatDetection: {
    telephone: true,
  },
  icons: {
    icon: [
      { url: '/brand/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/brand/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/brand/android-icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/brand/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'apple-touch-icon', sizes: '180x180', url: '/brand/apple-icon-180x180.png' },
      { rel: 'mask-icon', url: '/brand/maskable-icon-512x512.png', color: '#0A2540' },
    ],
  },
  openGraph: {
    title: 'MSK Institute | Computer Training & Coding Academy',
    description: 'Learn Python, Web Development, CCC, and MS Office with practical labs at MSK Institute, Shikohabad.',
    url: 'https://mskinstitute.in',
    siteName: 'MSK Institute',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MSK Institute | Computer Training & Coding Academy',
    description: 'Learn Python, Web Development, CCC, and MS Office with practical labs at MSK Institute, Shikohabad.',
  },
  other: {
    'msapplication-TileColor': '#0A2540',
    'msapplication-TileImage': '/brand/ms-icon-144x144.png',
    'msapplication-config': '/browserconfig.xml',
    'mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'MSK Institute',
              alternateName: 'MSK Computer Training & Coding Academy',
              url: 'https://mskinstitute.in',
              logo: 'https://mskinstitute.in/logo.jpg',
              description: "Shikohabad's Leading Coding & Computer Training Academy",
              telephone: '+918393042166',
              email: 'mskshikohabad@gmail.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Gali No. 3, Near Gyan Jyoti Public School',
                addressLocality: 'Shikohabad',
                addressRegion: 'Uttar Pradesh',
                postalCode: '283135',
                addressCountry: 'IN',
              },
              sameAs: [
                'https://www.facebook.com/mskinstitute',
                'https://www.instagram.com/mskinstitute',
                'https://maps.google.com/?q=MSK+Institute+Shikohabad'
              ],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.deferredPrompt = null;
              window.addEventListener('beforeinstallprompt', function(e) {
                e.preventDefault();
                window.deferredPrompt = e;
                window.dispatchEvent(new CustomEvent('pwa-prompt-ready'));
              });
              if ('serviceWorker' in navigator) {
                var registerSW = function() {
                  navigator.serviceWorker.register('/sw.js', { scope: '/' })
                    .catch(function(err) {
                      console.warn('Early SW registration fail', err);
                    });
                };
                if (document.readyState === 'complete' || document.readyState === 'interactive') {
                  registerSW();
                } else {
                  window.addEventListener('DOMContentLoaded', registerSW);
                  window.addEventListener('load', registerSW);
                }
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-text-main antialiased selection:bg-secondary selection:text-white">
        <PwaProvider>
          <Analytics />
          <PwaRegister />
          <InstallAppModal />
          <Navbar />
          <main className="flex-grow pb-16 md:pb-0">
            {children}
          </main>
          <Footer />
          <MobileBottomNav />
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        </PwaProvider>
      </body>
    </html>
  );
}
