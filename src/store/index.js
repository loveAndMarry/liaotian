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
    console.log('postMsg被触发了')
    commit('postMsg', products)
  },
  getMsg ({ commit, state }, products) {
    console.log('getMsg被触发了')
    commit('getMsg', products)
  },
  getContentMsg ({ commit, state }, products) {
    console.log('getContentMsg被触发了')
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

    utils.pushStorage('notSubmitRocerd', localStorage.getItem('friendUserName'), record)
    state.rocerd.push(record)
  },
  getMsg () {
    this.getContentMsg()
  },
  getContentMsg (state) {
    // 获取当前好友用户名
    var username = localStorage.getItem('friendUserName')
    var record = null
    var notSubmitRocerd = null
    // 如果当前是第一次聊天，会先给当前聊天信息创建一个容器
    if ((JSON.parse(localStorage.getItem('record')))[username]) {
      record = (JSON.parse(localStorage.getItem('record')))[username]
    } else {
      let a = JSON.parse(localStorage.getItem('record'))
      a[username] = []
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
