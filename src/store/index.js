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
const getters = {
  getContentMsg: (state, getters, rootState) => {
    var username = localStorage.getItem('username')
    var record = null
    var notSubmitRocerd = null
    // 如果当前是第一次聊天，会先给当前聊天信息创建一个容器
    try {
      record = (JSON.parse(localStorage.getItem('record')))[username]
    } finally {
      (JSON.parse(localStorage.getItem('record')))[username] = []
      record = []
    }

    try {
      notSubmitRocerd = (JSON.parse(localStorage.getItem('notSubmitRocerd')))[username]
    } finally {
      (JSON.parse(localStorage.getItem('notSubmitRocerd')))[username] = []
      notSubmitRocerd = []
    }
    record.push(...notSubmitRocerd)
    return record
  }
}

// actions
const actions = {
  postMsg ({ commit, state }, products) {
    console.log('actions被触发了')
    commit('postMsg', products)
  },
  getMsg ({ commit, state }, products) {
    console.log('actions被触发了')
    commit('getMsg', products)
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
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
