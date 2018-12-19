// window.baseURL = 'http://192.168.1.12:8080/qike-maiyuan'
window.baseURL = 'http://192.168.1.9:8080/qike-maiyuan'

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

// 安卓点击返回键的时候触发这个函数
window.closeImagesView = function () {
  console.log('返回上一页成功')
  // window.instance 储存着当前打开的图片预览组件的实例，如果监听到当前的返回事件，就销毁实例
  window.instance ? window.instance.close() : null
}
