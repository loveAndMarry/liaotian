import Vue from 'vue'
import Vuex from 'vuex'

import IM from './IM'
import common from './common'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    IM,
    common
  }
})
