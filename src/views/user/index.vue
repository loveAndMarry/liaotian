<template>
  <div style="height: 100%" v-if="isLoading">
    <div class="title">
      {{user.nickName}}
      <span class="shezhi" @click="setting"></span>
    </div>
    <div class="overflow">
      <div class="group">
        <div class="datum">
          <div class="head">
            <div class="head_img">
                <img :src="data.userMemberAndUserHeadDTO.userHead + '?imageMogr2/auto-orient'" alt @click="userHead">
                <span v-if="data.userMemberAndUserHeadDTO.states === '1'" class="S24">审核中</span>
            </div>
            <i class="member"><img :src="data.userMemberAndUserHeadDTO.ico" alt=""></i>
          </div>
          <div class="datum_content S28">
            <div>
              资料完善度{{data.dataIntegrity}}%
              <span class="sanjiao S24" @click="detailsClick">资料</span>
            </div>
            <div>信用度
              <strong>98</strong>分
              <span class="credit S24" @click="detailsClick">提高信用度</span>
            </div>
          </div>
        </div>
        <ul class="photos">
          <li class="photograph" @click="submitPhoto">
            <div>
              <img src="../../assets/images/user_photo_upload@2x.png" alt>
              <p class="S24">上传图片</p>
            </div>
          </li>
          <li class="photo_item isShow" v-for="item in photos" :key="item" @click="examinePhoto(item.id)">
            <img :src="item + '?imageMogr2/auto-orient'" v-if="item" alt>
          </li>
          <li class="photo_item" v-if="3 - photos.length > 0" v-for="item in (3 - photos.length)" :key="item">
          </li>
          <li class="photo_more">
            <span class="sanjiao S24" @click="photosClick">相册</span>
          </li>
        </ul>
        <ul class="links">
          <li @click="linkClick(1, 'who_visits_me')" :class="{show: data.accessRecordUserPhotoUrl !== ''}">
            <div class="back_Img">
              <img :src="data.accessRecordUserPhotoUrl" alt>
            </div>
            <p class="S24">谁看过我</p>
          </li>
          <li @click="linkClick(2, 'who_likes_me')" :class="{show: data.likeMePhotoUrl !== ''}">
            <div class="back_Img">
              <img :src="data.likeMePhotoUrl" alt>
            </div>
            <p class="S24">谁喜欢我</p>
          </li>
          <li @click="linkClick(3)" :class="{show: data.likeUserPhotoUrl !== ''}">
            <div class="back_Img">
              <img :src="data.likeUserPhotoUrl" alt>
            </div>
            <p class="S24">我喜欢谁</p>
          </li>
          <li @click="linkClick(4, 'like_each_other')">
            <img src="../../assets/images/love@2x.png" alt style="width: inherit;background-image: none;">
            <p class="S24">相互喜欢</p>
          </li>
        </ul>
      </div>
      <Group title="会员服务" :isRight="true" @click="memberClick">
        <ul class="links" style="margin-top: 0.15rem">
          <li @click="toastClick(el)" v-for="(el, index) in data.levels" :key="index">
            <img :src="el.ico" class="link_img">
            <p class="S24">{{el.levelName}}</p>
          </li>
        </ul>
      </Group>
      <Group title="我的认证">
        <div class="authentication">
          <div class="real_name" @click="$router.push({name: 'authentication'})">
            <div :class="{no: user.registerState !== '5'}"></div>
            <p class="S24">实名认证</p>
          </div>
          <div class="phone" @click="$router.push({name: 'YY'})">
            <div></div>
            <p class="S24">手机认证</p>
          </div>
        </div>
      </Group>
      <CellGroup>
        <Cell title="我的资产" is-link to="/property"></Cell>
        <Cell title="我的礼物" is-link to="/gift"></Cell>
        <Cell title="消息通知" is-link to="/message"></Cell>
        <Cell title="我的动态" is-link to="/MyDynamic"></Cell>
        <Cell title="我的订单" is-link to="/order"></Cell>
        <Cell title="联系客服" is-link to="/service"></Cell>
      </CellGroup>
      <!-- <div class="group">
        <Cell v-for="(el, index) in List" :key="index" :title="el.menuName" is-link :url="el.linkHref"></Cell>
      </div> -->
    </div>
    <van-dialog
      v-model="isshow"
      show-cancel-button
      :showConfirmButton="false"
      :showCancelButton="false"
      closeOnClickOverlay
      :before-close="beforeClose"
    >
      <div class="dialog_content">
        <span>谁喜欢了我</span>
        <p>开通会员，随时查看悄悄查看你的用户，更可享有更多特权！</p>
        <router-link to="###" class="submit">开通会员</router-link>
      </div>
    </van-dialog>
  </div>
