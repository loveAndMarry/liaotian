<template>
  <div style="height:100%">
    <NavBar title='消息'></NavBar>
    <div style="height:calc(100% - .2rem);position: relative">
      <scroller :on-infinite="infinite"  :on-refresh="refresh" ref="scroller">
        <ul class="chat_list">
          <li class="chat_list_item" v-for="(el, index) in friendList" :key="index" @click="chatListClick(el)">
            <div class="portrait">
              <img :src="el.userHead" alt="">
            </div>
            <div class="content">
              <div class="title">
                <div class="top">
                    <h3 v-text="el.userName"></h3>
                    <span class="theRealNameSystem" v-if="el.theRealNameSystem">实名</span>
                </div>
                <p v-text="el.content"></p>
              </div>
              <div class="info">
                <p>{{el.time | fromNow}}</p>
                <span v-show="el.hint">{{el.hint}}</span>
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
import { mapActions, mapState } from "vuex";
import Vue from "vue";
import Moment from "moment";
import utils from "@/assets/common/utils";
import "moment/locale/zh-cn";

export default {
  computed: {
    ...mapState({
      friendList: state => state.IM.friendList
    })
  },
  mounted() {
    // 获取好友列表
    this.GETFRIEND({});
  },
  watch: {
    friendList (val) {
      console.log('friendList已经改变', val)
    }
  },
  methods: {
    ...mapActions(["UPDATEUSERLIST", "GETFRIEND"]),
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
      this.UPDATEUSERLIST(item).then(() => {
        console.log(this.$store, "当前个人信息已经获取");
        utils.updateArray(this.$store.state.IM.friendList, item.accountNumber, {
          hint: 0
        });
        this.$router.push({ path: "/exchange" });
      });
    }
  },
  filters: {
    fromNow(val) {
      var currentTime = Date.parse(new Date());
      var dateTime = val;//后台传递来的时间
      var d_day = Date.parse(new Date(dateTime));
      var day = Math.abs(parseInt((d_day - currentTime)/1000/3600/24));//计算日期
      var hour = Math.abs(parseInt((d_day - currentTime)/1000/3600));//计算小时
      var minutes = Math.abs(parseInt((d_day - currentTime)/1000/60));//计算分钟
      var seconds = Math.abs(parseInt((d_day - currentTime)/1000));//计算秒
      if(day >= 2){
        return parseInt(day)+"天前"
      }else if(day > 0 && day < 2){
        return "昨天"
      }else if(hour > 0 && hour < 24){
        return (new Date(dateTime).getHours()) + 1 + ':' + (new Date(dateTime).getMinutes() + 1)
      }else if(minutes > 0 && minutes < 60){
        return parseInt(minutes)+"分钟前"
      }else if(seconds > 0 && seconds < 60){
        return parseInt(seconds)+"秒前"
      }
    }
  },
  components: {
    NavBar
  }
}
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
  position: relative;
}
.content .title {
  display: inline-block;
  width: calc(100% - 1rem);
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
  width: 1rem;
  overflow: hidden;
}
.content .info p {
  margin: 0;
  position: absolute;
  top: 0;
  right: 0.1rem;
  transform: scale(0.8);
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
