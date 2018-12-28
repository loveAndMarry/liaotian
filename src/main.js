// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
//引入容联云即时通讯
import IM from '@/assets/common/IM'

Vue.$IM = IM
// 时间选择器
import Calendar from 'vue2-datepick';
Vue.use(Calendar);

import { Dialog } from 'vant';
Vue.use(Dialog);

// 下拉刷新上拉加载组件
import VueScroller  from 'vue-scroller'
Vue.use(VueScroller)

Vue.filter("dateTime", function(val) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
  var time = new Date(new Date().setHours(0, 0, 0, 0)).getTime() // 获取当日凌晨的时间
  var currentTime = Date.parse(new Date());
  var dateTime = val;//后台传递来的时间
  var d_day = Date.parse(new Date(dateTime));
  var day = Math.abs(parseInt((d_day - currentTime)/1000/3600/24));//计算日期
  var hour = Math.abs(parseInt((d_day - currentTime)/1000/3600));//计算小时
  var minutes = Math.abs(parseInt((d_day - currentTime)/1000/60));//计算分钟
  var seconds = Math.abs(parseInt((d_day - currentTime)/1000));//计算秒
  if(day >= 365){
    return new Date(dateTime).getFullYear() + '年' + (new Date(dateTime).getMonth() + 1) + '月' + new Date(dateTime).getDate() + '日'
  }else if(day >= 2){
    return (new Date(dateTime).getMonth() + 1) + '月' + (new Date(dateTime).getDate()) + '日'
  }else if(day > 0 && day < 2){
    return "昨天"
  }else if(hour > 0 && hour < 24){
    return (new Date(dateTime).getHours()) + 1 + ':' + (new Date(dateTime).getMinutes() + 1)
  }else if(minutes > 0 && minutes < 60){
    return parseInt(minutes)+"分钟前"
  }else if(seconds > 0 && seconds < 60){
    return parseInt(seconds)+"秒前"
  }
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    isLogin: 0 // 当前容联云是否登陆
  },
  router,
  store,
  components: { 
    App
  },
  template: '<App/>',
  created () {
    // // 触发获取当前本地好友列表
    // this.$store.dispatch('GETFRIEND')
    // // 触发获取当前本地聊天记录
    // this.$store.dispatch('GETCHATMESSAGE')
  },
  watch: {
    '$store.state.IM.user': function (val) {
      console.log('当前获取到用户信息',val)
      if(!this.isLogin){
        Vue.$IM.init()
        this.isLogin = 1
      }
    }
  }
})
