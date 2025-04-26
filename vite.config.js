import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    fs: {
      strict: false, 
    },
  },
  plugins: [react()],
  build: {
    rollupOptions: {
        input: {
            main: "index.html", 
            privacyPolicy: "privacy-policy/index.html",
            termsOfService: "wanowa/terms-of-service/index.html",
        },
    },
},
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['mixed-decls'],
      },
    },
  },
})
