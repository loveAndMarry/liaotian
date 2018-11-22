import Vue from 'vue'
import Vuex from 'vuex'

import IM from './IM'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    IM
  }
})
