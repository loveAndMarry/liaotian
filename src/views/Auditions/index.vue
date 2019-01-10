<template>
  <div class="Auditions">
    <NavBar title="海选"/>
    <div class="scroll_group">
      <Tabs v-model="active" animated sticky @click="onClick" color="#ef7398">
        <Tab title="全部海选">
          <List 
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          class="dynamic" ref='dynamic'>
            <AuditionsItem v-for="el in 10" :key="el"></AuditionsItem>
          </List>
        </Tab>
        <Tab title="我发起的"></Tab>
        <Tab title="我参加的"></Tab>
      </Tabs>
    </div>
  </div>
</template>

<script>
import { NavBar, Tabs, Tab , List} from 'vant'
import AuditionsItem from './components/AuditionsItem'
export default {
  data () {
    return {
      active: 0,
      loading: false, // 全部海选是否加载完成
      finished: false, // 全部海选是否全部加载完成
    }
  },
  methods : {
    onClick () {

    },
    onLoad () {

    }
  },
  components:{
    Tabs,
    Tab,
    NavBar,
    AuditionsItem,
    List
  }
}
</script>
<style scoped>
.Auditions{
  height: calc(100% - 50px);
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
