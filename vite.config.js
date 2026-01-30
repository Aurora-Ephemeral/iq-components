import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import libCss from 'vite-plugin-libcss'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
        '@': path.resolve(__dirname, './src'),
        '~': path.resolve(__dirname, './'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  plugins: [
    vue(),
    libCss(),
  ],
  build: {
    lib: {
        entry: './src/index.js',
        name: 'iq-components',
        fileName: (format) => `iq-components.${format}.js` // unified library build
      },
      rollupOptions: {
        external: ['vue', 'element-plus', 'axios', 'vuedraggable'],
        globals: {
          vue: 'vue',
          'element-plus': 'element-plus',
          'axios': 'axios',
          'vuedraggable': 'vuedraggable'
        }
      },
      sourcemap: true,
      cssCodeSplit: true
  }
})
