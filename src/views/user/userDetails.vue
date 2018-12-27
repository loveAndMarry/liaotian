<template>
  <div class="group">
    <div style="overflow-y: scroll;position: relative;height: 100%;overflow-x: hidden;">
      <div class="group_back">
        <img :src="data.userBaseInformation.userHead" alt>
      </div>
      <div class="group_content">
        <div class="top"></div>
      </div>
      <div class="content" v-if="isData">
        <NavBar left-arrow @click-left="onClickLeft"/>
        <div class="content_head">
          <div class="item">
            <!-- <van-circle
              v-model="currentRate"
              :rate="parseInt(data.dataIntegrity)"
              :speed="100"
              :text="text"
              fill="#fff"
              size="1rem"
              color="#ff7994"
            /> -->
            <div class="dataIntegrity">
              <span class="dataIntegrity_num">{{data.dataIntegrity + '%'}}</span>
              <div class="dataIntegrity_back" :style="{top: 75 - (data.dataIntegrity / 100 * 90) + '%'}"></div> 
            </div>
            <p>资料完整度</p>
          </div>
          <div class="head" @click="updatePhoto">
            <div class="head_img">
              <img :src="data.userBaseInformation.userHead" alt>
              <span>{{data.userBaseInformation.states === '1'? '审核中' : '更换头像'}}</span>
            </div>
            <i class="member"><img :src="data.userBaseInformation.ico" alt=""></i>
          </div>
          <div class="item" @click="linkClick">
            <div class="link"></div>
            <p>谁喜欢我</p>
          </div>
        </div>
        <div class="content_name">
          <h2>{{data.userBaseInformation.nikeName}}
            <span v-if="user.registerState === '4'">实名</span>
          </h2>
          <div>
            <span>{{data.userBaseInformation.age}}岁</span>
            <span>{{data.userBaseInformation.height}}厘米</span>
            <span>{{data.userBaseInformation.domicileName}}</span>
          </div>
        </div>


        <SplitGroup title="最近访客" rightTitle="更多访客" style="margin-top:.6rem" @confirm="visitorClick">
          <img
            class="visitor_img"
            :src="item.userHead"
            v-for="(item, index) in data.accessRecordUserList" :key="index" @click="accessRecord(item)">
        </SplitGroup>


        <SplitGroup title="自我介绍" rightTitle="编辑" @confirm="selfClick">
          <p
            class="self-introduction"
          >{{data.userBaseInformation.personalIntroduction}}</p>
        </SplitGroup>


         <SplitGroup title="基本资料" :isRight="false">

          <ListItem title="ID" :default='getData(["","userNo"])' :noClick="true"></ListItem>

          <ListItem title="昵称" :default='getData(["","nickName"])' :isEmitClick="true" @click="nickNameClick"></ListItem>

          <ListItem title="性别" :default='getData(["","sexName"])' :noClick="true"></ListItem>
          
          <div class="intention_item" @click="birthdayClick">生日:
            <div class="sanjiao ">{{data.userBaseInformation.birthday || '未填写'}}</div>
          </div>

          <ListItem title="身高" dictionaries='heights' :default='getData(height)' type="packerOne" :defaultSubmitData ="height" suffix="厘米"></ListItem>

         <ListItem title="学历" dictionaries='education' :default='getData(education)' type="packerOne" :defaultSubmitData ="education"></ListItem>

          <ListItem title="月收入" dictionaries='incomeRange' :default='incomeDefault' type="packerOne" :defaultSubmitData ="income"></ListItem>

          <ListItem title="居住地" :default='getAddressData(domicile)' type='address' :defaultSubmitData ="domicile"></ListItem>

          <ListItem title="婚姻状况" dictionaries='maritalStatus' :default='getData(maritalStatus)' type="radioOne" :defaultSubmitData ="maritalStatus"></ListItem>

          <ListItem title="子女情况" dictionaries='children' :default='getData(childrenSituation)' type="radioOne" :defaultSubmitData ="childrenSituation"></ListItem>

          <ListItem title="购房情况" dictionaries='housePurchase' :default='getData(houseSituation)' type="radioOne" :defaultSubmitData ="houseSituation"></ListItem>

          <ListItem title="购车情况" dictionaries='car' :default='getData(carSituation)' type="radioOne" :defaultSubmitData ="carSituation"></ListItem>

        </SplitGroup>


        <SplitGroup title="择偶意向" :isRight="false">

          <ListItem title="年龄" dictionaries='ages' :default='getData(ages)' type="packerTwo" :defaultSubmitData ="ages" suffix="岁"></ListItem>

          <ListItem title="身高" dictionaries='heights' :default='getData(intentionHeight)' type="packerTwo" :defaultSubmitData ="intentionHeight" suffix="厘米"></ListItem>

          <ListItem title="学历" dictionaries='education' :default='getData(intentionEducation)' type="packerTwo" :defaultSubmitData ="intentionEducation"></ListItem>

          <ListItem title="月收入" dictionaries='income' :default='getData(intentionIncome)' type="packerTwo" :defaultSubmitData ="intentionIncome"></ListItem>

          <ListItem title="居住地" :default='getAddressData(intentionDomicile)' type='address' :defaultSubmitData ="intentionDomicile"></ListItem>

          <ListItem title="婚姻状况" dictionaries='maritalStatus' :default='getData(intentionMaritalStatus)' type="radioOne" :defaultSubmitData ="intentionMaritalStatus"></ListItem>

          <ListItem title="购房情况" dictionaries='housePurchase' :default='getData(intentionHouseSituation)' type="radioOne" :defaultSubmitData ="intentionHouseSituation"></ListItem>

          <ListItem title="购车情况" dictionaries='car' :default='getData(intentionCarSituation)' type="radioOne" :defaultSubmitData ="intentionCarSituation"></ListItem>

          <ListItem title="子女情况" dictionaries='children' :default='getData(intentionChildrenSituation)' type="radioOne" :defaultSubmitData ="intentionChildrenSituation"></ListItem>

        </SplitGroup>

        <SplitGroup title="小档案" :isRight="false">

          <ListItem title="家乡" :default='getAddressData(hometown)' type='address' :defaultSubmitData ="hometown"></ListItem>

          <ListItem title="户口" :default='getAddressData(registeredResidence)' type='address' :defaultSubmitData ="registeredResidence"></ListItem>

          <ListItem title="民族" dictionaries='nation' :default='getData(nation)' type="radioOne" :defaultSubmitData ="nation"></ListItem>

          <ListItem title="属相" :default="getData(['','zodiac'])" :noClick="true" ref="zodiac"></ListItem>

          <ListItem title="星座" :default="getData(['','constellation'])" :noClick="true" ref="constellation"></ListItem>

          <ListItem title="血型" dictionaries='bloodType' :default='getData(bloodType)' type="radioOne" :defaultSubmitData ="bloodType"></ListItem>

          <ListItem title="体型" dictionaries='shape' :default='getData(shape)' type="radioOne" :defaultSubmitData ="shape"></ListItem>

          <ListItem title="体重" dictionaries='weights' :default='getData(weight)' type="radioOne" :defaultSubmitData ="weight"></ListItem>

          <ListItem title="宗教" dictionaries='religion' :default='getData(religiousBelief)' type="radioOne" :defaultSubmitData ="religiousBelief"></ListItem>

          <ListItem title="是否喝酒" dictionaries='is_drink_alcohol' :default='getData(isDrinkAlcohol)' type="radioOne" :defaultSubmitData ="isDrinkAlcohol"></ListItem>

          <ListItem title="是否吸烟" dictionaries='is_smoke' :default='getData(isSmoke)' type="radioOne" :defaultSubmitData ="isSmoke"></ListItem>
        </SplitGroup>


        <SplitGroup title="兴趣爱好" rightTitle="编辑" @confirm="hobbiesClick">
          <div class="hint_group">
            <span class="hint" v-for="(hint, i) in data.userBaseInformation.interestDictVoList" :key="i">{{hint.label}}</span>
          </div>
        </SplitGroup>
      </div>
    </div>

    <van-dialog
      v-model="isShow"
      show-cancel-button
      :showConfirmButton="false"
      :showCancelButton="false"
      closeOnClickOverlay
      :before-close="beforeClose">
      <div class="dialog_content">
        <span>谁喜欢了我</span>
        <p>开通会员，随时查看悄悄查看你的用户，更可享有更多特权！</p>
        <router-link to="###" class="submit">开通会员</router-link>
      </div>
    </van-dialog>
  </div>
