<template>
    <div class="back" id="content">
        <scroller :on-refresh="refresh" ref="scroller" refreshText='下拉加载'>
            <div v-for="(el, index) in getChatMessage" :key="index" style="padding-top:.1rem;padding-bottom:.3rem;box-sizing: border-box;">
              <div v-if='el.type === "msg" ' v-text="el.context" style="color:#918d8d"></div>
              <left-content v-else-if="el.sendUserId !== user.id" :item="el"></left-content>
              <right-content v-else-if="el.sendUserId === user.id" :item="el"></right-content>
            </div>
        </scroller>
    </div>
</template>

<script>
import LeftContent from './LeftContent'
import RightContent from './RightContent'
import utils from '@/assets/common/utils'
import { mapState, mapGetters, mapActions } from 'vuex'

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
    ...mapActions(['GET_FRIEND_MSG_LIST']),
    scrollToBottom () {
       this.$nextTick(() => {
        this.$refs.scroller.resize()
        this.$refs.scroller.scrollTo(0,this.$refs.scroller.content.clientHeight ,false)
      })
    },
    refresh (done) {
       this.GET_FRIEND_MSG_LIST(done).then(() => {
         this.$refs.scroller.scrollTo(0,0 ,false)
       })
    },
  }
}
</script>
 
<style scoped>
  .back{
    position: relative;
    top: 0;
    left:0 ;
    height: calc(100% - 1.1rem - 46px);
    width: 100%;
    background-color: #f5f5f6;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    overflow:hidden;
  }
</style>
