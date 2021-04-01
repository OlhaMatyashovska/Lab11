<template>

<div class="author">
<h1>Лабораторна робота №10</h1>
     <h1>{{authorInfo.name}}</h1>

     <p>Рід діяльності:{{authorInfo.status}}</p>
    <p>Age: {{authorInfo.age}}</p>
    <p>Course:{{authorInfo.course}}</p>
    
    <p>favouriteMusic:{{authorInfo.favouriteMusic}}</p>
    <p>Favourite past times:</p>
    <ul>
                  <li v-for="activity in authorInfo.favouriteTasks" :key="activity">{{activity}}</li>
                </ul>
</div>     
</template>
<script>
export default{
    name:"Author",
    data(){
        return{
            authorInfo:{
                name:"Olga Matyashovska",
               
                age:20,
                status:"student",
                course:4,
                favouriteTasks:[
                    "programming","reading"
                ],
                favouriteMusic:"indie,pop-rock"
        
            }
            
        }
    }
}

</script>
<style scoped>
body{
    margin:0;
    background-image:url(https://images.all-free-download.com/images/graphicthumb/beautiful_scenery_05_hd_pictures_166316.jpg);
}
.author{
    margin:0;
    
    height:400px;
}
ul{
    list-style:none;
}
</style>