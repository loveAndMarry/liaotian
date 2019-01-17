<template>
  <div class="item" @click="AuditionsClick">
    <img class="item_img" :src="el.picture"/>
    <div class="item_content">
        <div class="state" :style="{color: stateColor}">{{state}}</div>
        <p>{{el.content}}</p>
        <div class="time">截止日期：{{el.startTime}}&nbsp;&nbsp;至&nbsp;&nbsp;{{el.endTime}}</div>
        <div class="time">报名金额：{{el.initiatingAmountY}}元</div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: ['el', 'type'],
  computed: {
    state () {
      var _this = this
      var title = ''
      // 全部海选列表
      if(_this.type === '1' || _this.type === '3'){
        switch(_this.el.openState){
          case '2': 
            _this.stateColor = '#ff5a85'
            title =  '活动进行中'
            break
          case '3': 
            title =  '活动已结束'
            break
        }
      } else if(_this.type === '2') {
        switch(_this.el.auditStatus){
          case '1': 
            _this.stateColor = '#ffa000'
            title =  '审核中'
            break
          case '2': 
            switch(_this.el.openState){
              case '1': 
                _this.stateColor = '#ff5a85'
                title =  '审核成功'
                break
              case '2': 
                _this.stateColor = '#ff5a85'
                title = '已发布'
                break
              case '3': 
                title =  '海选结束'
                break
            }
            break
          case '3': 
            title =  '审核失败'
            break
        }
      }
      return title
    }
  },
  data () {
    return {
      stateColor: '#b5b5b5'
    }
  },
  methods: {
    ...mapActions([
      'getGroupData'
    ]),
        // 点击进入详情
    AuditionsClick () {
      if(this.type === '2'){
        if(this.state === '已发布'){
          this.getGroupData(this.el.id).then(() => {
            console.log(this.$store.state.group, '群组容器')
            this.$router.push({name: 'group'})
          })
        } else {
          this.$router.push({name: 'publish', query: {massSelectionId: this.el.id}})
        }
      } else {
        this.$router.push({name: 'apply', query: {massSelectionId: this.el.id}})
      }
    },
  }
}

</script>


<style scoped>
.item{
  padding: 0 .3rem .39rem;
  box-sizing: border-box;
  box-sizing: -webkit-border-box;
  font-size: .23rem;
  color: #f96388;
  text-align: left;
  overflow: hidden;
  background-color: #fff;
  margin-bottom: .2rem
}
.item_img{
  display: block;
  width: 1.58rem;
  height: 1.58rem;
  margin-top: .39rem;
  float: left;
}
.item_content{
  display: inline-block;
  width: calc(100% - 1.58rem);
  height: 100%;
  padding:0 .15rem;
  box-sizing: border-box;
  box-sizing: -webkit-border-box;
}
.item_content .state{
  text-align: right;
  width: 100%;
  height: .39rem;
  line-height: .55rem;
}
.item_content p{
  color: #393939;
  font-size: .27rem;
  margin: 0.03rem 0;
  overflow:hidden; 
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2; 
}
.item_content .time{
  line-height: .4rem
}
</style>
