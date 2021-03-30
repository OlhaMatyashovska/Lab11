<template>
    <form @submit.prevent>
        <input type="text" placeholder="login" v-model="login">
        <input type="text" placeholder="password" v-model="password">
        <button @click="signIn"> Log in</button>
    </form>
</template>

<script>
import axios from "axios";
import storage from "../Storage";
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
           const token = (await axios.post("http://localhost:5000/auth/login", {
                 login: this.login,
                 password: this.password
             })).data.token;
            storage.token = token;
            storage.signIn = true;
            this.$router.push("/companies");

         } catch (error){
             console.log(error);
         }
       }
    }
}
</script>
