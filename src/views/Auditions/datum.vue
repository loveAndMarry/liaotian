<template>
  <div>
    <NavBar left-arrow @click-left="onClickLeft" title="资料"/>
    <div class="datum_content">
      <img src="http://yuanimg.minmai1688.com/icon_20190102092733" alt="">
      <div>
        <span style="margin-right: .25rem;color: #8d8d8d">啊啊啊啊</span>
        <Tag style="background-color: #ff7997">水晶会员</Tag>
      </div>
      <p class="context">哈撒给哈撒给很骄傲和科技感哈萨克的积分哈吉斯款到发货金卡是房间卡号房间卡很快就发哈会计法奥斯卡积分哈吉克倒海翻江爱德华福建安徽交付，安居客的股份手机卡更多发挥进口法国火炬大厦回家啊办法哈德公司法，附近哈刚放寒假噶的家伙是法国哈几个符号兼爱非攻看哈建国饭店</p>
      <div>
        <span class="button default">拒绝</span>
        <sapn class="button confirm">同意</sapn>
      </div>
    </div>
  </div>
</template>
<script>
import { NavBar, Tag ,Button} from 'vant'
export default {
  components: {
    NavBar,
    Tag,
    Button
  },
  methods: {
    onClickLeft () {

    }
  }
}
</script>

<style scoped>
.button{
  padding: .18rem .94rem;
  font-size: .34rem;
  color: #fff;
  text-align: center;
  border-radius: .5rem;
  display: inline-block;
}
.default{
  background-color: #d8d8d8;
  margin-right: 1.09rem
}
.confirm{
  background-color: #ff6f93
}
.context{
  line-height: .3rem;
  font-size: .24rem;
  color: #323232;
  margin-top: .36rem;
  margin-bottom: 1.59rem;
  text-align: left
}
.datum_content{
  border-top: .16rem solid #f0f0f0;
  height: calc( 100% - 46px );
  background-color: #fff;
  padding: 0 .3rem;
  box-sizing: border-box;
  box-sizing: -webkit-border-box;
}
.datum_content img{
  display: block;
  width: 1.51rem;
  height: 1.51rem;
  border-radius: 50%;
  margin: .38rem auto .24rem
}
</style>
