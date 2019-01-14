window.baseURL = 'http://192.168.1.9:8080/qike-maiyuan'
// window.baseURL = 'http://yuan.minmai1688.com/'

// 点击调用图片和拍照
window.updatePhoto = function(callback){
  if(typeof callback === 'function'){
    this.callback = callback
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
      console.log("安卓手机");
      alert('updatePhoto')
    } else if (u.indexOf('iPhone') > -1) {//苹果手机
      console.log("苹果手机");
      window.webkit.messageHandlers.PhotoClick.postMessage(null)
    } 
  } else {
    this.callback(callback)
  }
}

// 点击调用实名认证
window.authentication = function(callback){
  if(typeof callback === 'function'){
    this.callback = callback
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
      console.log("安卓手机");
      alert('authentication')
    } else if (u.indexOf('iPhone') > -1) {//苹果手机
      console.log("苹果手机");
      window.webkit.messageHandlers.authentication.postMessage(null)
    } 
  } else {
    this.callback(callback)
  }
}

// 点击调用实名认证
window.serviceRmation = function(callback){
  if(typeof callback === 'function'){
    this.callback = callback
  } else {
    this.callback(callback)
  }
}

// 安卓点击返回键的时候触发这个函数
window.closeImagesView = function () {
  console.log('返回上一页成功')
  // window.instance 储存着当前打开的图片预览组件的实例，如果监听到当前的返回事件，就销毁实例
  window.instance ? window.instance.close() : null
}

window.ishome = true
window.addEventListener("popstate", function(e) {
  if(window.ishome){
    window.Android.homeBack(  )
  }
}, false);

// 安卓
window.getLocalStorage = function() {
  var obj = {}
  for( var i in localStorage ) {
    if(i.indexOf('_') === -1 && i.indexOf('#') !== -1){
      if(typeof localStorage[i] === 'string'){
        obj[i] = localStorage[i]
      }
    }
  }
  console.log(JSON.stringify(obj),'安卓接受到返回值')
  return JSON.stringify(obj)
}

//ios
window.webkit.messageHandlers.getLocalStorage = function() {
  var obj = {}
  for( var i in localStorage ) {
    if(i.indexOf('_') === -1 && i.indexOf('#') !== -1){
      if(typeof localStorage[i] === 'string'){
        obj[i] = localStorage[i]
      }
    }
  }
  console.log(JSON.stringify(obj),'安卓接受到返回值')
  return JSON.stringify(obj)
}

// 安卓
window.setLocalStorage = function(str) {
  var obj = JSON.parse(str)
  for( var i in obj){
    localStorage.setItem(i, obj[i])
  }
  console.log(JSON.stringify(obj),'webview的localstorage设置完成')
}

// ios
window.webkit.messageHandlers.setLocalStorage = function(str) {
  var obj = JSON.parse(str)
  for( var i in obj){
    localStorage.setItem(i, obj[i])
  }
  console.log(JSON.stringify(obj),'webview的localstorage设置完成')
}