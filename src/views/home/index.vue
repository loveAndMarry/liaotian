<template>
  <div class="content dynamic">
    <!-- <Search placeholder="按照条件搜索 例如 女 济南 22" v-model="value" show-action>
       <div slot="action" @click="search">搜索</div>
      <div slot="action" @click="onSearch"><i class="tianjia"></i></div>
    </Search> -->
    <Tabs v-model="active" animated>
      <Tab title="搜索">
        <Banner page="1"></Banner>
        <TabList @search="search"/>
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
                  <h3>{{el.nickName}}</h3>
                  <div><span>{{el.age + '岁 |'}}</span><span>{{el.height + "厘米 |"}}</span><span>{{el.education + ' |'}}</span><span>{{el.income}}</span></div>
                </div>
              </div>
              <div class="dynamic_context" :key="index">
                <div class="title">上传了{{el.type | type}}</div>
                <div class="dynamic_content">
                  <template v-if="el.type === '1'">
                    <p>{{el.context}}</p>
                  </template>
                  <template v-if="el.type !== '1'">
                    <img :src="el.context + '?imageMogr2/auto-orient'" alt="" @click="imgClick(el.context)">
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
  </div>
</template>

<script>
import { Search , Tabs, Tab, List, PullRefresh, ImagePreview} from 'vant'
import TabList from './components/tabs'
import HomeList from './components/HomeList'
import Banner from '@/components/Banner'
import { listGlobalDynamics ,dynamicLike } from '@/assets/common/api'
import Vue from 'vue'
import { mapMutations , mapState} from 'vuex'

import utils from '@/assets/common/utils'
import { promises } from 'fs';
import { rejects } from 'assert';

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
      pageSize:10
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
    this.height = document.body.clientHeight || document.documentElement.clientHeight
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
        pageSize: this.dynamicList.length,
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
            if(res.data.list.length < 10){
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
    ImagePreview
  }
}
</script>

<style scoped>
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
  width: .3rem;
  height: .3rem;
  background-image: url('../../assets/images/give_like.png');
  background-repeat: no-repeat;
  background-size: 100%;
  margin-top: .1rem;
  margin-right: .1rem;
}
.praise.give{
  color: #fb97ac;
}
.praise.give i{
  background-image: url('../../assets/images/no_like.png');
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
  font-size: .33rem;
  line-height: .54rem;
  color: #000000;
  text-overflow: ellipsis;
  overflow: hidden;
  margin:0
}
.dynamic_title .dynamic_title_content div{
  overflow: hidden;
  margin-top: .2rem
}
.dynamic_title .dynamic_title_content div span{
  font-size: .26rem;
  color: #919191;
  padding: 0 .1rem;
  display: inline-block;
}
.dynamic_title .dynamic_title_content div span:first-child{
  padding-left: 0
}

.dynamic_context .dynamic_content p{
  margin: 0;
  padding: .3rem .15rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  font-size: .24rem;
  color: #949494;
  background-color: #f0f0f0
}
.dynamic_context .dynamic_content img{
  max-width: 100%;
  max-height: 3.5rem;
}
.dynamic_context .title{
  line-height: .64rem;
  height: .64rem;
  font-size: .23rem;
  color: #949494;
}
.dynamic_context .dynamic_bottom{
  font-size: .2rem;
  color: #8f8f8f;
  line-height: .6rem;
  height: .6rem;
}

</style>
