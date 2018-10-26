<template>
    <div class="back" id="content">
      <div>
        <left-content></left-content>
        <right-content></right-content>
        <left-content></left-content>
        <right-content></right-content>
        <left-content></left-content>
        <right-content></right-content>
        <left-content></left-content>
        <right-content></right-content>
        <left-content></left-content>
        <right-content></right-content>
        <left-content></left-content>
        <right-content></right-content>
        <left-content></left-content>
      </div>
    </div>
</template>

<script>
import LeftContent from './LeftContent'
import RightContent from './RightContent'
export default {
  components: {
    LeftContent,
    RightContent
  },
  methods: {
    scrollToBottom () {
      this.$nextTick(() => {
        var dome = document.getElementById('content')
        dome.scrollTop = dome.scrollHeight
      })
    }
  },
  mounted () {
    this.scrollToBottom()
  }
}
</script>

<style scoped>
  .back{
    position: absolute;
    top: 46px;
    bottom: 1.1rem;
    height: calc(100% - 1.1rem - 46px);
    width: 100%;
    padding: 0 .3rem;
    background-color: #f5f5f6;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding-bottom: .2rem;
    overflow-y: scroll;
  }
</style>
