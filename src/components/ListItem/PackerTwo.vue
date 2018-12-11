<template>
  <Picker :columns="columns" show-toolbar  @change="onChange" @cancel="$parent.$parent.isShow = false" @confirm="onConfirm" :title='title' :loading='isLoading' ref="picker"/>
</template>

<script>
import { Picker } from 'vant'
import { dictionaryQuery, updateUserSpecificInfo} from '@/assets/common/api'
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
    unshiftArr (arr){ 
      return ['不限'].concat(arr)
    },
    getLabel (value) {
      return value === '-1'? '不限' : this.defaultData.find(el => el.value === value).label
    },
    getColumnsTwo (label) {
      return this.unshiftArr(this.labels.filter((el, index, arr) => index > arr.findIndex(item => item === label)))
    },
    getObj (label) {
      return label === '不限' ? {value: '-1', label: ''} : this.defaultData.find(el => el.label === label)
    },
    onConfirm (value, index) {
      let val = [this.getObj(value[0]),this.getObj(value[1])]
      if(this.isSubmit){
        updateUserSpecificInfo(this.fromData(val)).then(() => {
          this.$parent.$parent.result = val
          this.$parent.$parent.isShow = false
        })
      } else {
        this.$emit('confirm', val)
      }
    },
    fromData (arr) {
      var a = [], b = {}
      // 获取当前选择获取到的值
      arr.forEach((el, index) => {
        a = a.concat(Object.values(el))
      })
      // 将需要提交的字段和名称进行匹配，顺序必须一样
      this.defaultSubmitData.forEach((el, index) => {
        if(el){
          b[el] = a[index]
        }
      })
      // 设置当前用户id
      b['userId'] = this.$store.state.IM.user.id

      return b
    },
    onChange (picker, values) {
      picker.setColumnValues(1,values[0] === '不限'?  this.unshiftArr(this.labels) : this.getColumnsTwo(values[0]))
    },
    showData () {
      this.isLoading = false
      this.$nextTick(() => {
        if(this.data.length > 0){
          let label1 = this.getLabel(this.data[0])
          let label2 = this.getLabel(this.data[1])
          this.$refs.picker.setColumnValue(0, label1)
          this.$refs.picker.setColumnValues(1, this.getColumnsTwo(label1))
          this.$refs.picker.setColumnValue(1, label2)
        }
      })
    }
  },
  computed: {
    labels () {
      return this.defaultData.map(el => el.label)
    },
    columns () {
      return [
        {
          values: this.unshiftArr(this.labels)
        },
        {
          values: this.unshiftArr(this.labels)
        }
      ]
    }
  },
  components: {
    Picker
  }
}
</script>

<style scoped>

</style>
