<template>
  <!-- App.vue -->
  <v-app>
    <!-- Provides the application the proper gutter -->
    <v-container fluid dark class="grey darken-3">
      <v-sheet flat class="customNegMarg mt-12 grey darken-3">
        <v-layout row class="mx-auto">
          <v-banner class="headline font-weight-light" dark single-line width="100%">
            {{compound.compoundName}}
            <span class="font-weight-thin">for</span>
            {{compound.indicationName}}
            <template v-slot:actions>
              <div v-if="isUserSignedIn === true">
                <v-btn text outlined @click="contribute()">Participate</v-btn>
              </div>
              <h6 v-if="errors !== '' " class="red--text pl-5">{{errors[0]}}</h6>
            </template>
          </v-banner>
          <v-flex xs12>
            <div class="pa-12">
              <h6 v-if="errors !== '' " class="red--text pl-5">{{errors[0]}}</h6>
              <canvas id="compoundChart"></canvas>
            </div>
          </v-flex>
        </v-layout>
      </v-sheet>
    </v-container>
  </v-app>
</template>


<script>
import "chartjs-plugin-colorschemes";
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
        userId: userId,
        compoundId: this.id,
        createdAt: Date.parse(new Date())
      };
      console.log(surveyObj.userId);
      console.log(surveyObj.compoundId);
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
