<template>
    <div class="blog-form">
        <h1>New Blog</h1>
        <h3>Feilds marked with <span>*</span> are mandatory.</h3>
        <p>Image url
            <span>*</span>
        </p>
        <input required v-model="image_url" placeholder="Title image url">
        <p>Title
            <span>*</span>
        </p>
        <input required v-model="blog_title" placeholder="Post title">
        <p>Place of visit
            <span>*</span>
        </p>
        <input required v-model="location" placeholder="Destination">
        <p>Content
            <span>*</span>
        </p>
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
        <button @click="clearFields" style="float: right;" class="danger-btn">CLEAR</button> 
    </div>


</template>

<script>
import axios from 'axios'
import {server} from './enviornment'

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
                    await axios.post(`${server}api/blog/addBlog`,blogData)
                    this.clearFields()
                    this.error = ''
                } catch (error) {
                    this.error = "Enter all the information."
                }
            },
            clearFields() {
                this.blog_title="";
                this.location="";
                this.description="";
                this.image_url="";
                this.visits="";
                this.tips="";
                this.dnd="";
            }
       

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
    span {
        color: var(--red);
        font-size: 1.5rem;
    }
</style>
