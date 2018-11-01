<template>
    <div class="bottom">
      <div style="height: 0.7rem;line-height: 0.7rem;">
        <div class="inputText">
          <input type="text" placeholder="输入后点击回车发送内容" @keyup.enter="postMsg()" v-model="content">
        </div>
        <div class="icon biaoqing" @click="emotion"></div>
        <!-- <div class="icon tupian" @click="file"></div> -->
        <!-- <input type="file" id="file" style="display:none" accept="image/*" @change="fileChange($event)"> -->
      </div>
      <emotion @emotion="handleEmotion" v-show="isShow"></emotion>
    </div>
</template>

<script>
import utils from '@/common/utils'
import store from '@/store'
import emotion from './Emotion'
export default {
  props: ['username'],
  data () {
    return {
      content: '',
      isShow: false
    }
  },
  components: {
    emotion
  },
  methods: {
    // file () {
    //   var file = document.getElementById('file')
    //   file.click()
    // },
    // fileChange (e) {
    //   var files = e.target.files[0];
    //   console.log(files)
    //    var that = this
    //   // this.emotion()
    //   window.YTX.postMsg(4, files, this.username, function (res) {
    //     let record = {
    //       id: res.msgClientNo, // 服务器返回的消息ID
    //       content: files,
    //       type: 4,
    //       imgUrl: localStorage.getItem('portrait'),
    //       msgType: 2,
    //       time: new Date().getTime()
    //     }
    //     console.log(res, '$$$$$$$$$$$$$$$$$$$$$$')
    //     utils.pushStorage('notSubmitRocerd', that.username, record)

    //     store.dispatch('getContentMsg')
    //     // that.$emit('getContent', that.username)
    //   })
    // },
    emotion () {
      if (this.isShow) {
        this.isShow = false
      } else {
        this.isShow = true
      }
      this.$emit('editHeight', this.isShow)
    },
    handleEmotion (i) {
      var that = this
      this.emotion()
      window.YTX.postMsg(1, i, this.username, function (res) {
        let record = {
          id: res.msgClientNo, // 服务器返回的消息ID
          content: i,
          type: 2,
          imgUrl: localStorage.getItem('portrait'),
          msgType: 2,
          time: new Date().getTime()
        }

        utils.pushStorage('notSubmitRocerd', that.username, record)

        store.dispatch('getContentMsg')
        // that.$emit('getContent', that.username)
      })
    },
    postMsg () {
      var that = this
      this.isShow = false
      window.YTX.postMsg(1, that.content, this.username, function (res) {
        let record = {
          id: res.msgClientNo, // 服务器返回的消息ID
          content: that.content,
          type: 1,
          imgUrl: localStorage.getItem('portrait'),
          msgType: 2,
          time: new Date().getTime()
        }

        utils.pushStorage('notSubmitRocerd', that.username, record)

        that.content = ''

        store.dispatch('getContentMsg')
        // that.$emit('getContent', that.username)
      })
    }
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
  width: calc(100% - 1.92rem);
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
.bottom .inputText input::-webkit-input-placeholder{
  color: #c3c3c3
}
.icon{
  width: .58rem;
  height: .58rem;
  margin-left: .18rem;
  line-height: .92rem;
  display: inline-block;
  vertical-align: .03rem;
  background-repeat: no-repeat;
  background-size: cover;
}
.biaoqing{
  background-image: url('../../../assets/images/biaoqing.png');
  margin-left: .5rem
}
.tupian{
  background-image: url('../../../assets/images/tupian.png');
  width: .63rem;
  height: .63rem;
  margin-bottom: -0.02rem;
}
</style>
