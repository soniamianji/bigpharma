<template>
  <v-app>
    <div class="grey darken-3">
      <!--START of INPUTS -->

      <v-card
        v-for="(obs) in observations"
        :key="obs.id"
        max-width="600"
        class="mx-auto mt-10 grey darken-0"
      >
        <v-menu bottom left>
          <template v-slot:activator="{ off }">
            <v-btn disabled color="white" text small>
              <v-icon left>mdi-clock</v-icon>
              {{new Date(obs.entryTime).toLocaleTimeString()}}
            </v-btn>
          </template>
          <v-time-picker format="24hr" use-seconds></v-time-picker>
        </v-menu>
        <v-btn text small color="white">Edit</v-btn>
        <DeleteObs :obsId="obs.id" @obsDeleted="obsDeleted"></DeleteObs>

        <v-divider></v-divider>
        <v-card class="d-flex justify-space-between grey darken-1" flat tile dark>
          <v-card-text>
            <v-select disabled :label="obs.effectName" dark></v-select>
          </v-card-text>
        </v-card>
        <v-card class="d-flex justify-space-between grey darken-1" flat tile dark>
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

      <v-card flat max-width="175" class="mx-auto mt-5 mb-10 grey darken-3">
        <v-btn outlined width="100%" color="grey lighten-1">Finalize Survey</v-btn>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import DeleteObs from "./DeleteObs";
const observationClient = require("../../SDK/observationSDK");
export default {
  props: ["account", "obsCreated"],
  components: { DeleteObs },
  data() {
    return {
      componentKey: 0,
      observations: "",
      ticksLabels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      surveyId: this.$route.query.surveyId,
      compoundId: this.$route.query.compoundId
    };
  },
  created() {
    const userId = this.account.id;
    const compoundId = this.compoundId;
    observationClient.getObservationsByUserIdAndCompoundId(
      userId,
      compoundId,
      (err, observations) => {
        if (err.length == 0) {
          this.observations = observations;
        } else {
          console.log(err);
        }
      }
    );
  },
  methods: {
    obsDeleted(value) {
      this.$emit("obsDeleted", value);
    }
  }
};
</script>