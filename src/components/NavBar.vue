<template>
  <div>
    <div class="topnav" id="myTopnav">
        <router-link  to="/" class="active">travel-junkie</router-link>
        <router-link v-if="this.$store.state.isAuth" to="/dashboard" >Home</router-link>
        <router-link v-if="this.$store.state.isAuth" to="/create" >Write</router-link>
        <router-link to="/explore" >Search</router-link>
        <a to="javascript:void(0);" class="icon" v-on:click="expandMenu">
            <i class="fa fa-bars"></i>
        </a>
        <div v-if="!this.$store.state.isAuth" class="topnav-right">
          <a  v-on:click="showModal">Signup</a>
        </div>
        <div v-else class="topnav-right">
          <router-link to="/">Hi {{this.$store.state.username}} !!</router-link>
          <a to="/" v-on:click="logout">Logout</a>
        </div>
    </div>
    <div id="authForm" class="modal">
      <div class="modal-content">
        <span  v-on:click="hideModal" class="close">&times;</span>
        <div v-if="authSwitch">
          <h2>Signup</h2> 
          <input type="email" v-model="email" placeholder="Enter your email"> <br>
          <input v-model="username"  placeholder="Enter your username"> <br>
          <input type="password" v-model="password" placeholder="Enter your password"> <br> <br>
          <button class="dark-btn" style="width: 50%;" v-on:click="register">SUBMIT</button> <br> <br>
          <p class="switch-auth" v-on:click="switchAuth" >Already have an account?</p>
        </div>
        <div v-else>
          <h2>Login</h2> 
          <input v-model="username"  placeholder="Enter your username"> <br>
          <input v-model="password" type="password"  placeholder="Enter your password"> <br> <br>
          <button class="dark-btn" style="width: 50%;" v-on:click="login" >SUBMIT</button> <br> <br>
          <p class="switch-auth" v-on:click="switchAuth" >New to our site?</p>
        </div>
        <p v-if="error" style="color: red;">{{error}}</p>
      </div>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {server} from './enviornment'

export default {
    name:'NavBar',
    data(){
      return {
        authSwitch:true,
        username:'',
        email:'',
        password:'',
        error:''
      }
    },
    methods:{
        expandMenu() {
            var x = document.getElementById("myTopnav");
            if (x.className === "topnav") {
                x.className += " responsive";
            } else {
                x.className = "topnav";
            }
        },
        showModal() {
          document.getElementById("authForm").style.display = 'block';
        },
        hideModal() {
          document.getElementById("authForm").style.display = 'none';
          this.error = ""
          this.clearInput();

        },
        switchAuth() {
          this.email = ''
          this.password = ''
          this.username = ''
          this.authSwitch = !this.authSwitch
          this.error = ""
        },
        async login() {
          try {
            if(this.valid("login")) {
              const res =await axios.post(`${server}api/auth/login`,
            {username:this.username,password:this.password})
              this.$store.dispatch('authenticate',{username:res.data.username,id:res.data.id,password:res.data.password})
              this.hideModal();
              this.$router.push({path:"/dashboard"}) 
            } else {
              this.error = "Enter all the information required."
              this.clearInput();
            }
          } catch (error) {
            this.error = "Username or password provided are incorrect.";
            this.clearInput()
          }
        },
        async register() {
          try {
            if(this.valid("register")) {
              const res =await axios.post(`${server}api/auth/register`,
              {email:this.email,username:this.username,password:this.password})
              this.$store.dispatch('authenticate',{username:res.data.username,id:res.data.id})
              this.hideModal()
              this.$router.push({path:"/dashboard"}) 
            } else {
              throw new Error("Information provided is either incomplete or incorrect.")
            }
          } catch (error) {
            this.error = error.message
            this.clearInput();
          }
          
        },
        valid(authType) {
          if(authType === 'login') {
            if(this.username == '' || this.password == '') {
              return false
            } else {
              return true
            }
          } else {
            const regex = new RegExp("[a-z0-9]+@[a-z]+[.]{1}[a-z]{2,3}");
            if(regex.test(this.email) === false) {
              return false;
            }
            if(this.password == ''|| this.username == '') {
              return false
            } else {
              return true
            }
          }
        },
        logout() {
          this.clearInput();
          this.$store.dispatch('logout')
          this.$router.push({path:'/'})
        },
        clearInput() {
          this.username = ''
          this.email = ''
          this.password = ''
        }
    }
}
</script>

<style scoped>

  .topnav {
    overflow: hidden;
    background-color: #333;
  }
  .topnav a {
    float: left;
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
  }
  .topnav a:hover {
    background-color: #ddd;
    color: black;
    cursor: pointer;
  }

  .topnav a.active {
    background-color: var(--blue);
    color: white;
  }

  .topnav .icon {
    display: none;
  }

  @media screen and (max-width: 600px) {
    .topnav a:not(:first-child) {display: none;}
    .topnav a.icon {
      float: right;
      display: block;
    }
  }

  @media screen and (max-width: 600px) {
    .topnav.responsive {position: relative;}
    .topnav.responsive .icon {
      position: absolute;
      right: 0;
      top: 0;
    }
    .topnav.responsive a {
      float: none;
      display: block;
      text-align: left;
    }
  }

  .topnav-right {
    float: right;
  }
  .modal {
    display: none; 
    position: fixed; 
    z-index: 1; 
    padding-top: 100px; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; 
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4); 
    text-align: center;
  }

  /* Modal Content */
  .modal-content {
    background-color: white;
    margin: -10px auto ;
    padding: 20px;
    border: 10px solid var(--blue);
    width: 50%;
    border-radius: 20px;
  }

  /* The Close Button */
  .close {
    color: #aaaaaa;
    margin-left: 95%;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

  input {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 70%;
    margin: auto;
    border: 1px solid var(--blue);
    margin-top: 20px;
  }

  .switch-auth {
    color: var(--link);
    cursor: pointer;
  }

</style>