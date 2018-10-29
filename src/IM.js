import MD5 from 'js-md5'
import axios from './assets/http'

let RL_YTX = window.RL_YTX
console.log(RL_YTX)

function IM () {
  // 应用ID
  this.appid = '8aaf0708669b101e01669ea18b6d01ed'
  // 应用token
  this.appToken = 'c72930dbb2830afaa7cff043bb209a1a'
  // 是否第三方获取sig
  this.flag = false
  // 当前登录状态
  this.loginType = 1
  // 用户名
  this.userName = '15254323904'
  // 昵称
  this.nickName = ''
  // 出生年月
  this.birth = ''
  // 性别
  this.sex = ''
  // 个性签名
  this.sign = ''
  // 用户id
  this.userId = ''
  // 当前信息版本号
  this.version = ''
  this.timestamp = function () {
    var now = new Date()
    var timestamp = now.getFullYear() + '' + ((now.getMonth() + 1) >= 10 ? '' + (now.getMonth() + 1) : '0' + (now.getMonth() + 1)) + (now.getDate() >= 10 ? now.getDate() : '0' + now.getDate()) + (now.getHours() >= 10 ? now.getHours() : '0' + now.getHours()) + (now.getMinutes() >= 10 ? now.getMinutes() : '0' + now.getMinutes()) + (now.getSeconds() >= 10 ? now.getSeconds() : '0' + now.getSeconds())
    return timestamp
  }
  this.sig = function () {
    return MD5(this.appid + this.userName + this.timestamp() + this.appToken)
  }
}

IM.prototype = {
  init () {
    var resp = RL_YTX.init(this.appid)
    if (resp.code === 170002) {
      // 缺少必要参数，详情见msg参数
      // 用户逻辑处理
    } else if (resp.code === 174001) {
      // 不支持HTML5，关闭页面//用户逻辑处理}
    } else if (resp.code === 200) {}
    // 登录
    this.login()
  },
  /**
   * 登录
   */
  login () {
    // var that = this
    // 账号登录参数设置
    var loginBuilder = new RL_YTX.LoginBuilder()
    // 登录类型 1账号登录，3voip账号密码登录
    loginBuilder.setType(this.loginType)
    // 设置用户名
    loginBuilder.setUserName(this.userName)
    // 设置sig
    loginBuilder.setSig(this.sig())
    // 设置时间戳
    loginBuilder.setTimestamp(this.timestamp())
    // 执行用户登录
    RL_YTX.login(loginBuilder, function (obj) {
      // 登录成功回调
    // 注册接收消息事件监听
      console.log('用户登录成功')
    }, function (obj) {
      console.log('登录失败')
    })
  },
  /**
   * 获取当前好友列表
   */
  getFriendsList () {
    return axios.GET('getFriendsList', {}).then((res) => {
      console.log(typeof res)
      if (res.code === 200) {
        localStorage.setItem('friendsList', JSON.stringify(res.data))
        localStorage.setItem('isFriendsList', true)
      }
    })
  },
  /**
   * 向服务器发送没有提交的数据（消息）
   */
  postRecord (data) {
    return axios.POST('record', data)
  },
  /**
   * 获取当前个人信息
   */
  getUser () {
    var that = this
    RL_YTX.getMyInfo(function (obj) {
      console.log(obj, '当前个人信息')
      that.nickName = obj.nickName // 昵称
      that.version = obj.version // 信息版本号
      that.sex = obj.sex // 当前性别
      that.sign = obj.sign //  个性签名
      that.birth = obj.birth // 出生年月
    })
  },
  /**
   * 设置当前个人信息
   */
  setUser ({nickName = '', sex = 1, birth = '1990-01-01', sign = ''}) {
    var that = this
    var uploadPersonInfoBuilder = new RL_YTX.UploadPersonInfoBuilder()
    uploadPersonInfoBuilder.setNickName(nickName)
    uploadPersonInfoBuilder.setSex(sex)
    uploadPersonInfoBuilder.setBirth(birth)
    uploadPersonInfoBuilder.setSign(sign)
    RL_YTX.uploadPerfonInfo(uploadPersonInfoBuilder, function (obj) {
      that.version = obj.version // 设置当前个人信息版本号
      console.log('修改完成')
    })
  }
}

window.YTX = new IM()
