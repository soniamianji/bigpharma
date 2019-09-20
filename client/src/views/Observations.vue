<template>
  <!-- App.vue -->
  <v-app>
    <!--START OF FORM -->
    <v-container fluid class="mt-12">
      <!--START of INPUTS -->
      <v-card max-width="600" class="mx-auto mt-10">
        <div class="text-center">
          <v-btn text small>
            <v-icon left>mdi-clock</v-icon>00:00:00
          </v-btn>
        </div>
        <v-divider></v-divider>
        <v-card class="d-flex justify-space-between" flat tile>
          <v-card-text>
            <v-select :items="items" label="Choose an effect"></v-select>
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
    <v-btn text color>add new entry</v-btn>
    <v-divider></v-divider>
    <!--END OF FORM -->
    <!--START OF TIMELINE -->
    <v-container fluid class="mt-0" style="max-width: 600px;"></v-container>
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
      dropdown_font: ["Arial", "Calibri", "Courier", "Verdana"],
      items: ["Headache", "Anxiety", "Gastro Intestinal Pain"]
    };
  }
};
</script>