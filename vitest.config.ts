import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@app': resolve(__dirname, 'src'),
    },
  },
  test: {
    include: ['src/**/*.spec.ts', 'test/**/*.e2e-spec.ts'],
    environment: 'node',
    globals: true,
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
    },
  },
});
