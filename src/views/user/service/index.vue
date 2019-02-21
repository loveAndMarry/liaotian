<template>
<div class="service">
  <NavBar left-arrow @click-left="onClickLeft" title='在线客服'/>
  <div class="service_content"  id="content">
    <PullRefresh  v-model="isLoading" @refresh="onRefresh" class="scroller_content" :disabled="isDisabled">
      <div v-for="(el, index) in List" :key="index" class="scroller_item" v-show="loading">
        <div v-if='el.type === "msg" ' v-text="el.context" style="color:#918d8d"></div>
        <left-content v-else-if="el.sendUserId !== user.id" :item="el" :imgDefault="true"></left-content>
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
import { NavBar, PullRefresh} from 'vant'
import { getChatRecord } from '@/assets/common/api'
import LeftContent from '@/views/exchange/components/LeftContent'
import RightContent from '@/views/exchange/components/RightContent'
import { mapActions, mapState } from 'vuex'
import utils from '@/assets/common/utils'

export default {
  data() {
    return {
      context: '', // 发送的内容
      loading: true, // 下拉刷新的内容是否加载完成
      isLoading: false, // 下拉刷新是否完成
      isDisabled: false, // 数据是否加载完毕
      limitStart: 0,
      pageSize: 10,
      message: [], // 储存聊天记录
    }
  },
  mounted () {
    this.isDisabled = true
    var _this = this
    // 监听接受容联云发送的消息
    window.serviceRmation(function(res) {

      _this.message.push({
        context: res.context,
        sendUserId: 'maiyuanhunliankefu00001',
        id: new Date().getTime(),
        time: new Date().getTime(),
        userHead: 'http://systemmaiyuan.minmai1688.com/d408bd27bcd44393bcca5ec3b9010bc9customer_service.png'
      })

      // 储存客服发送的信息
      _this.POSTSERVICERMATION({
          context: res.context,
          receiver:_this.user.accountNumber,
          sendUserId: 'maiyuanhunliankefu00001',
          receiveUserId: _this.user.id,
          msgType: 1,
          time: new Date().getTime(),
        })
      _this.scrollToBottom()
    })
    if(this.message.length === 0) {
       this.onRefresh()
    }

    this.message.push({
      context: '你好，欢迎联系麦缘婚恋客服，如果等待时间较长，请联系电话00000000000',
      sendUserId: 'maiyuanhunliankefu00001',
      id: new Date().getTime(),
      time: new Date().getTime(),
      userHead: 'http://systemmaiyuan.minmai1688.com/d408bd27bcd44393bcca5ec3b9010bc9customer_service.png'
    })
  },
  computed: {
    ...mapState({
      user: state => state.IM.user
    }),
    List () {
      return utils.arraySort(this.message, 'chatDate')
    },
    HEIGHT () {
      return this.List.length <= 7 ? ((7 - this.List.length) * 1.4) + 'rem' : '0rem'
    }
  },
  methods: {
    ...mapActions(['SERVICERMATION', 'POSTSERVICERMATION']),
    // 将滚动条置底
    scrollToBottom () {
       this.$nextTick(() => {
        var container = this.$el.querySelector(".scroller_content");
        var content = document.getElementById('content')
        content.scrollTop = container.scrollHeight;
      })
    },
    // 向客服发送消息
    postMsg () {
      // 判断发送的内容是否为空
      if(this.context.replace(/ /g, '') !== ''){
        // 将最新的聊天信息添加到聊天列表中
        this.message.push({
          context: this.context,
          sendUserId: this.user.id,
          id: new Date().getTime(),
          time: new Date().getTime(),
          userHead: this.user.userHead
        })

        this.POSTSERVICERMATION({
          context: this.context,
          receiver:'00001',
          sendUserId: this.user.id,
          receiveUserId: 'maiyuanhunliankefu00001',
          msgType: 1,
          time: new Date().getTime(),
        })

        // 将滚动条置底部
        this.scrollToBottom()

        // 将内容清空
        this.context = ''
      }
    },
    // 下拉刷新
    onRefresh () {
      var container = this.$el.querySelector(".scroller_content")
      var scrollHeight = container.scrollHeight
      this.loading = false

      getChatRecord({
        limitStart: this.limitStart,
        pageSize: this.pageSize,
        sendUserId: this.$store.state.IM.user.id,
        receiveUserId: 'maiyuanhunliankefu00001'
      }).then((res) => {
        if(res.data){
          this.message.unshift(...res.data)
          this.limitStart += res.data.length
          this.isLoading = false

          // 加载完成后滚动条跳到加载之前的位置
          this.loading = true
          this.$nextTick(() => {
            var content = document.getElementById('content')
              content.scrollTop = container.scrollHeight - scrollHeight
          })
          this.isDisabled = false
          // 没有历史数据
          if(res.data.length < this.pageSize){
            this.messageDone()
          }
        } else {
          this.messageDone()
        }
      })
    },
    // 数据加载全部完成后，设置状态
    messageDone () {
      window.setTimeout(() => {
        this.message.unshift({
          type: 'msg',
          context: '--没有更多的历史消息了--'
        })
        this.loading = true
        this.isLoading = false
        // 数据全部加载完成，禁用下拉刷新
        this.isDisabled = true
      }, 500)
    },
    // 点击返回上一页
    onClickLeft() {
      this.$router.push({name: 'user'})
    }
  },
  components: {
    NavBar,
    PullRefresh,
    LeftContent,
    RightContent
  }
}
</script>

<style scoped lang="less">

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
  width: calc(100% - 1.4rem);

}
.service_btn{
  position: fixed;
  height: 1rem;
  bottom: 0;
  width: 100%;
  left: 0;
  background: #fff;
  padding: .1rem;
  box-sizing: border-box;
}
.postMsg{
  float: right;
  font-size: .28rem;
  color: #fff;
  border-radius: .1rem;
  padding: .12rem .12rem;
  background-color: @base-color;
  margin: 0 .2rem;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.scroller_item{
  padding-top:.1rem;
  padding-bottom:.3rem;
  box-sizing: border-box;
}
</style>
