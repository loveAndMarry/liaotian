<template>
  <div>
    <NavBar left-arrow @click-left="onClickLeft" title="婚恋豆明细"/>
    <div style="height: calc(100% - 46px);overflow: hidden scroll;background-color: #fff;">
      <List
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="item" v-for="(item, index) in List" :key="index">
          <div class="title">
            <img src="../../assets/images/withdrawal1.png" alt>
            <strong>{{item.transactionType | replaceType}}</strong>
            <p>{{item.createDate}}</p>
          </div>
          <div class="money">{{(item.type == '1'? '-' : '+') + item.operationBalance}}</div>
        </div>
      </List>
    </div>
  </div>
</template>

<script>
import { NavBar ,List} from "vant";
import { virtualCurrencyRecord } from '@/assets/common/api'

export default {
  name: "",
  components: {
    NavBar,
    List
  },
  data() {
    return {
      loading: false,
      finished: false,
      pageSize: 10,
      pageCurrent: 1,
      List: []
    };
  },
  filters: {
    replaceType (val) {
      switch (val) {
        case '1':
          return '兑换提现'
          break
        case '2':
          return '礼物赠送'
          break
        case '3':
          return '充值'
          break
        case '4':
          return '接收礼物'
          break
        case '5':
          return '推荐分润'
          break
      }
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onLoad () {
      console.log('进入次数')
      let that = this
      this.getList().then(res => {
        that.loading = false
        that.List.push(...res)
        if(res.length < that.pageSize){
          that.finished = true
        }
      })
    },
    getList () {
      let that = this
      return new Promise(resolve => {
        virtualCurrencyRecord({
          pageCurrent: that.pageCurrent,
          pageSize: that.pageSize,
          userId: that.$store.state.IM.user.id
        }).then(res => {
          if(that.pageCurrent < Number(res.data.totalCount)) {
            ++that.pageCurrent
          }
          resolve(res.data.list)
        }).catch(res => {
          that.loading = false;
          that.finished = true;
        })
      })
    }
  }
};
</script>

<style lang='less' scoped>
.item {
  height: 1.1rem;
  border-bottom: 1px solid #f0f0f0;
  padding: 0.2rem 0.3rem;
  box-sizing: border-box;
  font-size: 0.28rem;
}
.title {
  width: calc(100% - 1.35rem);
  float: left;
  text-align: left;
}
.title img {
  height: 0.7rem;
  float: left;
  margin-right: 0.2rem;
}
.title strong {
  font-weight: normal;
}
.title p {
  margin: 0;
  margin-top: 0.06rem;
  font-size: 0.24rem;
  color: #8d8d8d;
}
.money {
  width: 1.35rem;
  /* float: right; */
  float: right;
  line-height: 0.7rem;
  text-align: right;
}
</style>