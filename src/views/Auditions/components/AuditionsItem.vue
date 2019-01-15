<template>
  <div class="item">
    <img class="item_img" :src="el.picture"/>
    <div class="item_content">
        <div class="state">审核中</div>
        <p>{{el.content}}</p>
        <div class="time">截止日期：2019-01-01至2019-12-12</div>
        <div class="time">报名金额：200元</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['el']
}
</script>


<style scoped>
.item{
  padding: 0 .3rem .39rem;
  box-sizing: border-box;
  box-sizing: -webkit-border-box;
  font-size: .23rem;
  color: #f96388;
  text-align: left;
  overflow: hidden;
  background-color: #fff;
  margin-bottom: .2rem
}
.item_img{
  display: block;
  width: 1.58rem;
  height: 1.58rem;
  margin-top: .39rem;
  float: left;
}
.item_content{
  display: inline-block;
  width: calc(100% - 1.58rem);
  height: 100%;
  padding:0 .15rem;
  box-sizing: border-box;
  box-sizing: -webkit-border-box;
}
.item_content .state{
  text-align: right;
  width: 100%;
  height: .39rem;
  line-height: .55rem;
}
.item_content p{
  color: #393939;
  font-size: .27rem;
  margin: 0.03rem 0;
  overflow:hidden; 
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2; 
}
.item_content .time{
  line-height: .4rem
}
</style>
