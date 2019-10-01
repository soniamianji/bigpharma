import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Chart from "chart.js";
import * as ss from "simple-statistics";
import lodash from "lodash";
import GAuth from "vue-google-oauth2";
const gauthOption = {
  clientId:
    "915574057626-gsaemb5fgstrn2fr3kf8h46r8oirmfau.apps.googleusercontent.com",
  scope: "profile email",
  prompt: "select_account"
};
Vue.use(GAuth, gauthOption);
Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  Chart,
  ss,
  lodash,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
