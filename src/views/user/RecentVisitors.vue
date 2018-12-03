<template>
<div>
  <NavBar left-arrow @click-left="onClickLeft" @click-right="onClickRight" title="最近访问"/>
</div>
</template>

<script>
import { NavBar } from "vant"
export default {
  components: {
    NavBar
  },
   methods: {
    onClickLeft() {},
    onClickRight() {}
  },
}
</script>

<style scoped>

</style>
