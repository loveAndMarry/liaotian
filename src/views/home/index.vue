<template>
  <div class="content">
    <!-- <Search placeholder="按照条件搜索 例如 女 济南 22" v-model="value" show-action>
       <div slot="action" @click="search">搜索</div>
      <div slot="action" @click="onSearch"><i class="tianjia"></i></div>
    </Search> -->
    <Tabs @updateVal="updateVal" @search="search"/>
    <div style="height:calc(100% - .2rem);position: absolute;top:47px;width: 100%;">
      <HomeList :fromData='fromData' ref='HomeList'></HomeList>
    </div>
  </div>
</template>

<script>
import { Search } from 'vant'
import Tabs from './components/tabs'
import HomeList from './components/HomeList'
import { mapState } from 'vuex'
//引入容联云即时通讯
import IM from '@/assets/common/IM'
import utils from '@/assets/common/utils'

export default {
  data () {
    return {
      // value: '',
      fromData:{
        userId: 0,
        pageCurrent: 1,
        pageSize: 10,
        // 智能筛选
        type: 1,
        // 基本筛选条件
        address: '', // 居住地
        age: '', // 年龄（区间）
        height: '', // 身高（区间）
        maritalStatus: '', // 婚姻状况
        education: '', // 学历（区间）
        income: '', // 收入（区间）
        loveType: '', // 恋爱类型
        // 高级筛选
        housePurchase: '', // 是否购房
        car: '', // 购车情况
        registeredPermanentResidence: '', // 户口
        hometown: '', // 家乡(地址)
        children: '', // 子女
        constellation: '', // 星座
        theRealNameSystem:'', // 实名
        picture: '', // 是否有照片
        member: '', // 是否会员
        onLine: '', // 是否在线
        profession: '', // 职业
        bloodType: '', // 血型
        nation: '', // 民族
        religion: '', // 宗教,
        sex: ''
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
  mounted () {
    this.$store.dispatch('UPDATEUSER', {
      // userId: utils.getUrlArgObject('userId')
      userId: '2219246d18504fea864208235f056223' 
    }).then((data) => {
      this.fromData.sex = data.sex === '1'? '2': '1'
      this.fromData.userId = data.id
      this.search()
      // 获取到个人信息后登录容联云账号
      IM.init()
    })
  },
  methods: {
    transitionObj (fromData) {
      var obj = {}
      for ( var i in fromData){
        obj[i] = typeof fromData[i] === 'object' ? fromData[i].length > 0 ? fromData[i].map(el => el.replace('不限','-1')).join(','):'' : fromData[i]  
      }
      return obj
    },
    updateVal (val) {
      this.fromData = this.transitionObj(Object.assign({}, this.fromData, val))
    },
    search () {
      this.fromData = Object.assign({}, this.transitionObj(this.fromData))
      this.$refs.HomeList.refresh()
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
