<template>
    <div class="back" id="content">
      <PullRefresh v-model="isLoading" @refresh="onRefresh" class="scroller_content">
        <div v-for="(el, index) in getChatMessage" :key="index" class="scroller_item" v-show="loading">
          <div v-if='el.type === "msg" ' v-text="el.context" style="color:#918d8d"></div>
          <left-content v-else-if="el.sendUserId !== user.id" :item="el"></left-content>
          <right-content v-else-if="el.sendUserId === user.id" :item="el"></right-content>
        </div>
      </PullRefresh>
    </div>
</template>

<script>
import { PullRefresh } from 'vant'
import LeftContent from './LeftContent'
import RightContent from './RightContent'
import utils from '@/assets/common/utils'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      isToBottom: true,
      isLoading: false,
      loading: true
    }
  },
  components: {
    LeftContent,
    RightContent,
    PullRefresh
  },
  computed: {
    ...mapState({
        user: state => state.IM.user,
        friend: state => state.IM.friend
    }),
    ...mapGetters([
      'getChatMessage'
    ])
  },
  watch: {
    'getChatMessage': function (arr) {
      if(this.isToBottom){
        // 将滚动条置为底部
        this.scrollToBottom()
      }
    }
  },
  mounted () {
    // 将滚动条置为底部
    this.scrollToBottom();
    if(this.friend.context && this.getChatMessage.length === 0){
      this.onRefresh()
    }
  },
  methods: {
    ...mapActions(['GET_FRIEND_MSG_LIST']),
    scrollToBottom () {
       this.$nextTick(() => {
        var container = this.$el.querySelector(".scroller_content");
        var content = document.getElementById('content')
        content.scrollTop = container.scrollHeight;
      })
    },
    onRefresh () {
      var container = this.$el.querySelector(".scroller_content");
      var scrollHeight = container.scrollHeight;
      this.isToBottom = false
      this.GET_FRIEND_MSG_LIST().then(() => {
          this.loading = true
          this.isToBottom = true
          this.$nextTick(() => {
          this.isLoading = false;
            var content = document.getElementById('content')
              content.scrollTop = container.scrollHeight - scrollHeight
          })
      })
      window.setTimeout(() => {
        this.isLoading = false
      }, 500)
    },
  }
}
</script>
 
<style scoped>
.van-pull-refresh{
  min-height: 100%
}
.back{
  position: relative;
  top: 46px;
  left:0 ;
  height: calc(100% - 1.1rem - 45px);
  width: 100%;
  background-color: #f5f5f6;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  overflow:hidden;
  overflow-y: scroll;
}
.scroller_item{
  padding-top:.1rem;
  padding-bottom:.3rem;
  box-sizing: border-box;
}
</style>
