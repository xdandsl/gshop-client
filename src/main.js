/**
 * 入口js文件
 */

import Vue from 'vue'
import { Button } from 'mint-ui'
import App from './App.vue'
import router from './router/index'
import NavHeader from './components/NavHeader/NavHeader.vue'
import store from './store/index'
import Stars from './components/Stars/Stars.vue'

import './mock/mockServer'  //让模拟数据接口的文件执行一遍

//注册全局组件，需要的地方直接引入即可
Vue.component('NavHeader', NavHeader)
Vue.component('Stars', Stars)
//注册全局组件
Vue.component(Button.name, Button);

new Vue({
  el: '#app',
  //注册模板的使用方式1
  // components: {
  //   App
  // },
  // template: '<App />'

  //方式2
  render: h => h(App),

  //注册路由器。因此所有的路由组件多了$router属性以及$route
  router,
  //注册路由器store对象。所有组件对象多了一个$store属性
  store

})
