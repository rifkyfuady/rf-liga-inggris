import "regenerator-runtime";
import {skipWaiting, clientsClaim} from 'workbox-core';
import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate, CacheFirst} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';
import {precacheAndRoute} from 'workbox-precaching';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';

skipWaiting();
clientsClaim();

registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    new CacheFirst({
        cacheName: 'football-img',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                purgeOnQuotaError: true,
            }),
            new CacheableResponsePlugin({
                statuses: [0, 200],
            })
        ],
    })
);
registerRoute(
    /^https:\/\/api\.football\-data\.org\/v2/,
    new StaleWhileRevalidate({
        cacheName: "football-api",
    })
);
registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
    })
);

registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

registerRoute(
  /^https:\/\/upload\.wikimedia\.org\/wikipedia/,
  new CacheFirst({
    cacheName: 'wikipedia-svg',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Pesan push default tidak ada payload';
  }
  const options = {
    body: body,
    icon: './images/icon-128.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'open-action',
        title: 'Lihat',
      },
      {
        action: 'close-action',
        title: 'Tutup',
      }
    ]
  };
  event.waitUntil(
    self.registration.showNotification('Liga Inggris RF', options)
  );
});

self.addEventListener('notificationclick', function(e) {
  const notification = e.notification;
  const action = e.action;

  if (action === 'close-action') {
    notification.close();
  } else {
    clients.openWindow('https://rifkyfuady.github.io/');
    notification.close();
  }
});

precacheAndRoute(self.__WB_MANIFEST);