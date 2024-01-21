import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets/index'),
      '@components': path.resolve(__dirname, 'src/components/index'),
      '@constants': path.resolve(__dirname, 'src/constants/index'),
      '@context': path.resolve(__dirname, 'src/context/index'),
      '@hooks': path.resolve(__dirname, 'src/hooks/index'),
      '@models': path.resolve(__dirname, 'src/models/index'),
      '@services': path.resolve(__dirname, 'src/services/index'),
      '@screens': path.resolve(__dirname, 'src/screens/index'),
    }
  },
  plugins: [react()],
})
