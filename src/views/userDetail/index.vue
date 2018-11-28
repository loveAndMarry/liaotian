<template>
  <div class="userDetail">
    <NavBar title='个人信息' @click-left="onClickLeft" left-arrow></NavBar>
    <div class="userDetail_content" id="userDetail_content">
       <div class="title">
      <div class="left">
        <div class="top">
          <div class="name">{{item.userName}}
            <span>实名</span>
          </div>
        </div>
        <div class="message">
          <p v-text="`${item.Height}岁`"></p>
          <i>|</i>
          <p v-text="`${item.height}cm`"></p>
          <i>|</i>
          <p v-text="item.education"></p>
          <i>|</i>
          <p v-text="item.income"></p>
        </div>
        <div class="address" v-text="item.manifesto"></div>
      </div>
      <div class="right">
        <img :src="item.portrait" alt="">
      </div>
      <div class="bottom">
        <ul class="img_group">
          <li><img :src="item.portrait" alt=""></li>
          <li><img :src="item.portrait" alt=""></li>
          <li><img :src="item.portrait" alt=""></li>
          <li><img :src="item.portrait" alt=""></li>
          <li><img :src="item.portrait" alt=""></li>
          <li><img :src="item.portrait" alt=""></li>
          <li class="photograph">
            <div>
              <img src="../../assets/images/user_photo_upload@2x.png" alt="">
              <p>上传图片</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Group title="个人介绍">
      <p style="color:#858585;font-size:.19rem;line-heigin:.23rem">赶尽杀绝反过来看时间过来看时间反馈了赶紧离开结果告诉对方公司离开对方过后就开始更健康来看时间反馈了</p>
    </Group>
    <Group title="认证">
      <div class="authentication">
        <div class="real_name">
          <div></div>
          <p>实名认证</p>
        </div>
        <div class="phone">
          <div></div>
          <p>手机认证</p>
        </div>
      </div>
    </Group>
    <Group title="基本资料">
      <div class="list_item" v-for="el in 10" :key='el'>
        <div class="label">ID:</div>
        <div class="context">复活甲安徽省</div>
      </div>
    </Group>
     <Group title="兴趣爱好">
       <div class="hint_group">
        <span class="hint rad">热爱读书</span>
        <span class="hint">地方的</span>
        <span class="hint rad">发的</span>
        <span class="hint">打发放发的</span>
        <span class="hint">电风扇</span>
        <span class="hint rad">说的</span>
        <span class="hint">阿道夫</span>
        <span class="hint">阿萨</span>
       </div>
    </Group>
    <Group title="高级资料">
      <div class="list_item" v-for="el in 10" :key='el'>
        <div class="label">ID:</div>
        <div class="context">复活甲安徽省</div>
      </div>
    </Group>
    <Group title="礼物">
      <a href="" class="gift">赠送礼物</a>
      <div class="default hide">
        <p>ta未收到礼物,</p>
        <p>成为第一个送ta礼物的人吧！</p>
      </div>
    </Group>
    <MaritalStatus title='年龄' :show='true' v-model="MaritalStatus" name='maritalStatus'></MaritalStatus>
    </div>
  </div>
</template>
<script>

import { NavBar } from 'vant'
import Vue from 'vue';
import Group from '@/components/Group'
import MaritalStatus from '@/components/options/Address'

