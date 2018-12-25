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
  goods: [], //食物分类
  ratings: [], //商家评价
  info: {} //商家信息
}

const actions = {
  //获取食品goods
  async getGoods({commit},cb){
    const result = await reqGoods()
    const goods = result.data
    if(result.code === 0){
      commit(RECEIVE_GOODS , {goods})
    }
    //等状态更新完去执行传入的回调函数(即$nextTick()，这个里面的函数等dom更新完就去创建BScroll对象)
   typeof cb === 'function' && cb()
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