</template>
<script>
import { NavBar, Circle, Field, Toast, Picker, Actionsheet} from "vant";
import SplitGroup from "@/components/SplitGroup";
import { userPersonalCenterInformation, updateUserSpecificInfo,updateUserBirthday, uploadUserHand } from '@/assets/common/api' 
import Vue from "vue";
import { mapState } from 'vuex'
import ListItem from '@/components/ListItem'

Vue.use(Circle);
export default {
  data() {
    return {
      index: 1,
      isData: false,
      isShow: false,
      currentRate: 0,
      nickNameShow: false,
      data: {
        dataIntegrity: 0,
        userBaseInformation: {
          userBaseInformation:[]
        },
        accessRecordUserList: []
      },
      domicile: ['domicileProvinceId','domicileProvinceName','domicileCityId','domicileCityName'],
      // 身高
      height: ['height','height'],
      // 学历
      education: ['educationDictValue','education'],
            // 月收入
      income: ['','incomeMin', '', 'incomeMax'],
      // 婚姻状况
      maritalStatus: ['maritalStatusDictValue','maritalStatus'],
      // 子女状况
      childrenSituation: ['childrenSituationDictValue','childrenSituation'],
      // 购房状况
      houseSituation: ['houseSituationDictValue', 'houseSituation'],
      // 购房状况
      carSituation: ['carSituationDictValue', 'carSituation'],
      // 择偶意向年龄
      ages: ['intentionAgeMin','intentionAgeMin','intentionAgeMax','intentionAgeMax'],
      // 择偶意向身高
      intentionHeight: ['intentionHeightMin','intentionHeightMin','intentionHeightMax','intentionHeightMax'],
      // 择偶意向居住地
      intentionDomicile: ['intentionDomicileProvinceId','intentionDomicileProvinceName','intentionDomicileCityId','intentionDomicileCityName'],
      // 择偶意向学历
      intentionEducation: ['intentionEducationDictValueMin','intentionEducationMinName','intentionEducationDictValueMax','intentionEducationMaxName'],
      // 择偶意向月收入
      intentionIncome: ['intentionIncomeMin','intentionIncomeMin','intentionIncomeMax','intentionIncomeMax'],
      // 择偶意向婚姻状况
      intentionMaritalStatus: ['intentionMaritalStatusDictValue', 'intentionMaritalStatus'],
      // 择偶意向购房情况
      intentionHouseSituation: ['intentionHouseSituationDictValue','intentionHouseSituation'],
      // 择偶意向购车情况
      intentionCarSituation: ['intentionCarSituationDictValue','intentionCarSituation'],
      // 择偶意向子女状况
      intentionChildrenSituation: ['intentionChildrenSituationDictValue','intentionChildrenSituation'],
       // 家乡
      hometown: ['hometownProvinceId','hometownProvinceName','hometownCityId','hometownCityName'],
       // 户口
      registeredResidence: ['registeredResidenceProvinceId','registeredResidenceProvinceName','registeredResidenceCityId','registeredResidenceCityName'],
      // 民族
      nation: ['nationDictValue','nation'],
      // 血型
      bloodType: ['bloodTypeDictValue','bloodType'],
      // 体型
      shape: ['shapeDictValue','shape'],
      // 体重
      weight: ['weight','weight'],
      // 宗教
      religiousBelief: ['religiousBeliefDictValue','religiousBelief'],
      // 是否喝酒
      isDrinkAlcohol: ['isDrinkAlcoholDictValue','isDrinkAlcohol'],
      // 是否抽烟
      isSmoke: ['isSmokeDictValue', 'isSmoke']
    }
  },
  computed: {
    ...mapState({
      user: state => state.IM.user
    }),
    text() {
      return this.currentRate.toFixed(0) + "%";
    },
    incomeDefault () {
      let min = this.data.userBaseInformation.incomeMin
      let max = this.data.userBaseInformation.incomeMax
      let str = ''
      if(min === '' && max === ''){
        str = '不限'
      } else if(min === '-1' && max === '-1'){
        str = '不限'
      } else if(min === '-1' && max !== '-1'){
        str = max + '以上'
      } else if(min !== '-1' && max === '-1'){
        str = min + '以下'
      } else {
        str = min + "-" + max + '元'
      }
      return [{
        value: this.data.userBaseInformation.incomeDictValue,
        label: str
      }]
    }
  },
  mounted () {
    this.updateData()
  },
  methods: {
    // 点击最近访客进入个人信息页面
    accessRecord (item) {
      this.$store.state.IM.friend = item
      this.$router.push({name: 'userDetail'})
    },
    updateData (){
      userPersonalCenterInformation({ userId: this.user.id}).then((res) => {
        if(res.data){
          this.data = Object.assign(this.data, res.data)
          this.$store.state.IM.user.userHead = this.data.userBaseInformation.userHead
          this.isData = true
        }
      })
    },
    updatePhoto () {
      window.updatePhoto(str => {
        if(str) {
          uploadUserHand({
            userId: this.user.id,
            photoUrl: str
          }).then(() => {
            this.$toast('头像修改成功')
            this.data.userBaseInformation.userHead = str
            this.data.userBaseInformation.states = '1'
            this.user.userHead = str
            this.user.states = '1'
          })
        }
      })
    },
    getData (arr) {
      let num = Math.round(arr.length /2)
      let a = []
      for( var i = 0 ; i < num ; i ++ ){
        let b = arr.slice(i * 2, i * 2 + 2)
        a.push({
          value: this.data.userBaseInformation[b[0]] || '',
          label: this.data.userBaseInformation[b[1]] || ''
        })
      }
      return a
    },
    getAddressData (arr) {
      let num = Math.round(arr.length /2)
      let a = []
      for( var i = 0 ; i < num ; i ++ ){
        let b = arr.slice(i * 2, i * 2 + 2)
        a.push({
          code: this.data.userBaseInformation[b[0]] || '',
          name: this.data.userBaseInformation[b[1]] || ''
        })
      }
      return a
    },
    addressCallback (name, arr) {
      let provinceId = arr[0].code
      let provinceName = arr[0].name
      let cityId = arr[1].code
      let cityName = arr[1].name
      updateUserSpecificInfo({
        userId: this.user.id,
        [name + 'ProvinceId']: provinceId,
        [name + 'CityId']: cityId,
      }).then(() => {
        this[name + 'Show'] = false
        this.$set(this.data.userBaseInformation, name + 'Name' , provinceName + ' ' + cityName)
      })
    },
    confirmCallback (name, arr) {
      updateUserSpecificInfo({
        userId: this.user.id,
        [name + 'DictValue']: arr[0].value,
        [name]: arr[0].label,
      }).then(() => {
        this[name + 'Show'] = false
        this.$set(this.data.userBaseInformation, name + 'DictValue' , arr[0].value)
        this.$set(this.data.userBaseInformation, name , arr[0].label)
      })
    },
    birthdayClick () {
      // 进行实名认证之后生日不可修改
      if(parseInt(this.data.userBaseInformation.registerState) >= 4 ){
        this.$toast('实名认证之后生日不可修改')
        return
      }
      this.$picker.show({
        type:'datePicker',
        date:this.data.userBaseInformation.birthday,  //初始化时间
        endTime:new Date().getFullYear() + '-12-12',  //截至时间
        startTime:'1950-1-1',  //开始时间
        onOk:(e)=>{
          updateUserBirthday({
            userId: this.user.id,
            birthday: e
          }).then((res) => {
            this.$nextTick(() => {
              this.data.userBaseInformation.age = res.data.age
              this.$refs.constellation.names = res.data.constellation
              this.$refs.zodiac.names = res.data.zodiac
              // this.$router.go(0)
              this.$set(this.data.userBaseInformation, 'birthday' , e)
            })
          })
        },
      })
    },
    linkClick () {
      // this.isShow = true
      this.$router.push({name: 'link', query: {type: 2}})
    },
    nickNameClick () {
      this.$router.push({name: 'nickName',query:{nickName: this.data.userBaseInformation.nickName}})
    },
    onClickLeft() {
      this.$router.push({name: 'user'})
    },
    visitorClick () {
      this.$router.push({name: 'RecentVisitors'})
    },
    selfClick () {
      this.$router.push({name: 'selfIntroduction', query: {
        personalIntroduction: this.data.userBaseInformation.personalIntroduction || ''
      }})
    },
    hobbiesClick () {
      this.$router.push({name: 'Hobbies', query: {
        interestDictVoList: this.data.userBaseInformation.interestDictVoList || []
      }})
    },
    beforeClose () {
      this.nickNameShow = false
    },
    
  },
  components: {
    NavBar,
    SplitGroup,
    Field,
    Actionsheet,
    Picker,
    ListItem
  }
};
</script>
<style scoped>
.head_img {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #fff;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: 999;
  -webkit-border-radius: 50%;
}
.head .member{
    position: absolute;
    display: inline-block;
    height: .5rem;
    width: .5rem;
    vertical-align: middle;
    bottom: 0px;
    right: 0;
    z-index: 1000;
}
.head .member img{
  width: 100%;
  height: 100%
}
.dataIntegrity{
  width: calc(1rem - 2px );
  height: calc( 1rem - 2px );
  border: 2px solid #ff7994;
  border-radius: 50%;
  -webkit-border-raduis: 50%;
  line-height: 1rem;
  color: #ff7994;
  position: relative;
  overflow: hidden;
  z-index: 1;
}
.dataIntegrity .dataIntegrity_num{
  position: absolute;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
  top: 0;
  color: #000;
  z-index: 5
}
.dataIntegrity .dataIntegrity_back{
  position: absolute;
  width: 100%;
  height: 150%;
  background: url('../../assets/images/data_integrity_bg.png') no-repeat;
  z-index: 1;
}
.submit{
  display: block;
  margin: 0 auto;
  width: 5.2rem;
  height: .8rem;
  background-color: #ff7994;
  border-radius: .5rem;
  -webkit-border-radius: .5rem;
  text-align: center;
  line-height: .8rem;
  font-size: .31rem;
  color:#fff;
  margin-top: 1rem
}
.dialog_content{
  width: 6.5rem;
  padding: .79rem .65rem .6rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.dialog_content span{
  font-size: .35rem;
  color: #ff6c8f
}
.dialog_content p{
  margin-top: .8rem;
  padding: 0 .5rem;
  font-size: .23rem;
  color: #868686
}

.hint_group{
  margin-top: .2rem;
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
}
.hint{
  padding: .07rem .15rem;
  text-align: center;
  font-size: .23rem;
  border:1px solid #d9d9d9;
  color:#858585;
  border-radius: .3rem;
  -webkit-border-radius: .3rem;
  margin-right: .15rem;
  margin-bottom: .2rem
}

.self-introduction {
  font-size: 0.23rem;
  line-height: 0.29rem;
  color: #8d8d8d;
  margin-top: 0.4rem;
}
.visitor_img {
  width: 0.8rem;
  height: 0.8rem;
  display: block;
  float: left;
  margin-top: 0.5rem;
  margin-right: 0.2rem;
  border-radius: 50%;
  -webkit-border-radius: 50%;
}
.content_name h2 {
  display: inline-block;
  margin: 0.2rem 0;
}
.content_name h2 span {
  width: 0.54rem;
  height: 0.3rem;
  display: inline-block;
  border-radius: 0.02rem;
  -webkit-border-radius: .02rem;
  background-color: #33c1ff;
  color: #fff;
  font-size: 0.18rem;
  margin-left: 0.1rem;
  text-align: center;
}
.content_name div span {
  font-size: 0.23rem;
  color: #8d8d8d;
  margin-right: 0.18rem;
}
.content_head {
  margin-top: 0.6rem;
  height: 2.25rem;
  position: relative;
}
.content_head .item:nth-child(1){
  position: absolute;
  left: .6rem;
  top: .6rem;
}
.content_head .item:nth-child(3){
  position: absolute;
  right: .6rem;
  top: .6rem;
}
.content_head .item p {
  white-space: nowrap;
  font-size: 0.23rem;
  color: #ff7b96;
}
.content_head .item .link {
  width: 1rem;
  height: 1rem;
  background-image: url("../../assets/images/data_like@2x.png");
  background-repeat: no-repeat;
  background-size: 100%;
}
.content_head .head {
  width: 2.25rem;
  height: 2.25rem;
  position: relative;
  z-index: 1;
  left: 50%;
  top: 0;
  margin-left: -1.125rem;
}
.content_head .head img {
  max-width: 100%;
  max-height: 100%;
      height: 100%;
    width: 100%;
}
.content_head .head span {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.5rem;
  font-size: 0.22rem;
  color: #fefefe;
  line-height: 0.5rem;
  text-align: center;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
}
.van-nav-bar {
  background-color: transparent;
}
.van-hairline--bottom::after {
  border: none;
}
.group {
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 0;
}
.group_back {
  position: absolute;
  top: 0;
  width: 100%;
  -webkit-filter: opacity(30);
  filter: opacity(30%);
}
.group_back img {
  width: 100%;
}
.group_content {
  position: absolute;
  width: 100%;
  background-color: #fff;
  top: 3rem;
  padding-bottom: 3rem;
  min-height: 100%;
}
.group_content .top {
  display: block;
  width: 120%;
  height: 4.2rem;
  left: -10%;
  top: -50px;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  background: #fff;
  position: absolute;
}
.content {
  width: 100%;
  background-color: transparent;
  position: relative;
}
</style>

<style>
.content .intention_item {
  width: 100%;
  display: block;
  background-color: #fff;
  height: 0.89rem;
  text-align: left;
  font-size: 0.31rem;
  line-height: 0.89rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border-top: none !important
}
.content .intention_item .sanjiao {
  font-size: 0.28rem;
  color: #8d8d8d;
  float: right;
}
.content .intention_item .sanjiao.hide::after{
  display:none !important;
}
.content .intention_item .sanjiao::after {
  content: "";
  display: inline-block;
  height: 0.15rem;
  width: 0.15rem;
  border: 1px solid #8e8e8e;
  border-left: transparent;
  border-top: transparent;
  transform: rotate(-45deg);
}
</style>
