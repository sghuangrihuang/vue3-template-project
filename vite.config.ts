import { defineConfig, loadEnv  } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
  define: {
    'process.env': loadEnv(mode, process.cwd())
  },
  plugins: [vue()],
  base: './',	//不加打包后白屏
  resolve:{   
    alias:[   
      {
        find:'@',
        replacement:resolve(__dirname,'src') 
      }
    ]
  }
})
