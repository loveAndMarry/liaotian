<template>
  <div style="position: absolute;height:100%;width:100%">
    <ul class="tabs">
      <li :class="{isShow: index === isShow}" @click.prevent="tabsClick(index)" v-for="(item, index) in tabs" :key="index" v-text="item"></li>
    </ul>
    <div class="tabs_content" v-show="isShow >= 0 && isContentType" @click.prevent="tabsContentClick($event)">
      <div v-show="isShow === 0" class="tabs_content_group">
        <div class="item" v-for="(item, index) in IntelligentSorting" :key="item" v-text="item" :class="{isShow: index === IntelligentSortingShow}" @click.stop="IntelligentSortingEvent(index)"></div>
      </div>
      <div v-show="isShow === 1" class="tabs_content_group">
        <div class="tabs_content_group_scroll">
          <ListItem title="居住地"  :isSubmit="false" :default='fromData.address' type='address' @confirm="a => fromData.address = a" hint="不限" ref="address"></ListItem>

          <ListItem title="身高" dictionaries='heights' :default='fromData.height' type="packerTwo" suffix="厘米" :isSubmit="false" @confirm="a => fromData.height = a" hint="不限" ref="height"></ListItem>

         <ListItem title="学历" dictionaries='education' :default='fromData.education' type="packerTwo" :isSubmit="false" @confirm="a => fromData.education = a" hint="不限" ref="education"></ListItem>

          <ListItem title="月收入" dictionaries='income' :default='fromData.incomeDefault' type="packerTwo" :isSubmit="false" @confirm="a => fromData.incomeDefault = a" hint="不限" ref="incomeDefault"></ListItem>

          <ListItem title="年龄" dictionaries='ages' type='packerTwo'  :default='fromData.age' :isSubmit="false" @confirm="a => fromData.age = a" hint="不限" ref="age"></ListItem>

          <ListItem title="婚姻状况" dictionaries='maritalStatus' :default='fromData.maritalStatus' type="radioOne" :isSubmit="false" @confirm="a => fromData.maritalStatus = a" hint="不限" ref="maritalStatus"></ListItem>
        </div>
        <div class="item submit">
          <span class="btn" @click="reset">重置</span>
          <span class="btn" @click='submitData'>确定</span>
        </div>
      </div>
      <div v-show="isShow === 2" class="tabs_content_group">
        <div class="tabs_content_group_scroll">
          
          <ListItem title="户口"  :isSubmit="false" type='address' :default='fromData.registeredPermanentResidence' @confirm="a => fromData.registeredPermanentResidence = a" hint="不限" ref="registeredPermanentResidence"></ListItem>

          <ListItem title="家乡"  :isSubmit="false" type='address'  :default='fromData.hometown' @confirm="a => fromData.hometown = a" hint="不限" ref="hometown"></ListItem>

          <div class="item" v-for="(item, index) in advancedFilter" :key="item" @click.stop="clickEvent($event, index, 'advancedFilterValue')">
          {{item}}<div class="sanjiao">不限</div>
          </div>
        </div>
        <div class="item submit">
          <span class="btn" @click="reset">重置</span>
          <span class="btn" @click='submitData'>确定</span>
        </div>
      </div>
    </div>

    <PackerList title="婚姻状况" :data='fromData.maritalStatus' :radio='true' v-model="flag.maritalStatusShow" name="maritalStatus"  @confirm="confirmCallback" ref="maritalStatus"></PackerList>

    <PackerList title="购房情况" :data='fromData.housePurchase' :radio='true' v-model="flag.housePurchaseShow" name="housePurchase"  @confirm="confirmCallback" ref="housePurchase"></PackerList>

    <PackerList title="购车情况" :data='fromData.car' :radio='true' v-model="flag.carShow" name="car"  @confirm="confirmCallback" ref="car"></PackerList>

    <PackerList title="有无子女" :data='fromData.children' :radio='true' v-model="flag.childrenShow" name="children"  @confirm="confirmCallback" ref="children"></PackerList>

    <PackerList title="星座" :data='fromData.constellation' :radio='false' v-model="flag.constellationShow" name="constellation"  @confirm="confirmCallback" ref="constellation"></PackerList>

    <PackerList title="是否实名" :data='fromData.theRealNameSystem' :radio='true' v-model="flag.theRealNameSystemShow" name="theRealNameSystem"  @confirm="confirmCallback" ref="theRealNameSystem"></PackerList>

    <PackerList title="是否有照片" :data='fromData.picture' :radio='true' v-model="flag.pictureShow" name="picture"  @confirm="confirmCallback" ref="picture"></PackerList>

    <PackerList title="是否是会员" :data='fromData.member' :radio='true' v-model="flag.memberShow" name="member"  @confirm="confirmCallback" ref="member"></PackerList>

    <PackerList title="是否在线" :data='fromData.onLine' :radio='true' v-model="flag.onLineShow" name="onLine"  @confirm="confirmCallback" ref="onLine"></PackerList>

    <PackerList title="职业" :data='fromData.profession' :radio='false' v-model="flag.professionShow" name="profession"  @confirm="confirmCallback" ref="profession"></PackerList>

    <PackerList title="血型" :data='fromData.bloodType' :radio='true' v-model="flag.bloodTypeShow" name="bloodType"  @confirm="confirmCallback" ref="bloodType"></PackerList>

    <PackerList title="民族" :data='fromData.nation' :radio='false' v-model="flag.nationShow" name="nation"  @confirm="confirmCallback" ref="nation"></PackerList>

    <PackerList title="宗教" :data='fromData.religion' :radio='true' v-model="flag.religionShow" name="religion"  @confirm="confirmCallback" ref="religion"></PackerList>
  </div>
