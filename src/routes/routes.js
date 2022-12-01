import HomePage from "../components/HomePage.vue";
import SearchPage from "../components/SearchPage.vue";
import DashBoard from "../components/DashBoard.vue";
import BlogCreation from "../components/BlogCreation.vue";
import ReadBlog from "../components/ReadBlog.vue";

export const routes = [
  { path: "/", component: HomePage },
  { path: "/explore", component: SearchPage },
  { path: "/dashboard", component: DashBoard },
  { path: "/create", component: BlogCreation },
  { path: "/explore/:id", component: ReadBlog },
];
