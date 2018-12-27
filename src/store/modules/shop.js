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
  info: {}, //商家信息
  cartFoods: []  //保存购物车组件的food
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
      state.cartFoods.push(food)
    }else{
      food.count++
    }
  },

  [DECREMENT_FOOD_COUNT](state,{food}){
    food.count--
    if(food.count<0){
      const index = state.cartFoods.indexOf(food)
      state.cartFoods.splice( index,1)
    }
  }


}

const getters = {
  //基于goods的计算属性：包含food.count大于1的food的数组
  // cartFoods(state){
  //   const foods = []
  //   state.goods.forEach((good,index) => {
  //    good.foods.forEach((food , index) => {
  //      if(food.count>1){
  //        foods.push(food)
  //      }
  //    })
  //   })
  //   return foods
  // }

  //food总数量
  totalCount(state){
    return state.cartFoods.reduce((prev, food) =>
        prev + food.count
    ,0)
  },
  //food总价格
  totalPrice(state){
    return state.cartFoods.reduce((prev, food) =>
      prev + food.count*food.price
      ,0)
  },

  //评论的总条数
  totalRatingCount(state){
    return state.ratings.length
  },
  //满意的评论数量
  positiveRatingCount (state) {
    return state.ratings.reduce((pre, rating) => pre + (rating.rateType===0 ? 1 : 0), 0)
  },
  //不满意的评论数量
  negativeRatingCount (state, getters) {
    return getters.totalRatingCount - getters.positiveRatingCount
  }

}

export default {
  state,
  actions,
  mutations,
  getters
}
