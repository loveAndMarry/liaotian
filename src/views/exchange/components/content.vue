<template>
    <div class="back" id="content">
      <div>
        <scroller :on-infinite="infinite"  :on-refresh="refresh" ref="scroller">
          <div v-for="(el, index) in rocerd" :key="index">
            <left-content v-if="el.msgType === 1" :item="el"></left-content>
            <right-content v-if="el.msgType === 2" :item="el"></right-content>
          </div>
        </scroller>
      </div>
    </div>
</template>

<script>
import LeftContent from './LeftContent'
import RightContent from './RightContent'
import utils from '@/assets/common/utils'
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
    rocerd () {
      return utils.arraySort(this.$store.state.rocerd, 'time', 15)
    }
  },
  watch: {
    'rocerd': function (arr) {
      console.log(this, 'this')
      console.log('1346546546565')
      console.log(arr, '改变之后的值')
      this.$nextTick(() => {
        // 将滚动条置为底部
        this.scrollToBottom()
      })
    }
  },
  methods: {
    // 获取当前消息列表
    getRecord (username) {
      this.$store.dispatch('getContentMsg').then(() => {
        console.log('getContentMsg之后的回调')
        console.log(this.rocerd)
        // this.recordList = utils.arraySort(this.rocerd, 'time', 15)
        this.$nextTick(() => {
          // 将滚动条置为底部
          this.scrollToBottom()
        })
      })
    },
    scrollToBottom () {
      var dome = document.getElementById('content')
      dome.scrollTop = dome.scrollHeight
    },
    infinite () {
       window.setTimeout(()=>{
        this.$refs.scroller.finishInfinite(true)
      },3000)
      console.log(arguments,'infinite')
      return false
    },
    refresh () {
       window.setTimeout(()=>{
        this.$refs.scroller.finishPullToRefresh()
      },3000)
      console.log(arguments,'refresh')
      return false
    },
  },
  mounted () {
    // 获取当前信息列表
    this.getRecord()
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