</template>
<script>
import Group from "@/components/Group";
import { ImagePreview , Cell, CellGroup} from 'vant'
import { personalCenter, uploadPhoto, menuTreeDate} from "@/assets/common/api";
import { mapState } from "vuex";
export default {
  data() {
    return {
      isshow: false,
      data: {
        dataIntegrity: "0",
        accessRecordUserPhotoUrl: '',
        likeMePhotoUrl: '',
        likeUserPhotoUrl: '',
        levels: [],
        photoList: [],
        userMemberAndUserHeadDTO: {}
      },
      List: [],
      isLoading: false
    }
  },
  computed: {
    ...mapState({
      user: state => state.IM.user
    }),
    photos() {
      return this.data.photoList.map(el => el.context).filter((el,index) => index < 3)
    }
  },
  methods: {
    setting () {
       var u = navigator.userAgent;
       if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
        console.log("安卓手机");
        window.Android.Setting()
      } else if (u.indexOf('iPhone') > -1) {//苹果手机
        console.log("苹果手机");
        window.webkit.messageHandlers.Setting.postMessage(null)
      } 
    },
    userHead () {
      window.instance = ImagePreview({
        images: [this.user.userHead]
      })
    },
    examinePhoto (id) {
      let index = this.data.photoList.findIndex(el => el.id === id)
      window.instance = ImagePreview({
        images: this.data.photoList.map(el => el.context),
        startPosition: index
      })
    },
    submitPhoto() {
      window.updatePhoto(str => {
        if(str) {
          uploadPhoto({
            userId: this.user.id,
            photoUrl: str
          }).then(() => {
            this.$toast('图片上传成功')
            this.$router.push({name: 'Photo'})
          })
        }
      })
    },
    memberClick() {
      this.$router.push({ name: "member" });
    },
    detailsClick() {
      this.$router.push({ name: "userDetails" });
    },
    photosClick() {
      this.$router.push({ name: "Photo" });
    },
    linkClick(type, examine) {
      // this.isshow = true
      this.$router.push({ name: "link", query: { type: type ,examine : examine} }); // 1为谁看过我 2 为谁喜欢我 3 我喜欢谁 4 互相喜欢
    },
    toastClick(item) {
      this.$store.state.common.member = item
      this.$router.push({ name: "memberDetails"});
    },
    serviceClick() {
      this.$router.push({ name: "service"});
    },
    beforeClose(action, done) {
      if (action === "confirm") {
        setTimeout(done, 1000);
      } else {
        done();
      }
    },
    getData () {
      personalCenter({ userId: this.user.id }).then(res => {
      if (res.data) {
        this.data = Object.assign(this.data, res.data);
        this.isLoading = true
      }
    });
    }
  },
  activated() {
    this.getData()
  },
  components: {
    Group,
    Cell,
    CellGroup
  }
};
</script>

