<template>
  <div>
    <NavBar
    left-arrow
    @click-left="onClickLeft" title="我的动态"/>
    <div style="height:calc(100% - 46px);overflow-y: scroll;">
      <PullRefresh v-model="isLoading" @refresh="onRefresh">
      <List 
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="dynamic">
        <template v-show="data.length !== 0" v-for="(el, index) in data">
          <div class="dynamic_group">
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
              <span>{{el.dynamicDate | dateTime}}</span>
              <span>0赞</span>
              <i @click="remove(el.id)"></i>
            </div>
          </div>
        </template>
        <p v-show="data.length === 0" style="height:100%"></p>
      </List>
    </PullRefresh>
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
      pageCurrent: 0
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
    imgClick (context) {
       window.instance = ImagePreview({
        images: [context + '?imageMogr2/auto-orient'],
      })
    },
     onLoad () {
      ++this.pageCurrent
      this.updateData({
        pageCurrent: this.pageCurrent,
        pageSize: this.pageSize
      }).then((res)=>{
        this.data.push(...res)
        this.loading = false
      })
    },
    onRefresh () {
      this.data = {}
      this.updateData({
        pageCurrent: 1,
        pageSize: this.pageSize * this.pageCurrent
      }).then((res)=>{
        this.isLoading = false
        this.data = res
      })
    },
    updateData (obj) {
      return new Promise((resolve) => {
        getUserDynamic({
          userId: this.$store.state.IM.user.id,
          pageCurrent: obj.pageCurrent,
          pageSize: obj.pageSize
        }).then((res) => {
          if(res.data && res.data.list && res.data.list.length > 0){
            // 加载状态结束
            this.loading = false;
            this.isLoading = false
            // 数据全部加载完成
            this.finished = true;
            resolve(res.data.list)
          } else {
            this.loading = false;
            this.isLoading = false
          }
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
<style scoped>
.dynamic{
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
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
  padding: .3rem .15rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  font-size: .24rem;
  color: #949494;
  background-color: #f0f0f0
}
.dynamic_group .dynamic_content img{
  max-width: 100%;
  max-height: 3.5rem;
}
.dynamic_group .title{
  line-height: .64rem;
  height: .64rem;
  font-size: .23rem;
  color: #949494;
}
.dynamic_group .dynamic_bottom{
  font-size: .2rem;
  color: #8f8f8f;
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
