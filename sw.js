const CACHE_NAME = "ayomad-v0.1";
const CACHE_URLS = [
	// "assets/css/main.css",

	// "assets/fonts/LPMQ.ttf",
	// "assets/fonts/OverpassMono-Regular.ttf",

	// "assets/img/fs-in.svg",
	// "assets/img/fs-out.svg",
	// "assets/img/icon.ico",
	// "assets/img/icon_192.png",
	// "assets/img/icon_512.png",
	// "assets/img/menu.svg",

	// "assets/js/main.js",

	// "index.html",
	// "manifest.json",
]

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
			return cache.addAll(CACHE_URLS);
		})
	);
});

self.addEventListener("activate", function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheName) {
			return Promise.all(
				cacheName.map(function(cacheName) {
					if (cacheName !== CACHE_NAME) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches
			.match(event.request, { cacheName: CACHE_NAME })
			.then(function(response) {
				if (response) {
					return response;
				}
				return fetch(event.request);
			})
	);
});