import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        // manifest.jsonの内容と同じものを記述
        "short_name": "YourAppName",
        "name": "Your App Name",
        "icons": [
          {
            "src": "/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ],
        "theme_color": "#ffffff",
        "background_color": "#ffffff",
        "display": "standalone",
        "start_url": "."
      },
      devOptions: {
        enabled: true // 開発時にもService Workerを有効にする
      }
    }) // ← 閉じ括弧を追加
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});