<template>
  <div>
    <NavBar left-arrow @click-left="onClickLeft">
      <span slot="title">{{admin[0].nickName + '的海选'}} (<i style="color: #ff7a99;font-style: initial;">{{memberList.length}}人</i>)</span>
      <i class="friendList" slot="right" @click="$router.push({name: 'groupList'})"/>
    </NavBar>
    <div class="service_content"  id="content" @click="hideContent">
      <PullRefresh  v-model="isLoading" @refresh="onRefresh" class="scroller_content" :disabled="isDisabled">
        <div v-for="(el, index) in messageList" :key="index" class="scroller_item" v-show="loading">
          <div v-if='el.type === "msg" ' v-text="el.context" style="color:#918d8d"></div>
          <left-content v-else-if="el.sendUserId !== user.id" :item="el" :images='el.userHead'></left-content>
          <right-content v-else-if="el.sendUserId === user.id" :item="el" :images='el.userHead'></right-content>
        </div>
        <div :style="{height: HEIGHT}"></div>
      </PullRefresh>
    </div>
    <!-- <div class="service_btn"> -->
      <!-- <input type="text" class="submit_input" placeholder="输入后点击回车发送内容" @keyup.enter="postMsg" v-model="context">
      <span class="postMsg" @click="postMsg">发送</span> -->
      <div class="bottom">
        <div style="height: 0.9rem;line-height: 0.9rem;text-align:left">
          <div class="inputText">
            <input type="text" placeholder="输入后点击回车发送内容" @keyup.enter="postMsg" v-model="context">
          </div>
          <div class="icon biaoqing" @click="emotion"></div>
          <div class="icon tianjia" @click="GiftShow" v-show="!isContext"></div>
          <div  class="submitMsg" @click="postMsg" v-show="isContext">发送</div>
        </div>
        <emotion @emotion="pushContent" v-show="isShow"></emotion>
        <Gift v-show="isGiftShow" @hideGift="GiftShow" type="2"></Gift>
      </div>
    <!-- </div> -->
  </div>
</template>
<script>
import { NavBar ,PullRefresh} from 'vant'
import { mapState , mapGetters , mapActions} from 'vuex'
import utils from '@/assets/common/utils'
import LeftContent from '../../views/exchange/components/LeftContent'
import RightContent from '../../views/exchange/components/RightContent'
import emotion from '../../views/exchange/components/Emotion'
import Gift from '../../views/exchange/components/utils/gift'
export default {
  components: {
    NavBar,
    PullRefresh,
    LeftContent,
    RightContent,
    emotion,
    Gift
  },
  data () {
    return {
      context: '',
      loading: true, // 下拉刷新的内容是否加载完成 
      isLoading: false, // 下拉刷新是否完成
      isDisabled: false, // 数据是否加载完毕
      limitStart: 0,
      pageSize: 10,
      isToBottom: true,
      isContext: false,
      isShow: false, // 表情
      isGiftShow:false, // 礼物
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
    },
    'context' (val) {
      if(val.replace(/ /g, '') !== ''){
        this.isContext = true
      } else {
        this.isContext = false
      }
    }
  },
  methods: {
    ...mapActions(['getGroupMessage','postGroupMsg']),
    hideContent () {
      this.isShow = false;
      this.isGiftShow = false
      this.editHeight(false)
    },
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
      if(this.context.length > 128) {
        Toast({
          message: '字数请控制在128位数之内',
          duration: 1000
        });
        return false
      }
      if( this.context.replace(/ /g, '') === ''){
        return false
      }
      this.postGroupMsg({
        context: utils.utf16toEntities(this.context),
        sendUserId: this.user.id,
        chatDate: new Date().getTime(),
        type: '1',
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
        this.loading = true
        this.isToBottom = true
        this.$nextTick(() => {
          this.isLoading = false;
          var content = document.getElementById('content')
          content.scrollTop = container.scrollHeight - scrollHeight
        })
      })
    },
    emotion () {
      if (this.isShow) {
        this.isShow = false
      } else {
        this.isGiftShow = false
        this.isShow = true
      }
       this.editHeight(this.isShow)
    },
    GiftShow () {
      if (this.isGiftShow) {
        this.isGiftShow = false
      } else {
        this.isShow = false
        this.isGiftShow = true
      }
      this.editHeight(this.isGiftShow)
    },
    pushContent (i) {
      this.context = this.context + i
    },
    editHeight (isShow) {
      var content = document.getElementById('content')
      if (isShow) {
        content.style.height = 'calc(100% - 4.8rem - 46px)'
      } else {
        content.style.height = 'calc(100% - 1.1rem - 46px)'
      }
      this.scrollToBottom()
    }
  }
}
</script>

<style scoped>
.scroller_item {
  padding-top: .1rem;
  padding-bottom: .3rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  clear: both;
}
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
  height: calc( 100% - 46px - 1.1rem);
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background-color: #f5f5f6;
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
/* .service_btn{
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
} */

.submitMsg{
  width: .63rem;
  text-align: center;
  background-color: #fe5c8d;
  color: #fff;
  vertical-align: 0.21rem;
  border-radius: .05rem;
  padding: 0 .08rem;
  font-size: .28rem;
  line-height: 30px;
  display: inline-block;
  transform: translateY(-.15rem);
  -webkit-transform: translateY(-.15rem);
  box-shadow: 1px 1px 1px #8d8d8d
}
.bottom{
  width: 100%;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0.1rem .2rem;;
  box-sizing: border-box;
  -webkit-box-sizing: border-box; 
  background-color: #f0f0f0;
}

.bottom .inputText{
  width: calc(100% - 1.66rem);
  display: inline-block;
  height: 100%;
  position: relative;
}

.bottom .inputText input{
  border:1px solid #f0f0f1;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  background-color: #f5f5f6;
  color:#333;
  font-size: .32rem;
  padding: 0 .24rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #fff;
}
.bottom .inputText span{
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
  top: 0;
  left: 0;
  height: 100%;
  width: 100%
}
.bottom .inputText input::-webkit-input-placeholder{
  color: #c3c3c3
}
.icon{
  width: .58rem;
  height: .58rem;
  line-height: .92rem;
  display: inline-block;
  vertical-align: .03rem;
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: .14rem
}
.yuyin{
  background-image: url('../../assets/images/yuyin.png');
  margin-right: .1rem;
}
.jianpan{
  background-image: url('../../assets/images/jianpan.png');
  margin-right: .1rem;
}
.biaoqing{
  background-image: url('../../assets/images/biaoqing.png');
  margin-left: .1rem
}
.tianjia{
  background-image: url('../../assets/images/tianjia.png');
  margin-left: .1rem
}
.send{
  width: .63rem;
  line-height: .8rem;
  height: 100%;
  display: inline-block;
  vertical-align: .2rem;
  margin-left: .1rem;
  color: #f44;
  font-size: .30rem
}
</style>
