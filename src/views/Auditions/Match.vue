<template>
  <div>
    <NavBar
    title="发起匹配"
    left-arrow
    @click-left="onClickLeft"/>

    <div style="height: calc(100% - 46px);overflow:hidden scroll;padding: 0px 0.5rem;background-color: #fff;">
      <div>
        <img class="Match_img" :src="item.userHead" alt="">
      </div>
      <div>
        <span class="Match_name">{{item.nickName}}</span>
        <Tag  color="#ff7896">{{item.levelName}}</Tag>
      </div>
      <div>
        <p class="Match_p">{{item.personalIntroduction  || '他还没有完善个人简介...'}}</p>
      </div>
      <div style="text-align: left;">
        <h4>请上传配对凭证</h4>
        <ul class="photos">
          <li class="photograph" @click="submitPhoto">
            <div>
              <img src="../../assets/images/user_photo_upload@2x.png" alt>
              <p>上传图片</p>
            </div>
          </li>
          <li class="photo_item isShow" v-for="(item, index) in photos" :key="item" @click.prevent="examinePhoto(index)">
            <img :src="item + '?imageMogr2/auto-orient'" v-if="item" alt>
            <i @click.stop="$delete(photos, index)"></i>
          </li>
          <li class="photo_item" v-if="3 - photos.length > 0" v-for="item in (3 - photos.length)" :key="item">
          </li>
        </ul>
      </div>
      <div style="text-align: left;">
        <h4>请选择基金分配方式</h4>
        <RadioGroup v-model="radio">
          <Radio name="1">平分给每个用户</Radio>
          <Radio name="2">分配给当前用户</Radio>
        </RadioGroup>
      </div>
      <div>
        <Button round type="danger" @click="submitClick" :disabled="isDisabled">{{title}}</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { NavBar, Tag, RadioGroup, Radio, ImagePreview, Button, Toast} from 'vant'
import { maritimeMatchingApplication } from '@/assets/common/api'
export default {
  components: {
    NavBar,
    Tag,
    RadioGroup,
    Radio,
    Button
  },
  data () {
    return {
      photos: ['http://yuanimg.minmai1688.com/icon_20190110170647'],
      radio: '1',
      item: {},
      isDisabled: false,
      title: '发起匹配申请'
    }
  },
  mounted () {
    this.item = this.$route.query.el
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    submitPhoto() {
      if(this.photos.length >= 3){
        Toast({
          message: '最多只能上传3张图片',
          duration: 1000
        })
        return false
      }
      window.updatePhoto(str => {
        if(str) {
          this.photos.push(str)
        }
      })
    },
    examinePhoto (index) {
      window.instance = ImagePreview({
        images: this.photos,
        startPosition: index
      })
    },
    submitClick () {
      if(this.photos.length < 1) {
        Toast({
          message: '请最少上传一张凭证',
          duration: 1000
        });
        return false
      }
      this.isDisabled = true
      
      maritimeMatchingApplication({
        userId: this.$store.state.IM.user.id,
        massSelectionId: localStorage.getItem('massSelectionId'),
        pairUserId: this.item.userId,
        picture: this.photos.join(','),
        moneyAllocationType: this.radio
      }).then(res => {
        Toast({
          message: '请求发送成功',
          duration: 1000
        })
        this.title = '等待对方审核中...'
        // window.setTimeout(() => {
        //   this.$router.back()
        // }, 1000)
      })
    }
  }
}
</script>
<style scoped>
.van-button {
  border-radius: 10em;
  width: 100%;
  background-color: #ff6f93;
  border-color: #ff6f93;
  margin-top: 2.5rem;
}
.van-radio{
  padding: .1rem 0
}
.Match_img{
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  padding: .38rem 0 .24rem;
}

.Match_name{
  font-size: .28rem;
  color: #8d8d8d;
  margin-right: .25rem;
}
.Match_p{
  letter-spacing: 1px;
  text-align: left;
  font-size: .23rem;
}

.photos {
  text-align: left;
  position: relative;
}
.photos::after{
  content: '';
  display: block;
  clear: both;
}
.photos li {
  border-radius: 0.15rem;
  -webkit-border-radius: .15rem;
  margin-right: 0.15rem;
  float: left;
}
.photos .photo_item {
  width: 1.44rem;
  height: 1.44rem;
  line-height: 1.44rem;
  background-color: #dddddd;
  background-image: url("../../assets/images/user_photo_add@2x.png");
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: 50%;
  position: relative;
}
.photos .photo_item i{
  position: absolute;
  width: .4rem;
  height: .4rem;
  display: block;
  top: -.15rem;
  right: -.15rem;
  background: url('../../assets/images/删除.png') no-repeat;
  background-size: 100% 100%;
      background-color: #fff;
    border-radius: 50%;
}
.photos .photo_item.isShow{
  background-color: #484040;
  background-image: none
}
.photos .photo_item img {
  max-width: 100%;
  max-height: 100%;
  width: 100%;
}
.photograph {
  width: 1.44rem;
  height: 1.44rem;
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
  color: #818181;
  margin: 0;
  white-space: nowrap;
}
</style>
