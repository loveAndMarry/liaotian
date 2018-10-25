<template>
  <div id="app">
    <transition :name="transitionName">
        <router-view class="Router"/>
    </transition>
    <router-view name="tabber"/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      transitionName: "slide-right" // 默认动态路由变化为slide-right
    };
  },
  watch: {
    $route(to, from) {
      let isBack = this.$router.isBack; //  监听路由变化时的状态为前进还是后退
      if (isBack) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
      this.$router.isBack = false;
    }
  }
};

document.documentElement.style.fontSize =
  (document.documentElement.clientWidth / 750) * 100 + "px";
</script>

<style>
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

.Router {
  position: absolute;
  width: 100%;
  transition: all 0.8s ease;
  top:0;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
}
</style>
