<template>
<div>
  <nav-bar
  :title="friend.nickName"
  left-arrow
  @click-left="onClickLeft"
  @click-right="onClickRight">
    <Icon name="more-o" slot="right"/>
    <!-- <nav-bar-title slot="title" :name='this.title'></nav-bar-title> -->
  </nav-bar>
</div>
</template>
<script>
import {NavBar, Icon} from 'vant'
import utils from '@/assets/common/utils'
import Vue from 'vue'
import { mapState } from 'vuex'

export default {
  components: {
    NavBar,
    Icon
  },
  methods: {
    onClickLeft () {
      // utils.setStorage('friendsList', localStorage.getItem('friendUserName'), this.item, 2) // 设置当前好友的未读条数为0
      // this.$store.dispatch('getFriendsList') // 触发当前获取好友列表的dispatch
      window.history.back()
    },
    onClickRight () {}
  },
  computed: {
    ...mapState({
      friend: state => state.IM.friend
    })
  }
}
</script>
<style>
.van-icon{
  font-size: .3rem
}
</style>
