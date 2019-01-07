import { getUserSpouseIntention } from '@/assets/common/api'

const state = {
  active: 0, // 记录当前是哪一页
  member: null, // 储存当前选择的会员类型
  Loading: true,
  pageYOffset: 0, // 记录当前滚动条的位置
  Jurisdiction: [], //权限数组
  fromData: {
    type: 1,
    // 基本筛选条件
    address: [], // 居住地
    age: [], // 年龄（区间）
    height: [], // 身高（区间）
    maritalStatus: [], // 婚姻状况
    education: [], // 学历（区间）
    income: [], // 收入（区间）
    loveType: [], // 恋爱类型
    // 高级筛选
    housePurchase: [], // 是否购房
    car: [], // 购车情况
    registeredPermanentResidence: [], // 户口
    hometown:[], // 家乡(地址)
    children:[], // 子女
    constellation: [], // 星座
    theRealNameSystem:[], // 实名
    picture: [], // 是否有照片
    member: [], // 是否会员
    onLine: [], // 是否在线
    // profession: [], // 职业
    bloodType: [], // 血型
    nation: [], // 民族
    religion: [], // 宗教,
    sex: '2'
  }
}

const actions = {
  // 获取默认的检索条件
  getFromData ({commit, state}, userId) {
    return new Promise((resolve) => {
      getUserSpouseIntention({userId}).then((res) => {
        var data = res.data
        // 学历
        if(data.intentionEducationMinName && data.intentionEducationDictValueMin && data.intentionEducationMaxName && data.intentionEducationDictValueMax){
          state.fromData.education.push({
            label: data.intentionEducationMinName,
            value: data.intentionEducationDictValueMin
          })
          state.fromData.education.push({
            label: data.intentionEducationMaxName,
            value: data.intentionEducationDictValueMax
          })
        }
  
        // 居住地
        if(data.intentionDomicileProvinceName && data.intentionDomicileProvinceId && data.intentionDomicileCityName && data.intentionDomicileCityId){
          state.fromData.address.push({
            name: data.intentionDomicileProvinceName,
            code: data.intentionDomicileProvinceId
          })
          state.fromData.address.push({
            name: data.intentionDomicileCityName,
            code: data.intentionDomicileCityId
          })
        }
  
        // 年龄
        if(data.intentionAgeMin || data.intentionAgeMax){
          state.fromData.age.push({
            value: data.intentionAgeMin.replace('岁', '') || '',
            label: data.intentionAgeMin
          })
          state.fromData.age.push({
            value: data.intentionAgeMax.replace('岁', '') || '',
            label: data.intentionAgeMax
          })
        }
  
        // 身高
        if(data.intentionHeightMin || data.intentionHeightMax){
          state.fromData.height.push({
            value: data.intentionHeightMin || '',
            label: data.intentionHeightMin
          })
          state.fromData.height.push({
            value: data.intentionHeightMax || '',
            label: data.intentionHeightMax
          })
        }
  
        // 月收入
        if(data.intentionIncomeMin || data.intentionIncomeMax){
          state.fromData.income.push({
            value: data.intentionIncomeMin || '',
            label: data.intentionIncomeMin
          })
          state.fromData.income.push({
            value: data.intentionIncomeMax || '',
            label: data.intentionIncomeMax
          })
        }
  
        // 婚姻状况
        if(data.intentionMaritalStatusDictValue || data.intentionMaritalStatus){
          state.fromData.maritalStatus.push({
            value: data.intentionMaritalStatusDictValue || '',
            label: data.intentionMaritalStatus
          })
        }
  
        // 子女状况
        if(data.intentionChildrenSituationDictValue || data.intentionChildrenSituation){
          state.fromData.children.push({
            value: data.intentionChildrenSituationDictValue || '',
            label: data.intentionChildrenSituation
          })
        }

        resolve(state.fromData)
      })
    })
  },
}


const mutations = {
  // 设置当前显示的是哪一页
  setActive (state, products) {
    state.active = products.active
  },
  setLoading (state, products) {
    state.Loading = products
  },
  setPageYOffset(state, val) {
    state.pageYOffset = val;
  },
  setFromData (state,obj) {
    state.fromData = Object.assign(state.fromData, obj)
  },
  isJurisdiction ( state, str){
    if(str === ''){
      return true
    }
    return state.Jurisdiction.some(el => el === str)
  },
  resetFromData () {
    state.fromData = {
      type: 1,
      // 基本筛选条件
      address: [], // 居住地
      age: [], // 年龄（区间）
      height: [], // 身高（区间）
      maritalStatus: [], // 婚姻状况
      education: [], // 学历（区间）
      income: [], // 收入（区间）
      loveType: [], // 恋爱类型
      // 高级筛选
      housePurchase: [], // 是否购房
      car: [], // 购车情况
      registeredPermanentResidence: [], // 户口
      hometown:[], // 家乡(地址)
      children:[], // 子女
      constellation: [], // 星座
      theRealNameSystem:[], // 实名
      picture: [], // 是否有照片
      member: [], // 是否会员
      onLine: [], // 是否在线
      // profession: [], // 职业
      bloodType: [], // 血型
      nation: [], // 民族
      religion: [], // 宗教,
      sex: '2'
    }
  }
}

export default {
  state,
  actions,
  mutations
}