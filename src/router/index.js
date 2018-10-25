import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/HelloWorld'
import chat from '@/views/chat/index'
import tabbar from '@/views/TabBer'
import exchange from '@/views/exchange'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'HelloWorld',
    components: {
      default: HelloWorld,
      tabber: tabbar
    }
  },
  {
    path: '/chat',
    name: 'chat',
    components: {
      default: chat,
      tabber: tabbar
    }
    // children: [{
    //   path: '/chat/fujinren',
    //   name: 'chat',
    //   components: {
    //     default: chat,
    //     tabber: tabbar
    //   }
    // }]
  },
  {
    path: '/exchange',
    name: 'exchange',
    components: {
      default: exchange
    }
  }
  ]
})
