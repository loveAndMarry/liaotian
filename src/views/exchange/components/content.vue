<template>
    <div class="back" id="content">
      <div>
        <scroller  :on-refresh="refresh" ref="scroller">
          <div v-for="(el, index) in chatMessage" :key="index">
            <left-content v-if="el.sender !== user.accountNumber" :item="el"></left-content>
            <right-content v-if="el.sender === user.accountNumber" :item="el"></right-content>
          </div>
        </scroller>
      </div>
    </div>
</template>

<script>
import LeftContent from './LeftContent'
import RightContent from './RightContent'
import utils from '@/assets/common/utils'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      
    }
  },
  components: {
    LeftContent,
    RightContent
  },
  computed: {
    ...mapState({
        user: state => state.IM.user,
        chatMessage: state => state.IM.chatMessage[state.IM.friend.accountNumber]
    }),
  },
  watch: {
    'chatMessage': function (arr) {
      this.$nextTick(() => {
        // 将滚动条置为底部
        this.scrollToBottom()
      })
    }
  },
  methods: {
    scrollToBottom () {
      var dome = document.getElementById('content')
      dome.scrollTop = dome.scrollHeight
    },
    refresh () {
       window.setTimeout(()=>{
        this.$refs.scroller.finishPullToRefresh()
      },3000)
      console.log(arguments,'refresh')
      return false
    },
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
    background-color: #f5f5f6;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding-bottom: .2rem;
    overflow-y: scroll;
  }
</style>
