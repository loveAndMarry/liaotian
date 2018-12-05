<template>
  <div>
    <div class="group">
      <div class="title">{{user.nickName}}<span class="shezhi"></span></div>
      <div class="datum">
        <img :src="user.userHead" alt="">
        <div class="datum_content">
          <div>
            资料完善度{{data.dataIntegrity}}%
            <span class="sanjiao" @click="detailsClick">资料</span>
          </div>
          <div>
            信用度<strong>98</strong>分 <span class="credit">提高信用度</span>
          </div>
        </div>
      </div>
      <ul class="photos">
          <li class="photograph">
            <div>
              <img src="../../assets/images/user_photo_upload@2x.png" alt="">
              <p>上传图片</p>
            </div>
          </li>
          <li class="photo_item" v-for="item in 3" :key="item">
            <img :src="data.photoList[item].context" v-if="data.photoList[item]" alt="">
          </li>
          <li class="photo_more"><span class="sanjiao" @click="photosClick">相册</span></li>
      </ul>
      <ul class="links">
        <li @click="linkClick">
            <img :src="data.accessRecordUserPhotoUrl" alt="">
            <p>谁看过我</p>
        </li>
        <li @click="linkClick">
            <img :src="data.likeMePhotoUrl" alt="">
            <p>谁喜欢我</p>
        </li>
        <li @click="linkClick">
            <img :src="data.likeUserPhotoUrl" alt="">
            <p>我喜欢谁</p>
        </li>
        <li>
            <img src='../../assets/images/love@2x.png' alt="" style="width: inherit;">
            <p>相互喜欢</p>
        </li>
      </ul>
    </div>
    <Group title="会员服务">
      <ul class="links" style="margin-top: 0.15rem">
        <li @click="toastClick" v-for="(el, index) in data.levels" :key="index">
            <img :src="el.ico" class="link_img"/>
            <p>{{el.levelName}}</p>
        </li>
      </ul>
    </Group>
     <Group title="我的认证">
       <div class="authentication">
          <div class="real_name" v-if="user.registerState === '3'">
            <div></div>
            <p>实名认证</p>
          </div>
          <div class="phone">
            <div></div>
            <p>手机认证</p>
          </div>
       </div>
     </Group>
     <div class="group">
       <ul class="lists">
         <li @click="myDynamicClick">我的动态<span class="sanjiao"></span></li>
         <li>我的订单<span class="sanjiao"></span></li>
       </ul>
     </div>
     <van-dialog
      v-model="isshow"
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
import Group from '@/components/Group'
import { personalCenter } from '@/assets/common/api'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      isshow: false,
      data: {
        dataIntegrity: '0',
        accessRecordUserPhotoUrl: require('../../assets/images/no_people@2x.png'),
        likeMePhotoUrl: require('../../assets/images/no_people@2x.png'),
        likeUserPhotoUrl: require('../../assets/images/no_people@2x.png'),
        levels: [],
        photoList: []
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.IM.user
    })
  },
  methods: {
    detailsClick () {
      this.$router.push({name: 'userDetails'})
    },
    photosClick () {
      this.$router.push({name: 'Photo'})
    },
    linkClick () {
      this.isshow = true
      window.setTimeout(() => {
        this.$router.push({name: 'link'})
      },3000)
    },
    toastClick () {
    },
    beforeClose(action, done) {
      if (action === 'confirm') {
        setTimeout(done, 1000);
      } else {
        done();
      }
    },
    myDynamicClick () {
      this.$router.push({name: 'MyDynamic'})
    }
  },
  mounted () {
    personalCenter({userId: this.user.id}).then((res) => {
      console.log(res.data)
      if(res.data) {
        this.data = Object.assign(this.data, res.data)
      }
    })
    console.log(this)
  },
  components: {
    Group
  }
}
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
.lists{
  width: 100%
}
.lists li{
  height: .9rem;
  border-bottom: 1px solid #f4f4f4;
  font-size: .27rem;
  color: #323232;
  line-height: .9rem;
  text-align: left
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
  background-repeat: no-repeat;
  background-size: 100%
}
.authentication .real_name div{
  background-image: url('../../assets/images/real_name@2x.png')
}
.authentication .phone div{
  background-image: url('../../assets/images/phone@2x.png')
}
.authentication p{
  display: block;
  font-size: .23rem;
  color:#858585;
  padding-top:.1rem;
  padding-bottom: 0;
  margin: 0
}
.links{
  display: flex;
  justify-content: space-between;
  text-align: center;
  padding: 0 .2rem;
}
.links .link_img{
  display: inline-block;
  width: .66rem;
  height: .66rem;
  border-radius: 50%;
  display: inline-block;
  background-size: 100%;
  background-repeat: no-repeat
}

.links li img{
  width: .64rem;
  height: .64rem;
  border-radius: 50%;
  display: inline-block
}
.links li p{
  font-size: .23rem;
  color: #818181;
  margin: 0;
  white-space: nowrap;
}
.photos{
  text-align: left;
  padding: .4rem 0;
  overflow: hidden;
  position: relative;
}
.photo_more{
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
}
.photos li{
  border-radius: .15rem;
  margin-right: .05rem;
  overflow: hidden;
  float: left;
}
.photos .photo_item{
  width: 1.44rem;
  height: 1.44rem;
  background-color: #dddddd;
  background-image: url('../../assets/images/user_photo_add@2x.png');
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: 50%

}
.photos .photo_item img{
  max-width: 100%;
  max-height: 100%
}
.photograph{
  width: 1.44rem;
  height: 1.44rem;
  border: 1px dashed #d7d7d7;
  text-align: center;
  position: relative;
}
.photograph div{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center
}
.photograph div img{
  width: .5rem;
  height: .5rem;
  display: inline-block
}
.photograph div p{
  font-size: .19rem;
  color: #818181;
  margin: 0;
  white-space: nowrap;
}
.group{
  padding: 0 .3rem;
  background-color: #fff;
  border-bottom: .1rem solid #f0f0f0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  padding-bottom: .32rem
}
  .title{
    position: relative;
    color:#323232;
    font-size: .28rem;
    line-height: .88rem;
    height: .88rem;
    text-align: center
  }
  .title .shezhi{
    width: .38rem;
    height: .4rem;
    display: block;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    background-size: 100%;
    background-image: url('../../assets/images/user_set@2x.png')
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
.datum{
  overflow: hidden;
}
.datum img{
  display: block;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  float: left;
}
.datum_content{
  padding-left: .4rem;
  width: calc( 100% - 2rem);
  color: #8d8d8d;
  font-size: .27rem;
  line-height: .67rem;
  padding: .11rem 0 .15rem 0;
  display: inline-block;
  text-align: left
}
.credit{
  border: 1px solid #d8d8d8;
  color: #35c0ff;
  padding: .08rem .1rem;
  font-size: .2rem

}
.datum_content strong{
  color: #35c0ff;
  font-weight: 500;
}
</style>