</template>

<script>
import { Button} from 'vant'
import Vue from 'vue'
import { basicQueryCriteria, getProvinceAndCityList} from '@/assets/common/api'
import { mapState, mapMutations } from 'vuex';
import ListItem from '@/components/ListItem'
import PackerList from '@/components/options/PackerList.vue'

export default {
  props:{
    value: Object,
    data: Object
  },
  data () {
    return {
      isShow: -1, // 当前要显示的tabs页
      isContentType: false, // 筛选框是否显示
      valueName: '', // 储存当前选择的筛选条件标识，用来更新选择器内的内容
      event:null, // 储存当前点击的行，用来更改当前选择完成的内容返现
      tabs: ['智能排序', '基本筛选', '高级筛选'], // tabs内容
      IntelligentSorting: ['智能排序', '最新加入', '收入排序', '最新推荐'], // 智能排序
      IntelligentSortingShow: 0, // 智能排序默认显示的内容
      advancedFilter: ['购房情况', '购车情况', '有无子女', '星座', '是否实名', '是否有照片', '是否是会员', '是否在线', '职业', '血型', '民族', '宗教信仰'], // 高级筛选
      advancedFilterValue: ['housePurchase', 'car', 'children', 'constellation', 'theRealNameSystem', 'picture', 'member', 'onLine', 'profession', 'bloodType', 'nation', 'religion'], // 高级筛选对应名称,
      flag: {
        // 高级筛选
        housePurchaseShow: false, // 是否购房
        carShow: false, // 购车情况
        registeredPermanentResidenceShow: false, // 户口
        hometownShow: false, // 家乡(地址)
        childrenShow: false, // 子女
        constellationShow: false, // 星座
        theRealNameSystemShow:false, // 实名
        pictureShow: false, // 是否有照片
        memberShow: false, // 是否会员
        onLineShow: false, // 是否在线
        professionShow: false, // 职业
        bloodTypeShow: false, // 血型
        nationShow: false, // 民族
        religionShow: false, // 宗教
      },
      basicQueryCriteria: [],
      defaultData: {},
      fromData: {
        type: 1,
        pageCurrent: 1,
        pageSize: 10,
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
        userId: '',
        sex: '1'
      }
    }
  },
  methods: {
    confirmCallback (name, value) {
      console.log('666')
      if(value && value.length > 0){
        value = value.map(item => typeof item === "object" ? item: item.replace('-1', '不限') )
        let str = ''
        this.flag[name + 'Show'] = false
        str = typeof value[0] === 'string' ? value : value[0].code ? value.map(el => el.code) : value.map(el => el.label)
        this.event.innerText = str
      } else {
        this.event.innerText = '不限'
      }
      this.fromData[name] = value
    },
    reset () {
      var _this = this
      let fromData = {
        type: 1,
        pageCurrent: 1,
        pageSize: 10,
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
      }

      fromData.userId = this.$store.state.IM.user.id
      fromData.sex = this.$store.state.IM.user.sex === '1'? '2': '1'
      fromData.type = 1
      
      // var eles = document.querySelectorAll('.sanjiao');
      // eles.forEach(element => {
      //   element.innerHTML = "不限"
      // });
      _this.fromData = fromData

      this.isShow = -1
      this.IntelligentSortingShow = 0
      this.$emit('search', fromData, 10)
    },
    replaceArr (arr) {
      return arr.map(item => item.replace('岁', '').replace('cm', ''))
    },
    submitData () {
      this.fromData.userId = this.$store.state.IM.user.id
      this.fromData.sex = this.$store.state.IM.user.sex === '1'? '2': '1'
      this.isShow = -1
      this.$emit('search', this.fromData, 10)
    },
    // tabs选项卡点击事件 
    tabsClick (index) {
      if (this.isShow === index) {
        this.isContentType = !this.isContentType
        this.isShow = -1
        return false
      }
      this.isShow = index
      this.isContentType = true
    },
    // 智能排序选项点击事件
    IntelligentSortingEvent (index) {
      this.fromData.userId = this.$store.state.IM.user.id
      this.fromData.sex = this.$store.state.IM.user.sex === '1'? '2': '1'
      // 设置当前点击的为智能检索
      this.valueName = 'type'
      this.IntelligentSortingShow = index
      this.isShow = -1 // 关闭当前下拉框

      this.fromData['type'] = index + 1
      // 设置夫级的数据
      // this.setParentData(this.fromData['type'])
     this.$emit('search', this.fromData, 10)
    },
    // 基本筛选每项点击事件
    clickEvent ($event, index, name) {
      // 获取当前元素
      if ($event.target.className === 'item') {
        this.event = $event.target.children[0]
      } else if ($event.target.className === 'sanjiao') {
        this.event = $event.target
      }
      // 获取当前名称
      this.valueName = this[name][index]

      this.flag[this.valueName + 'Show'] = true
    },
    tabsContentClick ($event) {
      if($event.target.className === 'tabs_content'){
         this.isContentType = false;
        this.isShow  = -1
      }
    }
  },
  components: {
    Button,
    ListItem,
    PackerList,
  }
}
</script>
<style>
.intention_item{
  border-top: .01rem solid #f0f0f0;
}
.van-actionsheet__header{
  text-align: left;
  padding-left: .5rem;
}
.sanjiao{
  font-size: .28rem;
  color: #8d8d8d;
  float: right;
}
.sanjiao::after{
  content: "";
  display: inline-block;
  height: .15rem;
  width: .15rem;
  border: 1px solid #8e8e8e;
  border-left: transparent;
  border-top: transparent;
  transform: rotate(-45deg)
}
.btn{
  width: 2rem;
  height: .6rem;
  display: inline-block;
  font-size: .26rem;
  line-height: .6rem;
  border-radius: 20px;
  -webkit-border-radius: 20px;
  border:1px solid #d8d8d8;
  background-color: #fff;
  text-align: center
}
.tabs{
  width: 100%;
  height: .8rem;
  line-height: .8rem;
  background-color: #fff
}
.tabs li{
  height: 100%;
  width: 33.33%;
  text-align: center;
  display: block;
  float: left;
  font-size: .27rem;
  color: #333333;
  position: relative;
}
.isShow{
  color:#ff7b93 !important
}
.tabs li::before{
  content:'';
  display: block;
  position: absolute;
  right: 10%;
  top: 50%;
  margin-top: -.1125rem;
  width: .15rem;
  height: .15rem;
  border:1px solid #333;
  border-top: transparent;
  border-left: transparent;
  transform:rotate(45deg)
}
.tabs li.isShow::before{
  transform: rotate(225deg);
  transition: transform .3s;
  margin-top: -.0375rem;
}
.tabs_content{
  width: 100%;
  position: absolute;
  top: .8rem;
  left: 0;
  height: calc(100% - .8rem);
  z-index: 99;
  background-color: rgba(0,0,0,.1);
}
.tabs_content .tabs_content_group .tabs_content_group_scroll{
  max-height: 7.1rem;
  overflow-x: hidden;
  overflow-y: scroll
}
.tabs_content .item{
  width: 100%;
  display: block;
  background-color: #fff;
  height: .89rem;
  border-top: .01rem solid #f0f0f0;
  text-align: left;
  font-size: .31rem;
  padding:0 .3rem;
  line-height: .89rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.tabs_content .item.submit{
  height: .94rem;
  line-height: .94rem;
  text-align: center;
}
.tabs_content .item.submit .btn:nth-child(1){
  margin-right: 10%
}
.tabs_content .item.submit .btn:nth-child(2){
  margin-left:10%;
  background-color: #ff7994;
  border-color:#ff7994
}
</style>
