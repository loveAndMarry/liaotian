<template>
  <div>
     <NavBar
      left-arrow
      @click-left="onClickLeft"
      title="礼物"
    />

    <div style="height: calc(100% - 46px);overflow-y: scroll;overflow-x: hidden;background-color: #fff;" ref="gift">
      <Tabs
      animated
      :line-width="width"
      @click="onClick">
        <Tab :title="`我收到的(${receiveTotalCount})`">
          <giftList type="1" :receiveTotalCount.sync="receiveTotalCount"/>
        </Tab>
        <Tab :title="`我送出的(${sendTotalCount})`" ref="sendTotalCount">
          <giftList type="2" :sendTotalCount.sync="sendTotalCount" name="sendTotalCount"/>
        </Tab>
    </Tabs>
    </div>
  </div>
</template>
<script>
import { NavBar , Tab , Tabs} from 'vant'
import giftList from './components/giftList'
import {listGiftRecord} from '@/assets/common/api'
export default {
  components: {
    NavBar,
    Tab,
    Tabs,
    giftList
  },
  data () {
    return {
      width: 0,
      sendTotalCount: 0, // 我送出礼物的总数
      receiveTotalCount: 0, // 我收的礼物的总数
    }
  },
  mounted () {
    this.width = this.$refs.gift.clientWidth / 2;
    listGiftRecord({
      pageCurrent: 1,
      pageSize: 10,
      userId: this.$store.state.IM.user.id,
      type: '2'
    }).then(res => {
      this.sendTotalCount = res.data.totalCount
    })
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onClick () {

    }
  },
  watch: {
    sendTotalCount (val) {
      console.log(val)
    },
    receiveTotalCount (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="less" scoped>

</style>
