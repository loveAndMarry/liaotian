<template>
  <div id="app">
    <!-- <transition :name="transitionName"> -->
      <!-- <keep-alive> -->
        <router-view class="Router" v-if="isRouterAlive"></router-view>
      <!-- </keep-alive> -->
    <!-- </transition> -->
    <!-- <transition :name="transitionName1"> -->
      <!-- <keep-alive> -->
        <router-view class="Router1" name="content"></router-view>
      <!-- </keep-alive> -->
    <!-- </transition> -->
    <!-- <div class="loading" :style="{
        show: this.isLoading
      }">
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      isRouterAlive: true,
      transitionName: 'slide-left', // 默认动态路由变化为slide-right
      transitionName1: 'slide-right' // 默认动态路由变化为slide-right
    }
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
  // watch: {
  //   $route (to, from) {
  //     let isBack = this.$router.isBack //  监听路由变化时的状态为前进还是后退
  //     if(to.path.indexOf('/view') === -1 && from.path.indexOf('/view') === -1){
  //        if (isBack) {
  //         this.transitionName = 'slide-left'
  //         this.transitionName1 = 'slide-left'
  //       } else {
  //         this.transitionName = 'slide-left'
  //         this.transitionName1 = 'slide-right'
  //       }
  //     }
  //     this.$router.isBack = false
  //   }
  // },
  // components: {
  //   Loading
  // }
}

document.documentElement.style.fontSize = (document.documentElement.clientWidth / 750) * 100 + 'px'
</script>

<style>
.loading{
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
  display: none
}
.loading.show{
  display: block
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 0.24rem;
  height: 100%;
}
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.Router,.Router1 {
  position: absolute;
  width: 100%;
  top:0;
  height: 100%;
  background-color: #f0f0f0
}
/* .Router{
  transition: all 0.8s ease;
}
.Router1{
  transition: all 0.3s ease;
} */

.slide-left-enter{
   -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
}

.slide-left-enter-active{
  transition: all .3s ease
}

.slide-left-enter-to{
     -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
}

.slide-left-leave{
   -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
}

.slide-left-leave-active{
  transition: all .3s
}

.slide-left-leave-to{
     -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
}
/* .slide-left-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
} */
.slide-right-enter{
   -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
}

.slide-right-enter-active{
  transition: all .3s
}

.slide-right-enter-to{
     -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
}

.slide-right-leave{
   -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
}

.slide-right-leave-active{
  transition: all .3s
}

.slide-right-leave-to{
     -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
}

/* .slide-right-enter{ */
  /* -webkit-transform: translate(80%, 0);
  transform: translate(80%, 0); */
/* }
.slide-right-enter-active {
  animation: slide_Right 1.1s ease
}
.slide-right-enter-to { */
  /* -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0); */
/* } */
/* .slide-right-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
} */

/* @keyframes slide_Right {
  0% {
    -webkit-transform: translate(0%, 0);
    transform: translate(0%, 0);
  }
  20% {
    -webkit-transform: translate(80%, 0);
    transform: translate(80%, 0);
  }
  80% {
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }
} */

/* .slide-left-leave-active {
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
} */

/* .slide-right-enter {
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}

.slide-right-leave-active {
  -webkit-transform: translate(0, 0);
  transform: translate(0, 0);
} */

/* .slide-right-active {
  animation: bounce-in 1s
} */
/* .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
} */

/* @keyframes bounce-in {
  0% {
    -webkit-transform: translate(100%, 0);
    transform: translate(100% 0);
  }
  50% {
    opacity: .5;
     -webkit-transform: translate(20%, 0);
    transform: translate(20% 0);
  }
  100% {
    opacity: 0;
     -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
} */
._v-container>._v-content>.loading-layer{
  font-size: .16rem !important;
  line-height: .6rem !important;
  height: .6rem !important
}
._v-container>._v-content>.loading-layer .spinner-holder .text, ._v-container>._v-content>.pull-to-refresh-layer .spinner-holder .text{
  font-size: .16rem !important;
}

/* 更改环形进度条默认样式
*/
.item .van-circle__text{
  color:#fe7998;
  font-size: .28rem
}
</style>
