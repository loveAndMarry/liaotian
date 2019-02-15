<template>
  <div>
    <div class="gift-box">
      <div class="gift-box-line">
        <div class="gift-item liwu" @click="liwu"></div>
        <div class="gift-item upPhoto" @click="upPhoto"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import {mapState ,mapActions } from 'vuex'
export default {
  data () {
    return {
     
    }
  },
  computed: {
    ...mapState({
      'user': state => state.IM.user,
      'friend': state => state.IM.friend,
    }),
  },
  methods: {
    ...mapActions([
      'POSTMSG'
    ]),
    liwu () {
      Toast({
        message: '功能正在开发中',
        duration: 1000
      })
    },
    upPhoto () {
      let that = this
      window.selectImage(function(str) {
        that.POSTMSG({
          context: str,
          id: new Date().getTime(),
          receiver:that.friend.accountNumber,
          sender: that.user.accountNumber,
          sendUserId: that.user.id,
          receiveUserId: that.friend.userId,
          time: new Date().getTime(),
          chatDate: new Date().getTime(),
          status: 1, // 当前信息提交状态
          userHead: that.user.userHead,
          type: '4'
        }).then((res) => {
          that.$emit('hideGift')
        }).catch(res => {
          that.$emit('hideGift')
        })
      })
    }
  }
}
</script>
<style scoped>
  .gift-box {
    margin: 0 auto;
    width: 100%;
    height: 2.5rem;
    box-sizing: border-box;
    margin: .1rem 0;
    /* border: 1px solid #b4b4b4; */
    overflow: hidden;
    overflow-y: auto;
  }
  .gift-box-line{
    display: flex
  }
  .gift-item {
    text-align: center;
    cursor: pointer;
    width: .7rem;
    height: .7rem;
    background-color: #ff5e80;
    text-align: center;
    line-height: .7rem;
    background-size: 75%;
    background-repeat: no-repeat;
    background-position: 50%;
    border-radius: .1rem;
    -webkit-border-radius: .1rem;
    margin-top: .2rem;
    margin-left: .15rem;
  }
  .liwu {
    background-image: url('../../../../assets/images/liwu.png'); 
  } 
  .upPhoto {
    background-image: url('../../../../assets/images/up_photo.png'); 
  } 
</style>
