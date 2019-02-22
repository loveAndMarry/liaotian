<template>
  <div class="exchange">
    <Head></Head>
    <Content id="content" ref="content" @click="contentClick"></Content>
    <Send @editHeight="editHeight" ref="send"></Send>
  </div>
</template>

<script>
import Head from './components/head'
import Send from './components/send'
import Content from './components/content'
import { mapGetters } from 'vuex'
export default {
  name: 'exchange',
  mounted () {
    var that = this
    var winHeight = document.documentElement.clientHeight || document.body.clientHeight;   //获取当前页面高度
    var content = document.getElementById('content')
    window.onresize = function(){
      var thisHeight = document.documentElement.clientHeight || document.body.clientHeight
      var num = (winHeight - 0) - (thisHeight - 0)
        if(num > 50){
            //当软键盘弹出，在这里面操作
            console.log('软键盘弹起')
            that.$refs.send.isShow = false
            that.$refs.send.isGiftShow = false
            that.editHeight(false)
            //content.style.height = 'calc(100% - 1.1rem - 45px)'
        }else{
            //当软键盘收起，在此处操作
            console.log('软键盘收起')
        }
    }
  },
  methods: {
    editHeight (isShow) {
      var content = document.getElementById('content')
      if (isShow) {
        content.style.height = 'calc(100% - 4.6rem - 45px)'
      } else {
        content.style.height = 'calc(100% - 1.1rem - 45px)'
      }
      this.$refs.content.scrollToBottom()
    },
    contentClick () {
      this.$refs.send.isShow = false;
      this.$refs.send.isGiftShow = false;
      this.editHeight(false)
    }
  },
  components: {
    Head,
    Send,
    Content
  },
}
</script>

<style scoped>
.exchange{
  width: 100%;
  height:100%;
  background: #000;
  position: relative;
}
</style>
