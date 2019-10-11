<template>
  <v-container fluid class="mt-12">
    <!--START of INPUTS -->
    <v-card max-width="600" class="mx-auto mt-n3 grey lighten-4">
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn text small v-on="on">
            <v-icon left>mdi-clock</v-icon>
            {{ time}}
          </v-btn>
        </template>
        <v-time-picker
          v-model="time"
          :value=" new Date(obs.entryTime).toLocaleTimeString()"
          format="24hr"
          use-seconds
        ></v-time-picker>
      </v-menu>

      <v-divider></v-divider>
      <v-card class="d-flex justify-space-between" flat tile>
        <v-card-text>
          <v-select
            :items="effects"
            item-text="effectName"
            item-value="id"
            v-model="selectedEffect"
            label="Effects"
          ></v-select>
        </v-card-text>
      </v-card>
      <v-card class="d-flex justify-space-between mt-n8" flat tile>
        <v-card-text>
          <v-slider
            class="pa-2"
            v-model="intensity"
            :tick-labels="ticksLabels"
            :max="10"
            step="1"
            ticks="always"
            tick-size="4"
            label="Intensity"
          ></v-slider>
        </v-card-text>
      </v-card>
    </v-card>

    <!--END OF INPUTS -->

    <v-card max-width="300" class="mx-auto mt-5">
      <v-btn width="100%" @click="updateObs">Update Observation</v-btn>
    </v-card>
    <v-card max-width="300" class="mx-auto mt-2 mb-10" color="gray">
      <v-btn width="100%" @click="cancelObs">Cancel</v-btn>
    </v-card>

    <h6 v-if="errors !== '' " class="red--text text-center">{{errors[0]}}</h6>
  </v-container>
</template>

<script>
const EffectClient = require("../../SDK/effectsSDK");
const ObservationClient = require("../../SDK/observationSDK");
export default {
  props: ["obs"],
  data() {
    return {
      value: 0,
      intensity: "",
      ticksLabels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      time: "",
      effects: [],
      selectedEffect: ""
    };
  },
  created() {
    this.errors = "";
    EffectClient.getAllEffects((err, effects) => {
      const effectArr = [];
      if (err.length == 0) {
        this.effects = effects;
        console.log(this.effects);
      } else {
        this.errors = err;
      }
    });
    this.intensity = this.obs.effectIntensity;
    this.time = new Date(this.obs.entryTime).toLocaleTimeString();
    this.selectedEffect = this.obs.effectId;
  },
  methods: {
    updateObs() {
      //convert the time to timeunix
      const mixdate = new Date();
      var toStr = mixdate.toString();
      const timeToBeConverted = toStr.replace(
        mixdate.toLocaleTimeString(),
        this.time
      );

      //object to be appended to request
      const updatedObs = {
        entryTime: Date.parse(timeToBeConverted),
        effectName: "",
        effectId: this.selectedEffect,
        effectIntensity: this.intensity
      };

      //fetching the effectName according the id
      for (var i = 0; i < this.effects.length; i++) {
        if (this.selectedEffect === this.effects[i].id) {
          updatedObs.effectName = this.effects[i].effectName;
        }
      }

      //finally updating the obs
      this.errors = "";
      ObservationClient.updateObservationById(this.obs.id, updatedObs, err => {
        if (err.length == 0) {
          this.$emit("updateSuccessful", this.obs.id);
        } else {
          this.errors = err;
        }
      });
    },
    cancelObs() {
      const cancelUpdate = this.obs.id;
      this.$emit("cancelUpdate", cancelUpdate);
    }
  }
};
</script>


  

