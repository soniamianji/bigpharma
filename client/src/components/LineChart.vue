<template>
  <div>
    <div v-if="msg == ''">
      <canvas id="lineChart"></canvas>
    </div>

    <div v-else>
      <div v-if="errors !== ''">{{errors}}</div>
      <p class="white--text text-center">{{msg}}</p>
    </div>
  </div>
</template>


<script>
const observationsClient = require("../SDK/observationSDK");
const effectClient = require("../SDK/effectsSDK");
const surveyClient = require("../SDK/surveySDK");
const chartFunction = require("../chartFunc");
import Chart from "chart.js";
import * as ss from "simple-statistics";
export default {
  props: ["compoundId", "observations"],
  data() {
    return {
      errors: "",
      msg: "",
      type: "line", // the type of chart
      data: {
        labels: [],
        datasets: []
      },
      effectNamesWithNoDups: "",
      returnedValues: ""
    };
  },
  created() {
    if (this.observations.length !== 0) {
      this.returnedValues = chartFunction.chartFunction(this.observations);
      //loop through the returned datasets
      this.returnedValues[1].forEach(element => {
        //get the effectName by effectId
        effectClient.getEffectById(element.effectId, (err, effect) => {
          if (err.length == 0) {
            element.label = effect[0].effectName;
            this.data.labels = this.returnedValues[0];
            this.data.datasets = this.returnedValues[1];
            this.$emit("avragedData", this.returnedValues[1]);
            this.createChart("lineChart");
          } else {
            this.errors = err;
          }
        });
      });
    } else {
      this.msg = "There is not enough data!";
    }
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
        options: {
          legend: {
            position: "right"
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  color: "rgba(255, 255, 255, 0.1)"
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  color: "rgba(255, 255, 255, 0.1)"
                },
                scaleLabel: {
                  display: true,
                  labelString: "Effect Intensity"
                }
              }
            ]
          }
        }
      });
    }
  }
};
</script>