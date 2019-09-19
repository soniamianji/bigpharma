import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import SignUp from "./views/SignUp.vue";
import Compounds from "./views/Compounds.vue";
import Compound from "./views/Compound.vue";
import Observations from "./views/Observations.vue";
import Profile from "./views/Profile.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp
    },

    {
      path: "/profile/:id",
      name: "Profile",
      component: Profile,
      props: true
    },
    {
      path: "/compounds",
      name: "compounds",
      component: Compounds,
      props: true
    },
    {
      path: "/compounds/:id",
      name: "compound",
      component: Compound,
      props: true
    },
    {
      path: "/observations",
      name: "observations",
      component: Observations,
      props: true
    }
  ]
});
