##day01
（一）搭建项目整体架构
    #stylus的理解和使用
        结构化, 变量, 函数/minxin(混合)。整体采用的都是stylus架构
    #vue-router的理解和使用
        $router: 路由器对象, 包含一些操作路由的功能函数, 来实现编程式导航(跳转路由)
        $route: 当前路由对象, 一些当前路由信息数据的容器, path/meta/query/params
    #项目路由拆分（重要）
        确定路由组件显示的区域
        确定路由是几级路由
    #底部导航组件: FooterGuide
        实现流程：1）如何实现on类的切换显示？通过$route.path === '/msite'返回一个布尔值，来确定是否添加on类
                  2）进入登陆页面，FooterGuide还显示？  给4个主要路由的meta对象添加属性，login组件不配置，，从而$route
                  上多了meta.属性，如果有这个属性，footerGuide就显示，否则不显示。
    #导航路由组件: MSite/Search/Order/Profile


##day02
（一）拆分组件实现静态页面
     #头部组件: NavHeader, 通过slot来实现组件通信标签结构
        商家列表组件: ShopList

     #后台启动
        当前台静态页面搭建完成，就得到了接口文件（请求方式，请求地址，请求参数以及响应数据的接口文档）
        通过postman去测试接口，保证接口文档是正确的。

     #异步显示数据
        1，封装ajax：
            1）api模块。是用来封装ajax请求的函数模块，利用了axios和promise
            axios，是用来发送ajax请求。
            promise，之前是直接return出去promise对象即通过axios异步请求的结果，然后保存成状态数据时，需要通过response.data才能得到
                想要直接得到数据data,我们自己创建一个promise对象，通过resolve(response.data),便可以直接得到数据。
                还有一个作用，可以对所有ajax请求出错进行统一处理。这里指的是请求没成功。与登陆和注册页面的提示错误信息不同

            2）index模块：包含n个接口请求函数（一定是根据接口文档去定义）
             注意，/////定义每个请求函数是否需要传参，根据接口文档
                   /////发送请求时需要根据api,去传参。
                   /////开发环境下，浏览器发送ajax请求，易出现跨域问题：使用第三方代理（webpack打包工具提供了dev-server）
                   让第三方代理服务器去帮助浏览器转发请求，然后将请求回来的数据响应给浏览器。
                   需要配置：ajax请求路径不用http://localhost:端口号，直接/api，匹配所有路径请求//配置文件也需要改

          2，vuex保存异步请求的数据：
          通过ajax从后台获取的数据基本都需要保存到vuex管理的状态中。
          步骤：定义相关文件  state/actions/mutations/mutation-types/getters/store对象的index.js文件
          1）state对象模块（最先配置）: 根据接口文档，定义状态数据，保存在state对象中。
          2）actions对象模块：定义异步action,async/await 。 流程：发送请求，commit()传递数据，记得以对象的形式传递
          3）muations对象模块：包含n个用来直接更新状态的mutation方法。commit触发对应mutation函数的调用,接收数据必然也是对象
          4）mutation-types模块：直接用来更新状态的方法名。
          5）getters对象模块：包含n个基于vuex管理的状态数据得到的计算属性方法的集合
          6）index:创建store对象，配置state/actions/mutations/getters 。
          7）main.js：注册store对象，所有的对象都多了一个$store属性，

        3，组件异步显示数据：
          1）可能是用户操作用户界面/页面加载完成通过$store.dispatch('action名'，可能传递的数据)，触发action调用，从而动态获取数据，
          保存到状态中。
          2）组件读取状态。通过$store.state.数据名 //  ...mapState(['数据名'])
          3）显示页面


##day03  界面变化，就是在操作数据
（一），轮播图
1，实现静态页面。利用swiper技术，配置swiper对象来实现需求。（下载包，引入文件，根据文档）
    swiper是js的一个插件库。
    问题：哪里创建swiper对象？ 列表数据显示之后（重要面试）
    实现流程：之前即在mounted生命周期函数中去创建对象。数据是静态的。
    后来异步获取数据后，借用组件对象的watch和$nextTick方法去做。关键知道状态数据何时更新以及
    watch对象，是用来监视对应属性变化的。当状态数据发生变化时，vue会先去调用watch中对应函数，然后再去更新页面。
    $nextTick方式，是用来将当前传入的回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。

    在这里法一：通过watch监视获取的食品数组数据的变化，然后使用$nextTick方法，回调函数中再去创建swiper对象。
    法二：通过dispatch函数中传回调函数，等数据更新完毕执行$nextTick中的回调函数即创建swiper对象+$nextTick()
