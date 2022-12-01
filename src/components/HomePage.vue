<template>
    <div>
        <div id="slider">
            <transition-group tag="div" :name="transitionName" class="slides-group">
                <div v-if="show" :key="current" class="slide" :class="slides[current].className">
                <h1>{{slides[current].title}}!</h1>
                </div>
            </transition-group>
            <div class="btn btn-prev" aria-label="Previous slide" @click="slide(-1)">
                &#10094;
            </div>
            <div class="btn btn-next" aria-label="Next slide" @click="slide(1)">
                &#10095;
            </div>
        </div> <br> <br>
      <div class="parent" style="width: 100%">
      <div style="padding: 0px 50px" class="child">
        <h3 id="feed-head">
          Facing any issue or <br />
          have have any suggestions for us?
        </h3>
        <h4 id="feed-sub-head">
          Please fill this form it will be a great help for us.
        </h4>
        <input
          type="text"
          v-model="first_name"
          placeholder="Your name.."
        />
        <input
          type="text"
          v-model="last_name"
          placeholder="Your last name.."
        />

        <br />
        <br />
        <textarea
          v-model="review"
          placeholder="Write something.."
        ></textarea>
        <br />
        <br />
        <button id="form-sub" class="dark-btn" @click="addReview">Submit</button>
        <br />
        <br />
      </div>
      <div class="child">
        <img
          src="../assets/images/influncer.webp"
          style="width: 80%;border-radius: 30px;"
          alt="cooking"
        />
      </div>
    </div> <br> <br>
    <div class="nav">
      <a href="/" class="logo">travel-junkie</a>
      
      <div class="nav-right">
        <img
          src="../assets/icons/Facebook.svg"
          style="margin-right: 10px"
          alt="cart"
        />
        <img src="../assets/icons/instagram.svg" alt="search" />
      </div>
      <br />
      <br />
      <br />
      <hr />
    </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name:'HomePage',
    data() {
        return {
            current: 0,
            direction: 1,
            transitionName: "fade",
            show: false,
            first_name:"",
            last_name:"",
            review:"",
            slides: [
            { className: "blue", title:"Hey welcome to travel-junkie" },
            { className: "red" ,title:"Explore all the places at one place"},
            { className: "yellow" ,title:"Tell the world your travel journey"}
            ]
        }
    },
    components:{
    },
  methods: {
    slide(dir) {
        this.direction = dir;
        dir === 1
            ? (this.transitionName = "slide-next")
            : (this.transitionName = "slide-prev");
        var len = this.slides.length;
        this.current = (this.current + dir % len + len) % len;
        },
    async addReview() {
      try {
        await axios.post("https://travel-junkie-back.onrender.com/api/review/add",{first_name:this.first_name,last_name:this.last_name,review:this.review})
        this.first_name = ''
        this.last_name =''
        this.review = ''
      } catch (error) {
        console.log(error);
      }

    }
    },
    mounted() {
        this.show = true;
    },
    
}
</script>

<style scoped>

h1 {
  color: white;
  font-size: 4rem;
}

input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 40%;
}
textarea {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 90%;
  height: 200px;
}

/* GO TO NEXT SLIDE */
.slide-next-enter-active,
.slide-next-leave-active {
  transition: transform 0.5s ease-in-out;
}
.slide-next-enter {
  transform: translate(100%);
}
.slide-next-leave-to {
  transform: translate(-100%);
}

/* GO TO PREVIOUS SLIDE */
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.5s ease-in-out;
}
.slide-prev-enter {
  transform: translate(-100%);
}
.slide-prev-leave-to {
  transform: translate(100%);
}

/* SLIDES CLASSES */

.blue {
  background: #4a69bd;
}

.red {
  background: #e55039;
}

.yellow {
  background: #f6b93b;
}

/* SLIDER STYLES */


#slider {
  width: 100%;
  height: 100vh;
  position: relative;
}

.slide {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  z-index: 10;
  cursor: pointer;
  border: 3px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  position: absolute;
  top: calc(50% - 35px);
  left: 1%;
  transition: transform 0.3s ease-in-out;
  user-select: none;
}

.btn-next {
  left: auto;
  right: 1%;
}

.btn:hover {
  transform: scale(1.1);
}

/* Contact us */
.parent {
  display: flex;
  height: 100%;
  width: 80%;
  margin: auto;
}
.child {
  width: 50%;
  height: 100%;
}

/* nav */
.nav {
    overflow: hidden;
    padding: 20px 10px;
    background-color: #4a69bd
}
.nav a {
    float: left;
    padding: 12px;
    text-decoration: none;
    font-size: 1rem; 
    line-height: 5px;
    font-weight: 100;
}
.nav a.logo {
    font-size: 1.5rem;
    font-weight: 900;
    margin-left: 5vw;
}

.nav-right {
    float: right;
    margin-right: 5vw;
}
hr {
  color: white;
  border: 2px solid white;
}
h3 {
  font-size: 1.5rem;
}
</style>
<style>
  .dark-btn {
    padding: 10px;
    color: white;
    background-color: #4a69bd;
    border-radius: 10px;
    border: 2px solid whitesmoke;
    cursor: pointer;
  }
  .dark-btn:hover {
    background-color: whitesmoke;
    border: 2px solid #4a69bd;
    color: #4a69bd;
  }
  .danger-btn {
    padding: 10px;
    color: white;
    background-color: red;
    border-radius: 10px;
    border: 2px solid whitesmoke;
    cursor: pointer;
  }
  .danger-btn:hover {
    background-color: whitesmoke;
    border: 2px solid red;
    color: red;
  }

</style>