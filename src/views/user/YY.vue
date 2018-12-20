<template>
  <div>
    <NavBar left-arrow @click-left="onClickLeft" title="手机认证" right-text="手机变更" @click-right="onClickRight"/>
    <div class="back">
      <div class="back_content">
        <p>{{phone}}</p>
      </div>
      <span class="phone">您已通过手机验证</span>
    </div>
    <ul class="list">
      <li>安全保障，快速找回密码</li>
      <li>接受提醒，不再错过缘分</li>
      <li>投诉建议，客服快速反馈</li>
      <li>异性告白，红娘联系牵线</li>
    </ul>
  </div>
</template>
<script>
import { NavBar } from "vant";
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      phone: state => state.IM.user.phone.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")
    })
  },
  mounted () {
    console.log(this.$store)
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onClickRight () {
      var u = navigator.userAgent;
       if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
        console.log("安卓手机");
        window.Android.phone()
      } else if (u.indexOf('iPhone') > -1) {//苹果手机
        console.log("苹果手机");
        window.webkit.messageHandlers.phone.postMessage(null)
      } 
    }
  },
  components: {
    NavBar
  }
}
</script>

<style scoped>
.list{
      margin-top: .38rem;
    list-style: inside;
    text-align: center;
    float: left;
    width: 100%;
}
.list li{
  padding: .21rem .8rem 0;
  font-size: .28rem;
  color:#595959;
      margin-left: -.5rem;
}
.back{
background: url('../../assets/images/phone_authentication_bg@2x.png') no-repeat;
    background-size: 100%;
    width: 100%;
    height: 5rem;
    float: left;
}
.back_content{
    width: 3.2rem;
    height: 3.2rem;
    margin: .25rem auto;
    background: url('../../assets/images/phone_authentication@2x.png') no-repeat;
    background-size: 100%;
    position: relative;
}
.back_content p {
      position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: 2.39rem;
    font-size: .28rem;
    color: #fff;
    letter-spacing: .05rem;
}
.back .phone{
  display: block;
  bottom: 1rem;
  width: 100%;
  height: .8rem;
  line-height: .8rem;
  text-align: center;
  font-size: .33rem;
  color: #fff;
  background-color: #ff7994;
}
</style>
