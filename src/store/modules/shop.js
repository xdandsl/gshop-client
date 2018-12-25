/**
 * shop的信息
 */

import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO
}from '../mutation-types'
import { reqGoods , reqRatings, reqInfo} from '../../api/index'

const state = {
  goods: [],
  ratings: [],
  info: {}
}

const actions = {
  //获取食品goods
  async getGoods({commit}){
    const result = await reqGoods()
    const goods = result.data
    if(result.code === 0){
      commit(RECEIVE_GOODS , {goods})
    }
  },
  //获取ratings
  async getRatings({commit}){
    const result = await reqRatings()
    const ratings = result.data
    if(result.code === 0){
      commit(RECEIVE_RATINGS , {ratings})
    }
  },
  //获取info
  async getInfo({commit}){
    const result = await reqInfo()
    console.log(result)
    const info = result.data
    if(result.code === 0){
      commit(RECEIVE_INFO , {info})
    }
  }

}

const mutations = {
  //更新goods
  [RECEIVE_GOODS](state,{goods}){
    state.goods = goods
  },

  //更新ratings
  [RECEIVE_RATINGS](state,{ratings}){
    state.ratings = ratings
  },

  //更新info
  [RECEIVE_INFO](state,{info}){
    state.info = info
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
