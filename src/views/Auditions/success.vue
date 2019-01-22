<template>
  <div class="successContent" :style="{'background-image': 'url(' + img1 + ')'}">
    <div style="height: 100%;background-color: rgba(0,0,0,.7);">
      <NavBar left-arrow @click-left="onClickLeft" :border="false"/>
      <div style="height: calc(100% - 46px);overflow-y: scroll;overflow-x: hidden">
        <div class="img_group">
          <img :src="img1" alt="">
          <img :src="img2" alt="">
        </div>
        <p class="success_title">你和棉花糖配对成功了~</p>
        <h3 class="success_hint">恭喜你<br/>配对成功！</h3>
      </div>
    </div>
  </div>
</template>
<script>
import { NavBar } from 'vant'
export default {
  components: {
    NavBar
  },
  data () {
    return {
      img1: "http://yuanimg.minmai1688.com/icon_20190102092733?imageMogr2/auto-orient",
      img2: "http://yuanimg.minmai1688.com/Fq9p5e8eIPzc3pykJoNqNzaij26X"
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>
<style scoped>
.success_title{
  margin-top: .7rem;
  margin-bottom: 0;
  font-size: .28rem;
  color: #fefefe;
  text-align: center
}
.success_hint{
  font-size: .86rem;
  color: #fc7093;
  margin-bottom: 0;
  margin-top: 1.66rem

}
.successContent{
  background-repeat: no-repeat;
  background-size: auto 100%
}

.van-nav-bar{
  background-color: transparent
}
.img_group {
  position: relative;
  margin-top: 1.12rem
}

.img_group img{
  width: 2.67rem;
  height: 2.67rem;
  border: 1px solid #fbfbfb;
  border-radius: 50%
}
.img_group img:nth-child(1){
  transform: translate(10%);
}
.img_group img:nth-child(2){
  transform: translate(-10%);
}
</style>
