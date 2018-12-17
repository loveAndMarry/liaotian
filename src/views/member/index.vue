<template>
<div>
  <NavBar left-arrow @click-left="onClickLeft" title="会员服务"/>
 <div class="intention_item" @click="intantionClick(el)" v-for="(el, index) in mementList">
    <img :src="el.ico" alt="">
    <div class="item">
      <div>{{el.levelName}}</div>
      <p>{{el.introduce}}</p>
    </div>
    <div class="sanjiao">开通</div>
  </div>
</div>
</template>
<script>
import { NavBar } from 'vant'
import { getMemberLevelList } from '@/assets/common/api'
export default {
  data () {
    return {
      mementList: []
    }
  },
  methods: {
    intantionClick (item) {
      this.$store.state.common.member = item
      this.$router.push({name: 'memberDetails'})
    },
    onClickLeft () {
      this.$router.push({name: 'user'})
    }
  },
  mounted () {
    getMemberLevelList({
      userId:this.$store.state.IM.user.id
    }).then((res) => {
      this.mementList = res.data
    })
  },
   components: {
    NavBar
  }
}
</script>

<style>
.intention_item {
    width: 100%;
    background-color: #fff;
    text-align: left;
    font-size: 0.31rem;
    padding: 0.23rem 0.3rem;
    line-height: 0.66rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    overflow: hidden;
}
.intention_item img{
  width: .66rem;
  height: .66rem;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  float: left;
}
.intention_item .item{
  float: left;
  margin-top: .05rem;
  margin-left: .18rem;
  line-height: 1;
}
.intention_item .item div{
  font-size: .27rem;
  color: #323232;
  margin-bottom: .1rem;
}
.intention_item .item p{
  margin: 0;
  font-size: .19rem;
  color: #8d8d8d;
}
.intention_item .sanjiao {
  font-size: 0.28rem;
  color: #ff7896;
  float: right;
}
.intention_item .sanjiao.hide::after{
  display:none !important;
}
.intention_item .sanjiao::after {
  content: "";
  display: inline-block;
  height: 0.15rem;
  width: 0.15rem;
  border: 1px solid #8e8e8e;
  border-left: transparent;
  border-top: transparent;
  transform: rotate(-45deg);
}
</style>
