<template>
  <div>
    <NavBar left-arrow @click-left="onClickLeft" title="资料"/>
    <div class="datum_content">
      <img :src="data.userHead" alt="" class="userHead">
      <div>
        <span style="margin-right: .25rem;color: #8d8d8d">{{data.nickName}}</span>
        <Tag style="background-color: #ff7997">{{data.levelName}}</Tag>
      </div>
      <div class="file_group">
        <img  v-for="(item, index) in file" :src="item" :key="index" @click="fileClick(index)">
      </div>
      
      <p class="context">{{data.auditIntroduction}}</p>
      <div v-show="isDisabled">
        <span class="button default" @click="submit('2')">拒绝</span>
        <span class="button confirm" @click="submit('1')">同意</span>
      </div>
    </div>
  </div>
</template>
<script>
import { NavBar, Tag ,Button, Toast , ImagePreview} from 'vant'
import { candidacyAudit, getApplyToJoinMassSelection } from '@/assets/common/api'
export default {
  components: {
    NavBar,
    Tag,
    Button
  },
  data () {
    return {
      data: {},
      file: [],
      isDisabled: false, // 是否已经申请通过了
    }
  },
  mounted () {
    getApplyToJoinMassSelection({
      applyToJoinMassSelectionId: this.$route.query.applyToJoinMassSelectionId,
      userId: this.$store.state.IM.user.id
    }).then(res => {
      this.data = res.data
      this.file = res.data.file.split(',')
      if(res.data.auditIsAgree === '2' || res.data.auditIsAgree === '3') {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    })
  },
  methods: {
    fileClick (index) {
      window.instance = ImagePreview({
        images: this.file,
        startPosition: index
      })
    },
    onClickLeft () {
      this.$router.back()
    },
    submit (type) {
      candidacyAudit({
        userId: this.$store.state.IM.user.id,
        massSelectionId: localStorage.getItem('massSelectionId'),
        auditJoinMassSelectionId: this.data.id,
        auditStatus: type
      }).then(res => {
        Toast({
          message: '操作成功',
          duration: 1000
        }),
        window.setTimeout(() => {
          this.$router.back()
        }, 1000)
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
