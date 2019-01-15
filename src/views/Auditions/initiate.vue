<template>
  <div>
     <NavBar left-arrow @click-left="onClickLeft" title="我要发起"/>
     <div class="option">
        <div class="one"  :class="{active: active >= 0}">
          <span>1</span>
          <i></i>
          <h5>基本资料</h5>
        </div>
        <div class="two" :class="{active: active >= 1}">
          <i></i>
          <span>2</span>
          <h5>参选条件</h5>
       </div>
     </div>

     <div class="content_one" v-if="active === 0">
       <div class="userHead"  @click="submitPhoto">
         <img :src="userHead" alt="">
         <span>封面</span>
       </div>
       <div class="textarea_group">
         <textarea placeholder="备注信息" v-model="context"></textarea>
       </div>
       <div class="numberOfPeople">
         <h6>参选人数</h6>
         <ul>
           <li v-for="(el, index) in groupSize" :key="index" :class="{disabled: !el.isDisabled, active: el.value === groupSizeLimit}" @click="numberOfPeopleClick(el)">{{el.label}}</li>
         </ul>
       </div>
       <div style="text-align: left;">
         <span class="van-radio__input"><input type="radio" class="van-radio__control" value="1"><i class="van-icon van-icon-checked" style="color: rgb(7, 193, 96);"><!----><!----></i></span>
         我保证以上信息属实，绝无虚假
       </div>
       <Button size="large" round class="next" @click="nextClick">下一步</Button>
     </div>

     <div class="content_two" v-if="active === 1">
      <h5 class="content_two_title">择偶意向 (9/9)</h5>
      <ListItem title="年龄" dictionaries='ages' :default='defaultData.age' type="packerTwo" :isSubmit="false" suffix="岁" @confirm="a => defaultData.age = a"></ListItem>

      <ListItem title="身高" dictionaries='heights' :default='defaultData.height' type="packerTwo"  :isSubmit="false" suffix="厘米" @confirm="a => defaultData.height = a"></ListItem>

      <ListItem title="学历" dictionaries='education' :default='defaultData.education' type="packerTwo" :isSubmit="false" @confirm="a => defaultData.education = a"></ListItem>

      <ListItem title="月收入" dictionaries='income' :default='defaultData.income' type="packerTwo" :isSubmit="false" @confirm="a => defaultData.income = a"></ListItem>

      <ListItem title="居住地" :default='defaultData.address' type='address' :isSubmit="false" @confirm="a => defaultData.address = a"></ListItem>

      <ListItem title="婚姻状况" dictionaries='maritalStatus' :default='defaultData.maritalStatus' type="radioOne" :isSubmit="false" @confirm="a => defaultData.maritalStatus = a"></ListItem>

      <ListItem title="购房情况" dictionaries='housePurchase' :default='defaultData.housePurchase' type="radioOne" :isSubmit="false" @confirm="a => defaultData.housePurchase = a"></ListItem>

      <ListItem title="购车情况" dictionaries='car' :default='defaultData.car' type="radioOne" :isSubmit="false" @confirm="a => defaultData.car = a"></ListItem>

      <ListItem title="子女情况" dictionaries='children' :default='defaultData.children' type="radioOne" :isSubmit="false" @confirm="a => defaultData.children = a"></ListItem>

      <div style="padding: 0 .68rem;  box-sizing: border-box;box-sizing: -webkit-border-box">
        <Button size="large" round class="next publish" @click="publishClick">发布</Button>
      </div>
     </div>
  </div>
