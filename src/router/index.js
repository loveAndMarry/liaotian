import Vue from 'vue'
import Router from 'vue-router'
import chat from '@/views/chat/index'
import home from '@/views/home/index'
import view from '@/views/index'
import tabbar from '@/views/tabber'
import exchange from '@/views/exchange'
import userDetail from '@/views/userDetail'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/view/home'
  },
  {
    path: '/view',
    name: 'view',
    component: view,
    children: [{
      path: 'home',
      name: 'home',
      components: {
        default: home,
        tabber: tabbar
      }
    },
    {
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
  },
  {
    path: '/userDetail',
    name: 'userDetail',
    components: {
      content: userDetail
    }
  }
  ]
})
