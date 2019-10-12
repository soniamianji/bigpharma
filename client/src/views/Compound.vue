<template>
  <!-- App.vue -->

  <!-- Provides the application the proper gutter -->
  <v-container fluid dark class="grey darken-3 fill-height">
    <v-layout row class="mx-auto" mt-10>
      <v-flex xs4>
        <v-card max-width="344" class="mx-auto" dark flat outlined>
          <v-list-item>
            <v-list-item-avatar color="grey" width="65" height="65" class="mt-3">
              <v-img
                class="elevation-1"
                src="https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/dihydrohydroxycodeinone/PNG"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">{{compound.compoundName}}</v-list-item-title>
              <v-list-item-subtitle>
                <span class="font-weight-thin">for</span>
                {{compound.indicationName}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-simple-table dark>
            <thead>
              <tr>
                <th class="text-left">Indication</th>
                <th class="text-left">Δ Intensity (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Headache</td>
                <td>-26%</td>
              </tr>
            </tbody>
          </v-simple-table>
          <v-divider></v-divider>
          <v-card-text>
            <p>Dataset is based on X surveys from Y subjects with a total of X datapoints.</p>
           <p> 1 side effect(s) reported.</p>
          </v-card-text>

          <v-card-actions>
            <v-btn text color block outlined class="grey darken-2">Participate</v-btn>
          </v-card-actions>
        </v-card>
        <template v-slot:actions>
          <div v-if="isUserSignedIn === true">
            <v-btn text outlined @click="contribute()">Participate</v-btn>
          </div>
          <h6 v-if="errors !== '' " class="red--text pl-5">{{errors[0]}}</h6>
        </template>
      </v-flex>
      <v-flex xs8>
        <LineChart :compoundId="id"></LineChart>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import "chartjs-plugin-colorschemes";
import HeadPic from "../components/HeadPic";
import LineChart from "../components/LineChart";
const compoundClient = require("../SDK/compoundSDK");
const surveyClient = require("../SDK/surveySDK");
export default {
  components: { HeadPic, LineChart },
  props: ["account", "isUserSignedIn"],
  data() {
    return {
      id: this.$route.params.id,
      compound: "",
      errors: ""
    };
  },
  created() {
    compoundClient.getCompoundById(this.id, (errors, compound) => {
      if (errors.length == 0) {
        this.compound = compound;
        console.log(compound);
      } else {
        this.errors = errors;
        console.log(errors);
      }
    });
  },
  methods: {
    contribute: function() {
      const userId = this.account.id;
      const surveyObj = {
        userId: userId,
        compoundId: Number(this.id),
        createdAt: Date.parse(new Date())
      };
      surveyClient.createSurvey(surveyObj, (error, id) => {
        if (error.length == 0) {
          const surveyId = id;
          const compoundId = surveyObj.compoundId;
          this.$router.push({
            path:
              "/observations?surveyId=" + surveyId + "&compoundId=" + compoundId
          });
        } else {
          this.errors = error;
        }
      });
    }
  }
};
</script>
<style scoped>
.tableWidth {
  width: 1000px;
}
</style>
