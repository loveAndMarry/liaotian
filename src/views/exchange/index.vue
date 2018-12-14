<template>
  <div class="exchange">
    <Head></Head>
    <Content id="content" ref="content"></Content>
    <Send @editHeight="editHeight"></Send>
  </div>
</template>

<script>
import Head from './components/head'
import Send from './components/send'
import Content from './components/content'
import { mapGetters } from 'vuex'
export default {
  name: 'exchange',
  data () {
    return {
      
    }
  },
  mounted () {
    var that = this
    var winHeight = document.documentElement.clientHeight || document.body.clientHeight;   //获取当前页面高度
    var content = document.getElementById('content')
    $(window).resize(function(){
      var thisHeight = document.documentElement.clientHeight || document.body.clientHeight
      var num = (winHeight - 0) - (thisHeight - 0)
        if(num > 50){
            //当软键盘弹出，在这里面操作
            console.log('软键盘弹起')
            that.editHeight(false)
            this.$refs.content.isShow = false
            this.$refs.content.isGiftShow = false
            content.style.height = 'calc(100% - 1.1rem - 46px)'
            // console.log(that)
            // that.$refs.content.resize()

            // // that.$refs.content.scrollToBottom()
            // console.log('-' + (num - 46) + 'px')
            // content.style.top =  '-46px'
            // content.style.bottom = '0'
        }else{
            //当软键盘收起，在此处操作
            console.log('软键盘收起')
            // content.style.top = 46 + 'px'
            // that.$refs.content.resize()
            // that.$refs.content.scrollToBottom()
            // content.style.height = 'calc(100% - 1.1rem - 46px)'
            // content.style.bottom = '0'
        }
    })
  },
  methods: {
    editHeight (isShow) {
      var content = document.getElementById('content')
      if (isShow) {
        content.style.height = 'calc(100% - 3.6rem - 46px)'
      } else {
        content.style.height = 'calc(100% - 1.1rem - 46px)'
      }
      this.$refs.content.scrollToBottom()
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
