<template>
  <div class="content dynamic">
    <!-- <Search placeholder="按照条件搜索 例如 女 济南 22" v-model="value" show-action>
       <div slot="action" @click="search">搜索</div>
      <div slot="action" @click="onSearch"><i class="tianjia"></i></div>
    </Search> -->
    <!-- 发布动态 -->
    <span class="dongtai" v-show="isDynamic" @click="show = !show"></span>
    <Tabs v-model="active" animated @click="onClick">
      <Tab title="搜索">
        <Banner page="1"></Banner>
        <TabList @search="search" ref="TabList"/>
        <div style="position: relative;top:.8rem;width: 100%;" :style="{height: 'calc('+height+'px - 1.6rem - 100px)'}" ref="content">
          <HomeList ref='HomeList' ></HomeList>
        </div>
      </Tab>
      <Tab title="动态">
        <div class="scroll_group" :style="{height: 'calc('+height+'px - 94px)'}">
          <PullRefresh v-model="isLoading" @refresh="onRefresh">
          <List
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="dynamic_group" v-for="(el, index) in dynamicList" :key="index">
              <div class="dynamic_title">
                <img :src="el.userHead" alt="" @click="linkClick(el)">
                <div class="dynamic_title_content">
                  <h3 :class="{name_level:(el.levelCode - 0) > 0 }">{{el.nickName}}
                    <span class="S24 Tag" v-if="el.registerState === '5'">实名</span>
                    <img v-if="el.levelCode - 0 > 0" class="title_level" :src="el.ico" alt="">
                  </h3>
                  <div><span>{{el.age + '岁 '}}</span><i>|</i><span>{{el.height + "厘米 "}}</span><i>|</i><span>{{el.education + ' '}}</span><i>|</i><span>{{el.income}}</span></div>
                </div>
              </div>
              <div class="dynamic_context" :key="index">
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
                    <div v-if="el.type == '5'" class="video_group" @click="openVideo(el.context, el.firstFramePicture)">
                      <span></span>
                      <img :src="el.firstFramePicture">
                    </div>
                  </template>
                </div>
                <div class="dynamic_bottom">
                  <span class="praise" :class="{give:el.isLike === '1'}" @click.stop.prevent="praise($event,el)"><i></i><strong> {{el.likeCount}} 赞</strong></span>
                </div>
              </div>
            </div>
          </List>
        </PullRefresh>
        </div>
      </Tab>
    </Tabs>
    <Actionsheet
    v-model="show"
    :actions="actions"
    cancel-text="取消"
    @select="onSelect">

    </Actionsheet>

    <div class="invite" v-show="inviteShow">
      <a @click.stop.prevent="invite" class="link"></a>
      <span class="botton" @click="inviteClick"></span>
    </div>
  </div>
</template>

<script>
import { Search , Tabs, Tab, List, PullRefresh, ImagePreview, Tag, Actionsheet} from 'vant'
import TabList from './components/tabs'
import HomeList from './components/HomeList'
import Banner from '@/components/Banner'
import { listGlobalDynamics ,dynamicLike ,getUserRecommendCodeByUserId} from '@/assets/common/api'
import Vue from 'vue'
import { mapMutations , mapState} from 'vuex'

import utils from '@/assets/common/utils'
import pinyin from 'pinyin'

