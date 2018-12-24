/**
 * 包含n个用来直接更新状态数据方法的对象
 */
import {RECEIVE_ADDRESS,RECEIVE_CATEGORYS,RECEIVE_SHOPS, RECEIVE_USER} from './mutation-types'

export default {

  //注意：这里RECEIVE_ADDRESS是变量，在对象中使用必须通过[]引入

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

  //更新用户信息
  [RECEIVE_USER](state ,{user}){
    state.user = user
  }

}
