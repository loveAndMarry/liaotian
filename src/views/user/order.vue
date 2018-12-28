<template>
  <div>
    <NavBar left-arrow @click-left="onClickLeft" title="我的订单"/>
    <div class="scroll">
      <List
        v-model="loading"
        :finished="finished"
        finished-text='没有更多了'
        @load="onLoad"
      >
        <div class="orderGroup" v-for="(el, index) in list" :key="index" @click="PaymentDetails(el)">
          <img :src="el.productPictures">
          <div class="order_content">
            <p>{{el.title}}</p>
            <div>
              <span>￥{{el.payMoneyY}}</span>
              <span style="float: right;">x {{el.productCount}}</span>
            </div>
          </div>
          <div class="order_type" :class="{success: el.status === '2'}">{{el.status | status}}</div>
        </div>
      </List>
    </div>
  </div>
</template>
<script>
import { NavBar, List ,Cell} from "vant";
import { listUserOrder } from '@/assets/common/api'
export default {
  data () {
    return {
      list: [],
      pageCurrent: 1,
      pageSize: 10,
      loading: false,
      finished: false
    }
  },
  filters: {
    status (val) {
      switch(val){
        case '1':
          return '未支付'
          break
        case '2':
          return '已支付'
          break
        case '3':
          return '已支付执行业务异常'
          break
        case '4':
          return '支付失败'
          break
      }
    }
  },
  components: {
    NavBar,
    List,
    Cell
  },
  mounted () {
    //this.onLoad()
  },
  methods: {
    PaymentDetails(el) {
      this.$router.push({name: 'PaymentDetails', query: {el: el}})
    },
    onLoad() {
      listUserOrder({
        userId: this.$store.state.IM.user.id,
        pageCurrent: this.pageCurrent,
        pageSize: this.pageSize
      }).then((res) => {
        window.setTimeout(() => {
          if(res.data.list && this.list.length < res.data.totalCount){
            this.loading = false;
            this.list.push(...res.data.list)
            this.pageCurrent++
          } else {
            this.loading = false;
            this.finished = true;
            console.log(this.finished,'设置为true')
          }
        }, 500)
      })
    },
    onClickLeft () {
      this.$router.back()
    }
  }
};
</script>
<style>
.scroll {
  height: calc(100% - 46px);
  overflow-x: hidden;
  overflow-y: scroll;
  background: #fff;
  padding: 0 0.3rem;
}
.orderGroup {
  padding: 0.2rem;
  padding-right: 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  color: #8e8e8e;
  font-size: 0.19rem;
  overflow: hidden;
}
.orderGroup img {
  float: left;
  width: 0.95rem;
  height: 0.95rem;
  margin-right: 0.2rem;
}
.order_content {
  float: left;
  width: calc(100% - 2.55rem);
  text-align: left;
}
.order_content p {
  margin: 0;
  font-size: 0.23rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.order_content div {
  margin-top: 0.15rem;
}
.order_type {
  float: right;
  width: 1rem;
  word-break: break-word;
  height: 0.95rem;
}
.success{
  color: #ff7994
}
</style>
