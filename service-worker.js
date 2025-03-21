const CACHE_NAME = "click-button-game-v1";
const urlsToCache = [
    "index.html",  // Updated from landing.html
    "game.html",   // Updated from index.html
    "manifest.json",
    "service-worker.js",
    "icons/icon-192x192.png",
    "icons/icon-512x512.png"
];

// Install Service Worker and cache all necessary files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch from cache first, then fallback to network
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Update cache when a new version is available
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
