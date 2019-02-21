<template>
  <div>
    <List
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="listGiftRecord">
      <div class="gift_item" v-for="(el, index) in giftList" :key="index">
        <img :src="el.userHead" alt="" class="userHead">
        <div>
          <span class="S28">{{el.nickName}}</span>
          <p class="S28">送你价值{{el.giftPrice}}婚恋豆的红玫瑰</p>
          <p class="S24">{{el.givingTime}}</p>
        </div>
        <img :src="el.giftPicture" alt="" class="gift-img">
      </div>
    </List>
  </div>
</template>

<script>
import { List } from 'vant'
import { listGiftRecord } from '@/assets/common/api'

export default {
  props: ['type', 'name'],
  components: {
    List
  },
  data () {
    return {
      loading: false,
      finished: false,
      giftList: [],
      pageCurrent: 0,
      pageSize: 10
    }
  },
  methods: {
    listGiftRecord () {
      listGiftRecord({
        pageCurrent: this.pageCurrent,
        pageSize: this.pageSize,
        userId: this.$store.state.IM.user.id,
        type: this.type
      }).then(res => {
        ++this.pageCurrent
        if(res.data && res.data.list && res.data.list.length > 0 ){
          this.giftList.push(...res.data.list)
          this.loading = false
          if(res.data.list.length < this.pageSize){
            this.finished = true
          }
          this.$emit('update:' + this.name, res.data.totalCount)
        } else {
          this.loading = false
          this.finished = true
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.gift_item{
  text-align: left;
  height: 1.99rem;
  /* line-height: 1.99rem; */
  border-bottom: 1px solid #f1f1f1;
  margin-left: .3rem;
  padding-top: .4rem;
  box-sizing: border-box;
  position: relative;
  width: calc(100% - .3rem);
  .userHead{
    width: .92rem;
    height: .92rem;
    float: left;
    margin-right: .2rem;
    border-radius: 50%;
  }
  div{
    display: inline-block;
    line-height: 1;
    p:nth-child(2){
      margin: .2rem 0;
      color: #ff5e80;
    }

    p:nth-child(3){
      margin: 0;
      color: #8d8d8d;
    }
  }
  .gift-img{
    max-width: .92rem;
    max-height: .92rem;
    float: right;
    margin-right: .3rem;
  }
}
</style>
