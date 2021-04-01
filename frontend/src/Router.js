import {createRouter,createWebHistory} from 'vue-router';
import Author from './components/Author.vue';
import FullScreenEditCompany from './components/FullScreenEditCompany.vue';
import Companies from './components/Companies.vue';
import CompanyDetails from './components/CompanyDetails.vue';
import AddCompanyForm from './components/FullScreenAddCompany.vue'; 
import FullScreenSignIn from './components/FullScreenSignIn.vue';
// import storage from  './Storage'; 
import axios from 'axios';
const Router = createRouter({  
    history:createWebHistory(),
    routes:[
     {
      path:'/author',
      component:Author
     },
     {
        path:'/companies',
        component: Companies,
        meta: {
         needAuth: true
    }
     },
     {
        path:'/companydetails/:id',
        component: CompanyDetails,
        props:true
     },
     {
      path:'/edit/:id',
      component: FullScreenEditCompany,
      props:true,
      meta: {
          needAuth: true
      }
   },
   {
      path:'/add/',
      component: AddCompanyForm,
      props:true
   },
   {
      path:"/signin",
      component:FullScreenSignIn
   }
]
});

Router.beforeEach( async (to, from, next) => {
   if (to.meta && to.meta.needAuth){
      try{
          const token = localStorage.getItem("token");
          await axios.get("http://localhost:5000/auth",
          {
              headers:{
                  "Authorization": `Bearer ${token}`
              }
          });
          next();
      } catch (error){
          next("/signin")
      }
  }
  else
      next(); 
});
export default Router;