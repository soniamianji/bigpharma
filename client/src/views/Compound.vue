<template>
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
          :sideEffects="sideEffects"
          :deltaIndication="deltaIndication"
          :key="componentKey"
        ></CompoundCard>
      </v-flex>
      <v-flex xs8>
        <LineChart
          :compoundId="id"
          :observations="observationsToBeEvaluated"
          :key="componentKey"
          @avragedData="avgData"
        ></LineChart>
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
const effectClient = require("../SDK/effectsSDK");
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
      componentKey: 0,
      sideEffects: "",
      indicationsId: "",
      deltaIndication: "",
      componentKey: 0
    };
  },
  created() {
    //getting compoundinformation
    compoundClient.getCompoundById(this.id, (errors, compound) => {
      if (errors.length == 0) {
        this.compound = compound;
        this.componentKey += 1;
      } else {
        this.errors = errors;
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
          console.log(surveys);
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
                //get the effects to figure
                effectClient.getAllEffects((err, effects) => {
                  if (err.length == 0) {
                    let sideEffectNames = [];
                    for (var i = 0; i < effects.length; i++) {
                      if (
                        effects[i].effectName == this.compound.indicationName
                      ) {
                        this.indicationId = effects[i].id;
                      }
                    }
                    for (var i = 0; i < observations.length; i++) {
                      if (observations[i].effectId !== this.indicationId) {
                        sideEffectNames.push(observations[i].effectId);
                      }
                    }
                    this.sideEffects = [...new Set(sideEffectNames)];
                  }
                });
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
  },
  methods: {
    //get the data from lineChart component once the chart has recieved the data
    avgData(value) {
      //evaluating the efficacy of the compound
      console.log(value);
      //first entered intenisty point of the indication
      var iAlpha = "";
      //last entered intensity point of the indication
      var iOmega = "";
      for (var i = 0; i < value.length; i++) {
        if (value[i].label == this.compound.indicationName) {
          iAlpha = value[i].data[0];
          iOmega = value[i].data[value[i].data.length - 1];
        }
      }
      //calculate percentage
      var percentage = (((iAlpha - iOmega) / iAlpha) * 100).toFixed(2);
      var parcedPercentage = parseFloat(percentage);

      //find the + or -
      if (iAlpha > iOmega) {
        console.log("iAlpha > iOmega");
        var deltaIntensity = -Math.abs(parcedPercentage);
        this.deltaIndication = deltaIntensity;
        console.log(deltaIntensity);
      } else {
        console.log("iAlpha < iOmega");
        var deltaIntensity = Math.abs(parcedPercentage);
        this.deltaIndication = deltaIntensity;
        console.log(deltaIntensity);
      }
    }
  }
};
</script>
<style scoped>
.tableWidth {
  width: 1000px;
}
</style>
