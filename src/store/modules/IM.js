
// initial state
// shape: [{ id, quantity }]
const state = {
  items: [],
  checkoutStatus: null
}

// getters
const getters = {
  cartProducts: (state, getters, rootState) => {}
}

// actions
const actions = {
  checkout ({ commit, state }, products) {}
}

// mutations
const mutations = {
  pushProductToCart (state, { id }) {}
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
