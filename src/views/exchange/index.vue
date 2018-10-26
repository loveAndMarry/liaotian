<template>
  <div class="exchange">
    <Head title="张某某"></Head>
    <Content></Content>
    <Send></Send>
  </div>
</template>

<script>
import Head from './components/head'
import Send from './components/send'
import Content from './components/content'
export default {
  name: 'exchange',
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
