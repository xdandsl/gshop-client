<!--模板页面-->
<template>
  <div class="star" :class="`star-${size}`">
    <span class="star-item" v-for="(c ,index) in starClasses" :key="index" :class="c"></span>
  </div>
</template>

<!--js模块对象-->
<script>
  const CLASS_ON = 'on'
  const CLASS_HALF = 'half'
  const CLASS_OFF = 'off'
  export default {
    props: {
      score: Number, //商家的评分
      size: Number, //图片用的24位的
    },
    computed: {
      starClasses(){
        //动态根据score去计算有几个on,几个half，几个off，从而添加到元素的类上面
        const {score} = this
        const scs = []
        //3.5 3个on  1个half  1个off
        //判断有几个on
        const starInteger = Math.floor(score)
        for (let i = 0; i < starInteger; i++) {
          scs.push(CLASS_ON)
        }
        //判断0/1个half
        if(score*10 - starInteger*10 >= 5){
          scs.push(CLASS_HALF)
        }

        //几个off
        while(scs.length<5){
          scs.push(CLASS_OFF)
        }
        return scs
      }

    }
  }
</script>

<!--样式-->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/stars/star48_on')
        &.half
          bg-image('./images/stars/star48_half')
        &.off
          bg-image('./images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star36_on')
        &.half
          bg-image('./images/stars/star36_half')
        &.off
          bg-image('./images/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star24_on')
        &.half
          bg-image('./images/stars/star24_half')
        &.off
          bg-image('./images/stars/star24_off')
</style>
