<template>
  <div>
    <NavBar left-arrow @click-left="onClickLeft" title="审核"/>
    <div style="height: calc(100% - 46px);overflow-y: scroll;overflow-x: hidden;background-color: #fff;">
      <CellGroup>
        <Cell title="发起匹配" is-link to="/Match"></Cell>
        <Cell title="报名列表" is-link to="/Election"></Cell>
      </CellGroup>
    </div>
  </div>
</template>
<script>
import { NavBar , CellGroup , Cell} from 'vant'
export default {
  components: {
    NavBar,
    CellGroup,
    Cell
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>
<style scoped>

</style>
