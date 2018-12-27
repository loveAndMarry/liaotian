<template>
  <Picker :columns="columns" show-toolbar  @cancel="$parent.$parent.isShow = false" @confirm="onConfirm" :title='title' :loading='isLoading' ref="picker"/>
</template>

<script>
import { Picker } from 'vant'
import { dictionaryQuery , updateUserSpecificInfo} from '@/assets/common/api'
export default {
  props: {
    type: String,
    title: String,
    data: {
      type: Array,
      default: []
    },
    // 是否自动提交
    isSubmit: {
      type: Boolean,
      default: true
    },
    defaultSubmitData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      defaultData:[],
      isLoading: true
    }
  },
  mounted () {
    if(localStorage.getItem(this.type)){
      this.defaultData = JSON.parse(localStorage.getItem(this.type))
      this.showData()
    } else {
      dictionaryQuery({type: this.type}).then((res) => {
        if(res.data){
          this.defaultData = res.data
          localStorage.setItem(this.type, JSON.stringify(this.defaultData))
          this.isLoading = false
          this.showData()
        }
      })
    }
  },
  methods: {
    fromData (arr) {
      var a = [], b = {}
      // 获取当前选择获取到的值
      arr.forEach((el, index) => {
        a = a.concat(Object.values(el))
      })
      // 将需要提交的字段和名称进行匹配，顺序必须一样
      this.defaultSubmitData.forEach((el, index) => {
        if(el){
          b[el] = a[index].replace('厘米', '')
        }
      })
      // 设置当前用户id
      b['userId'] = this.$store.state.IM.user.id

      return b
    },
    onConfirm (value, index) {
      let val = []
      let result = []
      // 单独为月收入做的判断
      if(this.type === 'incomeRange') {
        // 以下返回的value值没有任何作用，只是为了占位
        if(value.indexOf('以下') !== -1){
          val = [{value: 1, label: value.replace('以下', '')},{value: 2, label: '-1'}]
        } else if(value.indexOf('以上') !== -1) {
          val = [{value: 1, label: '-1'},{value: 2, label: value.replace('以上', '')}]
        } else {
          var arr = value.replace('元', '').split('-')
          val = [{value: 1, label: arr[0]},{value: 2, label: arr[1]}]
        }
        result = [this.defaultData.find(el => el.label === value)]
      } else {
         val = [this.defaultData.find(el => el.label === value)]
         result = val
      }
      if(this.isSubmit){
        updateUserSpecificInfo(this.fromData(val)).then(() => {
         
        })
      } else {
        this.$emit('confirm', result)
      }
      this.$parent.$parent.result = result
      this.$parent.$parent.isShow = false
      
    },
    showData () {
      this.isLoading = false
      this.$nextTick(() => {
        if(this.data.length > 0){
         this.$refs.picker.setColumnValue(0, this.defaultData.find(el => el.value == this.data[0]).label)
        }
      })
    },
    reset () {
      this.$refs.picker.setColumnValue(0, 0)
    }
  },
  watch: {
    data (val) {
      if(val.length === 0) {
        this.reset()
      }
    }
  },
  computed: {
    columns () {
      return this.defaultData.map(el => el.label)
    }
  },
  components: {
    Picker
  }
}
</script>

<style scoped>

</style>
