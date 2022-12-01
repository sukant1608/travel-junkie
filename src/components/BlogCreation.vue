<template>
    <form class="blog-form">
        <h1>Create a new post!!</h1>
        <p>Image url</p>
        <input required v-model="image_url" placeholder="Title image url">
        <p>Title</p>
        <input required v-model="blog_title" placeholder="Post title">
        <p>Place of visit</p>
        <input required v-model="location" placeholder="Destination">
        <p>Content</p>
        <textarea required v-model="description" name="" id="" rows="10" placeholder="Write about your experience..."></textarea>
        <p>Must visit</p>
        <input v-model="visits" placeholder="Seperate each point with ,">
        <p>Travel tips</p>
        <input v-model="tips" placeholder="Seperate each point with ,">
        <p>Do not Do</p>
        <input v-model="dnd" placeholder="Seperate each point with ,">
        <center>
            <p style="color: red;">{{error}}</p>
        </center>
        <br> <br>
        <button @click="createBlog" style="float: right;margin-left: 20px;" class="dark-btn">POST</button>
        <button style="float: right;" class="danger-btn">CLEAR</button> 
    </form>


</template>

<script>
import axios from 'axios'
    export default {
        name:'BlogCreation',
        data() {
            return {
                blog_title:"",
                location:"",
                description:"",
                image_url:"",
                visits:"",
                tips:"",
                dnd:"",
                error:""
            }
        },
        methods:{
            async createBlog(){
                try {
                    const blogData = {
                        blog_title:this.blog_title,
                        author_id:this.$store.state.username,
                        location:this.location,
                        description:this.description,
                        must_visit:this.visits.split(","),
                        travel_tips:this.tips.split(","),
                        do_not_do:this.dnd.split(","),
                        image_url:this.image_url
                    }
                     await axios.post("http://localhost:5000/api/blog/addBlog",blogData)
                    this.$router.push({path:"/dashboard"})
                } catch (error) {
                    this.error = "Enter all the information."
                }
            },
       

        }

    }
</script>

<style scoped>
    .blog-form {
        width: 90%;
        margin: auto;
    }
    textarea,
    input{
        width: 100%;
        border-radius: 5px;
        padding: 10px;
    }
   

</style>
