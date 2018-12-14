<template>
<div>
  <nav-bar
  style="position: fixed;width: 100%;"
  :title="friend.nickName"
  left-arrow
  @click-left="onClickLeft">
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
      var arr = JSON.parse(localStorage.getItem('friendList'))
      utils.updateArray(arr, this.friend.accountNumber,{
          hint: 0
      })
      localStorage.setItem('friendList', JSON.stringify(arr))
      window.history.back()
    }
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
