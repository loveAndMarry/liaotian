<template>
  <div class="content">
    <Search placeholder="按照条件搜索 例如 女 济南 22" v-model="value" showAction=''>
      <div slot="action" @click="onSearch"><i class="tianjia"></i></div>
    </Search>
    <Tabs/>
  </div>
</template>

<script>
import { Search } from 'vant'
import Tabs from './components/tabs'

export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSearch () {
      console.log('dianji')
    }
  },
  components: {
    Search,
    Tabs
  }
}
</script>

<style>
.content{
  background-color: #f0f0f0;
  height: 100%
}
.tianjia{
    display: block;
    width: .4rem;
    height: .4rem;
    background-image: url('../../../static/images/tianjia.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>
