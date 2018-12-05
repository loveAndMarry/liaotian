<template>
<div style="background-color: #fff;">
  <NavBar left-arrow @click-left="onClickLeft" title="最近访问"/>
  <PullRefresh v-model="isLoading" @refresh="onRefresh">
    <List 
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    class="recent">
      <template v-show="Object.keys(data).length !== 0" v-for="(value, key) in data">
        <li class="time">{{key}}</li>
        <li v-for="(item, index) in value">
          <img :src="item.userHead" alt="">
          <div>
            <span>{{item.nickName}}</span>
            <span>{{item.visitDateDay}} 访问了你的空间</span>
          </div>
          <i @click="removeEvent(item)"></i>
        </li>
      </template>
      <template v-show="Object.keys(data).length === 0"><p>当前还没有访问记录</p></template>
    </List>
  </PullRefresh>
  <Actionsheet
  v-model="show"
  :actions="actions"
  cancel-text="取消"
  @select="onSelect"
  @cancel="show = false"
  ></Actionsheet>
</div>
</template>

<script>
import { NavBar, Actionsheet, Toast, List, PullRefresh} from "vant"
import { accessRecordUser, deleteAccessRecord } from "@/assets/common/api";
export default {
  data() {
    return {
      show: false,
      item: {},
      actions: [
        {
          name: '删除访问记录'
        }
      ],
      data: {},
      loading: false,
      isLoading: false,
      finished: false,
      pageSize: 10,
      pageCurrent: 0
    }
  },
  components: {
    NavBar,
    Actionsheet,
    List,
    PullRefresh
  },
   methods: {
    onLoad () {
      ++this.pageCurrent
      this.updateData({
        pageCurrent: this.pageCurrent,
        pageSize: this.pageSize
      }).then(()=>{
        this.loading = false
      })
    },
    onRefresh () {
      this.data = {}
      this.updateData({
        pageCurrent: 1,
        pageSize: this.pageSize * this.pageCurrent
      }).then(()=>{
        this.isLoading = false
      })
    },
    updateData (obj) {
      return new Promise((resolve) => {
        accessRecordUser({
          userId: this.$store.state.IM.user.id,
          pageCurrent: obj.pageCurrent,
          pageSize: obj.pageSize
        }).then((res) => {
          if(res.data && res.data.list && res.data.list.length > 0 && res.data.list.map){
            this.data = Object.assign({}, this.data, res.data.list[0].map)
            // 加载状态结束
            this.loading = false;
            // 数据全部加载完成
            this.finished = true;
            resolve()
          }
        })
      })
    },
    onClickLeft() {
      this.$router.push({name: 'userDetails'})
    },
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
      if(item.name === '删除访问记录'){
        deleteAccessRecord({
          accessRecordId: this.item.accessRecordId
        }).then(() => {
          Toast('删除成功')
          this.onRefresh()
        })
      }
    },
    removeEvent (item) {
      this.item = item
      this.show = true
    }
  }
}
</script>

<style scoped>
.van-pull-refresh{
  overflow: inherit;
}
/* .recent{
  border-top: .2rem solid #f0f0f0
} */
.recent li{
  font-size: .23rem;
  text-align: left;
  color:#313131;
  height: .89rem;
  width: 100%;
  border-bottom: .01rem solid #f0f0f0;
  padding: .17rem .3rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  overflow: hidden;
  list-style:none;  
}
.recent li.time{
  line-height: .55rem
}
.recent li img{
  float: left;
  width: .55rem;
  height: .55rem;
  border-radius: 50%;
  margin-right: .3rem
}
.recent li div{
  width: calc(100% - 1.15rem);
  float: left;
}
.recent li div span{
  display: block
}
.recent li div span:nth-child(2){
  color: #8d8d8d
}
.recent li i{
  display: inline-block;
  width: .3rem;
  height: .3rem;
  background: url('../../assets/images/更多.png') no-repeat;
  background-size: 100%;
  margin-top: .1rem;
}
</style>
