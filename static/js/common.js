window.baseURL = 'http://192.168.1.12:8080/qike-maiyuan'
// window.baseURL = 'http://192.168.1.9:8080/qike-maiyuan'

// 点击调用图片和拍照
window.updatePhoto = function(str){
    if(!str){
      var u = navigator.userAgent;
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
        console.log("安卓手机");
        alert('updatePhoto')
      } else if (u.indexOf('iPhone') > -1) {//苹果手机
        console.log("苹果手机");
        window.webkit.messageHandlers.PhotoClick.postMessage(null)
      }
    } else {    
      console.log('接收到返回的参数：' + str)
    }
}

window.returnPhoto = function (str) {
  return new Promise(resolve => {

  })
}