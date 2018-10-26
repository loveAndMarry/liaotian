<template>
    <div>
        <Tabbar v-model="active">
            <TabbarItem icon="shop" to='/home'>标签</TabbarItem>
            <TabbarItem icon="chat" to='/home/chat' dot>聊天</TabbarItem>
            <TabbarItem icon="records" info="5">标签</TabbarItem>
            <TabbarItem icon="gold-coin" info="20">标签</TabbarItem>
        </Tabbar>
    </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant'

export default {
  name: 'tabbar',
  data () {
    return {
      active: 0
    }
  },
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>
