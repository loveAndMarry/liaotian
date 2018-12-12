import { postMsg, login, getFriendMessage, messageListing, getChatRecord} from '@/assets/common/api'
import utils from '@/assets/common/utils'
import IM from '@/assets/common/IM'
import { Dialog } from 'vant';

const GET_FRIENT_MSG = 'GET_FRIENT_MSG' //判断当前好友是否存在于好友列表中，不存在则添加
const POST_MSG = 'POSTMSG' // 提交当前发送的信息
const UPDATE_USER = 'UPDATEUSER' // 更新个人信息
const GET_FRIEND = 'GETFRIEND' // 获取当前好友列表
const FRIEND_SORT = 'FRIEND_SORT' // 排序当前展示好友的显示顺序
const GET_FRIEND_LIST = 'GETFRIENDLIST' // 获取好友
const UPDATE_FRIEND_LIST = 'UPDATE_FRIEND_LIST' // 刷新好友列表
const GET_FRIEND_MSG_LIST = 'GET_FRIEND_MSG_LIST' // 获取好友历史信息
const GET_CHAT_MESSAGE = 'GETCHATMESSAGE' // 获取当前储存的历史聊天信息
const UPDATE_USER_LIST = 'UPDATEUSERLIST' // 修改当前缓存内好友信息
const RECEIVE_INFORMATION = 'RECEIVEINFORMATION' // 接收到最新的消息

const state = {
  friendList: [], // 储存当前好友列表信息
  chatMessage: {}, // 储存当前好友历史信息
  user: {}, // 储存当前登录人信息
  friend: {}, // 储存当前聊天好友信息
  isLogin: false, // 是否登录成功
  isMsg: true, // 是否还有历史记录
}

const getters = {
  getChatMessage: state => state.chatMessage[state.friend.accountNumber]
}

