<template>
  <div class="chat_list" :style="{height: height - 240 + 'px'}" style="overflow-y: scroll;" @touchstart="onTouchstart">
    <template v-if="!isExamine()">
      <div class="link_hint_group">
        <div class="link_hint_content">
          <img src="../../../assets/images/without_permission.png" alt="">
          <p>您不能查看该组消息,<br/>水晶及水晶以上会员才能过滤不符合条件用户信息</p>
          <span @click="updateMember">升级会员</span>
        </div>
      </div>
    </template>
    <template  v-if="isExamine()">
      <PullRefresh :disabled="isDisabled" v-model="isLoading" @refresh="onRefresh" ref="refresh">
        <List
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :style="{minHeight: height - 240 + 'px'}"
          @load="onLoad"
        >
        <div class="chat_list_item" v-for="(el, index) in List" :key="index" @click="chatListClick(el)">
              <SwipeCell :right-width="65" :on-close="onClose" :el="el" :ref='"swipeCell" + index'>
                <div class="chat_list_item_group"  @touchstart='touchstart($event, index)' @touchend="touchend($event, index)">
                  <div class="portrait">
                    <img :src="el.userHead" alt="">
                  </div>
                  <div class="content">
                    <div class="title">
                      <div class="top">
                          <h3  :class="{name_level:(el.levelCode - 0) > 0 }" v-text="el.nickName"></h3>
                          <span v-if="el.theRealNameSystem">实名</span>
                          <img v-if="el.levelCode - 0 > 0" :src="el.ico" alt="">
                      </div>
                      <p v-text="uncodeUtf16(el.context)"></p>
                    </div>
                    <div class="info">
                      <p>{{el.time | fromNow}}</p>
                      <span v-show="el.hint">{{el.hint}}</span>
                    </div>
                  </div>
                </div>
              <span slot="right" class="remove">删除</span>
            </SwipeCell>
          </div>
        </List>
      </PullRefresh>
    </template>
  </div>
</template>

<script>
import { SwipeCell, Dialog, PullRefresh, List} from "vant";
import { mapActions, mapState, mapMutations } from "vuex";
import { deleteMessageRecords } from '@/assets/common/api'
import Vue from "vue";
import utils from "@/assets/common/utils";

export default {
  name: 'CharList',
  props: ['type','examine'],
  data () {
    return {
      isDisabled: false, // 禁用下拉刷新
      isLoading: false, // 下拉刷新是否完成
      loading: false, // 自动拉取是否完成
      finished: false, // 自动拉取是否全部完成
      offsetStart: 0, // 记录滑动的开始距离
      offsetEnd: 0, // 记录滑动的结束距离
      isOne: 0, // 第一次不执行
    }
  },
  beforeMount () {
    this.height = document.body.clientHeight || document.documentElement.clientHeight
  },
  computed: {
    ...mapState({
      List(state) {
        switch(this.type) {
          case '1':
            return state.IM.friendList
            break
          case '2':
            return state.IM.intentionList
            break
          case '3':
            return state.IM.autonymList
            break
        }
      }
    })
  },
  watch : {
    List (val) {
      console.log(val,'最新的好友列表更新了')
    }
  },
  methods: {
    onTouchstart () {
      console.dir(this.$refs.refresh);
      console.log('123')
    },
    updateMember () {
      this.$router.push({name: 'member'})
    },
    isExamine(){
      if(!this.examine){
        return true
      }
      return this.$store.state.common.Jurisdiction.some(el => el === this.examine)
    },
    touchstart ($event,index) {
      this.offsetStart = this.$refs['swipeCell' + index][0].offset
    },
    touchend($event, index) {
      this.offsetEnd = this.$refs['swipeCell' + index][0].offset
      // 鼠标右滑
      if(this.offsetStart < this.offsetEnd &&  (this.offsetEnd - this.offsetStart > -10) || this.offsetEnd === 0){
        this.$refs['swipeCell' + index][0].close()
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    },
    // 下拉刷新
    onRefresh () {
      if( this.isOne === 0){
        window.setTimeout(() => {
          this.isOne = this.isOne + 1
          this.isLoading = false
        }, 300)
        return false
      }
      this.UPDATE_FRIEND_LIST({
        type: this.type
      }).then(() => {
        this.isLoading = false
      })
    },
    onLoad () { 
        this.GETFRIENDLIST({
          type: this.type
        }).then(() => {
          this.loading = false
        }).catch(() => {
          this.loading = false
          this.finished = true
        })
    },
    ...mapActions(["UPDATEUSERLIST", 'GETFRIENDLIST','UPDATE_FRIEND_LIST']),
    ...mapMutations(['FRIEND_SORT']),
    onClose(clickPosition, instance) {
      this.isDisabled = true
      var that = this
      switch (clickPosition) {
        case 'outside':
          instance.close();
          break;
        case 'right':
          Dialog.confirm({
            message: '确定删除吗？'
          }).then(() => {
            deleteMessageRecords({
              userId: this.$store.state.IM.user.id,
              contactUserId: instance.$attrs.el.userId
            }).then(() => {
              instance.close();
              that.$store.state.IM.friendList = that.$store.state.IM.friendList.filter(el => el.userId !== instance.$attrs.el.userId)
            })
            
          });
          break;
      }
    },
    uncodeUtf16 (val) {
      return utils.uncodeUtf16(val)
    },
    infinite(done) {
      this.GETFRIENDLIST(done)
    },
    refresh(done) {
     this.UPDATE_FRIEND_LIST(done)
    },
    chatListClick(item) {
      this.UPDATEUSERLIST(item).then(() => {
        // 获取当前的未读消息
        let obj = this.$store.state.IM.friendList.find(item => item.accountNumber === item.accountNumber)
        this.$store.state.IM.info = this.$store.state.IM.info - Number(obj.hint)

        utils.updateArray(this.$store.state.IM.friendList, item.accountNumber, {
          hint: 0
        });
        this.FRIEND_SORT({
            id: item.accountNumber
        })
        this.$store.state.IM.friend = item
        this.$store.state.IM.isMsg = true // 设置当前有历史消息
        this.$router.push({ path: "/exchange" });
      });
    }
  },
  filters: {
    fromNow(val) {
      var currentTime = Date.parse(new Date());
      var dateTime = val - 0;//后台传递来的时间
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
        return (new Date(dateTime).getHours()) + 1 + ':' + ((new Date(dateTime).getMinutes() + 1 + '').length === 1? '0' + (new Date(dateTime).getMinutes() + 1) : new Date(dateTime).getMinutes() + 1)
      }else if(minutes > 0 && minutes < 60){
        return parseInt(minutes)+"分钟前"
      }else if(seconds > 0 && seconds < 60){
        return "1分钟内"
      }
    }
  },
  components: {
    SwipeCell,
    Dialog,
    PullRefresh,
    List
  }
}
</script>

