<template>
  <div v-if="correctId">
    <button type="button" @click="edit">Редагувати</button>
    <h1>{{company.Name}}</h1>
    <h2>Кількість робітників:{{company.NumberOfWorkers}}</h2>
    <p>{{ company.NumberOfWorkers }}</p>
    Країни-співробітники:
                 <ul>
                  <li v-for="country in company.Countries" :key="country">{{country}}</li>
                </ul>
    
  </div>
</template>

<script>
// import storage from '../Storage';
//import axios from "axios";
import networking from "../networking";
export default {
    props:{
        id:String
    },
    data(){
        return{
            company:{
                 Name:"",
                 Countries:"",
                 NumberOfWorkers:0,
                 TypeOfProducts:""
            }, 
            correctId: false,
        }
    },
     async mounted(){
        // this.company = storage.companies.find(x => x.Id == Number(this.id));
      try {
        //this. company = (await axios.get(`http://localhost:5000/api/company/${this.id}`)).data;
        this.company = await networking.getCompanyById(this.id);
        console.log(this.company);
        if (this.company) this.correctId = true;
        else this.correctId = false; 
      }
      catch(err) {
        console.log(err);
      }
    },
    methods:{
        async edit() {
           this.$router.push(`/edit/${this.id}`); 
        }
    }
}
</script>

<style scoped>
body{
    position:relative;
}
div{
    position:absolute;
    height:250px;
    width:400px;
    color:white;
    background-color:blue;
    top:50px;
    left:10px;
}
</style>