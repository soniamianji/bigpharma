import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import SignUp from "./views/SignUp.vue";
import Compounds from "./views/Compounds.vue";
import Compound from "./views/Compound.vue";
import Observations from "./views/Observations.vue";

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
      path: "/compounds",
      name: "compounds",
      component: Compounds
    },
    {
      path: "/compounds/:id",
      name: "compound",
      component: Compound
    },
    {
      path: "/observations",
      name: "observations",
      component: Observations
    }
  ]
});
