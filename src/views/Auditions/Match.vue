<template>
  <div>
    <NavBar left-arrow title="发起匹配" @click-left="onClickLeft"/>
    <div style="height: calc(100% - 46px);overflow-y: scroll;overflow-x: hidden;background-color: #fff;">
      <div class="input_group">
        <input type="text" placeholder="请输入您要匹配的用户ID">
      </div>
      <div class="member_list">
        <div style="padding: .2rem 0;border-bottom: 1px solid #f0f0f0;">
          <div class="member">
            <img src="https://avatar.csdn.net/6/B/F/3_diwuyanting.jpg" alt="">
            <span>棉花糖</span>
            <p>发就发的哈空间和发掘客户反馈举案说法金卡是房间卡是否就卡死的房间卡收到货房间卡收到货房间卡时代峰峻卡萨丁大姐夫哈师大加咖啡金卡哈吉克</p>
          </div>
        </div>
        <div style="padding: .2rem 0;border-bottom: 1px solid #f0f0f0;">
          <div class="member">
            <img src="https://avatar.csdn.net/6/B/F/3_diwuyanting.jpg" alt="">
            <span>棉花糖</span>
            <p>发就发的哈空间和发掘客户反馈举案说法金卡是房间卡是否就卡死的房间卡收到货房间卡收到货房间卡时代峰峻卡萨丁大姐夫哈师大加咖啡金卡哈吉克</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { NavBar , CellGroup} from 'vant'
export default {
  components: {
    NavBar,
    CellGroup
  },
  methods: {
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
}
</style>
