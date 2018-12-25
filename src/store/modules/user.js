/**
 * 用户信息的数据
 */

import {
  RECEIVE_USER,
  RESET_USER
}from '../mutation-types'
import { logout , reqUserInfo} from '../../api/index'

const state = {
  user: {} //用户信息
}

const actions = {
  //4，保存用户信息
  saveInfo({commit},user){
    commit(RECEIVE_USER , {user})
  },
  //5,异步根据会话获取用户信息
  async reqUserInfo({commit}){
    const result = await reqUserInfo()
    if(result.code === 0){
      const user = result.data
      commit(RECEIVE_USER, {user})
    }
  },
  //6,异步重置user
  async resetUser({commit}){
    const result = await logout()
    if(result.code===0) {
      commit(RESET_USER)
    }
  }
}

const mutations = {
  //更新用户信息user
  [RECEIVE_USER](state ,{user}){
    state.user = user
  },
  //重置用户信息user
  [RESET_USER](state){
    state.user = {}
  }

}

const getters = {

}

export default {
  state,
  actions,
  mutations,
  getters
}
