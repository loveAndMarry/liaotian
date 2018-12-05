<template>
  <div>
    <NavBar
    left-text="取消"
    right-text="保存"
    @click-left="onClickLeft" @click-right="onClickRight" title="修改自我介绍"/>
    <CellGroup  style="margin-top: .2rem">
      <Field v-model="value" type="textarea" placeholder="请输入自我介绍" />
    </CellGroup>
  </div>
</template>
<script>
import { NavBar, CellGroup, Field } from "vant"
import { updateUserPersonalIntroduction } from "@/assets/common/api";
export default {
  data () {
    return {
      value: ''
    }
  },
  components: {
    NavBar,
    CellGroup,
    Field
  },
  mounted () {
    this.value = this.$route.query.personalIntroduction
  },
  methods: {
    onClickRight () {
      updateUserPersonalIntroduction({
        userId: this.$store.state.IM.user.id,
        personalIntroduction: this.value
      }).then(res => {
         var toast = this.$toast('修改成功')
         window.setTimeout(() => {
           toast.clear()
           this.$router.push({name: 'userDetails'})
         }, 1000)
      })
    },
   onClickLeft () {
      this.$router.push({name: 'userDetails'})
    }
  }
}
</script>
