<template>
  <div>
     <NavBar left-arrow @click-left="onClickLeft" :title="title"/>
     <div style="height: calc(100% - 46px);overflow-y: scroll;overflow-x: hidden">
        <Intro :data="data"/>
        <!-- 容器 -->
        <div style="background-color: #fff;margin-top: .2rem;padding-top: .2rem">
          <div class="apply">我要报名</div>

          <div class="apply_group">
            <span class="apply_group_title">参选费用</span>
            <div class="apply_group_content">
              {{data.initiatingAmountY}}元
            </div>
          </div>

          <div style="padding: 0.25rem .77rem">
            <Button round size="large" class="submit" @click="submit">确认发布</Button>
          </div>
        </div>
     </div>
  </div>
</template>
<script>
import { NavBar , Button} from 'vant'
import { getMassSelectionDetails } from '@/assets/common/api'
import Intro from './components/intro'
export default {
  components: {
    NavBar,
    Button,
    Intro
  },
  data () {
    return {
      title: '审核通过',
      data: {}
    }
  },
  mounted () {
    getMassSelectionDetails({
      massSelectionId: this.$route.query.massSelectionId,
      userId: this.$store.state.IM.user.id
    }).then(res => {
      this.data = res.data
    })
  },
  methods: {
    submit () {
      var obj = {
        body: '海选基金',
        subject: '发起海选',
        userId: this.$store.state.IM.user.id,
        type: 3,
        productId: this.$route.query.massSelectionId,
        totalAmount: this.data.initiatingAmountY,
        productCount: 1
      }
      this.$router.push({name: 'purchase', query: {obj: obj}})
    },
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>
<style scoped>
.submit{
  background-color: #ff6f93;
  height: .7rem;
  line-height: .7rem;
  color: #fff;
  margin-top: 0
}
.apply{
  font-size: .34rem;
  margin-bottom: .36rem;
}
.apply_group{
  padding-left: .77rem;
  overflow: hidden;
}
.apply_group_title{
  float: left;
  font-size: .27rem;
  margin-right: .33rem;
}
.apply_group_content{
  float: left;
  max-width: 4.6rem;
  padding-bottom: .2rem;
}
</style>
