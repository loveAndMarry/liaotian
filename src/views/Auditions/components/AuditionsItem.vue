<template>
  <SwipeCell :right-width="65" :on-close="onClose">
    <div class="item" @click="AuditionsClick">
      <img class="item_img" :src="el.picture"/>
      <div class="item_content">
          <div class="state" :style="{color: stateColor}">{{state}}</div>
          <p>{{content}}</p>
          <div class="time">截止日期：{{el.startTime}}&nbsp;&nbsp;至&nbsp;&nbsp;{{el.endTime}}</div>
          <div class="time">报名金额：{{el.initiatingAmountY}}元</div>
      </div>
    </div>
    <span slot="right" class="remove">删除</span>
  </SwipeCell>
</template>
<script>
import { mapActions } from 'vuex'
import utils from '@/assets/common/utils'
import { isJoinMassSelection } from '@/assets/common/api'
import { Toast ,SwipeCell} from 'vant';
export default {
  props: ['el', 'type'],
  components: {
    SwipeCell
  },
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
    onClose () {

    },
        // 点击进入详情
    AuditionsClick () {
      // 如果活动已经接受，就进不去了
      if(this.el.openState === '3'){
        this.$router.push({name: 'activityDetails', query: {id: this.el.id}})
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
              this.$router.push({name: 'apply', query: {massSelectionId: this.el.id, default: ''}})
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


<style scoped>
.remove{
  color: #fff;
  font-size: 15px;
  width: 65px;
  height: 2.37rem;
  line-height: 2.37rem;
  display: inline-block;
  text-align: center;
  background-color: #f44;
}
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
  line-height: .27rem;
  height: .54rem;
  margin: 0.03rem 0;
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
