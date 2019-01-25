<template>
  <div>
    <div slot="NavBar">
      <NavBar left-arrow @click-left="onClickLeft" :title="title"/>
    </div>
    <div class="container_content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
export default {
  props: {
    title: {
      type: String
    }
  },
  components: {
    NavBar
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>
<style scoped>
.container_content{
  height: calc(100% - 46px)
}
</style>
