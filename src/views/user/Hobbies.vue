<template>
  <div class="content">
    <NavBar
      left-arrow
      right-text="保存"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      title="兴趣爱好"
    />
    <div style="height: calc(100% - 46px);overflow-x: hidden;overflow-y: scroll;">
      <div class="hobbies_group" v-for="(item , index) in data" :key="index">
        <div class="title">
          <i :class="index"></i>
          {{item.label}}
        </div>
        <div class="context">
          <span class="hint" :class="{rad: el.isShow}" v-for="(el, dex) in item.interestDictVoList" :key="dex" @click="interestDictVoClick($event,el)">{{el.label}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar } from "vant";
import { interest, updateUserSpecificInfo} from "@/assets/common/api";
export default {
  data() {
    return {
      data: {},
      interestDictVoList: []
    };
  },
  methods: {
    onClickLeft() {
       this.$router.push({name: 'userDetails'})
    },
    onClickRight() {
      updateUserSpecificInfo({
        userId: this.$store.state.IM.user.id,
        interest: this.interestDictVoList.map(el => el.id).join(',')
      }).then(res => {
         var toast = this.$toast('修改成功')
         window.setTimeout(() => {
           toast.clear()
           this.$router.push({name: 'userDetails'})
         }, 1000)
      })
    },
    interestDictVoClick (e, item) {
      var event = e.target
      if(this.interestDictVoList.some(el => el.id === item.id)){
        event.className = 'hint'
        this.interestDictVoList.splice(this.interestDictVoList.findIndex(el => el.id === item.id), 1)
      } else {
        if(this.interestDictVoList.length === 10){
          this.$toast('兴趣爱好最多只能选择10个')
          return false
        }
        event.className = 'hint rad'
        this.interestDictVoList.push(item)
      }
    },
    updateArr (item,obj) {
      var newObj = this.data.find(a => a.id === item.parentId)
      var arr = newObj.interestDictVoList;
      arr.splice(arr.findIndex(el => el.id === item.id), 1, Object.assign(arr.find(el => el.id === item.id), obj))
      this.$set(this.data, this.data.findIndex(el => el.id === item.parentId), newObj)
    }
  },
  components: {
    NavBar
  },
  mounted() {
    interest({}).then(res => {
      if (res.data) {
        this.data = res.data;
        this.interestDictVoList = this.$route.query.interestDictVoList
        this.interestDictVoList.forEach(item => {
          this.updateArr(item, {
            isShow : true
          })
        })
      }
    });
  }
};
</script>

<style scoped>
.content {
  height: 100%;
  background-color: #fff;
}
.hobbies_group:nth-child(1){
  padding-top: .3rem
}
.hobbies_group {
  padding: 0 0.3rem 0.3rem 0.3rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.hobbies_group .title {
  font-size: 0.28rem;
  color: #242424;
  text-align: left;
}
.hobbies_group .title i {
  width: 0.36rem;
  height: 0.36rem;
  display: inline-block;
}
.context {
  margin-top: 0.39rem;
  padding-left: 0.48rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
}
.hint {
  padding: 0.08rem 0.27rem;
  border-radius: 0.15rem;
  border: 1px solid #dedede;
  color: #171717;
  font-size: 0.22rem;
  margin: 0 0.16rem 0.16rem 0;
}
.hint.rad{
  color: #fff;
  background-color: #ff7994
}
</style>
