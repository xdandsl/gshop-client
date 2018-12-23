<!--模板页面-->
<template>
  <section class="msite">
    <!--首页头部-->
    <NavHeader :title="address.name">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </NavHeader>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorysArr.length>0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys , index) in categorysArr" :key="index" >
            <a href="javascript:" class="link_to_food" v-for="(c,index) in categorys" :key="index">
              <div class="food_container">
                <img :src="`https://fuss10.elemecdn.com${c.image_url}`">
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" v-else/>
    </nav>
    <!--首页附近商家-->
    <shop-list/>
  </section>
</template>

<!--js模块对象-->
<script>
  //引入shopList组件
  import ShopList from '../../components/ShopList/ShopList.vue'
  import {mapState} from 'vuex'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'

  export default {
    mounted(){
      //组件中，根据需要，在不同的状态，通过dispatch方法去对应的action方法
      this.$store.dispatch('getAddress')
      this.$store.dispatch('getCategorys')
      this.$store.dispatch('getShops')

    },
    computed: {
      ...mapState(['address','categorys']),

      //得到一个二维数组，然后去遍历显示食品信息
      categorysArr(){
        //得到从后台获取的状态数据categorys
        const {categorys} = this
        //定义一个大数组，然后return出去
        const bigArr = []
        //定义一个小数组（最大长度为8）
        let smallArr = []

        categorys.forEach(c => {
          //将小数组添加到大数组中。注意：社么时候将小数组添加到大数组中。
          if(smallArr.length === 0){
            bigArr.push(smallArr)
          }
          //将遍历到的每一项添加到小数组中
          smallArr.push(c)
          //如果小数组的长度为8，则创建一个新的小数组
          if(smallArr.length === 8){
            smallArr = []
          }
        })
        return bigArr
      }
    },
    //注册组件
    components: {
      ShopList
    },

    watch: {
      //注意：vue会在更新数据之后，先去调用watch中的函数，然后再去更新页面
      //调用表示数据更新了。
      categorys(){
        //$nextTick方法中的回调会等dom更新完以后再去执行
        this.$nextTick(() => {
          //等列表数据显示以后去创建swiper对象
          new Swiper ('.swiper-container', {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }
          })
        })
      }
    }
  }
</script>

<!--样式-->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774

</style>
