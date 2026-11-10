import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { spawn, type ChildProcess } from 'node:child_process'
import net from 'node:net'

/**
 * Plugin Vite pour démarrer automatiquement le serveur PHP built-in
 * si le port 8000 n'est pas déjà occupé.
 */
function phpServerPlugin(backendPort = 8000): Plugin {
  let phpProcess: ChildProcess | null = null

  return {
    name: 'php-server-plugin',
    configureServer(server) {
      const checkPort = (port: number): Promise<boolean> => {
        return new Promise((resolve) => {
          const tester = net.createServer()
          tester.once('error', () => resolve(false))
          tester.once('listening', () => {
            tester.close(() => resolve(true))
          })
          tester.listen(port, '127.0.0.1')
        })
      }

      checkPort(backendPort).then((isAvailable) => {
        if (isAvailable) {
          phpProcess = spawn(
            'php',
            ['-S', `127.0.0.1:${backendPort}`, '-t', 'backend/public'],
            {
              stdio: ['ignore', 'inherit', 'inherit'],
            }
          )

          phpProcess.on('error', (err) => {
            console.error(`[PHP Backend] Erreur de démarrage: ${err.message}`)
          })

          server.config.logger.info(
            `\x1b[32m  ➜  PHP Backend:\x1b[0m http://127.0.0.1:${backendPort}/ (démarré automatiquement)`,
            { timestamp: true }
          )
        } else {
          server.config.logger.info(
            `\x1b[36m  ➜  PHP Backend:\x1b[0m http://127.0.0.1:${backendPort}/ (serveur existant détecté)`,
            { timestamp: true }
          )
        }
      })

      const cleanup = () => {
        if (phpProcess) {
          phpProcess.kill()
          phpProcess = null
        }
      }

      process.on('SIGINT', cleanup)
      process.on('SIGTERM', cleanup)
      process.on('exit', cleanup)
      server.httpServer?.on('close', cleanup)
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const backendTarget = env.VITE_BACKEND_TARGET || 'http://127.0.0.1:8000'

  return {
    plugins: [react(), phpServerPlugin(8000)],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 5173,
      proxy: {
        // Relayer tous les appels aux scripts PHP directs vers le backend
        '^/.*\\.php': {
          target: backendTarget,
          changeOrigin: true,
          secure: false,
          configure: (proxy) => {
            proxy.on('error', (err, req) => {
              console.error(
                `\x1b[31m[Vite Proxy Error]\x1b[0m Échec vers ${backendTarget}${req.url} : ${err.message}`
              )
            })
          },
        },
      },
    },
  }
})
