<template>
  <div class="content">
    <!-- <Search placeholder="按照条件搜索 例如 女 济南 22" v-model="value" show-action>
       <div slot="action" @click="search">搜索</div>
      <div slot="action" @click="onSearch"><i class="tianjia"></i></div>
    </Search> -->
    <Banner page="1"></Banner>
    <Tabs @search="search"/>
    <div style="height:calc(100% - 1.6rem - 100px);position: absolute;top:calc(.8rem + 100px);width: 100%;">
      <HomeList ref='HomeList' ></HomeList>
    </div>
  </div>
</template>

<script>
import { Search } from 'vant'
import Tabs from './components/tabs'
import HomeList from './components/HomeList'
import Banner from '@/components/Banner'
import Vue from 'vue'
import { mapMutations } from 'vuex'

import utils from '@/assets/common/utils'

export default {
  name: 'home',
  data () {
    return {
      index: 0,
      // value: '',
      columns:[]
    }
  },
  //mounted () {
    // 第一次进入页面时，让引导页停留3秒
    // if(this.$store.state.common.Loading){
    //     window.setTimeout(() => {
    //     this.setLoading(false)
    //     }, 5000)
    // }
  //},
  methods: {
    ...mapMutations([
      'setLoading'
    ]),
    search (fromData,pageSize) {
      this.$refs.HomeList.refresh(null,fromData, pageSize)
    }
  },
  components: {
    Search,
    Tabs,
    HomeList,
    Banner
  }
}
</script>

<style>
.content{
  background-color: #f0f0f0;
  height: 100%;
  position: relative;
}
</style>
