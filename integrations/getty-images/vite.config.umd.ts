/* eslint-disable import/no-default-export, import/no-extraneous-dependencies */
import { mergeConfig } from 'vite';

import { baseConfig } from './vite.config';

// https://vitejs.dev/config/
export default mergeConfig(baseConfig, {
  build: {
    // only empty the dir once in the ES build
    emptyOutDir: false,
    lib: {
      formats: ['umd'],
    },
  },
});
