import {createRouter,createWebHistory} from 'vue-router';
import Author from './components/Author.vue';
import FullScreenEditCompany from './components/FullScreenEditCompany.vue';
import Companies from './components/Companies.vue';
import CompanyDetails from './components/CompanyDetails.vue';
import AddCompanyForm from './components/FullScreenAddCompany.vue';
const Router = createRouter({  
    history:createWebHistory(),
    routes:[
     {
      path:'/author',
      component:Author
     },
     {
        path:'/companies',
        component: Companies
     },
     {
        path:'/companydetails/:id',
        component: CompanyDetails,
        props:true
     },
     {
      path:'/edit/:id',
      component: FullScreenEditCompany,
      props:true
   },
   {
      path:'/add/',
      component: AddCompanyForm,
      props:true
   },
]
});
export default Router;