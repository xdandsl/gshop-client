/**
 * 包含n个接口请求函数的模块
 */

import ajax from './ajax'

//跨域：浏览器请求资源(协议名/域名/端口号) 与后台处理请求的（协议名/域名/端口号）不一致还会造成跨域
//开发环境下利用用户代理模式解决：
// 利用dev-server创建的第三方开发服务器，帮助我们去向后台发送请求，
//然后接收后台相应的数据。返回给浏览器。
//配置：

// const Base = 'http://localhost:5000'
const BASE = '/api'  // 开发环境下需要使用代理帮我们转发请求

export const reqAddress = (longitude, latitude) => ajax(BASE + `/position/${latitude},${longitude}`)

// [2、获取食品分类列表](#2获取食品分类列表)<br/>
export const reqCategorys = () => ajax(BASE + '/index_category')

// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)<br/>
export const reqShops = (longitude, latitude) => ajax(BASE + '/shops', {longitude, latitude})
