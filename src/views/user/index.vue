<template>
  <div>
    <div class="group">
      <div class="title">{{title}}<span class="shezhi"></span></div>
      <div class="datum">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543818255721&di=51495d9fe940bd0af1387f8d9a5aa2b1&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20180824%2F00%2F1535043586-qUhCMARpvY.jpg" alt="">
        <div class="datum_content">
          <div>
            资料完善度50%
            <span class="sanjiao" @click="detailsClick">资料</span>
          </div>
          <div>
            信用度<strong>98</strong>分 <span class="credit">提高信用度</span>
          </div>
        </div>
      </div>
      <ul class="photos">
          <li class="photograph">
            <div>
              <img src="../../assets/images/user_photo_upload@2x.png" alt="">
              <p>上传图片</p>
            </div>
          </li>
          <li class="photo_item">
            <img src="http://image.biaobaiju.com/uploads/20180508/11/1525751142-GXLJjxcoyY.jpg" alt="">
          </li>
          <li class="photo_item">
            
          </li>
          <li class="photo_item">
            
          </li>
          <li class="photo_more"><span class="sanjiao">相册</span></li>
      </ul>
      <ul class="links">
        <li>
            <img src="http://image.biaobaiju.com/uploads/20180508/11/1525751142-GXLJjxcoyY.jpg" alt="">
            <p>谁看过我</p>
        </li>
        <li>
            <img src="http://image.biaobaiju.com/uploads/20180508/11/1525751142-GXLJjxcoyY.jpg" alt="">
            <p>谁看过我</p>
        </li>
        <li>
            <img src="http://image.biaobaiju.com/uploads/20180508/11/1525751142-GXLJjxcoyY.jpg" alt="">
            <p>谁看过我</p>
        </li>
        <li>
            <img src="http://image.biaobaiju.com/uploads/20180508/11/1525751142-GXLJjxcoyY.jpg" alt="">
            <p>谁看过我</p>
        </li>
      </ul>
    </div>
    <Group title="会员服务">
      <ul class="links" style="margin-top: 0.15rem">
        <li>
            <span class="link_img"></span>
            <p>高级会员</p>
        </li>
        <li>
             <span class="link_img"></span>
            <p>水晶会员</p>
        </li>
        <li>
             <span class="link_img"></span>
            <p>金至尊牵线</p>
        </li>
        <li>
             <span class="link_img"></span>
            <p>相互喜欢</p>
        </li>
      </ul>
    </Group>
     <Group title="我的认证">
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
     <div class="group">
       <ul class="lists">
         <li>我的动态<span class="sanjiao"></span></li>
         <li>我的订单<span class="sanjiao"></span></li>
       </ul>
     </div>
  </div>
</template>
<script>
import Group from '@/components/Group'
export default {
  data () {
    return {
      title: '测试'
    }
  },
  methods: {
    detailsClick () {
      this.$router.push({name: 'userDetails'})
    }
  },
  components: {
    Group
  }
}
</script>

<style scoped>
.lists{
  width: 100%
}
.lists li{
  height: .9rem;
  border-bottom: 1px solid #f4f4f4;
  font-size: .27rem;
  color: #323232;
  line-height: .9rem;
  text-align: left
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
  padding-bottom: 0;
  margin: 0
}
.links{
  display: flex;
  justify-content: space-between;
  text-align: center;
  padding: 0 .2rem;
}
.links .link_img{
  display: inline-block;
  width: .66rem;
  height: .66rem;
  border-radius: 50%;
  display: inline-block;
  background-size: 100%;
  background-repeat: no-repeat
}
.links li:nth-child(1) .link_img{
  background-image: url('../../assets/images/senior_member@2x.png')
}
.links li:nth-child(2) .link_img{
  background-image: url('../../assets/images/crystal_member@2x.png')
}
.links li:nth-child(3) .link_img{
  background-image: url('../../assets/images/gold_member@2x.png')
}
.links li:nth-child(4) .link_img{
  background-image: url('../../assets/images/diamond_member@2x.png')
}

.links li img{
  max-width: .64rem;
  max-height: .64rem;
  border-radius: 50%;
  display: inline-block
}
.links li p{
  font-size: .23rem;
  color: #818181;
  margin: 0;
  white-space: nowrap;
}
.photos{
  text-align: left;
  padding: .4rem 0;
  overflow: hidden;
  position: relative;
}
.photo_more{
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
}
.photos li{
  border-radius: .15rem;
  margin-right: .05rem;
  overflow: hidden;
  float: left;
}
.photos .photo_item{
  width: 1.44rem;
  height: 1.44rem;
  background-color: #dddddd;
  background-image: url('../../assets/images/user_photo_add@2x.png');
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: 50%

}
.photos .photo_item img{
  max-width: 100%;
  max-height: 100%
}
.photograph{
  width: 1.44rem;
  height: 1.44rem;
  border: 1px dashed #d7d7d7;
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
.photograph div img{
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
.group{
  padding: 0 .3rem;
  background-color: #fff;
  border-bottom: .1rem solid #f0f0f0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  padding-bottom: .32rem
}
  .title{
    position: relative;
    color:#323232;
    font-size: .28rem;
    line-height: .88rem;
    height: .88rem;
    text-align: center
  }
  .title .shezhi{
    width: .38rem;
    height: .4rem;
    display: block;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    background-size: 100%;
    background-image: url('../../assets/images/user_set@2x.png')
  }
  .sanjiao{
  font-size: .28rem;
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
  transform: rotate(-45deg)
}
.datum{
  overflow: hidden;
}
.datum img{
  display: block;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  float: left;
}
.datum_content{
  padding-left: .4rem;
  width: calc( 100% - 2rem);
  color: #8d8d8d;
  font-size: .27rem;
  line-height: .67rem;
  padding: .11rem 0 .15rem 0;
  display: inline-block;
  text-align: left
}
.credit{
  border: 1px solid #d8d8d8;
  color: #35c0ff;
  padding: .08rem .1rem;
  font-size: .2rem

}
.datum_content strong{
  color: #35c0ff;
  font-weight: 500;
}
</style>
