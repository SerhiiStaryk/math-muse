import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  base: '/math-muse/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      includeAssets: ['logo-512.png', 'logo-192.png'],
      manifest: {
        id: 'math-muse-pwa',
        name: 'Math muse - Number Game for Kids',
        short_name: 'Math muse',
        description: 'An engaging number game designed to make learning math fun for kids.',
        start_url: '/math-muse/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1976d2',
        icons: [
          {
            src: 'logo-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'logo-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: 'screenshot-mobile.png',
            sizes: '1170x2080',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Main game screen',
          },
          {
            src: 'screenshot-desktop.png',
            sizes: '1171x1892',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Desktop game screen',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              request.destination === 'document' || // HTML
              request.destination === 'script' || // JS
              request.destination === 'style', // CSS
            handler: 'NetworkFirst',
            options: {
              networkTimeoutSeconds: 3,
              cacheName: 'app-cache',
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
