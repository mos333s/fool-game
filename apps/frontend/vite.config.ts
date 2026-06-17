import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/shared/ui/styles/index.scss" as *;`,
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/shared/config/tests/setup.ts'],
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
