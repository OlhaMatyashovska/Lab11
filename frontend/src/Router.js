import {createRouter,createWebHistory} from 'vue-router';

import Author from './components/Author.vue';
import FullScreenEditCompany from './components/FullScreenEditCompany.vue';
import Companies from './components/Companies.vue';
import CompanyDetails from './components/CompanyDetails.vue';
import AddCompanyForm from './components/FullScreenAddCompany.vue'; 
import FullScreenSignIn from './components/FullScreenSignIn.vue';
// import storage from  './Storage'; 
import auth from "./auth";
//import axios from 'axios';
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
      meta: {
        needAuth: true
    }
   },
   {
      path:"/signin",
      component:FullScreenSignIn
   }
]
});

Router.beforeEach( async (to, from, next) => {
    if (to.meta && to.meta.needAuth) {       
        if (await auth.checkSignInStatus())
            next();
        else
            next("/signin");
    } else
        next();
});
export default Router;