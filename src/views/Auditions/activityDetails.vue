<template>
  <div>
    <NavBar left-arrow @click-left="onClickLeft" title="活动详情"/>
    <div style="height: calc(100% - 46px);overflow-y: scroll;overflow-x: hidden;background-color: #fff;">
      <Intro :data="data"/>
    </div>
  </div>
</template>
<script>
import Intro from './components/intro'
import { getMassSelectionDetails } from '@/assets/common/api'
export default {
  components: {
    Intro
  },
  mounted () {
    getMassSelectionDetails({
      massSelectionId: this.$route.query.el,
      userId: this.$store.state.IM.user.id
    }).then(res => {
      this.data = res.data
    })
  }
}
</script>
