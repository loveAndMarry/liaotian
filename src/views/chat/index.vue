<template>
  <div style="height:100%;background-color: #fff;">
    <NavBar title='消息'></NavBar>
    <div class="scroll_group">
      <Banner page='1'></Banner>
      <div style="height:calc(100% - 96px);position: relative" class="chat">
        <Tabs v-model="active" animated sticky :offset-top="46" @click="onClick">
          <Tab title='全部'>
            <CharList type="1" ref="charList0"></CharList>
          </Tab>
          <Tab title='择偶'>
            <CharList type="2" ref="charList1" examine="intention_message_filtering"></CharList>
          </Tab>
          <Tab title='实名'>
            <CharList type="3" ref="charList2" examine="realname_message_filtering"></CharList>
          </Tab>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Tabs, Tab} from "vant";
import Banner from '@/components/Banner'
import CharList from './component/CharList'
import utils from "@/assets/common/utils";

export default {
  data () {
    return {
      active: 0
    }
  },
  methods : {
    onClick (index,title) {
      this.$nextTick(() => {
        this.$refs['charList' + index].onRefresh()
      })
    }
  },
  components: {
    NavBar,
    Banner,
    CharList,
    Tabs,
    Tab
  }
}
</script>
<style scoped>
.scroll_group{
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100% - 96px);
}
</style>
