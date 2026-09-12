module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['**/*.{html,js,css,png,svg,json}'],
  swDest: 'dist/sw.js',
  runtimeCaching: [{ urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i, handler: 'CacheFirst' }]
};
