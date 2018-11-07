import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import login from '@/components/login'
import user from '@/components/user/user'
import article from '@/components/article/article'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path: '/',
      name: 'home',
      component: home,
      meta:{
        requiresAuth:true
      },
      children:[
        {
          path:"",
          name:"user",
          component:user
        },
        {
          path:'user',
          name:"user",
          component:user
        },
        {
          path:'article',
          name:'article',
          component:article
        }
      ]
    }
  ]
})


