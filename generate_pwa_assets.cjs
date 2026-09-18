const fs = require('fs');

// 1. Create Web App Manifest
const manifest = {
  "name": "شدات ببجي مجاناً - PUBG UC Rewards",
  "short_name": "شدات ببجي",
  "description": "تطبيق شحن شدات ببجي موبايل مجاناً عبر دعوة الأصدقاء واستلام أكواد Midasbuy الرسمية",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#020617",
  "theme_color": "#f59e0b",
  "orientation": "portrait-primary",
  "lang": "ar",
  "dir": "rtl",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
};

fs.writeFileSync('public/manifest.json', JSON.stringify(manifest, null, 2));

// 2. Service Worker for PWA
const swContent = `const CACHE_NAME = 'pubg-uc-rewards-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
`;

fs.writeFileSync('public/sw.js', swContent);

// 3. Create SVG Icon
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#ea580c;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#7c2d12;stop-opacity:1" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:#fbbf24;stop-opacity:0.4" />
      <stop offset="100%" style="stop-color:#020617;stop-opacity:0" />
    </radialGradient>
  </defs>
  
  <!-- Background Rect with curved corners -->
  <rect width="512" height="512" rx="110" fill="#090d16" />
  <rect width="504" height="504" x="4" y="4" rx="106" fill="none" stroke="#f59e0b" stroke-width="8" stroke-opacity="0.5" />
  
  <!-- Glow Circle -->
  <circle cx="256" cy="240" r="190" fill="url(#glow)" />
  
  <!-- PUBG Airdrop Box / Helmet / UC Coin Motif -->
  <!-- Coin Base -->
  <circle cx="256" cy="225" r="140" fill="url(#grad1)" stroke="#fef3c7" stroke-width="8" />
  <circle cx="256" cy="225" r="115" fill="none" stroke="#78350f" stroke-width="5" stroke-dasharray="8 6" />
  
  <!-- "UC" Large Text -->
  <text x="256" y="255" font-family="Arial, sans-serif" font-weight="900" font-size="95" fill="#ffffff" text-anchor="middle" letter-spacing="4">UC</text>
  
  <!-- Lightning / Sparkles -->
  <path d="M 230 110 L 275 110 L 250 165 L 290 165 L 235 240 L 250 185 L 220 185 Z" fill="#ffffff" />
  
  <!-- Bottom Ribbon text: PUBG REWARDS -->
  <rect x="76" y="380" width="360" height="75" rx="24" fill="#0f172a" stroke="#f59e0b" stroke-width="4" />
  <text x="256" y="430" font-family="'Cairo', Arial, sans-serif" font-weight="900" font-size="34" fill="#fbbf24" text-anchor="middle">شدات ببجي</text>
</svg>`;

fs.writeFileSync('public/icon.svg', svgIcon);

// Also create HTML-compatible data URI fallback if PNG not needed, but we can write a simple SVG as icon
console.log('✅ PWA Manifest and Service Worker created successfully!');
