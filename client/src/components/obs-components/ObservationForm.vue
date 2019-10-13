<template>
  <v-container fluid>
    <!--START of INPUTS -->
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card max-width="600" class="mx-auto grey lighten-4">
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
              :rules="effectRules"
              required
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
      <h6
        v-if="errors !== '' && this.valid == false "
        class="red--text text-center mt-3"
      >{{errors[0]}}</h6>

      <!--END OF INPUTS -->
      <v-card max-width="300" class="mx-auto mt-3 mb-10">
        <v-btn width="100%" @click="createObservation" text :disabled="!valid">Add Observation</v-btn>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
const EffectClient = require("../../SDK/effectsSDK");
const ObservationClient = require("../../SDK/observationSDK");

export default {
  props: ["account", "compoundIndiciation"],
  data() {
    return {
      valid: true,
      value: 0,
      intensity: 0,
      ticksLabels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      time: "",
      effects: [],
      selectedEffect: "",
      effectRules: [v => !!v || "effect is required"],
      surveyId: this.$route.query.surveyId,
      compoundId: this.$route.query.compoundId,
      indication: "",
      newObsCreated: false,
      errors: ""
    };
  },
  created() {
    EffectClient.getAllEffects((err, effects) => {
      const effectArr = [];
      if (err.length == 0) {
        this.effects = effects;
        console.log(this.effects);
        for (var i = 0; i < effects.length; i++) {
          if (this.compoundIndiciation == effects[i].effectName) {
            this.selectedEffect = effects[i].id;
            this.indication = effects[i].id;
          }
        }
      } else {
        this.errors = err;
      }
    });

    let updateTime = setInterval(this.showTime, 1000);
  },

  destroyed() {
    clearInterval(this.updateTime);
  },
  methods: {
    showTime() {
      // var d = new Date();
      // d.setHours(0, 0, 0, 0);
      // this.time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

      // console.log(this.time);

      const now = new Date();
      // this.time = now.toLocaleTimeString();
      this.time =
        now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

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
      // the object with the observation data to be inserted
      const formData = {
        surveyId: Number(this.surveyId),
        compoundId: Number(this.compoundId),
        userId: Number(this.account.id),
        entryTime: Date.parse(timeToBeConverted),
        effectId: this.selectedEffect,
        effectName: "",
        effectIntensity: this.intensity
      };

      //get the effectTime according to the effect Id
      for (var i = 0; i < this.effects.length; i++) {
        if (this.selectedEffect === this.effects[i].id) {
          formData.effectName = this.effects[i].effectName;
        }
      }

      // once we have all these data we can create it
      ObservationClient.createObservation(formData, (err, id) => {
        if (err.length == 0) {
          this.newObsCreated = true;
          this.intensity = 0;
          // this.selectedEffect = this.indication;
          this.$emit("obsCretaed", this.newObsCreated);
        } else {
          this.errors = err;
          this.valid = false;
          console.log(err);
        }
      });
    }
  }
};
</script>