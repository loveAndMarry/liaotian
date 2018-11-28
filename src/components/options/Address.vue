<template>
  <Actionsheet v-model="isshow"> 
      <Picker :columns="columns" @change="onChange" show-toolbar  @cancel="isshow = false" @confirm="onConfirm" :title='title' :loading='isLoading' ref="picker"/>
  </Actionsheet>
</template>
<script>
import { Actionsheet, Picker} from 'vant'
import { getProvinceAndCityList } from '@/assets/common/api'

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
    },
    name: String
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
    this.isshow = this.value
    if(localStorage.getItem('address')){
      this.defaultColumns = JSON.parse(localStorage.getItem('address'))
      this.showData()
    } else {
    getProvinceAndCityList({}).then((res) => {
      if(res.data) {
        this.defaultColumns = res.data
        localStorage.setItem('address', JSON.stringify(this.defaultColumns))
        this.showData()
      }
    })
    }
  },
  watch: {
    isshow (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.isshow = val
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
        if(this.data.length > 0){
          let obj = this.defaultColumns.find(el => el.code === this.data[0])
          let index = this.defaultColumns.findIndex(el => el.code === this.data[0])
          this.$refs.picker.setColumnIndex(0, index)
          this.$refs.picker.setColumnValues(1,obj.areaVoList.map(el => el.name))
          this.$refs.picker.setColumnIndex(1, obj.areaVoList.findIndex(el => el.code === this.data[1]))
        }
      })
      this.isLoading = false
    },
    onChange (picker, values) {
      picker.setColumnValues(1,this.getProvince(values[0]).areaVoList.map(el => el.name));
    },
    onConfirm (values) {
      let obj = this.getProvince(values[0])
      let province = obj
      let city = obj.areaVoList.find(el => el.name === values[1])
      this.$emit('confirm', this.name ,[province, city])
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
