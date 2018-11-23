import HTTP from './http'

/**
 * 聊天模块
 */

// 获取当前用户信息
export const login = data => HTTP.GET('web/selectUser/findUserInfoBasics', data)

// 获取好友列表
export const getFriendsList = data => HTTP.GET('getFriendsList', data)

// 获取好友列表
export const postMsg = data => HTTP.POST('postMsg', data)
