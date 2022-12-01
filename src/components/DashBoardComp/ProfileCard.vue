<template>
    <div class="card">
        <img src="../../assets/profile.png" style="width:60%">
        <h1>{{username}}</h1>
        <p class="title">{{status}}</p>
        <p>{{email}}</p>
    </div>
</template>

<script>
import axios from 'axios';

    export default {
        name:'ProfileCard',
        data() {
            return{
                username:"",
                email:'',
                status:"",

            }
        },
        async created() {
            const res = (await axios.get(`https://travel-junkie-back.onrender.com/api/user/${this.$store.state.id}`)).data
            this.username = res.username
            this.email = res.email
            this.status = res.status
        }
    }
</script>

<style scoped>
    .card {
        width: 100%;
        margin-top: 30px;
        text-align: center;
        font-family: arial;
        border: 5px solid #4a69bd;
        padding: 10px 0;
        border-radius: 5px;

    }
    .title {
        color: #4a69bd;
        font-size: 18px;
    }

    
</style>