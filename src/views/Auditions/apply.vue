<template>
  <div>
     <NavBar left-arrow @click-left="onClickLeft" title="报名"/>
     <div style="height: calc(100% - 46px);overflow-y: scroll;overflow-x: hidden;background-color: #fff;">
        <Intro :data='data'/>

        <div class="apply">我要报名</div>

        <div class="apply_group">
          <span class="apply_group_title">自我介绍</span>
          <div class="apply_group_content">
            <textarea class="textarea" placeholder="简单的一段话介绍自己" v-model="content"></textarea>
          </div>
        </div>

        <div class="apply_group">
          <span class="apply_group_title">参选资料</span>
          <div class="apply_group_content">
             <ul class="photos">
            <li class="photograph" @click="submitPhoto">
              <div>
                <img src="../../assets/images/user_photo_upload@2x.png" alt>
                <p>上传图片</p>
              </div>
            </li>
            <li 
              class="photo_item isShow"
              v-for="item in photos" 
              :key="item" 
              @click="examinePhoto(item)" 
              @touchstart="showDeleteButton(item)"
              @touchend="clearLoop(item)"
            >
              <img :src="item + '?imageMogr2/auto-orient'" v-if="item" alt>
            </li>
            <template v-show="Length === 0" >
              <li class="photo_item" v-for="item in Length" :key="item"></li>
            </template>
            <li class="photo_hint">最多上传8张</li>
          </ul>
          </div>
        </div>

        <div style="padding: 0.25rem .77rem">
          <Button round size="large" class="submit" @click="submitClick" :disabled='isDisabled'>提交</Button>
        </div>
     </div>
  </div>
</template>
<script>
import { NavBar , Button, Toast ,ImagePreview} from 'vant'
import Intro from './components/intro'
import { getMassSelectionDetails , participateInMassSelection } from '@/assets/common/api'
export default {
  components: {
    NavBar,
    Button,
    Intro
  },
  computed: {
    Length () {
      return (2 - this.photos.length) > 0 ? (2 - this.photos.length) : 0
    }
  },
  data () {
    return {
      photos: [],
      data: {},
      content: '',
      isDisabled: false,
      Loop: null
    }
  },
  mounted () {
    getMassSelectionDetails({
      massSelectionId: this.$route.query.massSelectionId,
      userId: this.$store.state.IM.user.id
    }).then(res => {
      this.data = res.data
    })
  },
  methods: {
    submitClick () {
      if(this.content.replace(/ /g, '') === ''){
        Toast({
          message: '请输入一句话介绍',
          duration: 1000
        })
        return
      }
      if(this.photos.length === 0){
        Toast({
          message: '请上传至少一张图片',
          duration: 1000
        })
        return
      }

      participateInMassSelection({
        userId: this.$store.state.IM.user.id,
        massSelectionId: this.data.id,
        auditIntroduction: this.content,
        picture: this.photos.join(', ')
      }).then(res => {
        Toast({
          message: '报名成功，请等待审核',
          duration: 1000
        })
        this.isDisabled = true
      })
    },
    submitPhoto() {
      if(this.photos.length < 9){
         window.updatePhoto(str => {
          if(str) {
            this.photos.push(str)
          }
        })
      } else {
        Toast({
          message: '最多只能上传8张图片',
          duration: 1000
        })
      }
    },
    examinePhoto (item) {
      let index = this.photos.findIndex(el => el === item)
      window.instance = ImagePreview({
        images: this.photos.map(el => el),
        startPosition: index
      })
    },
    onClickLeft () {
      this.$router.back()
    },
    showDeleteButton(e) {
      clearTimeout(this.Loop); //再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(function() {
        this.$dialog.confirm({   //这是个弹出框，用的ydui
          title: '是否删除当前图片',
          beforeClose: (action, done) => {
            if(action === 'confirm') {
              this.photos = this.photos.filter(el => el !== e)
              done()
            } else {
              done()
              this.$dialog.close()
            }
          }
        });
      }.bind(this), 1000);
    },
    clearLoop(e) {
      clearTimeout(this.Loop)
    }
  }
}
</script>
<style scoped>
.submit{
  background-color: #ff6f93;
  height: .8rem;
  line-height: .8rem;
  color: #fff;
}
.apply{
  font-size: .34rem;
  margin-bottom: .36rem;
}
.apply_group{
  padding-left: .77rem;
  overflow: hidden;
}
.apply_group_title{
  float: left;
  font-size: .27rem;
  margin-right: .33rem;
}
.apply_group_content{
  float: left;
  max-width: 4.6rem;
  padding-bottom: .2rem;
}
.textarea{
  width: 4rem;
  height: 1.04rem;
  border-radius: .1rem;
  padding: .14rem .19rem;
  font-size: .23rem;
}
.photos {
  text-align: left;
  overflow: hidden;
  position: relative;
}
.photos li {
  border-radius: 0.15rem;
  -webkit-border-radius: .15rem;
  margin-right: 0.05rem;
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
  margin-bottom: .1rem;
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
.photos .photo_hint{
  width: 100%;
  color: #d8d8d8;
  font-size: .19rem;
  margin-top: .1rem;
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
