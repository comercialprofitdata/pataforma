// ============================================================
// PataForma ERP — Service Worker v1.0
// Estratégia: Cache-First para assets estáticos,
//             Network-First para dados dinâmicos
// ============================================================

const CACHE_NAME = 'pataforma-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
];

// ── Install: pré-cacheia os assets essenciais ──────────────
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        }).then(() => self.skipWaiting())
    );
});

// ── Activate: limpa caches antigos ────────────────────────
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            );
        }).then(() => self.clients.claim())
    );
});

// ── Fetch: Cache-First para assets, pass-through para API ─
self.addEventListener('fetch', (event) => {
    // Ignora requests não-GET e chrome-extension
    if (event.request.method !== 'GET') return;
    if (!event.request.url.startsWith('http')) return;

    event.respondWith(
        caches.match(event.request).then((cached) => {
            if (cached) return cached;

            return fetch(event.request).then((response) => {
                // Só cacheia responses válidas de assets estáticos
                if (!response || response.status !== 200 || response.type === 'opaque') {
                    return response;
                }
                const isAsset = ASSETS_TO_CACHE.some(a =>
                    event.request.url.endsWith(a.replace('./', ''))
                );
                if (isAsset) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                }
                return response;
            }).catch(() => {
                // Fallback offline: retorna index.html do cache
                return caches.match('./index.html');
            });
        })
    );
});

// ── Push Notifications (base para futuras notificações) ───
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'PataForma';
    const options = {
        body: data.body || 'Você tem uma nova notificação.',
        icon: './icon-192.png',
        badge: './icon-192.png',
        tag: data.tag || 'pataforma-notif',
        data: { url: data.url || './' },
        vibrate: [200, 100, 200],
    };
    event.waitUntil(self.registration.showNotification(title, options));
});

// ── Notification Click ────────────────────────────────────
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data?.url || './')
    );
});
