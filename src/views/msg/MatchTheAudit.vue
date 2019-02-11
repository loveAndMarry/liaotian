<template>
  <div>
    <NavBar left-arrow @click-left="onClickLeft" title="资料"/>
    <div class="datum_content">
      <img :src="data.userHead" alt="" class="userHead">
      <div>
        <span style="margin-right: .25rem;color: #8d8d8d">{{data.nickName}}</span>
        <Tag style="background-color: #ff7997">{{data.levelName}}</Tag>
      </div>
      
      <p class="context">{{data.auditIntroduction}}</p>
      <div>
        <span class="button default" @click="submit('3')">拒绝</span>
        <span class="button confirm" @click="submit('2')">同意</span>
      </div>
    </div>
  </div>
</template>
<script>
import { NavBar, Tag ,Button, Toast} from 'vant'
import { selectMaritimeMatchingApplication, disposeMaritimeMatchingApplication} from '@/assets/common/api'
export default {
  components: {
    NavBar,
    Tag,
    Button
  },
  data () {
    return {
      el: {},
      data: {}
    }
  },
  beforeRouteEnter (to, from, next) {
    let data = to.query.el
    selectMaritimeMatchingApplication({
      pairUserId: data.messageType === '2'? data.sendUserId : data.acceptUserId,
      maritimeMatchingApplicationId: to.query.el.extId
    }).then(res => {
      if(res.code === 300){
        Toast({
          message: res.msg,
          duration: 1000
        })
        window.setTimeout(() => {
          next({name: from.name})
        })
        return 
      }
      if(res.data.pairUserIsAgree === '1'){
        next()
      }
      if(res.data.pairUserIsAgree === '2'){
        next({name: 'success', query: {el : res.data, context: '恭喜你&nbsp;&nbsp;&nbsp;<br/>配对成功！', title: '你和'+res.data.nickName+'配对成功了~'}})
      }
      if(res.data.pairUserIsAgree === '3'){
        next({name: 'beDefeated', query: {el : res.data}})
      }
    })
  },
  mounted () {
    let data = this.$route.query.el
    selectMaritimeMatchingApplication({
      pairUserId: data.messageType === '2'? data.sendUserId : data.acceptUserId,
      maritimeMatchingApplicationId: data.extId
    }).then(res => {
      this.data = res.data
    })
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    submit (type) {
      disposeMaritimeMatchingApplication({
        pairUserIsAgree: type,
        maritimeMatchingApplicationId: this.data.id
      }).then(res => {
        Toast({
          message: '操作成功',
          duration: 1000
        })
        window.setTimeout(() => {
          this.$router.back()
        },1000)
      })
    }
  }
}
</script>

<style scoped>
.button{
  padding: .18rem .94rem;
  font-size: .34rem;
  color: #fff;
  text-align: center;
  border-radius: .5rem;
  display: inline-block;
}
.default{
  background-color: #d8d8d8;
  margin-right: 1.09rem
}
.confirm{
  background-color: #ff6f93
}
.context{
  line-height: .3rem;
  font-size: .24rem;
  color: #323232;
  margin-top: .36rem;
  margin-bottom: 1.59rem;
  text-align: left
}
.datum_content{
  border-top: .16rem solid #f0f0f0;
  height: calc( 100% - 46px );
  background-color: #fff;
  padding: 0 .3rem;
  box-sizing: border-box;
  box-sizing: -webkit-border-box;
}
.datum_content img.userHead{
  display: block;
  width: 1.51rem;
  height: 1.51rem;
  border-radius: 50%;
  margin: .38rem auto .24rem
}
.file_group{
  width: 100%;
  padding: .2rem 0;
  border-radius: .05rem;
  text-align: left;
}
.file_group img{
  width: 24%;
}
</style>
