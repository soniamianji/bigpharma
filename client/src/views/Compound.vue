<template>
  <!-- App.vue -->

  <!-- Provides the application the proper gutter -->
  <v-container fluid dark class="grey darken-3 fill-height">
    <v-layout row class="mx-auto" mt-10>
      <v-flex xs4>
        <CompoundCard></CompoundCard>
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
import CompoundCard from "../components/CompoundCard";
const compoundClient = require("../SDK/compoundSDK");
const surveyClient = require("../SDK/surveySDK");
export default {
  components: { HeadPic, LineChart, CompoundCard },
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
