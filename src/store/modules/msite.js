/**
 * msite组件需要的状态数据
 */

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
}from '../mutation-types'
import {reqAddress, reqCategorys, reqShops } from '../../api/index'


const state = {
  latitude: 40.10038, // 纬度
  longitude: 116.36867, // 经度
  //从后台返回的数据定义成状态数据时，一般需要根据返回的数据类型去定义
  address: {}, //地址信息
  categorys: [], //食品分类信息数组
  shops: [], //商铺信息数组
}
const actions = {
  // 1,异步获取地址信息
  async getAddress({commit, state}){
    const {longitude, latitude} = state
    //1，发送ajax请求
    const result = await reqAddress(longitude, latitude)
    const address = result.data
    if (result.code === 0) {
      //2，从得到的结果中提取需要的数据提交到mutation
      commit(RECEIVE_ADDRESS, {address})
    }

  },

  // 2,异步获取地址信息
  async getCategorys({commit}){
    //1，发送ajax请求
    const result = await reqCategorys()
    const categorys = result.data
    if (result.code === 0) {
      //2，从得到的结果中提取需要的数据提交到mutation
      commit(RECEIVE_CATEGORYS, {categorys})
    }

  },

  // 3,异步获取商家信息
  async getShops({commit, state}){
    const {longitude, latitude} = state
    //1，发送ajax请求
    const result = await reqShops(longitude, latitude)
    const shops = result.data
    if (result.code === 0) {
      //2，从得到的结果中提取需要的数据提交到mutation
      commit(RECEIVE_SHOPS, {shops})
    }

  },
}
const mutations = {
  //更新地址信息
  [RECEIVE_ADDRESS](state , {address}){
    state.address = address  //address必须外部传入，即commit得传进来
  },

  //更新食品列表数据
  [RECEIVE_CATEGORYS](state , {categorys}){
    state.categorys = categorys  //categorys必须外部传入，即commit得传进来
  },

  //更新商户信息
  [RECEIVE_SHOPS](state , {shops}){
    state.shops = shops  //shops必须外部传入，即commit得传进来
  },
}
const getters = {

}

export default {
  state,
  actions,
  mutations,
  getters
}
