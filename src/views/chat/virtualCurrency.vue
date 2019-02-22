<template>
  <div>
    <NavBar left-arrow @click-left="onClickLeft" title="婚恋豆"/>
    <div style="height: calc(100% - 46px);overflow-y: scroll;overflow-x: hidden;background-color: #fff;">
      <img style="width: 100%;border-bottom: 1px solid #f0f0f0" src="http://systemmaiyuan.minmai1688.com/ec1a8ad168fb47609639244bd05e1fc1bg.png" alt="">
      <div class="item_coin S30" v-for="(el, index) in priceList" :key="index">
        <span>{{el.virtualCurrencyCount}}颗</span>
        <i>￥{{el.priceY}}</i>
        <div @click="purchase(el)">购买</div>
      </div>
      <div class="item_hint S24">
        <p>1.部分特权请登录麦缘婚恋网使用。</p>
        <p>2.服务将于在线支付成功后自动开通。</p>
        <p>3.对服务有任何疑问或出现使用问题，请拨打买缘婚恋客服专线咨询。</p>
        <p>4.购买后，有限期为12月</p>
      </div>
      <div style="height: .5rem"></div>
    </div>
  </div>
</template>

<script>
import { NavBar} from 'vant'
import { listVirtualCurrencyPrice } from '@/assets/common/api'
export default {
  components: {
    NavBar
  },
  data () {
    return {
      priceList: []
    }
  },
  mounted () {
    listVirtualCurrencyPrice({
      pageCurrent: 1,
      pageSize: 10
    }).then(res => {
      if(res.data && res.data.list){
        this.priceList = res.data.list
      }
    })
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    purchase (el) {
      let obj = {
        body: '购买婚恋豆',
        totalAmount: el.priceY,
        subject: '购买婚恋豆',
        userId: this.$store.state.IM.user.id,
        type: '2',
        productId: el.id,
        productCount: '1'
      }

      this.$router.push({name: 'purchase', query: {obj : obj}})
    }
  }
}
</script>
<style lang="less" scoped>
.item_coin{
  height: 1.19rem;
  line-height: 1.19rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  text-align: right;
  border-bottom: 1px solid #f0f0f0;
  span{
    float: left;
  }
  i{
    color: @base-color;
    margin-right: .76rem;
  }
  div{
    width: 1.2rem;
    height: .6rem;
    line-height: .6rem;
    background-color: @base-color;
    color: #fff;
    display: inline-block;
    text-align: center;
    border-radius: .1rem;
  }
}
.item_hint{
  text-align: left;
  p{
    margin-top: .2rem;
    margin-bottom: 0;
    padding: 0 .3rem;
    color: #8d8d8d
  }
}
</style>
