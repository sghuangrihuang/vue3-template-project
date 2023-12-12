import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import VConsole from 'vconsole'
import 'element-plus/dist/index.css'
import "~/styles/index.scss";
import "uno.css";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import locale from 'element-plus/lib/locale/lang/zh-cn';
new VConsole()
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
