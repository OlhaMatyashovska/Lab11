<template>
<div>
<nav>
<li><router-link to="/companies">Компанії</router-link></li>
<li><router-link to="/author">Автор</router-link></li>
<li><router-link to="/add">Додати</router-link></li>
<sign-in-status-panel></sign-in-status-panel>
</nav>
<router-view></router-view>
</div>
</template>

<script> 
//import storage from "./Storage";
import auth from "./auth";
import SignInStatusPanel from "./components/SignInStatusPanel";
export default {
  name:"App",
  data(){
    return {}
  },
   components: {
    SignInStatusPanel
  },
   mounted() {
    auth.restoreSignInStatus();
  },
}
</script>

<style>
body{
  background-image:url(https://img.etimg.com/thumb/msid-69901533,width-640,resizemode-4,imgsize-114837/about-the-company.jpg);
  }
li{
  margin:3px;
  
  font-weight:5rem;
  border:3px solid blue; 
  list-style:none;
  float:left;
  background-color:grey;
}
</style>
