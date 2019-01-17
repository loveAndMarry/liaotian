import Vue from 'vue'
import Vuex from 'vuex'

import IM from './IM'
import group from './IM/group'
import common from './common'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    IM,
    group,
    common
  }
})
