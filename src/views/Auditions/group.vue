<template>
  <div>
    <NavBar left-arrow @click-left="onClickLeft">
      <span slot="title">{{admin[0].nickName + '的海选'}} (<i style="color: #ff7a99;font-style: initial;">{{memberList.length}}人</i>)</span>
      <i class="friendList" slot="right" @click="$router.push({name: 'groupList'})"/>
    </NavBar>
    <div class="service_content"  id="content">
      <PullRefresh  v-model="isLoading" @refresh="onRefresh" class="scroller_content" :disabled="isDisabled">
        <div v-for="(el, index) in messageList" :key="index" class="scroller_item" v-show="loading">
          <div v-if='el.type === "msg" ' v-text="el.context" style="color:#918d8d"></div>
          <left-content v-else-if="el.sendUserId !== user.id" :item="el"></left-content>
          <right-content v-else-if="el.sendUserId === user.id" :item="el"></right-content>
        </div>
        <div :style="{height: HEIGHT}"></div>
      </PullRefresh>
    </div>
    <div class="service_btn">
      <input type="text" class="submit_input" placeholder="输入后点击回车发送内容" @keyup.enter="postMsg" v-model="context">
      <span class="postMsg" @click="postMsg">发送</span>
    </div>
  </div>
</template>
<script>
import { NavBar ,PullRefresh} from 'vant'
import { mapState , mapGetters , mapActions} from 'vuex'
import utils from '@/assets/common/utils'
import LeftContent from './components/LeftContent'
import RightContent from './components/RightContent'
export default {
  components: {
    NavBar,
    PullRefresh,
    LeftContent,
    RightContent
  },
  data () {
    return {
      context: '',
      loading: true, // 下拉刷新的内容是否加载完成 
      isLoading: false, // 下拉刷新是否完成
      isDisabled: false, // 数据是否加载完毕
      limitStart: 0,
      pageSize: 10,
      isToBottom: true
    }
  },
  mounted () {
    this.scrollToBottom()
  },
  computed: {
    ...mapState({
      user: state => state.IM.user
    }),
    ...mapGetters([
      'messageList',
      'memberList',
      'admin'
    ]),
    HEIGHT () {
      return this.messageList.length <= 7 ? ((7 - this.messageList.length) * 1.4) + 'rem' : '0rem'
    }
  },
  watch: {
    'messageList': function (arr) {
      if(this.isToBottom){
        // 将滚动条置为底部
        this.scrollToBottom()
      }
    }
  },
  methods: {
    ...mapActions(['getGroupMessage','postGroupMsg']),
    scrollToBottom () {
       this.$nextTick(() => {
        var container = this.$el.querySelector(".scroller_content");
        var content = document.getElementById('content')
        content.scrollTop = container.scrollHeight;
      })
    },
    onClickLeft () {
      this.$router.back()
    },
    postMsg () {
      if(this.context.replace(/\s+/g, '') === ''){
        return false
      }
      console.log(utils.utf16toEntities(this.context),'群聊')
      this.postGroupMsg({
        context: utils.utf16toEntities(this.context),
        sendUserId: this.user.id,
        chatDate: new Date().getTime(),
        msgType: 1,
        userHead: this.$store.state.IM.user.userHead
      }).then(() => {
        this.context = ''
      })
    },
    onRefresh () {
      var container = this.$el.querySelector(".scroller_content");
      var scrollHeight = container.scrollHeight;
      this.isToBottom = false
      this.loading = false
      this.getGroupMessage().then(res => {
        if(!res || res.length === 0) {
          this.isDisabled = true
        }
        console.log(this.messageList)
        this.loading = true
        this.isToBottom = true
        this.$nextTick(() => {
          this.isLoading = false;
          var content = document.getElementById('content')
          content.scrollTop = container.scrollHeight - scrollHeight
        })
      })
    }
  }
}
</script>

<style scoped>
.friendList{
  display: block;
  background-image: url('../../assets/images/members.png');
  background-repeat: no-repeat;
  background-size: 100%;
  width: .4rem;
  height: .4rem;
  transform: translate(0, -50%);
}
.service_content{
  height: calc( 100% - 46px - .8rem);
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.submit_input{
  border:1px solid #f0f0f1;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  background-color: #f5f5f6;
  color:#333;
  font-size: .27rem;
  padding: 0 .24rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  position: absolute;
  top: .1rem;
  left: .1rem;
  height: calc( 100% - .2rem);
  width: calc(100% - 1rem);

}
.service_btn{
  position: fixed;
  height: .8rem;
  bottom: 0;
  width: 100%;
  left: 0;
  background: #fff;
  padding: .1rem;
  box-sizing: border-box;
}
.postMsg{
  float: right;
  line-height: .6rem;
  font-size: .28rem;
  color: #f32e2e;
  width: .8rem;
}
</style>
