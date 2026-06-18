// INCREMENT THIS VERSION (e.g., change v2 to v3) WHENEVER YOU CODE AN UPDATE!
const CACHE_NAME = 'fic-lookup-v2'; 

const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './manifest.json'
];

// 1. Force the new service worker to install and overwrite instantly
self.addEventListener('install', (e) => {
  self.skipWaiting(); 
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// 2. Clear out old cache folders from the phone automatically
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Clearing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim()) // Forces immediate control of all open pages
  );
});

// 3. Network-First Strategy: Try internet first, drop back to cache only if offline
self.addEventListener('fetch', (e) => {
  // Only handle standard GET HTTP requests
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) {
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then((response) => {
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(e.request);
      })
  );
});
