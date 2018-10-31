<template>
    <div class="group" @click="showExchange">
        <div class="item_img" :style="{ backgroundImage: 'url(' + item.imgUrl + ')'}"></div>
        <div class="item_content">
          <div class="item_content_user">
            <p><b>{{ item.nickName }}</b>油团团·招聘主管</p>
            <p style="float:right">19:23</p>
          </div>
          <div class="item_content_info">
            <p></p>
            <i v-text="item.hint" v-show="item.hint !== 0"></i>
          </div>
        </div>
    </div>
</template>

<script>
import utils from '@/common/utils'
export default {
  props: ['item'],
  data () {
    return {}
  },
  methods: {
    showExchange () {
      console.log('点击')
      // 点击传值
      console.log(this.item, '点击完成后传值')
      localStorage.setItem('friendUserName', this.item.username)
      localStorage.setItem('friendImg', this.item.imgUrl)
      utils.setStorage('friendsList', this.item.username, 2) // 设置当前好友的未读条数为0
      this.$store.dispatch('getFriendsList') // 触发当前获取好友列表的dispatch
      this.$router.push({path: '/exchange', query: {nickName: this.item.nickName, username: this.item.username}})
    }
  }
}
</script>

<style lang="css" scoped>
  p{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin: 0;
    color: #aaaaaa;
    font-size: .23rem;
  }
  .group{
    width: 100%;
    margin-top: .45rem;
    overflow: hidden;
    text-align: left
  }
  .item_img{
    width:1rem;
    height: 1rem;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 50%;
    float: left;
  }
  .item_content{
    float: left;
    width: calc( 100% - 1rem);
    padding-left: .25rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .item_content_user p{
    display: inline-block;
  }
  .item_content_user p b{
    font-size: .29rem;
    color: #333333;
    margin-right: .16rem;
  }
  .item_content_info{
    margin-top: .2rem;
    position: relative;
  }
  .item_content_info p{
    width: calc(100% - .5rem);
  }
  .item_content_info i{
    display: block;
    width: .3rem;
    height: .3rem;
    background-color: #f33333;
    color:#fff;
    line-height: .3rem;
    font-size: .14rem;
    text-align: center;
    position: absolute;
    right: 0;
    bottom: .05rem;
    border-radius: 50%;
    font-style: inherit;
  }
</style>
