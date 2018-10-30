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
    console.log(arr)
    console.log(arr instanceof Array)
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
   * 设置localStorage
   */
  pushStorage (key, name, data) {
    let notSubmitRecord = JSON.parse(localStorage.getItem(key))
    console.log(notSubmitRecord)
    notSubmitRecord[name].push(data)
    localStorage.setItem(key, JSON.stringify(notSubmitRecord))
  }
}

export default utils
