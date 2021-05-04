<template>
  <li>
      <h2 @click="showDetails()">{{company.Name}}</h2>
                <p>Виробництво:{{company.TypeOfProducts}}</p>
                <p>Кількість робітників:{{company.NumberOfWorkers}}</p>
               Країни-співробітники:
                 <ul>
                  <li v-for="country in company.Countries" :key="country">{{country}}</li>
                </ul>
  </li>
</template>

<script>
export default {
  name: "BookTemplate",
  props: {
    company: Object,
  },
  data() {
    return {};
  },
  methods:{
      showDetails(){
          this.$router.push(`/companydetails/${this.company._id}`);
      }
  }
};
</script>

<style scoped>
.companyvie {
  background:#335DFF;
  width: 200px;
  position: relative;
  float: left;
  margin: 10px;
  height: 300px;
}
</style>