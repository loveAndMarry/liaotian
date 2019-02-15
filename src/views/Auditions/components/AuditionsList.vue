<template>
  <PullRefresh v-model="isLoading" @refresh="onRefresh" :disabled="isDisabled">
    <List 
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    class="dynamic"
    :style="{minHeight: height - 140 + 'px'}"
    ref='dynamic'>
      <div v-for="(el, index) in list" :key="index" @touchstart="touchstart(el, index)">
        <SwipeCell :right-width="65" :on-close="onClose" :ref="'SwipeCell' + index" :disabled="swipeDisabled(el)">
          <AuditionsItem  :el="el" :type="type"/>
          <span slot="right" class="remove">删除</span>
        </SwipeCell>
      </div>
    </List>
  </PullRefresh>
</template>
<script>
import { PullRefresh , List, SwipeCell, Dialog} from 'vant'
import AuditionsItem from './AuditionsItem'
import { listMassSelection ,deleteMassSelection} from '@/assets/common/api'
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
      list: [],
      instance: -1,
      item:{} // 储存当前滑动的海选数据
    }
  },
  computed: {
    height () {
      return window.document.body.clientHeight || window.document.documentElement.clientHeight
    }
  },
  methods: {
    onClose (clickPosition, instance) {
       switch (clickPosition) {
        case 'outside':
          instance.close();
          break;
        case 'right':
          Dialog.confirm({
            message: '确定删除吗？'
          }).then(() => {
            deleteMassSelection({
              userId: this.$store.state.IM.user.id,
              massSelectionId: this.item.id
            }).then(() => {
              this.list = this.list.filter(item => item.id !== this.item.id)
            })
            
          });
          break;
      }
    },
    swipeDisabled (el) {
      this.item = el
      if(this.type === '1'){
        return true
      }
      return el.openState !== '2' ? false : true
    },
    touchstart (el, index) {
      if(this.instance > -1 && this.instance != index){
        this.$refs['SwipeCell' + this.instance][0].close()
      }
      this.item = el
      this.instance = index
    },
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
    PullRefresh,
    SwipeCell
  }
}
</script>
<style scoped>
.remove{
  color: #fff;
  font-size: .32rem;
  width: 65px;
  height: 2.37rem;
  line-height: 2.37rem;
  display: inline-block;
  text-align: center;
  background-color: #f44;
}
</style>
