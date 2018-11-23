const utils = {
  /**
   * 时间戳转换为时间
   * @param {*} timestamp 时间戳
   */
  timestampToTime (timestamp) {
    var date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = date.getDate() + ' '
    var h = date.getHours() + ':'
    var m = date.getMinutes() + ':'
    var s = date.getSeconds()
    return Y + M + D + h + m + s
  },
  /**
   * 对象数组排序
   */
  arraySort (arr, key, num) {
    num = num || null
    arr.sort((a, b) => { return Number(a[key]) - Number(b[key]) })
    if (num) {
      if (arr.length > num) {
        return arr.slice(0)
      }
      return arr.slice(0, num)
    }
    return arr.reverse()
  },
  /**
   * 更改数组中id的其中一项
   */
  updateArray (arr, id, obj) {
    if(typeof obj === 'object'){
      if(typeof obj['hint'] === 'boolean' && obj['hint']){
        obj.hint = arr.find(el => el.accountNumber === id).hint + 1
      } else if(typeof obj['hint'] === 'number'){
        obj.hint = 0
      }
      return arr.splice(arr.findIndex(el => el.accountNumber === id), 1, Object.assign(arr.find(el => el.accountNumber === id), obj))
    }
  },
  /**
   * 获取url参数
   */
  getUrlArgObject (name) {  
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
  },
  /**
   * 向本地缓存中的添加数据
   */
  pushLocalData (name, id, obj){
    var data = JSON.parse(localStorage.getItem(name))
    if(typeof id === 'object'){
      id = obj
      // 没有容器则创建
      if(!data) {
        data = []
      }
      data.push(obj)
    } else {
      // 没有容器则创建
      if(!data) {
        data = {}
      }
      if(!data[id]) {
        data[id] = []
      }
      data[id].push(obj)
    }
    localStorage.setItem(name,JSON.stringify(data))
  } 
}

export default utils
