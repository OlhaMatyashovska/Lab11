<template>
<div>
  <section class="control">
    <router-link to="/add/"> Додати компанію </router-link>
    <input type="button" value="Вилучити інфу про компанію" v-on:click="deleteCompany"/>
    <input type="number" placeholder="min" v-model.number="minWorkerCount">
          <input type="number" placeholder="max" v-model.number="maxWorkerCount">
          <input type="button" value="знайти" v-on:click="Find()"> 
  </section>
  <div>
    <ul v-if="companies && companies.length>0">
      <book-template
        v-for="c in companies"
        :key="c.Id"
        class="companyvie"
        v-on:click="selectCompany(c._id)"
        v-bind:company="c">
      </book-template>
    </ul>
    <div v-else>Сервер завантажує дані про компанії</div>
  </div>
    
</div>
</template>

<script>
import BookTemplate from './BookTemplate.vue';
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "App",
  components:{
    BookTemplate,
  },
  data() {
    return {
      selected: null,
      minWorkerCount:0,
      maxWorkerCount:0,
    };
  },
  methods: {
    ...mapActions([ "loadCompanies", "deleteCompanyById"]),
    
    selectCompany(id) {
      this.selected = id;
    },

   async deleteCompany() {
      await this.deleteCompanyById(this.selected);
    //   if (deletedBook)
    //     showMessage("Успішне вилученн", `Книга ${deletedBook.Title} вилучена`);
    // },
    },
    
    async Find(){
        var z=this.minWorkerCount;
        var m=this.maxWorkerCount;
        try {
         this.companies = (await axios.get("http://localhost:5000/api/company/")).data.filter(x=>Number(x.NumberOfWorkers)>=z && Number(x.NumberOfWorkers)<=m);
    } catch (err) {
      console.log(err);
    }
    }
  },
 async mounted() {
  await this.loadCompanies();
 },
 computed: {
   ...mapGetters(["companies"]),
   areSomeCompanies() {
      return this.companies.length > 0;
    },
    selectedEditURL() {
      return `/edit/${this.selected}`;
    },
 }
} 
</script>

<style scoped>

ul {
  list-style: none;
  position: relative;
}
.wrap {
  position: relative;
}

</style>
