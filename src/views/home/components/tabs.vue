<template>
  <div style="position: relative">
    <ul class="tabs">
      <li :class="{isShow: index === isShow}" @click.prevent="tabsClick(index)" v-for="(item, index) in tabs" :key="index" v-text="item"></li>
    </ul>
    <div class="tabs_content" v-show="isShow >= 0 && isContentType">
      <div v-show="isShow === 0" class="tabs_content_group">
        <div class="item" v-for="(item, index) in IntelligentSorting" :key="item" v-text="item" :class="{isShow: index === IntelligentSortingShow}" @click.prevent="IntelligentSortingEvent(index)"></div>
      </div>
      <div v-show="isShow === 1" class="tabs_content_group">
        <div class="tabs_content_group_scroll">
          <div class="item" v-for="(item, index) in BasicScreening" :key="item" @click.prevent="clickEvent($event, index, 'BasicScreeningValue')">
            {{item}}<div class="sanjiao">不限</div>
          </div>
        </div>
        <div class="item submit">
          <span class="btn" @click="reset">重置</span>
          <span class="btn" @click='submitData'>确定</span>
        </div>
      </div>
      <div v-show="isShow === 2" class="tabs_content_group">
        <div class="tabs_content_group_scroll">
          <div class="item" v-for="(item, index) in advancedFilter" :key="item" @click.prevent="clickEvent($event, index, 'advancedFilterValue')">
          {{item}}<div class="sanjiao">不限</div>
          </div>
        </div>
        <div class="item submit">
          <span class="btn" @click="reset">重置</span>
          <span class="btn" @click='submitData'>确定</span>
        </div>
      </div>
    </div>
    <Actionsheet v-model="show"> 
      <Picker :columns="columns" @change="onChange" show-toolbar  @cancel="show = false" @confirm="onConfirm" :title='title'/>
    </Actionsheet>
    <Actionsheet v-model="listShow"> 
      <PackerList :columns="columns" v-model="defaultValue" @confirm="confirm" @cancel='listShow = false' :title="title" :radio='radio'/>
    </Actionsheet>
  </div>
</template>

<script>
import { Actionsheet, Picker, Button} from 'vant'
import PackerList from './PackerList'
import Vue from 'vue'
import { basicQueryCriteria, getProvinceAndCityList} from '@/assets/common/api'
import { mapState, mapMutations } from 'vuex';

var testData = {
  address: {
  '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  '福建': ['福州', '厦门', '莆田', '三明', '泉州']
  },
  maritalStatus: [{
    label: '未婚',
    value: 1
  }, {
    label: '离异',
    value: 2
  }],
  education: [{
    label: '高中',
    value: 1
  },{
    label: '大专',
    value: 2
  },{
    label: '本科',
    value: 3
  },{
    label: '博士',
    value: 4
  }],
  income: [{
    label: '2000',
    value: 1
  },{
    label: '5000',
    value: 2
  },{
    label: '10000',
    value: 3
  },{
    label: '20000',
    value: 4
  }],
  loveType: [
    {
    label: '哲学家型',
    value: 1
  },{
    label: '作家型',
    value: 2
  },{
    label: '学者型',
    value: 3
  },{
    label: '专家型',
    value: 4
  }
  ],
  housePurchase: [
    {
    label: '租房',
    value: 1
  },{
    label: '有房',
    value: 2
  },{
    label: '两套房',
    value: 3
  },{
    label: '和家人同住',
    value: 4
  }
  ],
  car: [
    {
    label: '全款',
    value: 1
  },{
    label: '分期',
    value: 2
  },{
    label: '无',
    value: 3
  }
  ],
  registeredPermanentResidence: [
    {
    label: '城市',
    value: 1
  },{
    label: '农村',
    value: 2
  },
  ],
  hometown:{
  '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  '福建': ['福州', '厦门', '莆田', '三明', '泉州']
  },
  children: [
    {
    label: '有',
    value: 1
  },{
    label: '无',
    value: 2
  },
  ],
  constellation: [
    {
    label: '天秤座',
    value: 1
  },{
    label: '天蝎座',
    value: 2
  },{
    label: '水瓶座',
    value: 3
  }
  ],
  theRealNameSystem: [
    {
    label: '实名',
    value: 1
  },{
    label: '未实名',
    value: 2
  }
  ],
  picture: [
    {
    label: '有照片',
    value: 1
  },{
    label: '无照片',
    value: 2
  }
  ],
  member: [
    {
    label: '是会员',
    value: 1
  },{
    label: '不是会员',
    value: 2
  }
  ],
  onLine: [
    {
    label: '在线',
    value: 1
  },{
    label: '不在线',
    value: 2
  }
  ],profession: [
    {
    label: 'IT',
    value: 1
  },{
    label: '司机',
    value: 2
  }
  ],bloodType: [
    {
    label: 'O型',
    value: 1
  },{
    label: 'AB型',
    value: 2
  }
  ],nation: [
    {
    label: '汉族',
    value: 1
  },{
    label: '维吾尔族',
    value: 2
  }
  ],religion: [
    {
    label: '佛教',
    value: 1
  },{
    label: '伊斯兰教',
    value: 2
  }
  ],
}

