import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
// 导入element plus的CSS
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import './assets/reset.css'
import 'animate.css';
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.use(router).use(createPinia()).use(ElementPlus)
app.mount('#app')
