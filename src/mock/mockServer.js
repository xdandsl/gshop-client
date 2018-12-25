/**
 * 定义mock模拟数据接口: 模拟请求shop组件下需要的goods和info和ratings数据
 */

import Mock from 'mockjs'
//引入自定义的json数据
import data from './data.json'

//模拟goods数据接口  注意：传入的第二个对象就为返回的数据
Mock.mock('/goods',{code: 0 , data: data.goods})

//模拟ratings数据接口
Mock.mock('/ratings',{code: 0 , data: data.ratings})

//模拟info数据接口
Mock.mock('/info',{code: 0 , data: data.info})

// console.log('mockserver')
//不用往外暴露任何东西，只需要执行一遍即可，按照预定义的方法，便能获取到接口数据
