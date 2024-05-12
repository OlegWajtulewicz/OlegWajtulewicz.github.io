import './assets/styles/main.scss';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// подключение плагина autoAnimate
app.use(autoAnimatePlugin)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)


app.mount('#app')
