<template>
<div>
  <nav-bar
  :title="title"
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

import Vue from 'vue'
Vue.component('nav-bar-title', {
  props: ['name', 'enterprise'],
  data: function () {
    return {
      class1: {
        'line-height': '.55rem',
        'font-size': '.29rem'
      },
      class2: {
        'line-height': '.23rem',
        'font-size': '.23rem'
      }
    }
  },
  template: '<div><div v-text="name" :style="class1"></div><div v-text="enterprise" :style="class2"></div></div>'
})

export default {
  props: ['title'],
  components: {
    NavBar,
    Icon
  },
  methods: {
    onClickLeft () {
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
