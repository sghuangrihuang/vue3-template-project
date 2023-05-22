import { defineConfig, loadEnv  } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
  define: {
    'process.env': loadEnv(mode, process.cwd())
  },
  plugins: [vue()],
  base: './',
  resolve:{   
    alias:[   
      {
        find:'@',
        replacement:resolve(__dirname,'src') 
      }
    ]
  }
})
