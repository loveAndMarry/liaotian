<template>
  <div style="background-color: #fff">
    <!-- 头像 -->
    <div class="img_title">
      <img :src="data.picture" alt="">
    </div>
    <!-- 活动简介 -->
    <div class="intro_group">
      <h5 class="intro_group_title S30">活动简介</h5>
      <p class="intro_group_context S28">{{content}}</p>
    </div>
    <!-- 发起人简介 -->
    <div class="intro_group">
      <h5 class="intro_group_title S30">发起人简介</h5>
      <p class="intro_group_context S28">{{data.personalIntroduction}}</p>
    </div>
    <!-- 参选要求 -->
    <div class="intro_group">
      <h5 class="intro_group_title S30">参选要求</h5>
      <div class="intro_group_content S28">
        <span class="title">居住地</span>
        <span class="content">{{data.intentionDomicile}}</span>
      </div>
      <div class="intro_group_content S28">
        <span class="title">身高</span>
        <span class="content">{{data.intentionHeight}}</span>
      </div>
      <div class="intro_group_content S28">
        <span class="title">月收入</span>
        <span class="content">{{data.intentionIncome}}</span>
      </div>
      <div class="intro_group_content S28">
        <span class="title">学历</span>
        <span class="content">{{data.intentionEducation}}</span>
      </div>
      <div class="intro_group_content S28">
        <span class="title">年龄</span>
        <span class="content">{{data.intentionAge}}</span>
      </div>
      <div class="intro_group_content S28">
        <span class="title">婚姻状况</span>
        <span class="content">{{data.intentionMaritalStatus || '不限'}}</span>
      </div>
      <div class="intro_group_content S28">
        <span class="title">子女状况</span>
        <span class="content">{{data.intentionChildrenSituation || '不限'}}</span>
      </div>
      <div class="intro_group_content S28">
        <span class="title">购房状况</span>
        <span class="content">{{data.intentionHouseSituation || '不限'}}</span>
      </div>
      <div class="intro_group_content S28">
        <span class="title">购车状况</span>
        <span class="content">{{data.intentionCarSituation || '不限'}}</span>
      </div>
    </div>
    <!-- 参赛时间 -->
    <div class="intro_group">
      <h5 class="intro_group_title S30">参赛时间</h5>
      <p class="intro_group_context S28">{{data.startTime}}  至  {{data.endTime}}</p>
    </div>
    <!-- 发起金额 -->
    <div class="intro_group">
      <h5 class="intro_group_title S30">发起金额</h5>
      <p class="intro_group_context S28"> {{data.initiatingAmountY + '元'}}</p>
    </div>
  </div>
</template>
<script>
import utils from '@/assets/common/utils'
export default {
  props: ['data'],
  computed: {
    content () {
      return  utils.uncodeUtf16(this.data.content)
    }
  }
}
</script>

<style scoped>
.img_title{
  padding: .2rem 0
}
.img_title img{
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 50%;
}
.intro_group{
  padding: 0 .3rem .1rem;
  box-sizing: border-box;
  box-sizing: -webkit-border-box;
  text-align: left;
  color: #000
}
.intro_group_title{
  margin: 0;
  line-height: .59rem;
  font-size: .32rem;
  font-weight: 500;
}
.intro_group_context{
  margin: 0;
  font-size: .24rem;
  line-height: .29rem
}
.intro_group_content {
  overflow: hidden;
  padding: .1rem 0;
  font-size: .28rem 
}
.intro_group_content .title{
  float: left;
}
.intro_group_content .content{
  float: right;
}
</style>
