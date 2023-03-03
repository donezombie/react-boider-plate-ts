import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

let pathSrc = path.resolve(__dirname, './src');
//* In case Win OS
if (pathSrc.includes('\\')) {
  pathSrc = pathSrc.replace(/\\/g, '/');
}

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: { additionalData: `@import "${pathSrc}/styles/root.scss";` },
    },
  },
  plugins: [react(), tsconfigPaths()],
});
