<template>
    <div class="back" id="content">
        <scroller :on-refresh="refresh" ref="scroller">
            <div v-for="(el, index) in getChatMessage" :key="index" style="padding-top:.1rem;padding-bottom:.3rem;box-sizing: border-box;">
              <left-content v-if="el.sender !== user.accountNumber" :item="el"></left-content>
              <right-content v-if="el.sender === user.accountNumber" :item="el"></right-content>
            </div>
        </scroller>
    </div>
</template>

<script>
import LeftContent from './LeftContent'
import RightContent from './RightContent'
import utils from '@/assets/common/utils'
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {}
  },
  components: {
    LeftContent,
    RightContent
  },
  computed: {
    ...mapState({
        user: state => state.IM.user
    }),
    ...mapGetters([
      'getChatMessage'
    ])
  },
  mounted () {
    console.log(this.getChatMessage)
  },
  watch: {
    'getChatMessage': function (arr) {
      // 将滚动条置为底部
      this.scrollToBottom()
    }
  },
  mounted () {
    // 将滚动条置为底部
    this.scrollToBottom()
  },
  methods: {
    scrollToBottom () {
       this.$nextTick(() => {
        this.$refs.scroller.resize()
        this.$refs.scroller.scrollTo(0,this.$refs.scroller.content.clientHeight ,false)
      })
    },
    refresh () {
       window.setTimeout(()=>{
        this.$refs.scroller.finishPullToRefresh(true)
      },3000)
      console.log(arguments,'refresh')
      return false
    },
  }
}
</script>
 
<style scoped>
  .back{
    position: relative;
    top: .01rem;
    left:0 ;
    height: calc(100% - 1.1rem - 46px);
    width: 100%;
    background-color: #f5f5f6;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    overflow:hidden;
  }
</style>
