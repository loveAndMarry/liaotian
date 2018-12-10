<template>
  <div>
    <NavBar left-arrow @click-left="onClickLeft" title="我的订单"/>
    <div class="scroll">
      <div class="orderGroup">
        <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1287764448,2855586643&fm=27&gp=0.jpg">
        <div class="order_content">
          <p>地方噶空间大刚好看见好看就按会计师电话费卡时代峻峰哈空间发挥</p>
          <div>
            <span>￥699</span>
            <span style="float: right;">x 1</span>
          </div>
        </div>
        <div class="order_type success">支付成功</div>
      </div>
      <div class="orderGroup">
        <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1287764448,2855586643&fm=27&gp=0.jpg">
        <div class="order_content">
          <p>地方噶空间大刚好看见好看就按会计师电话费卡时代峻峰哈空间发挥</p>
          <div>
            <span>￥699</span>
            <span style="float: right;">x 1</span>
          </div>
        </div>
        <div class="order_type">支付失败</div>
      </div>
    </div>
  </div>
</template>
<script>
import { NavBar } from "vant";
export default {
  components: {
    NavBar
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  }
};
</script>
<style>
.scroll {
  height: calc(100% - 46px);
  overflow-x: hidden;
  overflow-y: scroll;
  background: #fff;
  padding: 0 0.3rem;
}
.orderGroup {
  padding: 0.2rem;
  padding-right: 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  color: #8e8e8e;
  font-size: 0.19rem;
  overflow: hidden;
}
.orderGroup img {
  float: left;
  width: 0.95rem;
  height: 0.95rem;
  margin-right: 0.2rem;
}
.order_content {
  float: left;
  width: calc(100% - 2.55rem);
  text-align: left;
}
.order_content p {
  margin: 0;
  font-size: 0.23rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.order_content div {
  margin-top: 0.15rem;
}
.order_type {
  float: right;
  height: 0.95rem;
  line-height: 0.95rem;
}
.success{
  color: #ff7994
}
</style>