const actions = {
  [GET_FRIENT_MSG] ({ commit, state }, products) {
    return new Promise((resolve) => {
      
    })
  },
  [POST_MSG] ({ commit, state }, products) {
    return new Promise((resolve) => {
      // 判断当前好友是否存在，不存在将好友添加到联系人列表
      // 将信息提交到容联云
      console.log(state, '好友数据')
      IM.postMsg({
        data:products.context,
        id: products.receiver
      }).then((res) => {
        console.log('当前信息已提交至容联云')
        // 将当前数据提交到后台
        console.log(state.friend)
        postMsg({
          context:products.context,
          sendUserId: state.user.id,
          receiveUserId: state.friend.userId,
          chatDate: products.time,
          type: products.msgType
        }).then((res) => {
          console.log('当前数据已经提交到服务器')
          if(state.friendList.findIndex(el => el.accountNumber === products.receiver) === -1 || state.friendList.length === 0) {
            getFriendMessage({
              accountNumber: products.receiver,
              userId: state.user.id
            }).then((res)=>{

              // 将当前的信息存放在state内存中
              state.chatMessage[products.receiver].push(products)
              // 为了触发getters
              state.chatMessage = Object.assign({}, state.chatMessage)

              utils.pushLocalData('friendList', res.data)
              state.friendList.push(res.data)
              // 将聊天信息的发送人和接受人的账号存入聊天信息
              resolve()
            })
          } else {
            // 将当前的信息存放在state内存中
            state.chatMessage[products.receiver].push(products)
            // 为了触发getters
            state.chatMessage = Object.assign({}, state.chatMessage)

            // 将聊天信息的发送人和接受人的账号存入聊天信息
            resolve()
          }
          // 数据提交完成
          commit(POST_MSG, products)
          
          // 置顶当前好友
          commit(FRIEND_SORT, {
            id: products.receiver
          })
        })
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
    return new Promise((resolve) => {
      login({
        userId: products.userId
      }).then((res) => {
        commit(UPDATE_USER,res.data)
        resolve(res.data)
      })
    })
  },

  [RECEIVE_INFORMATION] ({ commit, state }, products) {
    if(!state.chatMessage[products.sender]){
      state.chatMessage[products.sender] = []
    }
    if(state.friendList.length === 0 || state.friendList.length > 0 && state.friendList.findIndex(item => item.accountNumber === products.sender) === -1){
      // 更改本地缓存中的数据
      getFriendMessage({
        accountNumber: products.sender,
        userId: state.user.id
      }).then((res)=>{

        utils.pushLocalData('friendList', res.data)
        state.friendList.push(res.data)
        // 将聊天信息的发送人和接受人的账号存入聊天信息
        products = Object.assign({},products,{
          sendUserId: res.data.id,
          receiveUserId: state.user.id,
        })

        commit(RECEIVE_INFORMATION, products)
        // 置顶当前好友
        commit(FRIEND_SORT, {
          id: products.sender
        })
      })
      return false
    }

    // 如果当前好友存在，就获取当前好友的id
    let obj = state.friendList.find(el => el.accountNumber === products.sender)
    products = Object.assign({},products,{
      sendUserId: obj.id,
      receiveUserId: state.user.id,
    })

    commit(RECEIVE_INFORMATION, products)
     // 置顶当前好友
     commit(FRIEND_SORT, {
      id: products.sender
    })
  },

  [UPDATE_USER_LIST] ({ commit, state }, products) {
    return new Promise((resolve) => {
      commit(UPDATE_USER_LIST, products)
      resolve(products)
    })
  },
  // 获取好友信息
  [GET_FRIEND_LIST] ({ commit, state }, fn) {
    messageListing({
      limitStart: state.friendList.length || 0,
      pageSize: 10,
      userId: state.user.id
    }).then((res) => {
      if(res.data){
        if(res.data.length < 10){
          fn(true)
        }
        state.friendList.push(...res.data)
        fn()
      } else {
        fn(true)
      }
    })
  },
  [UPDATE_FRIEND_LIST] ({ commit, state }, fn) {
    messageListing({
      limitStart: 0,
      pageSize: state.friendList.length,
      userId: state.user.id
    }).then((res) => {
      this.friendList = res.data
      fn()
    })
  },
  // 获取好友历史信息
  [GET_FRIEND_MSG_LIST] ({ commit, state }) {
    return new Promise((resolve) => {
      if(state.isMsg){
        getChatRecord({
          limitStart: state.chatMessage[state.friend.accountNumber].length || 0,
          pageSize: 10,
          sendUserId: state.user.id,
          receiveUserId: state.friend.userId
        }).then((res) => {
          if(res.data){
            state.chatMessage[state.friend.accountNumber].unshift(...res.data)
             // 为了触发getters
            state.chatMessage = Object.assign({}, state.chatMessage)
  
            if(res.data.length < 10){
              state.isMsg = false
              state.chatMessage[state.friend.accountNumber].unshift({
                type: 'msg',
                context: '--没有更多的历史消息了--'
              })
            }
            resolve()
          } else {
            state.isMsg = false
            resolve()
          }
        })
      } else {
        resolve()
      }
    })
  }
}

const mutations = {
  [POST_MSG] (state, products) {
    // 更改当前这条信息的状态(更改为发送成功)
    // state.chatMessage[products.receiver] = utils.updateArray(state.chatMessage[products.receiver], products.id, {status: 2})

    // 更改本地缓存中的数据
    utils.pushLocalData('chatMessage', products.receiver, products)
    // 修改当前用户的最新消息
    utils.updateArray(state.friendList, products.receiver, {
      hint: 0,
      context: products.context,
      status: 2,
      time: products.time
    })

    // 置顶当前好友
    this.commit(FRIEND_SORT, {
      id: products.receiver
    })

    // 更新缓存中的数据
    localStorage.setItem('friendList',JSON.stringify(state.friendList))
  },
  [RECEIVE_INFORMATION] (state, products) {
    // 将当前的信息存放在state内存中
    state.chatMessage[products.sender].push(products)

    // 更改本地缓存中的数据
    utils.pushLocalData('chatMessage', products.sender, products)

    utils.updateArray(state.friendList, products.sender, {
      context: products.context,
      hint: true, // 更新最新消息条数
      status: 2,
      time: products.time
    } )

    // 更新缓存中的数据
    localStorage.setItem('friendList',JSON.stringify(state.friendList))

    // 为了触发getters
    state.chatMessage = Object.assign({}, state.chatMessage)
  },
  // 设置当前登录人信息
  [UPDATE_USER] (state, products) {
    state.user = Object.assign({},products)
  },
  // 设置当前正在联系的好友信息
  [UPDATE_USER_LIST] (state, products) {
    state.friend = products;
    if(!state.chatMessage[products.accountNumber]){ 
      state.chatMessage[products.accountNumber] = []
    }
  },
  // 对好友列表进行排序  时间排序
  [FRIEND_SORT] (state, products) {
    if(state.friendList.length === 0 || state.friendList.findIndex(el => el.accountNumber === products.id) === -1){
      return 
    }
    let arr = state.friendList
    let obj = arr.find(el => el.accountNumber === products.id)
    arr.splice(arr.findIndex(el => el.accountNumber === products.id), 1)
    arr.unshift(obj)
    state.friendList = arr
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}