import HTTP from './http'

/**
 * 聊天模块
 */

 // 获取好友列表
 export const getFriendsList = data => HTTP.GET('getFriendsList',data)