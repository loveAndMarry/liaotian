<template>
  <div class="group">
    <div style="overflow-y: scroll;position: relative;height: 100%;overflow-x: hidden;">
      <div class="group_back">
        <img src="http://image.biaobaiju.com/uploads/20180508/11/1525751142-GXLJjxcoyY.jpg" alt>
      </div>
      <div class="group_content">
        <div class="top"></div>
      </div>
      <div class="content">
        <NavBar left-arrow @click-left="onClickLeft" @click-right="onClickRight"/>
        <div class="content_head">
          <div class="head">
            <img src="http://image.biaobaiju.com/uploads/20180508/11/1525751142-GXLJjxcoyY.jpg" alt>
            <span>更换头像</span>
          </div>
        </div>
        <div class="content_name">
          <p> <strong style="font-size:.35rem">8</strong> 位会员喜欢了您</p>
          <div style="color:#8c8c8c">
            开通会员查看访问您的人
          </div>
        </div>
        <ul class="links">
          <li class="links_group hide">
            <img src="http://image.biaobaiju.com/uploads/20180508/11/1525751142-GXLJjxcoyY.jpg" alt="">
            <p>7小时前</p>
          </li>
          <li class="links_group">
            <img src="http://image.biaobaiju.com/uploads/20180508/11/1525751142-GXLJjxcoyY.jpg" alt="">
            <p>7小时前</p>
          </li>
          <li class="links_group">
            <img src="http://image.biaobaiju.com/uploads/20180508/11/1525751142-GXLJjxcoyY.jpg" alt="">
            <p>7小时前</p>
          </li>
          <li class="links_group">
            <img src="http://image.biaobaiju.com/uploads/20180508/11/1525751142-GXLJjxcoyY.jpg" alt="">
            <p>7小时前</p>
          </li>
          <li class="links_group">
            <img src="http://image.biaobaiju.com/uploads/20180508/11/1525751142-GXLJjxcoyY.jpg" alt="">
            <p>7小时前</p>
          </li>
           <li class="links_group">
            <img src="http://image.biaobaiju.com/uploads/20180508/11/1525751142-GXLJjxcoyY.jpg" alt="">
            <p>7小时前</p>
          </li>
           <li class="links_group">
            <img src="http://image.biaobaiju.com/uploads/20180508/11/1525751142-GXLJjxcoyY.jpg" alt="">
            <p>7小时前</p>
          </li>
           <li class="links_group">
            <img src="http://image.biaobaiju.com/uploads/20180508/11/1525751142-GXLJjxcoyY.jpg" alt="">
            <p>7小时前</p>
          </li>
           <li class="links_group">
            <img src="http://image.biaobaiju.com/uploads/20180508/11/1525751142-GXLJjxcoyY.jpg" alt="">
            <p>7小时前</p>
          </li>
        </ul>
        <router-link class="submit" to="###">开通会员</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { NavBar, Circle } from "vant";
import SplitGroup from "@/components/SplitGroup";
import Vue from "vue";

Vue.use(Circle);
export default {
  data() {
    return {
      currentRate: 0
    };
  },
  computed: {
    text() {
      return this.currentRate.toFixed(0) + "%";
    }
  },
  methods: {
    onClickLeft() {},
    onClickRight() {},
    visitorClick () {
      this.$router.push({name: 'RecentVisitors'})
    },
    selfClick () {
      this.$router.push({name: 'selfIntroduction'})
    },
    hobbiesClick () {
      this.$router.push({name: 'Hobbies'})
    }
  },
  components: {
    NavBar,
    SplitGroup
  }
};
</script>
<style scoped>
.submit{
  display: block;
  margin: 0 auto;
  width: 5.2rem;
  height: .8rem;
  background-color: #ff7994;
  border-radius: .5rem;
  text-align: center;
  line-height: .8rem;
  font-size: .31rem;
  color:#fff;
  margin-bottom: .6rem;
}
.links{
  padding: .6rem .3rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  display: flex;
  display: -webkit-flex;
  justify-content: space-evenly;
  flex-wrap: wrap
}
.links li{
  display: inline-block;
  position: relative;
}
.links li.hide::after{
  content: '';
  display: block;
  position: absolute;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  background-image: url('../../assets/images/lock@2x.png');
  background-repeat: no-repeat;
  background-size: 20%;
  background-position: 50%
}
.links li img{
  display: block;
  width: 2rem;
  height: 2rem;
  border-radius: 50%
}
.links li p{
  display: block;
  white-space: nowrap;
  color: #707070
}
.van-nav-bar{
  background-color: transparent
}
.van-hairline--bottom::after{
  border-bottom-width: 0
}
.content_name p {
  display: inline-block;
  margin: 0.2rem 0;
  color: #f8718f
}
.content_name h2 span {
  width: 0.54rem;
  height: 0.3rem;
  display: inline-block;
  border-radius: 0.02rem;
  background-color: #33c1ff;
  color: #fff;
  font-size: 0.18rem;
  margin-left: 0.1rem;
  text-align: center;
}
.content_name div span {
  font-size: 0.23rem;
  color: #8d8d8d;
  margin-right: 0.18rem;
}
.content_head {
  margin-top: 0.6rem;
  display: flex;
  display: -webkit-flex;
  align-items: flex-end;
  justify-content: space-evenly;
}
.content_head .head {
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid #fff;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}
.content_head .head img {
  max-width: 100%;
  max-height: 100%;
}
.content_head .head span {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.5rem;
  font-size: 0.22rem;
  color: #fefefe;
  line-height: 0.5rem;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
}
.group {
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 0;
}
.group_back {
  position: absolute;
  top: 0;
  width: 100%;
  -webkit-filter: opacity(30);
  filter: opacity(30%);
}
.group_back img {
  width: 100%;
}
.group_content {
  position: absolute;
  width: 100%;
  background-color: #fff;
  top: 3rem;
  min-height: calc( 100% - .5rem);
}
.group_content .top {
  display: block;
  width: 120%;
  height: 4.2rem;
  left: -10%;
  top: -50px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
}
.content {
  width: 100%;
  background-color: transparent;
  position: relative;
}
</style>
