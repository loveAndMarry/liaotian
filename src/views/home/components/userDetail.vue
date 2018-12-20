<template>
  <div class="userDetail">
      <NavBar title='个人信息' @click-left="onClickLeft" left-arrow></NavBar>
    <div class="userDetail_content" id="userDetail_content">
       <div class="title">
      <div class="left">
        <div class="top">
          <div class="name">{{userBaseInformation.nickName}}
            <span v-if="userBaseInformation.registerState === '3'">实名</span>
          </div>
        </div>
        <div class="message">
          <p v-text="userBaseInformation.age ? `${userBaseInformation.age}岁` : '未填写'"></p>
          <i>|</i>
          <p v-text="userBaseInformation.height ? `${userBaseInformation.height}cm` : '未填写'"></p>
          <i>|</i>
          <p v-text="userBaseInformation.education ? userBaseInformation.education: '未填写'"></p>
          <i>|</i>
          <p v-text="income(userBaseInformation)"></p>
        </div>
        <div class="address" v-text="userBaseInformation.domicileName"></div>
      </div>
      <div class="right">
        <img :src="userBaseInformation.userHead" alt="" @click="userHeadClick">
      </div>
      <div class="bottom">
        <ul class="img_group">
          <li v-for="(el, dex) in photoList" :key="dex"><img :src="el" alt="" @click="photoClick(dex)"></li>
        </ul>
      </div>
    </div>
    <Group title="个人介绍">
      <p style="color:#858585;font-size:.19rem;line-heigin:.23rem">{{userBaseInformation.personalIntroduction}}</p>
    </Group>
    <Group title="认证">
      <div class="authentication">
        <div class="real_name" v-if='userBaseInformation.registerState === "3"'>
          <div></div>
          <p>实名认证</p>
        </div>
        <div class="phone">
          <div></div>
          <p>手机认证</p>
        </div>
      </div>
    </Group>
    <Group title="基本资料">
      <div class="list_item" v-if="userBaseInformation.userNo">
        <div class="label">ID:</div>
        <div class="context">{{userBaseInformation.userNo}}</div>
      </div>
      <div class="list_item" v-if="userBaseInformation.nickName">
        <div class="label">昵称:</div>
        <div class="context">{{userBaseInformation.nickName}}</div>
      </div>
      <div class="list_item" v-if="userBaseInformation.sex">
        <div class="label">性别:</div>
        <div class="context">{{userBaseInformation.sex === '1'? '男' : '女'}}</div>
      </div>
      <div class="list_item" v-if="userBaseInformation.age">
        <div class="label">年龄:</div>
        <div class="context">{{userBaseInformation.age + '岁'}}</div>
      </div>
      <div class="list_item" v-if="userBaseInformation.height">
        <div class="label">身高:</div>
        <div class="context">{{userBaseInformation.height + 'cm'}}</div>
      </div>
      <div class="list_item" v-if="userBaseInformation.education">
        <div class="label">学历:</div>
        <div class="context">{{userBaseInformation.education}}</div>
      </div>
      <div class="list_item" v-if="userBaseInformation.incomeMin">
        <div class="label">月收入:</div>
        <div class="context">{{userBaseInformation.incomeMin + ' - '+ userBaseInformation.incomeMax}}</div>
      </div>
      <div class="list_item" v-if="userBaseInformation.domicileName">
        <div class="label">居住地:</div>
        <div class="context">{{userBaseInformation.domicileName}}</div>
      </div>
      <div class="list_item" v-if="userBaseInformation.maritalStatus">
        <div class="label">婚姻状况:</div>
        <div class="context">{{userBaseInformation.maritalStatus}}</div>
      </div>
      <div class="list_item" v-if="userBaseInformation.childrenSituation">
        <div class="label">子女情况:</div>
        <div class="context">{{userBaseInformation.childrenSituation}}</div>
      </div>
      <div class="list_item" v-if="userBaseInformation.houseSituation">
        <div class="label">购房情况:</div>
        <div class="context">{{userBaseInformation.houseSituation}}</div>
      </div>
      <div class="list_item" v-if="userBaseInformation.carSituation">
        <div class="label">购车情况:</div>
        <div class="context">{{userBaseInformation.carSituation}}</div>
      </div>
     
    </Group>
     <Group title="兴趣爱好">
       <div class="hint_group">
        <span class="hint" v-for="(hint, i) in interestDictVoList" :key="i" v-text="hint.label" :class="{rad: hint.isIdentical}"></span>
       </div>
    </Group>
    <Group title="高级资料">
      <div class="list_item" v-if="userBaseInformation.hometownName">
        <div class="label">家乡:</div>
        <div class="context">{{userBaseInformation.hometownName}}</div>
      </div>
      <div class="list_item" v-if="userBaseInformation.nation">
        <div class="label">民族:</div>
        <div class="context">{{userBaseInformation.nation}}</div>
      </div>
      <div class="list_item" v-if="userBaseInformation.zodiac">
        <div class="label">属相:</div>
        <div class="context">{{userBaseInformation.zodiac}}</div>
      </div>
      <div class="list_item" v-if="userBaseInformation.constellation">
        <div class="label">星座:</div>
        <div class="context">{{userBaseInformation.constellation}}</div>
      </div>
      <div class="list_item" v-if="userBaseInformation.bloodType">
        <div class="label">血型:</div>
        <div class="context">{{userBaseInformation.bloodType}}</div>
      </div>
      <div class="list_item" v-if="userBaseInformation.shape">
        <div class="label">体型:</div>
        <div class="context">{{userBaseInformation.shape}}</div>
      </div>
      <div class="list_item" v-if="userBaseInformation.weight">
        <div class="label">体重:</div>
        <div class="context">{{userBaseInformation.weight}}</div>
      </div>
      <div class="list_item" v-if="userBaseInformation.isSmoke">
        <div class="label">是否吸烟:</div>
        <div class="context">{{userBaseInformation.isSmoke}}</div>
      </div>
      <div class="list_item" v-if="userBaseInformation.isDrinkAlcohol">
        <div class="label">是否喝酒:</div>
        <div class="context">{{userBaseInformation.isDrinkAlcohol}}</div>
      </div>
    </Group>
    <div style="height: .98rem"></div>
    <div class="immediately" :class="{show: isShow}" @click="immediately">立即联系</div>
    <!-- <Group title="礼物">
      <a href="" class="gift">赠送礼物</a>
      <div class="default hide">
        <p>ta未收到礼物,</p>
        <p>成为第一个送ta礼物的人吧！</p>
      </div>
    </Group> -->
    </div>
  </div>
