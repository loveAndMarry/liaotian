<template>
    <div class="left">
        <div class="left_img">
            <img :src="item.userHead">
        </div>
        <div class="left_content"  v-html="Replace(item.context)">
        </div>
    </div>
</template>
<script>
import utils from '@/assets/common/utils'
export default {
  props: {
    item: Object
  },
  methods: {
    Replace (val) {
      return utils.uncodeUtf16(val.replace(/#[\u4E00-\u9FA5]{1,3};/gi, this.emotion))
    }
  }
}
</script>

<style scoped>
.left{
  width: 100%;
  overflow: hidden;
  text-align: left;
  padding: 0.2rem .3rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.left .left_img{
  margin-right: .14rem;
  display: block;
  float: left;
}
.left .left_img img{
  width: 1rem;
  height: 1rem;
  display: block;
  border-radius: 50%;
  -webkit-border-radius: 50%;
}
.left .left_content{
  max-width:calc( 100% - 1.14rem);
  padding: .3rem;
  display: inline-block;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  background-color: #fff;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  font-size: .28rem
}
</style>