<style scoped>

.link_hint_group{
  height: 100%;
  position: relative;
}
.link_hint_content{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.link_hint_content img{
      width: 2rem;
    height: 2rem;
    display: block;
    margin: 0 auto;
}
.link_hint_content p{
      text-align: center;
    white-space: nowrap;
    font-size: .26rem;
}
.link_hint_content span{
  display: block;
    width: 2.68rem;
    height: .7rem;
    border: 1px solid #ff5c1a;
    color: #ff5c1a;
    border-radius: .5rem;
    text-align: center;
    line-height: .7rem;
    margin: 0 auto;
    margin-top: .7rem;
    font-size: .23rem;
}
.remove{
  color: #fff;
  font-size: .32rem;
  width: 65px;
  height: 1.63rem;
  line-height: 1.63rem;
  display: inline-block;
  text-align: center;
  background-color: #f44;
}
.chat_list {
  display: block;
  color: #8d8d8d;
  font-size: 0.2rem;
  margin-top: 0;
  text-align: left;
  height: 100%;
  /* position: absolute;
  top: 0;
  left: 0 */
}
.chat_list .chat_list_item {
  display: block;
  box-sizing: border-box;
  -webkit-box-sizing: border-box
}
.chat_list .chat_list_item .chat_list_item_group{
  height: 1.63rem;
  overflow: hidden;
  position: relative;
  padding-left: .3rem
}
.portrait{
  height: 100%;
  float: left;
  width: 1.2rem;
  position: relative;
}
.portrait img{
  width: 1.2rem;
  position: absolute;
  height: 1.2rem;
  border-radius: 50%;
  top: 50%;
  left: 0;
  margin-top: -.6rem;
}

.content{
  width: calc(100% - 1.2rem);
  height: 1.63rem;
  display: inline-block;
  padding: .39rem .3rem;
  box-sizing: border-box;
  box-sizing: -webkit-border-box;
  background-color: #fff;
  border-bottom: .01rem solid #f2f2f2
}
.content .title{
  width: 3.8rem;
  float: left;
}
.content .title .top{
  height: .4rem
}
.content .title .top h3{
  margin: 0;
  font-size: .28rem;
  color: #323232;
  margin-right: .1rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  float: left;
  max-width: 3rem;
}
.content .title .top h3.name_level{
  color: #fe2d61
}
.content .title .top span{
  display: inline-block;
  border-radius: 0.02rem;
  -webkit-border-radius: 0.02rem;
  background-color: #33c1ff;
  color: #fff;
  font-size: 0.18rem;
  text-align: center;
  padding: 0.05rem 0.1rem;
}
.content .title .top img{
  height: 100%;
  display: inline-block;
}
.content .title p{
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: .26rem;
  margin-bottom: .1rem;
  min-height: 0.345rem;
}

.content .info{
  display: inline-block;
  width: calc(100% - 3.8rem);
}
.content .info p{
  margin: 0;
  position: absolute;
  top: .3rem;
  right: 0.3rem;
}
.content .info span {
  display: block;
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  text-align: center;
  line-height: 0.3rem;
  background-color: #ff0037;
  color: #fff;
  float: right;
  margin-top: 0.7rem;
}
</style>