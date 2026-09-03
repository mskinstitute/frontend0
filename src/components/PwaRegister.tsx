'use client';

import { useEffect } from 'react';

export default function PwaRegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            // Check for updates
            registration.onupdatefound = () => {
              const installingWorker = registration.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    console.log('New content available for MSK Institute PWA. Auto-updating...');
                    installingWorker.postMessage({ type: 'SKIP_WAITING' });
                  }
                };
              }
            };
          })
          .catch((error) => {
            console.warn('MSK Institute SW registration failed:', error);
          });
      });
    }
  }, []);

  return null;
}
