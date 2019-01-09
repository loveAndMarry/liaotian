<template>
  <div class="group">
    <div style="overflow-y: scroll;position: relative;height: 100%;overflow-x: hidden;-webkit-overflow-scrolling: touch;">
      <div class="group_back">
        <img :src="user.userHead" alt>
      </div>
      <div class="group_content">
        <div class="top"></div>
      </div>
      <div class="content link">
        <NavBar left-arrow @click-left="onClickLeft"/>
        <div class="content_head">
          <div class="head">
            <img :src="user.userHead" alt>
          </div>
        </div>
        <div class="content_name">
          <p> <strong style="font-size:.35rem">{{totalCount}}</strong> 位{{title}}</p>
          <!-- <div style="color:#8c8c8c">
            开通会员查看{{title}}
          </div> -->
        </div>
          <List
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            class="links"
          >
            <div class="links_group" v-for="(el, index) in links" :key="index" @click="linkClick(el)" :class="{hide: !isLock}"> 
              <img :src="el.userHead" alt="">
              <p>{{el.operationDate | dateTime}}</p>
            </div>
          </List>
        </div>
        <!-- <router-link class="submit" to="/member">开通会员</router-link> -->
    </div>
  </div>
</template>
<script>
import { NavBar, Circle, List } from "vant";
import SplitGroup from "@/components/SplitGroup";
import { personalCenterAccessRecordUser,likeMeList, likeUserList,likeEachOther } from '@/assets/common/api'
import { mapState } from 'vuex'
import Vue from "vue";

Vue.use(Circle);
export default {
  data() {
    return {
      examine: '',
      loading: false,
      finished: false,
      currentRate: 0,
      totalCount: 0,
      pageSize: 9,
      links: [],
      title: ''
    };
  },
  computed: {
    ...mapState({
      user: state => state.IM.user
    }),
    fromData () {
      return {
        currentRate: this.currentRate,
        pageSize: this.pageSize,
        userId: this.user.id
      }
    },
    isLock () {
      if(!this.examine){
        return true
      }
      return this.$store.state.common.Jurisdiction.some(el => el === this.examine)
    }
  },
  mounted () {
   this.examine = this.$route.query.examine
  },
  methods: {
    updateData () {
      if(this.$route.query.type - 0 === 1){
        this.title = '看过您的人'
        this.personalCenterAccessRecordUser()
      } else if(this.$route.query.type - 0 === 2){
        this.title = '喜欢过您的人'
        this.likeMeList()
      } else if(this.$route.query.type - 0 === 3){
        this.title = '您喜欢的人'
        this.likeUserList()
      } else {
        this.title = '相互喜欢的人'
        this.likeEachOther()
      }
    },
    callback (res) {
      this.totalCount = res.data.totalCount
      if(res.data.count !== 0){
        if(res.data.count < this.pageSize){
          this.finished = true
        } else {
          ++this.currentRate
        }
        this.links.push(...res.data.list)
      } else {
        this.finished = true
      }
      this.loading = false

      if(!this.isLock){
        this.finished = true
      }
    },
    onLoad() {
      this.updateData()
    },
    linkClick (item) {
      if(!this.isLock){
        this.$router.push({name: 'member'})
        return false
      }

      this.$store.state.IM.friend = item
      this.$router.push({name: 'userDetail'})
    },
    onClickLeft() {
      this.$router.back()
    },
    // 获取谁看过我的列表
    personalCenterAccessRecordUser () {
      personalCenterAccessRecordUser(this.fromData).then(this.callback)
    },
    // 获取谁喜欢我
    likeMeList () {
      likeMeList(this.fromData).then(this.callback)
    },
    // 我喜欢谁
    likeUserList () {
      likeUserList(this.fromData).then(this.callback)
    },
    // 相互喜欢
    likeEachOther () {
      likeEachOther(this.fromData).then(this.callback)
    }
  },
  components: {
    NavBar,
    SplitGroup,
    List
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
  -webkit-border-radius: .5rem;
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
  display: box;
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  justify-content: space-evenly;
  -webkit-justify-content: space-evenly;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap
}
.links .links_group{
  display: block;
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex: 1;          /* Chrome */
  -ms-flex: 1;              /* IE 10 */
  flex: 1;   
}
.links .links_group.hide::after{
  content: '';
  display: block;
  position: absolute;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  background-image: url('../../assets/images/lock@2x.png');
  background-repeat: no-repeat;
  background-size: 20%;
  background-position: 50%
}
.links .links_group.hide:last-child(9)::after{
  background-image: url('../../assets/images/more.png');
}
.links .links_group img{
  display: block;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  margin: 0 auto
}
.links .links_group p{
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
  -webkit-border-radius: .02rem;
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
  position: relative;
  height: 2.25rem;
}
.content_head .head {
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid #fff;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  position: absolute;
  overflow: hidden;
  left: 50%;
  top: 0;
  margin-left: -1.125rem;
}
.content_head .head img {
  max-width: 100%;
  max-height: 100%;
      height: 100%;
    width: 100%;
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
  min-height: calc( 100% - 3rem);
}
.group_content .top {
  display: block;
  width: 120%;
  height: 4.2rem;
  left: -10%;
  top: -50px;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  background: #fff;
  position: absolute;
}
.content {
  width: 100%;
  background-color: transparent;
  position: relative;
}
</style>
