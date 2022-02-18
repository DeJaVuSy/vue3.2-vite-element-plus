import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import NotFound from '../components/NotFound.vue'
import GenTableHome from '../test/testGenTableHome.vue'
import GenTableHomeVue3 from '../views/GenTableSSM.vue'
import Home from '../views/home.vue'
import Swagger from '../views/Swagger.vue'
import Druid from '../views/Druid.vue'
import Index from '../leyout/Index.vue'
import Tabs from '../leyout/Tabs.vue'
import ServerM from '../views/ServerM.vue'

const routes = [
   {
      path: '/:pathMatch(.*)*',
      name: 'Login', 
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
         requireAuth: true
      },
      children: [  //路由的嵌套，实现页面局部刷新
         {
            path: '/home',
            name:'Home',
            component: Home,//页面最初加载的组件
         },
         {
            path: '/notFound',
            name:'NotFound',
            component: NotFound
         },
         {
            path: '/genTableHomeVue3', 
            name: 'GenTableHomeVue3', 
            component: GenTableHomeVue3
         },
         {
            path: '/swagger',
            name:'Swagger',
            component: Swagger
         },
         {
            path: '/druid',
            name:'Druid',
            component: Druid
         },
         {
            path: '/serverM',
            name:'ServerM',
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
   if (to.path === '/') return next()
   // 获取token
   const tokenStr = window.localStorage.getItem('token')
   if (!tokenStr) return next('/')
   next()
 })

export default router //这段后，要有回车保留一个空行否则会报错。
