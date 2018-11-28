<template>
  <div class="content">
    <!-- <Search placeholder="按照条件搜索 例如 女 济南 22" v-model="value" show-action>
       <div slot="action" @click="search">搜索</div>
      <div slot="action" @click="onSearch"><i class="tianjia"></i></div>
    </Search> -->
    <Tabs @updateVal="updateVal" @search="search"/>
    <div style="margin-top: .2rem;height:calc(100% - .2rem);position: relative">
      <HomeList :columns='columns'></HomeList>
    </div>
  </div>
</template>

<script>
import { Search } from 'vant'
import Tabs from './components/tabs'
import HomeList from './components/HomeList'
import { listUser } from '@/assets/common/api'

export default {
  data () {
    return {
      value: '',
      fromData:{
        // 智能筛选
        type: 1,
        // 基本筛选条件
        address: '', // 居住地
        age: [], // 年龄（区间）
        height: [], // 身高（区间）
        maritalStatus: [], // 婚姻状况
        education: [], // 学历（区间）
        income: [], // 收入（区间）
        loveType: [], // 恋爱类型
        // 高级筛选
        housePurchase: [], // 是否购房
        car: [], // 购车情况
        registeredPermanentResidence: 1, // 户口
        hometown: [], // 家乡(地址)
        children: [], // 子女
        constellation: [], // 星座
        theRealNameSystem:[], // 实名
        picture: [], // 是否有照片
        member: [], // 是否会员
        onLine: [], // 是否在线
        profession: [], // 职业
        bloodType: [], // 血型
        nation: [], // 民族
        religion: [], // 宗教
      },
      columns:[
        {
          id:1,
          userName: '测试',
          theRealNameSystem: true,
          age: '25',
          height: '165',
          education: '本科',
          income: '5000-10000',
          tag: ['身材苗条', '旅游', '投资理财'],
          manifesto: '爱情就应该是一辈子',
          portrait: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542709648746&di=05469704ed6e2a01394165a458e93773&imgtype=0&src=http%3A%2F%2Fimg.52z.com%2Fupload%2Fnews%2Fimage%2F20180416%2F20180416051754_47848.jpg',
          praise:8
        },
        {
          id:2,
          userName: '测试',
          theRealNameSystem: true,
          age: '25',
          height: '165',
          education: '本科',
          income: '5000-10000',
          tag: ['身材苗条', '旅游', '投资理财'],
          manifesto: '爱情就应该是一辈子',
          portrait: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542709648748&di=83d4f5a48e8d1a26df15dc010013962e&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F13%2F81%2F71%2F08K58PICzNa_1024.png',
          praise:8
        }
      ]
    }
  },
  methods: {
    transitionObj (obj) {
      var obj = Object.assign({}, this.fromData)
      for ( var i in obj){
        obj[i] = obj[i].length > 0 ? obj[i].join(','):'' 
      }
      return obj
    },
    updateVal (val) {
      this.fromData = this.transitionObj(Object.assign({}, this.fromData, val))
    },
    search () {
      console.log(this.fromData)
      listUser(obj)
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
  height: 100%
}
.tianjia{
    display: block;
    width: .4rem;
    height: .4rem;
    background-image: url('../../../static/images/tianjia.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>
