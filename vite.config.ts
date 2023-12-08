import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/index'),
      '@models': path.resolve(__dirname, 'src/models/index'),
      '@context': path.resolve(__dirname, 'src/context/index'),
      '@services': path.resolve(__dirname, 'src/services/index'),
      '@constants': path.resolve(__dirname, 'src/constants/initial-data'),
      '@hooks': path.resolve(__dirname, 'src/hooks/index'),
    }
  },
  plugins: [react()],
})
