<template>
  <canvas id="lineChart"></canvas>
</template>


<script>
const observationsClient = require("../SDK/observationSDK");
const effectClient = require("../SDK/effectsSDK");
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
      effectNamesWithNoDups: "",
      returnedValues: ""
    };
  },
  created() {
    console.log("created");
    const compoundid = this.compoundId;

    //get observations by compoundId
    observationsClient.getObservationsByCompoundId(
      compoundid,
      (err, observations) => {
        if (err.length == 0) {
          this.observations = observations;
          this.returnedValues = chartFunction.chartFunction(observations);
          console.log(this.returnedValues);

          console.log(this.returnedValues[1][0]);
          //loop through the returned datasets
          this.returnedValues[1].forEach(element => {
            //get the effectName by effectId
            effectClient.getEffectById(element.effectId, (err, effect) => {
              if (err.length == 0) {
                element.label = effect[0].effectName;
                this.data.labels = this.returnedValues[0];
                this.data.datasets = this.returnedValues[1];
                this.createChart("lineChart");
              } else {
                console.log(err);
              }
            });
          });
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