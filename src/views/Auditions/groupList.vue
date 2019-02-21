<template>
  <div>
    <NavBar left-arrow title="参选成员" @click-left="onClickLeft">
      <i class="check" slot="right" @click="show = true"/>
    </NavBar>
    <div style="height: calc(100% - 46px);overflow-y: scroll;overflow-x: hidden;background-color: #fff;">
      <div class="groupList_title S28">
        群主、管理员({{admin.length}}人)
      </div>
      <div class="groupList_item noBorder S28" v-for="(el, index) in admin" :key="index + '1'" @click="checkDetais('1', el)">
        <img :src="el.userHead" alt="">
        <span class="hint S24">群主</span>
        <span class="hint S24" v-if="(el.levelCode - 0) > 0">{{el.levelName}}</span>
        <p>{{el.nickName}}</p>
      </div>
      <div class="groupList_title S28">
        群成员({{groupMemberList.length}}人)
      </div>
      <div class="groupList_item S28" v-for="(el, index) in groupMemberList" :key="index" @click="checkDetais('2', el)">
        <img :src="el.userHead" alt="">
        <span class="hint S24" v-if="(el.levelCode - 0) > 0">{{el.levelName}}</span>
        <p>{{el.nickName}}</p>
        <span class="hint details S24" v-show="el.auditStatus === '1'">配对审核中</span>
      </div>
    </div>
    <Actionsheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
    />
  </div>
</template>
<script>
import { NavBar, Actionsheet, Dialog, Toast} from 'vant'
import { mapGetters , mapActions} from 'vuex'
import { exitGroup } from '@/assets/common/api'
export default {
  components: {
    NavBar,
    Actionsheet
  },
  computed: {
    ...mapGetters(['memberList','admin','groupMemberList'])
  },
  data () {
    return {
      show: false, // 上拉框是否显示
      actions: [{
        name: '活动详情'
      }]
    }
  },
  mounted () {
    // 获取好友列表
    this.getGroupMembers()
    if(this.admin[0].userId === this.$store.state.IM.user.id){
      this.actions.unshift({
        name: '报名列表'
      })
    } else {
      this.actions.push({
        name: '退出群组'
      })
    }
  },
  methods: {
    ...mapActions(['getGroupMembers']),
    onSelect (item) {
      this.show = false
      if(item.name === '报名列表') {
        this.$router.push({name: 'Election'})
      } else if(item.name === '活动详情') {
        this.$router.push({name: 'activityDetails', query: {massSelectionId: localStorage.getItem('massSelectionId')}})
      } else if(item.name === '退出群组'){
         Dialog.confirm({
            message: '确定退出群组吗？'
          }).then(() => {
            exitGroup({
              userId: this.$store.state.IM.user.id,
              massSelectionId: localStorage.getItem('massSelectionId')
            }).then(() => {
              Toast({
                message: '退出群组成功',
                duration: 2000
              })
              this.$router.push({name: 'Auditions'})
            })
            
          });
      }
    },
    onClickLeft () {
      this.$router.back()
    },
    checkDetais (type, el) {
      if(type === '2') {
        if(this.admin[0].userId !== this.$store.state.IM.user.id){
          return false
        }
      }
      this.$store.state.IM.friend = el
      this.$router.push({name: 'userDetail', query:{type: '2' , match: type === '1'? false :true, massSelectionId: localStorage.getItem('massSelectionId')}})
    }
  }
}
</script>

<style scoped>
.pairing{
  display: block;
  height: 1.28rem;
  line-height: 1.28rem;
  background-color: #f44;
  padding: 0 .11rem;
  color: #fff;
}
.check{
  display: block;
  background-image: url('../../assets/images/更多.png');
  background-repeat: no-repeat;
  background-size: 100%;
  width: .4rem;
  height: .4rem;
  transform: translate(0, -50%);
}
.groupList_title{
  height: .6rem;
  line-height: .6rem;
  font-size: .27rem;
  color: #8b8b8b;
  padding: 0 .3rem;
  background-color: #f0f0f0;
  text-align: left
}
.groupList_item{
  height: 1.28rem;
  line-height: 1.28rem;
  background-color: #fff;
  padding: 0 .3rem;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
}
.groupList_item.noBorder{
  border-bottom: none
}

.groupList_item img{
  display: inline-block;
  width: .92rem;
  height: .92rem;
  border-radius: 50%;
  margin-right: .2rem;
  vertical-align: middle;
}

.groupList_item .hint{
  padding: .05rem .1rem;
  background-color: #ff7997;
  color: #fff;
  font-size: .18rem;
  line-height: .18rem;
  margin-right: .2rem;
  border-radius: .02rem
}
.groupList_item .hint.details{
  background-color: #ccc;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  padding: .1rem;
}

.groupList_item p{
  display: inline-block;
  margin: 0;
  color: #8d8d8d;
  white-space: nowrap;
  max-width: 2.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}
</style>
