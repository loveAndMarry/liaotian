<template>
  <div>
    <NavBar left-arrow title="发起匹配" @click-left="onClickLeft"/>
    <div style="height: calc(100% - 46px);overflow-y: scroll;overflow-x: hidden;background-color: #fff;">
      <div class="input_group">
        <input type="text" placeholder="请输入您要匹配的用户ID" @input="matchSearch" v-model="content">
      </div>
      <div class="member_list">
        <div 
        v-for="(el, index) in List"
        :key="index"
        style="padding: .2rem 0;border-bottom: 1px solid #f0f0f0;" 
        @click="$router.push({name: 'Match', query: {el : el}})">
          <div class="member">
            <img :src="el.userHead" alt="">
            <span>{{el.nickName}}</span>
            <p>{{el.personalIntroduction || '他还没有完善个人简介...'}}</p>
          </div>
        </div>
        <div v-show="List.length === 0" style="text-align: center;">当前没有搜索结果</div>
      </div>
    </div>
  </div>
</template>
<script>
import { NavBar , CellGroup} from 'vant'
import { listMassSelectionMembeByUserNoLike } from '@/assets/common/api'
export default {
  components: {
    NavBar,
    CellGroup
  },
  data () {
    return {
      content: '',
      List: []
    }
  },
  methods: {
    matchSearch () {
      if (this.content.length >= 6) {
        listMassSelectionMembeByUserNoLike({
          userNo: this.content,
          massSelectionId: localStorage.getItem('massSelectionId'),
          limitStart: 0,
          pageSize: 2
        }).then(res => {
          if(res.data && res.data.length > 0){
            this.List = res.data
          } else {
             this.List = []
          }
        })
      }
    },
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.input_group{
  padding: .2rem .45rem .32rem;
  box-sizing: border-box;
  box-sizing: -webkit-border-box;
}
.input_group input{
  border: 1px solid #f1f1f1;
  width: calc(100% - 2px);
  height: .78rem;
  border-radius: .1rem;
  padding-left: .19rem 
}
.input_group input::-webkit-input-placeholder {
    color: #d4d4d4;
}
.member_list{
  padding: 0 .3rem;
  text-align: left;
}
.member{
  position: relative;
  overflow: hidden;
  padding-left: 1.13rem;
}
.member img{
  width: .9rem;
  height: .9rem;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
.member>span{
  font-size: .23rem;
  color: #393939;
  margin-bottom: .15rem;
  display: inline-block;
}
.member p{
  margin: 0;
  font-size: .2rem;
  color: #2a2a2a;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  height: .55rem
}
</style>