</template>
<script>

import { NavBar, ImagePreview} from 'vant'
import Group from '@/components/Group'
import utils from "@/assets/common/utils";
import { userInformationDisplay } from '@/assets/common/api'
import { mapActions } from "vuex";

export default {
  data () {
    return {
      isShow: false,
      photoList:[],
      userBaseInformation: {},
    }
  },
   computed: {
    interestDictVoList () {
      return utils.mergeArr(this.userBaseInformation.interestDictVoList, this.$store.state.IM.user.interestDictVoList)
    }
  },
  methods: {
     ...mapActions(["UPDATEUSERLIST"]),
    photoClick (index) {
      window.instance = ImagePreview({
        images: this.photoList,
        startPosition: index,
      })
    },
    userHeadClick () {
      window.instance = ImagePreview({
        images: [this.userBaseInformation.userHead]
      })
    },
    immediately () {
       this.UPDATEUSERLIST(this.userBaseInformation).then(() => {
        this.$router.push({ path: "/exchange" });
        this.$store.state.IM.frient = this.userBaseInformation
      });
    },
    income (item) {
      if(item.incomeMin && item.incomeMax === undefined){
        return item.incomeMin
      }
      if(item.incomeMin === undefined && item.incomeMax){
        return item.incomeMax
      }
      if(item.incomeMin && item.incomeMax){
        return item.incomeMin + ' - ' + item.incomeMax
      }
    },
    onClickLeft () {
      this.$router.push({path: '/view/home'})
    },
    // showConnection () {
    //   var scrollTop = document.getElementById('userDetail_content').scrollTop || document.getElementById('userDetail_content').scrollTop
    //   if(scrollTop < 500){
    //     this.isShow = false
    //   } else {
    //     this.isShow = true
    //   }
    // }
  },
  mounted () {
    // document.getElementById('userDetail_content').addEventListener('scroll', this.showConnection)
    userInformationDisplay({
      userId: this.$store.state.IM.user.id,
      accessRecordId: this.$store.state.IM.friend.userId
    }).then((res) => {
      if(res.data.photoList){
        this.photoList = res.data.photoList.map(el => el.context)
      }
      if(res.data.userBaseInformation){
        this.userBaseInformation = res.data.userBaseInformation
      }
    })
  },
  // beforeDestroy () {
  //   console.log(document.getElementById('userDetail_content'))
  //    document.getElementById('userDetail_content').removeEventListener('scroll', this.showConnection)
  // },
  components: {
    NavBar,
    Group
  }
}
</script>
<style scoped>
.immediately.show{
  display: block
}
.immediately{
  height: .98rem;
  background-color: rgba(250,108,137,.7);
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  color: #fff;
  font-size: .3rem;
  text-align: center;
  line-height: .98rem;
  display: block
}

