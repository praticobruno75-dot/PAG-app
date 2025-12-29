const CACHE_NAME = 'pag-v1';
const PDF_CACHE = 'pag-pdf-v1';

// File da cachare immediatamente all'installazione
const CORE_ASSETS = [
  './',
  './index.html',
  './utente.html',
  './consulente.html',
  './manifest.json',
  './icons/icon-512.png'
];

// PDF da cachare on-demand
const PDF_FILES = [
  './pdf/ATTACCO.pdf',
  './pdf/ATTIVAZIONE.pdf',
  './pdf/BOCCONE.pdf',
  './pdf/FEMMINA.pdf',
  './pdf/FEMMINA_DX.pdf',
  './pdf/FEMMINA_SX.pdf',
  './pdf/GRATIFICAZIONE.pdf',
  './pdf/IDENTIFICAZIONE.pdf',
  './pdf/INIBIZIONE.pdf',
  './pdf/INTERAZIONE_GENERE.pdf',
  './pdf/MASCHIO.pdf',
  './pdf/MASCHIO_DX.pdf',
  './pdf/MASCHIO_SX.pdf',
  './pdf/PROTEZIONE.pdf',
  './pdf/SOCIALITA_.pdf',
  './pdf/SPAZIALITA_.pdf'
];

// Installazione SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching core assets');
      return cache.addAll(CORE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Attivazione SW
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== PDF_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Strategia di fetch
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo richieste same-origin
  if (url.origin !== location.origin) return;

  // PDF: Cache First (scarica una volta, usa sempre)
  if (request.url.includes('/pdf/')) {
    event.respondWith(
      caches.open(PDF_CACHE).then((cache) => {
        return cache.match(request).then((response) => {
          if (response) {
            console.log('[SW] PDF from cache:', request.url);
            return response;
          }
          console.log('[SW] Fetching PDF:', request.url);
          return fetch(request).then((networkResponse) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // HTML/Assets: Network First, fallback su cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseClone);
        });
        return response;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});
