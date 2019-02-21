<template>
  <div class="item" @click="AuditionsClick">
    <img class="item_img" :src="el.picture"/>
    <div class="item_content">
        <div class="state S24" :style="{color: stateColor}">{{state}}</div>
        <p class="S28">{{content}}</p>
        <div class="time S24">截止日期：{{el.startTime}}至{{el.endTime}}</div>
        <div class="time S24">报名金额：{{el.initiatingAmountY}}元</div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import utils from '@/assets/common/utils'
import { isJoinMassSelection } from '@/assets/common/api'
import { Toast } from 'vant';
export default {
  props: ['el', 'type'],
  computed: {
    content () {
      return utils.uncodeUtf16(this.el.content)
    },
    state () {
      var _this = this
      var title = ''
      // 全部海选列表
      if(_this.type === '1' || _this.type === '3'){
        switch(_this.el.openState){
          case '2': 
            _this.stateColor = '#ff5e80'
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
                _this.stateColor = '#ff5e80'
                title =  '审核成功'
                break
              case '2': 
                _this.stateColor = '#ff5e80'
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
      // 如果活动已经结束，就进不去了
      if(this.el.openState === '3'){
        this.$router.push({name: 'activityDetails', query: {massSelectionId: this.el.id}})
        return false
      }

      if(this.type === '2'){
        if(this.state === '已发布'){
          localStorage.setItem('massSelectionId', this.el.id)
          this.getGroupData(this.el.groupId).then(() => {
            this.$router.push({name: 'group'})
          })
        } else {
          this.$router.push({name: 'publish', query: {massSelectionId: this.el.id}})
        }
      } else {
        if(this.type === '1'){
          // 判断当前用户是否进入海选
          isJoinMassSelection({
            userId: this.$store.state.IM.user.id,
            massSelectionId: this.el.id
          }).then(res => {
            // 审核成功之后直接进入聊天室
            if(res.data.isJoinMassSelection === '1'){
              if(res.data.auditJoinMassSelection.auditIsAgree === '2'){
                localStorage.setItem('massSelectionId', this.el.id)
                this.getGroupData(this.el.groupId).then(() => {
                  this.$router.push({name: 'group'})
                })
              } else {
                this.$router.push({name: 'apply', query: {massSelectionId: this.el.id, default: res.data.auditJoinMassSelection}})
              }
            } else {
              if(Number(this.el.groupUserCount) < Number(this.el.groupSizeLimitCount)){
                this.$router.push({name: 'apply', query: {massSelectionId: this.el.id, default: ''}})
              } else {
                Toast({
                  message: '当前群组人数已达到上限',
                  duration: 2000
                })
              }
            }
          })
        } else {
          localStorage.setItem('massSelectionId', this.el.id)
            this.getGroupData(this.el.groupId).then(() => {
            this.$router.push({name: 'group'})
          })
        }
      }
    },
  }
}

</script>

<style scoped lang="less">
.item{
  padding: 0 .3rem .39rem;
  box-sizing: border-box;
  box-sizing: -webkit-border-box;
  color: @base-black;
  text-align: left;
  overflow: hidden;
  background-color: @base-white;
  margin-bottom: .2rem
}
.item_img{
  display: block;
  width: 2rem;
  height: 1.58rem;
  margin-top: .39rem;
  float: left;
}
.item_content{
  display: inline-block;
  width: calc(100% - 2rem);
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
  color: @base-black;
  line-height: .28rem;
  height: .56rem;
  margin-top: 0.22rem;
  margin-bottom: 0;
  overflow:hidden; 
  text-overflow:ellipsis;
  display: box;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2; 
}
.item_content .time{
  line-height: .4rem
}
</style>
