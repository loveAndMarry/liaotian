<template>
  <div>
      <NavBar
      title="分润"
      left-arrow
      @click-left="onClickLeft"/>

      <div style="height: calc(100% - 46px);overflow-y: scroll;overflow-x: hidden;background-color: #fff;border-top: .2rem">
         <List 
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :style="{minHeight: height - 46 + 'px'}">
            <div class="record" v-for="(el, index) in recordList" :key="index">
              <img :src="el.userHead" alt="">
              <p>{{el.nickName}}</p>
              <Tag plain type="danger">{{el.type === '1' ? '均分' : '独享'}}</Tag>
              <i>{{el.moneyY}}</i>
            </div>
          </List>
      </div>
  </div>
</template>

<script>
import { NavBar , Tag , List} from 'vant'
import { listBonusRecord } from '@/assets/common/api'
import { resolve } from 'url';
export default {
  components: {
    NavBar,
    Tag,
    List
  },
  data () {
    return {
      id:'',
      recordList: [],
      pageCurrent: 1,
      pageSize: 10,
      loading: false,
      finished: false
    }
  },
  computed: {
    height () {
      return window.document.body.clientHeight || window.document.documentElement.clientHeight
    }
  },
  mounted() {
    this.id = this.$route.query.id
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onLoad () {
      ++this.pageCurrent

      listBonusRecord({
        pageCurrent: this.pageCurrent,
        pageSize: this.pageSize,
        massSelectionId: this.id
      }).then(res => {
        this.loading = false
        if(res.data.list || res.data.list.length > 0){
          this.recordList.push(...res.data.list)
          if(res.data.list.length < this.pageSize){
            this.finished = true
          }
        } else {
          this.finished = true
        }
      }).catch(res => {
        this.finished = true
      })
    }
  }
}
</script>

<style scope>
.record{
  height: 1.11rem;
  width: 100%;
  line-height: 1.11rem;
  position: relative;
  text-align: left;
  padding: 0 .3rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  font-size: .28rem;
  color: #373737;
}
.record::after{
  position: absolute;
  width: calc(100% - 1.16rem);
  height: .01rem;
  border-bottom: .01rem solid #f2f2f2;
  right: 0;
  bottom: 0;
  content: ''
}
.record img{
  display: inline-block;
  width: .64rem;
  height: .64rem;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  vertical-align: middle
}
.record p{
  display: inline-block;
  vertical-align: middle;
  margin: 0;
  margin-left: .22rem;
}
.record i{
  display: block;
  float: right;
  font-style: normal;
}
</style>