export default {
  name: 'home',
  data () {
    return {
      index: 0,
      active: 0,
      columns:[],
      height: 0,
      isLoading: false, // 动态下拉刷新
      loading: false, // 列表刷新
      finished: false, // 列表刷新加载完毕
      dynamicList: [],
      pageCurrent: 1,
      pageSize:10,
      isDynamic: false,
      show: false,
      inviteShow: false,
      actions: [
        {
          name: '拍摄'
        },
        {
          name: '选择图片'
        }
      ]
    }
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
  beforeMount () {
    var that = this
    localStorage.getItem('inviteShow') ? this.inviteShow = false : this.inviteShow = true
    this.height = document.body.clientHeight || document.documentElement.clientHeight
    // 触发获取好友列表的请求
    this.$store.dispatch('GETFRIENDLIST',{
      type: '1'
    }).then(res => {}).catch(res => {

    })

    // 上传动态后刷新列表
    window.openDynamicCallback(function(){
      that.onRefresh()
    })
  },
  activated () {
    this.active = 0;
    this.isDynamic = false
  },
  computed: {
    ...mapState({
      user: state => state.IM.user
    })
  },
  methods: {
    ...mapMutations([
      'setLoading'
    ]),
    openVideo (url, image){
      var u = navigator.userAgent;
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
        console.log("安卓手机");
        window.Android.openVideo(url,image)
      } else if (u.indexOf('iPhone') > -1) {//苹果手机
        console.log("苹果手机");
        window.webkit.messageHandlers.openVideo.postMessage(url,image)
      }
    },
    inviteClick () {
      this.inviteShow = false
      localStorage.setItem('inviteShow','1') 
    },
    invite () {
      this.inviteShow = false
      // 分享微信
       getUserRecommendCodeByUserId({
        userId: this.user.id
      }).then(res => {
        if(res.data) {
          let url = 'http://yuan.minmai1688.com/webregister/register.html?recommendCode=' + res.data
          var u = navigator.userAgent;
          if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
            console.log("安卓手机");
            window.Android.Share(url)
          } else if (u.indexOf('iPhone') > -1) {//苹果手机
            console.log("苹果手机");
            window.webkit.messageHandlers.Share.postMessage(url)
          } 
        } else {
          Toast({
            message: '当前不支持分享，请稍后再试',
            duration: 1000
          })
        }
      })

      // 调取通讯录
      // let that = this
      // window.invite(function(str) {
      //   if(typeof str === 'object') {
      //     str = JSON.stringify(str)
      //   } else {
      //     str = str
      //   }
      //   that.$router.push({name: 'addressBook', query: {str : str}})
      // })
    },
    onSelect (item) {
      let type = null
      if(item.name === '拍摄') {
        type = 1
      } else if(item.name === '选择图片') {
        type = 2
      }

      var u = navigator.userAgent;
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
        console.log("安卓手机");
        window.Android.openDynamic(type)
      } else if (u.indexOf('iPhone') > -1) {//苹果手机
        console.log("苹果手机");
        window.webkit.messageHandlers.openDynamic.postMessage(type)
      }

      this.show = false

    }, 
    // 切换tabs时关闭筛选条件框
    onClick(index) {
      index == 1 ? this.isDynamic = true : this.isDynamic = false
      this.$refs.TabList.isContentType = false
      this.$refs.TabList.isShow = -1
    },
    linkClick (item) {
      this.$store.state.IM.friend = item
      this.$router.push({name: 'userDetail'})
    },
    imgClick (context) {
       window.instance = ImagePreview({
        images: [context + '?imageMogr2/auto-orient'],
      })
    },
    onRefresh () {
      this.listGlobalDynamics({
        pageCurrent: 0,
        pageSize: this.pageCurrent * this.pageSize,
        userId: this.user.id
      }).then(res => {
        this.isLoading = false
        this.dynamicList = res
      }).catch(res => {
        this.isLoading = false
      })
    },
    onLoad () {
      this.listGlobalDynamics({
        pageCurrent: this.pageCurrent,
        pageSize: this.pageSize,
        userId: this.user.id
      }).then(res => {
        this.dynamicList.push(...res)
        ++this.pageCurrent
        this.loading = false
      }).catch(res => {
        this.loading = false
        this.finished = true
      })
    },
    listGlobalDynamics (obj) {
      return new Promise((resolve,reject) => {
        listGlobalDynamics({
          pageCurrent: obj.pageCurrent,
          pageSize: obj.pageSize,
          userId: obj.userId
        }).then(res => {
          if(res.data && res.data.list && res.data.list.length > 0){
            if(res.data.list.length < 10 || this.dynamicList.length + 10 === res.data.totalCount){
              this.finished = true
              resolve(res.data.list)
              return 
            }
            resolve(res.data.list)
          }else{
            reject()
          }
        })
      })
    },
    search (fromData,pageSize) {
      this.$refs.HomeList.refresh(null,fromData, pageSize)
    },
    praise ($event, ele) {
      let _this = this
      if(ele.isLike === '0'){
         dynamicLike({
          userId: _this.$store.state.IM.user.id,
          accessRecordId: ele.userId,
          dynamicId: ele.id,
          type: 1
        }).then(() => {
          _this.dynamicList.splice(_this.dynamicList.findIndex(el => el.id === ele.id), 1, Object.assign(_this.dynamicList.find(el => el.id === ele.id), {
            likeCount: ele.likeCount - 0 + 1,
            isLike: '1'
          }))
        })
      }
    }
  },
  components: {
    Search,
    TabList,
    HomeList,
    Banner,
    Tabs,
    Tab,
    PullRefresh,
    List,
    ImagePreview,
    Tag,
    Actionsheet
  }
}
</script>

