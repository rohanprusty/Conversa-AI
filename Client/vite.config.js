import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: 'https://conversa-ai-frontend.onrender.com/',
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        main: './index.html',
        widget: './src/widget.jsx'
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'widget') {
            return 'widget-bundle.js';
          }
          return 'assets/[name]-[hash].js';
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'widget-bundle.css';
          }
          return 'assets/[name]-[hash].[ext]';
        }
      }
    }
  }
})
