<template>
  <v-app>
    <v-content>
      <v-layout row class="mx-auto">
        <v-flex xs12>
          <div class="pa-12">
            <div class="mx-auto text-center" width="800">
              <div class="headline">Welcome {{account.username}}</div>
              <div class="overline font-weight-ligh mt-0">
                You are evaluating
                <span class="font-weight-bold">{{compoundName}}</span> for
                <span class="font-weight-bold">{{indication}}</span>
              </div>
              <div
                class="caption mt-4"
              >Begin by setting the intensity of the {{indication}} you are experiencing and press the "add observation"-button. If you at any time experience an increase or decrease of {{indication}} choose {{indication}} from the list of effects and adjust the intensity slider accordingly before you press the "add"-button again. If you experince any other effect, choose them from the list, adjust intensity and press the "add"-button.</div>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <ObservationForm :account="account" @obsCretaed="newObscreated"></ObservationForm>
      <ShowObs
        :account="account"
        :obsCreated="obsCreated"
        :key="componentKey"
        @obsDeleted="obsDeleted"
        @obsUpdated="obsUpdated"
        @finalise="finaliseSurvey"
      ></ShowObs>
      <v-divider></v-divider>
    </v-content>
  </v-app>
</template>


<script>
import ObservationForm from "../components/obs-components/ObservationForm";
import ShowObs from "../components/obs-components/ShowObs";
const compoundClient = require("../SDK/compoundSDK");
const surveyClient = require("../SDK/surveySDK");
export default {
  props: ["account"],
  components: { ObservationForm, ShowObs },
  data() {
    return {
      componentKey: 0,
      compoundName: "",
      indication: "",
      surveyId: this.$route.query.surveyId,
      compoundId: this.$route.query.compoundId,
      obsCreated: ""
    };
  },
  created() {
    compoundClient.getCompoundById(this.compoundId, (err, compound) => {
      if (err.length == 0) {
        this.compoundName = compound.compoundName;
        this.indication = compound.indicationName;
      }
    });
  },
  methods: {
    newObscreated(value) {
      this.obsCreated = value;
      this.componentKey += 1;
    },
    obsDeleted(value) {
      this.componentKey += 1;
    },
    obsUpdated() {
      this.componentKey += 1;
    },
    finaliseSurvey() {
      surveyClient.updateSurveyById(this.surveyId, err => {
        if (err.length == 0) {
          console.log("successfully updated survey");
          this.$router.push({ path: "/compounds" });
        } else {
          console.log(err);
        }
      });
    }
  }
};
</script>