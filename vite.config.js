import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({
  server: { host: '0.0.0.0', port: 5173, allowedHosts: true, cors: true, headers: { 'X-Frame-Options': 'ALLOWALL' } },
  preview: { host: '0.0.0.0', port: 4173, allowedHosts: true, cors: true },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['manifest.json', 'sw.js'],
      manifest: {
        name: 'LittleLearn — Eye-Safe Kindergarten Learning',
        short_name: 'LittleLearn',
        theme_color: '#FF8A65',
        background_color: '#FFF7ED',
        display: 'standalone',
        orientation: 'portrait-primary'
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        runtimeCaching: [
          { urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i, handler: 'CacheFirst', options: { cacheName: 'cdn-cache', expiration: { maxEntries: 20, maxAgeSeconds: 86400 } } }
        ]
      }
    })
  ]
})
