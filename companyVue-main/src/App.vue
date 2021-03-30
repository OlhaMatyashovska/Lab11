<template>

<nav>
<li><router-link to="/companies">Компанії</router-link></li>
<li><router-link to="/author">Автор</router-link></li>
<li><router-link to="/add">Додати</router-link></li>
<h3 v-if="login">{{login}}</h3>
<router-link to="/signin" v-else>Log in</router-link>
</nav>
  <router-view>
  </router-view>
</template>

<script> 
import storage from "./Storage";
export default {
  name:"App",
  data(){
    return{
      
    }
  },
  computed: {
     login() {
      return  storage.login;
     }
  }
}
</script>

<style>
body{
  background-image:url(https://img.etimg.com/thumb/msid-69901533,width-640,resizemode-4,imgsize-114837/about-the-company.jpg);
  }
li{
  underline:none;
  margin:3px;
  
  family-weight:5rem;
  border:3px solid blue; 
  list-style:none;
  float:left;
  background-color:grey;
}
</style>
