<template>
    <div class="back" id="content">
      <div>
        <div v-for="(el, index) in recordList" :key="index">
          <left-content v-if="el.msgType === 1" :item="el"></left-content>
          <right-content v-if="el.msgType === 2" :item="el"></right-content>
        </div>
      </div>
    </div>
</template>

<script>
import LeftContent from './LeftContent'
import RightContent from './RightContent'
import utils from '@/common/utils'
import { mapGetters } from 'vuex'
export default {
  props: ['username'],
  data () {
    return {
      recordList: []
    }
  },
  components: {
    LeftContent,
    RightContent
  },
  computed: {
    ...mapGetters(['getContentMsg'])
  },
  methods: {
    // 获取当前消息列表
    getRecord (username) {
      this.$store.dispatch('getMsg').then(() => {
        console.log('getMsg之后的回调')
        this.recordList = utils.arraySort(this.getContentMsg, 'time', 15)
        this.$nextTick(() => {
          // 将滚动条置为底部
          this.scrollToBottom()
        })
      })
    },
    scrollToBottom () {
      var dome = document.getElementById('content')
      console.log(dome.scrollTop, dome.scrollHeight, '我擦')
      dome.scrollTop = dome.scrollHeight
    }
  },
  mounted () {
    // 获取当前信息列表
    this.getRecord(localStorage.getItem('username'))
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
