const CACHE_NAME = 'ar-menu-v1';
const STORAGE_URL = 'https://boccbckwqkmtmmtsqybv.supabase.co/storage/v1/object/public/models';

// Assets to cache immediately
const PRECACHE_ASSETS = [
  '/',
  '/models/pasta_dish.glb',
  '/models/falafel_dish.glb',
  '/models/manchurian_dish.glb',
  '/models/noodles_dish.glb',
];

// USDZ models to cache on first request
const USDZ_MODELS = [
  `${STORAGE_URL}/pasta%2Bdish%2B3d%2Bmodel.usdz`,
  `${STORAGE_URL}/falafel%2Bballs%2B3d%2Bmodel.usdz`,
  `${STORAGE_URL}/braised%2Bpork%2B3d%2Bmodel.usdz`,
  `${STORAGE_URL}/stir-fried%2Bnoodles%2B3d%2Bmodel.usdz`,
];

// Install event - precache GLB models
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Precaching GLB models');
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  // Take control immediately
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  // Handle GLB models - cache first
  if (url.endsWith('.glb')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          console.log('[SW] Serving GLB from cache:', url);
          return cachedResponse;
        }
        return fetch(event.request).then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        });
      })
    );
    return;
  }
  
  // Handle USDZ models - cache first with network fallback
  if (url.endsWith('.usdz') || url.includes('supabase') && url.includes('models')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          console.log('[SW] Serving USDZ from cache:', url);
          return cachedResponse;
        }
        return fetch(event.request, { 
          mode: 'cors',
          credentials: 'omit'
        }).then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
              console.log('[SW] Cached USDZ:', url);
            });
          }
          return response;
        });
      })
    );
    return;
  }
  
  // Handle images - cache first
  if (url.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        });
      })
    );
    return;
  }
  
  // Default: network first, cache fallback
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful GET requests
        if (response.ok && event.request.method === 'GET') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

// Listen for messages to manually cache USDZ
self.addEventListener('message', (event) => {
  if (event.data.type === 'CACHE_USDZ') {
    caches.open(CACHE_NAME).then((cache) => {
      USDZ_MODELS.forEach((url) => {
        fetch(url, { mode: 'cors', credentials: 'omit' })
          .then((response) => {
            if (response.ok) {
              cache.put(url, response);
              console.log('[SW] Manually cached USDZ:', url);
            }
          })
          .catch(() => {});
      });
    });
  }
});
