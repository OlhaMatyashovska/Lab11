<template>
<form @submit.prevent="saveCompany" v-if="correctId">
Назва компанії:<br>
            <input v-model="editCompany.Name"><br>
            Число робітників:<br>
            <input type="number" v-model.number="editCompany.NumberOfWorkers"> <br>
            Продукти виробництва:<br>
            <input v-model="editCompany.TypeOfProducts"><br>
            Компанії-співробітники:<br>
            <input v-model="editCompany.Countries"><br>
            <button type="submit">Save</button>
            </form>
<p v-else>Невірний id</p>
</template>

<script>
// import storage from '../Storage';
//import axios from "axios";
import { mapActions } from "vuex";
import networking from "../networking";


export default {
    props:{
        id:String
    },
    data(){
        return{
            editCompany:{},
            correctId: false
        }
    },
  async mounted(){
        // this.editCompany = storage.companies.find(x => x.Id == Number(this.id));
        try {
       this.editCompany = await networking.getCompanyById(this.id);
    if (this.editCompany) this.correctId = true;
    else this.correctId = false;
    } catch (err) {
      this.correctId = false;
      console.log(err);
    }
    },
    methods:{
      ...mapActions(["updateCompany"]),
        async saveCompany() {
          this.editCompany._id = this.id;
      const updatedCompany = await this.updateCompany(this.editCompany);
      if (updatedCompany) {
        this.$router.push(`/companydetails/${updatedCompany._id}`);
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
    position:absolute;
    top:50px;
    left:10px;
    background-color:blue;
    width:200px;
    height:250px;
    color:white;
}
</style>
