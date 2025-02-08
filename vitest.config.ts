import path from 'path';
import { defineConfig } from 'vitest/config';
import viteTsConfigPath from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [viteTsConfigPath()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'tests/setup.ts'
  }
});
