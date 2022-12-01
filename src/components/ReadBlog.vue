<template>
<div  class="card">
  <center>
    <h2 class="main-head">{{blog.blog_title}}</h2>
    <p class="sub-head ">By : {{blog.author_id}}</p>
    <h6 class="sub-head">{{blog.location}}</h6>
  </center>
    

      <img :src="blog.image_url" class="fakeimg" alt="">
      <h5 style="line-height: 0.5rem;" class="sub-head">Description</h5>
      <p style="font-weight:bold;color:#4a69bd">{{blog.description}}</p>
      <div>
        <h5>MUST VISITS</h5>
        <span class="must-visit" v-for="(visits,index) in blog.must_visit" v-bind:key="index">{{visits}}</span>
      </div> <br>
      
      <div>
        <h5>TRAVEL TIPS</h5>
        <span class="tips" v-for="(tips,index) in blog.travel_tips" v-bind:key="index">
          {{tips}}
        </span>
      </div> <br>
      <div> 
        <h5>DO NOT DO</h5>
        <span class="do-not-do" v-for="(donts,index) in blog.do_not_do" v-bind:key="index">{{donts}}</span>
      </div>
</div>
</template>

<script>
import axios from 'axios';

    export default {
        name:'ReadBlog',
        data(){
          return{
            blog:{},
            height:"200px"
          }
        },
        async created() {
          const res = await axios.get(`http://localhost:5000/api/blog/${this.$route.params.id}`)
          this.blog = res.data
          console.log(this.blog);
        }
    }
</script>

<style scoped>
/* Fake image */
.fakeimg {
  background-color: white;
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat;
}

/* Add a card effect for articles */
.card {
   background-color: white;
   padding: 20px;
   margin-top: 20px;
}

.main-head {
  font-size: 2.5rem;
  font-weight: bold;
  line-height: 0.5rem;

}

.sub-head {
  font-size: 1.5rem;
  /* line-height: 0.5rem; */
}
.must-visit {
  padding: 10px;
  background-color: yellow;
  color: black;
  font-weight: bold;
  margin: 0 10px 0 0;
  border-radius: 20px;
  border: 1px solid black;
}
.do-not-do {
  padding: 10px;
  background-color: red;
  color: white;
  font-weight: bold;
  margin: 0 10px 0 0;
  border-radius: 20px;
  border: 1px solid black;
}

.tips {
  padding: 10px;
  background-color: green;
  color: white;
  font-weight: bold;
  margin: 0 10px 0 0;
  border-radius: 20px;
  border: 1px solid black;
}

h6 {
  line-height: 0.5rem;
}
</style>