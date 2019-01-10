<template>
<div>
  <Swipe :autoplay="3000" :height="height" indicator-color="#ed7794">
    <SwipeItem v-for="(image, index) in images" :key="index">
      <img v-lazy="image.imageUrl" @click="imageClick(image)" class="banner_img"/>
    </SwipeItem>
  </Swipe>
  <Popup v-model="isShow" position="right" :overlay='false' :overlay-style="{backgroundColor: 'transparent'}"> 
      <NavBar
      left-arrow
      @click-left="onClickLeft" :title="popupTitle"/>
      <div class="Router" name="popup" style="height: calc(100% - 46px); top: 46px">
        <template v-if="isComponentName === 'ToReceiveTheMember'">
          <ToReceiveTheMember :data="defaultData" @close="isShow = false"></ToReceiveTheMember>
        </template>
      </div>
  </Popup> 
</div>
</template>
<script>
import { Swipe, SwipeItem, Popup , NavBar} from 'vant'
import { listBanner } from '@/assets/common/api'
// 领取会员
import ToReceiveTheMember from '@/views/activity/ToReceiveTheMember'

export default {
  props: {
    page: String,
    height: {
      default: 100,
      type: Number
    }
  },
  data () {
    return {
      images:[],
      isShow: false,
      popupTitle: '',
      isComponentName: '', // 展示的组件名称
      defaultData: {}
    }
  },
  mounted () {
    listBanner({
      displayPage: this.page
    }).then((res) => {
      this.images = res.data
    })
  },
  methods: {
    imageClick (image){
      this.defaultData = image
      if(image.link.indexOf('www') !== -1) {
        return false
      }
      this.isShow = true
      this.popupTitle =  image.title
      this.isComponentName = image.link
    },
    onClickLeft () {
      this.isShow = false
    }
  },
  components: {
    Swipe,
    SwipeItem,
    Popup,
    NavBar,
    ToReceiveTheMember
  }
}
</script>

<style>
.banner_img{
  width: 100%;
  height: 100%
}
</style>

