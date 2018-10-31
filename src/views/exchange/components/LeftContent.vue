<template>
    <div class="left">
        <div class="left_img">
            <img :src="imgUrl" alt="">
        </div>
        <div class="left_content">
          {{item.content}}
        </div>
    </div>
</template>
<script>
export default {
  props: ['item'],
  computed: {
    imgUrl () {
      return localStorage.getItem('friendImg')
    }
  }
}
</script>

<style scoped>
.left{
  width: 100%;
  overflow: hidden;
  text-align: left;
  margin-top: .4rem
}
.left .left_img{
  margin-right: .14rem;
  display: block;
  float: left;
}
.left .left_img img{
  width: .8rem;
  height: .8rem;
  display: block;
  border-radius: 50%;
}
.left .left_content{
  max-width:calc( 100% - .94rem);
  padding: .3rem;
  display: inline-block;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  background-color: #fff;
  border-radius: 5px
}
</style>
