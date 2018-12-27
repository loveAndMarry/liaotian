<template>
  <div class='left basicInformation'>
    <NavBar title="完善资料"></NavBar>
    <div style="padding: .2rem 0 .2rem .3rem;overflow: hidden;background-color: #fff;">
      <div class="head" @click="submitPhoto">
        <img :src="imgUrl" alt>
        <span>更换头像</span>
      </div>
      <div class="head_item">
        <div class="intention_item" @click="nickNameClick">
          昵称:
          <div class="sanjiao">{{fromData.nickName || '未填写'}}</div>
        </div>
        <div class="intention_item" @click="birthdayClick">生日:
            <div class="sanjiao ">{{fromData.birthday || '未填写'}}</div>
        </div>
      </div>
    </div>
    <div>
      <div class="List_Group">
        <div class="intention_item" @click="sexClick">
          性别: 
          <div class="sanjiao">{{radio === '1' ? '男' : '女'}}</div>
        </div>
      </div>

      <ListItem  class="List_Group" title="地区" type='address' :isSubmit='false' @confirm="domicileConfirm"></ListItem>

      <ListItem  class="List_Group" title="身高" dictionaries='heights' type="packerOne" suffix="厘米" :isSubmit='false' @confirm="heightConfirm"></ListItem>

      <ListItem  class="List_Group" title="婚姻状况" dictionaries='maritalStatus' type="radioOne" :isSubmit='false' @confirm="maritalStatusConfirm"></ListItem>

      <ListItem  class="List_Group" title="学历" dictionaries='education' type="packerOne" :isSubmit='false' @confirm="educationConfirm"></ListItem>

      <ListItem  class="List_Group" title="月收入" dictionaries='incomeRange' type="packerOne" :isSubmit='false' @confirm="incomeConfirm"></ListItem>

    </div>

    <div class="submit">
      <Button size="large" type="danger" round @click="submitClick">提交信息</Button>
    </div>

    <Actionsheet v-model="isShow" :close-on-click-overlay='false' style="text-align: left;">
      <div class="van-hairline--top-bottom van-picker__toolbar">
        <div class="van-picker__cancel" @click="cancel">取消</div>
        <div class="van-ellipsis van-picker__title">性别</div>
        <div class="van-picker__confirm" @click="confirm">确认</div>
      </div>
      <RadioGroup v-model="radio">
        <CellGroup>
          <Cell title="男" clickable @click="radio = '1'">
            <Radio name="1" />
          </Cell>
          <Cell title="女" clickable @click="radio = '2'">
            <Radio name="2" />
          </Cell>
        </CellGroup>
      </RadioGroup>
    </Actionsheet>

    <van-dialog
      v-model="show"
      show-cancel-button
      :before-close="beforeClose"
    >
      <Field
        v-model="username"
        label="昵称"
        placeholder="请输入昵称"
      />
    </van-dialog>
  </div>
