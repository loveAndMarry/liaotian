<template>
  <PullRefresh v-model="isLoading" @refresh="onRefresh" :disabled="isDisabled">
    <List 
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    class="dynamic" ref='dynamic'>
      <AuditionsItem v-for="(el, index) in list" :key="index" :el="el" :type="type"/>
    </List>
  </PullRefresh>
</template>
<script>
import { PullRefresh , List } from 'vant'
import AuditionsItem from './AuditionsItem'
import { listMassSelection } from '@/assets/common/api'
import { rejects } from 'assert';

export default {
  props: ['type'],
  data () {
    return {
      loading: false, // 全部海选是否加载完成
      finished: false, // 全部海选是否全部加载完成
      isLoading: false, // 是否刷新完成
      isDisabled: false, // 是否禁用下拉刷新
      pageSize: 10,
      pageCurrent: 1,
      list: []
    }
  },
  methods: {
    onRefresh () {
      this.updateData({
        type: this.type,
        pageCurrent: 1,
        pageSize: this.pageCurrent * this.pageSize,
        userId: this.$store.state.IM.user.id
      }).then(res => {
        this.list = res
        this.isLoading = false
      }).catch(res => {
        this.isLoading = false
      })
    },
    onLoad () {
      this.updateData({
        type: this.type,
        pageCurrent: this.pageCurrent,
        pageSize: this.pageSize,
        userId: this.$store.state.IM.user.id
      }).then(res => {
        if(res.length < this.pageSize) {
          this.finished = true
        }
        ++this.pageCurrent
        this.list.push(...res)
        this.loading = false
      }).catch(res => {
        this.loading = false
        this.finished = true
      })
    },
    updateData (data) {
      return new Promise((resolve, reject) => {
        listMassSelection(data).then(res => {
          if(res.data.list && res.data.list.length > 0) {
            resolve(res.data.list)
          } else {
            reject()
          }
        })
      })
    }
  },
  components: {
    AuditionsItem,
    List,
    PullRefresh
  }
}
</script>
