import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { BootstrapVueNextResolver } from 'bootstrap-vue-next'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      vue({ customElement: true }),
      Components({ resolvers: [BootstrapVueNextResolver()] }),],
    server: {
      port: 5180,
      cors: true,
      headers: { 'Access-Control-Allow-Origin': '*' },
    },
    build: {
      lib: {
        entry: 'src/register.ts',
        name: 'ThinkTicketWidget',
        formats: ['es', 'iife', 'umd'],
        fileName: (f) => `think-ticket-widget.${f}.js`,
      },
    },
    define: {
      __API__: JSON.stringify(env.VITE_API_URL),
    },
  }
})
