<template>
  <canvas id="lineChart"></canvas>
</template>


<script>
const observationsClient = require("../SDK/observationSDK");
const chartFunction = require("../chartFunc");
import Chart from "chart.js";
import * as ss from "simple-statistics";
import lodash from "lodash";
export default {
  props: ["compoundId"],
  data() {
    return {
      errors: "",
      type: "line", // the type of chart
      data: {
        labels: [],
        datasets: [],
        options: {}
      },
      observations: [],
      effectNamesWithNoDups: ""
    };
  },
  mounted() {
    this.createChart("lineChart");
  },
  created() {
    const compoundid = this.compoundId;

    //get observations by compoundId
    observationsClient.getObservationsByCompoundId(
      compoundid,
      (err, observations) => {
        if (err.length == 0) {
          this.observations = observations;
          // var returnedValues =
          // chartFunction.chartFunction(observations);
          // console.log(returnedValues);
          // returnedValues[0] = this.data.labels;
          // returnedValues[1] = this.data.datasets;
        } else {
          this.errors = err;
        }
      }
    );
  },
  methods: {
    createChart() {
      const ctx = document.getElementById("lineChart");
      const chart = new Chart(ctx, {
        type: this.type,
        // The data for our dataset
        data: {
          labels: this.data.labels,
          datasets: this.data.datasets
        },
        options: this.options
      });
    }
  }
};
</script>