export default {
  data () {
    return {
      MaritalStatus: ["2" , '-1'],
      item: {
          id:1,
          userName: '测试',
          theRealNameSystem: true,
          age: '25',
          height: '165',
          education: '本科',
          income: '5000-10000',
          tag: ['身材苗条', '旅游', '投资理财'],
          manifesto: '爱情就应该是一辈子',
          portrait: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542709648746&di=05469704ed6e2a01394165a458e93773&imgtype=0&src=http%3A%2F%2Fimg.52z.com%2Fupload%2Fnews%2Fimage%2F20180416%2F20180416051754_47848.jpg',
          praise:8
        }
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push({path: '/view/home'})
    },
    showConnection () {
      var scrollTop = document.getElementById('userDetail_content').scrollTop || document.getElementById('userDetail_content').scrollTop
      console.log(scrollTop)
    }
  },
  mounted () {
    document.getElementById('userDetail_content').addEventListener('scroll', this.showConnection)
  },
  destroyed () {
     document.getElementById('userDetail_content').removeEventListener('scroll', this.showConnection)
  },
  watch: {
    MaritalStatus (val) {
      console.log('数据发生改变了123', val)
    }
  },
  components: {
    NavBar,
    Group,
    MaritalStatus
  }
}
</script>
<style scoped>
.photograph{
  border: 1px dashed;
  text-align: center;
  position: relative;
}
.photograph div{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center
}
.img_group .photograph div img{
  width: .5rem;
  height: .5rem;
  display: inline-block
}
.photograph div p{
  font-size: .19rem;
  color: #818181;
  margin: 0;
  white-space: nowrap;
}
.default{
  font-size: .23rem;
  color: #939393;
  line-height: .29rem;
  margin-top:.25rem
}
.default p{
  margin:0
}
.gift{
  position: absolute;
  top: -.6rem;
  right: 0;
  font-size: .23rem;
  color:#fe5c8d
}
.hint_group{
  margin-top: .2rem;
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
}
.hint{
  padding: .07rem .15rem;
  text-align: center;
  font-size: .23rem;
  border:1px solid #d9d9d9;
  color:#858585;
  border-radius: .3rem;
  margin-right: .15rem;
  margin-bottom: .2rem
}
.hint.rad{
  color: #fd7194
}
.userDetail_content{
  position: relative;
  top: 0;
  height: calc( 100% - 46px);
  left: 0;
  overflow-y: scroll;
  overflow-x: hidden
}
.list_item{
  margin-top: .3rem;
  font-size: .23rem;
  color: #8c8c8c;
  overflow: hidden
}
.list_item .label, .list_item .context{
  width: 50%;
  text-align: left;
  float: left;
}
.authentication{
  display: flex;
  display: -webkit-flex;
  justify-content:space-around;
  -webkit-justify-content:space-around;
  margin-top: .2rem;
  text-align: center
}
.authentication .real_name div, .authentication .phone div{
  width:.8rem;
  height:.8rem;
  display: inline-block;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: 100%
}
.authentication .real_name div{
  background-image: url('../../assets/images/real_name@2x.png')
}
.authentication .phone div{
  background-image: url('../../assets/images/phone@2x.png')
}
.authentication p{
  display: block;
  font-size: .23rem;
  color:#858585;
  padding-top:.1rem;
  padding-bottom: 0
}
.userDetail{
  text-align: left;
}
.title{
  border-bottom: .1rem solid #f0f0f0;
  background: #fff;
  padding: .6rem .3rem .2rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  color:#918d8c;
  overflow: hidden;
}
.left{
  width: calc(100% - 1.8rem);
  float: left;
  padding-left:.2rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.top{
  margin-top:.25rem;
  height: .55rem;
}
.top .name{
  float: left;
  font-size: .3rem;
  color:#313131;
}
.top .name span{
  width: .54rem;
  height: .3rem;
  display: inline-block;
  border-radius: .02rem;
  background-color: #33c1ff;
  color: #fff;
  font-size: .18rem;
  margin-left:.1rem;
  text-align: center
}
.top .praise{
  float: right;
  font-size: .23rem;
  line-height: .3rem;
  color:#fe7996;
  margin-top: .03rem;
}
.top .praise span{
  display: inline-block;
  width: .3rem;
  height:.3rem;
  background-image: url('../../../static/images/like_btn@2x.png');
  background-repeat: no-repeat;
  background-size: 100%;
  margin-right: .1rem;
  vertical-align: top;
}

.message{
  font-size: .26rem;
  line-height: .26rem;
  overflow: hidden;
}
.message i, .message p{
  display: inline-block;
  float: left;
  margin:0
}
.message i{
  display: inline-block;
  margin: 0 .1rem
}

.address{
  margin-top: .2rem
}

.right{
  width: 1.8rem;
  float: right;
}
.right img{
  display: inline-block;
  width: 1.6rem;
  border-radius: 50%
}
.img_group{
  display: block;
  margin-top: 2rem;
  overflow: hidden;
}
.img_group li {
  display: inline-block;
  width: 1.44rem;
  height: 1.44rem;
  border-radius: .1rem;
  overflow: hidden;
  margin-right: .1rem;
  margin-bottom: .1rem;
  float: left;
}
.img_group li img{
  width: 100%;
  height: 100%
}
</style>
