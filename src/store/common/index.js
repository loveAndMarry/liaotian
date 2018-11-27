const state = {
  isLoading: false
}
const mutations = {
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