/**
 *  主要处理群组之间的聊天逻辑，并储存聊天的信息
 */

import IM from '@/assets/common/IM'
import Axios from 'axios';
import utils from '@/assets/common/utils'
import { listGroupChatRecord , listMassSelectionMembers , sendGroupMessage, getFriendMessage} from '@/assets/common/api'

const state = {
  newMsg: {}, // 储存最新接受到的聊天信息（获取个人信息时是异步，所以现将最新消息保存起来）
  newMembers: [], // 储存正在请求的个人信息id,如果存在id就说明当前用户正在请求详细数据中
  message: {}, // 储存每个群组的聊天内容
  groupId: '', // 当前进入的群组id
  groupMembers:{}, // 储存当前群组中的人员集合
}

const getters = {
  // 获取当前进入群组的聊天信息
  messageList: state => utils.arraySort(state.message[state.groupId], 'chatDate'),
  // 获取当前进入群组的好友列表
  memberList: state => state.groupMembers[state.groupId],
  // 获取管理员
  admin: state => state.groupMembers[state.groupId].filter(el => el.isGroupOwner === '1'),
  // 获取群成员
  groupMemberList: state => state.groupMembers[state.groupId].filter(el => el.isGroupOwner === '0'),
}

const actions = {
  // 发送群组消息
  postGroupMsg ({state, rootState} , products) {
    // 将当前发送的信息添加到历史消息里
    state.message[state.groupId].push(products)
    
    state.message = Object.assign({}, state.message)
    console.log(state)
    return new Promise((resolve, reject) => {
      // 向容联云发送消息
      IM.postMsg({
        data:products.context,
        id: state.groupId,
        type: 2
      }).then((res) => {
        // 向服务器发送消息,用于保存历史数据
        sendGroupMessage({
          context:products.context,
          sendUserId: rootState.IM.user.id,
          groupId: state.groupId,
          chatDate: products.chatDate,
          type: products.msgType
        }).then(res => {
          resolve()
        })
      })
    })
  },
  // 监听获取的最新的信息
  monitorNewMsg ({ state , rootState}, products) {
    // 接受到消息后，先判断是否进入了当前群组聊天室，进入聊天室就向当前聊天室添加最新消息，没有进入聊天室就跳出操作，因为进入聊天室之后，第一件事是加载历史数据
    if( state.groupId !== '' &&  state.groupId === products.receiver){

      // 判断信息的发送者在不在当前群里（当这个发送者刚刚进入这个群时，本地的好友列表还没有更新，所以会查不到当前好友的信息）
      if(state.groupMembers[products.receiver].findIndex(el => el.accountNumber === products.sender) === -1){

        // 先将接受到的历史消息保存起来
        state.newMsg[products.sender] = []
        state.newMsg[products.sender].push(products)
        
        // 判断当前发送者的详细信息是否在请求中，没有请求中，就请求
        if( state.newMembers.findIndex(el => el === products.sender) === -1 ){
          // 获取好友详情接口
          getFriendMessage({
            userId: rootState.IM.user.id,
            accountNumber: products.sender
          }).then(res => {

            // 将获取到得用户信息添加到好友列表中
            state.groupMembers[products.receiver].push(res.data);

            // 将没有添加的最新信息添加到消息列表中
            state.newMsg[products.sender].forEach(ele => {
              state.message[products.receiver].push(Object.assign({
                userHead: res.data.userHead,
                sendUserId: res.data.userId
              }, ele))
            })

            state.message = Object.assign({}, state.message)
          })
        }
      } else {
        // 获取当前发送信息的人的详细信息
        var obj = state.groupMembers[products.receiver].find(el => el.accountNumber === products.sender)
        // 将当前发送消息的头像保存到数据中
        state.message[products.receiver].push(Object.assign({
          userHead: obj.userHead,
          sendUserId: obj.userId
        }, products))

        state.message = Object.assign({}, state.message)
      }
    }
  },
  // 通过群组id获取当前群组成员信息和历史信息
  getGroupData ({dispatch, state}, products) {
    state.groupId = products

    return new Promise((resolve, reject) => {
      let arr = []
      
      // 判断当前好友列表是否已经获取到了
      if(!state.groupMembers[products] || state.groupMembers[products].length === 0){
        arr.push(dispatch('getGroupMembers', products))
      }

      // 判断当前好友列表是否已经获取到了
      if(!state.message[products] || state.message[products].length === 0){
        arr.push(dispatch('getGroupMessage', products))
      }

      Axios.all(arr).then(() => {
        // 设置当前进入的群组id
        resolve()
      })
    })
  },
  // 点击进入聊天室时执行当前函数
  // 获取当前群组的好友列表信息
  getGroupMembers ({state, rootState}, products) {
    return new Promise(resolve => {
      listMassSelectionMembers({
        groupId : state.groupId
      }).then(res => {
        if(res.data && res.data.length > 0){
          state.groupMembers[state.groupId] = res.data
          state.groupMembers = Object.assign({}, state.groupMembers)
        } else {
          state.groupMembers[state.groupId] = []
        }
        resolve()
      })
    })
  },
  // 点击进入聊天室时执行当前函数
  // 获取当前群组聊天信息
  /**
   * @param {*} products 群组id
   */
  getGroupMessage ({state, rootState}, products) {
    return new Promise((resolve,reject) => {
      listGroupChatRecord({
        groupId : state.groupId,
        userId: rootState.IM.user.id,
        // 判断当前群组的历史消息个数，如果还没有创建储存群组消息的数组，那就从0个查询
        limitStart: state.message[state.groupId] ? state.message[state.groupId].length : 0,
        pageSize: 10
      }).then(res => {
        // 判断当前是否获取到了历史消息
        if(res.data){
          // 如果当前历史消息存在并且有数据
          if (state.message[state.groupId] && state.message[state.groupId].length > 0) {

            state.message[state.groupId].unshift(...res.data)

            // 如果没有最新的消息了
            if(res.data.length < 10){
              state.message[state.groupId].unshift({
                type: 'msg',
                context: '--没有更多的历史消息了--'
              })
              resolve(res.data)
            } else {
              resolve(res.data)
            }
          //没有数据就直接赋值
          } else {
            if(!state.message[state.groupId]){
              state.message[state.groupId] = []
            }
            if(!res.data && !state.message[state.groupId]){
              state.message[state.groupId] = []
            } else {
              state.message[state.groupId].push(...res.data)
            }
            resolve(res.data) 
          }
        // 没有获取到历史消息就赋值为空
        } else {
          if(!state.message[state.groupId]){
            state.message[state.groupId] = []
            state.message[state.groupId].unshift({
              type: 'msg',
              context: '--没有更多的历史消息了--'
            })
          }
          resolve(res.data)
        }
      })
    })
  }
}

export default {
  state,
  getters,
  actions
}