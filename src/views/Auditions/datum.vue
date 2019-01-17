<template>
  <div>
    <NavBar left-arrow @click-left="onClickLeft" title="资料"/>
    <div class="datum_content">
      <img :src="data.userHead" alt="">
      <div>
        <span style="margin-right: .25rem;color: #8d8d8d">{{data.nickName}}</span>
        <Tag style="background-color: #ff7997">{{data.levelName}}</Tag>
      </div>
      <p class="context">{{data.auditIntroduction}}</p>
      <div>
        <span class="button default" @click="submit('2')">拒绝</span>
        <sapn class="button confirm" @click="submit('1')">同意</sapn>
      </div>
    </div>
  </div>
</template>
<script>
import { NavBar, Tag ,Button, Toast} from 'vant'
import { candidacyAudit } from '@/assets/common/api'
export default {
  components: {
    NavBar,
    Tag,
    Button
  },
  data () {
    return {
      data: {}
    }
  },
  mounted () {
    this.data = this.$route.query.el
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    submit (type) {
      candidacyAudit({
        userId: this.$store.state.IM.user.id,
        massSelectionId: this.$store.state.group.groupId,
        auditJoinMassSelectionId: this.data.id,
        auditStatus: type
      }).then(res => {
        Toast({
          message: '操作成功',
          duration: 1000
        }),
        this.$router.back()
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
.datum_content img{
  display: block;
  width: 1.51rem;
  height: 1.51rem;
  border-radius: 50%;
  margin: .38rem auto .24rem
}
</style>
