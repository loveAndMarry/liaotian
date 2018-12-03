import Vue from 'vue'
import Router from 'vue-router'
// 聊天列表
import chat from '@/views/chat'
// 首页
import home from '@/views/home'
// 主页
import view from '@/views'
// 底部导航栏
import tabbar from '@/views/tabber'
// 聊天详情
import exchange from '@/views/exchange'
// 用户详细信息
import userDetail from '@/views/home/components/userDetail'
// 个人中心
import user from '@/views/user'
// 个人详细资料
import userDetails from '@/views/user/userDetails'
// 访问记录
import RecentVisitors from '@/views/user/RecentVisitors'

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
    },{
      path: 'user',
      name: 'user',
      components: {
        default: user,
        tabber: tabbar
      },
      // children: [
      //   {
      //     path: 'userDetails',
      //     name: 'userDetails',

      //   }
      // ]
    }]
  },
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
  },
  {
    path: '/userDetails',
    name: 'userDetails',
    components: {
      content: userDetails
    }
  },
  {
    path: '/RecentVisitors',
    name: 'RecentVisitors',
    components: {
      content: RecentVisitors
    }
  }
  ]
})
