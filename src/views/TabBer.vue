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
          <!-- <TabbarItem>
            <span>海选</span>
            <img
              slot="icon"
              slot-scope="props"
              :src="active === 2 ? choiceicon.active : choiceicon.normal"
            >
          </TabbarItem> -->
          <TabbarItem to='/view/user'>
            <span>个人中心</span>
            <img
              slot="icon"
              slot-scope="props"
              :src="active === 2 ? usericon.active : usericon.normal"
            >
          </TabbarItem>
        </Tabbar>
    </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant'

export default {
  name: 'tabbar',
  data () {
    return {
      active: 0,
      homeicon: {
        active: '../../static/images/home_active@2x.png',
        normal: '../../static/images/home@2x.png'
      },
      msgicon: {
        active: '../../static/images/message_active@2x.png',
        normal: '../../static/images/message_btn@2x.png'
      },
      choiceicon: {
        active: '../../static/images/choice_active@2x.png',
        normal: '../../static/images/choice_btn@2x.png'
      },
      usericon: {
        active: '../../static/images/user_active@2x.png',
        normal: '../../static/images/user_btn@2x.png'
      }
    }
  },
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>
<style scoped>
.van-tabbar-item--active{
  color: #fe5c8d
}
</style>

