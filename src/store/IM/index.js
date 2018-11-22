import { postMsg } from '@/assets/common/api'
import utils from '@/assets/common/utils'
import IM from '@/assets/common/IM'
import { friendList } from '../../../data/data'

const POST_MSG = 'POSTMSG' // 提交当前发送的信息
const UPDATE_USER = 'UPDATEUSER' // 更新个人信息
const GET_FRIEND = 'GETFRIEND' // 获取当前好友列表
const GET_CHAT_MESSAGE = 'GETCHATMESSAGE' // 获取当前储存的历史聊天信息
const UPDATE_USER_LIST = 'UPDATEUSERLIST' // 修改当前缓存内好友信息
const RECEIVE_INFORMATION = 'RECEIVEINFORMATION' // 接收到最新的消息

const state = {
  friendList: [], // 储存当前好友列表信息
  chatMessage: {}, // 储存当前好友历史信息
  user: {}, // 储存当前登录人信息
  friend: {}, // 储存当前聊天好友信息
  isLogin: false, // 是否登录成功
}

const getters = {
  getFrientList: state => state.friendList,
  getChatMessage: state => state.chatMessage
}

const actions = {
  [POST_MSG] ({ commit, state }, products) {
    return new Promise((resolve) => {
      // 将当前的信息存放在state内存中
      state.chatMessage[products.receiver].push(products)
      // 将信息提交到容联云
      IM.postMsg({
        data:products.content,
        id: products.receiver
      }).then((res) => {
        console.log('当前信息已提交至容联云')
        // 将当前数据提交到后台
        // postMsg({
        //   ...products
        // }).then((res) => {
        //   console.log('当前数据已经提交到服务器')
        //   // 数据提交完成
        //   commit(POST_MSG, res.data)
        resolve(products)
        // })
      })
    })
  },
  [GET_FRIEND] ({ commit, state }, products) {
    // 如果当前没有好友信息
    if(!JSON.parse(localStorage.getItem('friendList'))){
      localStorage.setItem('friendList', JSON.stringify([]))
    }
    state.friendList = JSON.parse(localStorage.getItem('friendList'))
  },
  [GET_CHAT_MESSAGE] ({ commit, state }, products) {
    if(!JSON.parse(localStorage.getItem('chatMessage'))){
      localStorage.setItem('chatMessage', JSON.stringify({}))
    }
    state.chatMessage = JSON.parse(localStorage.getItem('chatMessage'))
  },
  [UPDATE_USER] ({ commit, state }, products) {
    commit(UPDATE_USER,products)
  },
  [RECEIVE_INFORMATION] ({ commit, state }, products) {
    commit(RECEIVE_INFORMATION, products)
  },
  [UPDATE_USER_LIST] ({ commit, state }, products) {
    return new Promise((resolve) => {
      commit(UPDATE_USER_LIST, products)
      resolve(products)
    })
  }
}

const mutations = {
  [POST_MSG] (state, products) {
    // 更改当前这条信息的状态(更改为发送成功)
    state.chatMessage[products.recipient] = utils.updateArray(state.chatMessage[products.recipient], products.id, {status: 2})
  },
  [RECEIVE_INFORMATION] (state, products) {
    // 将当前的信息存放在state内存中
    state.chatMessage[products.recipient].push(products)
  },
  [UPDATE_USER] (state, products) {
    state.user = Object.assign({},products)
  },
  [UPDATE_USER_LIST] (state, products) {
    state.friend = products;
    console.log(state)
    debugger
    if(!state.chatMessage[products.accountNumber]){
      state.chatMessage[products.accountNumber] = []
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}