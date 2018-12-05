<template>
  <div>
    <NavBar
    left-arrow
    @click-left="onClickLeft" title="我的相册"/>
    <ul class="photos">
       <li class="photograph">
            <div>
              <img src="../../assets/images/user_photo_upload@2x.png" alt=""> 
              <p>上传图片</p>
            </div>
        </li>
        <li v-for="(el, index) in 8" :key="index" class="photo_item"><img 
        @touchstart.native="showDeleteButton(item.id)" @touchend.native="clearLoop(item.id)"
        src="http://image.biaobaiju.com/uploads/20180508/11/1525751142-GXLJjxcoyY.jpg" alt="" v-if="index === 0" @click="imageClick"/></li>
    </ul>
  </div>
</template>
<script>
import { NavBar, ImagePreview  } from "vant"
export default {
  data () {
    return {
      value: '',
      Loop: null
    }
  },
  components: {
    NavBar
  },
  methods: {
    onClickLeft () {},
    imageClick () {
      ImagePreview({
        images: [
          'http://image.biaobaiju.com/uploads/20180508/11/1525751142-GXLJjxcoyY.jpg'
        ],
        startPosition: 0,
      })
    },
    showDeleteButton(e) {
      clearTimeout(this.Loop); //再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(function() {
        // this.$dialog.confirm({   //这是个弹出框，用的ydui
        //   title: '温馨提示',
        //   mes: '是否删除此条消息',
        //   opts: () => {
        //     this.$dialog.loading.open('删除中...');
        //     this.$http.post(this.$store.state.ip + '...', {
        //       id: e
        //     }, {
        //         headers: {},
        //     }).then((response) => {
        //       this.$dialog.loading.close();
        //         this.$dialog.toast({
        //           mes: response.body.info,
        //           timeout: 1000
        //         });
        //         var data = this.rulist
        //         console.log(data)
        //         for(var i in data) {
        //           if(data[i].id == e) {
        //             data.splice(i, 1)
        //           }
        //         }
        //         console.log(data)
        //         this.rulist=data
        //         }).catch(function(response) {
    
        //         });
        //       }
        // });
        console.log("长按")
      }.bind(this), 1000);
    },
    clearLoop(e) {
      clearTimeout(this.Loop)
    }
  }
}
</script>
<style scoped>
.photos{
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  justify-content:space-evenly
}
.photos li{
  width: 2.38rem;
  height: 2.38rem;
  border-radius: .15rem;
  margin-bottom: .1rem;
  overflow: hidden;
  float: left;
}
.photos .photo_item{
  width: 2.38rem;
  height: 2.38rem;
  background-color: #dddddd;
  background-image: url('../../assets/images/user_photo_add@2x.png');
  background-size: 40%;
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
  width: .8rem;
  height: .8rem;
  display: inline-block
}
.photograph div p{
  font-size: .28rem;
  color: #818181;
  margin: 0;
  white-space: nowrap;
}
</style>
