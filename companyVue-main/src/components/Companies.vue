<template>
<div>
  <section class="control">
    Вибрано книгу {{ selected }}
    <input type="button" value="Додати нову компанію" v-on:click="showForm" style="display:none;"/>
    <input type="button" value="Редагувати компанію" v-on:click="showEditForm" style="display:none;"/>
    <input type="button" value="Вилучити інфу про компанію" v-on:click="deleteCompany"/>
    <input type="number" placeholder="min" v-model.number="minWorkerCount">
          <input type="number" placeholder="max" v-model.number="maxWorkerCount">
          <input type="button" value="знайти" v-on:click="Find()">
    
  </section>
  <div>
    <new-book-form 
      v-model = "newCompany"
      @submit.prevent="addNewCompany"
      ref="newBookForm"> </new-book-form>
      </div>
      <div>
    <new-book-form
      v-model = "editCompany"
      ref="editBookForm">
    </new-book-form>
    </div>
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
</template>

<script>
import BookTemplate from './BookTemplate.vue';
import NewBookForm from './NewBookForm.vue';
import storage from './../Storage';
import axios from "axios";
export default {
  name: "App",
  components:{
    BookTemplate,
    NewBookForm
  },
  data() {
    return {
      
      selected: -1,
      minWorkerCount:0,
      maxWorkerCount:0,
      companies:[],
      newCompany:
      {
          Name:"",
          Countries:"",
          NumberOfWorkers:0,
          TypeOfProducts:""
      },
      editCompany: {},
    };
  },
  methods: {
    addNewCompany() {
      console.log(this.newBook);
      let newCompanyCopy = Object.assign({}, this.newCompany);
      newCompanyCopy.Id = parseInt(Date.now());
      newCompanyCopy.Countries=newCompanyCopy.Countries.split(",");
      this.companies.push(newCompanyCopy);
      this.showNewCompanyForm = false;
    },
    showForm() {
      this.$refs.newBookForm.show();
    },
    selectCompany(id) {
      this.selected = id;
    },
    showEditForm() {
      if (this.selected >= 0) {
        let index = this.companies.findIndex(book => book.Id == this.selected);
        this.editCompany = this.companies[index];
        console.log(this.editCompany);
        
        this.$refs.editBookForm.show();
      } else alert("Виберіть компанію");
    },
   async deleteCompany() {
        try {
          if(storage.token) {
             let deletedBook = (await axios.delete(`http://localhost:5000/api/company/${this.selected}`,
             {
               headers: {
                 "Authorization": `Bearer ${storage.token}`
               }
             }
             )).data;
              this.companies = [];
          alert(`Company ${deletedBook.Name} was deleted from data base!!!`);
          this.companies = (await axios.get("http://localhost:5000/api/company/")).data
          } 
          
         
        } catch(err) {
          console.log(err);
        }
    },
    closeForm(){
      this.showNewCompanyForm = false;
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
   try {
         this.companies = (await axios.get("http://localhost:5000/api/company/")).data;
    } catch (err) {
      console.log(err);
    }
  }
};
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
