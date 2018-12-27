<template>
  <div class="content">
    <!-- <Search placeholder="按照条件搜索 例如 女 济南 22" v-model="value" show-action>
       <div slot="action" @click="search">搜索</div>
      <div slot="action" @click="onSearch"><i class="tianjia"></i></div>
    </Search> -->
      <Tabs @search="search" :data='fromData'/>
      <div style="height:calc(100% - 1.6rem);position: absolute;top:.8rem;width: 100%;">
        <HomeList :fromData='fromData' ref='HomeList'></HomeList>
      </div>
  </div>
</template>

<script>
import { Search } from 'vant'
import Tabs from './components/tabs'
import HomeList from './components/HomeList'
import { mapState, mapMutations} from 'vuex'
import Vue from 'vue'

import utils from '@/assets/common/utils'

export default {
  name: 'home',
  data () {
    return {
      index: 0,
      // value: '',
      fromData:{
        userId: this.$store.state.IM.user.id,
        pageCurrent: 1,
        pageSize: 10,
        // 智能筛选
        type: 1,
        // 基本筛选条件
        address: [], // 居住地
        age: [], // 年龄（区间）
        height: [], // 身高（区间）
        maritalStatus: [], // 婚姻状况
        education: [], // 学历（区间）
        income: [], // 收入（区间）
        loveType: [], // 恋爱类型
        // 高级筛选
        housePurchase: [], // 是否购房
        car: [], // 购车情况
        registeredPermanentResidence: [], // 户口
        hometown:[], // 家乡(地址)
        children:[], // 子女
        constellation: [], // 星座
        theRealNameSystem:[], // 实名
        picture: [], // 是否有照片
        member: [], // 是否会员
        onLine: [], // 是否在线
        // profession: [], // 职业
        bloodType: [], // 血型
        nation: [], // 民族
        religion: [], // 宗教,
        sex: '2'
      },
      columns:[]
    }
  }, 
  activated () {
    console.log('缓存已经激活了')
  },
  mounted () {
    // this.setLoading(true)
    // this.fromData.sex = this.$store.state.IM.user.sex === '1'? '2': '1'
    // this.fromData.userId = this.$store.state.IM.user.id || utils.getUrlArgObject('userId')
    // this.search(this.fromData)
  },
  methods: {
    ...mapMutations([
      'setLoading'
    ]),
    search (fromData, pageSize) {
      this.fromData = Object.assign({}, fromData)
      this.$refs.HomeList.refresh(null,this.fromData, pageSize)
    }
  },
  components: {
    Search,
    Tabs,
    HomeList
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
