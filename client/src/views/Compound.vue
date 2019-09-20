<template>
  <!-- App.vue -->
  <v-app>
    <!-- Provides the application the proper gutter -->
    <v-layout row class="mx-auto mt-10">
      <v-flex xs12>
        <div class="pa-12">
          <div class="mx-auto text-center" width="800">
            <div class="headline">{{compound.compoundName}}</div>
            <div
              class="overline font-weight-ligh mt-0"
            >Data have been compiled from dataset of over x surveys with above y datapoints.</div>
          </div>
        </div>
      </v-flex>
    </v-layout>
    <v-container fluid class="mt-n5">
      <!-- WRITE YOUR CODE FOR SHOWING THE GRAPH HERE -->
      <canvas id="compoundChart" class></canvas>
    </v-container>
  </v-app>
</template>


<script>
import HeadPic from "../components/HeadPic";
import Chart from "chart.js";
import chartData from "../chart-data.js";

export default {
  components: { HeadPic },

  data() {
    return {
      id: this.$route.params.id,
      compound: "",
      errors: "",
      chartData: chartData
    };
  },
  mounted() {
    this.createChart("compoundChart", this.chartData);
  },
  created() {
    const client = require("../SDK/compoundSDK");

    client.getCompoundById(this.id, (errors, compound) => {
      if (errors.length == 0) {
        this.compound = compound;
        console.log(compound);
      } else {
        this.errors = errors;
        console.log(errors);
      }
    });
  },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    }
  }
};
</script>
<style scoped>
.tableWidth {
  width: 400px;
}
</style>