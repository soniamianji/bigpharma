import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Chart from "chart.js";
import * as ss from "simple-statistics";
import lodash from "lodash";
// import the plugin
import VueGAPI from "vue-gapi";

// create the 'options' object
const apiConfig = {
  apiKey: "AIzaSyAeB69i2xvkGaxmDHp5QXbrxZDcxJ03XpY",
  clientId:
    "915574057626-gsaemb5fgstrn2fr3kf8h46r8oirmfau.apps.googleusercontent.com",
  discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  scope: "https://www.googleapis.com/auth/spreadsheets"
  // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
};

// Use the plugin and pass along the configuration
Vue.use(VueGAPI, apiConfig);
// const gauthOption = {
//   clientId:
//     "915574057626-gsaemb5fgstrn2fr3kf8h46r8oirmfau.apps.googleusercontent.com",
//   scope: "profile email",
//   prompt: "select_account"
// };
// Vue.use(GAuth, gauthOption);

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
