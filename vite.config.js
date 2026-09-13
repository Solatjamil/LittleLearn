import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({
  server: { host: '0.0.0.0', port: 5173, allowedHosts: true, cors: true, headers: { 'X-Frame-Options': 'ALLOWALL' } },
  preview: { host: '0.0.0.0', port: 4173, allowedHosts: true, cors: true },
  build: {
    target: 'es2018',
    cssMinify: true,
    minify: 'esbuild',
    reportCompressedSize: true
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.svg','icons/icon-512.svg','robots.txt','sitemap.xml'],
      manifest: {
        name: 'LittleLearn — Eye-Safe Kindergarten Learning',
        short_name: 'LittleLearn',
        description: 'Offline-first kindergarten learning for ages 3-6 — 7357 activities, 24 worlds, eye protection by default (warm filter, 20-20-20, 30-min cap), printables on-device.',
        start_url: '/',
        scope: '/',
        id: '/',
        display: 'standalone',
        display_override: ['standalone','window-controls-overlay'],
        orientation: 'portrait-primary',
        lang: 'en',
        dir: 'ltr',
        categories: ['education','kids','family'],
        theme_color: '#FF8A65',
        background_color: '#FFF7ED',
        icons: [
          { src: '/icons/icon-192.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any maskable' },
          { src: '/icons/icon-512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any maskable' },
          { src: '/icons/icon-512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any' }
        ],
        shortcuts: [
          { name: 'Continue Learning', short_name: 'Learn', url: '/', description: 'Back to Child Hub', icons: [{ src: '/icons/icon-192.svg', sizes: '192x192' }] },
          { name: 'Parent Dashboard', short_name: 'Parents', url: '/#parent', description: 'Usage, printables, eye-care settings', icons: [{ src: '/icons/icon-192.svg', sizes: '192x192' }] },
          { name: 'Printables', short_name: 'Print', url: '/#parent', description: 'Local PDF printables', icons: [{ src: '/icons/icon-192.svg', sizes: '192x192' }] }
        ],
        screenshots: [],
        prefer_related_applications: false
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,json}'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          { urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i, handler: 'CacheFirst', options: { cacheName: 'google-fonts-webfonts', expiration: { maxEntries: 20, maxAgeSeconds: 365*86400 } } },
          { urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i, handler: 'CacheFirst', options: { cacheName: 'google-fonts-stylesheets', expiration: { maxEntries: 10, maxAgeSeconds: 86400 } } },
          { urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i, handler: 'CacheFirst', options: { cacheName: 'cdn-cache', expiration: { maxEntries: 20, maxAgeSeconds: 86400 } } }
        ]
      },
      devOptions: { enabled: false, navigateFallback: 'index.html', suppressWarnings: true }
    })
  ]
})
