<template>
  <Swipe :autoplay="3000" :height="height" indicator-color="#ed7794">
    <SwipeItem v-for="(image, index) in images" :key="index">
      <img v-lazy="image.imageUrl" @click="imageClick(image)" class="banner_img"/>
    </SwipeItem>
  </Swipe>
</template>
<script>
import { Swipe, SwipeItem} from 'vant'
import { listBanner } from '@/assets/common/api'
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
      images:[]
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
      console.log(image)
    } 
  },
  components: {
    Swipe,
    SwipeItem
  }
}
</script>

<style>
.banner_img{
  width: 100%;
  height: 100%
}
</style>

