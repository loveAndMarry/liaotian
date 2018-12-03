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
          <div class="item">
            <van-circle
              v-model="currentRate"
              :rate="30"
              :speed="100"
              :text="text"
              fill="#fff"
              layer-color="#ccc"
              size="1rem"
              color="#ff7994"
            />
            <p>资料完整度</p>
          </div>
          <div class="head">
            <img src="http://image.biaobaiju.com/uploads/20180508/11/1525751142-GXLJjxcoyY.jpg" alt>
            <span>更换头像</span>
          </div>
          <div class="item">
            <div class="link"></div>
            <p>谁喜欢我</p>
          </div>
        </div>
        <div class="content_name">
          <h2>南城以南
            <span>实名</span>
          </h2>
          <div>
            <span>23岁</span>
            <span>168厘米</span>
            <span>山东济南</span>
          </div>
        </div>
        <SplitGroup title="最近访客" rightTitle="更多访客" style="margin-top:.6rem" @confirm="visitorClick">
          <img
            class="visitor_img"
            src="http://image.biaobaiju.com/uploads/20180508/11/1525751142-GXLJjxcoyY.jpg"
            alt
          >
          <img
            class="visitor_img"
            src="http://image.biaobaiju.com/uploads/20180508/11/1525751142-GXLJjxcoyY.jpg"
            alt
          >
          <img
            class="visitor_img"
            src="http://image.biaobaiju.com/uploads/20180508/11/1525751142-GXLJjxcoyY.jpg"
            alt
          >
          <img
            class="visitor_img"
            src="http://image.biaobaiju.com/uploads/20180508/11/1525751142-GXLJjxcoyY.jpg"
            alt
          >
          <img
            class="visitor_img"
            src="http://image.biaobaiju.com/uploads/20180508/11/1525751142-GXLJjxcoyY.jpg"
            alt
          >
        </SplitGroup>
        <SplitGroup title="自我介绍" rightTitle="编辑">
          <p
            class="self-introduction"
          >大家发两块多缴费卡等级分类进对方离开家里附近离开金风科技辣椒粉卡拉胶框架里咖啡机垃圾分类看案件来看九分裤加了客服进来快打架了看</p>
        </SplitGroup>
        <SplitGroup title="择偶意向" :isRight="false">
          <div class="intention_item" v-for="el in 10">姓名
            <div class="sanjiao">不限</div>
          </div>
        </SplitGroup>
        <SplitGroup title="兴趣爱好" rightTitle="编辑">
          <div class="hint_group">
            <span class="hint" v-for="(hint, i) in 10" :key="i">热爱读书</span>
          </div>
        </SplitGroup>
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
    }
  },
  components: {
    NavBar,
    SplitGroup
  }
};
</script>
<style scoped>
.hint_group{
  margin-top: .2rem;
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
}
.hint{
  padding: .07rem .15rem;
  text-align: center;
  font-size: .23rem;
  border:1px solid #d9d9d9;
  color:#858585;
  border-radius: .3rem;
  margin-right: .15rem;
  margin-bottom: .2rem
}
.intention_item {
  width: 100%;
  display: block;
  background-color: #fff;
  height: 0.89rem;
  text-align: left;
  font-size: 0.31rem;
  padding: 0 0.3rem;
  line-height: 0.89rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.intention_item .sanjiao {
  font-size: 0.28rem;
  color: #8d8d8d;
  float: right;
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
.self-introduction {
  font-size: 0.23rem;
  line-height: 0.29rem;
  color: #8d8d8d;
  margin-top: 0.4rem;
}
.visitor_img {
  width: 0.8rem;
  height: 0.8rem;
  display: block;
  float: left;
  margin-top: 0.5rem;
  margin-right: 0.2rem;
  border-radius: 50%;
}
.content_name h2 {
  display: inline-block;
  margin: 0.2rem 0;
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
.content_head .item p {
  white-space: nowrap;
  font-size: 0.23rem;
  color: #ff7b96;
}
.content_head .item .link {
  width: 1rem;
  height: 1rem;
  background-image: url("../../assets/images/data_like@2x.png");
  background-repeat: no-repeat;
  background-size: 100%;
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
.van-nav-bar {
  background-color: transparent;
}
.van-hairline--bottom::after {
  border: none;
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
  padding-bottom: 3rem;
  min-height: 100%;
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
