<template>
  <div>
    <div class="gift-box">
      <div class="gift-box-line">
        <!-- <div class="gift-item liwu" @click="liwu"></div> -->
        <div class="gift-item" @click="upPhoto">
          <img style="border-radius: .1rem;" src="../../../../assets/images/up_photo.png" alt="">
          <span>上传图片</span>
        </div>
        <div class="gift-item" v-for="(el, index) in giftList" :key="index" @click="postGift(el)" v-if="type === '1'">
          <img :src="el.giftPicture" alt="">
          <span>{{el.giftName}}</span>
          <b class="S20">{{el.giftPrice}}颗欢乐豆</b>  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import Vue from 'vue'
import store from '../../../../store'
import router from '../../../../router'
import {mapState ,mapActions } from 'vuex'
import { getUserVirtualCurrencyPrice,listGift,sendGift } from '@/assets/common/api'

let gift =  function(data) {
  return Vue.extend({
    el: document.createElement('div'),
    store,
    router,
    data () {
      return {
        data: data
      }
    },
    template:  `<div class="gift-content-back" @click.prevent.stop="close($event)">
                  <div class="gift-content">
                    <div class="title">
                      <img :src="data.giftPicture" alt="">
                      <span class="S30">{{data.giftName}}</span>
                      <b class="S28">{{data.giftPrice}}颗欢乐豆</b>
                    </div>
                    <div class="img">
                      <img :src="data.sendImg" alt="">
                      <span></span>
                      <img :src="data.receiverImg" alt="">
                    </div>
                    <div class="bottom" @click="submit">
                      赠送
                    </div>
                  </div>
                </div>`,
    methods: {
      ...mapActions([
        'POSTMSG'
      ]),
      close ($event) {
        if($event.target.className === 'gift-content-back') {
          this.$el.remove()
        }
      },
      submit () {
        let user = this.$store.state.IM.user;
        let friend = this.$store.state.IM.friend;
        let that = this;
        getUserVirtualCurrencyPrice({
          userId: user.id
        }).then(res => {
          if(res.data - 0 > 0){
            sendGift({
              sendUserId: user.id,
              recipientUserId: friend.userId,
              giftId: that.data.id
            }).then(res => {
              let context = `<img v-lazy='${that.data.giftPicture}' src='${that.data.giftPicture}'><p>${that.data.giftMeaning}</p>`
              that.POSTMSG({
                context: context,
                id: new Date().getTime(),
                receiver:friend.accountNumber,
                sender: user.accountNumber,
                sendUserId: user.id,
                receiveUserId: friend.userId,
                time: new Date().getTime(),
                chatDate: new Date().getTime(),
                status: 1, // 当前信息提交状态
                userHead: user.userHead,
                type: '1'
              }).then(() => {
                 that.$el.remove()
              })
            })
            
          } else {
            that.$el.remove()
            window.setTimeout(() => {
              console.log(that)
              that.$router.push({name: 'virtualCurrency'})
            }, 1000)

            Toast({
              message: '婚恋豆不足，请先充值',
              duration: 1000
            })
          }
        })
      }
    }
  })
}

export default {
  props: ['type'],
  data () {
    return {
      giftList: [],
      show: true
    }
  },
  computed: {
    ...mapState({
      'user': state => state.IM.user,
      'friend': state => state.IM.friend,
    }),
  },
  mounted () {
    listGift({
      pageCurrent: 1,
      pageSize: 100
    }).then(res => {
      this.giftList = res.data.list
    })
  },
  methods: {
    ...mapActions([
      'POSTMSG',
      'postGroupMsg'
    ]),
    liwu () {
      Toast({
        message: '功能正在开发中',
        duration: 1000
      })
    },
    postGift (el) {
      el.sendImg = this.$store.state.IM.user.userHead;
      el.receiverImg = this.$store.state.IM.friend.userHead;

      let ele = gift(el)
      document.body.appendChild(new ele().$el)
    },
    upPhoto () {
      let that = this
      
        window.selectImage(function(str) {
          if(that.type == '1') {
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
        } else {
          that.postGroupMsg({
            context: str,
            sendUserId: that.user.id,
            chatDate: new Date().getTime(),
            type: '4',
            userHead: that.user.userHead
          }).then(() => {
            that.$emit('hideGift')
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.gift_content{
  width: 5.3rem;
  height: 6.56rem;
  border-radius: .1rem
}
  .gift-box {
    margin: 0 auto;
    width: 100%;
    height: 3.5rem;
    box-sizing: border-box;
    margin: .1rem 0;
    /* border: 1px solid #b4b4b4; */
    overflow: hidden;
    overflow-y: auto;
  }
  .gift-box-line{
    display: flex;
    flex-wrap: wrap;
  }
  .gift-item {
    text-align: center;
    position: relative;
    width: 25%;
    margin: 0.1rem 0;
  }
  .gift-item img{
    width: .72rem;
    height: .72rem;
    line-height: .72rem;
    position: absolute;
    top: 0;
    display: block;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%)
  }
  .gift-item span{
    display: block;
    line-height: .24rem;
    margin-top: .8rem;
  }
  .gift-item b{
    color: @base-color;
    margin-top: .2rem;
    display: block;
  }
  .liwu {
    background-image: url('../../../../assets/images/liwu.png'); 
  } 
</style>
