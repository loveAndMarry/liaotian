<template>
    <div class="bottom">
      <div style="height: 0.7rem;line-height: 0.7rem;">
        <div class="icon yuyin" @click="voice($event)"></div>
        <div class="inputText">
          <input type="text" v-show='isText' placeholder="输入后点击回车发送内容" @keyup.enter="postMsg()" v-model="context">
          <span v-show='!isText' @touchstart="touchstart($event)" @touchend="touchend($event)">按住 说话</span>
        </div>
        <div class="icon biaoqing" @click="emotion"></div>
        <div class="icon tianjia" @click="GiftShow"></div>
        <!-- <input type="file" id="file" style="display:none" accept="image/*" @change="fileChange($event)"> -->
      </div>
      <emotion @emotion="postMsg" v-show="isShow"></emotion>
      <Gift v-show="isGiftShow"></Gift>
    </div>
</template>

<script>
import utils from '@/assets/common/utils'
import {mapState ,mapActions } from 'vuex'
import emotion from './Emotion'
import Gift from './utils/gift'
export default {
  data () {
    return {
      context: '',
      isShow: false, // 表情
      isGiftShow:false, // 礼物
      isText: true, // 默认展示输入文字
    }
  },
  components: {
    emotion,
    Gift
  },
  methods: {
    ...mapActions([
      'POSTMSG'
    ]),
    // 按住说话事件
    touchstart ($event) {
      $event.target.innerText = '松开 结束'
    },
    // 松开事件
    touchend ($event) {
      $event.target.innerText = '按住 说话'
    },
    // 语音文本切换
    voice ($event) {
      if(!this.isText){
        $event.target.className = 'icon yuyin'
      } else {
        $event.target.className = 'icon jianpan'
      }
      this.isText = !this.isText;
    },
    emotion () {
      if (this.isShow) {
        this.isShow = false
      } else {
        this.isGiftShow = false
        this.isShow = true
      }
      this.$emit('editHeight', this.isShow)
    },
    GiftShow () {
      if (this.isGiftShow) {
        this.isGiftShow = false
      } else {
        this.isShow = false
        this.isGiftShow = true
      }
      this.$emit('editHeight', this.isGiftShow)
    },
    postMsg (i) {
      var context = typeof i === 'undefined'? this.context: i
      var that = this
      this.isShow = false
      this.$emit('editHeight', this.isShow)
      this.POSTMSG({
        context: context,
        id: new Date().getTime(),
        receiver:that.friend.accountNumber,
        sender: that.user.accountNumber,
        sendUserId: that.user.id,
        receiveUserId: that.friend.userId,
        time: new Date().getTime(),
        status: 1, // 当前信息提交状态
        userHead: this.user.userHead,
        msgType: 1
      }).then((res) => {
        that.context = ''
      })
    }
  },
  computed: {
     ...mapState({
       'user': state => state.IM.user,
       'friend': state => state.IM.friend,
     }),
  }
}
</script>

<style scoped>
.bottom{
  width: 100%;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: .2rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.bottom .inputText{
  width: calc(100% - 2.5rem);
  display: inline-block;
  height: 100%;
  position: relative;
}

.bottom .inputText input{
  border:1px solid #f0f0f1;
  border-radius: 3px;
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
.bottom .inputText span{
  border:1px solid #f0f0f1;
  border-radius: 3px;
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
}
.yuyin{
  background-image: url('../../../assets/images/yuyin.png');
  margin-right: .1rem;
}
.jianpan{
  background-image: url('../../../assets/images/jianpan.png');
  margin-right: .1rem;
}
.biaoqing{
  background-image: url('../../../assets/images/biaoqing.png');
  margin-left: .1rem
}
.tianjia{
  background-image: url('../../../assets/images/tianjia.png');
  width: .63rem;
  height: .63rem;
  margin-bottom: -0.02rem;
  margin-left: .1rem
}
</style>
