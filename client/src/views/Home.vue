<template>
  <!-- App.vue -->
  <v-app>
    <HeadPic></HeadPic>
    <!-- Provides the application the proper gutter -->
    <v-container fluid>
      <div class="customNegMarg">
        <v-layout row wrap>
          <v-flex xs12 md4>
            <div class="mr-3 ml-3 mt-3">
              <v-card class="mx-auto text-center" height="280">
                <v-icon x-large class="mt-12 mb-8" color="blue lighten-1">mdi-rhombus-split</v-icon>
                <div class="headline font-weight-light">COLLECT</div>
                <div
                  class="font-weight-light mt-3 ml-3 mr-3"
                >Create surveys for specific compounds targeting specific sets of indications. Collect the anectdotal data of the trial subjects.</div>
              </v-card>
            </div>
          </v-flex>
          <v-flex xs12 md4>
            <div class="mr-3 ml-3 mt-3">
              <v-card class="mx-auto text-center p-12" height="280">
                <v-icon x-large class="mt-12 mb-8" color="purple lighten-2">mdi-hexagon-multiple</v-icon>
                <div class="headline font-weight-light">CURATE</div>
                <div
                  class="font-weight-light mt-3 ml-3 mr-3"
                >Each participating subjects experience is by design quantified into discrete computable data sets for your conviniece.</div>
              </v-card>
            </div>
          </v-flex>
          <v-flex xs12 md4>
            <div class="mr-3 ml-3 mt-3">
              <v-card class="mx-auto text-center" height="280">
                <v-icon x-large class="mt-12 mb-8" color="green lighten-2">mdi-chart-bell-curve</v-icon>
                <div class="headline font-weight-light">ANALYZE</div>
                <div
                  class="font-weight-light mt-3 ml-3 mr-3"
                >The collected data sets from the survey is plotted over a chart, providing oversight, improving analysis of compound efficacy.</div>
              </v-card>
            </div>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import HeadPic from "../components/HeadPic";

export default {
  components: { HeadPic },
  data() {
    return {
      allAccounts: [],
      errors: ""
    };
  }
};
</script>
<style >
.customNegMarg {
  margin: -120px 30px 0px;
}
</style>