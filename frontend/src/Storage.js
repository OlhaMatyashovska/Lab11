import {reactive} from 'reactive';
const storage = reactive({
  isSignedIn :false,
  login:""
});
export default storage;


// const storage={
//     companies:
//     [
//       {
//         Id:1346,
//         Name:"Neuralink",
//         Countries:["USA","Canada","Germany"],
//         NumberOfWorkers:100,
//         TypeOfProducts:"biological engineering"
//       },
//       {
//         Id:1346456,
//         Name:"Tesla",
//         Countries:["USA","Germany","China"],
//         NumberOfWorkers:1000,
//         TypeOfProducts:"car production, battery construction"
//      },
//       {
//         Id:13461098,
//         Name:"Google",
//         Countries:["USA","Great Britain"],
//         NumberOfWorkers:100000,
//         TypeOfProducts:"search engine studies, hardware and software production"
//       }
//     ]
// }
// export  default storage;