/**
 * store对象模块(vuex的核心管理模块)
 */

import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import msite from './modules/msite'
import user from './modules/user'
import shop from './modules/shop'


Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    msite,
    user,
    shop
  }
})
