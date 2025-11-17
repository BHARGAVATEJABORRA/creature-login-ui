import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/creature-login-ui/',
  plugins: [react()]
})