<style lang="less">
.invite{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,.1);
  z-index: 998;
  background-image: url('../../assets/images/invitation_bg.png');
  background-repeat: no-repeat;
  background-position: 35% 50%;
  background-size: 80%;
}

.invite .link{
  position: absolute;
  top: calc(50% + 56px);
  left: 50%;
  display: block;
  width: 3rem;
  height: .8rem;
  transform: translate(-50%);
}

.invite span {
    display: block;
    position: absolute;
    left: 50%;
    bottom: 3.5rem;
    width: 0.7rem;
    height: 0.7rem;
    background-image: url('../../assets/images/close.png');
    background-repeat: no-repeat;
    background-size: 100%;
    transform: translate(-50%);
  }

.dongtai {
  position: fixed;
  position: fixed;
  right: .3rem;
  top: 0;
  width: .5rem;
  height: 44px;
  display: block;
  background-image: url('../../assets/images/release_dynamic.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  z-index: 999;
}
.scroll_group{
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.praise{
  float: right;
}
.praise i{
  float: left;
  display: block;
  width: .34rem;
  height: .34rem;
  background-image: url('../../assets/images/no_like.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-top: .1rem;
  margin-right: .1rem;
}
.praise.give{
  color: #ff5e80;
}
.praise.give i{
  background-image: url('../../assets/images/give_like.png');
}
.dynamic{
  height: 100%
}
.dynamic_group{
  padding: .3rem .32rem;
  box-sizing: border-box;
  box-sizing: -webkit-border-box;
  background-color: #fff;
  border-bottom: .2rem solid #f0f0f0;
  text-align: left
}

.dynamic_title img{
  width: 1.04rem;
  height: 1.04rem;
  display: block;
  border-radius: 50%;
  float: left;
}

.dynamic_title .dynamic_title_content{
  display: inline-block;
  width: calc(100% - 1.36rem);
  height: 1.04rem;
  padding-left: .32rem;
  box-sizing: border-box;
  box-sizing: -webkit-border-box;
}

.dynamic_title .dynamic_title_content h3{
  display: block;
  font-size: .29rem;
  line-height: .54rem;
  color: #000000;
  text-overflow: ellipsis;
  overflow: hidden;
  margin:0
}
.dynamic_title .dynamic_title_content h3.name_level{
  color: #fe2d61
}

.dynamic_title .dynamic_title_content h3 img.title_level{
  float: none;
  display: inline-block;
  height: .4rem;
  width: .4rem;
  vertical-align: middle;
  margin-left: .1rem;
}
.dynamic_title .dynamic_title_content div{
  overflow: hidden;
  margin-top: .2rem
}
.dynamic_title .dynamic_title_content div span{
  font-size: .26rem;
  color: #919191;
  padding: 0 .05rem;
  display: inline-block;
}
.dynamic_title .dynamic_title_content div span:first-child{
  padding-left: 0
}

.dynamic_context .dynamic_content p{
  margin: 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  font-size: .24rem;
  color: @base-gray;
}
.dynamic_context .dynamic_content img{
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
.dynamic_title_content i{
  font-style: normal;
  color: #ccc;
}
.dynamic_context .title{
  line-height: .64rem;
  height: .64rem;
  font-size: .24rem;
  color: #949494;
}
.dynamic_context .dynamic_bottom{
  font-size: .24rem;
  color: #8f8f8f;
  line-height: .6rem;
  height: .6rem;
}

</style>
