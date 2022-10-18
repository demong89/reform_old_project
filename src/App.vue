<template>
 <router-view></router-view>
</template>

<script>
import Home from './Home.vue'
export default{
   components:{Home},
  data(){
    return {
      message:'Vue项目'
    }
  }
}
</script>
<style scoped>

</style>
