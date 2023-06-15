import { createApp } from 'vue'
import './style.css'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'
import "~/styles/index.scss";
import "uno.css";

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import locale from 'element-plus/lib/locale/lang/zh-cn';
import { createPinia } from 'pinia'

axios.defaults.baseURL=import.meta.env.VITE_APP_BASE_URL as any
axios.defaults.timeout = 180*1000
const app = createApp(App)
Object.keys(ElementPlusIconsVue).forEach(key => {
  Reflect.has(ElementPlusIconsVue, key)
  && app.component(key, ElementPlusIconsVue[key as keyof typeof ElementPlusIconsVue]);
})
app
  .use(ElementPlus, { locale })
  .use(createPinia())
  .use(router)
  .mount('#app')


