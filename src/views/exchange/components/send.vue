<template>
    <div class="bottom">
        <div class="inputText">
          <input type="text" placeholder="输入后点击回车发送内容" @keyup.enter="postMsg()" v-model="content">
        </div>
        <div class="icon biaoqing"></div>
        <div class="icon tianjia"></div>
    </div>
</template>

<script>
import utils from '@/common/utils'

export default {
  props: ['username'],
  data () {
    return {
      content: ''
    }
  },
  methods: {
    postMsg () {
      var that = this
      window.YTX.postMsg(1, that.content, this.username, function (res) {
        let record = {
          id: res.msgClientNo, // 服务器返回的消息ID
          content: that.content,
          type: 1,
          imgUrl: 'http://tx.haiqq.com/uploads/allimg/170507/0524512614-5.jpg',
          msgType: 2,
          time: new Date().getTime()
        }

        utils.pushStorage('notSubmitRocerd', that.username, record)

        that.content = ''
        that.$emit('getContent', that.username)
      })
    }
  }
}
</script>

<style scoped>
.bottom{
  width: 100%;
  height: 1.1rem;
  line-height: 1.1rem;
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
}
.biaoqing{
  background-image: url('../../../../static/images/biaoqing.png');
  background-repeat: no-repeat;
  background-size: cover
}
.tianjia{
  background-image: url('../../../../static/images/tianjia.png');
  background-repeat: no-repeat;
  background-size: cover
}
</style>
