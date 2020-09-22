import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login', // 登录
    name: 'Login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // 空路由，显示/时默认显示到该路由下面 首页
        name: 'Home',
        component: () => import('@/views/home/')
      },
      {
        path: '/qa', // 问答
        name: 'Qa',
        component: () => import('@/views/qa')
      },
      {
        path: 'video', // 视频
        name: 'Video',
        component: () => import('@/views/video')
      },
      {
        path: 'my', // 我的
        name: 'My',
        component: () => import('@/views/my')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
