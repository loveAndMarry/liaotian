import Vue from 'vue'
import Vuex from 'vuex'
import IM from './modules/IM'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    IM
  }
})
