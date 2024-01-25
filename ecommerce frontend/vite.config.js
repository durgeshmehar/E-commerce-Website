import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@heroicons/react'],
  },
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:8080', // your backend server URL
        changeOrigin: true,
      },
      '/orders': {
        target: 'http://localhost:8080', // your backend server URL
        changeOrigin: true,
      },
      '/products': {
        target: 'http://localhost:8080', // your backend server URL
        changeOrigin: true,
      },
      '/categories': {
        target: 'http://localhost:8080', // your backend server URL
        changeOrigin: true,
      },
      '/brands': {
        target: 'http://localhost:8080', // your backend server URL
        changeOrigin: true,
      },
      '/users': {
        target: 'http://localhost:8080', // your backend server URL
        changeOrigin: true,
      },
      '/cart': {
        target: 'http://localhost:8080', // your backend server URL
        changeOrigin: true,
      },
      '/webhook': {
        target: 'http://localhost:8080', // your backend server URL
        changeOrigin: true,
      },
      '/create-payment-intent': {
        target: 'http://localhost:8080', // your backend server URL
        changeOrigin: true,
      },
    },
  },
})
