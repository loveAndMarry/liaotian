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
// 修改个人介绍
import selfIntroduction from '@/views/user/selfIntroduction'
// 修改兴趣爱好
import Hobbies from '@/views/user/Hobbies'
// 查看相册
import Photo from '@/views/user/Photo'
// 喜欢（谁看过我，谁喜欢我, 我喜欢谁）
import link from '@/views/user/link'
// 我的动态
import MyDynamic from '@/views/user/MyDynamic'
// 修改昵称
import nickName from '@/views/user/nickName'
// 会员开通列表
import member from '@/views/member'
// 会员详情
import memberDetails from '@/views/member/memberDetails'
// 我的订单
import order from '@/views/user/order'
// 个人资料
import basicInformation from '@/views/user/basicInformation'

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
  },
  {
    path: '/selfIntroduction',
    name: 'selfIntroduction',
    components: {
      content: selfIntroduction
    }
  },
  {
    path: '/Hobbies',
    name: 'Hobbies',
    components: {
      content: Hobbies
    }
  },
  {
    path: '/Photo',
    name: 'Photo',
    components: {
      content: Photo
    }
  },
  {
    path: '/link',
    name: 'link',
    components: {
      content: link
    }
  },
  {
    path: '/MyDynamic',
    name: 'MyDynamic',
    components: {
      content: MyDynamic
    }
  },
  {
    path: '/nickName',
    name: 'nickName',
    components: {
      content: nickName
    }
  },
  {
    path: '/member',
    name: 'member',
    component: member
  },
  {
    path: '/memberDetails',
    name: 'memberDetails',
    component: memberDetails
  },
  {
    path: '/order',
    name: 'order',
    component: order
  },
  {
    path: '/basicInformation',
    name: 'basicInformation',
    component: basicInformation
  }
  ]
})
