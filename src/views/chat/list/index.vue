<template>
  <div class="content_title">
    <div class="border"></div>
    <!-- <div class="bscroll" ref="bscroll">
    <div class="bscroll-container"> -->
      <div class="title">
        <p>联系人</p>
        <span>极速处理·5</span>
      </div>
      <list-item v-for="(el, value) in friendsList" :key="value" :item='el'></list-item>
    <!-- </div>
    </div> -->
  </div>
</template>

<script>
import ListItem from './conponents/ListItem'
import { mapState } from 'vuex'
// import BScroll from 'better-scroll'

export default {
  data () {
    return {
      msg: '列表'
    }
  },
  mounted () {
    this.$store.dispatch('getFriendsList')
  },
  computed: mapState(['friendsList']),
  components: {
    ListItem
  }
  // mounted () {
  //   this.$nextTick(() => {
  //     let bscrollDom = this.$refs.bscroll
  //     this.aBScroll = new BScroll(bscrollDom, {
  //       startY: '1.35rem',
  //       click: true
  //     })
  //   })
  // }
}
</script>

<style scoped>
/* .bscroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
} */
.border {
  border-top-color: #f5f5f6;
  border-top-style: solid;
  border-top-width: 5px;
  width: calc(100% + 0.88rem);
  transform: translateX(-0.44rem);
}
.content_title {
  text-align: left;
  overflow-y: scroll;
  padding-bottom: 50px;
  padding: 0 0.44rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: calc(100% - 1.35rem - 50px);
  top: 1.35rem;
  left: 0;
}
.title {
  margin-top: 0.25rem;
}
.title p {
  margin: 0;
  display: inline-block;
  line-height: 0.46rem;
  font-size: 0.3rem;
  font-weight: 600;
}
.title span {
  float: right;
}
</style>
