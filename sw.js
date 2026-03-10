self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => event.waitUntil(clients.claim()));
self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request));
});
