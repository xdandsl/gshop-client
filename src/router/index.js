//  * 路由器模块：此模块是vue-router的核心模块。用来创建router对象、以及注册路由
//  */

import Vue from 'vue'
//是vue的一个插件
import  VueRouter  from 'vue-router'
import routes from './routes'

//声明使用插件
Vue.use(VueRouter )

export default new VueRouter({
  mode: 'history', //去除根路径的#
  //注册路由组件。单独封装成一个模块
  routes
})
