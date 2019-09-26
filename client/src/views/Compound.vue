<template>
  <!-- App.vue -->
  <v-app>
    <!-- Provides the application the proper gutter -->

    <v-card class="customNegMarg">
      <v-layout row class="mx-auto">
        <v-flex xs12>
          <div class="pa-12">
            <v-alert class="mx-auto text-center" width="600">
              <div class="title">{{compound.compoundName}}</div>
            </v-alert>
            <div v-if="isUserSignedIn === true">
              <v-btn text rounded color="teal" @click="contribute()">Contribute</v-btn>
            </div>
            <h6 v-if="errors !== '' " class="red--text pl-5">{{errors[0]}}</h6>
            <!-- WRITE YOUR CODE FOR SHOWING THE GRAPH HERE -->
            <canvas id="compoundChart"></canvas>
          </div>
        </v-flex>
      </v-layout>
    </v-card>
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
const compoundClient = require("../SDK/compoundSDK");
const surveyClient = require("../SDK/surveySDK");
export default {
  components: { HeadPic },
  props: ["account", "isUserSignedIn"],

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
    compoundClient.getCompoundById(this.id, (errors, compound) => {
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
    },
    contribute: function() {
      const userId = this.account.id;
      const surveyObj = {
        userId: userId.toString(),
        compoundId: this.id,
        createdAt: Date.parse(new Date())
      };
      console.log(surveyObj.createdAt);
      surveyClient.createSurvey(surveyObj, (error, id) => {
        if (error.length == 0) {
          const surveyId = id;
          const compoundId = surveyObj.compoundId;
          this.$router.push({
            path:
              "/observations?surveyId=" + surveyId + "&compoundId=" + compoundId
          });
        } else {
          this.errors = error;
        }
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