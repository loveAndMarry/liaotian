 <template>
   <div>
      <NavBar
      left-arrow
      @click-left="onClickLeft" :title="title"/>

      <CellGroup style="margin-top: .19rem">
        <Cell title="支付金额">
          <span class="money">{{'￥' + totalAmount}}</span>
        </Cell>
      </CellGroup>

      <RadioGroup v-model="payType">
        <CellGroup style="margin-top: .19rem">
          <Cell title="请选择支付方式"></Cell>
          <Cell clickable @click="payType = '1'">
            <template slot="title">
              <i class="zhifubao"></i>
              <span class="custom-text">支付宝</span>
            </template>
            <Radio name="1"/>
          </Cell>
          <Cell clickable @click="payType = '2'">
            <template slot="title">
              <i class="weixin"></i>
              <span class="custom-text">微信</span>
            </template>
            <Radio name="2"/>
          </Cell>
        </CellGroup>
      </RadioGroup>
      <Button round type="danger" @click="submit">确认支付</Button>
   </div>
 </template>
<script>

import { NavBar ,Button, CellGroup, Cell, Radio, RadioGroup} from 'vant'
export default {
  data(){
    return {
      title: '高级会员12个月',
      totalAmount: 199,
      payType: '1'
    }
  },
  mounted () {
    this.title = this.$route.query.obj.subject
    this.totalAmount = this.$route.query.obj.totalAmount
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    submit () {
      this.$route.query.obj.payType = this.payType
      var u = navigator.userAgent;
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
        console.log("安卓手机");
        window.Android.payment(JSON.stringify(this.$route.query.obj))
      } else if (u.indexOf('iPhone') > -1) {//苹果手机
        console.log("苹果手机");
        window.webkit.messageHandlers.payment.postMessage(this.$route.query.obj)
      }
    }
  },
  components: {
    NavBar,
    Button,
    CellGroup,
    Cell,
    Radio,
    RadioGroup
  }
}
</script>

<style>
.zhifubao{
  width: .4rem;
  height: .4rem;
  background: url('../../assets/images/支付宝.png') no-repeat;
  background-size: 100%;
  display: inline-block;
  vertical-align: -.1rem;
}
.weixin{
  width: .4rem;
  height: .4rem;
  background: url('../../assets/images/微信.png') no-repeat;
  background-size: 100%;
  display: inline-block;
  vertical-align: -.1rem;
}
.van-radio .van-icon-checked{
  color: #ff7994
}
.van-button{
  margin-top:1rem;
  width: 5.18rem
}
.van-cell__title{
  text-align: left
}

.money{
  font-size: .29rem;
  color: #ff7997
}
</style>
 