// Service Worker registration

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });
      
      console.log('[App] Service Worker registered');
      return registration;
    } catch (error) {
      console.error('[App] Service Worker registration failed:', error);
    }
  }
};
