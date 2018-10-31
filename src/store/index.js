import Vue from 'vue'
import Vuex from 'vuex'
import utils from '@/common/utils'

Vue.use(Vuex)

const state = {
  notSubmitRocerd: [], // 当前未提交的消息
  rocerd: [], // 当前已经提交的消息
  username: '', // 当前登录人用户名
  checkoutStatus: null
}

// getters
const getters = {}
// actions
const actions = {
  postMsg ({ commit, state }, products) {
    console.log('actions被触发了')
    commit('postMsg', products)
  },
  getMsg ({ commit, state }, products) {
    console.log('actions被触发了')
    commit('getMsg', products)
  },
  getContentMsg ({ commit, state }, products) {
    console.log('actions被触发了')
    commit('getContentMsg')
  }
}

// mutations
const mutations = {
  postMsg (state, products) {
    console.log('mutations被触发了', products)
    let record = {
      content: products.msgContent,
      type: products.msgType,
      id: products.msgId,
      time: products.msgDateCreated,
      msgType: 1
    }

    utils.pushStorage('notSubmitRocerd', localStorage.getItem('username'), record)
    state.rocerd.push(record)
  },
  getMsg () {
    console.log(this, 'getMsg')
  },
  getContentMsg (state) {
    var username = localStorage.getItem('username')
    var record = null
    var notSubmitRocerd = null
    // 如果当前是第一次聊天，会先给当前聊天信息创建一个容器
    if ((JSON.parse(localStorage.getItem('record')))[username]) {
      record = (JSON.parse(localStorage.getItem('record')))[username]
    } else {
      let a = JSON.parse(localStorage.getItem('record'))
      console.log(a)
      a[username] = []
      console.log(a)
      localStorage.setItem('record', JSON.stringify(a))
      record = []
    }

    if ((JSON.parse(localStorage.getItem('notSubmitRocerd')))[username]) {
      notSubmitRocerd = (JSON.parse(localStorage.getItem('notSubmitRocerd')))[username]
    } else {
      let a = JSON.parse(localStorage.getItem('notSubmitRocerd'))
      a[username] = []
      localStorage.setItem('notSubmitRocerd', JSON.stringify(a))
      notSubmitRocerd = []
    }
    record.push(...notSubmitRocerd)
    state.rocerd = record
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
