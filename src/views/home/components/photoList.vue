<template>
  <div>
    <NavBar left-arrow @click-left="onClickLeft" title="更多相册"></NavBar>
    <div style="height: calc(100% - 46px);overflow:hidden scroll;background-color: #fff;">
      <ul class="photoList">
        <li v-for="(el, index) in photoList" :key="index"><img :src="el.context" alt="" @click="openImg(el, index)"></li>
      </ul>
    </div>
  </div>
</template>
<script>
import { NavBar , ImagePreview} from 'vant'
export default {
  components: {
    NavBar,
    ImagePreview
  },
  data () {
    return {
      photoList: []
    }
  },
  mounted () {
    console.log(this.$route)
    this.photoList = this.$route.query.photoList
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    openImg (el, index) {
      window.instance = ImagePreview({
        images: this.photoList.map(el => el.context + '?imageMogr2/auto-orient'),
        startPosition: index,
      })
    }
  }
}
</script>
<style lang="less">
  .photoList{
    display: table;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .photoList li{
    width: calc(33.333333% - .08rem);
    height: 2.3rem;
    margin-bottom: .12rem;
    margin-right: .12rem;
    background-color: @base-ddd;
    position: relative;
  }
  .photoList li:nth-child(3n){
    margin-right: 0
  }
  .photoList li img{
    max-width: 100%;
    max-height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
</style>