.default{
  font-size: .23rem;
  color: #939393;
  line-height: .29rem;
  margin-top:.25rem
}
.default p{
  margin:0
}
.gift{
  position: absolute;
  top: -.6rem;
  right: 0;
  font-size: .23rem;
  color:#fe5c8d
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
.hint.rad{
  color: #fd7194
}
.userDetail_content{
  position: relative;
  top: 0;
  height: calc( 100% - 46px);
  left: 0;
  overflow-y: scroll;
  overflow-x: hidden; 
  background-color: #fff;
}
.list_item{
  margin-top: .3rem;
  font-size: .23rem;
  color: #8c8c8c;
  overflow: hidden
}
.list_item .label, .list_item .context{
  width: 50%;
  text-align: left;
  float: left;
}
.authentication{
  display: flex;
  display: -webkit-flex;
  justify-content:space-around;
  -webkit-justify-content:space-around;
  margin-top: .2rem;
  text-align: center
}
.authentication .real_name div, .authentication .phone div{
  width:.8rem;
  height:.8rem;
  display: inline-block;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  background-repeat: no-repeat;
  background-size: 100%
}
.authentication .real_name div{
  background-image: url('../../../assets/images/real_name@2x.png')
}
.authentication .phone div{
  background-image: url('../../../assets/images/phone@2x.png')
}
.authentication p{
  display: block;
  font-size: .23rem;
  color:#858585;
  padding-top:.1rem;
  padding-bottom: 0
}
.userDetail{
  text-align: left;
}
.title{
  border-bottom: .1rem solid #f0f0f0;
  background: #fff;
  padding: .6rem .3rem .2rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  color:#918d8c;
  overflow: hidden;
}
.left{
  width: calc(100% - 1.8rem);
  float: left;
  padding-left:.2rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.top{
  margin-top:.25rem;
  height: .55rem;
}
.top .name{
  float: left;
  font-size: .3rem;
  color:#313131;
}
.top .name span{
  width: .54rem;
  height: .3rem;
  display: inline-block;
  border-radius: .02rem;
  -webkit-border-radius: .02rem;
  background-color: #33c1ff;
  color: #fff;
  font-size: .18rem;
  margin-left:.1rem;
  text-align: center
}
.top .praise{
  float: right;
  font-size: .23rem;
  line-height: .3rem;
  color:#fe7996;
  margin-top: .03rem;
}
.top .praise span{
  display: inline-block;
  width: .3rem;
  height:.3rem;
  background-image: url('../../../assets/images/like_btn.png');
  background-repeat: no-repeat;
  background-size: 100%;
  margin-right: .1rem;
  vertical-align: top;
}

.message{
  font-size: .26rem;
  line-height: .26rem;
  overflow: hidden;
}
.message i, .message p{
  display: block;
  float: left;
  margin:0
}
.message i{
  display: inline-block;
  margin: 0 .1rem
}

.address{
  margin-top: .2rem
}

.right{
  width: 1.8rem;
  float: right;
}
.right img{
  display: inline-block;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  -webkit-border-radius: 50%;
}
.img_group{
  display: block;
  margin-top: 2rem;
  overflow: hidden;
}
.img_group li {
  display: block;
  width: 1.44rem;
  height: 1.44rem;
  border-radius: .1rem;
  -webkit-border-radius: .1rem;
  overflow: hidden;
  margin-right: .1rem;
  margin-bottom: .1rem;
  float: left;
}
.img_group li img{
  width: 100%;
  height: 100%
}
</style>
