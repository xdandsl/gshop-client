/**
 * 包含n个用来直接更新状态数据方法的对象
 */
import {RECEIVE_ADDRESS,RECEIVE_CATEGORYS,RECEIVE_SHOPS} from './mutation-types'

export default {

  //这里RECEIVE_ADDRESS是变量，在对象中使用必须通过[]引入
  [RECEIVE_ADDRESS](state , {address}){
    //更新地址信息
    state.address = address  //address必须外部传入，即commit得传进来
  },

  [RECEIVE_CATEGORYS](state , {categorys}){
    //更新食品列表数据
    state.categorys = categorys  //categorys必须外部传入，即commit得传进来
  },

  [RECEIVE_SHOPS](state , {shops}){
    //更新商户信息
    state.shops = shops  //shops必须外部传入，即commit得传进来
  }
}
