<template>
  <div>
    <NavBar left-arrow @click-left="onClickLeft" title="实名认证"/>
    <img src="../../assets/images/authenticatio_ico@2x.png" alt="" style="margin-top: .7rem;width:3.5rem">
    <h4 class="title">提升交友诚信</h4>
    <ul class="list">
      <li>点亮专享醒目的实名标识</li>
      <li>拥有实名认证身份</li>
      <li>实人认证真诚交友</li>
      <li>获得更多推荐展示机会</li>
      <li>异性更放心与您交流交往</li>
    </ul>
    <Button round type="danger" style="width: 5.2rem;background-color: #ff7994;border: 1px solid #ff7994;margin-top:1rem" @click="buttonClick">{{name}}</Button>
  </div>
</template>
<script>
import { NavBar, Button } from "vant"
import { login } from '@/assets/common/api'
export default {
  data () {
    return {
      name: '立即认证',
      isRegisterState: false // 是否实名
    }
  },
  mounted () {
    login({
      userId: this.$store.state.IM.user.id
    }).then((res)=> {
      this.state(res.data.registerState)
    })
  },
  methods: {
    state (val) {
      if(val === '4'){
        this.name = '实名认证审核中...',
        this.isRegisterState = true
        this.$store.state.IM.user.registerState = '4'
      }
      if(val === '5'){
        this.name = '您已实名注册',
        this.isRegisterState = true
        this.$store.state.IM.user.registerState = '5'
      }
      if(val === '6'){
        this.name = '实名认证失败，请重新认证',
        this.isRegisterState = false
        this.$store.state.IM.user.registerState = '6'
      }
    },
    onClickLeft () {
      this.$router.back()
    },
    buttonClick () {
      var that = this
      // 实名认证后不需要操作了
      if(this.isRegisterState){return false}

      window.authentication(function() {
        that.state('4')
      })
    },
  },
  components: {
    NavBar,
    Button
  }
}
</script>

<style scoped>
.title{
  font-size: .32rem
}
.list{
  font-size: .26rem;
  color: #696b6a;
  text-align: left;
  padding-left: 2.3rem;
}
.list li {
  line-height: .7rem;
}
.list li::before{
  content: '';
  display: inline-block;
  width: .08rem;
  height: .08rem;
  background-color: #f67b6c;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  vertical-align: middle;
  position: relative;
  left: -.2rem;
}
</style>
