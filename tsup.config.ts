import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false,
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
});