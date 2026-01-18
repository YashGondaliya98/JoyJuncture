import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/',   // ✅ THIS LINE FIXES THE BLANK PAGE
})
