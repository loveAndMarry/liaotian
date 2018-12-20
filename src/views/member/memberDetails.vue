<template>
  <div>
    <NavBar left-arrow @click-left="onClickLeft" :title="title"/>
    <div class="scroll" v-if="isLoading">
      <div style="padding:.2rem .3rem 0">
        <div class="money_group" v-for="(el, index) in members" :key="index">
          <span class="day">{{el.countName}}</span>
          <span class="money">￥{{el.discountsStart === '0' ? el.priceY : el.discountsPriceY}}</span>
          <del class="originalPrice" v-if="el.discountsStart === '1'">￥{{el.priceY}}</del>
          <span class="buy" @click="payment(el)">购买</span>
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
import { getMemberPrice } from '@/assets/common/api'
import { NavBar } from 'vant'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      title: '',
      members: [],
      isLoading: false
    }
  },
  components: {
    Group,
    NavBar
  },
  computed: {
    ...mapState({
      member: state => state.common.member,
      user: state => state.IM.user
    })
  },
  mounted () {
    this.title = this.member.levelName
    getMemberPrice({
      memberLevelId: this.member.id
    }).then((res) => {
      if(res.data){
        this.members = res.data;
        this.isLoading = true
      }
    })
  },
  methods: {
    payment (el) {
      let obj = {
        body: '购买会员',
        totalAmount: el.discountsStart === '0' ? el.priceY : el.discountsPriceY,
        subject: this.member.levelName + el.countName,
        userId: this.user.id,
        type: '1',
        productId: el.id,
        productCount: '1'
      }

      this.$router.push({name: 'purchase', query: {obj : obj}})
    },
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
  -webkit-ustify-items: center;
  justify-content: space-evenly;
   -webkit-justify-content: space-evenly;
  font-size: .24rem;
  color: #8d8d8d;
  padding: .2rem 0;
  margin-top: .2rem;
  border-top:1px solid #f0f0f0
}
.chart div{
  width: 50%
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
