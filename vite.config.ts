import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['0b46-2401-4900-8818-bdde-b6dc-8a1c-1a7f-782.ngrok-free.app'],
  },
})
