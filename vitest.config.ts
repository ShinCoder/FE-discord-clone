import path from 'path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '~shared': path.resolve(__dirname, './shared')
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'tests/setup.ts'
  }
});
