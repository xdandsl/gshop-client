/**
 * actions对象：包含n个用来间接更新状态数据的方法
 * 通常做两件事：
 * 1，用来发送ajax请求等异步操作
 * 2，发送完请求，根据结果提交到mutation函数，更新状态数据
 */

import {RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS} from './mutation-types'
import {reqAddress, reqCategorys, reqShops} from '../api/index'

export default {
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

  }

}
