<!--模板页面-->
<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="leftUl">
          <!--current类-->
          <li class="menu-item" v-for="(good,index) in goods" :key="index" :class="{current: currentIndex === index}" @click="clickItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="rightUl">
          <!--每一个food-->
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57"
                       :src="food.image">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shop-cart/>
    </div>
    <Food :food="food" ref="food"/>
  </div>
</template>

<!--js模块对象-->
<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import Food from '../../../components/Food/Food.vue'
  import ShopCart from '../../../components/ShopCart/ShopCart.vue'
  export default {
    components: {
      Food,
      ShopCart
    },
    mounted(){
      //获取食品分类的goods数据
      this.$store.dispatch('getGoods',()=> {
        this.$nextTick(() => {
          this._initBScroll()
          this._initTops()
        })
      })

      //同之前的swiper一样，等待dom更新完就可以创建BScroll对象
      //两种方法 1，mounted函数和$nextTick()技术   2，在dispatch,传一个回调函数
//      this.$nextTick(() => {
//        this._initBScroll()
//      })
    },
    data(){
      return {
        scrollY: 0,
        tops: [],
        food: {}
      }
    },
    computed: {
      ...mapState({
        goods: state => state.shop.goods
      }),

      //左侧分类的当前小标
      currentIndex(){
        const {scrollY ,tops } = this
        const index = tops.findIndex((top,index) => {
          //scrollY在[top,nextTop）之间的返回
          return scrollY >= top && scrollY < tops[index+1]

        })
        //如何知道currentIndex发生变化
        if(index!=this.index && this.leftScroll) { // 产生了一个新的index
          // 保存新的index
          this.index = index
          // 当currentIndex发生改变时,将左侧列表进行编码滑动(尽量让当前分类滑动到最上面)
          const li = this.$refs.leftUl.children[index]
          this.leftScroll.scrollToElement(li, 300)
        }

        return index
      }
    },
    methods: {
//     加_是为了区别一般的事件回调函数
      _initBScroll(){
        this.leftScroll = new BScroll('.menu-wrapper',{
          // better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件
          click: true
        })

        this.rigthScroll = new BScroll('.foods-wrapper', {
          click: true,
          probeType: 2
        })
        //给右侧列表ul的scroll对象绑定监听
        this.rigthScroll.on('scroll' , ({x,y}) => {
//          console.log(y)
          this.scrollY = Math.abs(y)
        }),
        // 监视右侧列表滑动结束
        this.rigthScroll.on('scrollEnd',({x,y}) => {
//          console.log(y)
          this.scrollY = Math.abs(y)
        })


      },

      //dom初始化完成就去执行
      _initTops(){
        //计算食物列表的每一个li的高度
        const lis = this.$refs.rightUl.children  //获取所有li(伪数组中)
        const tops = []
        let top = 0
        tops.push(top)
        Array.prototype.slice.call(lis).forEach((li,index) => {
          top += li.clientHeight
          tops.push(top)
        })
//        console.log(tops)
        this.tops = tops
      },

      clickItem(index){
        //根据点击的左侧的索引找到右侧对应的top值
         const y =-this.tops[index]
        //赋值给scrollY
        this.scrollY = Math.abs(y)

        this.rigthScroll.scrollTo(0, y, 300)
      },

      showFood(food){
        this.food = food
        //调用food组件的toggleShow方法
        this.$refs.food.toggleShow()
      }
    }
  }
</script>

<!--样式-->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
