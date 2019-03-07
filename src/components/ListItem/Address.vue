<template>
  <Picker :columns="columns" @change="onChange" show-toolbar  @cancel="onCancel" @confirm="onConfirm" :title='title' :loading='isLoading' ref="picker"/>
</template>
<script>
import { Picker} from 'vant'
import { getProvinceAndCityList, updateUserSpecificInfo } from '@/assets/common/api'

export default {
  props:{
    title: {
      default: '',
      type: String
    },
    data: {
      type: Array
    },
    // 是否自动提交
    isSubmit: {
      type: Boolean,
      default: true
    },
    name: String,
    defaultSubmitData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      columns: [],
      defaultColumns: [],
      isLoading: true,
      isshow: false
    }
  },
  mounted () {
    if(localStorage.getItem('address')){
      this.defaultColumns = JSON.parse(localStorage.getItem('address'))
      this.showData()
    } else {
    getProvinceAndCityList({}).then((res) => {
      if(res.data) {
        this.defaultColumns = res.data
        this.defaultColumns.unshift({
        code: '-1',
        name: '不限',
        areaVoList: []
      })
        localStorage.setItem('address', JSON.stringify(this.defaultColumns))
        this.showData()
      }
    })
    }
  },
  watch: {
    data (val){
      this.$nextTick(() => {
        if(val.length > 0){
          let obj = this.defaultColumns.find(el => el.code === val[0])
          let index = this.defaultColumns.findIndex(el => el.code === val[0])
          this.$refs.picker.setColumnIndex(0, index)
          this.$refs.picker.setColumnValues(1,obj.areaVoList.map(el => el.name))
          this.$refs.picker.setColumnIndex(1, obj.areaVoList.findIndex(el => el.code === val[1]))
        }
      })
    }
  },
  methods: {
    reset () {
      let obj = this.defaultColumns[0]
      this.$refs.picker.setColumnIndex(0, 0)
      this.$refs.picker.setColumnValues(1,obj.areaVoList.map(el => el.name))
      this.$refs.picker.setColumnIndex(1, 0)
    },
    fromData (arr) {
      var a = [], b = {}
      // 获取当前选择获取到的值
      arr.forEach((el, index) => {
        a = a.concat(Object.values(el))
      })
      a = a.filter(el => typeof el !== 'object')
      // 过滤掉子集选项
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
    getProvince (name) {
      let arr = this.defaultColumns.find(el => el.name === name)
      return arr
    },
    showData () {
      this.columns = [
            {
              values: this.defaultColumns.map(el => el.name)
            },
            {
              values: this.defaultColumns[0].areaVoList.map(el => el.name)
            }
          ]

      let val = this.data
      if(val.length > 0){
          this.$nextTick(() => {
            let obj = this.defaultColumns.find(el => el.code === val[0])
            let index = this.defaultColumns.findIndex(el => el.code === val[0])
            this.$refs.picker.setColumnIndex(0, index)
            this.$refs.picker.setColumnValues(1,obj.areaVoList.map(el => el.name))
            this.$refs.picker.setColumnIndex(1, obj.areaVoList.findIndex(el => el.code === val[1]))
          })
      }
      this.isLoading = false
    },
    onCancel () {
      this.$parent.$parent.isShow = false
    },
    onChange (picker, values) {
      picker.setColumnValues(1,this.getProvince(values[0]).areaVoList.map(el => el.name));
    },
    onConfirm (values) {
      let obj = this.getProvince(values[0])
      let province = obj
      let city = obj.areaVoList.find(el => el.name === values[1]) || { code: '-1', name: '不限'}
      let val = [province, city]
      if(this.isSubmit){
        updateUserSpecificInfo(this.fromData(val)).then(() => {
        })
      } else {
        this.$emit('confirm', val)
      }
      this.$parent.$parent.result = val
      this.$parent.$parent.isShow = false
    }
  },
  watch: {
    data (val) {
      if(val.length === 0) {
        this.reset()
      }
    }
  },
  components: {
    Picker
  }
}
</script>

<style scoped>

</style>
