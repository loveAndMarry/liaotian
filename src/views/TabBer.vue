<template>
    <div>
        <Tabbar v-model="active">
        <TabbarItem to='/view/home'>
          <span>首页</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="active === 0 ? homeicon.active : homeicon.normal"
          >
        </TabbarItem>
        <TabbarItem to='/view/chat'>
          <span>消息</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="active === 1 ? msgicon.active : msgicon.normal"
          >
        </TabbarItem>
        <TabbarItem to='/view/Auditions'>
          <span>海选</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="active === 2 ? choiceicon.active : choiceicon.normal"
          >
        </TabbarItem>
        <TabbarItem to='/view/user'>
          <span>个人中心</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="active === 3 ? usericon.active : usericon.normal"
          >
        </TabbarItem>
      </Tabbar>
    </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant'
import { mapState , mapMutations} from 'vuex'

export default {
  name: 'tabbar',
  data () {
    return {
      active: 0,
      homeicon: {
        active: require('../assets/images/home_active@2x.png'),
        normal: require('../assets/images/home@2x.png')
      },
      msgicon: {
        active: require('../assets/images/message_active@2x.png'),
        normal: require('../assets/images/message_btn@2x.png')
      },
      choiceicon: {
        active: require('../assets/images/choice_active.png'),
        normal: require('../assets/images/choice.png')
      },
      usericon: {
        active: require('../assets/images/user_active@2x.png'),
        normal: require('../assets/images/user_btn@2x.png')
      }
    }
  },
  mounted () {
    this.active = this.$store.state.common.active
  },
  methods: {
    ...mapMutations([
      'setActive'
    ])
  },
  components: {
    Tabbar,
    TabbarItem
  },
  watch: {
    active (val) {
      this.setActive({active:val})
    }
  }
}
</script>
<style scoped>
.van-tabbar-item--active{
  color: #fe5c8d
}
</style>

