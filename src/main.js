/**
 * 入口js文件
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

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
  router

})
