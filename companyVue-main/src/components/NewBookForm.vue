<template>
    <div v-if="showNewCompanyForm" class="whiteboard">
    <form
      v-on:submit.prevent="addNewCompany"
      class="newForm"
    >
      <button v-on:click="hide"> X </button>
     Назва компанії:<br>
            <input v-model="newCompany.Name"><br>
            Число робітників:<br>
            <input type="number" v-model.number="newCompany.NumberOfWorkers"> <br>
            Продукти виробництва:<br>
            <input v-model="newCompany.TypeOfProducts"><br>
            Компанії-співробітники:<br>
            <input v-model="newCompany.Countries"><br>
      <button type="submit">Додати</button>
      <button type="reset">Очистити</button>
    </form>
  </div>
</template>

<script>
export default {
    name:"NewBookForm", 
    data(){
        return{
            showNewCompanyForm: false,
            newCompany: this.modelValue,
        }
    },
    props:{
       modelValue: Object  // Vue 2 - "value"
    }, 
    methods:{
        addNewCompany(){
            
            this.$emit("update:modelValue", this.newCompany); //Vue 2 this.$emit("input", ...);
            this.hide();
        }, 
        show(){
            this.showNewCompanyForm = true;
        },
        hide(){
            this.showNewCompanyForm = false;
        },
        
    }, 
    watch:{
      modelValue(newValue){
        this.newCompany = newValue;
      }
    }
}
</script>

<style scoped>
.whiteboard{
  width: 1000px;
  height: 1000px;
  
  position: absolute;
  z-index: 9;
}
form {
  position: absolute;
  z-index: 10;
  background:#33C3FF;
  margin: 100px auto;
  top:100px;
  left:300px;
  width: 50%;
}
</style>