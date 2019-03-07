<template>
<div>
  <NavBar title="通讯录好友" left-arrow @click-left="onLeftClick"></NavBar>
  <div id="list" v-if="isShow">
    <ul class="list_user" ref="listuser">
      <li v-for="(item, key, index) in AddressBookList" :key="index">
        <p>{{key}}</p>
        <ul>
          <li v-for="el in item" class="list_item">
            <strong>{{el.name}}</strong>
            <span @click="invite(el)">邀请</span>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="list_index" ref="listIndex">
      <li @touchstart="setScroll" v-for="item in userIndex">{{item}}</li>
    </ul>
  </div>
</div>
</template>
<script>
import Vuex from "vuex";
import { NavBar, Toast } from "vant";
import pinyin from 'pinyin'
import { userMailList , invitationSMS} from '@/assets/common/api'

export default {
  data: function() {
    return {
      AddressBookList: {},
      isShow: false
    };
  },
  components: {
    NavBar
  },
  computed: {
    userIndex: function() {
      return Object.keys(this.AddressBookList)
    }
  },
  mounted () {
    let str = this.$route.query.str
    userMailList({
      list: JSON.parse(str),
      userId: this.$store.state.IM.user.id
    }).then(res => {
      this.filterAddressBook(res.data)
      this.setlistIndexPos();
    })
  },
  methods: {
    filterAddressBook (arr) {
      let that = this
      arr.forEach(element => {
        let key = pinyin(element.name)[0][0].substr(0,1).toUpperCase()
        if(that.AddressBookList[key] && typeof that.AddressBookList[key] === 'object') {
          that.AddressBookList[key].push(element)
        } else {
          if(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].indexOf(key) !== -1){
            that.AddressBookList[key] = []
            that.AddressBookList[key].push(element)
          } else {
            that.AddressBookList['#'] ? null: that.AddressBookList['#'] = []
            that.AddressBookList['#'].push(element)
          }
        }
      });
      that.AddressBookList = Object.assign({}, that.AddressBookList)
      console.log(that.AddressBookList)
      this.isShow = true
    },
    onLeftClick () {
      this.$router.back()
      localStorage.setItem('inviteShow','1')
    },
    filterIndex: function(data) {
      var result = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].index) {
          result.push(data[i].index);
        }
      }
      return result;
    },
    invite (el) {
      invitationSMS({
        userId: this.$store.state.IM.user.id,
        phone: el.phone,
        name: el.name
      }).then(res => {
        Toast({
          message: '邀请信息已发送',
          duration: 1000
        })
      })
    },
    setlistIndexPos: function() {
      //   1、ref 加在普通的元素上，用this.ref.name 获取到的是dom元素
      // 　　2、ref 加在子组件上，用this.ref.name 获取到的是组件实例，可以使用组件的所有方法。
      // 　　3、如何利用 v-for 和 ref 获取一组数组或者dom 节点
      var iH = this.$refs.listIndex.offsetHeight;
      this.$refs.listIndex.style.marginTop = -iH / 2 + "px";
    },
    setScroll: function(ev) {
      console.log(ev.target.innerHTML);
      var ap = this.$refs.listuser.getElementsByTagName("p");
      var list = document.getElementById('list')
      for (var i = 0; i < ap.length; i++) {
        if (ap[i].innerHTML == ev.target.innerHTML) {
          list.scrollTop = ap[i].offsetTop;
        }
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.page-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.list_item strong{
  font-weight: initial;
  float: left;
}
.list_item span{
  padding: .18rem .22rem;
  line-height: .24rem;
  font-size: .24rem;
  background-color: #ff5e80;
  border-radius: .1rem;
  color: #fff;
}
.list_index {
    position: fixed;
    list-style: none;
    /* padding-right: 10px; */
    font-size: .24rem;
    font-weight: 700;
    top: 50%;
    right: 0;
    width: .3rem;
    line-height: .5rem;
    text-align: center
}
#list .list_user p {
    padding: 0 .3rem;
    font-size: .22rem;
    line-height: .63rem;
    margin: 0;
    background-color: #f0f0f0
}
#list .list_user ul li {
    border-bottom: 1px solid #f0f0f0;
    height: 1.2rem;
    line-height: 1.2rem;
    padding: 0 .3rem;
    font-size: .3rem;
    text-align: right
}
#list .list_user{
      background-color: #fff;
}
#list {
  width: 100%;
  text-align: left;
  float: left;
  height: calc(100% - 46px);
  position: relative;
  top: 0;
  overflow: hidden;
  overflow-y: scroll
}
</style>