2，显示动态数据
   1）组件通过dispatch方法触发action对象，发送ajax请求，从后台获取数据保存到状态数据中（之前定义好，现在直接触发action调用即可）
   2）组件对应去读取状态数据（数组）进行显示。
   问题：每一屏都需要遍历数组，而我们获取到的状态数据categorys是一个一维数组，所以需要得到一个二维数组。
   实现思路：重点通过计算属性categorysArr，得到一个二维新数组然后模板中去遍历。
   具体流程：定义一个大数组和小数组，遍历categorys（1，将遍历到的元素添加到小数组中 2，将小数组添加到大数组中，
            一定是在小数组长度为0时添加 3，如果小数组的长度为8，就新定义一个空数组）

3，loading图：当数据没有从后台请求回来时，用svg格式的图片代替

（二）登录页面的前台效果   关键，上来看是否需要设计状态
 1，两种登陆方式的切换：短信登陆/密码登陆（点击哪个选项就切换到对应页面显示）
    本质：2个按钮都是在控制class类on，有/没有
    思路：在vue中，页面变化，必然是数据发生变化。通过定义初始状态数据（布尔值）loginWay:true,确定是否有on类名。
    然后给元素绑定点击事件，loginWay的值取反即可。

 2，手机号验证
    需求1：当手机号1开头，后面有10位时，获取验证码的颜色变成黑色
    思路：通过控制对元素的类。设计的状态数据

  3，倒计时
      需求2：点击获取验证码以后，元素的文本变成倒计时。
      思路：定义元素时，改变数据的状态。computeTime，代表倒计时剩余的时间。+setInterval


# day04
    1). 一次性图形验证码:
        通过<img src="url">请求后台获取验证码图片显示
        点击回调中更新img的src, 并携带时间戳参数, 更新验证码
    2). 发送短信验证码
        使用第三方短信平台接口
        请求发送验证码短信
        使用mint-ui实现对不同结果的不同提示效果
    3). 短信登陆/注册
    4). 密码登陆/注册
    5). 前台表单验证
        表单前台验证, 如果不通过, 提示
        发送ajax请求, 得到返回的结果
        根据结果的标识(code)来判断登陆请求是否成功
            1: 不成功, 显示提示
            0. 成功, 保存用户信息, 返回到个人中心
    6). 自动登陆
        session与cookie的理解
        后台将userid保存到session中
        App初始化过程中发请求获取user信息, 并保存到state
    7). 退出登陆
        请求退出登陆的接口, 重置state中的user

## 2. 搭建商家整体界面
    1). 拆分界面路由: 嵌套路由
    2). 路由的定义/配置|使用

# day04
## 1. vuex的多模块编码
   （模块化之前怎么做，模块化特点，具体怎么做）
    1). 设计多个功能模块
        msite
        user
        shop
    2). 将state拆分到对应的模块中, 确定整个state的结构
    3). 将mutation和action拆分到对应的模块中
    4). 在组件中通过mapState读取特定模块的状态数据
        ...mapState({user: state => state.user.user})

## 2. 模拟(mock)数据/接口
    1). 前后台分离的理解
        区别前后台分离的应用和前后台不分离的应用（什么叫前后端分离/前后端不分离的应用）
        区别一般的HTTP请求和ajax请求
    2). json数据设计的理解
        json数据的类型: 对象/数组/字符串/数值/布尔值
        json数据的组成: 结构(名称和类型)和值
    3). mockjs的理解和使用
        用来提供mock数据接口的库
        生成随机数据, 拦截ajax请求

## 3. ShopHeader组件
    1). 异步显示数据效果的编码流程
        ajax
          ajax请求函数
          接口请求函数
        vuex
          state
          mutation-types
          actions
          mutations
        组件
          dispatch(): 异步获取后台数据到vuex的state
          mapState(): 从vuex的state中读取对应的数据
          模板中显示
    2). 初始显示异常
        情况: Cannot read property 'xxx' of null"
          原因: 初始值是空对象, 内部没有数据, 而模块中直接显示3层表达式
          解决: 使用v-if指令
    3). vue transition动画
        <transition name="xxx">
        xxx-enter-active / xxx-leave-active
          transition
        xxx-enter / xxx-leave-to
          隐藏时的样式

