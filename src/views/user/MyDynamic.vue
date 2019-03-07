<template>
  <div id="dynamic">
    <NavBar
    left-arrow
    @click-left="onClickLeft" title="我的动态"/>
    <div style="height:calc(100% - 46px);overflow-y: scroll;-webkit-overflow-scrolling: touch;" ref='contentView'>
      <!-- <PullRefresh v-model="isLoading" @refresh="onRefresh"> -->
      <List 
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="dynamic" ref='dynamic'>
        <template v-show="data.length !== 0" v-for="(el, index) in data">
          <div class="dynamic_group S24" :key="index">
            <div class="title" v-if="el.type < 4">上传了{{el.type | type}}</div>
              <div class="dynamic_content">
                <template v-if="el.type === '1'">
                  <p>{{el.context}}</p>
                </template>
                <template v-if="el.type == '2' || el.type == '3'">
                  <img :src="el.context + '?imageMogr2/auto-orient'" alt="" @click="imgClick(el.context)">
                </template>
                <template v-if="el.type == '4' || el.type == '5'">
                  <p style="font-size: 0.34rem;margin: .2rem 0;">{{el.title}}</p>
                  <!-- 图文详情 -->
                  <img  v-if="el.type == '4'" :src="el.context + '?imageMogr2/auto-orient'" alt="" @click="imgClick(el.context)">
                  <!-- 视频详情 -->
                  <div v-if="el.type == '5'" class="video_group">
                    <span @click="openVideo(el.context, el.firstFramePicture)"></span>
                    <img :src="el.firstFramePicture">
                  </div>
                </template>
              </div>
            <div class="dynamic_bottom">
              <span>{{el.dynamicDate | dateTime}}</span>
              <span>{{el.likeCount}}赞</span>
              <i @click="remove(el.id)"></i>
            </div>
          </div>
        </template>
        <template v-show="data.length === 0"><p></p></template>
      </List>
    <!-- </PullRefresh> -->
  </div>
    <Actionsheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      @select="onSelect"
      @cancel="show = false"
    />
  </div>
</template>
<script>
import { NavBar, ImagePreview, Actionsheet, Toast, List, PullRefresh} from "vant"
import { getUserDynamic, deleteDynamic} from "@/assets/common/api";
export default {
  data () {
    return {
      id: '', //储存当前点击的id
      value: '',
      show: false,
      actions: [
        {
          name: '删除'
        }
      ],
      data: [],
      loading: false,
      isLoading: false,
      finished: false,
      pageSize: 10,
      pageCurrent: 1
    }
  },
  components: {
    NavBar,
    Actionsheet,
    ImagePreview,
    Toast,
    List,
    PullRefresh
  },
  filters: {
    type (val) {
      switch(val){
        case '1':
          return '个人简介'
          break
        case '2':
          return '相册'
          break
        case '3':
          return '头像'
          break
      }
    }
  },
  methods: {
    openVideo (url,image){
      var u = navigator.userAgent;
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
        console.log("安卓手机");
        window.Android.openVideo(url,image)
      } else if (u.indexOf('iPhone') > -1) {//苹果手机
        console.log("苹果手机");
        window.webkit.messageHandlers.openVideo.postMessage(url,image)
      }
    },
    imgClick (context) {
       window.instance = ImagePreview({
        images: [context + '?imageMogr2/auto-orient'],
      })
    },
    onLoad () {
      this.updateData({
        pageCurrent: this.pageCurrent,
        pageSize: this.pageSize
      }).then((res)=>{
        if(res && res.list && res.list.length > 0 && this.data.length < res.totalCount){
          this.data.push(...res.list)
          ++this.pageCurrent
          this.loading = false
        } else {
          this.loading = false
           // 数据全部加载完成
          this.finished = true;
        }
      })
    },
    onRefresh () {
      if(this.$refs.dynamic.$el.scrollTop === 0){
        this.data = {}
        this.updateData({
          pageCurrent: 1,
          pageSize: this.pageSize * this.pageCurrent
        }).then((res)=>{
          this.isLoading = false
          this.data = res.list
        })
      }
    },
    updateData (obj) {
      return new Promise((resolve) => {
        getUserDynamic({
          userId: this.$store.state.IM.user.id,
          pageCurrent: obj.pageCurrent,
          pageSize: obj.pageSize
        }).then((res) => {
          resolve(res.data)
        }).catch(()=> {
          this.loading = false;
          this.isLoading = false
          // 数据全部加载完成
          this.finished = true;
          resolve(this.data)
        })
      })
    },
    onClickLeft () {
      this.$router.push({name: 'user'})
    },
    onSelect(item) {
      let id = this.id
      if(item.name === '删除'){
        deleteDynamic({
          dynamicId: id,
          userId: this.$store.state.IM.user.id
        }).then((res) => {
          this.$toast('删除成功')
          this.data = this.data.filter(el => el.id !== id)
        })
      }
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
    },
    remove (id) {
      this.show = true
      this.id = id
    }
  }
}
</script>


<style scoped lang="less">
.dynamic .dynamic_group{
  border-bottom: .2rem solid #f0f0f0;
  background-color: #fff;
  text-align: left;
  padding: 0 .3rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.dynamic_group .dynamic_content p{
  margin: 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  color: @base-black;
}
.dynamic_group .dynamic_content img{
  max-width: 100%;
  max-height: 3.5rem;
}
.dynamic_context .dynamic_content .video_group img{
  width: 100%;
  height: 100%;
  display: block
}

.dynamic_context .dynamic_content .video_group{
  position: relative;
  width: 100%;
  height: 50%;
}
.dynamic_context .dynamic_content .video_group span{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1rem;
  height: 1rem;
  background:url('../../assets/images/play.png') no-repeat;
  background-size: 100% 100%;
  background-position: center
}
.dynamic_group .title{
  line-height: .64rem;
  height: .64rem;
  color: @base-gray;
}
.dynamic_group .dynamic_bottom{
  color:  @base-gray;
  line-height: .6rem;
  height: .6rem;
}
.dynamic_group .dynamic_bottom span{
  margin-right: .3rem
}
.dynamic_group .dynamic_bottom i{
  float: right;
  display: block;
  width: .3rem;
  height: .3rem;
  background: url('../../assets/images/更多.png') no-repeat;
  background-size: 100%;
  margin-top: .1rem;
}
</style>
