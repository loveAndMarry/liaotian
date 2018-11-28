<template>
  <Actionsheet v-model="show"> 
      <Picker :columns="columns" @change="onChange" show-toolbar  @cancel="show = false" @confirm="onConfirm" :title='title' :loading='isLoading' ref="picker"/>
  </Actionsheet>
</template>
<script>
import { Actionsheet, Picker} from 'vant'
import { dictionaryQuery } from '@/assets/common/api'

export default {
  props:{
    value: {
      default: false,
      type: Boolean
    },
    title: {
      default: '',
      type: String
    },
    data: {
      type: Array
    }
  },
  data () {
    return {
      columns: [],
      defaultColumns: [],
      isLoading: true,
      show: false
    }
  },
  mounted () {
    this.show = this.value
    if(localStorage.getItem('income')){
      this.defaultColumns = JSON.parse(localStorage.getItem('income'))
      this.showData()
    } else {
    dictionaryQuery({type: 'income' }).then((res) => {
      if(res.data){
         this.defaultColumns = res.data.sort((a, b) => a.value - b.value)
        localStorage.setItem('income', JSON.stringify(this.defaultColumns))
        this.showData()
      }
    })
    }
  },
   watch: {
    show (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.show = val
    }
  },
  methods: {
    unshiftArr (arr){ 
      return ['不限'].concat(arr)
    },
    // 根据value值返回数组
    ages(name, label){
      var index = this.defaultColumns.findIndex(el => el[name] === label)
      return index === -1 ? [] : this.defaultColumns.filter(el => parseInt(el.value) > index)
    },
    maps (arr) {
      return arr.map(item => item.label)
    },
    showData () {
      this.columns = [
        {
          values: this.unshiftArr(this.maps(this.defaultColumns))
        },
        {
          values: this.unshiftArr(this.maps(this.defaultColumns))
        }
      ]
      this.$nextTick(() => {
        if(this.data.length > 0){
          this.$refs.picker.setColumnIndex(0, this.data[0] === '-1' ? 0 : this.defaultColumns.findIndex(el => el.value === (this.data[0])))
          var valuesTwo = this.unshiftArr(this.maps(this.ages('value',this.data[0])))
          this.$refs.picker.setColumnValues(1, valuesTwo)
          this.$refs.picker.setColumnIndex(1,  this.data[1] === '-1' ? 0 : valuesTwo.findIndex(el => el.value === this.data[1]))
        }
      })
      this.isLoading = false
    },
    onChange (picker, values) {
      picker.setColumnValues(1,values[0] === '不限'? this.unshiftArr(this.defaultColumns) : this.unshiftArr(this.maps(this.ages('label', values[0]))))
    },
    onConfirm (values) {
      let min = values[0].replace('不限', '-1')
      let max = values[1].replace('不限', '-1')
      this.$emit('confirm','income', [min, max])
    }
  },
  components: {
    Actionsheet,
    Picker
  }
}
</script>

<style scoped>

</style>
