<template>
  <div>
    <div v-for="(blog ,index) in blogList" v-bind:key="index"  class="card" >
        <div class="top">
          <div class="userDetails">
            <h3> <b>Title: </b> {{blog.blog_title}}
              <br /> <br>
              <span> <b>Location: </b>{{blog.location}}</span>
            </h3>
          </div>
        </div>
        <div class="bottom">
            <p class="likes"><b>Description: </b> {{blog.description.substr(0,100)}}...</p>
        </div>
        <button @click="readBlog(blog._id)" style="float: right;width: 10%;" class="dark-btn">View</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

    export default {
        name:'FeedPost',
        data(){
          return{
            blogList:[]
          }
        },
        async beforeMount() {
          try {
            const res = await axios.get(`http://localhost:5000/api/blog/user/${this.$store.state.username}`)
            this.blogList = res.data
          } catch (error) {
            console.log(error);
          }
          
        },
        methods:{
          readBlog(id) {
            this.$router.push({path:`/explore/${id}`})
          }
        }
    }
</script>

<style>
    
    .col-3 {
    width: 30%;
    position: -webkit-sticky;
    position: sticky;
    top: 90px;
    }
    
    .col-3 h4 {
    color: #4a69bd;

    }
    
    .col-3 .card {
    margin-bottom: 20px;
    position: relative;
    width: 100%;
    display: inline-block;
    }
    
    .col-3 .card .top {
    padding: 10px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    }
    
    .col-3 .card .top a {
    color: #1d92ff;
    }
    
    .col-3 .card .bottom {
    padding: 10px 20px;
    }
    
    .col-3 .card .top .userDetails {
    width: 100%;
    display: flex;
    align-items: center;
    }
    
    .col-3 .card .top .userDetails h3 {
    font-size: 16px;
    color: #4d4d4f;
    font-weight: 500;
    line-height: 1em;
    }
    
    .col-3 .card .top .userDetails h3 span {
    font-size: 0.75em;
    }
    
    .col-3 .card .top .userDetails h3 span {
    font-size: 0.75em;
    }
    
    .col-9 .card {
    margin-bottom: 20px;
    position: relative;
    width: 100%;
    /* min-height: 400px; */
    display: inline-block;
    border: 1px solid rgba(7, 7, 7, 0.24);
    }
    
    .col-9 .card .top {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    }
    
    .col-9 .card .bottom {
    padding: 10px 20px;
    }
    
    .col-9 .card .top .userDetails {
    width: 100%;
    display: flex;
    align-items: center;
    }
    
    .profilepic {
    display: inline-block;
    cursor: pointer;
    }
    
    .profilepic .profile_img {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    overflow: hidden;
    width: 30px;
    height: 30px;
    background: linear-gradient(to right, red, orange);
    padding: 2px;
    margin-right: 8px;
    cursor: pointer;
    }
    
    .profilepic .profile_img .image {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    }
    
    .profilepic .profile_img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    }
    
    .cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    }
    
    .col-9 .card .top .userDetails h3 {
    /* width: 100%; */
    font-size: 16px;
    color: black;
    font-weight: 500;
    line-height: 1em;
    }
    
    .col-9 .card .top .userDetails h3 span {
    font-size: 0.75em;
    }
    
    .col-9 .card .top .userDetails h3 span {
    font-size: 0.75em;
    }
    
    .dot {
    transform: scale(0.6);
    cursor: pointer;
    }
    
    .imgBx {
    position: relative;
    width: 100%;
    min-height: 600px;
    margin: 10px 0 15px;
    }
    
    .actionBtns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    }
    
    .actionBtns svg {
    cursor: pointer;
    }
    
    .actionBtns .left svg {
    margin-right: 8px;
    }
    
    .likes {
    font-weight: 500;
    margin-top: 5px;
    font-size: 14px;
    color: #4d4d4f;
    }
    
    .message {
    font-weight: 400;
    margin-top: 5px;
    font-size: 14px;
    color: #777;
    line-height: 1.5em;
    }
    
    .message b {
    color: #262626;
    }
    
    .message span {
    cursor: pointer;
    color: #1d92ff;
    }
    
    .comments {
    margin-top: 10px;
    font-weight: 400;
    color: #999;
    }
    
    .addComments {
    display: flex;
    align-items: center;
    margin-top: 20px;
    border-top: 1px solid #ddd;
    padding: 10px 0;
    }
    
    

    
    input.text {
    width: 100%;
    border: none;
    outline: none;
    font-weight: 400;
    font-size: 14px;
    color: #262626;
    background: none;
    }
    
    input.text::placeholder {
    color: #777;
    }
    
    .postTime {
    margin-top: 8px;
    font-weight: lighter;
    color: rgb(163, 163, 163);
    font-size: 12px;
    text-transform: uppercase;
    }
    
    a {
    text-decoration: none;
    }
    
    .hidden {
    display: none;
    }

    input {
  padding: 5px 12px;
  border: 1px solid #ccc;
  width: 90%;
}


    

    
</style>