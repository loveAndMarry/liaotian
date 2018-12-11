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
import { dictionaryQuery , updateUserSpecificInfo} from '@/assets/common/api'
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
    },
    // 是否自动提交
    isSubmit: {
      type: Boolean,
      default: true
    },
    defaultSubmitData: {
      type: Array,
      default: () => []
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
     fromData (arr) {
      var a = [], b = {}
      // 获取当前选择获取到的值
      arr.forEach((el, index) => {
        a = a.concat(Object.values(el))
      })
      // 将需要提交的字段和名称进行匹配，顺序必须一样
      this.defaultSubmitData.forEach((el, index) => {
        if(el){
          b[el] = a[index]
        }
      })
      // 设置当前用户id
      b['userId'] = this.$store.state.IM.user.id

      return b
    },
    toggle (index) {
      this.$refs.checkboxes[index].toggle()
    },
    confirm () {
      let val = this.result.map(el => this.columns.find(item => item.label === el))
      if(this.isSubmit){
        updateUserSpecificInfo(this.fromData(val)).then(() => {
          this.$parent.$parent.result = val
          this.$parent.$parent.isShow = false
        })
      } else {
        this.$emit('confirm', val)
      }
      
    },
    cancel () {
      this.$parent.$parent.isShow = false
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
          this.result = [this.columns.find(el => el.value === this.data[0]).label]
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
