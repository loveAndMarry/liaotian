<template>
  <div class="group">
    <div style="overflow-y: scroll;position: relative;height: 100%;overflow-x: hidden;">
      <div class="group_back">
        <img :src="data.userBaseInformation.userHead" alt>
      </div>
      <div class="group_content">
        <div class="top"></div>
      </div>
      <div class="content">
        <NavBar left-arrow @click-left="onClickLeft"/>
        <div class="content_head">
          <div class="item">
            <van-circle
              v-model="currentRate"
              :rate="parseInt(data.dataIntegrity)"
              :speed="100"
              :text="text"
              fill="#fff"
              layer-color="#ccc"
              size="1rem"
              color="#ff7994"
            />
            <p>资料完整度</p>
          </div>
          <div class="head">
            <img :src="data.userBaseInformation.userHead" alt>
            <span>更换头像</span>
          </div>
          <div class="item" @click="linkClick">
            <div class="link"></div>
            <p>谁喜欢我</p>
          </div>
        </div>
        <div class="content_name">
          <h2>{{data.userBaseInformation.nikeName}}
            <span v-if="user.registerState === '3'">实名</span>
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
            v-for="(item, index) in data.accessRecordUserList" :key="index">
        </SplitGroup>


        <SplitGroup title="自我介绍" rightTitle="编辑" @confirm="selfClick">
          <p
            class="self-introduction"
          >{{data.userBaseInformation.personalIntroduction}}</p>
        </SplitGroup>


         <SplitGroup title="基本资料" :isRight="false">
          <div class="intention_item">ID:
            <div class="sanjiao hide">{{data.userBaseInformation.userNo}}</div>
          </div>
          <div class="intention_item" @click="nickNameClick">昵称:
            <div class="sanjiao">{{data.userBaseInformation.nickName || '未填写'}}</div>
          </div>
          <div class="intention_item">性别:
            <div class="sanjiao hide">{{data.userBaseInformation.sex === '1' ? '男':'女'}}</div>
          </div>
          <div class="intention_item" @click="birthdayClick">生日:
            <div class="sanjiao ">{{data.userBaseInformation.birthday || '未填写'}}</div>
          </div>
          <div class="intention_item" @click="heightClick">身高:
            <div class="sanjiao ">{{data.userBaseInformation.height ? data.userBaseInformation.height + "cm" : '未填写'}}</div>
          </div>
          <div class="intention_item" @click="educationClick">学历:
            <div class="sanjiao ">{{data.userBaseInformation.education ? data.userBaseInformation.education : '未填写'}}</div>
          </div>
          <div class="intention_item" @click="incomeClick">月收入:
            <div class="sanjiao ">{{income}}</div>
          </div>
          <div class="intention_item" @click="domicileShow = true">居住地:
            <div class="sanjiao ">{{data.userBaseInformation.domicileName || '未填写'}}</div>
          </div>
          <div class="intention_item" @click="childrenSituationShow = true">子女情况:
            <div class="sanjiao ">{{data.userBaseInformation.childrenSituation || '未填写'}}</div>
          </div>
           <div class="intention_item">购房情况:
            <div class="sanjiao ">{{data.userBaseInformation.houseSituation || '未填写'}}</div>
          </div>
           <div class="intention_item">购车情况:
            <div class="sanjiao ">{{data.userBaseInformation.carSituation || '未填写'}}</div>
          </div>
        </SplitGroup>


        <SplitGroup title="择偶意向" :isRight="false">
          <div class="intention_item">年龄
            <div class="sanjiao">{{data.userBaseInformation.intentionAgeMin + ' - ' + data.userBaseInformation.intentionAgeMax}}</div>
          </div>
          <div class="intention_item">身高
            <div class="sanjiao">{{data.userBaseInformation.intentionHeightMin + ' - ' + data.userBaseInformation.intentionHeightMax}}</div>
          </div>
          <div class="intention_item">学历
            <div class="sanjiao">{{data.userBaseInformation.intentionEducationDictValueMin + ' - ' + data.userBaseInformation.intentionEducationDictValueMax}}</div>
          </div>
          <div class="intention_item">月收入
            <div class="sanjiao">{{data.userBaseInformation.intentionIncomeMin +  (data.userBaseInformation.intentionIncomeMax? ' - ' + data.userBaseInformation.intentionIncomeMax : '以上')}}</div>
          </div>
          <div class="intention_item">居住地
            <div class="sanjiao">{{data.userBaseInformation.intentionDomicileName}}</div>
          </div>
          <div class="intention_item">婚姻状况
            <div class="sanjiao">{{data.userBaseInformation.intentionMaritalStatus}}</div>
          </div>
          <div class="intention_item">购房情况
            <div class="sanjiao">{{data.userBaseInformation.intentionHouseSituation}}</div>
          </div>
          <div class="intention_item">购车情况
            <div class="sanjiao">{{data.userBaseInformation.intentionCarSituation}}</div>
          </div>
          <div class="intention_item">有无子女
            <div class="sanjiao">{{data.userBaseInformation.intentionChildrenSituation}}</div>
          </div>
        </SplitGroup>

        <SplitGroup title="小档案" :isRight="false">
          <div class="intention_item">家乡
            <div class="sanjiao">{{data.userBaseInformation.hometownName || '未填写'}}</div>
          </div>
          <div class="intention_item">户口
            <div class="sanjiao">{{data.userBaseInformation.registeredResidenceName || '未填写'}}</div>
          </div>
          <div class="intention_item">民族
            <div class="sanjiao">{{data.userBaseInformation.nation || '未填写'}}</div>
          </div>
          <div class="intention_item">属相
            <div class="sanjiao">{{data.userBaseInformation.zodiac || '未填写'}}</div>
          </div>
          <div class="intention_item">星座
            <div class="sanjiao">{{data.userBaseInformation.constellation || '未填写'}}</div>
          </div>
          <div class="intention_item">血型
            <div class="sanjiao">{{data.userBaseInformation.bloodType || '未填写'}}</div>
          </div>
          <div class="intention_item">体型
            <div class="sanjiao">{{data.userBaseInformation.shape || '未填写'}}</div>
          </div>
          <div class="intention_item">体重
            <div class="sanjiao">{{data.userBaseInformation.weight || '未填写'}}</div>
          </div>
          <div class="intention_item">宗教
            <div class="sanjiao">{{data.userBaseInformation.religiousBelief || '未填写'}}</div>
          </div>
          <div class="intention_item">是否喝酒
            <div class="sanjiao">{{data.userBaseInformation.isDrinkAlcohol || '未填写'}}</div>
          </div>
          <div class="intention_item">是否吸烟
            <div class="sanjiao">{{data.userBaseInformation.isSmoke || '未填写'}}</div>
          </div>
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

    <Actionsheet v-model="heightShow"> 
      <Picker :columns="heightColumns" show-toolbar  @cancel="heightShow = false" @confirm="heightConfirm" title="身高" ref="heightPicker"/>
    </Actionsheet>

     <Actionsheet v-model="educationShow"> 
      <Picker :columns="educationColumns" show-toolbar  @cancel="educationShow = false" @confirm="educationConfirm" title="学历" ref="educationPicker"/>
    </Actionsheet>

     <Actionsheet v-model="incomeShow"> 
      <Picker :columns="incomeColumns" show-toolbar  @cancel="incomeShow = false" @confirm="incomeConfirm" title="月收入" ref="incomePicker"/>
    </Actionsheet>

    <Address title="居住地" :data='domicile' v-model="domicileShow" @confirm="addressCallback" name='domicile'></Address>

    <PackerList title="有无子女" :data='data.userBaseInformation.childrenSituation.join(',')' :radio='true' v-model="childrenSituationShow" name="childrenSituation" type='children' @confirm="confirmCallback"></PackerList>

  </div>
