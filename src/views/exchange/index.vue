<template>
  <div class="exchange">
    <Head :item="item"></Head>
    <Content :username="item.username" id="content" ref="content"></Content>
    <Send :username="item.username" @editHeight="editHeight"></Send>
  </div>
</template>

<script>
import Head from './components/head'
import Send from './components/send'
import Content from './components/content'
export default {
  name: 'exchange',
  data () {
    return {
      item: {}
    }
  },
  methods: {
    editHeight (isShow) {
      var content = document.getElementById('content')
      console.dir(content)
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
  mounted () {
    // 当前信息为好友信息
    this.item = this.$route.query
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
