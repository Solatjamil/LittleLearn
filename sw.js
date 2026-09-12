// LittleLearn — Offline-first Service Worker
// Caches core assets for 100% offline functionality (no post-install downloads required)
const CACHE = 'littlelearn-v1';
const CORE = [
  './',
  './index.html',
  './manifest.json'
  // All other assets are bundled inline in index.html for instant offline
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(CORE)).then(()=> self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=> self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  // Network-first for jsPDF CDN, cache-first for everything else (offline-first)
  if(req.url.includes('jspdf') || req.url.includes('cdn.jsdelivr')){
    e.respondWith(fetch(req).catch(()=> caches.match(req)));
    return;
  }
  e.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res=>{
      // Cache GETs
      if(req.method==='GET' && res.ok){
        const copy = res.clone();
        caches.open(CACHE).then(c=> c.put(req, copy));
      }
      return res;
    }).catch(()=> {
      // Offline fallback: serve index for navigations
      if(req.mode==='navigate') return caches.match('./index.html');
    }))
  );
});
