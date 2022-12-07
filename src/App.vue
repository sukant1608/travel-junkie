<template>
  <div id="app">
    <NavBar/>
    <router-view> </router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
export default {
  name: 'App',
  components:{
    NavBar
  },
  created() {
    if(localStorage.getItem("username") !== null) {
      this.$store.dispatch('retrieveAuth')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
body {
  margin: 0;
}
</style>


<!-- https://travel-junkie.onrender.com -->