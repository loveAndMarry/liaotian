<template>
  <div>
    <NavBar
    left-text="取消"
    right-text="保存"
    @click-left="onClickLeft" @click-right="onClickRight" title="修改昵称"/>
    <CellGroup  style="margin-top: .2rem">
      <Field v-model="value" type="input" placeholder="请输入昵称" />
    </CellGroup>
  </div>
</template>
<script>
import { NavBar, CellGroup, Field, Toast } from "vant"
import { updateUserNiceName} from "@/assets/common/api";
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
    this.value = this.$route.query.nickName
  },
  methods: {
    onClickRight () {
      if(this.value.replace(/ /g,'') === ''){
        Toast({
          message: '请输入昵称',
          duration: 1000
        })
      }
      updateUserNiceName({
        userId: this.$store.state.IM.user.id,
        nickName: this.value
      }).then(res => {
         var toast = this.$toast('修改成功')
         window.setTimeout(() => {
           toast.clear()
           this.$store.state.IM.user.nickName = this.value
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
