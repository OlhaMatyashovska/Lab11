<template>

<nav>
<li><router-link to="/companies">Компанії</router-link></li>
<li><router-link to="/author">Автор</router-link></li>
<li><router-link to="/add">Додати</router-link></li>
</nav>
  <router-view>
  </router-view>
</template>

<script>
export default{
  name:"App",
  data(){
    return{}
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
