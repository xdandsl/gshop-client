<!--模板页面-->
<template>
    <div>
      <!--缓存路由组件对象-->
      <keep-alive>
        <router-view/>
      </keep-alive>
      <FooterGuide></FooterGuide>
    </div>
</template>

<!--js模块对象-->
<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'

  export default {
    components: {
      FooterGuide
    },
    mounted(){
      //实现自动登陆
      this.$store.dispatch('reqUserInfo')
    }
  }
</script>

<!--样式-->
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