export default {
  props:{
    value: Object
  },
  data () {
    return {
      isShow: -1, // 当前要显示的tabs页
      isContentType: false, // 筛选框是否显示
      show: false, // 选择器是否显示
      listShow: false, // 列表选择器是否显示
      radio: false, // 是否单选  默认多选
      valueName: '', // 储存当前选择的筛选条件标识，用来更新选择器内的内容
      columnType: 0, // 当前选择器的类型，是列表选择还是滑动选择
      title: '',
      event:null, // 储存当前点击的行，用来更改当前选择完成的内容返现
      tabs: ['智能排序', '基本筛选', '高级筛选'], // tabs内容
      IntelligentSorting: ['智能排序', '最新加入', '收入排序', '最新推荐'], // 智能排序
      IntelligentSortingShow: 0, // 智能排序默认显示的内容
      BasicScreening: ['居住地', '年龄', '身高', '婚姻状况', '学历', '月收入', '恋爱类型'], // 基本筛选
      BasicScreeningValue: ['address', 'age', 'height', 'maritalStatus', 'education', 'income', 'loveType'], // 基本筛选对应名称
      advancedFilter: ['购房情况', '购车情况', '户口', '家乡', '有无子女', '星座', '是否实名', '是否有照片', '是否是会员', '是否在线', '职业', '血型', '民族', '宗教信仰'], // 高级筛选
      advancedFilterValue: ['housePurchase', 'car', 'registeredPermanentResidence', 'hometown', 'children', 'constellation', 'theRealNameSystem', 'picture', 'member', 'onLine', 'profession', 'bloodType', 'nation', 'religion'], // 高级筛选对应名称
      fromData: {
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
      basicQueryCriteria: [],
      defaultData: {}
    }
  },
  methods: {
    ...mapMutations([
      'showLoading',
      'hideLoading'
    ]),
    getAddress (id) {
      
    },
    reset () {
      this.fromData = {
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
      this.$emit('updateVal', this.fromData)
    },
    setParentData (val) {
      // 设置夫级的数据
      if (this.valueName === 'type') {
        Vue.set(this.fromData, this.valueName, val)
      } else {
        Vue.set(this.fromData, this.valueName, this.replaceArr(val))
      }
      this.$emit('updateVal', this.fromData)
    },
    // 获取数组内的对象
    findObj (arr, name, value) {
      return arr.find(el => el[name] === value)
    },
    submitData () {
      this.$emit('search')
    },
    replaceArr (arr) {
      return arr.map(item => item.replace('岁', '').replace('cm', ''))
    },
    unshiftArr (arr){
      return typeof arr[0] === 'object'? [{value: -1,label: '不限'}].concat(arr): ['不限'].concat(arr)
    },
    maps (arr) {
      return arr.map(item => item.label)
    },
    // 年龄
    ages (num) {
      let obj = this.findObj(this.basicQueryCriteria, 'criteriaName', 'age')
      let min = parseInt(this.findObj(obj.criteriaVoList, 'value', '1').label)
      let max = parseInt(this.findObj(obj.criteriaVoList, 'value', '2').label)
      num = num || min
      var arr = Array.from({length: max - num}, (v, k) => num ? k + num + '岁' : k + (min + 1) + '岁');
      return this.unshiftArr(arr)
    },
    // 身高
    heights (num) {
      let obj = this.findObj(this.basicQueryCriteria, 'criteriaName', 'height')
      let min = parseInt(this.findObj(obj.criteriaVoList, 'value', '1').label)
       let max = parseInt(this.findObj(obj.criteriaVoList, 'value', '2').label)
      num = num || min
      var arr = Array.from({length: max - num}, (v, k) => num ? k + num + 'cm' : k + (min + 1) + 'cm');
      return this.unshiftArr(arr)
    },
    onChange (picker, values) {
      switch (this.valueName){
        case 'address':
          picker.setColumnValues(1,testData[this.valueName][values[0]]);
          break
        case 'age':
          picker.setColumnValues(1,this.ages(parseInt(values[0].replace('岁', ''))))
          break
        case 'height':
          picker.setColumnValues(1,this.heights(parseInt(values[0].replace('cm', ''))))
          break
        case 'education':
          picker.setColumnValues(1,this.unshiftArr(this.maps(testData['education'].filter((item,index,arr) => {
            return index > arr.findIndex(el => el.label === values[0])
          }))))
          break
        case 'income':
          picker.setColumnValues(1,this.unshiftArr(this.maps(testData['income'].filter((item,index,arr) => {
            return index > arr.findIndex(el => el.label === values[0])
          }))))
          break
        case 'hometown':
          picker.setColumnValues(1,testData[this.valueName][values[0]]);
          break
      } 
    },
    onConfirm (value) {
      var str = ''
      switch (this.valueName) {
        case 'address':
          str = value[1];
          break;
        case 'hometown':
          str = value[1];
          break
        default :
          str = value[0] + '-' + value[1];
          break
      }
      this.event.innerText = str
      // 设置夫级的数据
      this.setParentData(value)

      this.show = false;
    },
    confirm (val) {
      this.event.innerText = val.join(',')
      // 设置夫级的数据
      this.setParentData(val)

      this.listShow = false
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
      // 设置当前点击的为智能检索
      this.valueName = 'type'
      this.IntelligentSortingShow = index
      this.isShow = -1 // 关闭当前下拉框

      this.fromData['type'] = index + 1
      // 设置夫级的数据
      this.setParentData(this.fromData['type'])
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
      // 获取当前类型
      this.columnType = this.defaultData[this.valueName].type
      
      if (this.columnType === 2) {
        this.show = true
      } else {
        this.listShow = true;
        this.radio = this.defaultData[this.valueName].radio
      }
    }
  },
  created () {
    var that = this
    // this.showLoading()
    basicQueryCriteria({}).then((res) => {
      // this.hideLoading()
      console.log(res.data)
      this.basicQueryCriteria = res.data
      this.defaultData = Object.assign(this.defaultData,{
        age: {
          title: '年龄',
          type: 2,
          columns: [
            {
              values: this.ages()
            },
            {
              values: this.ages()
            }
          ]
        },
        height: {
          title: '身高',
          type: 2,
          columns: [
            {
              values: this.heights()
            },
            {
              values: this.heights()
            }
          ]
        },
        maritalStatus: {
          title: '婚姻状况',
          type: 1,
          radio:false,
          columns: this.maps(this.findObj(this.basicQueryCriteria,'criteriaName', 'maritalStatus').criteriaVoList)
        },
        education: {
          title: '学历',
          type: 2,
          columns: [
            {
              values: this.unshiftArr(this.maps(testData['education']))
            },
            {
              values: this.unshiftArr(this.maps(testData['education']))
            }
          ]
        },
        income: {
          title: '月收入',
          type: 2,
          columns: [
            {
              values: this.unshiftArr(this.maps(testData['income']))
            },
            {
              values: this.unshiftArr(this.maps(testData['income']))
            }
          ]
        }
      }) // 储存选项初始数据

      console.log(this.defaultData, ' 修改完成的数据')
    })
  },
  computed: {
    columns () {
      if(!this.valueName || this.valueName === 'type'){return false}
      this.title = this.defaultData[this.valueName].title
      return this.defaultData[this.valueName].columns
    },
    defaultValue () {
      return this.fromData[this.valueName]
    }
  },
  watch: {
    fromData (value) {
      console.log('更新了')
      this.$emit('updateVal', value)
    }
  },
  components: {
    Actionsheet,
    Picker,
    Button,
    PackerList
  }
}

getProvinceAndCityList({})
// {
//         address: {
//           title: '居住地',
//           type: 2,
//           columns: [
//             {
//               values: Object.keys(testData['address'])
//             },
//             {
//               values: testData['address'][Object.keys(testData['address'])[0]]
//             }
//           ]
//         },
//         age: {
//           title: '年龄',
//           type: 2,
//           columns: [
//             {
//               values: this.ages()
//             },
//             {
//               values: this.ages()
//             }
//           ]
//         },
//         height: {
//           title: '身高',
//           type: 2,
//           columns: [
//             {
//               values: this.heights()
//             },
//             {
//               values: this.heights()
//             }
//           ]
//         },
//         maritalStatus: {
//           title: '婚姻状况',
//           type: 1,
//           radio:false,
//           columns: testData['maritalStatus']
//         },
//         education: {
//           title: '学历',
//           type: 2,
//           columns: [
//             {
//               values: this.unshiftArr(this.maps(testData['education']))
//             },
//             {
//               values: this.unshiftArr(this.maps(testData['education']))
//             }
//           ]
//         },
//         income: {
//           title: '月收入',
//           type: 2,
//           columns: [
//             {
//               values: this.unshiftArr(this.maps(testData['income']))
//             },
//             {
//               values: this.unshiftArr(this.maps(testData['income']))
//             }
//           ]
//         },
//         loveType: {
//           title: '恋爱类型',
//           type: 1,
//           radio:false,
//           columns: this.unshiftArr(testData['loveType'])
//         },
//         housePurchase: {
//           title: '购房情况',
//           type: 1,
//           radio:true,
//           columns: this.unshiftArr(testData['housePurchase'])
//         },
//         car: {
//           title: '购车情况',
//           type: 1,
//           radio:true,
//           columns: this.unshiftArr(testData['car'])
//         },
//         registeredPermanentResidence: {
//           title: '户口',
//           type: 1,
//           radio:true,
//           columns: this.unshiftArr(testData['registeredPermanentResidence'])
//         },
//         hometown: {
//           title: '家乡',
//           type: 2,
//           columns: [
//             {
//               values: Object.keys(testData['hometown'])
//             },
//             {
//               values: testData['hometown'][Object.keys(testData['hometown'])[0]]
//             }
//           ]
//         },
//         children: {
//           title: '有无子女',
//           type: 1,
//           radio:true,
//           columns: this.unshiftArr(testData['children'])
//         },
//         constellation: {
//           title: '星座',
//           type: 1,
//           radio:false,
//           columns: this.unshiftArr(testData['constellation'])
//         },
//         theRealNameSystem: {
//           title: '是否实名',
//           type: 1,
//           radio:true,
//           columns: this.unshiftArr(testData['theRealNameSystem'])
//         },
//         picture: {
//           title: '是否有照片',
//           type: 1,
//           radio:true,
//           columns: this.unshiftArr(testData['picture'])
//         },
//         member: {
//           title: '是否会员',
//           type: 1,
//           radio:true,
//           columns: this.unshiftArr(testData['member'])
//         },
//         onLine: {
//           title: '是否在线',
//           type: 1,
//           radio:true,
//           columns: this.unshiftArr(testData['onLine'])
//         },
//         profession: {
//           title: '职业',
//           type: 1,
//           radio:true,
//           columns: this.unshiftArr(testData['profession'])
//         },
//         bloodType: {
//           title: '血型',
//           type: 1,
//           radio:false,
//           columns: this.unshiftArr(testData['bloodType'])
//         },
//         nation: {
//           title: '民族',
//           type: 1,
//           radio:false,
//           columns: this.unshiftArr(testData['nation'])
//         },
//         religion: {
//           title: '宗教',
//           type: 1,
//           radio:false,
//           columns: this.unshiftArr(testData['religion'])
//         },
//       } // 储存选项初始数据
</script>
<style>
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
  height:100%;
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
