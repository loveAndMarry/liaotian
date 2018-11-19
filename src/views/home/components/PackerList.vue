<template>
  <div>
    <div class="van-hairline--top-bottom van-picker__toolbar">
      <div class="van-picker__cancel">取消</div>
      <div class="van-ellipsis van-picker__title"></div>
      <div class="van-picker__confirm">确认</div>
    </div>
    <div class="picker_content">
      <CheckboxGroup v-model="result">
        <CellGroup>
          <Cell
            v-for="(item, index) in list"
            clickable
            :key="index"
            :title="`复选框 ${item}`"
            @click="toggle(index)"
          >
            <Checkbox :name="item" ref="checkboxes" />
          </Cell>
        </CellGroup>
      </CheckboxGroup>
    </div>
  </div>  
</template>
<script>
import {Cell, CellGroup, Checkbox, CheckboxGroup} from 'vant'
export default {
  data() {
    return {
      list: ['a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c'],
      result: ['a', 'b']
    }
  },
  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    }
  },
  components: {
    Cell,
    CellGroup,
    Checkbox,
    CheckboxGroup
  }
}
</script>

<style scoped>
.picker_content{
  height: 200px;
  overflow-x: hidden;
  overflow-y: scroll;
  text-align: left
}
</style>
