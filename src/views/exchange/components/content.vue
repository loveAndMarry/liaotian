<template>
    <div class="back" id="content">
      <div>
        <div v-for="(el, index) in recordList" :key="index">
          <left-content v-if="el.msgType === 1"></left-content>
          <right-content v-if="el.msgType === 2"></right-content>
        </div>
      </div>
    </div>
</template>

<script>
import LeftContent from './LeftContent'
import RightContent from './RightContent'
import utils from '@/common/utils'
export default {
  props: ['id'],
  data () {
    return {
      recordList: []
    }
  },
  components: {
    LeftContent,
    RightContent
  },
  methods: {
    // 获取当前消息列表
    getRecord () {
      this.recordList = utils.arraySort((JSON.parse(localStorage.getItem('record')))[this.id],'time',15)
    },
    scrollToBottom () {
        var dome = document.getElementById('content')
        dome.scrollTop = dome.scrollHeight
    }
  },
  mounted () {
    // 将滚动条置为底部
    this.$nextTick(()=> {
      this.scrollToBottom();
      // 获取当前信息列表
      this.getRecord()
    })
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
