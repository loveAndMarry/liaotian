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
   * 向localStorage内添加项
   */
  pushStorage (key, name, data) {
    let notSubmitRecord = JSON.parse(localStorage.getItem(key))
    notSubmitRecord[name].push(data)
    localStorage.setItem(key, JSON.stringify(notSubmitRecord))
  },
  /**
   * 设置当前好友的未读消息个数
   * @param value
   *  为 2 时设置未读条数为0；
   *  为 1 时设置未读条数为加一
   */
  setStorage (name, key, value) {
    value = value || 1
    console.log('设置当前未读消息', value)
    let friendsList = JSON.parse(localStorage.getItem(name))
    for (var j = 0, len = friendsList.length; j < len; j++) {
      if (friendsList[j].username === key) {
        if (value !== 2) {
          friendsList[j]['hint'] = friendsList[j]['hint'] + 1
        } else {
          friendsList[j]['hint'] = 0
        }
        break
      }
    }
    console.log(friendsList, 'ceshi afasdfa d')
    localStorage.setItem(name, JSON.stringify(friendsList))
  }
}

export default utils
