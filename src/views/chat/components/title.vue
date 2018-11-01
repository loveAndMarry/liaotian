<template>
    <div class="title">
        <div class="title_header">
            <span v-for='(el, index) in tabs' :key="index" v-text="el" :class="{active:num == index}" @click="activeChild(index)"></span>
        </div>
        <img src="../../../assets/images/xiaoxi.png" alt="消息" class="xiaoxi">
    </div>
</template>

<script>
export default {
  props: ['number'],
  data () {
    return {
      msg: '',
      tabs: ['联系人', '聊天'],
      num: this.number
    }
  },
  methods: {
    activeChild (index) {
      this.num = index
      this.$emit('input', index)
    }
  }
}
</script>

<style scoped>
.title {
  width: 100%;
  height: 1.35rem;
  background-color: #53cac3;
  position: fixed;
  z-index: 1000;
}
.title .title_header {
  width: 2.8rem;
  height: 0.6rem;
  border: 2px solid #fff;
  border-radius: 5px;
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -80%);
  background-color: #fff;
  overflow: hidden;
}
.title .title_header span {
  display: block;
  float: left;
  width: 50%;
  height: 100%;
  font-size: 0.25rem;
  line-height: 0.6rem;
  text-align: center;
  color: #fff;
  background-color: #53cac3;
}
.title .title_header span.active {
  background-color: #fff;
  color: #53cac3;
}
.xiaoxi {
  position: absolute;
  top: 80%;
  right: 5%;
  width: 0.5rem;
  transform: translate(0, -80%);
}
</style>
