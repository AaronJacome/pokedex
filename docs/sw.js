const CACHE_STATIC_NAME = 'static-v1'
const CACHE_DYNAMIC_NAME = 'dynamic-v1'
const CACHE_INMUTABLE_NAME = 'inmutable-v1'

var urlsToCacheStatic = [
    // '/',
    'runtime.26209474bfa8dc87a77c.js',
    'styles.1c31ac86b354a7056d66.css',
    'polyfills.8bbb231b43165d65d357.js',
    'main.40e5d6b2eb5ce3d46bc7.js',
    'index.html',
    'favicon.ico',
    'es2015-polyfills.b0657154bc33c6ff11ae.js',
    'js/app.js',
    'https://pokeapi.co/api/v2/pokemon',
    'flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.0509ab09c1b0d2200a41.woff2'
];

const CACHE_DYNAMIC_LIMIT = 50

self.addEventListener('install', e => {
    const cachePromise = caches.open(CACHE_STATIC_NAME)
        .then(cache => {
            return cache.addAll(urlsToCacheStatic)
        })

    const cacheInmutable = caches.open(CACHE_INMUTABLE_NAME)
        .then(cache => {
            return cache.addAll([

            ])
        })

    const promiseCache = Promise.all([cachePromise, cacheInmutable])

    e.waitUntil(promiseCache)
})

self.addEventListener('fetch', e => {
    console.log("URL: ", e.request.url)
    const promiseCache = caches.match(e.request)
        .then(response => {
            console.log("Response: ", response)
            if (response != undefined) {
                return caches.match(e.request)
            } else {
                return caches.open(CACHE_DYNAMIC_NAME)
                    .then(cache => {
                        fetch(e.request)
                            .then(response => {
                                console.log("guardando Url:", e.request.url)
                                cache.put(e.request, response)
                            })

                        if (navigator.onLine) {
                            return fetch(e.request)
                        } else {
                            return caches.match(e.request)
                        }

                    })
            }
        })

    e.respondWith(promiseCache)
})