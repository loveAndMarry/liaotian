<template>
  <container title="测试">

  </container>
</template>
<script>
import container from '@/components/ZX/container'

export default {
  components: {
    container
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

