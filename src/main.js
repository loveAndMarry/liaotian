// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'vant/lib/vant-css/index.css'

//引入容联云即时通讯
import IM from '@/assets/common/IM'

IM.init()

// 下拉刷新上拉加载组件
import VueScroller  from 'vue-scroller'
Vue.use(VueScroller)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
