<template>
    <div class="right">
        <div class="right_content">
          {{item.content}}
        </div>
         <div class="right_img">
            <img :src="item.imgUrl" alt="">
        </div>
    </div>
</template>
<script>
export default {
  props: ['item']
}
</script>

<style scoped>
.right{
  width: 100%;
  overflow: hidden;
  text-align: right;
  margin-top: .4rem
}
.right .right_img{
  margin-left: .14rem;
  display: block;
  float: right;
}
.right .right_img img{
  width: .8rem;
  height: .8rem;
  display: block;
  border-radius: 50%;
}
.right .right_content{
  max-width:calc( 100% - .94rem);
  padding: .3rem;
  display: inline-block;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  background-color: #fff;
  border-radius: 5px
}
</style>
