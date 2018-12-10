<template>
  <div>
    <NavBar left-arrow @click-left="onClickLeft" :title="title"/>
    <div class="scroll">
      <div style="padding:.2rem .3rem 0">
      <div class="money_group">
        <span class="day">12个月</span>
        <span class="money">￥888</span>
        <del class="originalPrice">￥1288</del>
        <span class="buy">购买</span>
      </div>
      <div class="money_group">
        <span class="day">9个月</span>
        <span class="money">￥888</span>
        <del class="originalPrice">￥1288</del>
        <span class="buy">购买</span>
      </div>
      <div class="money_group">
        <span class="day">6个月</span>
        <span class="money">￥888</span>
        <del class="originalPrice">￥1288</del>
        <span class="buy">购买</span>
      </div>
      <div class="money_group">
        <span class="day">3个月</span>
        <span class="money">￥888</span>
        <del class="originalPrice">￥1288</del>
        <span class="buy">购买</span>
      </div>
    </div>
    <Group title="会员特权">
       <div class="intention_item">
        <img src="../../assets/images/vip_zungui_icon@2x.png" alt="">
        <div class="item">
          <div>尊贵会员标识</div>
          <p>点亮会员身份标识，彰显身份地位</p>
        </div>
      </div>
      <div class="intention_item">
        <img src="../../assets/images/vip_nicheng_icon@2x.png" alt="">
        <div class="item">
          <div>红色昵称展示</div>
          <p>昵称红名,展现更醒目,邂逅页,个人资料页,搜索</p>
        </div>
      </div>
    </Group>
    <Group title="开通会员 更快找到另一半">
      <div class="chart">
        <div>
          <p>普通用户</p>
          <img src="../../assets/images/bg1@2x.png" alt="">
          <p>开通会员 大幅提升</p>
          <span>交友成功率</span>
        </div>
        <div>
          <p>普通用户</p>
          <img src="../../assets/images/bg1@2x.png" alt="">
          <p>开通会员 大幅提升</p>
          <span>收信次数</span>
        </div>
      </div>
    </Group>
    </div>
  </div>
</template>
<script>
import Group from '@/components/Group'
import { NavBar } from 'vant'
export default {
  data () {
    return {
      title: ''
    }
  },
  components: {
    Group,
    NavBar
  },
  mounted () {
    this.title = this.$route.query.item.levelName
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.scroll{
  height: calc(100% - 46px);
  overflow-x: hidden;
  overflow-y: scroll;
  background: transparent;
  padding: 0
}
.chart{
  display: flex;
  display: -webkit-flex;
  justify-items: center;
  justify-content: space-evenly;
  font-size: .24rem;
  color: #8d8d8d;
  padding: .2rem 0;
  margin-top: .2rem;
  border-top:1px solid #f0f0f0
}
.chart p{
  width: .23rem;
  display: inline-block;
  margin: 0;
  font-size: .24rem;
  line-height: 1.2;
  color: #ff7994;
}
.chart div p:nth-child(1){
  color: #8d8d8d;
}
.chart img{
  height: 2.12rem;
  margin: 0 .1rem;
}
.chart span{
  display: block;
      font-size: .27rem;
    color: #323232;
}
.intention_item {
  width: 100%;
  background-color: #fff;
  text-align: left;
  font-size: 0.31rem;
  padding: .18rem 0;
  line-height: 0.66rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  overflow: hidden;
  border-top: 1px solid #f0f0f0;
  margin-top: .2rem;
}
.intention_item img{
  width: .66rem;
  height: .66rem;
  border-radius: 50%;
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

.group{
  background-color: #fff
}
.money_group{
  padding-left: .3rem;
  padding-right: .58rem;
  margin-bottom: .2rem;
  color: #ff7896;
  font-size: .29rem;
  height: 1.24rem;
  line-height: 1.24rem;
  text-align: left;
  background: url('../../assets/images/purchase_vip_bg@2x.png') no-repeat;
  background-size: 100%;
}
.money_group span{
  display: inline-block;

}
.money_group .day{
  font-size: .35rem;
  color:#323232;
  width: 1.38rem;
}
.money_group .money{
  width: 1rem
}
.money_group .originalPrice{
  font-size: .19rem;
  color:#8d8d8d
}
.money_group .buy{
  float: right;
}
</style>
