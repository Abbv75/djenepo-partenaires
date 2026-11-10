import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const backendTarget = env.VITE_BACKEND_TARGET || 'http://localhost:8000'

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 5173,
      proxy: {
        // Endpoints d'API backend
        '^/(blogs|categories|services|service-categories|logout|user)': {
          target: backendTarget,
          changeOrigin: true,
          secure: false,
        },
        // Authentification login (proxifié pour l'API, bypassé pour la page SPA en HTML)
        '/login': {
          target: backendTarget,
          changeOrigin: true,
          secure: false,
          bypass: (req) => {
            if (req.headers.accept?.includes('text/html')) {
              return '/index.html'
            }
          },
        },
        // Fallback si un préfixe /api est utilisé
        '/api': {
          target: backendTarget,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
