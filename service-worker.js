const CACHE_NAME = 'silveos';
const URLS_TO_CACHE = [
    "offline.html",
    "css/bootstrap.min.css",
    "css/cover.css",
    "image/wallpaper.jpg"
];
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(URLS_TO_CACHE);
        })
    );
});
self.addEventListener("fetch", function (event) {
    event.respondWith(
        fetch(event.request).catch(function () {
            return caches.match(event.request).then(function (response) {
                if (response) {
                    return response;
                } else if (event.request.headers.get("accept").includes("text/html")) {
                    return caches.match("offline.html");
                }
            });
        })
    );
});