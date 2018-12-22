<!--模板页面-->
<template>
    <div>
      <router-view/>
      <FooterGuide></FooterGuide>
    </div>
</template>

<!--js模块对象-->
<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
  import {reqAddress , reqCategorys} from './api/index'

  export default {
   async mounted(){
     const result = await reqCategorys()
     console.log(result)
    },
    components: {
      FooterGuide
    }
  }
</script>

<!--样式-->
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
