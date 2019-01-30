<template>
  <div>
    <NavBar left-arrow @click-left="onClickLeft" title="活动详情"/>
    <div style="height: calc(100% - 46px);overflow-y: scroll;overflow-x: hidden;background-color: #fff;">
      <Intro :data="data"/>
      <div class="Intro_hint">{{this.data.openState === '2'? '已发布': '海选结束'}}</div>
    </div>
  </div>
</template>
<script>
import { NavBar } from 'vant'
import Intro from './components/intro'
import { getMassSelectionDetails } from '@/assets/common/api'
export default {
  components: {
    Intro,
    NavBar
  },
  data () {
    return {
      data: {}
    }
  },
  mounted () {
    console.log(this.$route.query)
    getMassSelectionDetails({
      massSelectionId: this.$route.query.el.id,
      userId: this.$store.state.IM.user.id
    }).then(res => {
      this.data = res.data
    })
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>
<style scoped>
.Intro_hint{
  padding: .2rem;
  line-height: .3rem;
  font-size: .3rem;
  color: #ff7994;
}
</style>
