<template>
  <div>
    <NavBar left-arrow @click-left="onClickLeft" title="消息通知"/>
    <div style="height: calc(100% - 46px);overflow-y: scroll;overflow-x: hidden;background-color: #f0f0f0;padding: 0 .3rem;box-sizing: border-box;box-sizing: -webkit-border-box;">
      <div class="msg_group">
        <div class="msg_time">2019-01-09 12:36:54</div>
        <div class="msg_content">
          <div class="title">都快放假啊速度快解放卢卡斯的解放军卡视角</div>
          <div class="context">没拿申达股份凉快哪三个你萨科技发卡机了圣诞节发哪里开始的房间里卡圣诞节福利卡圣诞节疯狂了发送到发送到</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar} from 'vant'
export default {
  components: {
    NavBar
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.msg_time{
  height: .68rem;
  font-size: .16rem;
  line-height: .68rem;
  background-color: #f0f0f0;
  text-align: center;
  color: #8d8d8d
}
.msg_content{
  border-radius: .1rem;
  font-size: .23rem;
  text-align: left;
  background-color: #fff;
  padding-bottom: .26rem;
  letter-spacing: 1px;
}
.msg_content .title{
  line-height: .7rem;
  border-bottom: 1px solid #f0f0f0;
  color: #323232;
  padding:0 .2rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.msg_content .context{
  padding: 0.26rem .2rem 0;
  line-height: .29rem;
  color: #8e8e8e;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
