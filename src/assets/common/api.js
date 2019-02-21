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

// 发送聊天信息
export const sendMessageCustomerService = data => HTTP.GET('web/messengerAccount/sendMessageCustomerService', data)

// 根据容联云账号获取详细信息
export const getFriendMessage = data => HTTP.GET('web/selectUser/queryContactsUserInfo', data)

// 获取消息列表
export const messageListing = data => HTTP.GET('web/messageFiletering/messageListing',data)

// 获取好友历史信息
export const getChatRecord = data => HTTP.GET('web/messengerAccount/getChatRecord',data)

// 删除好友列表
export const deleteMessageRecords = data => HTTP.GET('web/messengerAccount/deleteMessageRecords',data)

// 发送群组消息
export const sendGroupMessage = data => HTTP.GET('web/messengerAccount/sendGroupMessage',data)

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

//获取当前用户默认的筛选条件
export const getUserSpouseIntention = data => HTTP.GET('web/selectUser/getUserSpouseIntention',data)

//获取当前用户个人动态
export const accessUserDynamics = data => HTTP.GET('web/dynamic/accessUserDynamics',data)

//点赞好友动态
export const dynamicLike = data => HTTP.GET('web/dynamic/dynamicLike',data)

//获取所有动态
export const listGlobalDynamics = data => HTTP.GET('web/dynamic/listGlobalDynamics',data)

//获取所有权限标识
export const listJurisdictionPermissionList = data => HTTP.GET('web/userMember/listJurisdictionPermissionList',data)

/**
 * 个人中心模块
 */
// 获取个人主页信息
export const personalCenter = data => HTTP.GET('web/selectUser/personalCenter',data)

// 获取个人资料信息
export const userPersonalCenterInformation = data => HTTP.GET('web/selectUser/userPersonalCenterInformation',data)

// 获取个人相册
export const userPhoto = data => HTTP.GET('web/selectUser/userPhoto',data)

// 修改个人资料信息
export const updateUserSpecificInfo = data => HTTP.GET('web/updateUserController/updateUserPersonalInformation',data)

// 修改个人生日
export const updateUserBirthday = data => HTTP.GET('web/updateUserController/updateUserBirthday',data)

// 修改用户昵称
export const updateUserNiceName = data => HTTP.GET('web/user/updateUserNiceName',data)

// 修改用户个人简介
export const updateUserPersonalIntroduction = data => HTTP.GET('web/updateUserController/updateUserPersonalIntroduction',data)

// 获取用户的访客记录
export const accessRecordUser = data => HTTP.GET('web/userAccessRecord/accessRecordUser',data)

// 获取谁喜欢我列表
export const likeMeList = data => HTTP.GET('web/like/likeMeList',data)

// 获取谁看过我列表
export const personalCenterAccessRecordUser = data => HTTP.GET('web/userAccessRecord/personalCenterAccessRecordUser',data)

// 获取我喜欢谁列表
export const likeUserList = data => HTTP.GET('web/like/likeUserList',data)

// 获取互相喜欢列表
export const likeEachOther = data => HTTP.GET('web/like/likeEachOther',data)

// 删除用户的访客记录
export const deleteAccessRecord = data => HTTP.GET('web/userAccessRecord/deleteAccessRecord',data)

// 查询用户的动态
export const getUserDynamic = data => HTTP.GET('web/dynamic/getUserDynamic',data)

// 删除用户的动态
export const deleteDynamic = data => HTTP.GET('web/updateUserController/deleteDynamic',data)

// 修改个人资料头像
export const uploadUserHand = data => HTTP.GET('web/updateUserController/uploadUserHand',data)

// 上传个人相册图片
export const uploadPhoto = data => HTTP.GET('web/updateUserController/uploadPhoto',data)

// 删除个人相册图片
export const deletePhoto = data => HTTP.GET('web/updateUserController/deletePhoto',data)

// 获取个人订单列表
export const listUserOrder = data => HTTP.GET('web/userOrders/listUserOrder',data)

// 获取展示列表
export const menuTreeDate = data => HTTP.GET('web/menu/menuTreeDate?parentId=1',data)

// 获取消息通知列表
export const listMessageNotification = data => HTTP.GET('web/messageNotification/listMessageNotification',data)

// 获取个人余额
export const userWallet = data => HTTP.GET('web/userWallet/userWallet',data)

/**
 *  海选模块
 */

// 发布海选内容
export const initiateMassSelection = data => HTTP.GET('web/massSelection/initiateMassSelection',data)

// 获取海选列表
export const listMassSelection = data => HTTP.GET('web/massSelection/listMassSelection',data)

// 根据海选活动id获取详情
export const getMassSelectionDetails = data => HTTP.GET('web/massSelection/getMassSelectionDetails',data)

