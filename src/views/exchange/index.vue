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
  methods: {
    editHeight (isShow) {
      var content = document.getElementById('content')
      if (isShow) {
        content.style.height = 'calc(100% - 3.6rem - 46px)'
        content.style.bottom = '3.6rem'
      } else {
        content.style.height = 'calc(100% - 1.1rem - 46px)'
        content.style.bottom = '1.1rem'
      }
      this.$refs.content.scrollToBottom()
    }
  },
  computed: {
    item () {
      return JSON.parse(localStorage.getItem('friend'))
    },
    ...mapGetters([
      'getFrientList', // 获取好友列表
      'getChatMessage' // 获取好友消息列表
    ]),
  },
  components: {
    Head,
    Send,
    Content
  }
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
