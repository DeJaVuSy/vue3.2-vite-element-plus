import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
// import installElementPlus from './plugins/element'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'//国际化
import Axios from 'axios'
import installIcon from './util/iconsUtil'

const app = createApp(App)
// installElementPlus(app)
app.use(ElementPlus,{locale: zhCn,})//组件中文化配置
app.use(router).mount('#app')

  