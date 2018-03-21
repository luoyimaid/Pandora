import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
// import personalCenter from '@/components/personalCenter/personalCenter'
// import registered from '@/components/registered/registered'
Vue.use(Router)

export default new Router({
  routes: [
      {
          path: '/',
          redirect: '/index'
      },
      {
         title: '首页',
         path: '/index',
         name: 'index',
         component: index
      }
    // ,
    // {
    //   title: '个人中心',
    //   path: '/personalCenter',
    //   name: 'personalCenter',
    //   component: personalCenter
    // }
  ]
})
