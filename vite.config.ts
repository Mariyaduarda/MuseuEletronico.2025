import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import path from 'node:path'
// https://vite.dev/config/

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/MuseuEletronico.2025/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
    }
  },
  build: {
    outDir: 'dist',
    // Garante que os assets sejam referenciados corretamente
    assetsDir: 'assets',
    // Evita problemas com caracteres especiais nos nomes dos arquivos
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  // Para desenvolvimento local
  server: {
    port: 3000,
    open: true,
  },
});
