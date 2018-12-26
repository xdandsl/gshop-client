<!--模板页面-->
<template>
  <div class="cartcontrol">
    <transition name="fade">
      <div class="iconfont icon-remove_circle_outline" v-if="food.count>0" @click.stop="updateCount(false)"></div>
    </transition>
    <div class="cart-count" v-if="food.count>0">{{food.count}}</div>
    <div class="iconfont icon-add_circle" @click.stop="updateCount(true)"></div>
  </div>
</template>

<!--js模块对象-->
<script>
  export default {
    props: {
      food: Object
    },
    methods: {
      //更新count的值
      updateCount(isAddCount){
        //更新数据需要在vuex中去更新，多个组件需要用
        this.$store.dispatch('updateCount',{isAddCount,food:this.food})
      }
    }
  }
</script>

<!--样式-->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .icon-remove_circle_outline
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.fade-enter-active,.fade-leave-active
        transition all 0.5s
      &.fade-enter,.fade-leave-to
        opacity 0
        transform translateX(10px) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-add_circle
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
</style>
