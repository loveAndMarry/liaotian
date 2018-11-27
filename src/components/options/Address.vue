<template>
  <Actionsheet v-model="show"> 
      <Picker :columns="columns" @change="onChange" show-toolbar  @cancel="show = false" @confirm="onConfirm" :title='title' :loading='isLoading' ref="picker"/>
  </Actionsheet>
</template>
<script>
import { Actionsheet, Picker} from 'vant'
import { getProvinceAndCityList } from '@/assets/common/api'

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
    if(localStorage.getItem('address')){
      this.defaultColumns = JSON.parse(localStorage.getItem('address'))
      this.showData()
    } else {
    getProvinceAndCityList({}).then((res) => {
      this.defaultColumns = res.data
      localStorage.setItem('address', this.defaultColumns)
      this.showData()
    })
    }
  },
  methods: {
    getProvince (name) {
      return this.defaultColumns.find(el => el.name === name)
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
      this.$nextTick(() => {
        if(this.value.length > 0){
          let obj = this.defaultColumns.find(el => el.code === this.value[0])
          let index = this.defaultColumns.findIndex(el => el.code === this.value[0])
          this.$refs.picker.setColumnIndex(0, index)
          this.$refs.picker.setColumnValues(1,obj.areaVoList.map(el => el.name))
          this.$refs.picker.setColumnIndex(1, obj.areaVoList.findIndex(el => el.code === this.value[1]))
        }
      })
      this.isLoading = false
    },
    onChange (picker, values) {
      picker.setColumnValues(1,this.getProvince(values[0]).areaVoList.map(el => el.name));
    },
    onConfirm (values) {
      let obj = this.getProvince(values[0])
      let province = obj.code
      let city = obj.areaVoList.find(el => el.name === values[1]).code
      this.$emit('input', [province, city])
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