</template>
<script>
import { NavBar , Button, Toast } from 'vant'
import ListItem from '@/components/ListItem'
import { initiateMassSelection } from '@/assets/common/api' 
export default {
  data () {
    return {
      active: 0,
      // 择偶意向
      defaultData: {},
      // 备注信息
      context: '',
      // 活动封面
      userHead: '',
      // 参选人数
      groupSizeLimit: 1,
      groupSize: [{
        value: 1,
        label: '1-100人',
        isDisabled: false
      },{
        value: 2,
        label: '1-300人',
        isDisabled: false
      },{
        value: 3,
        label: '1-500人',
        isDisabled: false
      },{
        value: 4,
        label: '1-1000人',
        isDisabled: true
      },{
        value: 5,
        label: '1-2000人',
        isDisabled: true
      }],
      // 提交服务器的数据
      submitData: {}
    }
  },
  components: {
    NavBar,
    Button,
    ListItem
  },
  mounted () {
    this.defaultData = this.$store.state.common.selectionIntention
    this.userHead = this.$store.state.IM.user.userHead
  },
  methods: {
    numberOfPeopleClick (el) {
      if(!el.isDisabled){
        this.groupSizeLimit = el.value
      }
    },
    submitPhoto () {
      window.updatePhoto(str => {
        if(str) {
          this.imgUrl = str
          this.fromData.userHead = str
        }
      })
    }, 
    nextClick () {
      this.submitData['picture'] = this.userHead
      if(this.context.replace(/ /g, '') === ''){
        Toast({
          message: '请输入备注信息',
          duration: 1000
        })
        return
      }
      if(this.context.length > 64){
        Toast({
          message: '请将字体个数控制在64位之内，当前为' + this.context.length + '位',
          duration: 1000
        })
        return
      }
      this.submitData['content'] = this.context
      this.submitData['groupSizeLimit'] = this.groupSizeLimit
      this.submitData['userId'] = this.$store.state.IM.user.id
      this.active = 1
    },
    onClickLeft () {
      if(this.active === 1) {
        this.active = 0
        return false
      }
      this.$router.back()
    },
    // 发布
    publishClick () {
      // 年龄
      this.submitData['intentionAgeMin'] = this.defaultData['age'][0].value
      this.submitData['intentionAgeMax'] = this.defaultData['age'][1].value
      // 身高
      this.submitData['intentionHeightMin'] = this.defaultData['height'][0].value
      this.submitData['intentionHeightMax'] = this.defaultData['height'][1].value
      // 收入
      this.submitData['intentionIncomeMin'] = this.defaultData['income'][0].value
      this.submitData['intentionIncomeMin'] = this.defaultData['income'][1].value
      // 学历
      this.submitData['intentionEducationDictValueMin'] = this.defaultData['education'][0].value
      this.submitData['intentionEducationDictValueMin'] = this.defaultData['education'][1].value
      this.submitData['intentionEducationMinName'] = this.defaultData['education'][0].label
      this.submitData['intentionEducationMaxName'] = this.defaultData['education'][1].label
      // 居住地
      this.submitData['intentionDomicileProvinceId'] = this.defaultData['address'][0].code
      this.submitData['intentionDomicileCityId'] = this.defaultData['address'][1].code
      this.submitData['intentionDomicileProvinceName'] = this.defaultData['address'][0].name
      this.submitData['intentionDomicileCityName'] = this.defaultData['address'][1].name
      // 婚姻状况
      this.submitData['intentionMaritalStatusDictValue'] = this.defaultData['maritalStatus'][0].value
      this.submitData['intentionMaritalStatus'] = this.defaultData['maritalStatus'][0].label
      // 子女状况
      this.submitData['intentionChildrenSituationDictValue'] = this.defaultData['children'][0].value
      this.submitData['intentionChildrenSituation'] = this.defaultData['children'][0].label
      // 购房情况
      this.submitData['intentionHouseSituationDictValue'] = this.defaultData['housePurchase'][0].value
      this.submitData['intentionHouseSituation'] = this.defaultData['housePurchase'][0].label
      // 购车情况
      this.submitData['intentionCarSituationDictValue'] = this.defaultData['car'][0].value
      this.submitData['intentionCarSituation'] = this.defaultData['car'][0].label

      initiateMassSelection(this.submitData).then((res) => {
        Toast({
          message: '提交成功',
          duration: 1000
        })
        this.$router.push({name: 'Auditions'})
      })
    }
  }
}
</script>
<style scoped>
.publish{
  margin-top: .5rem !important;
}
.next{
  background-color: #ee7795;
  height: .8rem;
  line-height: .8rem;
  font-size: .32rem;
  color: #fff;
  margin-top: 2.3rem
}
.numberOfPeople ul{
  padding-top: .15rem;
  overflow: hidden;
}
.numberOfPeople li.disabled{
  background-color: #ff7994
}

