import MD5 from 'js-md5'

let RL_YTX = window.RL_YTX
console.log(RL_YTX)

function IM () {
  // 应用ID
  this.appid = '8aaf0708669b101e01669ea18b6d01ed'
  // 应用token
  this.appToken = 'c72930dbb2830afaa7cff043bb209a1a'
  // 是否第三方获取sig
  this.flag = false
  this.loginType = 1
  this.userName = '15254323904'
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
    console.log('初始化完成')
    this.login()
  },
  login () {
    // 账号登录参数设置
    var loginBuilder = new RL_YTX.LoginBuilder()
    // 登录类型 1账号登录，3voip账号密码登录
    loginBuilder.setType(this.loginType)
    // 设置用户名
    loginBuilder.setUserName(this.userName)
    // 设置sig
    loginBuilder.setSig(this.sig())

    console.log('sig==', this.sig())
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
  }
}

window.YTX = new IM()
