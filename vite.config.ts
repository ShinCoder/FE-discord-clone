import path from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '~shared': path.resolve(__dirname, './shared')
    }
  },
  server: {
    port: 4200
  },
  plugins: [react()]
});
