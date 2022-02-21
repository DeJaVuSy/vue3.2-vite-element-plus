import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import NotFound from '../components/NotFound.vue'
import GenTableHome from '../test/testGenTableHome.vue'
import GenTableSSM from '../views/GenTableSSM.vue'
import Home from '../views/home.vue'
import Swagger from '../views/Swagger.vue'
import Druid from '../views/Druid.vue'
import Index from '../leyout/Index.vue'
import Tabs from '../leyout/Tabs.vue'
import ServerM from '../views/ServerM.vue'
import Dashboard  from '../views/Dashboard.vue'

const routes = [
   {
      path: '/:pathMatch(.*)*',
      name: 'Login', 
      meta: { title: "登录" },
      component: Login
   },
   {
      path: '/genTableHome', 
      name: 'GenTableHome', 
      component: GenTableHome
   },
   {
      path: '/index',
      name: 'Index',
      component: Index,
      meta: {
         title: "索引",
         requireAuth: true
      },
      children: [  //路由的嵌套，实现页面局部刷新
         {
            path: '/home',
            name:'Home',
            meta: { title: "主页" },
            component: Home,//页面最初加载的组件
         },
         {
            path: '/dashboard',
            name:'Dashboard',
            meta: { title: "软件使用情况" ,roles: ["admin"]},
            component: Dashboard
         },
         {
            path: '/notFound',
            name:'NotFound',
            meta: { title: "404" },
            component: NotFound
         },
         {
            path: '/genTableSSM', 
            name: 'GenTableSSM', 
            meta: { title: "代码生成" ,roles: ["admin"]},
            component: GenTableSSM
         },
         {
            path: '/swagger',
            name:'Swagger',
            meta: { title: "接口测试" ,roles: ["admin"]},
            component: Swagger
         },
         {
            path: '/druid',
            name:'Druid',
            meta: { title: "数据库监控" ,roles: ["admin"]},
            component: Druid
         },
         {
            path: '/serverM',
            name:'ServerM',
            meta: { title: "服务器监控" ,roles: ["admin"]},
            component: ServerM
         },
         {
            path: '/serverM',
            name:'ServerM',
            meta: { title: "服务器监控" ,roles: ["admin"]},
            component: ServerM
         },
      ]
   },


]
const router = createRouter({
  history: createWebHistory(),
  routes
})


//挂载路由导航守卫
router.beforeEach((to, from, next) => {
   if (to.meta.title) {
      document.title = to.meta.title;//动态设置浏览器标题title
   } else {
      document.title = '后台管理' //默认的title
   }
   if (to.path === '/') return next()
   // 获取token
   const tokenStr = window.localStorage.getItem('token')
   if (!tokenStr) return next('/')
   next()
 })

export default router //这段后，要有回车保留一个空行否则会报错。
