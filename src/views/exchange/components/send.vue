<template>
    <div class="bottom">
      <div style="height: 0.9rem;line-height: 0.9rem;text-align:left">
        <!-- <div class="icon yuyin" @click="voice($event)"></div> -->
        <div class="inputText">
          <input type="text" v-show='isText' placeholder="输入后点击回车发送内容" @keyup.enter="postMsg" v-model="context" @blur="onBlur">
          <span v-show='!isText' @touchstart="touchstart($event)" @touchend="touchend($event)">按住 说话</span>
        </div>
        <div class="icon biaoqing" @click="emotion"></div>
        <div class="icon tianjia" @click="GiftShow" v-show="!isContext"></div>
        <!-- <div class="send" @click="postMsg">发送</div> -->
        <div  class="submitMsg" @click="postMsg" v-show="isContext">发送</div>
        <!-- <div class="send" @click="postMsg">发送</div> -->
        <!-- <input type="file" id="file" style="display:none" accept="image/*" @change="fileChange($event)"> -->
      </div>
      <emotion @emotion="pushContent" v-show="isShow"></emotion>
      <Gift v-show="isGiftShow" @hideGift="GiftShow" type="1"></Gift>
    </div>
</template>

<script>
import { Button, Toast } from 'vant'
import utils from '@/assets/common/utils'
import {mapState ,mapActions } from 'vuex'
import emotion from './Emotion'
import Gift from './utils/gift'
export default {
  data () {
    return {
      context: '',
      isContext: false, // 文本框是否有内容
      isShow: false, // 表情
      isGiftShow:false, // 礼物
      isText: true, // 默认展示输入文字
    }
  },
  components: {
    emotion,
    Gift,
    Button
  },
  methods: {
    ...mapActions([
      'POSTMSG'
    ]),
    onBlur () {
      this.isShow = false
      this.isGiftShow = false
    },
    // 按住说话事件
    touchstart ($event) {
      $event.target.innerText = '松开 结束'
    },
    // 松开事件
    touchend ($event) {
      $event.target.innerText = '按住 说话'
    },
    pushContent (i) {
      this.context = this.context + i
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
        this.$emit('editHeight', false)
        this.isShow = false
      } else {
        this.$emit('editHeight', true)
        this.isGiftShow = false
        this.isShow = true
      }
    },
    GiftShow () {
      // this.$toast('功能正在开发中...')
      // return false
      if (this.isGiftShow) {
        this.$emit('editHeight', false)
        this.isGiftShow = false
      } else {
        this.$emit('editHeight', true)
        this.isShow = false
        this.isGiftShow = true
      }
      
    },
    postMsg (i) {
      if(this.context.length > 128) {
        Toast({
          message: '字数请控制在128位数之内',
          duration: 1000
        })
        return false
      }
      if( this.context.replace(/ /g, '') !== ''){
        var that = this
        this.isShow = false
        this.$emit('editHeight', this.isShow)
        this.POSTMSG({
          context: utils.utf16toEntities(this.context),
          id: new Date().getTime(),
          receiver:that.friend.accountNumber,
          sender: that.user.accountNumber,
          sendUserId: that.user.id,
          receiveUserId: that.friend.userId,
          time: new Date().getTime(),
          chatDate: new Date().getTime(),
          status: 1, // 当前信息提交状态
          userHead: this.user.userHead,
          type: '1'
        }).then((res) => {
          that.context = ''
          this.isContext = false
        }).catch(res => {
          that.context = ''
          this.isContext = false
        })
      }
    }
  },
  watch: {
    context (val) {
      if(val.replace(/ /g, '') !== ''){
        this.isContext = true
      } else {
        this.isContext = false
      }
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
  -webkit-touch-callout: all;
  -webkit-user-select: all;
  -moz-user-select: all;
  -ms-user-select: all;
  user-select: all;
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
