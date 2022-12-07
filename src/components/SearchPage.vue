<template>
    <div>
        <br> <br>
        <center>
            <input v-model="searchInput" placeholder="Search for your favourite place.." class="search-bar">
            <button class="search-btn" v-on:click="getSearchResults">Search</button>
            <div class="no-result" v-if="error.length > 0">Sorry no results were found!!</div>
        </center>
        <br>

        <div v-for="(blogList,index) in searchedItems" v-bind:key="index" class="row">
            <br> <br>
            <div v-for="blog in blogList" v-bind:key="blog.id" class="column">
                <div :style="{backgroundImage: `url(${blog.image_url})`}" class="card">
                    <div class="card__header">
                    </div>
                    <div class="card__body">
                    <h4>{{blog.blog_title}}</h4>
                    <p>{{blog.description.substr(0,20)}}...</p>
                </div>
                    <div class="card__footer">
                    <div class="user">
                        <div class="user__info">
                        <h5 >By : {{blog.author_id}}</h5>
                        </div>

                    </div>
                    </div>
                    <button style="width: 100%;"  class="dark-btn" @click="viewBlog(blog._id)">View</button>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name:"SearchPage",
        data(){
            return {
                searchedItems:[],
                searchInput:"",
                error:"",
            }

        },
        methods:{
            results() {
                if(this.searchedItems.length == 0) {
                    return true;
                }
                return false;
            },
            async getSearchResults() {
                try {
                    const res =  await axios.get(`https://travel-junkie-back.onrender.com/api/explore/${this.searchInput}`)
                    this.searchedItems = []
                    while(res.data.length) this.searchedItems.push(res.data.splice(0,4));
                } catch (error) {
                    console.log(error);
                    this.error = error 
                }
            },
            viewBlog(id) {
                this.$router.push({path:`/explore/${id}`})
            }
        }
    }
</script>


<style scoped>
    .search-bar {
        width: 80%;
        padding: 13px;
        border-radius: 10px 0 0 10px ;
        border: 2px solid #4a69bd;
    }
    .no-result {
        margin-top: 15%;
    }
   
    .search-btn {
    padding: 10px;
    color: white;
    background-color: #4a69bd;
    border-radius: 10px;
    border: 2px solid whitesmoke;
    cursor: pointer;
    padding: 15px;
        margin-left:  0px;
        border-radius: 0 10px 10px 0;
        width: 10%
  }

    /* Grid */
    .column {
        float: left;
        width: 20%;
        padding: 0 10px;
        margin-left: 2%;
        margin-bottom: 2%;
    }

/* Remove extra left and right margins, due to padding */
.row {margin: 0 90px;}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive columns */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
}

img {
  max-width: 100%;
  display: block;
  object-fit: cover;
}

.card {
  display: flex;
  flex-direction: column;
  box-shadow: 0 .1rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 1em;
  background: linear-gradient(to right, #FFFFFF, #ECE9E6);
  color: white;
  text-shadow: -1px 1px 0 #000,
                          1px 1px 0 #000,
                         1px -1px 0 #000,
                        -1px -1px 0 #000;
}

.card__body {
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
}

.card__body h4 {
  font-size: 1.5rem;
  text-transform: capitalize;
  line-height: 0;
}

.card__footer {
  display: flex;
  padding: 0 1rem ;
  margin-top: auto;
}

.user {
  display: flex;
  gap: .5rem;
}

.user__info > small {
  color: #666;
}
</style>