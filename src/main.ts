import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

// element-plus
app.use(ElementPlus, {
  locale: zhCn,
})

// vuex
app.use(store)

// router
app.use(router)

app.mount('#app')
