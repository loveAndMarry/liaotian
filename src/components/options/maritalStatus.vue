<template>
  <Actionsheet v-model="listShow"> 
      <PackerList :columns="columns" v-model="defaultValue" @confirm="confirm" @cancel='listShow = false' :title="title" :radio='radio'/>
    </Actionsheet>
</template>

<script>
import { Actionsheet } from 'vant'
import { dictionaryQuery } from '@/assets/common/api'
import PackerList from './PackList'
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
    },
    // true为单选
    radio: {
      type: Boolean,
      default: true
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
     if(localStorage.getItem('maritalStatus')){
      this.defaultColumns = JSON.parse(localStorage.getItem('maritalStatus'))
      this.showData()
    } else {
      dictionaryQuery({type: 'maritalStatus' }).then((res) => {
        this.defaultColumns = res.data
        localStorage.setItem('maritalStatus', JSON.stringify(this.defaultColumns))
        this.showData()
      })
    }
  },
  methods: {
    showData () {
      this.columns = this.defaultColumns
    }
  }
}
</script>
