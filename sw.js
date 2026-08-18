// ============================================================
// PataForma ERP — Service Worker v2.5
// Estratégia: Network-First (Sempre busca a versão mais recente da nuvem, com fallback para cache offline)
// ============================================================

const CACHE_NAME = 'pataforma-v2.5';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
];

// ── Install: ativa imediatamente a nova versão ──────────────
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// ── Activate: destrói todos os caches antigos imediatamente ──
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => {
                        console.log('🧹 Limpando cache antigo:', key);
                        return caches.delete(key);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

// ── Fetch: Network-First (Garante que mudanças apareçam na hora) ─
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    if (!event.request.url.startsWith('http')) return;

    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    const clone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, clone);
                    });
                }
                return networkResponse;
            })
            .catch(() => {
                // Fallback offline quando não houver internet
                return caches.match(event.request).then((cached) => {
                    if (cached) return cached;
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
