import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5580,
    proxy: {
      '/provinces': {
        target: 'https://vn-public-apis.fpo.vn',
        changeOrigin: true,
        secure: false
      }
    }
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@api': path.resolve(__dirname, './src/api'),
      '@redux': path.resolve(__dirname, './src/redux')
    }
  }
})
