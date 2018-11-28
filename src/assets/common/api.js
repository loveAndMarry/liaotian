import HTTP from './http'

/**
 * 聊天模块
 */

// 获取当前用户信息
export const login = data => HTTP.GET('web/selectUser/findUserInfoBasics', data)

// 获取好友列表
export const getFriendsList = data => HTTP.GET('getFriendsList', data)

// 发送聊天信息
export const postMsg = data => HTTP.GET('web/messengerAccount/sendMessage', data)

// 根据容联云账号获取详细信息
export const getFriendMessage = data => HTTP.GET('web/selectUser/queryContactsUserInfo', data)

// 获取好友列表
export const messageListing = data => HTTP.GET('web/selectUser/messageListing',data)

// 获取好友历史信息
export const getChatRecord = data => HTTP.GET('web/messengerAccount/getChatRecord',data)

/**
 * 主页模块
 */
// 获取基本筛选条件字典
export const basicQueryCriteria = (data) => HTTP.GET('web/queryCriteria/basicQueryCriteria',data)

// 获取高级筛选条件字典
export const advancedQueryCriteria = data => HTTP.GET('web/queryCriteria/advancedQueryCriteria',data)

// 获取用户列表  （筛选）
export const listUser = data => HTTP.GET('web/selectUser/listUser',data)

/**
 * 字典接口
 */
// 获取省市区域
export const getProvinceAndCityList = data => HTTP.GET('app/area/getProvinceAndCityList',data)

export const dictionaryQuery = data => HTTP.GET('web/queryCriteria/dictionaryQuery', data)
