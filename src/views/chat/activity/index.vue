<template>
<div class="content_title">
  <Tabs v-model="active" swipeable @click="tabClick">
    <Tab v-for="(el, index) in lists"  :key="index">
      <div slot="title">
        {{el.name}}
      </div>
      {{el.name}}
    </Tab>
  </Tabs>
</div>

</template>

<script>
import { Tabs, Tab } from "vant";

export default {
  data() {
    return {
      msg: "联系人",
      active:0,
      lists: [
        {
          name: "查看附近人",
          index: 1
        },
        {
          name: "手机通讯录",
          index: 2
        },
        {
          name: "推荐人",
          index: 3
        }
      ]
    };
  },
  methods: {
    tabClick(index) {
      console.log(index);
      this.$toast(index);
    }
  },
  components: {
    Tabs,
    Tab
  }
};
</script>

<style scoped>
.content_title {
  text-align: left;
  overflow-y: scroll;
  padding-bottom: 50px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  position: absolute;
  width: 100%;
  top: 1.35rem;
  left: 0;
}
</style>
