<template>
<div>
  <nav-bar
  :title="item.nickName"
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

export default {
  props: ['item'],
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
  }
}
</script>
<style>
.van-icon{
  font-size: .3rem
}
</style>
