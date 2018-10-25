import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import chat from '@/components/chat/index'
import tabbar from '@/components/TabBer'

Vue.use(Router)

export default new Router({
  routes: [
    {
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
    }
  ]
})
