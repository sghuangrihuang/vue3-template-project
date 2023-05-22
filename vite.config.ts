import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/',	//不加打包后白屏
  // server: {             
  //   host: '0.0.0.0',	
  //   // port: 8080,      
  //   open: true
  // },
  resolve:{   
    alias:[   
      {
        find:'@',
        replacement:resolve(__dirname,'src') 
      }
    ]
  }
})
