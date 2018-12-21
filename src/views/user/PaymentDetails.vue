<template>
  <div style="background-color:#fff">
    <NavBar left-arrow @click-left="onClickLeft" title="订单详情"></NavBar>
    <div class="title">
      <span class="img"></span>
      山东民麦科技
    </div>
    <h1 class="h1">-{{item.payMoneyY}}</h1>
    <p class="p">交易成功</p>
    <CellGroup style="text-align: left;">
      <Cell title="付款方式" is-link :value="item.payType | pay"/>
      <Cell title="创建时间" is-link :value="item.payTime" />  
      <Cell title="订单号" :value="item.orderNum" />  
    </CellGroup>
  </div>
</template>
<script>
import { NavBar, Cell, CellGroup} from 'vant'
export default {
  data () {
    return {
      item: {}
    }
  },
  filters: {
    pay (val) {
      switch(val) {
        case '1':
          return '支付宝'
          break
        case '2':
          return '微信'
          break
        case '3':
          return '余额'
          break
      }
    }
  },
  components: {
    NavBar,
    Cell,
    CellGroup
  },
  mounted() {
    this.item = this.$route.query.el
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>
<style scoped>
.title{
  font-size: .29rem;
  color: #313131;
  margin-top: .5rem
}
.img{
  width: .5rem;
  height: .5rem;
  display: inline-block;
  background: url('../../assets/images/logo.png') no-repeat;
  background-size: cover;
  vertical-align: middle
}
.h1{
  font-size: .47rem;
  margin-bottom: 0;
}
.p{
  margin-top: .22rem
}
</style>
