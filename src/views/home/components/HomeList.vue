<template>
  <scroller :on-infinite="infinite"  :on-refresh="refresh" ref="scroller">
    <ul class="home_list">
      <li v-for="(item, index) in columns" :key="index" @click="showDetail(item.id)">
        <div class="title">
          <img :src="item.portrait" alt="">
        </div>
        <div class="list_content">
          <div class="top">
            <div class="name">{{item.userName}}
              <span>实名</span>
            </div>
            <div class="praise"><span></span>{{item.praise}}</div>
          </div>
          <div class="message">
            <p v-text="`${item.age}岁`"></p>
            <i>|</i>
            <p v-text="`${item.height}cm`"></p>
            <i>|</i>
            <p v-text="item.education"></p>
            <i>|</i>
            <p v-text="item.income"></p>
          </div>
          <ul class="tags">
            <li v-for="(el, dex) in item.tag" :key="dex" v-text="el"></li>
          </ul>
          <div class="manifesto" v-text="`爱情宣言 :${item.manifesto}`"></div>
        </div>
      </li>
    </ul>
  </scroller>
</template>
<script>
export default {
  props: ['columns'],
  methods: {
    showDetail (id) {
      this.$router.push({path: '/userDetail', query: {id: id}})
    },
    infinite () {
       window.setTimeout(()=>{
        this.$refs.scroller.finishInfinite(true)
      },3000)
      console.log(arguments,'infinite')
      return false
    },
    refresh () {
       window.setTimeout(()=>{
        this.$refs.scroller.finishPullToRefresh()
      },3000)
      console.log(arguments,'refresh')
      return false
    },
  }
}
</script>

<style scoped>
.home_list{
  display: block;
}
.home_list li{
  margin-bottom: .1rem;
  padding:.35rem 0 .35rem .3rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  overflow: hidden;
  background-color: #fff
}
.home_list li .title{
  float: left;
  width: 1.5rem;
  padding-top: .1rem;
}
.home_list li .title img{
  width: 100%;
  border-radius: 50%;
  display: block
}
.list_content {
  float: left;
  width: calc(100% - 1.5rem);
  padding:0 .3rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  color:#8d8d8d;
  text-align: left
}
.list_content .top{
  height: .55rem;
}
.list_content .top .name{
  float: left;
  font-size: .3rem;
  color:#313131;
}
.list_content .top .name span{
  width: .54rem;
  height: .3rem;
  display: inline-block;
  border-radius: .02rem;
  background-color: #33c1ff;
  color: #fff;
  font-size: .18rem;
  margin-left:.1rem;
  text-align: center
}
.list_content .top .praise{
  float: right;
  font-size: .23rem;
  line-height: .3rem;
  color:#fe7996;
  margin-top: .03rem;
}
.list_content .top .praise span{
  display: inline-block;
  width: .3rem;
  height:.3rem;
  background-image: url('../../../../static/images/like_btn@2x.png');
  background-repeat: no-repeat;
  background-size: 100%;
  margin-right: .1rem;
  vertical-align: top;
}
.list_content .message{
  font-size: .26rem;
  line-height: .26rem;
  overflow: hidden;
}
.list_content .message i, .list_content .message p{
  display: inline-block;
  float: left;
  margin:0
}
.list_content .message i{
  display: inline-block;
  margin: 0 .1rem
}
.list_content .tags{
  font-size: .2rem;
  color: #8e8e8e;
  margin-top: .2rem
}
.list_content .tags li{
  background-color: #dedede;
  display: inline-block;
  padding: .05rem .1rem;
  margin-right: .1rem
}

</style>
