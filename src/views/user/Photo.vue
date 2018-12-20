<template>
  <div>
    <NavBar
    left-arrow
    @click-left="onClickLeft" title="我的相册"/>
    <ul class="photos">
       <li class="photograph" @click="submitPhoto">
            <div>
              <img src="../../assets/images/user_photo_upload@2x.png" alt=""> 
              <p>上传图片</p>
            </div>
        </li>
        <li v-for="(el, index) in photoList" :key="index" class="photo_item" @touchstart="showDeleteButton(el.photoId)"
          @touchend="clearLoop(el.photoId)">
          <div
          :style="{backgroundImage: 'url(' + el.context + '?imageMogr2/auto-orient)'}"
          @click="imageClick(index)"></div>
          <span class="states" v-if="el.states !== '2'">{{el.states | statesFilter}}</span>
        </li>
    </ul>
  </div>
</template>
<script>
import { NavBar, ImagePreview  } from "vant"
import { userPhoto, uploadPhoto, deletePhoto} from '@/assets/common/api'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      value: '',
      Loop: null,
      pageCurrent: 1,
      pageSize: 15,
      photoList: []
    }
  },
  computed: {
    ...mapState({
      user: state => state.IM.user
    })
  },
  components: {
    NavBar
  },
  filters: {
    statesFilter (val) {
      switch(val){
        case '1':
          return '审核中'
          break
        case '2':
          return ''
          break
        case '3':
          return '审核失败'
          break
      }
    }
  },
  mounted () {
    userPhoto({
      pageCurrent:this.pageCurrent,
      pageSize: this.pageSize,
      userId: this.user.id
    }).then((res) => {
      if(res.data){
        this.photoList.push(...res.data)
      }
    })
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    imageClick (index) {
      window.instance = ImagePreview({
        images: this.photoList.map(el => el.context),
        startPosition: index,
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
            this.photoList.push({
              context: str,
              states: '1'
            })
          })
        }
      })
    },
    showDeleteButton(e) {
      clearTimeout(this.Loop); //再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(function() {
        this.$dialog.confirm({   //这是个弹出框，用的ydui
          title: '是否删除当前图片',
          beforeClose: (action, done) => {
            if(action === 'confirm') {
              deletePhoto({
                userId:this.user.id,
                photoId: e
              }).then((res) => {
                this.photoList = this.photoList.filter(el => el.photoId !== e)
                done()
                this.$toast('删除成功')
              })
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
.photos{
  padding: 0 .1rem;
}
.photos li:nth-child(1){
  margin-left: 0
}
.photos .photo_item:nth-child(3n + 1){
  margin-left: 0
}
.photos li{
  width: calc(2.38rem - 2px);
  height: calc(2.38rem - 2px);
  border: 1px solid transparent;
  border-radius: .15rem;
  -webkit-border-radius: .15rem;
  margin-left: .08rem;
  margin-bottom: .1rem;
  overflow: hidden;
  float: left;
}
.photos .photo_item{
  width: calc(2.38rem - 2px);
  height: calc(2.38rem - 2px);
  line-height: calc(2.38rem - 2px);
  background-color: #dddddd;
  background-image: url('../../assets/images/user_photo_add@2x.png');
  background-size: 40%;
  background-repeat: no-repeat;
  background-position: 50%;
  position: relative;
  z-index: 10;
}
.photos .photo_item .states{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: .5rem;
  text-align: center;
  line-height: .5rem;
  background: rgba(0,0,0,.6);
  color: #fff;
  z-index: 1;
}

.photos .photo_item div{
  display: block;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%
}
.photos li.photograph{
  border: 1px dashed #d7d7d7;
  text-align: center;
  position: relative;
}
.photos li.photograph div{
    width: 1.44rem;
  height: 1.44rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center
}
.photos li.photograph div img{
  width: .8rem;
  height: .8rem;
  display: inline-block
}
.photos li.photograph div p{
  font-size: .28rem;
  color: #818181;
  margin: 0;
  white-space: nowrap;
}
</style>
