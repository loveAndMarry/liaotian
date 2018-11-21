<template>
  <div style="height:100%">
    <NavBar title='消息'></NavBar>
    <div style="height:calc(100% - .2rem);position: relative">
      <scroller :on-infinite="infinite"  :on-refresh="refresh" ref="scroller">
        <ul class="chat_list">
          <li class="chat_list_item" v-for="(el, index) in 10" :key="index" @click="chatListClick(item)">
            <div class="portrait">
              <img :src="item.portrait" alt="">
            </div>
            <div class="content">
              <div class="title">
                <div class="top">
                    <h3 v-text="item.userName"></h3>
                    <span class="theRealNameSystem">实名</span>
                </div>
                <p>你好，很高兴认识你，可以聊一聊吗？</p>
              </div>
              <div class="info">
                <p>08:35</p>
                <span>6</span>
              </div>
            </div>
          </li>
        </ul>
      </scroller>
    </div>
  </div>
</template>

<script>
import { NavBar } from "vant";
export default {
  data() {
    return {
      item: {
        id: 1,
        userName: "测试",
        theRealNameSystem: true,
        age: "25",
        height: "165",
        education: "本科",
        income: "5000-10000",
        tag: ["身材苗条", "旅游", "投资理财"],
        manifesto: "爱情就应该是一辈子",
        portrait:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542709648746&di=05469704ed6e2a01394165a458e93773&imgtype=0&src=http%3A%2F%2Fimg.52z.com%2Fupload%2Fnews%2Fimage%2F20180416%2F20180416051754_47848.jpg",
        praise: 8
      }
    };
  },
  methods: {
    infinite() {
      window.setTimeout(() => {
        this.$refs.scroller.finishInfinite(true);
      }, 3000);
      console.log(arguments, "infinite");
      return false;
    },
    refresh() {
      window.setTimeout(() => {
        this.$refs.scroller.finishPullToRefresh();
      }, 3000);
      console.log(arguments, "refresh");
      return false;
    },
    chatListClick(item) {
      this.$router.push({ path: "/exchange" }, { query: item });
    }
  },
  components: {
    NavBar
  }
};
</script>

<style scoped>
.chat_list {
  display: block;
  color: #8d8d8d;
  font-size: 0.19rem;
  margin-top: 0;
  text-align: left;
}
.chat_list .chat_list_item {
  display: block;
  overflow: hidden;
  padding-top: 0.2rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.chat_list .chat_list_item .portrait {
  display: inline-block;
  float: left;
  margin-left: 0.3rem;
}
.chat_list .chat_list_item .portrait img {
  display: block;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
}
.content {
  display: inline-block;
  width: calc(100% - 1.5rem);
  padding: 0.15rem 0.3rem;
  overflow: hidden;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border-bottom: 1px solid #d8d8d8;
  background-color: #fff;
}
.content .title {
  display: inline-block;
  width: calc(100% - 0.8rem);
  float: left;
}
.content .title .top {
  display: block;
}
.content .title .top h3 {
  display: inline-block;
  margin: 0;
  font-weight: 600;
  font-size: 0.28rem;
  color: #323232;
}
.content .title .top .theRealNameSystem {
  display: inline-block;
  border-radius: 0.02rem;
  background-color: #33c1ff;
  color: #fff;
  font-size: 0.18rem;
  margin-left: 0.1rem;
  text-align: center;
  padding: 0.05rem 0.1rem;
}
.content .title .top p {
  margin-top: 0.32rem;
  font-size: 0.23rem;
}
.content .title p {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.content .info {
  float: right;
  text-align: right;
}
.content .info p {
  margin: 0;
}
.content .info span {
  display: block;
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  text-align: center;
  line-height: 0.3rem;
  background-color: #ff0037;
  color: #fff;
  float: right;
  margin-top: 0.3rem;
}
</style>
