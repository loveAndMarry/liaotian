import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import utils from '@/assets/common/utils'
// 聊天列表
import chat from '@/views/chat'
// 首页
import home from '@/views/home'
// 海选
import Auditions from '@/views/Auditions'
// 发起海选
import initiate from '@/views/Auditions/initiate'
// 购买婚恋豆页面
import virtualCurrency from '@/views/chat/virtualCurrency'
// 海选参与人资料
import datum from '@/views/Auditions/datum'
// 海选群聊
import group from '@/views/Auditions/group'
// 海选群聊好友列表
import groupList from '@/views/Auditions/groupList'
// 报名海选群聊好友列表
import Election from '@/views/Auditions/Election'
// 海选报名
import apply from '@/views/Auditions/apply'
// 海选确认发布
import publish from '@/views/Auditions/publish'
// 海选配对成功
import success from '@/views/Auditions/success'
// 海选搜索人员
import Match from '@/views/Auditions/Match'
// 海选发起匹配
import MatchSearch from '@/views/Auditions/MatchSearch'
// 海选发起人操作列表
import check from '@/views/Auditions/check'
// 海选人审核失败
import beDefeated from '@/views/Auditions/beDefeated'
// 海选详情
import activityDetails from '@/views/Auditions/activityDetails'
// 海选基金分润明细
import record from '@/views/Auditions/record'
// 我的资产
import property from '@/views/property'
// 主页
import view from '@/views'
// 底部导航栏
import tabbar from '@/views/tabber'
// 聊天详情
import exchange from '@/views/exchange'
// 用户详细信息
import userDetail from '@/views/home/components/userDetail'
// 用户相册
import photoList from '@/views/home/components/photoList'
// 邀请用户列表
import addressBook from '@/views/home/addressBook'
// 个人中心
import user from '@/views/user'
// 礼物
import gift from '@/views/user/gift'
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
// 手机认证
import YY from '@/views/user/YY'
// 实名认证
import authentication from '@/views/user/authentication'
// 支付
import purchase from '@/views/purchase'
// 支付详情
import PaymentDetails from '@/views/user/PaymentDetails'
// 在线客服
import service from '@/views/user/service'
// 消息通知
import message from '@/views/user/message'
// 婚恋豆收益明细
import VirtualCurrencyDetails from '@/views/property/VirtualCurrencyDetails'
// 资产收益明细
import ReturnsDetailed from '@/views/property/ReturnsDetailed'
// 婚恋豆兑换
import virtualCurrencyExchange from '@/views/property/virtualCurrencyExchange'
// 是否通过配对邀请
import MatchTheAudit from '@/views/msg/MatchTheAudit'

import test from '@/views/test'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
  {
    path: '/view',
    name: 'view',
    component: view,
    children: [{
      path: 'home',
      name: 'home',
      components: {
        default: home,
        tabbar: tabbar
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: 'chat',
      name: 'chat',
      components: {
        default: chat,
        tabbar: tabbar
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: 'Auditions',
      name: 'Auditions',
      components: {
        default: Auditions,
        tabbar: tabbar
      },
      meta: {
        keepAlive: true
      }
    },{
      path: 'user',
      name: 'user',
      components: {
        default: user,
        tabbar: tabbar
      },
      meta: {
        keepAlive: true
      }
    }]
  },
  {
    path: '/exchange',
    name: 'exchange',
    component: exchange
  },
  {
    path: '/userDetail',
    name: 'userDetail',
    component: userDetail,
    meta: {
      keepAlive: true
    }
  },
  {
    path: 'photoList',
    name: 'photoList',
    component: photoList
  },
  {
    path: '/userDetails',
    name: 'userDetails',
    component: userDetails
  },
  {
    path: '/RecentVisitors',
    name: 'RecentVisitors',
    component: RecentVisitors
  },
  {
    path: '/selfIntroduction',
    name: 'selfIntroduction',
    component: selfIntroduction
  },
  {
    path: '/Hobbies',
    name: 'Hobbies',
    component: Hobbies
  },
  {
    path: '/Photo',
    name: 'Photo',
    component: Photo
  },
  {
    path: '/link',
    name: 'link',
    component: link
  },
  {
    path: '/gift',
    name: 'gift',
    component: gift
  },
  {
    path: '/virtualCurrency',
    name: 'virtualCurrency',
    component: virtualCurrency
  },
  {
    path: '/MyDynamic',
    name: 'MyDynamic',
    component: MyDynamic
  },
  {
    path: '/nickName',
    name: 'nickName',
    component: nickName
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
  },
  {
    path: '/test',
    name: 'test',
    component: test
  },
  {
    path: '/purchase',
    name: 'purchase',
    component: purchase
  },
  {
    path: '/YY',
    name: 'YY',
    component: YY
  },
  {
    path: '/authentication',
    name: 'authentication',
    component: authentication
  },
  {
    path: '/PaymentDetails',
    name: 'PaymentDetails',
    component: PaymentDetails
  },
  {
    path: '/service',
    name: 'service',
    component: service
  },
  {
    path: '/initiate',
    name: 'initiate',
    component: initiate
  },
  {
    path: '/datum',
    name: 'datum',
    component: datum
  },
  {
    path: '/group',
    name: 'group',
    component: group
  },
  {
    path: '/apply',
    name: 'apply',
    component: apply
  },
  {
    path: '/publish',
    name: 'publish',
    component: publish
  },
  {
    path: '/groupList',
    name: 'groupList',
    component: groupList
  },
  {
    path: '/Election',
    name: 'Election',
    component: Election
  },
  {
    path: '/property',
    name: 'property',
    component: property
  },
  {
    path: '/message',
    name: 'message',
    component: message
  },
  {
    path: '/success',
    name: 'success',
    component: success,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/MatchSearch',
    name: 'MatchSearch',
    component: MatchSearch
  },
  {
    path: '/Match',
    name: 'Match',
    component: Match,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/check',
    name: 'check',
    component: check
  },
  {
    path: '/beDefeated',
    name: 'beDefeated',
    component: beDefeated,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/MatchTheAudit',
    name: 'MatchTheAudit',
    component: MatchTheAudit
  },
  {
    path: '/activityDetails',
    name: 'activityDetails',
    component: activityDetails
  },
  {
    path: '/record',
    name: 'record',
    component: record
  },
  {
    path: '/addressBook',
    name: 'addressBook',
    component: addressBook
  },
  {
    path: '/VirtualCurrencyDetails',
    name: 'VirtualCurrencyDetails',
    component: VirtualCurrencyDetails
  },
  {
    path: '/ReturnsDetailed',
    name: 'ReturnsDetailed',
    component: ReturnsDetailed
  },
  {
    path: '/virtualCurrencyExchange',
    name: 'virtualCurrencyExchange',
    component: virtualCurrencyExchange
  }
  ]
})

// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  // 判断当前是否为主页
  if(to.path.indexOf('view') !== -1){
    window.ishome = true
  } else {
    window.ishome = false
  }


  if(to.path === '/'){
    console.log('进入路由拦截')
    // 获取当前用户信息
    store.dispatch('UPDATEUSER', {userId: utils.getUrlArgObject('userId')}).then((res)=>{
      if(res.registerState - 0 < 2){
        next({name: 'basicInformation' })
      }else {
        // 获取默认筛选条件
        store.dispatch('getFromData',utils.getUrlArgObject('userId')).then(() => {
          // 获取权限
          store.dispatch('getJurisdiction',utils.getUrlArgObject('userId')).then(() => {
            next({name: 'home'})
          })
        })
      }
    })
  
  } else {
    next()
  }
})
 
 export default router