import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: '主页',
      component: home
    },
    {
      path: '/signup',
      name: '注册',
      component: (resolve) => require(['@/components/signUp'], resolve)
    }
  ]
})
