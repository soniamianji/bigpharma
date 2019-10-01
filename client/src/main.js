import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Chart from "chart.js";
import * as ss from "simple-statistics";
import lodash from "lodash";

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
