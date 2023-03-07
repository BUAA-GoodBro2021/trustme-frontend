import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 支持自动导入element Plus
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // import目标
      include:[
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
      ],
      // 自动导入的包
      imports:['vue','vue-router','@vueuse/core'],
      resolvers: [ElementPlusResolver()],
    }),
    // 组件自动导入
    Components({
      // 文件夹
      dirs: ['src/components'],
      extensions: ['vue'],
      // 支持深度导入
      deep: true,
      include: [/\.vue$/, /\.vue\?vue/],
      exclude: [
        /[\\/]node_modules[\\/]/,
        /[\\/]\.git[\\/]/,
        /[\\/]\.nuxt[\\/]/,
      ],
      resolvers: [ElementPlusResolver()],
      directoryAsNamespace: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js',',ts','.json','.jsx','.tsx','.vue'],
  },
  build:{
    minify: 'terser',
    // sourcemap: true,
    terserOptions:{
      compress:{
        // 生产环境中移除console.log()和debugger
        drop_console:true,
        drop_debugger:true,
      }
    }
  }
})
