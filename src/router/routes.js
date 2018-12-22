import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'

export default [
  {
    path: '/msite',
    component: Msite,
    meta: {
      isShow: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      isShow: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      isShow: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      isShow: true
    }
  },
  {
    path: '/',
    redirect: '/msite'
  },
  //登陆页面和其他4个页面为兄弟组件。嵌套路由：子路由再父路由中进行显示
  {
    path: '/login',
    component: Login
  }
]
