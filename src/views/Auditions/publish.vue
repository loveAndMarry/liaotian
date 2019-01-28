<template>
  <div>
     <NavBar left-arrow @click-left="onClickLeft" :title="title"/>
     <div style="height: calc(100% - 46px);overflow-y: scroll;overflow-x: hidden">
        <Intro :data="data"/>
        <!-- 容器 -->
        <div style="background-color: #fff;margin-top: .2rem;padding-top: .2rem">
          <div class="apply">发起资料</div>

          <div class="apply_group">
            <span class="apply_group_title">参选费用</span>
            <div class="apply_group_content">
              {{data.initiatingAmountY}}元
            </div>
          </div>

          <div style="padding: 0.25rem .77rem">
            <Button round size="large" class="submit" @click="submit">{{submitText}}</Button>
          </div>
        </div>
     </div>
  </div>
</template>
<script>
import { NavBar , Button, Toast} from 'vant'
import { getMassSelectionDetails } from '@/assets/common/api'
import Intro from './components/intro'
export default {
  components: {
    NavBar,
    Button,
    Intro
  },
  computed: {
    submitText () {
      switch(this.data.auditStatus){
        case '1': 
          return  '审核中'
          break
        case '2': 
          switch(this.data.openState){
            case '1': 
              return  '进行发布'
              break
            case '2': 
              return '已发布'
              break
            case '3': 
              return  '海选结束'
              break
          }
          break
        case '3': 
          return  '审核失败'
          break
      }
    }
  },
  data () {
    return {
      title: '海选资料',
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
      if(this.data.auditStatus === '1' || this.data.auditStatus === '3' || this.data.openState === '2' || this.data.openState === '3'){
        Toast({
          message: '当前状态为' + this.submitText + ', 不可以操作'
        })
        return false
      }
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
  height: .8rem;
  line-height: .8rem;
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
