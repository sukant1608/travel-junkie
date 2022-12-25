<template>
    <div>
    <main>
      <div class="container">
        <div class="col-3">
          <ProfileCard/>
        </div>
        <div class="col-9">
          <div class="statuses">
            <h3>Status</h3>
            <br />
            <input v-model="newStatus"  placeholder="Enter new status!!" /> <br />
            <br />
            <button class="dark-btn" style="margin-left: 90%;" v-on:click="changeStatus">POST</button>
          </div>

          <!-- Code for viewing the Post -->
          <FeedPost/>

        </div>
      </div>
    </main>
</div>
</template>

<script>
    import ProfileCard from './DashBoardComp/ProfileCard.vue';
    import FeedPost from './DashBoardComp/FeedPost.vue';
    import axios from 'axios';
    import {server} from './enviornment'
    
    export default {
        name:'DashBoard',
        components:{
            ProfileCard,
            FeedPost
        },
        data(){
          return{
            newStatus:""
          }
        },
        methods:{
          async changeStatus(){
            await axios.patch(`${server}api/user/status`,
            {id:this.$store.state.id,password:this.$store.state.password,status:this.newStatus})
            this.newStatus = ""
            location.reload()
          },
          
        }
    }
</script>

<style scoped>

    
.action .profile {
    position: relative;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    }
    
    .action .profile img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    }
    
    main {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    }
    
    main .container {
    position: relative;
    /* margin-top: 60px; */
    width: 90%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    /* background: #ddd; */
    }
    
    .col-9 {
    width: 65%;
    margin-top: 30px;
    }
    
    .statuses {
    margin-bottom: 30px;
    background-color: #fff;
    padding: 20px 20px;
    border-radius: 2px;
    border: 1px solid rgb(218, 217, 217);
    }
    
    .statuses .status {
    display: inline-block;
    border-radius: 50%;
    overflow: auto;
    width: 70px;
    height: 70px;
    min-width: 70px;
    min-height: 70px;
    background: linear-gradient(to right, red, orange);
    padding: 2px;
    margin-left: 15px;
    cursor: pointer;
    }
    
    .statuses .status .image {
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
    
    .statuses .status img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    }
    
    .col-3 {
    width: 30%;
    position: -webkit-sticky;
    position: sticky;
    top: 90px;
    }
    
    .col-3 h4 {
    color: rgb(100, 100, 100);
    }
    
    .col-3 .card {
    margin-bottom: 20px;
    position: relative;
    width: 100%;
    /* min-height: 400px; */
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
    color: #4d4d4f;
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
    
    .addComments a {
    color: #1d92ffcb;
    font-weight: 500;
    }
    
    .addComments .reaction {
    position: relative;
    font-size: 1.3rem;
    margin-right: 10px;
    color: rgb(88, 88, 88);
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
    
    
    

    
    a {
    text-decoration: none;
    }
    
    
</style>