<template>
  <div>
    <NavBar left-arrow @click-left="onClickLeft" title="审核"/>
    <div style="height: calc(100% - 46px);overflow-y: scroll;overflow-x: hidden;background-color: #fff;">
      <CellGroup>
        <Cell title="发起匹配" is-link @click="MatchSearch"></Cell>
        <Cell title="报名列表" is-link to="/Election"></Cell>
      </CellGroup>
    </div>
  </div>
</template>
<script>
import { NavBar , CellGroup , Cell} from 'vant'
import { getMatchingResults } from '@/assets/common/api'
export default {
  components: {
    NavBar,
    CellGroup,
    Cell
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    MatchSearch () {
      getMatchingResults({
        userId: this.$store.state.IM.user.id,
        massSelectionId: localStorage.getItem('massSelectionId')
      }).then(res => {
        if(res.data){
          if(res.data.auditStatus === '1') {
            this.$router.push({name: 'success', query: {el : res.data, context: '审核中&nbsp;&nbsp;&nbsp;<br/>请等待...', title: '正在审核中~'}})
          }
          if(res.data.auditStatus === '2') {
            this.$router.push({name: 'success', query: {el : res.data, context: '恭喜你&nbsp;&nbsp;&nbsp;<br/>配对成功！', title: '你和棉花糖配对成功了~'}})
          }
          if(res.data.auditStatus === '3') {
            this.$router.push({name: 'beDefeated', query: {el : res.data}})
          }
        } else {
          // 没有返回值就是还没有发送过匹配
          this.$router.push({name: 'MatchSearch'})
        }
      })
    }
  }
}
</script>
<style scoped>

</style>
