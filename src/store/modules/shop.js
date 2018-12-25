/**
 * shop的信息
 */
import Vue from 'vue'
import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT
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
  },

  //更新food中的count
  updateCount({commit},{isAddCount,food}){
    if(isAddCount){
      commit(INCREMENT_FOOD_COUNT,{food})
    }else {
      commit(DECREMENT_FOOD_COUNT,{food})
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
  },

  [INCREMENT_FOOD_COUNT](state,{food}){
    if(!food.count){
      // 给food添加一个新的属性, 内部不会进行数据劫持, 没有数据绑定
      // food.count = 1
      // 向响应式对象中添加一个属性，并确保这个新属性同样是响应式的
      Vue.set(food, 'count' , 1)
      // food.count = 1
    }else{
      food.count++
    }
  },

  [DECREMENT_FOOD_COUNT](state,{food}){
    food.count--
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