</template>
<script>
import { NavBar, Actionsheet, Cell, CellGroup, Field, RadioGroup, Radio, Button} from "vant"
import ListItem from '@/components/ListItem' 
import { initialInformation } from '@/assets/common/api'
import utils from '@/assets/common/utils'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      imgUrl: require('../../assets/images/perfect_photo_bg@2x.png'),
      radio: '1',
      username: '',
      isShow: false,
      show: false,
      fromData: {
        userId: '',
        nickName: '',
        userHead: '',
        educationDictValue:'',
        education: '',
        incomeDictValue:'',
        incomeMin: '',
        incomeMax: '',
        domicileProvinceId: '',
        domicileCityId: '',
        domicileProvinceName: '',
        domicileCityName: '',
        maritalStatusDictValue: '',
        maritalStatus: '',
        birthday: '',
        sex: '1',
        height: '',
      }
    }
  },
  components: {
    NavBar,
    ListItem,
    Actionsheet,
    Cell,
    CellGroup,
    RadioGroup,
    Radio,
    Field,
    Button
  },
  mounted () {
    this.fromData.userId = utils.getUrlArgObject('userId')
    this.setLoading(false)
  },
  methods: {
    ...mapMutations([
      'setLoading'
    ]),
    submitPhoto () {
      window.updatePhoto(str => {
        if(str) {
          this.imgUrl = str
          this.fromData.userHead = str
        }
      })
    }, 
    domicileConfirm (result) {
      this.fromData.domicileProvinceId = result[0].code
      this.fromData.domicileProvinceName = result[0].name
      this.fromData.domicileCityId = result[1].code
      this.fromData.domicileCityName = result[1].name
    },
    heightConfirm (result) {
      this.fromData.height = result[0].value
    },
    maritalStatusConfirm (result) {
      this.fromData.maritalStatusDictValue = result[0].value
      this.fromData.maritalStatus = result[0].label
    },
    educationConfirm (result) {
      this.fromData.educationDictValue = result[0].value
      this.fromData.education = result[0].label
    },
    incomeConfirm (result) {
      if(result[0].label.indexof('以下')){
        this.fromData.incomeMin = result[0].label.replace('以下', '')
        this.fromData.incomeMax = '-1'
        return false
      }
      if(result[0].label.indexof('以上')){
        this.fromData.incomeMin = '-1'
        this.fromData.incomeMax = result[0].label.replace('以上', '')
        return false
      }
      var arr = result[0].label.replace('元', '').split('-')
      this.fromData.incomeMin = arr[0]
      this.fromData.incomeMax = arr[1]
    },
    // onClickLeft() {
    //   this.$router.back();
    // },
    nickNameClick () {
      this.show = true
    },
    sexClick () {
      this.isShow = true
    },
    cancel () {
      this.isShow = false
      this.radio = this.fromData.sex
    },
    confirm () {
      this.isShow = false
      this.fromData.sex = this.radio
    },
    submitClick () {
      if(this.fromData.nickName.replace(' ', '') === ''){
        this.$toast('请输入昵称');
        return false
      }
      if(this.fromData.birthday.replace(' ', '') === ''){
        this.$toast('请选择生日');
        return false
      }
      initialInformation(this.fromData).then((res) => {
        this.$router.push({name: 'home'})
        window.userId = this.fromData.userId
      })
    },
    birthdayClick () {
      this.$picker.show({
        type:'datePicker',
        date:this.fromData.birthday,  //初始化时间
        endTime:new Date().getFullYear() + '-12-12',  //截至时间
        startTime:'1950-1-1',  //开始时间
        onOk:(e)=>{
          this.fromData.birthday = e
        },
      })
    },
    beforeClose(action, done) {
      if (action === 'confirm') {
        this.fromData.nickName = this.username;
      } else {
        this.username = this.fromData.nickName
      }
      done()
    }
  }
};
</script>
<style scoped>
.submit{
  width: 5.2rem;
  margin: 0 auto;
  margin-top: 1.29rem
}
.van-button--danger{
  background-color: #ff7994;
  border-color: #ff7994
}
.left{
  text-align: left
}
.head_item div{
  font-size: .26rem !important
}
.head {
  width: 1.44rem;
  height: 1.44rem;
  border: 1px solid #fff;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  overflow: hidden;
  position: relative;
  float: left;
  z-index: 1
}
.head img {
  max-width: 100%;
  max-height: 100%;
}
.head span {
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
.head_item{
  width: calc(100% - 1.44rem - 2px);
  float: left;
}
.List_Group{
  border-top: 1px solid #f0f0f0
}
</style>
<style>
.basicInformation  .intention_item {
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
.basicInformation  .intention_item .sanjiao {
  font-size: 0.28rem;
  color: #8d8d8d;
  float: right;
}
.basicInformation .intention_item .sanjiao.hide::after{
  display:none !important;
}
.basicInformation  .intention_item .sanjiao::after {
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