</template>
<script>
import { NavBar, Circle, Field, Toast, Picker, Actionsheet} from "vant";
import Address from '@/components/options/Address'
import PackerList from '@/components/options/PackerList'
import SplitGroup from "@/components/SplitGroup";
import { userPersonalCenterInformation, updateUserSpecificInfo } from '@/assets/common/api' 
import Vue from "vue";
import { mapState } from 'vuex'

Vue.use(Circle);
export default {
  inject: ['reload'],
  data() {
    return {
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
      heightShow: false,
      heightColumns: [],

      educationShow: false,
      educationColumns: [],

      incomeShow: false,
      incomeColumns: [],

      domicileShow: false,

      childrenSituationShow: false,
    };
  },
  computed: {
    ...mapState({
      user: state => state.IM.user
    }),
    text() {
      return this.currentRate.toFixed(0) + "%";
    },
    income () {
      let min = this.data.userBaseInformation.incomeMin
      let max = this.data.userBaseInformation.incomeMax
      let str = ''
      if(min !== '-1'){
        str += min
      }
      if(max !== '-1'){
        if(min !== '-1'){
          str += ' - ' + max
        } else {
          str += max + '以上'
        }
      }
      return str
    },
    domicile () {
      if(this.data.userBaseInformation.domicileProvinceId && this.data.userBaseInformation.domicileCityId){
         return [this.data.userBaseInformation.domicileProvinceId, this.data.userBaseInformation.domicileCityId]
      } else {
        return []
      }
    }
  },
  mounted () {
    userPersonalCenterInformation({ userId: this.user.id}).then((res) => {
      console.log(res, '数据');
      if(res.data){
        this.data = Object.assign(this.data, res.data)
      }
    })
  },
  methods: {
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
    heightClick () {
      let arr = JSON.parse(localStorage.getItem('height'))
      let index = arr.findIndex(el => el.replace('cm', '') == this.data.userBaseInformation.height)
      this.heightColumns = [{
        values: arr,
        defaultIndex: index
      }]
      this.heightShow = true
    },
    heightConfirm (values) {
      updateUserSpecificInfo({
        userId: this.user.id,
        height: values[0].replace('cm','')
      }).then(() => {
        this.heightShow = false
        this.$set(this.data.userBaseInformation, 'height' , values[0].replace('cm',''))
      })
    },

    educationClick () {
      let arr = JSON.parse(localStorage.getItem('education')).map(el => el.label)
      let index = arr.findIndex(el => el == this.data.userBaseInformation.education)
      this.educationColumns = [{
        values: arr,
        defaultIndex: index
      }]
      this.educationShow = true
    },
    educationConfirm (values) {
      updateUserSpecificInfo({
        userId: this.user.id,
        education: values[0]
      }).then(() => {
        this.educationShow = false
        this.$set(this.data.userBaseInformation, 'education' , values[0])
      })
    },

     incomeClick () {
      let arr = JSON.parse(localStorage.getItem('income')).map(el => el.label).map((el, index, arr) => {
        if(index === arr.length -1){
          return el + '以上'
        }
        return el + ' - ' + arr[index + 1]
      })
      let index = arr.findIndex(el => el.replace(/[^0-9]/g, '') == this.data.userBaseInformation.income)
      this.incomeColumns = [{
        values: arr,
        defaultIndex: index
      }]
      this.incomeShow = true
    },
    incomeConfirm (values) {
      let arr = values[0].match(/\d+/g)
      var flag = arr.length
      let incomeMin =  flag === 1? '-1' : arr[0] || null;
      let incomeMax =  flag === 1? arr[0] :  arr[1] || null 
      updateUserSpecificInfo({
        userId: this.user.id,
        incomeMin: incomeMin,
        incomeMax: incomeMax
      }).then(() => {
        this.incomeShow = false
        this.$set(this.data.userBaseInformation, 'incomeMin' , incomeMin || '' )
        this.$set(this.data.userBaseInformation, 'incomeMax' , incomeMax || '' )
      })
    },

    birthdayClick () {
        this.$picker.show({
          type:'datePicker',
          date:this.data.userBaseInformation.birthday,  //初始化时间
          endTime:new Date().getFullYear() + '-12-12',  //截至时间
          startTime:'1950-1-1',  //开始时间
          onOk:(e)=>{
            updateUserSpecificInfo({
              userId: this.user.id,
              birthday: this.data.userBaseInformation.birthday.replace(/-/g,'/')
            }).then(() => {
              this.$set(this.data.userBaseInformation, 'birthday' , e)
            })
          },
        })
    },
    beforeClose () {
      console.log("what?")
    },
    linkClick () {
      this.isShow = true
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
    Address,
    PackerList
  }
};
</script>
<style scoped>
.submit{
  display: block;
  margin: 0 auto;
  width: 5.2rem;
  height: .8rem;
  background-color: #ff7994;
  border-radius: .5rem;
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
}
.hint{
  padding: .07rem .15rem;
  text-align: center;
  font-size: .23rem;
  border:1px solid #d9d9d9;
  color:#858585;
  border-radius: .3rem;
  margin-right: .15rem;
  margin-bottom: .2rem
}
.intention_item {
  width: 100%;
  display: block;
  background-color: #fff;
  height: 0.89rem;
  text-align: left;
  font-size: 0.31rem;
  padding: 0 0.3rem;
  line-height: 0.89rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.intention_item .sanjiao {
  font-size: 0.28rem;
  color: #8d8d8d;
  float: right;
}
.intention_item .sanjiao.hide::after{
  display:none !important;
}
.intention_item .sanjiao::after {
  content: "";
  display: inline-block;
  height: 0.15rem;
  width: 0.15rem;
  border: 1px solid #8e8e8e;
  border-left: transparent;
  border-top: transparent;
  transform: rotate(-45deg);
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
  display: flex;
  display: -webkit-flex;
  align-items: flex-end;
  justify-content: space-evenly;
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
  border: 1px solid #fff;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}
.content_head .head img {
  max-width: 100%;
  max-height: 100%;
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
  background: #fff;
  position: absolute;
}
.content {
  width: 100%;
  background-color: transparent;
  position: relative;
}
</style>