.numberOfPeople li.active::before{
  content: '';
  display: block;
  width: .3rem;
  height: .3rem;
  position: absolute;
  right: -.1rem;
  bottom: -.1rem;
  background-image: url('../../assets/images/run_active.png');
  background-repeat: no-repeat;
  background-size: 100%
}
.numberOfPeople li{
  float: left;
  padding: .1rem .19rem;
  font-size: .23rem;
  color: #fff;
  background-color: #d8d8d8;
  margin-right: .76rem;
  margin-bottom: .28rem;
  border-radius: .05rem;
  position: relative;
}
.numberOfPeople li.active{

}
.numberOfPeople h6{
  margin: 0;
  text-align: left;
  font-size: .23rem;
  font-weight: 500;
  margin-top: .3rem;
}
.textarea_group{
  box-sizing: border-box;
  box-sizing: -webkit-border-box;
}
.textarea_group textarea{
  width: 6.08rem;
  height: 1.64rem;
  border: 1px solid #d8d8d8;
  padding: .18rem .22rem;
  box-sizing: border-box;
  box-sizing: -webkit-border-box;
  overflow-x: hidden;
  overflow-y: auto;
  font-size: .23rem

}
.content_one{
  padding: .4rem .68rem;
  background-color: #fff
}
.content_two{
  background-color: #fff;
  padding-bottom: .3rem;
  overflow-x: hidden;
  overflow-y: scroll
}
.content_two > div{
  border-bottom: .02rem solid #d7d7d7;
  margin: 0 .3rem;
}
.content_two > div:last-child{
  border-bottom: none
}
.content_two .content_two_title{
  height: .88rem;
  width: 100%;
  text-align: left;
  font-size: .26rem;
  margin: 0;
  line-height: 1.2rem;
  font-weight: 500;
  border-bottom: .01rem solid #d5d5d5;
  padding-left: .3rem;
}
.userHead{
  display: block;
  width: 1.65rem;
  height: 1.65rem;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  z-index: 10;
  margin: .4rem auto .6rem
}
.userHead img{
  width: 100%;
  height: 100%;
}
.userHead span{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: .37rem;
  line-height: .37rem;
  text-align: center;
  color: #fff;
  background-color:rgba(1,1,1,.5)
}
.option{
  padding: .24rem .3rem .44rem;
  box-sizing: border-box;
  box-sizing: -webkit-border-box;
  background-color: #fff;
  margin-bottom: .2rem;
  overflow: hidden;
}
.option > div{
  display: inline-block
}
.option > div span{
  display: inline-block;
  width: .49rem;
  height: .49rem;
  line-height: .49rem;
  border-radius: 50%;
  font-size: .2rem;
  color: #d9d9d9;
  border: .01rem solid;
  border-color: #d9d9d9;
  background-color: #fff
}
.option > div i {
  display: inline-block;
  width: 1.5rem;
  border: .01rem solid #d8d8d8;
  vertical-align: middle;
}
.option > div h5 {
  margin: 0;
  font-size: .23rem;
  display: table-cell;
  margin-top: .2rem;
  font-weight: 500
}
.option > div.one h5{
  transform: translate(-25%, .2rem);
  transform: -webkit-translate(-25%, .2rem);
  text-align: left;
}
.option > div.two h5{
  transform: translate(125%, .2rem);
  transform: -webkit-translate(125%, .2rem);
  text-align: right;
}

.option > div.two , .option > div.one i {
  margin-left: -.06rem;
}
.option > div.one , .option > div.two i {
  margin-right: -.06rem;
}
.option > div.active span, .option > div.active i{
  background-color: #ef7896;
  border-color: #ef7896;
  color: #fff
}
</style>
