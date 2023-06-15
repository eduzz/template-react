import { cpus } from 'os';
import path from 'path';

import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: { open: true },
  build: {
    sourcemap: true,
    rollupOptions: {
      maxParallelFileOps: Math.max(1, cpus().length - 1),
      output: {
        manualChunks: id => (id.includes('node_modules') ? 'vendor' : undefined),
        sourcemapIgnoreList: relativeSourcePath => path.normalize(relativeSourcePath).includes('node_modules')
      }
    }
  },
  plugins: [
    tsconfigPaths(),
    react(),
    process.env.SENTRY_AUTHTOKEN
      ? sentryVitePlugin({
          org: 'tracers',
          project: 'tracers-front',
          authToken: process.env.SENTRY_AUTHTOKEN
        })
      : null,
    {
      name: 'sourcemap-exclude',
      transform(code: string, id: string) {
        return id.includes('node_modules') ? { code, map: { mappings: '' } } : undefined;
      }
    }
  ]
});
