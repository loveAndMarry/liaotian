import { getUserSpouseIntention , listJurisdictionPermissionList} from '@/assets/common/api'

const state = {
  active: 0, // TabBer 记录当前是哪一页
  member: null, // 储存当前选择的会员类型
  Loading: true,
  pageYOffset: 0, // 记录当前滚动条的位置
  Jurisdiction: [], //权限数组
  isShow: false, // 控制左侧滑出框
  popupTitle: '', // 弹出框的标题
  AuditionsActive: 0, // 海选停留在哪一栏
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
  },
  selectionIntention: {
    education: [],
    address: [],
    age: [],
    height: [],
    income: [],
    maritalStatus: [],
    housePurchase: [],
    car: [],
    children: []
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

          state.selectionIntention.education = state.fromData.education
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
          state.selectionIntention.address = state.fromData.address
        }
  
        // 年龄
        if(data.intentionAgeMin || data.intentionAgeMax){
          state.fromData.age.push({
            value: data.intentionAgeMin || '',
            label: data.intentionAgeMin + '岁'
          })
          state.fromData.age.push({
            value: data.intentionAgeMax || '',
            label: data.intentionAgeMax + '岁'
          })
          state.selectionIntention.age = state.fromData.age
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
          state.selectionIntention.height = state.fromData.height
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
          state.selectionIntention.income = state.fromData.income
        }
  
        // 婚姻状况
        if(data.intentionMaritalStatusDictValue || data.intentionMaritalStatus){
          state.fromData.maritalStatus.push({
            value: data.intentionMaritalStatusDictValue || '',
            label: data.intentionMaritalStatus
          })
          state.selectionIntention.maritalStatus = state.fromData.maritalStatus
        }

        // 购房情况
        if(data.intentionHouseSituationDictValue || data.intentionHouseSituation){
          state.fromData.housePurchase.push({
            value: data.intentionHouseSituationDictValue || '',
            label: data.intentionHouseSituation
          })
          state.selectionIntention.housePurchase = state.fromData.housePurchase
        }

        // 购车情况
        if(data.intentionCarSituationDictValue || data.intentionCarSituation){
          state.fromData.car.push({
            value: data.intentionCarSituationDictValue || '',
            label: data.intentionCarSituation
          })
          state.selectionIntention.car = state.fromData.car
        }
  
        // 子女状况
        if(data.intentionChildrenSituationDictValue || data.intentionChildrenSituation){
          state.fromData.children.push({
            value: data.intentionChildrenSituationDictValue || '',
            label: data.intentionChildrenSituation
          })
          state.selectionIntention.children = state.fromData.children
        }

        resolve(state.fromData)
      })
    })
  },
  // 获取所有的权限标识
  getJurisdiction ({state}, userId) {
    return new Promise(resolve => {
      listJurisdictionPermissionList({userId: userId}).then((res) => {
        state.Jurisdiction = res.data ? res.data : []
        resolve()
      })
    })
  }
}


const mutations = {
  // 设置当前显示的是哪一页
  setActive (state, products) {
    state.active = products.active
  },
  // 设置当前显示的是哪一页
  setAuditionsActive (state, products) {
    state.AuditionsActive = products.AuditionsActive
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
  // 设置右侧弹出层的title和是否显示
  setPopup (state,obj) {
    if(typeof obj === 'boolean'){
      state.isShow = obj
      return false
    }
    state.isShow = obj.isShow
    state.popupTitle = obj.popupTitle
  },
  resetFromData () {
    state.fromData['type'] = 1
    state.fromData['address'] = []
    state.fromData['age'] = []
    state.fromData['height'] = []
    state.fromData['maritalStatus'] = []
    state.fromData['education'] = []
    state.fromData['income'] = []
    state.fromData['loveType'] = []
    state.fromData['housePurchase'] = []
    state.fromData['car'] = []
    state.fromData['registeredPermanentResidence'] = []
    state.fromData['hometown'] = []
    state.fromData['children'] = []
    state.fromData['constellation'] = []
    state.fromData['theRealNameSystem'] = []
    state.fromData['picture'] = []
    state.fromData['onLine'] = []
    state.fromData['member'] = []
    state.fromData['bloodType'] = []
    state.fromData['nation'] = []
    state.fromData['religion'] = []
    // state.fromData = {
    //   type: 1,
    //   // 基本筛选条件
    //   address: [], // 居住地
    //   age: [], // 年龄（区间）
    //   height: [], // 身高（区间）
    //   maritalStatus: [], // 婚姻状况
    //   education: [], // 学历（区间）
    //   income: [], // 收入（区间）
    //   loveType: [], // 恋爱类型
    //   // 高级筛选
    //   housePurchase: [], // 是否购房
    //   car: [], // 购车情况
    //   registeredPermanentResidence: [], // 户口
    //   hometown:[], // 家乡(地址)
    //   children:[], // 子女
    //   constellation: [], // 星座
    //   theRealNameSystem:[], // 实名
    //   picture: [], // 是否有照片
    //   member: [], // 是否会员
    //   onLine: [], // 是否在线
    //   // profession: [], // 职业
    //   bloodType: [], // 血型
    //   nation: [], // 民族
    //   religion: [], // 宗教,
    // }
  }
}

export default {
  state,
  actions,
  mutations
}