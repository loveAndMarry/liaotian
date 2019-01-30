<template>
  <div class='back ToReceiveTheMember'>
    <Button size="large" type="danger" round @click="getMember">点击领取</Button>
  </div>
</template>
<script>
import { Button, Toast} from 'vant'
import { participationActivities } from '@/assets/common/api'
import { mapActions } from 'vuex'
export default {
  props: ['data'],
  components: {
    Button
  },
  methods: {
    ...mapActions(['getJurisdiction']),
    getMember () {
      participationActivities({
        userId: this.$store.state.IM.user.id,
        activityId: this.data.extId
      }).then((res) => {
        this.$store.state.IM.user.levelCode = res.data.levelCode
        this.$store.state.IM.user.levelName = res.data.levelName
        this.$store.state.IM.user.ico = res.data.ico

        this.getJurisdiction(this.$store.state.IM.user.id)

        Toast({
          message: '会员领取成功',
          duration: 1000
        })
        window.setTimeout(() => {
          this.$emit('close')
        })
      })
    }
  }
}
</script>
<style scoped>
.back{
  background-image: url('../../assets/images/会员活动页.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
  height: 100%;
}
</style>
