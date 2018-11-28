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
    if(localStorage.getItem('height')){
      this.defaultColumns = JSON.parse(localStorage.getItem('height'))
      this.showData()
    } else {
    dictionaryQuery({type: 'height' }).then((res) => {
      if(res.data){
        let min = parseInt(res.data.find(el => el.value === '1').label)
        let max = parseInt(res.data.find(el => el.value === '2').label) + 1
        var arr = Array.from({length: max - min}, (v, k) => k + min + 'cm')
        this.defaultColumns = arr
        localStorage.setItem('height', JSON.stringify(this.defaultColumns))
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
    ages(num){
      return this.defaultColumns.filter(el => el > num)
    },
    showData () {
      this.columns = [
        {
          values: this.unshiftArr(this.defaultColumns)
        },
        {
          values: this.unshiftArr(this.defaultColumns)
        }
      ]
      this.$nextTick(() => {
        if(this.data.length > 0){
          this.$refs.picker.setColumnIndex(0,  this.data[0] === '-1' ? 0 : this.defaultColumns.findIndex(el => el === (parseInt(this.data[0]) + 1) + 'cm'))
          var valuesTwo = this.unshiftArr(this.ages(this.data[1] === '-1'? this.data[0] === '-1' ? 0 : this.data[0]: this.data[1]))
          this.$refs.picker.setColumnValues(1, valuesTwo)
          this.$refs.picker.setColumnIndex(1,  this.data[0] === '-1' ? 0 : valuesTwo.findIndex(el => el === this.data[1] + 'cm'))
        }
      })
      this.isLoading = false
    },
    onChange (picker, values) {
      picker.setColumnValues(1,values[0] === '不限'?  this.unshiftArr(this.defaultColumns) : this.unshiftArr(this.ages(values[0])))
    },
    onConfirm (values) {
      let min = values[0].replace('cm', '').replace('不限', '-1')
      let max = values[1].replace('cm', '').replace('不限', '-1')
      this.$emit('confirm','height',[min, max])
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
