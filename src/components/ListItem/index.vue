<template>
  <div>
    <div class="intention_item S24" @click.stop="intantionClick">{{title}}:
      <div class="sanjiao S24" :class="{hide: noClick, locks: !Lock()}" v-text="replaceName(names, hint)">
      </div>
    </div>
    <Actionsheet v-model="isShow" :close-on-click-overlay='false' ref="content">
      <!-- 地址组件 -->
      <Address  v-if="type === 'address'" :data="codes" :title="title" :isSubmit="isSubmit" :defaultSubmitData='defaultSubmitData' @confirm="onConfirm" ref="address"></Address>
      <!-- 单列选择组件 -->
      <PackerOne  v-if="type === 'packerOne'" :data="codes" :title="title" :isSubmit="isSubmit" :type="dictionaries" :defaultSubmitData='defaultSubmitData' @confirm="onConfirm"></PackerOne>
      <!-- 双列选择并且不限组件 -->
      <PackerTwo  v-if="type === 'packerTwo'" :data="codes" :title="title" :isSubmit="isSubmit" :type="dictionaries" :defaultSubmitData='defaultSubmitData' @confirm="onConfirm"></PackerTwo>
      <!-- 单选组件 -->
      <PackerList  v-if="type === 'radioOne'" :data="codes" :title="title" :isSubmit="isSubmit" :type="dictionaries" :defaultSubmitData='defaultSubmitData' @confirm="onConfirm"></PackerList>
      <!-- 多选选组件 -->
      <PackerList  v-if="type === 'radioTwo'" :data="codes" :title="title" :isSubmit="isSubmit" :type="dictionaries" :radio='false' :defaultSubmitData='defaultSubmitData' :suffix="suffix" @confirm="onConfirm"></PackerList>
    </Actionsheet>
  </div>
</template>

<script>
import Address from '@/components/ListItem/Address'
import PackerList from '@/components/ListItem/PackerList'
import PackerOne from '@/components/ListItem/PackerOne'
import PackerTwo from '@/components/ListItem/PackerTwo'
import { Actionsheet } from 'vant'
import{ mapState} from 'vuex'

export default {
  name: 'ListItem',
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
    default: {
      type: Object/Array,
      default: () => []
    },
    isLock:{
      type: String,
      default: ''
    },
    // 是否自动提交
    isSubmit: {
      type: Boolean,
      default: true
    },
    // 字典名称
    dictionaries: {
      type: String,
      default: ''
    },
    // 提交字段
    defaultSubmitData: {
      type: Array,
      default: () => []
    },
    suffix: {
      type: String,
      default: ''
    },
    hint: {
      type: String,
      default: '未填写'
    }
  },
  data () {
    return {
      isShow: false,
      result: [],
      names: '',
      codes: [],
      event: null
    }
  },
  mounted () {
    this.result = this.default
  },
  computed: {
    ...mapState({
      user: state => state.IM.user
    }),
    data () {
      return this.result
    }
  },
  watch : {
    result (val) {
       // this.$nextTick(() => {
        if(val.length > 0){
          
          if(this.type === 'packerTwo'){
            if(!val[0].value && !val[1].value){
              this.names = this.hint
              this.codes = []
              return false
            }
            if(val[0].value === '-1' && val[1].value === '-1'){
              this.names = '不限'
            } else if(val[0].value === '-1' && val[1].value !== '-1'){
              this.names = val[1].label + '以下'
            } else if(val[0].value !== '-1' && val[1].value === '-1'){
              this.names = val[0].label + '以上'
            } else {
              this.names = val.map(el => el.label ? this.isSuffix(el.label) : el.label).join(" - ")
            }
             
          } else {
            if(this.dictionaries === 'incomeRange'){
              this.names = val[0].label
            } else {
              this.names = val[0].label ?  val.map(el => el.label ? this.isSuffix(el.label) : el.label).join(",") : val.map(el => el.name).join(" ")
            }
          }
          this.codes = val[0].value ? val.map(el => el.value) : val.map(el => el.code)
        } else {
          this.names = this.hint
          this.codes = []
        }
      // })
    },
    default (val) {
      if(val.length === 0){
        this.result = []
      }
    }
  },
  methods: {
    Lock () {
      if(this.isLock === ''){
        return true
      }
      return this.$store.state.common.Jurisdiction.some(el => el === this.isLock)
    },
    replaceName (val,hint) {
      if(!this.Lock()){
        return ''
      }
      if(val.replace(/,/g,'').replace(/-/g,'').replace(/\s/g,'') === ''){
        return hint
      } else {
        return val
      }
    },
    isSuffix(label){
      return (label.indexOf(this.suffix) === -1 && label.indexOf(this.suffix) !== 0) ? label + this.suffix : label
    },
    intantionClick () {
      if(!this.Lock()){
        this.$router.push({name: 'member'})
      }
      // 点击触发点击事件
      if(this.isEmitClick){
        this.$emit('click')
        return false
      }
      // 当前是否能够点击
      if(this.noClick){
        return false
      } else {
        this.isShow = true
      }
      
    },
    onConfirm (arr) {
      this.isShow = false
      this.result = arr
      this.$emit('confirm', arr)
    }
  },
  components: {
    Actionsheet,
    Address,
    PackerList,
    PackerOne,
    PackerTwo
  }
}
</script>

<style>
.locks::before{
  content:"";
  display: block;
  background-image: url('../../assets/images/lock.png');
  width: .5rem;
  height: .5rem;
  background-size: contain;
  background-repeat: no-repeat;
  margin-top: .2rem;
  float: left;
}
.intention_item {
  width: 100%;
  display: block;
  background-color: #fff;
  height: 0.89rem;
  text-align: left;
  font-size: 0.31rem;
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
