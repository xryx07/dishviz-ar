// Service Worker registration and utilities

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });
      
      console.log('[App] Service Worker registered:', registration.scope);
      
      // Once active, trigger USDZ caching on iOS
      if (registration.active) {
        triggerUSDZCache();
      }
      
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'activated') {
              triggerUSDZCache();
            }
          });
        }
      });
      
      return registration;
    } catch (error) {
      console.error('[App] Service Worker registration failed:', error);
    }
  }
};

// Trigger USDZ caching (useful for iOS)
export const triggerUSDZCache = () => {
  if (navigator.serviceWorker.controller) {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isIOS) {
      navigator.serviceWorker.controller.postMessage({ type: 'CACHE_USDZ' });
      console.log('[App] Triggered USDZ caching for iOS');
    }
  }
};

// Check if a model is cached
export const isModelCached = async (url: string): Promise<boolean> => {
  if ('caches' in window) {
    const cache = await caches.open('ar-menu-v1');
    const response = await cache.match(url);
    return !!response;
  }
  return false;
};

// Manually cache a specific model
export const cacheModel = async (url: string): Promise<void> => {
  if ('caches' in window) {
    try {
      const cache = await caches.open('ar-menu-v1');
      const response = await fetch(url, { mode: 'cors', credentials: 'omit' });
      if (response.ok) {
        await cache.put(url, response);
        console.log('[App] Manually cached:', url);
      }
    } catch (error) {
      console.error('[App] Failed to cache model:', error);
    }
  }
};
