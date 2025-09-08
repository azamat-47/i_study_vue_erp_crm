import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import './assets/main.css'
import { createPinia } from 'pinia'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)

app.use(Antd)
app.use(VueQueryPlugin)
const pinia = createPinia()
app.use(pinia)     // Pinia-ni app-ga ulantrish
app.use(router)

app.mount('#app')
