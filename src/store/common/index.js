const state = {
  active: 0, // 记录当前是哪一页
  member: null, // 储存当前选择的会员类型
  Loading: true
}
const mutations = {
  // 设置当前显示的是哪一页
  setActive (state, products) {
    state.active = products.active
  },
  setLoading (state, products) {
    state.Loading = products
  }
}

export default {
  state,
  mutations
}