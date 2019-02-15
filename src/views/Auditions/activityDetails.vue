<template>
  <div>
    <NavBar left-arrow @click-left="onClickLeft" title="活动详情">
      <i class="record" slot="right" @click="recordClick"/>
    </NavBar>
    <div style="height: calc(100% - 46px);overflow-y: scroll;overflow-x: hidden;background-color: #fff;">
      <Intro :data="data"/>
      <div class="Intro_hint">{{hint}}</div>
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
  computed: {
    hint () {
      switch(this.data.massSelectionState){
        case '3':
          return '配对审核中';
          break;
        case '4':
          return '配对成功';
          break;
        case '5':
          return '配对失败';
          break
      }
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
    onClickLeft () {
      this.$router.back()
    },
    recordClick () {
      this.$router.push({name: 'record', query: {id: this.data.id}})
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
.record{
  display: block;
  background-image: url('../../assets/images/record.png');
  background-repeat: no-repeat;
  background-size: contain;
  width: .4rem;
  height: .4rem;
  transform: translate(0, -50%);
}
</style>
