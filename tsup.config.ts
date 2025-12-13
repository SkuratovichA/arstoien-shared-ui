import { defineConfig } from 'tsup';
import { cpSync } from 'fs';
import { mkdirSync } from 'fs';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    '@radix-ui/*',
  ],
  sourcemap: true,
  minify: false,
  splitting: false,
  treeshake: true,
  outDir: 'dist',
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
  onSuccess: async () => {
    // Copy CSS file to dist/styles
    mkdirSync('dist/styles', { recursive: true });
    cpSync('src/styles/globals.css', 'dist/styles/globals.css');
    console.log('✓ Copied globals.css to dist/styles/');
  },
});