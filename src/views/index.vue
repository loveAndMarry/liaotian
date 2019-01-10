<template>
  <div>
    <keep-alive exclude="tabs,tabbar,ListItem">
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
