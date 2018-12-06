<template>
  <Picker :columns="columns" show-toolbar  @cancel="$parent.$parent.isShow = false" @confirm="onConfirm" :title='title' :loading='isLoading' ref="picker"/>
</template>

<script>
import { Picker } from 'vant'
import { dictionaryQuery } from '@/assets/common/api'
export default {
  props: {
    type: String,
    title: String,
    data: {
      type: Array,
      default: []
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
    onConfirm (value, index) {
      this.$parent.$parent.result = [this.defaultData.find(el => el.label === value)]
      this.$parent.$parent.isShow = false
    },
    showData () {
      this.isLoading = false
      this.$nextTick(() => {
        if(this.data.length > 0){
         this.$refs.picker.setColumnValue(0, this.defaultData.find(el => el.value === this.data[0]).label)
        }
      })
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
