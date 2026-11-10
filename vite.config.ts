import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * 开发环境直接复用 server/ask.ts，避免前后端两套实现。
 * 生产环境由 api/ask.ts（Vercel Function）承载同一份逻辑。
 */
function devApi(): Plugin {
  return {
    name: 'campusguide-dev-api',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/ask', (req, res) => {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method Not Allowed' }))
          return
        }

        let raw = ''
        req.on('data', (chunk) => {
          raw += chunk
        })
        req.on('end', async () => {
          try {
            const mod = await server.ssrLoadModule('/server/ask.ts')
            const data = await mod.handleAsk(JSON.parse(raw || '{}'))
            res.end(JSON.stringify(data))
          } catch (err) {
            const status = (err as { status?: number }).status ?? 500
            res.statusCode = status
            res.end(JSON.stringify({ error: (err as Error).message }))
          }
        })
      })
    }
  }
}

export default defineConfig(({ mode }) => {
  // 让 serverless 函数能读到 .env（Vite 默认只注入 import.meta.env）
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [react(), tailwindcss(), devApi()],
    build: {
      target: 'es2020'
    }
  }
})
