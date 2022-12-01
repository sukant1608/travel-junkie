import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuth: false,
    username: "",
    id: "",
  },
  getters: {},
  mutations: {
    authenticate(state, payload) {
      state.isAuth = true;
      state.username = payload.username;
      state.id = payload.id;
    },
    logout(state) {
      state.isAuth = false;
      state.username = "";
      state.id = "";
    },
  },
  actions: {
    authenticate(context, payload) {
      window.localStorage.setItem("id", payload.id);
      window.localStorage.setItem("username", payload.username);
      context.commit({
        type: "authenticate",
        username: payload.username,
        id: payload.id,
      });
    },
    retrieveAuth(context) {
      context.commit({
        type: "authenticate",
        username: window.localStorage.getItem("username"),
        id: window.localStorage.getItem("id"),
      });
    },
    logout(context) {
      localStorage.clear();
      context.commit("logout");
    },
  },
  modules: {},
});
