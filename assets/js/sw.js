importScripts('./workbox-sw.js');

workbox.routing.registerRoute(
    ({request}) => require.destination === 'image',
    new workbox.strategies.CacheFirst()
);