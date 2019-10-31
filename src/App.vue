<!--
 * @Descripttion: 
 * @version: 
 * @Author: Colorssk
 * @Date: 2019-09-06 18:02:20
 * @LastEditors: Colorssk
 * @LastEditTime: 2019-10-31 11:03:16
 -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import '../module/loader/testFile.json'
export default {
  name: 'App',
  mounted(){
    setTimeout(()=>{
      axios.get('/api/getProcessArg').then(res=>{
        //alert(res)
        this.$router.push({
          path: '/' + res.data,
          component: () => import('@/views/'+'/'+res.data),
          name: res.data
        },)
        
    
      }).catch(e=>{
        throw e
      })
      
    },3000)
  }
}
</script>
