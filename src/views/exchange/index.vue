<template>
  <div class="exchange">
    <Head :title="item.nickName"></Head>
    <Content :id="item.id"></Content>
    <Send :id="item.id"></Send>
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
