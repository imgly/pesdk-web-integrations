/* eslint-disable import/no-default-export, import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ exclude: ['./src/env.d.ts'] })],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'IntegrationGettyImages',
      fileName: format => `getty-images.${format}.js`,
    },
    rollupOptions: {
      output: {
        // has to be true else UMD bundle would not work
        inlineDynamicImports: true, // <== here the entry
      },
    },
  },
});
