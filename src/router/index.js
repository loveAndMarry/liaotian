import Vue from 'vue'
import Router from 'vue-router'
import chat from '@/views/chat/index'
import home from '@/views/index'
import tabbar from '@/views/tabber'
import exchange from '@/views/exchange'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    children: [{
      path: 'chat',
      name: 'chat',
      components: {
        default: chat,
        tabber: tabbar
      }
    }]
  },
  // {
  //   path: '/chat',
  //   name: 'chat',
  //   components: {
  //     default: chat,
  //     tabber: tabbar
  //   }
    // children: [{
    //   path: '/chat/fujinren',
    //   name: 'chat',
    //   components: {
    //     default: chat,
    //     tabber: tabbar
    //   }
    // }]
  // },
  {
    path: '/exchange',
    name: 'exchange',
    components: {
      content: exchange
    }
  }
  ]
})
