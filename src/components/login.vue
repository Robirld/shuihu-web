<template>
  <div class="form-group">
    <img src="../assets/logo.png" class="logo-img"/>
    <h2>Shui Hu</h2>
    <form>
      <div class="form-item">
        <label for="username">账号：</label>
        <input type="text" ref="account" class="input-login" v-model="username" id="username" placeholder="请输入账号"/>
      </div>
      <div class="form-item">
        <label for="password">密码：</label>
        <input type="password" ref="password" class="input-login" v-model="password" id="password" placeholder="请输入密码"/>
      </div>
      <div class="form-item">
        <input type="checkbox" v-model="rememberMe" value="true"/><span style="font-size: 1rem;">记住我</span>
        <a class="btn btn-primary" @click="login">登陆</a>
        <a class="btn btn-success" @click="signUp">注册</a>
      </div>
    </form>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { getTokenFromCookie, setTokenToCookie, removeToken } from '@/utils/cookie'
export default {
  name: 'login',
  data () {
    return {
      username: null,
      password: null,
      rememberMe: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.username = Cookies.get('username');
    this.password = Cookies.get('password');
    this.rememberMe = Cookies.get('rememberMe');
  },
  methods: {
    login() {
      var formData = new FormData();
      formData.append('username', this.username);
      formData.append('password', this.password);
      this.$ajax({
        method: 'post',
        url: '/login',
        data: formData
      }).then(res => {
        console.log(res);
        setTokenToCookie(res.data.msg, this.rememberMe);
        this.$store.commit('setToken', {token: res.data.msg});
        Cookies.set('username', this.username);
        Cookies.set('password', this.password);
        Cookies.set('rememberMe', this.rememberMe);
        this.$router.push({path: this.redirect || '/home'});
      }).catch(e => {
        console.log(e);
      })
    },
    signUp() {
      this.$router.push({path: '/signup'});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-group {
  width: 30rem;
  margin: 10rem auto;
  padding: 2rem;
  border: solid 0.0625rem #42B983;
  border-radius: 1rem;
  text-align: center;
}
.logo-img {
  width: 6rem;
}
.form-item {
  margin: 1.5rem auto;
  color: black;
  font-size: 1.2rem;
}
.input-login {
  width: 13rem;
  height: 2rem;
  border: solid 0.01rem dimgrey;
  border-radius: 0.3rem;
  padding: 0 0.5rem;
  color: #2C3E50;
}
.input-login:focus {
  outline: none;
  border: solid 0.01rem #42B983;
}
.btn {
  display: block;
  margin: 0.5rem auto;
  border: solid 0.07rem slategray;
  border-radius: 1rem;
  width: 55%;
  height: 2rem;
  font-size: 1.1rem;
  color: black;
  text-decoration: none;
  line-height: 2rem;
  cursor: pointer;
}

.btn-primary {
  background-color: #42B983;
}
</style>
