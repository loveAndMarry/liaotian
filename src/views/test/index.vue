<template>
  <PullRefresh v-model="isLoading" @refresh="onRefresh" :animation-duration='0' :disabled="disabled">
    <p>刷新次数: {{ count }}</p>
  </PullRefresh>
</template>
<script>
import { PullRefresh } from 'vant';
export default {
  components: {
    PullRefresh
  },
  data() {
    return {
      count: 0,
      isLoading: true,
      disabled: false
    }
  },

  methods: {
    onRefresh() {
      window.setTimeout(() => {
         this.$toast('刷新成功');
          this.isLoading = false;
          this.count++;
          this.disabled = true;
          this.disabled = false
      }, 0)
    }
  }
}
</script>

