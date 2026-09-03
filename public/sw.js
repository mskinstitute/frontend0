// public/sw.js - MSK Institute Progressive Web App Service Worker
const CACHE_VERSION = 'v-1.7.0';
const CACHE_NAME = `msk-institute-${CACHE_VERSION}`;

const urlsToCache = [
  '/',
  '/courses',
  '/live',
  '/live-batches',
  '/study-material',
  '/blogs',
  '/verify-certificate',
  '/offline.html',
  '/manifest.json',
  '/logo.jpg',
  '/brand/icon-192x192.png',
  '/brand/icon-512x512.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install event: cache assets & activate immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch((err) => {
        console.warn('Pre-caching assets notice:', err);
      });
    })
  );
});

// Activate event: clean up old caches and claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
     .then(() => {
       return self.clients.matchAll({ type: 'window' }).then((clients) => {
         clients.forEach((client) => {
           client.postMessage({ type: 'NEW_VERSION' });
         });
       });
     })
  );
});

// Fetch event: serve from cache, fallback to network, then to offline.html
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (!url.protocol.startsWith('http')) return;
  if (url.pathname.includes('/_next/webpack-hmr')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          // Check for valid response
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== 'basic'
          ) {
            return networkResponse;
          }

          // Clone and store in cache
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });

          return networkResponse;
        })
        .catch(() => {
          // Serve offline fallback for HTML pages
          if (event.request.destination === 'document' || event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
        });
    })
  );
});

// Listen for skipWaiting message from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
