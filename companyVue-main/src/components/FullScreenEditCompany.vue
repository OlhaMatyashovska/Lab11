<template>
<form @submit.prevent="saveCompany">
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
</template>

<script>
// import storage from '../Storage';
import axios from "axios";

export default{
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
      let company = (await axios.get(`http://localhost:5000/api/company/${this.id}`)).data;
      this.editCompany = company;
      this.correctId = true;
    } catch (err) {
      this.correctId = false;
      console.log(err);
    }
    },
    methods:{
        async saveCompany(){
            // this.editCompany.Countries=this.editCompany.Countries.split(",");
            // this.$router.push(`/companydetails/${this.id}`);
            try {
              console.log(this.editCompany);
              let updatedCompany= (await axios.patch(`http://localhost:5000/api/company/${this.id}`,
            {
              Name:this.editCompany.Name,
              Countries:this.editCompany.Countries,
              NumberOfWorkers:this.editCompany.NumberOfWorkers,
              TypeOfProducts:this.editCompany.TypeOfProducts,
              
            }
          )
        ).data;
        this.$router.push(`/companydetails/${updatedCompany._id}`);
      } catch (err) {
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
    position:absolute;
    top:50px;
    left:10px;
    background-color:blue;
    width:200px;
    height:250px;
    color:white;
}
</style>
