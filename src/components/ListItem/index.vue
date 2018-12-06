<template>
  <div>
    <div class="intention_item" @click="intantionClick">{{title}}:
      <div class="sanjiao" :class="{hide: noClick}">{{names}}</div>
    </div>
    <Actionsheet v-model="isShow" :close-on-click-overlay='false'>
      <!-- 地址组件 -->
      <Address  v-if="type === 'address'" :data="codes" :title="title"></Address>
      <!-- 单列选择组件 -->
      <PackerOne  v-if="type === 'packerOne'" :data="codes" :title="title" :type="dictionaries"></PackerOne>
      <!-- 单选组件 -->
      <PackerList  v-if="type === 'radioOne'" :data="data" :title="title" :type="dictionaries"></PackerList>
      <!-- 多选选组件 -->
      <PackerList  v-if="type === 'radioTwo'" :data="data" :title="title" :type="dictionaries" :radio='false'></PackerList>
    </Actionsheet>
  </div>
</template>

<script>
import Address from '@/components/ListItem/Address'
import PackerList from '@/components/ListItem/PackerList'
import PackerOne from '@/components/ListItem/PackerOne'
import { Actionsheet } from 'vant'
import{ mapState } from 'vuex'

export default {
  props: {
    // 是否可以点击
    noClick: {
      type: Boolean,
      default: false
    },
    // 点击触发事件
    isEmitClick:{
      type: Boolean,
      default: false
    },
    // 显示的标题
    title: {
      type: String,
      default: ''
    },
    // 当前为地址、单选、多选、双向选择
    type: String,
    // 默认显示的值，以逗号分隔的编码格式
    default: Object/Array,
    // 字典名称
    dictionaries: {
      type: String,
      default: ''
    },
    // 提交字段
    defaultSubmitData: {
      type: Object
    }
  },
  data () {
    return {
      isShow: false,
      result: [],
      names: '',
      codes: []
    }
  },
  mounted () {
    this.result = this.default
  },
  computed: {
    ...mapState({
      user: state => state.IM.user
    }),
    submitData () {
      return Object.assign({}, this.defaultSubmitData, { userId: this.user.id} )
    },
    data () {
      return this.result
    }
  },
  watch : {
    result (val) {
      if(val.length > 0){
        this.names = val[0].label ?  val.map(el => el.label).join(",") : val.map(el => el.name).join(" ")
        this.codes = val[0].value ? val.map(el => el.value) : val.map(el => el.code)
      }
    }
  },
  methods: {
    intantionClick () {
      // 当前是否能够点击
      if(this.noClick){
        return false
      }
      // 点击触发点击事件
      if(this.isEmitClick){
        this.$emit('click')
        return false
      }
      this.isShow = true
    },
    onConfirm (arr) {
      console.log(arr, '更新完成')
      this.isShow = false
      this.result = arr
      this.$emit('confirm', arr)
    }
  },
  components: {
    Actionsheet,
    Address,
    PackerList,
    PackerOne
  }
}
</script>

<style scoped>
.intention_item {
  width: 100%;
  display: block;
  background-color: #fff;
  height: 0.89rem;
  text-align: left;
  font-size: 0.31rem;
  padding: 0 0.3rem;
  line-height: 0.89rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.intention_item .sanjiao {
  font-size: 0.28rem;
  color: #8d8d8d;
  float: right;
}
.intention_item .sanjiao.hide::after{
  display:none !important;
}
.intention_item .sanjiao::after {
  content: "";
  display: inline-block;
  height: 0.15rem;
  width: 0.15rem;
  border: 1px solid #8e8e8e;
  border-left: transparent;
  border-top: transparent;
  transform: rotate(-45deg);
}
</style>
