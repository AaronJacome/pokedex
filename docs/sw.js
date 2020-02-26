const CACHE_STATIC_NAME = 'static-v1'
const CACHE_DYNAMIC_NAME = 'dynamic-v1'
const CACHE_INMUTABLE_NAME = 'inmutable-v1'

var urlsToCacheStatic = [
    '/',
    '/runtime.26209474bfa8dc87a77c.js',
    '/styles.1c31ac86b354a7056d66.css',
    '/polyfills.8bbb231b43165d65d357.js',
    '/main.40e5d6b2eb5ce3d46bc7.js',
    '/index.html',
    'favicon.ico',
    '/es2015-polyfills.b0657154bc33c6ff11ae.js',
    '/js/app.js',
    'https://pokeapi.co/api/v2/pokemon'
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
    // 4 - Cache with Network update
    // Rendimiento es critico
    // Actualización Siempre estarán un paso atras

    const promiseCache = caches.open(CACHE_STATIC_NAME)
        .then(cache => {
            try {
                fetch(e.request)
                    .then(response => {
                        cache.put(e.request, response)
                    })

                return cache.match(e.request)
            }catch{
                if(/\.(png|jpg|svg)$/i.test(e.request.url)){
                    resolve(caches.match('/img/not-found.png'))
                }
            }

        })

    e.respondWith(promiseCache)


})