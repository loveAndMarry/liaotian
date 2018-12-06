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
import { dictionaryQuery } from '@/assets/common/api'
export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    data: {
      type: Array
    },
    title: '',
    radio: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      result: [],
      isLoading: true,
      columns:[],
    }
  },
  mounted () {
    if(localStorage.getItem(this.type)){
      this.columns = JSON.parse(localStorage.getItem(this.type))
    } else {
      dictionaryQuery({type: this.type}).then((res) => {
        if(res.data){
           this.columns = res.data
          localStorage.setItem(this.type, JSON.stringify(this.columns))
        }
      })
    }
  },
  methods: {
    toggle (index) {
      this.$refs.checkboxes[index].toggle()
    },
    confirm () {
      this.$parent.$parent.result = this.result.map(el => this.columns.find(item => item.label === el))
      this.$parent.$parent.isShow = false
    },
    cancel () {
      this.result = this.data
      this.$emit('cancal')
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
    },
    columns (value) {
      if (this.data.length > 0) {
        if(this.radio){
          this.result = [this.columns.find(el => el.value === this.data[0].value).label]
        } else {
          this.result = this.data.map(el => this.columns.find(item => item.value === el).label)
        }
      }
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
