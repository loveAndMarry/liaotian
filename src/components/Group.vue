<template>
  <div class="group">
      <div class="group_title">{{title}}<span class="sanjiao" v-if="isRight" @click="RightClick">更多</span></div>
      <div style="position: relative;"><slot></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    isRight: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    RightClick () {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
div.group{
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
.sanjiao{
  font-size: .23rem;
  color: #8d8d8d;
  float: right;
}
.sanjiao::after{
  content: "";
  display: inline-block;
  height: .15rem;
  width: .15rem;
  border: 1px solid #8e8e8e;
  border-left: transparent;
  border-top: transparent;
  transform: rotate(-45deg);
  margin-left: .1rem;
  vertical-align: 0.03rem;
}
</style>
