<template>
  <div class="hello">
    <Title :number='num' @input='onInput'></Title>
    <div class="content">
      <List v-show="(num == 0)"></List>
      <Activity v-show="(num == 1)"></Activity>
    </div>
  </div>
</template>

<script>
import { Button, Cell } from "vant";
import Title from "./components/title";
import List from "./list";
import Activity from "./activity";

export default {
  name: "chat",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      num: 0
    };
  },
  methods: {
    onInput(num) {
      this.num = num;
    }
  },
  components: {
    Button,
    Cell,
    Title,
    List,
    Activity
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  height: 100%;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.content {
  width: 100%;
  position: relative;
  height: 100%;
}
</style>
