<template>
  <!-- App.vue -->
  <v-app>
    <!--START OF FORM -->
    <v-container fluid class="mt-12">
      <!--START of INPUTS -->
      <v-layout row class="mx-auto">
        <v-flex xs12>
          <div class="pa-12">
            <div class="mx-auto text-center" width="800">
              <div class="headline">Welcome Username</div>
              <div class="overline font-weight-ligh mt-0">
                You are evaluating
                <span class="font-weight-bold">{{compoundName}}</span> for
                <span class="font-weight-bold">{{indication}}</span>.
              </div>
              <div
                class="caption mt-4"
              >Begin by setting the intensity of the {{indication}} you are experience and press the "add observation"-button. If you at any time experience an increase or decrease of {{indication}} choose {{indication}} from the list of effects and adjust the intensity slider accordingly before you press the "add"-button again. If you experince any other effect, choose them from the list, adjust intensity and press the "add"-button.</div>
            </div>
          </div>
        </v-flex>
      </v-layout>
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
        <v-btn text small disabled>Edit</v-btn>
        <v-btn text small disabled>Delete</v-btn>

        <v-divider></v-divider>
        <v-card class="d-flex justify-space-between" flat tile>
          <v-card-text>
            <v-select :items="items" label="Effect"></v-select>
          </v-card-text>
        </v-card>
        <v-card class="d-flex justify-space-between mt-n8" flat tile>
          <v-card-text>
            <v-slider
              class="pa-2"
              v-model="fruits"
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
    </v-container>
    <!--END OF INPUTS -->
    <v-card max-width="300" class="mx-auto mt-5 mb-10">
      <v-btn width="100%" text>Add Observation</v-btn>
    </v-card>
    <v-divider></v-divider>
    <!--END OF FORM -->
    <!----------------------------->
    <!--START OF FORM -->
    <div class="grey darken-3">
      <!--START of INPUTS -->
      <v-container>
        <v-card max-width="600" class="mx-auto mt-10 grey darken-0">
          <v-menu bottom left>
            <template v-slot:activator="{ on }">
              <v-btn disabled color="white" text small v-on="on">
                <v-icon left>mdi-clock</v-icon>
                {{time}}
              </v-btn>
            </template>
            <v-time-picker v-model="time" format="24hr" use-seconds></v-time-picker>
          </v-menu>
          <v-btn text small color="white">Edit</v-btn>
          <v-btn text small color="white">Delete</v-btn>

          <v-divider></v-divider>
          <v-card class="d-flex justify-space-between grey darken-1" flat tile dark>
            <v-card-text>
              <v-select disabled :items="items" label="Headache" dark></v-select>
            </v-card-text>
          </v-card>
          <v-card class="d-flex justify-space-between mt-n8 grey darken-1" flat tile dark>
            <v-card-text>
              <v-slider
                disabled
                class="pa-2"
                v-model="fruits"
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
      </v-container>
      <v-card flat max-width="175" class="mx-auto mt-5 mb-10 grey darken-3">
        <v-btn outlined width="100%" color="grey lighten-1">Finalize Survey</v-btn>
      </v-card>
    </div>
    <!--END OF TIMELINE -->
  </v-app>
</template>


<script>
export default {
  props: ["account"],
  data() {
    return {
      compoundName: "Aspirine",
      indication: "headache",
      value: 0,
      fruits: 0,
      ticksLabels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      items: ["Headache", "Anxiety", "Gastro Intestinal Pain"],
      time: "00:00:00",
      surveyId: this.$route.query.surveyId,
      compoundId: this.$route.query.compoundId
    };
  }
};
</script>