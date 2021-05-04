<template>
    <form @submit.prevent>
        <input  placeholder="login" v-model="login">
        <input  placeholder="password" v-model="password">
        <button @click="signIn">Log in</button>
    </form>
</template>

<script>
//import axios from "axios";
//import storage from "../Storage";
import auth from "../auth";
//import { mapMutations } from "vuex";
export default {
    name:"FullScreenSignIn",
    data() {
        return {
            login:"",
            password:"",

        }
    },
    methods: {
      async signIn() {
         try {
        //    const token = (await axios.post("http://localhost:5000/auth/login", {
        //          login: this.login,
        //          password: this.password
        //      })).data.token;
        //     storage.token = token;
        //     storage.signIn = true;
        //     storage.login = this.login;
        //     localStorage.setItem("token",token);
        //     this.$router.push("/companies");
        await auth.signIn(this.login, this.password);
        this.$router.push("/companies");

         } catch (error){
             if(error.response.status == 404) {
                 alert("невіриний логін або пароль(((");
             }
             console.log(error.response);
         }
       }
    }
}
</script>
