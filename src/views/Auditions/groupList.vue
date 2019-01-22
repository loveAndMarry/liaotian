<template>
  <div>
    <NavBar left-arrow title="参选成员" @click-left="onClickLeft">
      <i class="check" v-if="admin[0].userId === $store.state.IM.user.id" slot="right" @click="$router.push({name: 'check'})"/>
    </NavBar>
    <div style="height: calc(100% - 46px);overflow-y: scroll;overflow-x: hidden;background-color: #fff;">
      <div class="groupList_title">
        群主、管理员({{admin.length}}人)
      </div>
      <div class="groupList_item noBorder" v-for="(el, index) in admin" :key="index">
        <img :src="el.userHead" alt="">
        <span class="hint">群主</span>
        <span class="hint" v-if="(el.levelCode - 0) > 0">{{el.levelName}}</span>
        <p>{{el.nickName}}</p>
      </div>
      <div class="groupList_title">
        群成员({{groupMemberList.length}}人)
      </div>
      <div class="groupList_item" v-for="(el, index) in groupMemberList" :key="index">
        <img :src="el.userHead" alt="">
        <span class="hint" v-if="(el.levelCode - 0) > 0">{{el.levelName}}</span>
        <p>{{el.nickName}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { NavBar } from 'vant'
import { mapGetters , mapActions} from 'vuex'
export default {
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(['memberList','admin','groupMemberList'])
  },
  mounted () {
    // 获取好友列表
    this.getGroupMembers()
  },
  methods: {
    ...mapActions(['getGroupMembers']),
    onClickLeft () {
      this.$router.back()
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
  border-bottom: 1px solid #f0f0f0
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
.groupList_item p{
  display: inline-block;
  margin: 0;
  color: #8d8d8d;
}
</style>
