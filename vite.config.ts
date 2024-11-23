import { defineConfig, coverageConfigDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tsconfigPaths(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [ 'legacy-js-api' ],
      },
    },
  },
  test: {
    globals: true,
    css: true,
    environment: 'jsdom',
    setupFiles: './test/tests-setup.ts',
    coverage: {
      reporter: [ 'text', 'json', 'html' ],
      exclude: [
        ...coverageConfigDefaults.exclude,
        'src/App.tsx',
        'src/main.tsx',
        'src/app/*/index.ts',
        'src/app/containers/*',
        'src/app/ui/layouts/*',
      ]
    },
  },
});
