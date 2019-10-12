<template>
  <div>
    <div v-if="msg == ''">
      <canvas id="lineChart"></canvas>
    </div>
    <div v-else>
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
import lodash from "lodash";
export default {
  props: ["compoundId"],
  data() {
    return {
      errors: "",
      msg: "",
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
    const compoundid = this.compoundId;
    //1 represnts true and 0 represents false in db
    const status = 1;
    //getting the surveys by compoundId and status of completion so we can only use the observations that are completed
    surveyClient.getSurveyByCompoundIdAndStatus(
      compoundid,
      status,
      (err, survey) => {
        if (err.length == 0) {
          console.log(survey);
          survey.forEach(element => {
            observationsClient.getObservationsBySurveyIdAndCompoundId(
              element.surveyId,
              element.compoundId,
              (err, observations) => {
                if (err.length == 0) {
                  this.observations = observations;
                  if (observations.length == 0) {
                    this.msg =
                      "There are no data available for the graph to be created. Would you like to participate? ";
                  } else {
                    this.returnedValues = chartFunction.chartFunction(
                      observations
                    );

                    console.log(this.returnedValues[1][0]);
                    //loop through the returned datasets
                    this.returnedValues[1].forEach(element => {
                      //get the effectName by effectId
                      effectClient.getEffectById(
                        element.effectId,
                        (err, effect) => {
                          if (err.length == 0) {
                            element.label = effect[0].effectName;
                            this.data.labels = this.returnedValues[0];
                            this.data.datasets = this.returnedValues[1];
                            this.createChart("lineChart");
                          } else {
                            console.log(err);
                          }
                        }
                      );
                    });
                  }
                } else {
                  this.errors = err;
                }
              }
            );
          });
        } else {
          console.log(err);
        }
      }
    );
    //get observations by compoundId
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