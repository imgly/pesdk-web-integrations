/* eslint-disable import/no-default-export, import/no-extraneous-dependencies */
import { mergeConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export const baseConfig: UserConfig = {
  plugins: [react()],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'IntegrationGettyImages',
      fileName: format => `getty-images.${format}.js`,
    },
  },
};

// https://vitejs.dev/config/
export default mergeConfig(baseConfig, {
  plugins: [dts({ exclude: ['./src/env.d.ts'] })],
  build: {
    lib: {
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        '@pesdk/getty-images',
        'photoeditorsdk',
        'photoeditorsdk/no-polyfills',
        'react',
        'react-dom',
        'styled-components',
      ],
    },
  },
});
