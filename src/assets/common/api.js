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

// 获取消息列表
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

// 获取用户个人信息
export const userInformationDisplay = data => HTTP.GET('web/userAccessRecord/userInformationDisplay',data)

//取消喜欢
export const cancellikeUser = data => HTTP.GET('web/like/cancellikeUser',data)

//喜欢
export const likeUser = data => HTTP.GET('web/like/likeUser',data)

/**
 * 个人中心模块
 */
// 获取个人主页信息
export const personalCenter = data => HTTP.GET('web/selectUser/personalCenter',data)

// 获取个人资料信息
export const userPersonalCenterInformation = data => HTTP.GET('web/selectUser/userPersonalCenterInformation',data)

// 修改个人资料信息
export const updateUserSpecificInfo = data => HTTP.GET('web/updateUserController/updateUserSpecificInfo',data)

// 修改用户昵称
export const updateUserNiceName = data => HTTP.GET('app/user/updateUserNiceName',data)

// 修改用户个人简介
export const updateUserPersonalIntroduction = data => HTTP.GET('web/updateUserController/updateUserPersonalIntroduction',data)

// 获取用户的访客记录
export const accessRecordUser = data => HTTP.GET('web/userAccessRecord/accessRecordUser',data)

// 删除用户的访客记录
export const deleteAccessRecord = data => HTTP.GET('web/userAccessRecord/deleteAccessRecord',data)

// 查询用户的动态
export const getUserDynamic = data => HTTP.GET('web/dynamic/getUserDynamic',data)

/**
 * 字典接口
 */
// 获取省市区域
export const getProvinceAndCityList = data => HTTP.GET('app/area/getProvinceAndCityList',data)

// 获取兴趣爱好
export const interest = data => HTTP.GET('web/queryCriteria/interest',data)

// 根据type值获取对应的字典值
export const dictionaryQuery = data => HTTP.GET('web/queryCriteria/dictionaryQuery', data)
