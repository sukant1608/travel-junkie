<template>
  <div>
    <div class="topnav" id="myTopnav">
        <a  href="/" class="active">travel-junkie</a>
        <a v-if="this.$store.state.isAuth" href="/dashboard" >Home</a>
        <a v-if="this.$store.state.isAuth" href="/create" >Write</a>
        <a href="/explore" >Search</a>
        <a href="javascript:void(0);" class="icon" v-on:click="myFunction">
            <i class="fa fa-bars"></i>
        </a>
        <div v-if="!this.$store.state.isAuth" class="topnav-right">
          <a v-on:click="showModal">Signup</a>
        </div>
        <div v-else class="topnav-right">
          <a>Hi {{this.$store.state.username}} !!</a>
          <a v-on:click="logout">Logout</a>
        </div>
    </div>
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span  v-on:click="hideModal" class="close">&times;</span>
        <div v-if="authSwitch">
          <h2>Signup</h2> 
          <input type="email" v-model="email" placeholder="Enter your email"> <br>
          <input v-model="username"  placeholder="Enter your username"> <br>
          <input type="password" v-model="password" placeholder="Enter your password"> <br> <br>
          <button class="dark-btn" style="width: 50%;" v-on:click="register">SUBMIT</button> <br> <br>
          <p v-on:click="switchAuth" >Already have an account?</p>
        </div>
        <div v-else>
          <h2>Login</h2> 
          <input v-model="username"  placeholder="Enter your username"> <br>
          <input v-model="password"  placeholder="Enter your password"> <br> <br>
          <button class="dark-btn" style="width: 50%;" v-on:click="login" >SUBMIT</button> <br> <br>
          <p v-on:click="switchAuth" >New to our site?</p>
        </div>
        <p v-if="error" style="color: red;">{{error}}</p>
      </div>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios'

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
        myFunction() {
            var x = document.getElementById("myTopnav");
            if (x.className === "topnav") {
                x.className += " responsive";
            } else {
                x.className = "topnav";
            }
        },
        showModal() {
          document.getElementById("myModal").style.display = 'block';
        },
        hideModal() {
          document.getElementById("myModal").style.display = 'none';
        },
        switchAuth() {
          this.email = ''
          this.password = ''
          this.username = ''
          this.authSwitch = !this.authSwitch
        },
        async login() {
          try {
            if(this.valid("login")) {
              const res =await axios.post("http://localhost:5000/api/auth/login",
            {username:this.username,password:this.password})
              this.$store.dispatch('authenticate',{username:res.data.username,id:res.data.id,password:res.data.password})
              this.hideModal();
              this.$router.push({path:"/dashboard"}) 
            } else {
              this.error = "Enter all the information required."
            }
          } catch (error) {
            this.error = error;
          }
        },
        async register() {
          try {
            if(this.valid("register")) {
              const res =await axios.post("http://localhost:5000/api/auth/register",
              {email:this.email,username:this.username,password:this.password})
              this.$store.dispatch('authenticate',{username:res.data.username,id:res.data.id})
              this.hideModal()
              this.$router.push({path:"/dashboard"}) 
            } else {
              this.error = "Enter all the information required."
            }
          } catch (error) {
            this.error = error
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
          this.$store.dispatch('logout')
          this.$router.push({path:'/'})
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
  color: #f2f2f2;
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
  background-color: #4a69bd;
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
  border: 10px solid #4a69bd;
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
  border: 1px solid #4a69bd;
  margin-top: 20px;
}

</style>