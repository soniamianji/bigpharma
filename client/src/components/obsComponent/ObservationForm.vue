<template>
  <v-container fluid class="mt-12">
    <!--START of INPUTS -->
    <v-card max-width="600" class="mx-auto mt-n3 grey lighten-4">
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn text small v-on="on">
            <v-icon left>mdi-clock</v-icon>
            {{time}}
          </v-btn>
        </template>
        <v-time-picker v-model="time" format="24hr" use-seconds></v-time-picker>
      </v-menu>

      <v-divider></v-divider>
      <v-card class="d-flex justify-space-between" flat tile>
        <v-card-text>
          <v-select
            :items="effects"
            item-text="effectName"
            item-value="id"
            v-model="selectedEffect"
            label="Effect"
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
    <v-card max-width="300" class="mx-auto mt-5 mb-10">
      <v-btn width="100%" @click="createObservation" text>Add Observation</v-btn>
    </v-card>
  </v-container>
</template>

<script>
const EffectClient = require("../../SDK/effectsSDK");
const ObservationClient = require("../../SDK/observationSDK");
export default {
  props: ["account"],
  data() {
    return {
      value: 0,
      intensity: 0,
      ticksLabels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      time: "",
      effects: "",
      selectedEffect: "",
      surveyId: this.$route.query.surveyId,
      compoundId: this.$route.query.compoundId,
      newObsCreated: false
    };
  },
  created() {
    EffectClient.getAllEffects((err, effects) => {
      const effectArr = [];
      if (err.length == 0) {
        this.effects = effects;
        console.log(this.effects);
      } else {
        console.log(err);
      }
    });
    this.showTime();
  },
  methods: {
    showTime() {
      const now = new Date();
      this.time = now.toLocaleTimeString();
      // now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
      return this.time;
    },
    createObservation() {
      //replace now time with the time user entered
      const mixdate = new Date();
      var toStr = mixdate.toString();
      const timeToBeConverted = toStr.replace(
        mixdate.toLocaleTimeString(),
        this.time
      );
      const formData = {
        surveyId: Number(this.surveyId),
        compoundId: Number(this.compoundId),
        userId: Number(this.account.id),
        entryTime: Date.parse(timeToBeConverted),
        effectId: this.selectedEffect,
        effectName: "",
        effectIntensity: this.intensity
      };
      console.log(formData);
      for (var i = 0; i < this.effects.length; i++) {
        if (this.selectedEffect === this.effects[i].id) {
          formData.effectName = this.effects[i].effectName;
        }
      }

      // once we have all these data we can create it
      ObservationClient.createObservation(formData, (err, id) => {
        if (err.length == 0) {
          console.log("success");
          this.newObsCreated = true;
          this.$emit("obsCretaed", this.newObsCreated);
        } else {
          console.log(err);
        }
      });
    }
  }
};
</script>