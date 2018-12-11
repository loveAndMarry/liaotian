<template>
  <div class="group">
    <div style="overflow-y: scroll;position: relative;height: 100%;overflow-x: hidden;">
      <div class="group_back">
        <img :src="user.userHead" alt>
      </div>
      <div class="group_content">
        <div class="top"></div>
      </div>
      <div class="content">
        <NavBar left-arrow @click-left="onClickLeft"/>
        <div class="content_head">
          <div class="head">
            <img :src="user.userHead" alt>
          </div>
        </div>
        <div class="content_name">
          <p> <strong style="font-size:.35rem">{{totalCount}}</strong> 位会员喜欢了您</p>
          <div style="color:#8c8c8c">
            开通会员查看访问您的人
          </div>
        </div>
        <ul class="links">
          <li class="links_group hide" v-for="(el, index) in links" :key="index">
            <img :src="el.userHead" alt="">
            <p>{{el.operationDate | dateTime}}</p>
          </li>
        </ul>
        <router-link class="submit" to="/member">开通会员</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { NavBar, Circle } from "vant";
import SplitGroup from "@/components/SplitGroup";
import { accessRecordUser,likeMeList, likeUserList,likeEachOther } from '@/assets/common/api'
import { mapState } from 'vuex'
import Vue from "vue";

Vue.use(Circle);
export default {
  data() {
    return {
      totalCount: 0,
      currentRate: 1,
      pageSize: 9,
      links: []
    };
  },
  computed: {
    ...mapState({
      user: state => state.IM.user
    }),
    text() {
      return this.currentRate.toFixed(0) + "%";
    },
    fromData () {
      return {
        currentRate: this.currentRate,
        pageSize: this.pageSize,
        userId: this.user.id
      }
    },
  },
  mounted () {
    if(this.$route.query.type === 1){
      this.accessRecordUser()
    } else if(this.$route.query.type === 2){
      this.likeMeList()
    } else if(this.$route.query.type === 3){
      this.likeUserList()
    } else {
      this.likeEachOther()
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    // 获取谁看过我的列表
    accessRecordUser () {
      accessRecordUser(this.fromData).then((res) => {
        this.totalCount = res.data.totalCount
        if(res.data.count !== 0){
          this.links.push(...res.data.list)
        }
      })
    },
    // 获取谁喜欢我
    likeMeList () {
      likeMeList(this.fromData).then((res) => {
        this.totalCount = res.data.totalCount
        if(res.data.count !== 0){
          this.links.push(...res.data.list)
        }
      })
    },
    // 我喜欢谁
    likeUserList () {
      likeUserList(this.fromData).then((res) => {
        this.totalCount = res.data.totalCount
        if(res.data.count !== 0){
          this.links.push(...res.data.list)
        }
      })
    },
    // 相互喜欢
    likeEachOther () {
      likeEachOther(this.fromData).then((res) => {
        this.totalCount = res.data.totalCount
        if(res.data.count !== 0){
          this.links.push(...res.data.list)
        }
      })
    }
  },
  components: {
    NavBar,
    SplitGroup
  }
};
</script>
<style scoped>
.submit{
  display: block;
  margin: 0 auto;
  width: 5.2rem;
  height: .8rem;
  background-color: #ff7994;
  border-radius: .5rem;
  text-align: center;
  line-height: .8rem;
  font-size: .31rem;
  color:#fff;
  margin-bottom: .6rem;
}
.links{
  padding: .6rem .3rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  display: flex;
  display: -webkit-flex;
  justify-content: space-evenly;
  -webkit-justify-content: space-evenly;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap
}
.links li{
  display: inline-block;
  position: relative;
}
.links li.hide::after{
  content: '';
  display: block;
  position: absolute;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  background-image: url('../../assets/images/lock@2x.png');
  background-repeat: no-repeat;
  background-size: 20%;
  background-position: 50%
}
.links li img{
  display: block;
  width: 2rem;
  height: 2rem;
  border-radius: 50%
}
.links li p{
  display: block;
  white-space: nowrap;
  color: #707070
}
.van-nav-bar{
  background-color: transparent
}
.van-hairline--bottom::after{
  border-bottom-width: 0
}
.content_name p {
  display: inline-block;
  margin: 0.2rem 0;
  color: #f8718f
}
.content_name h2 span {
  width: 0.54rem;
  height: 0.3rem;
  display: inline-block;
  border-radius: 0.02rem;
  background-color: #33c1ff;
  color: #fff;
  font-size: 0.18rem;
  margin-left: 0.1rem;
  text-align: center;
}
.content_name div span {
  font-size: 0.23rem;
  color: #8d8d8d;
  margin-right: 0.18rem;
}
.content_head {
  margin-top: 0.6rem;
  display: flex;
  display: -webkit-flex;
  align-items: flex-end;
  -webkit-align-items: flex-end;
  justify-content: space-evenly;
  -webkit-justify-content: space-evenly;
}
.content_head .head {
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid #fff;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}
.content_head .head img {
  max-width: 100%;
  max-height: 100%;
}
.content_head .head span {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.5rem;
  font-size: 0.22rem;
  color: #fefefe;
  line-height: 0.5rem;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
}
.group {
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 0;
}
.group_back {
  position: absolute;
  top: 0;
  width: 100%;
  -webkit-filter: opacity(30);
  filter: opacity(30%);
}
.group_back img {
  width: 100%;
}
.group_content {
  position: absolute;
  width: 100%;
  background-color: #fff;
  top: 3rem;
  min-height: calc( 100% - .5rem);
}
.group_content .top {
  display: block;
  width: 120%;
  height: 4.2rem;
  left: -10%;
  top: -50px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
}
.content {
  width: 100%;
  background-color: transparent;
  position: relative;
}
</style>