## 4. ShopGoods组件
    1). 动态展现列表数据
    2). 基本滑动:
        使用better-scroll
        创建BScroll对象的时机
          watch + $nextTick()
          自定义callback + $nextTick
        better-scroll禁用了原生的dom事件, 使用的是自定义事件

## 5. CartControl组件
    1). 问题: 更新状态数据, 对应的界面不变化
      原因: 给一个已有绑定的对象直接添加一个新的属性, 这个属性没有数据绑定
      解决:
        Vue.set(obj, 'xxx', value)才有数据绑定
        this.$set(obj, 'xxx', value)才有数据绑定
    2). vue transition

# day05

## 1. ShopGoods组件滑动功能
    1). 滑动右侧列表, 左侧会同步更新当前分类
        1). 设计一个计算属性: currentIndex代表当前分类的下标
        2). 相关数据
          滚动的y坐标: scrollY---> 给右侧列表绑定一个滚动的监听
          右侧分类<li>的top数组: tops-->列表第一次显示之后统计
        3). 计算的逻辑
           scrollY>=top && scrollY<nextTop
        4). 在列表显示之后确定tops
        5). 绑定scroll/scrollEnd监听, 在回调中设置scrollY值
    2). 点击左侧分类项, 右侧列表滑动到对应位置
        1). 绑定点击监听
        2). 通过rightScroll滚动到对应的位置: scroll.scrollTo(0, -tops[index])
        3). 立即更新scrollY
    3). 问题: 如何保证当前分类可见?
        在currentIndex变化时, 使左侧列表滑动到对应的li

## 2. Food组件
    1). 父子组件间调用方法:
        子组件调用父组件的方法: 通过props将方法传递给子组件
        父组件调用子组件的方法: 通过ref找到子组件标签对象(就是组件对象)

## 3. ShopCart组件
    1). 将购物项列表数据定义到vuex的state中: cartFoods
    2). 在vuex的getters中定义: totalCount, totalPrice
    3). 解决几个功能性bug
        a. 删除所有购物项, 购物车列表还打开着   显示和totalCount总数量有关系
        b. 添加一个购物项, 购物车列表自动打开
        c. 购物车列表不能滑动  使用better-scroll
        d. 购物车列表中点一次添加, 会增加多项   点击一次
        e. 原本可以滑动的列表, 关闭再打开后不能再滑动了


# day06
## 1. ShopRatings组件和RatingsFilter组件
    1). 使用计算属性对列表进行过滤显示
    2). 自定义过滤器计算逻辑
    3). 使用vue的自定义事件实现子组件向父组件通信

## 2. ShopInfo组件
    1). 通过JS动态修改元素的样式宽度
    2). 解决在当前路由路径上刷新的异常问题
        在mounted()中, 判断只有当info中有数据才创建BScroll的实例
        在info的watch中, 在$nextTick()回调中创建BScroll对象

## 3. 优化
    1). 缓存路由组件: <keep-alive>
    2). 路由组件懒加载: () => import('路由组件')
    3). 在线图片懒加载: vue-lazyload

## 4. 打包项目运行
    1). 生成打包文件中, 将所有打包文件复制到服务器应用的public下, 不再有ajax跨域请求的问题
    2). 如果路由的模式使用的history, 刷新路径时会出现404的bug
        原因: 项目根路径后的path路径会被当作后台路由路径, 会去请求对应的后台路由, 但后台没有
        解决: 使用自定义中间件去读取返回index页面展现

## 5. 路由导航守卫
    1). 是什么?
      vue-router提供的下面2个方面的功能
        a. 监视路由跳转
        b. 控制路由跳转
    2). 应用
      在跳转到界面前, 进行用户权限检查限制(如是否已登陆)
      在界面离开前, 做收尾工作
    3). 分类
      1). 全局守卫: 针对任意路由跳转
          a. 全局前置守卫
          b. 全局后置守卫
      2). 组件守卫: 只针对当前组件的路由跳转
          a. 进入
          b. 更新
          c. 离开
    4). next函数的使用
        next(): 放行
        next(false)/不执行: 中断路由跳转
        next(path): 强制跳转到指定的另一个路由
        next((component) => {}): 指定组件对象创建后调用回调函数传入组件对象
