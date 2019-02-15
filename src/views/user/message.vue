<template>
  <div>
    <NavBar left-arrow @click-left="onClickLeft" title="消息通知"/>
    <div class="message">
      <PullRefresh v-model="isLoading" @refresh="onRefresh">
         <List
          v-model="loading"
          :finished="finished"
          finished-text='没有更多了'
          :style="{minHeight: height - 46 + 'px'}"
          @load="onLoad"
        >
          <div class="msg_group" v-for="(el, index) in MsgList" :key="index">
            <div class="msg_time">{{el.createDate}}</div>
            <!-- applyToJoinMassSelectionId  申请id  只有群主接受申请人的请求时才会有 -->
            <div class="msg_content" @click="$router.push({path: el.linkAddressRouting, query: { massSelectionId: el.extId, sendUserId: el.sendUserId, acceptUserId: el.acceptUserId, messageType: el.messageType}})">
              <div class="title">{{el.title}}</div>
              <div class="context">{{el.content}}</div>
            </div>
          </div>
        </List>
      </PullRefresh>
    </div>
  </div>
</template>

<script>
import { NavBar, PullRefresh, List} from 'vant'
import { listMessageNotification } from '@/assets/common/api'
export default {
  components: {
    NavBar,
    PullRefresh,
    List
  },
  data () {
    return {
      isLoading: false, // 下拉刷新是否完成
      loading: false, // 列表是否加载完成
      finished: false, // 列表数据是否全部加载完成
      MsgList: [],
      pageCurrent: 1,
      pageSize: 10
    }
  },
  computed: {
    height () {
      return window.document.body.clientHeight || window.document.documentElement.clientHeight
    }
  },
  methods: {
    onLoad () {
      this.updateData({
        pageCurrent: this.pageCurrent,
        pageSize: this.pageSize
      }).then(res => {
        this.loading = false
        this.MsgList.push(...res)
        console.log(this.MsgList,'获取到内容了')
        if(res.length < 10) {
          this.finished = true
        }

        ++this.pageCurrent
      }).catch(res => {
        this.loading = false
        this.finished = true
      })
    },
    onRefresh () {
      this.updateData({
        pageCurrent: 0,
        pageSize: this.pageCurrent * this.pageSize
      }).then(res => {
        console.log(this.MsgList,'刷新到内容了')
        this.MsgList = res
        this.isLoading = false
      }).catch(res => {
        this.MsgList = []
        this.isLoading = false
      })
    },
    onClickLeft () {
      this.$router.back()
    },
    // 请求通知列表数据
    updateData (obj) {
      return new Promise((resolve, reject) => {
         listMessageNotification(Object.assign({
          userId: this.$store.state.IM.user.id,
        }, obj)).then(res => {
          if(res.data.list && res.data.list.length > 0) {
            resolve(res.data.list)
          } else {
            reject()
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.message {
  height: calc(100% - 46px);
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #f0f0f0;
  padding: 0 .3rem;
  box-sizing: border-box;
  box-sizing: -webkit-border-box;
}
.msg_time{
  height: .68rem;
  font-size: .16rem;
  line-height: .68rem;
  background-color: #f0f0f0;
  text-align: center;
  color: #8d8d8d
}
.msg_content{
  border-radius: .1rem;
  font-size: .23rem;
  text-align: left;
  background-color: #fff;
  padding-bottom: .26rem;
  letter-spacing: 1px;
}
.msg_content .title{
  line-height: .7rem;
  border-bottom: 1px solid #f0f0f0;
  color: #323232;
  padding:0 .2rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.msg_content .context{
  padding: 0.26rem .2rem 0;
  line-height: .29rem;
  color: #8e8e8e;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
