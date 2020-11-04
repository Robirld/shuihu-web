<template>
  <div style="text-align: center;">
    <h1>welcome</h1>
    <button @click="logout">注销</button>
  </div>
</template>

<script>
  import { getTokenFromCookie, setTokenToCookie, removeToken } from '@/utils/cookie'
  export default {
    name: 'home',
    methods: {
      logout(){
        removeToken();
        this.$ajax({
          method: 'delete',
          url: '/logout'
        }).then(res => {
          console.log(res);
          this.$router.push({path: '/'});
        }).catch(e => {
          console.log(e);
        })
      }
    }
  }
</script>

<style>
</style>
