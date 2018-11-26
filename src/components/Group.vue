<template>
  <div class="group">
      <div class="group_title" v-text="title"></div>
      <div style="position: relative;"><slot></slot></div>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style scoped>
.group{
  padding:.2rem .3rem;
  border-bottom: .09rem solid #f0f0f0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.group_title{
  font-size: .28rem;
  color:#363636;
  text-align: left
}
</style>
