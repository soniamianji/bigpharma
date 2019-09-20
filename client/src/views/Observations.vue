<template>
  <!-- App.vue -->
  <v-app>
    <!--START OF FORM -->
    <v-container fluid class="mt-12">
      <!--START of INPUTS -->
      <v-card max-width="600" class="mx-auto mt-10">
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
      <v-btn width="100%" text color>New Observation</v-btn>
    </v-card>
    <v-divider></v-divider>
    <!--END OF FORM -->
    <!----------------------------->
    <!--START OF FORM -->
    <div class="grey lighten-2">
      <!--START of INPUTS -->
      <v-container>
        <v-card flat max-width="600" class="mx-auto mt-10">
          <v-menu bottom left>
            <template v-slot:activator="{ on }">
              <v-btn disabled text small v-on="on">
                <v-icon left>mdi-clock</v-icon>
                {{time}}
              </v-btn>
            </template>
            <v-time-picker v-model="time" format="24hr" use-seconds></v-time-picker>
          </v-menu>
          <v-btn text small>Edit</v-btn>
          <v-btn text small>Delete</v-btn>

          <v-divider></v-divider>
          <v-card class="d-flex justify-space-between" flat tile>
            <v-card-text>
              <v-select disabled :items="items" label="Headache"></v-select>
            </v-card-text>
          </v-card>
          <v-card class="d-flex justify-space-between mt-n8" flat tile>
            <v-card-text>
              <v-slider
                disabled
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
      <v-card max-width="175" class="mx-auto mt-2 mb-10">
        <v-btn width="100%" text color>Finalize Survey</v-btn>
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