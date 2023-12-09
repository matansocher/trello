import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // @ts-ignore
      '@assets': path.resolve(__dirname, 'src/assets/index'),
      // @ts-ignore
      '@components': path.resolve(__dirname, 'src/components/index'),
      // @ts-ignore
      '@constants': path.resolve(__dirname, 'src/constants/initial-data'),
      // @ts-ignore
      '@context': path.resolve(__dirname, 'src/context/index'),
      // @ts-ignore
      '@hooks': path.resolve(__dirname, 'src/hooks/index'),
      // @ts-ignore
      '@models': path.resolve(__dirname, 'src/models/index'),
      // @ts-ignore
      '@services': path.resolve(__dirname, 'src/services/index'),
    }
  },
  plugins: [react()],
})
