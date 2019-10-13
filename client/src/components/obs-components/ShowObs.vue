<template>
  <div>
    <v-overlay v-if="isLoading ">
      <v-text-field color="success" loading disabled></v-text-field>
    </v-overlay>

    <div v-else-if="noObservationsEntered == false" class="grey darken-3 pt-5 pa-3">
      <div v-for="(obs) in observationsArr" :key="obs.id">
        <EditObs
          v-if="obs.isEditClicked ==true"
          :obs="obs"
          @cancelUpdate="cancelUpdate"
          @updateSuccessful="updateDone"
        ></EditObs>
        <v-card v-else max-width="600" class="mx-auto mt-10 grey darken-0">
          <v-menu bottom left>
            <template v-slot:activator="{ off }">
              <v-btn disabled color="white" text small>
                <v-icon left>mdi-clock</v-icon>
                {{new Date(obs.entryTime).toLocaleTimeString()}}
              </v-btn>
            </template>
            <v-time-picker format="24hr" use-seconds></v-time-picker>
          </v-menu>

          <v-btn text small color="white" @click="editClicked(obs.id)">Edit</v-btn>
          <DeleteObs :obsId="obs.id" @obsDeleted="obsDeleted"></DeleteObs>

          <v-divider></v-divider>
          <v-card class="d-flex justify-space-between grey darken-1" flat tile dark>
            <v-card-text>
              <v-select disabled :label="obs.effectName" dark></v-select>
            </v-card-text>
          </v-card>
          <v-card class="d-flex mt-n8 justify-space-between grey darken-1" flat tile dark>
            <v-card-text>
              <v-slider
                disabled
                class="pa-2"
                :value="obs.effectIntensity"
                :tick-labels="ticksLabels"
                :max="10"
                step="1"
                ticks="always"
                tick-size="0"
                label="Intensity"
              ></v-slider>
            </v-card-text>
          </v-card>
        </v-card>
      </div>
      <div v-if="noObservationsEntered == false">
        <v-card flat max-width="175" class="mx-auto mt-5 pt-2 pb-12 grey darken-3">
          <v-btn
            outlined
            width="100%"
            color="grey lighten-1"
            @click="finalizeSurvey"
          >Finalize Survey</v-btn>
          <h6 v-if="errors !== '' " class="red--text pa-5 text-center">{{errors[0]}}</h6>
        </v-card>
      </div>
    </div>
  </div>
</template>


<script>
import DeleteObs from "./DeleteObs";
import EditObs from "./EditObs";
import { getEffectById } from "../../SDK/effectsSDK";
const observationClient = require("../../SDK/observationSDK");
const effectClient = require("../../SDK/effectsSDK");

export default {
  props: ["account", "obsCreated"],
  components: { DeleteObs, EditObs },
  data() {
    return {
      componentKey: 0,
      observationsArr: [],
      ticksLabels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      surveyId: this.$route.query.surveyId,
      compoundId: this.$route.query.compoundId,
      isLoading: true,
      noObservationsEntered: false,
      errors: ""
    };
  },
  created() {
    //by survey Id
    observationClient.getObservationsBySurveyId(
      this.surveyId,
      (err, observations) => {
        if (err.length == 0) {
          //create an object for every observation so a new property of isEdit clicked can be added.
          for (var i = 0; i < observations.length; i++) {
            const observation = {
              id: "",
              surveyId: "",
              userId: "",
              compoundId: "",
              effectId: "",
              effectName: "",
              entryTime: "",
              effectIntensity: "",
              isEditClicked: false
            };
            observation.id = observations[i].id;
            observation.surveyId = observations[i].surveyId;
            observation.userId = observations[i].userId;
            observation.compoundId = observations[i].compoundId;
            observation.effectId = observations[i].effectId;
            observation.entryTime = observations[i].entryTime;
            observation.effectIntensity = observations[i].effectIntensity;
            this.observationsArr.push(observation);

            //get effect by id
            effectClient.getEffectById(observation.effectId, (err, effect) => {
              if (err.length == 0) {
                observation.effectName = effect[0].effectName;
                console.log(effect);
              } else {
                console.log(err);
              }
            });
          }
          console.log(this.observationsArr);

          if (this.observationsArr.length === 0) {
            this.noObservationsEntered = true;
          }
          this.isLoading = false;
        } else {
          this.errors = err;
        }
      }
    );
  },
  methods: {
    obsDeleted(value) {
      this.$emit("obsDeleted", value);
    },
    editClicked(el) {
      console.log(el);
      for (var i = 0; i < this.observationsArr.length; i++) {
        if (el == this.observationsArr[i].id) {
          this.observationsArr[i].isEditClicked = true;
        }
      }
    },
    cancelUpdate(el) {
      for (var i = 0; i < this.observationsArr.length; i++) {
        if (el == this.observationsArr[i].id) {
          this.observationsArr[i].isEditClicked = false;
        }
      }
    },
    updateDone(el) {
      const updateComplete = true;
      this.$emit("obsUpdated", updateComplete);
    },
    finalizeSurvey() {
      const finaliseIsClicked = true;
      this.$emit("finalise", finaliseIsClicked);
    }
  }
};
</script>