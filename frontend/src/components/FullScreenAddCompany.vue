<template>
<form @submit.prevent="add">
Назва компанії:<br>
            <input v-model="newCompany.Name"><br>
            Число робітників:<br>
            <input type="number" v-model.number="newCompany.NumberOfWorkers"> <br>
            Продукти виробництва:<br>
            <input v-model="newCompany.TypeOfProducts"><br>
            Компанії-співробітники:<br>
            <input v-model="newCompany.Countries"><br>
            <button type="submit">Додати компанію до бази даних</button>
            </form>
</template>
<script> 
// import storage from '../Storage';
//import axios from "axios";
import { mapActions } from "vuex";

export default {
   data() {
       return {
           newCompany:
           {
          Name:"",
          Countries:"",
          NumberOfWorkers:0,
          TypeOfProducts:""
           },
       }
   },
   methods:{
       ...mapActions(["addCompany"]),
      async add(){
           
    //   let newCompanyCopy = Object.assign({}, this.newCompany);
    //   newCompanyCopy.Id = Date.now();
    //   newCompanyCopy.Countries=newCompanyCopy.Countries.split(",");
    //   storage.companies.push(newCompanyCopy);
    try {
        // let newCompanyCopy =  (await axios.post("http://localhost:5000/api/company/",this.newCompany)).data; 
        // this.$router.push(`/companydetails/${newCompanyCopy._id}`);
        const newCompanyCopy = await this.addCompany(this.newCompany);
        if (newCompanyCopy) {
          this.$router.push(`/companydetails/${newCompanyCopy._id}`);
        }
    }catch(err) {
        console.log(err);
    } 
       }
   }
}
</script>
<style scoped>
body{
    position:relative;
}
form{
    width:200px;
    height:250px;
    background-color:blue;
    position:absolute;
    top:50px;
    left:10px;
    color:white;
}
</style>