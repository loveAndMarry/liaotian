const state = {
  isLoading: false,
  active: 0
}
const mutations = {
  setActive (state, products) {
    state.active = products.active
  },
  hideLoading (state) {
    state.isLoading = false
  },
  showLoading (state) {
    state.isLoading = true
  }
}

export default {
  state,
  mutations
}