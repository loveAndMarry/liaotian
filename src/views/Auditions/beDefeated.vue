<template>
  <div class="successContent" :style="{'background-image': 'url(' + item.pairUserHead + ')'}">
    <div style="height: 100%;background-color: rgba(0,0,0,.7);">
      <NavBar left-arrow @click-left="onClickLeft" :border="false"/>
      <div style="height: calc(100% - 46px);overflow-y: scroll;overflow-x: hidden">
        <div class="img_group">
          <img :src="item.userHead" alt="">
        </div>
        <p class="success_title">对方拒绝了你的邀请</p>
        <div style="padding: .6rem;margin-top: 5rem;">
          <Button round type="danger" @click="$router.push({name: 'MatchSearch', query: {id: item.id}})">重新发起匹配</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { NavBar , Button} from 'vant'
export default {
  components: {
    NavBar,
    Button
  },
  data () {
    return {
      item: {},
    }
  },
  mounted () {
    this.item = this.$route.query.el;
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>
<style scoped>
.van-button {
  width: 100%;
  background-color: #fc7093;
  border-color: #fc7093
}
.success_title{
  margin-top: .7rem;
  margin-bottom: 0;
  font-size: .28rem;
  color: #fefefe;
  text-align: center
}
.success_hint{
  font-size: .86rem;
  color: #fc7093;
  margin-bottom: 0;
  margin-top: 1.66rem

}
.successContent{
  background-repeat: no-repeat;
  background-size: auto 100%
}

.van-nav-bar{
  background-color: transparent
}
.img_group {
  position: relative;
  margin-top: 1.12rem
}

.img_group img{
  width: 2.67rem;
  height: 2.67rem;
  border: 1px solid #fbfbfb;
  border-radius: 50%
}
</style>
