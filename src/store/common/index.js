const state = {
  active: 0, // 记录当前是哪一页
  member: null, // 储存当前选择的会员类型
  Loading: true,
  pageYOffset: 0, // 记录当前滚动条的位置
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
  }
}

export default {
  state,
  mutations
}