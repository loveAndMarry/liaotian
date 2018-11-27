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
    show: {
      default: false,
      type: Boolean
    },
    title: {
      default: '',
      type: String
    },
    value: {
      type: Array
    }
  },
  data () {
    return {
      columns: [],
      defaultColumns: [],
      isLoading: true
    }
  },
  mounted () {
    if(localStorage.getItem('height')){
      this.defaultColumns = JSON.parse(localStorage.getItem('height'))
      this.showData()
    } else {
    dictionaryQuery({type: 'height' }).then((res) => {
      let min = parseInt(res.data.find(el => el.value === '1').label)
      let max = parseInt(res.data.find(el => el.value === '2').label) + 1
      var arr = Array.from({length: max - min}, (v, k) => k + min + 'cm')
      this.defaultColumns = arr
      localStorage.setItem('height', JSON.stringify(this.defaultColumns))
      this.showData()
    })
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
        if(this.value.length > 0){
          this.$refs.picker.setColumnIndex(0,  this.value[0] === '-1' ? 0 : this.defaultColumns.findIndex(el => el === (parseInt(this.value[0]) + 1) + 'cm'))
          var valuesTwo = this.unshiftArr(this.ages(this.value[1] === '-1'? this.value[0] === '-1' ? 0 : this.value[0]: this.value[1]))
          this.$refs.picker.setColumnValues(1, valuesTwo)
          this.$refs.picker.setColumnIndex(1,  this.value[0] === '-1' ? 0 : valuesTwo.findIndex(el => el === this.value[1] + 'cm'))
        }
      })
      this.isLoading = false
    },
    onChange (picker, values) {
      picker.setColumnValues(1,this.unshiftArr(this.ages(values[0])))
    },
    onConfirm (values) {
      let min = values[0].replace('cm', '').replace('不限', '-1')
      let max = values[1].replace('cm', '').replace('不限', '-1')
      this.$emit('input', [min, max])
      this.$emit('confirm',[min, max])
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