// 用户报名海选活动
export const participateInMassSelection = data => HTTP.GET('web/massSelection/participateInMassSelection',data)

// 获取群组聊天记录
export const listGroupChatRecord = data => HTTP.GET('web/messengerAccount/listGroupChatRecord',data)

// 获取群成员列表
export const listMassSelectionMembers = data => HTTP.GET('web/massSelection/listMassSelectionMembers',data)

// 获取报名参加人员列表
export const applyToJoinMassSelectionList = data => HTTP.GET('web/massSelection/applyToJoinMassSelectionList',data)

// 获取报名参加人员列表
export const candidacyAudit = data => HTTP.GET('web/massSelection/candidacyAudit',data)

// 判断当前用户是否加入海选中
export const isJoinMassSelection = data => HTTP.GET('web/massSelection/isJoinMassSelection',data)

// 跟据用户id模糊查询用户列表
export const listMassSelectionMembeByUserNoLike = data => HTTP.GET('user/maritimeMatchingApplication/listMassSelectionMembeByUserNoLike',data)

// 海选发起人向用户发起配对邀请
export const maritimeMatchingApplication = data => HTTP.GET('web/massSelection/maritimeMatchingApplication',data)

// 查看当前匹配申请的状态
export const getMatchingResults = data => HTTP.GET('user/maritimeMatchingApplication/getMatchingResults',data)

// 查看申请配对邀请详情
export const selectMaritimeMatchingApplication = data => HTTP.GET('user/maritimeMatchingApplication/selectMaritimeMatchingApplication',data)

// 同意对方的配对申请
export const disposeMaritimeMatchingApplication = data => HTTP.GET('user/maritimeMatchingApplication/disposeMaritimeMatchingApplication',data)

// 根据申请加入海选的id获取详情 
export const getApplyToJoinMassSelection = data => HTTP.GET('web/massSelection/getApplyToJoinMassSelection',data)

// 获取申请加入海选的详情接口 
export const getApplyToJoinMassSelectionByMassSelectionId = data => HTTP.GET('web/massSelection/getApplyToJoinMassSelectionByMassSelectionId',data)

// 获取海选匹配状态
export const selectMaritimeMatchingApplicationByMassSelectionId = data => HTTP.GET('user/maritimeMatchingApplication/selectMaritimeMatchingApplicationByMassSelectionId',data)

// 获取海选分润列表                                                                                                             
export const listBonusRecord = data => HTTP.GET('web/bouns/listBonusRecord',data)

// 删除列表中审核中或者失败或者未发布或者活动结束的群组                                                                                                             
export const deleteMassSelection  = data => HTTP.GET('web/massSelection/deleteMassSelection',data)

// 群成员退出群组                                                                                                         
export const exitGroup  = data => HTTP.GET('web/massSelection/exitGroup',data)




/**
 * 字典接口
 */
// 获取省市区域
export const getProvinceAndCityList = data => HTTP.GET('web/area/getProvinceAndCityList',data)

// 获取兴趣爱好
export const interest = data => HTTP.GET('web/queryCriteria/interest',data)

// 根据type值获取对应的字典值
export const dictionaryQuery = data => HTTP.GET('web/queryCriteria/dictionaryQuery', data)

// 根据userId 获取当前的会员列表
export const getMemberLevelList = data => HTTP.GET('web/userMember/getMemberLevelList', data)

// 获取当前会员价格信息
export const getMemberPrice = data => HTTP.GET('web/userMember/getMemberPrice', data)

// 获取轮播图内容
export const listBanner = data => HTTP.GET('web/banner/listBanner', data)

// 获取当前群组可以注册的人数类型
export const listConfigureDictByType = data => HTTP.GET('web/configuredict/listConfigureDictByType',data)

// 获取当前所有的礼物列表
export const listGift = data => HTTP.GET('web/gift/listGift',data)

// 获取当前登录人的剩余虚拟币数量
export const getUserVirtualCurrencyPrice = data => HTTP.GET('web/virtualCurrencyPrice/getUserVirtualCurrencyPrice',data)

// 获取当前登录人的礼物详情
export const listGiftRecord = data => HTTP.GET('web/gift/listGiftRecord',data)

// 发送礼物
export const sendGift = data => HTTP.GET('web/gift/sendGift',data)

// 虚拟币价格表
export const listVirtualCurrencyPrice = data => HTTP.GET('web/virtualCurrencyPrice/listVirtualCurrencyPrice',data)


/**
 * 注册时候完善个人信息
 */

export const initialInformation = data => HTTP.GET('web/updateUserController/initialInformation', data)


/**
 * 活动接口
 */

 // 领取会员活动接口
export const participationActivities = data => HTTP.GET('web/userActivity/participationActivities', data)