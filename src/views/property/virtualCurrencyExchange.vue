<template>
  <div>
    <NavBar left-arrow @click-left="onClickLeft" title="婚恋豆兑换"/>
    <div style="height: calc(100% - 46px);overflow: hidden scroll;background-color: #f0f0f0;">
      <div class="group">
        {{`婚恋豆余额：${ defaultNum }`}}
      </div>

      <div class="group">
        <div class="title">婚恋豆兑换</div>
        <div class="content_num">￥<input type="number" placeholder="请输入兑换婚恋豆数量" v-model="num"></div>
        <div style="font-size: .24rem">
          <span style="color:#8d8d8d">额外扣除{{rate}}服务费</span>
          <span style="color:#ff5e80;float:right" @click="num = defaultNum">全部兑换</span>
        </div>
      </div>

      <div class="state" style="text-align: left;">
        <span><input type="checkbox" class="input_check" id="check" checked="checked" onClick="return false"><label for="check"></label></span>
        <p>我已仔细阅读并接受<b>《申请条款》</b></p>
      </div>

      <span class="submit" @click="submit">确认兑换</span>
    </div>
  </div>
</template>

<script>
import { NavBar , Button, Toast} from 'vant'
import { virtualCurrencyExchange , exchangeRatio} from '@/assets/common/api'
export default {
  name: '',
  components: {
    NavBar,
    Button
  },
  data() { 
    return {
      defaultNum: 0,
      num: '',
      rate: 0
    }
  },
  mounted () {
    this.defaultNum =  Number(this.$route.query.defaultNum)
    exchangeRatio({
      userId: this.$store.state.IM.user.id
    }).then(res => this.rate = res.data)
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    submit () {
      if(Number(this.num) > this.defaultNum) {
        Toast({
          message: '兑换数量不能超过拥有数量',
          duration: 1000
        })
        return false
      }
      if(("" + this.num).replace(/\s/g, '') === '' || this.num == 0){
         Toast({
          message: '请输入要兑换的数量',
          duration: 1000
        })
        return false
      }
      virtualCurrencyExchange({
        userId: this.$store.state.IM.user.id,
        virtualCurrencyCount: this.num
      }).then(res => {
        Toast({
          message: '变现成功',
          duration: 1000
        })
        window.setTimeout(() => {
          this.$router.back()
        })
      })
    }
  }
 }
</script>

<style lang='less' scoped>
.group{
  margin-top: .2rem;
  padding: 0 .3rem;
  background-color: #fff;
  text-align: left;
  font-size: .28rem;
  line-height: 1.16rem
}

.content_num{
  font-size: .48rem
}
.content_num input{
  border: none;
  width: calc(100% - .8rem);
  font-size: .9rem;
  padding-left: .2rem
}
.content_num input::-webkit-input-placeholder {
  color: #d1d1d1;
  font-size: .28rem
}

.state span {position: relative;    margin-left: .37rem;}
.state .input_check {position: absolute;visibility: hidden;}
.state .input_check+label {display: inline-block;width: .28rem;height: .28rem;border: 1px solid #8d8d8d;border-radius: 2px;}
.state .input_check:checked+label:after {content: "";position: absolute;left: 2px;bottom: 11px;width: 9px;height: 4px;
border: 2px solid #ff5e80;border-top-color: transparent;border-right-color: transparent;
-ms-transform: rotate(-60deg); 
-moz-transform: rotate(-60deg); 
-webkit-transform: rotate(-60deg); 
transform: rotate(-45deg);} 

.state p{
    display: inline-block;
    vertical-align: 3px;
    margin-left: .1rem;
    color: #8d8d8d
}
.state p b{
    color: #000
}
.submit{
  display: block;
  width: calc(100% - .8rem);
  line-height: .8rem;
  border-radius: 1rem;
  background-color: #ff5e80;
  margin: 0 auto;
  color: #fff;
  text-align: center;
  height: .8rem;
  font-size: .34rem;
  margin-top: 2.7rem
}
</style>