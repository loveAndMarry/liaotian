<template>
  <div>
    <keep-alive exclude="tabs,tabbar">
      <router-view  v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view  v-if="!$route.meta.keepAlive"></router-view>
    
    <router-view name='tabbar'></router-view>
  </div>
</template>

<script>

export default {
  name: 'home'
}
</script>

<style scoped>

</style>
