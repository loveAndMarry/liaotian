<template>
  <div>
    <PullRefresh v-model="isLoading" @refresh="onRefresh" :disabled="isDisabled">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >

      </List>
    </PullRefresh>
  </div>
</template>
<script>
import { PullRefresh, List} from 'vant'
export default {
  components: {
    PullRefresh,
    List
  },
  data () {
    return {
      isLoading: false, // 下拉刷新是否完成
      isDisabled: false, // 是否禁用下拉刷新
      loading: false, // 自动加载是否完成
      finished: false, // 加载数据是否全部加载
    }
  },
  methods: {
    // 刷新方法
    onRefresh () {

    },
    // 自动加载数据方法
    onLoad () {

    }
  }
}
</script>