<style scoped lang="less">
.head_img {
  position: absolute;
  height: 100%;
  border-radius: 50%;
  border: 1px solid @base-white;
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
.head {
  border: 1px solid @base-white;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  position: relative;
  z-index: 1;
  left: 0;
  top: 0;
  display: block;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  float: left;
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
.overflow{
  height: calc( 100% - 50px - .88rem);
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.submit {
  display: block;
  margin: 0 auto;
  width: 5.2rem;
  height: 0.8rem;
  background-color: @base-color;
  border-radius: 0.5rem;
  -webkit-border-radius: .5rem;
  text-align: center;
  line-height: 0.8rem;
  font-size: 0.31rem;
  color: @base-white;
  margin-top: 1rem;
}
.dialog_content {
  width: 6.5rem;
  padding: 0.79rem 0.65rem 0.6rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.dialog_content span {
  font-size: 0.35rem;
  color: @base-color;
}
.dialog_content p {
  margin-top: 0.8rem;
  padding: 0 0.5rem;
  font-size: 0.24rem;
  color: @base-black;
}
.lists {
  width: 100%;
}
.lists li {
  height: 0.9rem;
  border-bottom: 1px solid #f4f4f4;
  font-size: 0.27rem;
  color: #323232;
  line-height: 0.9rem;
  text-align: left;
}
.authentication {
  display: flex;
  display: -webkit-flex;
  justify-content: space-around;
  -webkit-justify-content: space-around;
  margin-top: 0.2rem;
  text-align: center;
}
.authentication .real_name div,
.authentication .phone div {
  width: 0.8rem;
  height: 0.8rem;
  display: inline-block;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  background-repeat: no-repeat;
  background-size: 100%;
}
.authentication .real_name div {
  background-image: url("../../assets/images/real_name@2x.png");
}
.authentication .real_name div.no{
  background-image: url("../../assets/images/unauthorized@2x.png");
}
.authentication .phone div {
  background-image: url("../../assets/images/phone@2x.png");
}
.authentication p {
  display: block;
  font-size: 0.24rem;
  color: @base-black;
  padding-top: 0.1rem;
  padding-bottom: 0;
  margin: 0;
}
.links {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  text-align: center;
  padding: 0 0.2rem;
}
.links .link_img {
  display: inline-block;
  width: 0.66rem;
  height: 0.66rem;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  display: inline-block;
  background-size: 100%;
  background-repeat: no-repeat;
}

.links li{
  position: relative;
}

.links li .back_Img {
  width: 0.66rem;
  height: 0.66rem;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  display: inline-block;
  background: url('../../assets/images/no_people@2x.png') no-repeat;
  background-size: calc(.66rem + 2px) calc(.66rem + 2px);
  background-position: -1px -1px;
  overflow: hidden;
  border: none
}
.links li .back_Img img{
  width: 100%;
  height: 100%
}
.links li.show::before{
  content: '';
  width: .1rem;
  height: .1rem;
  background: red;
  position: absolute;
  right: 0.25rem;
  top: 0;
  display: block;
  border-radius: 50%;
  z-index: 10;
}
.links li p {
  font-size: 0.24rem;
  color: @base-black;
  margin: 0;
  white-space: nowrap;
  margin-top: .1rem;
}
.photos {
  text-align: left;
  padding: 0.4rem 0;
  overflow: hidden;
  position: relative;
}
.photo_more {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
}
.photos li {
  border-radius: 0.15rem;
  -webkit-border-radius: .15rem;
  margin-right: 0.05rem;
  float: left;
}
.photos .photo_item {
  width: 1.35rem;
  height: 1.35rem;
  background-color: @base-ddd;
  background-image: url("../../assets/images/user_photo_add@2x.png");
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: 50%;
  position: relative;
}
.photos .photo_item.isShow{
  background-image: none;
  text-align: center;
}
.photos .photo_item img {
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.photograph {
  width: 1.35rem;
  height: 1.35rem;
  border: 1px dashed #d7d7d7;
  text-align: center;
  position: relative;
}
.photograph div {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.photograph div img {
  width: 0.5rem;
  height: 0.5rem;
  display: inline-block;
}
.photograph div p {
  font-size: 0.19rem;
  color: @base-black;
  margin: 0;
  white-space: nowrap;
}
.group {
  padding: 0 0.3rem;
  background-color: @base-white;
  border-bottom: 0.1rem solid #f0f0f0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  padding-bottom: 0.32rem;
}
.title {
  position: relative;
  color: #323232;
  font-size: 0.36rem;
  line-height: 0.88rem;
  height: 0.88rem;
  text-align: center;
  background: @base-white
}
.title .shezhi {
  width: 0.38rem;
  height: 0.4rem;
  display: block;
  position: absolute;
  right: .3rem;
  top: 50%;
  transform: translate(0, -50%);
  background-size: 100%;
  background-image: url("../../assets/images/user_set@2x.png");
}
.sanjiao {
  font-size: 0.28rem;
  color: @base-black;
  float: right;
}
.sanjiao::after {
  content: "";
  display: inline-block;
  height: 0.15rem;
  width: 0.15rem;
  border: 1px solid #8e8e8e;
  border-left: transparent;
  border-top: transparent;
  transform: rotate(-45deg);
}
.datum {
  overflow: hidden;
}
.datum img {
  display: block;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  float: left;
}
.datum_content {
  padding-left: 0.4rem;
  width: calc(100% - 2rem);
  color: @base-black;
  font-size: 0.27rem;
  line-height: 0.67rem;
  padding: 0.11rem 0 0.15rem 0;
  display: inline-block;
  text-align: left;
}
.credit {
  border: 1px solid #d8d8d8;
  color: @base-blue;
  padding: 0.08rem 0.1rem;
  font-size: 0.2rem;
}
.datum_content strong {
  color: @base-blue;
  font-weight: 500;
}
</style>
