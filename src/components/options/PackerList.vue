<template>
  <div>
    <div class="van-hairline--top-bottom van-picker__toolbar">
      <div class="van-picker__cancel" @click="cancel">取消</div>
      <div class="van-ellipsis van-picker__title" v-text="title"></div>
      <div class="van-picker__confirm" @click="confirm">确认</div>
    </div>
    <div class="picker_content">
      <CheckboxGroup v-model="result">
        <CellGroup>
          <Cell
            v-for="(item, index) in columns"
            clickable
            :key="index"
            :title="item.label"
            @click="toggle(index)"
          >
            <Checkbox :name="item.label" ref="checkboxes" />
          </Cell>
        </CellGroup>
      </CheckboxGroup>
    </div>
  </div>
</template>
<script>
import {Cell, CellGroup, Checkbox, CheckboxGroup} from 'vant'
export default {
  props: {
    value: {
      type: Array
    },
    columns: {
      type: Array
    },
    title: '',
    radio: false
  },
  data () {
    return {
      result: []
    }
  },
  mounted () {
    if (this.value.length > 0) {
      this.result = this.value
    }
  },
  methods: {
    toggle (index) {
      this.$refs.checkboxes[index].toggle()
    },
    confirm () {
      this.$emit('confirm', this.result)
    },
    cancel () {
      this.result = this.value
      this.$emit('cancel')
    }
  },
  watch: {
    result (val, pastVal) {
      // 多选
      if (!this.radio) {
        if (this.columns.some(item => item.label === '不限')) {
          if (val.indexOf('不限') !== -1 && val.length > 1) {
            this.result = val.filter(item => item !== '不限')
          }
          if (val.indexOf('不限') === -1 && val.length === this.columns.length - 1) {
            this.result = ['不限']
          }
        }
      } else {
        // 单选
        if (val.length > 1) {
          this.result = val.filter(item => item !== pastVal[0])
        }
      }
      // this.$emit('input', this.result)
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
