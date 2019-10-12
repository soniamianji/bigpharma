<template>
  <!-- App.vue -->

  <!-- Provides the application the proper gutter -->
  <v-container fluid dark class="grey darken-3 fill-height">
    <v-layout row class="mx-auto" mt-10>
      <v-flex xs4>
        <CompoundCard
          :account="account"
          :isUserSignedIn="isUserSignedIn"
          :compound="compound"
          :numberOfSurvyes="numberOfSurvyes"
          :numberOfParticipants="numberOfParticipants"
          :numberOfObservations="observationsToBeEvaluated.length"
        ></CompoundCard>
      </v-flex>
      <v-flex xs8>
        <LineChart :compoundId="id" :observations="observationsToBeEvaluated" :key="componentKey"></LineChart>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import "chartjs-plugin-colorschemes";
import HeadPic from "../components/HeadPic";
import LineChart from "../components/LineChart";
import CompoundCard from "../components/CompoundCard";
const compoundClient = require("../SDK/compoundSDK");
const surveyClient = require("../SDK/surveySDK");
const observationClient = require("../SDK/observationSDK");
export default {
  components: { HeadPic, LineChart, CompoundCard },
  props: ["account", "isUserSignedIn"],
  data() {
    return {
      id: this.$route.params.id,
      compound: "",
      errors: "",
      numberOfSurvyes: "",
      numberOfParticipants: "",
      observationsToBeEvaluated: "",
      componentKey: 0
    };
  },
  created() {
    //getting compoundinformation
    compoundClient.getCompoundById(this.id, (errors, compound) => {
      if (errors.length == 0) {
        this.compound = compound;
        console.log(compound);
      } else {
        this.errors = errors;
        console.log(errors);
      }
    });
    //get surveys based on status and compound id
    const status = 1; //completed
    const compoundId = this.id;
    surveyClient.getSurveysByCompoundIdAndStatus(
      compoundId,
      status,
      (err, surveys) => {
        if (err.length == 0) {
          this.numberOfSurvyes = surveys.length;
          let userIdsfromSurveys = [];
          for (var i = 0; i < surveys.length; i++) {
            userIdsfromSurveys.push(surveys[i].userId);
          }
          let participantArray = [...new Set(userIdsfromSurveys)];
          this.numberOfParticipants = participantArray.length;
          var obsArray = [];
          observationClient.getObservationsBySurveyIdAndCompoundId(
            surveys.surveyId,
            compoundId,
            (err, observations) => {
              if (err.length == 0) {
                this.observationsToBeEvaluated = observations;
                this.componentKey += 1;
              } else {
                this.errors = err;
              }
            }
          );
        } else {
          this.errors = err;
        }
      }
    );
  }
};
</script>
<style scoped>
.tableWidth {
  width: 1000px;
}
</style>
