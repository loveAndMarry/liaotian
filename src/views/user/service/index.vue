<template>
<div class="service">
  <NavBar left-arrow @click-left="onClickLeft" title='在线客服'/>
  <div class="service_content">

  </div>
  <div class="service_btn">
    <input type="text" class="submit_input" placeholder="输入后点击回车发送内容" @keyup.enter="postMsg" v-model="context">
    <span class="postMsg">发送</span>
  </div>
</div>
</template>
<script>
import { NavBar } from 'vant'
import LeftContent from '@/views/exchange/components/LeftContent'
import RightContent from '@/views/exchange/components/RightContent'
export default {
  data() {
    return {
      context: ''
    }
  },
  methods: {
    postMsg () {
      
    },
    onClickLeft() {
      this.$router.push({name: 'user'})
    }
  },
  components: {
    NavBar,
    LeftContent,
    RightContent
  }
}
</script>

<style scoped>
.service_content{
  height: calc( 100% - 46px - .8rem) 
}
.submit_input{
  border:1px solid #f0f0f1;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  background-color: #f5f5f6;
  color:#333;
  font-size: .27rem;
  padding: 0 .24rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  position: absolute;
  top: .1rem;
  left: .1rem;
  height: calc( 100% - .2rem);
  width: calc(100% - 1rem);

}
.service_btn{
  position: fixed;
  height: .8rem;
  bottom: 0;
  width: 100%;
  left: 0;
  background: #fff;
  padding: .1rem;
  box-sizing: border-box;
}
.postMsg{
  float: right;
  line-height: .6rem;
  font-size: .28rem;
  color: #f32e2e;
  width: .8rem;
}
</style>
