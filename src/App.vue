<template>
  <div id="app">
      <router-view class="Router"></router-view>
      <router-view class="Router" name="content"></router-view>
    <div class="loading_group" v-show="Loading"><Loading class="loading" type="spinner" size="1.5rem"/></div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import { validRange, valid } from 'semver';
import { Loading } from 'vant'
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      transitionName: 'slide-left', // 默认动态路由变化为slide-right
      transitionName1: 'slide-right', // 默认动态路由变化为slide-right
      isRouterAlive: true
    }
  },
  computed: {
    ...mapState({
      Loading: state => state.common.Loading
    }),
  },
  methods: {
    reload () {
      console.log('刷新了')
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  },
  components: {
    Loading
  }
}

document.documentElement.style.fontSize = (document.documentElement.clientWidth / 720) * 100 + 'px'
</script>

<style lang="less">
// 设置聊天礼物展示样式（需要全局配置）

.gift_content{
  text-align: left;
  margin-top: .23rem;
  img{
    display: block;
    float: left;
    max-width: 1.3rem;
    max-height: 1.3rem;
  }
  p{
    margin: 0;
    line-height: 1.3rem;
    display: inline-block;
    margin-left: .16rem;
    color: #8d8d8d;
    font-size: .28rem;
  }
}

// 自定义弹出框样式
.gift-content-back{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,.3);
  z-index: 2001;
  text-align: center
}
.gift-content{
  width: 5.3rem;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: #fff;
  border-radius: .2rem;
  overflow: hidden;
  .title{
    img{
      max-width: 1.6rem;
      max-height: 1.6rem;
      margin: 0 auto;
      display: block;
      margin-top: .8rem;
    }
    span{
      display: block;
      font-size: .3rem;
      color: #323232;
      line-height: .3rem;
      padding: .16rem 0;
    }
    b{
      font-size: .28rem;
      line-height: .28rem;
      font-weight: initial;
      color: #ff5e80;
      display: block;
    }
  }
  .img{
    background-color: #dddddd;
    margin: .4rem 0;
    padding: .15rem 0;
    text-align: center;
    box-sizing: border-box;
    font-size: .24rem;
    img{
      display: inline-block;
      width: .9rem;
      height: .9rem;
      border-radius: 50%;
      vertical-align: middle;
    }
    span{
      display: inline-block;
      width: .5rem;
      height: .5rem;
      margin: 0 .35rem;
      vertical-align: middle;
      background: url('./assets/gift/heart.png') no-repeat;
      background-size: 100%;
      background-position: bottom;
    }
  }
  .bottom {
    height: .86rem;
    line-height: .86rem;
    font-size: .32rem;
    color: #fff;
    background-color: #ff5e80
  }
}
/* 
  去掉首页顶部tabs页的边框
*/
.van-hairline--top-bottom::after{
  border: 0px !important
}

/* 自定义图片预览和下载框 */
.imageDiv{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000;
  z-index: 1
}
.imageImg{
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
  position: absolute;
}
.imageSpan {
  position: absolute;
  right: .75rem;
  bottom: .75rem;
  width: .5rem;
  height: .5rem;
  padding: .2rem;
  border-radius: .05rem;
  background-image: url('../src/assets/images/download.png');
  background-repeat: no-repeat;
  background-color: rgba(0,0,0,.3);
  background-size: .5rem .5rem;
  background-position: center;
}
/* 设置海选下拉刷新时的字体隐藏的问题 */
.Auditions .van-tabs__content--animated{
  overflow: inherit;
}
/* 设置免费领取会员按钮的样式*/
.ToReceiveTheMember .van-button--large{
  top: 8rem;
  width: 50%;
  height: 44px;
  background-color: #ff5e80;
  border: #ff5e80;
}
.van-nav-bar__title{
  font-size: .36rem
}

#app .van-popup--right{
  width: 100%;
  height: 100%;
  background-color: #fff
}
.van-cell__title{
  text-align: left
}
.link .van-list__finished-text,.link .van-list__loading-text{
  width: 100%
}
.service .van-nav-bar__title{
  background-color: #fff
}
.dynamic .van-tabs--line{
  height: calc(100% - 44px);
}
.dynamic .van-tabs__content--animated{
  height: 100%
}
/* .chat_list .van-pull-refresh,
.chat_list .van-pull-refresh__track{
  height: 100%
} */
#app .van-nav-bar .van-icon{
  color: #858585 !important
}
img[src=""],img:not([src]){opacity:0;}
.van-button--large{
  height: 1rem
}
.loading_back{
  width: 100%;
  height:100%;
  position: relative;
  top: 0;
  left: 0;
  background: url('./assets/images/启动页3.jpg') no-repeat;
  background-size: 100%;
  overflow: hidden;
  z-index: 99;
  animation: opacitys 2s linear

}
@keyframes opacitys {
  from {
    opacity: 1;
    filter: opacity(100)
  }
  to {
    opacity: 0;
    filter: opacity(0)
  }
}
.loading_group{
    height: 100%;
    width: 100%;
    position: relative;
    left: 0;
    top: 0;
    z-index: 999;
}
.loading{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.loading.show{
  display: block
}
#app {
  font-family: 'microsoft yahei',"Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 0.24rem;
  height: 100%;
  color: #323232
}
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  -webkit-touch-callout:none;/*系统默认菜单被禁用*/-webkit-user-select:none;/*webkit浏览器*/-khtml-user-select:none;/*早起浏览器*/-moz-user-select:none;/*火狐浏览器*/-ms-user-select:none;/*IE浏览器*/user-select:none;/*用户是否能够选中文本*/
}
input, textarea {
  -webkit-user-select:auto;
  -webkit-touch-callout: behavior
}

.Router {
  position: absolute;
  width: 100%;
  top:0;
  height: 100%;
  background-color: #f0f0f0
}

._v-container>._v-content>.loading-layer{
  font-size: .28rem !important;
  line-height: .6rem !important;
  height: .6rem !important
}
._v-container>._v-content>.loading-layer .spinner-holder .text, ._v-container>._v-content>.pull-to-refresh-layer .spinner-holder .text{
  font-size: .28rem !important;
}
/* 更改字体大小 */
.van-cell{
  font-size: .28rem
}

/* 更改环形进度条默认样式
*/
.item .van-circle__text{
  color:#ff5e80;
  font-size: .28rem
}
.hide{
  display: none
}
.show{
  display: block
}
</style>
