<template>
  <div style="padding: 0 .3rem;box-sizing: border-box;position: relative;padding: .2rem 0;background-color: #fff;">
      <div class="left">
        <div :style="{backgroundImage: 'url(' + imgUrl + ')'}"></div>
        <span></span>
      </div>
      <div class="right">
        <div class="title S28">{{title}}<span class="sanjiao S24" v-if="isRight" @click="RightClick">{{rightTitle}}</span></div>
        <div><slot></slot></div>
      </div>
  </div>
</template>
<script>
export default {
  props: {
    title: '',
    rightTitle: '',
    isRight: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    RightClick () {
      this.$emit('confirm')
    }
  },
  computed: {
    imgUrl () {
      switch (this.title){
        case '最近访客':
          return require('../assets/images/data_visitors@2x.png')
          break
        case '自我介绍':
          return require('../assets/images/data_self@2x.png')
          break
         case '择偶意向':
          return require('../assets/images/data_mate_selection@2x.png')
          break
         case '兴趣爱好':
          return require('../assets/images/data_interest@2x.png')
          break
        case '基本资料':
          return require('../assets/images/personal_data@2x.png')
          break
        case '小档案':
          return require('../assets/images/record@2x.png')
          break
      } 
    }
  }
}
</script>

<style scoped>
.left{
    display: inline-block;
    height: 100%;
    position: absolute;
    left: .3rem;
}
.left div{
  width: .4rem;
  height: .4rem;
  margin-bottom: .1rem;
  background-repeat: no-repeat;
  background-size: 100%;
}
.left span{
    display: block;
    width: 0;
    height: calc(100% - .8rem);
    border-right: 1px solid #d7d7d7;
    margin-left: .18rem;
}
.right{
  display: inline-block;
  width: calc(100% - 1.4rem);
  margin-left: .8rem;
  text-align: left
}
.right .title{
  text-align: left;
  color: #313131;
  font-size: .28rem;
}
.sanjiao{
  font-size: .23rem;
  color: #8d8d8d;
  float: right;
}
.sanjiao::after{
  content: "";
  display: inline-block;
  height: .15rem;
  width: .15rem;
  border: 1px solid #8e8e8e;
  border-left: transparent;
  border-top: transparent;
  transform: rotate(45deg);
  margin-left: .1rem;
  vertical-align: 0.03rem;
}
</style>
