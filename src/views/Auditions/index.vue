<template>
  <div class="Auditions" ref="Auditions">
    <NavBar title="海选" @click-right="onClickRight">
      <i class="add" slot="right" />
    </NavBar>
    <div class="scroll_group">
      <Tabs v-model="active" animated sticky @click="onClick" color="#ff5e80">
        <Tab title="全部海选">
          <AuditionsList type="1"></AuditionsList>
        </Tab>
        <Tab title="我发起的">
          <AuditionsList type="2"></AuditionsList>
        </Tab>
        <Tab title="我参加的">
          <AuditionsList type="3"></AuditionsList>
        </Tab>
      </Tabs>
    </div>
  </div>
</template>

<script>
import { NavBar, Tabs, Tab, Toast} from 'vant'
import AuditionsList from './components/AuditionsList'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      active: 0
    }
  },
  methods : {
    ...mapMutations([
      'setAuditionsActive'
    ]),
    onClick () {
      this.$refs.Auditions.scrollTo(0,0)
    },
    onClickRight () {
      if(this.$store.state.IM.user.registerState - 0 >= 3){
        this.$router.push({name: 'initiate'})
      }  else {
        Toast({
          message: '请先完成实名注册'
        })
      }
    }
  },
  mounted () {
    this.active = this.$store.state.common.AuditionsActive
  },
  watch: {
    active (val) {
      this.setAuditionsActive({AuditionsActive:val})
    }
  },
  components:{
    Tabs,
    Tab,
    NavBar,
    AuditionsList,
    Toast
  }
}
</script>
<style scoped>
.Auditions{
  height: calc(100% - 50px);
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 1000;
}
.van-pull-refresh{
  overflow: inherit
}
.add{
  display: block;
  background-image: url('../../assets/images/initiate.png');
  background-repeat: no-repeat;
  background-size: 100%;
  width: .4rem;
  height: .4rem;
  transform: translate(0, -50%);
}
</style>
