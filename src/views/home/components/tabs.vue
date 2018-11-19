<template>
  <div style="position: relative;height:100%">
    <ul class="tabs">
      <li :class="{isShow: index === isShow}" @click.stop="tabsClick(index)" v-for="(item, index) in tabs" :key="index" v-text="item"></li>
    </ul>
    <div class="tabs_content" v-show="isShow >= 0 && isContentType">
      <div v-show="isShow === 0" class="tabs_content_group">
        <div class="item" v-for="(item, index) in IntelligentSorting" :key="item" v-text="item" :class="{isShow: index === IntelligentSortingShow}" @click="IntelligentSortingEvent(index)"></div>
      </div>
      <div v-show="isShow === 1" class="tabs_content_group">
        <div class="tabs_content_group_scroll">
          <div class="item" v-for="(item, index) in BasicScreening" :key="item" @click="BasicScreeningEvent($event, index)">
            {{item}}<div class="sanjiao">不限</div>
          </div>
        </div>
        <div class="item submit">
          <span class="btn">取消</span>
          <span class="btn">确定</span>
        </div>
      </div>
      <div v-show="isShow === 2" class="tabs_content_group">
        <div class="tabs_content_group_scroll">
          <div class="item" v-for="(item, index) in advancedFilter" :key="item" @click="advancedFilterEvent($event, index)">
          {{item}}<div class="sanjiao">不限</div>
          </div>
        </div>
        <div class="item submit">
          <span class="btn">取消</span>
          <span class="btn">确定</span>
        </div>
      </div>
    </div>
    <!-- <Actionsheet v-model="false"> 
      <Picker :columns="columns" @change="onChange" show-toolbar  @cancel="show = false" @confirm="onConfirm" :title='title'/>
    </Actionsheet> -->
    <Actionsheet v-model="show"> 
    <PackerList/>
    </Actionsheet>
  </div>
</template>

<script>
import { Actionsheet, Picker, Button} from 'vant'
import PackerList from './PackerList'

var testData = {
  address: {
  '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  '福建': ['福州', '厦门', '莆田', '三明', '泉州']
  }
}

export default {
  data () {
    return {
      isShow: -1, // 当前要显示的tabs页
      isContentType: false, // 筛选框是否显示
      show: false, // 选择器是否显示
      value: '', // 储存当前选择的筛选条件标识，用来更新选择器内的内容
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
        // 基本筛选条件
        address: '', // 居住地
        age: [], // 年龄（区间）
        height: [], // 身高（区间）
        maritalStatus: 1, // 婚姻状况
        education: [], // 学历（区间）
        income: [], // 收入（区间）
        loveType: 1, // 恋爱类型
        // 高级筛选
        housePurchase: 1, // 是否购房
        car: 1, // 购车情况
        registeredPermanentResidence: 1, // 户口
        hometown: [], // 家乡(地址)
        children: 1, // 子女
        constellation: 1, // 星座
        theRealNameSystem:1, // 实名
        picture: 1, // 是否有照片
        member: 1, // 是否会员
        onLine: 1, // 是否在线
        profession: 1, // 职业
        bloodType: 1, // 血型
        nation: 1, // 民族
        religion: 1, // 宗教
      }, 
      defaultData: {
        address: {
          title: '居住地',
          type: 2,
          columns: [
            {
              values: Object.keys(testData['address'])
            },
            {
              values: testData['address'][Object.keys(testData['address'])[0]]
            }
          ]
        },
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
        }
      } // 储存选项初始数据
    }
  },
  methods: {
    // 年龄
    ages (num) {
      num = num || 18
      var arr = Array.from({length: 80 - num}, (v, k) => num ? k + num + '岁' : k + 19 + '岁');
      return ['不限'].concat(arr)
    },
    // 身高
    heights (num) {
       num = num || 145
      var arr = Array.from({length: 210 - num}, (v, k) => num ? k + num + 'cm' : k + 145 + 'cm');
      return ['不限'].concat(arr)
    },
    onChange (picker, values) {
      switch (this.value){
        case 'address':
          picker.setColumnValues(1,testData[this.value][values[0]]);
          break
        case 'age':
          picker.setColumnValues(1,this.ages(parseInt(values[0].replace('岁', ''))))
          break
        case 'height':
          picker.setColumnValues(1,this.heights(parseInt(values[0].replace('cm', ''))))
          break
      } 
    },
    onConfirm (value) {
      var str = ''
      switch(this.value){
        case 'address':
          str = value[1];
          break;
        default :
          str = value[0] + '-' + value[1];
          break
      }
      this.event.innerText = str
      this.show = false
    },
    // tabs选项卡点击事件
    tabsClick(index) {
      if(this.isShow === index){
        this.isContentType = !this.isContentType
        this.isShow = -1
        return false
      }
      this.isShow = index;
      this.isContentType = true
    },
    // 智能排序选项点击事件
    IntelligentSortingEvent (index) {
      this.IntelligentSortingShow = index
      this.isShow = -1 // 关闭当前下拉框
    },
    // 基本筛选每项点击事件
    BasicScreeningEvent ($event, index) {
      // 获取当前名称
      this.value = this.BasicScreeningValue[index]
      // 获取当前类型
      this.columnType = this.defaultData[this.value].type
      // 获取当前元素
      this.event = $event.target.children[0]
      if(this.columnType === 2){
        this.show = true
      } else {

      }
    },
    // 高级搜索每项点击事件
    advancedFilterEvent ($event, index) {
    }
  },
  computed: {
    columns () {
      if(!this.value){return false}
      this.title = this.defaultData[this.value].title
      return this.defaultData[this.value].columns
    }
  },
  components: {
    Actionsheet,
    Picker,
    Button,
    PackerList
  }
}
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
