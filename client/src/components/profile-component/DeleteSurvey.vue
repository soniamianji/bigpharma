<template>
  <v-btn right dark x-small text color="red" @click="deleteSurvey" class="mt-3">
    <v-icon left>{{ icons.mdiDelete }}</v-icon>
  </v-btn>
</template>

<script>
import { mdiAccount, mdiPencil, mdiDelete } from "@mdi/js";
const surveyClient = require("../../SDK/surveySDK");
export default {
  svgPath: mdiAccount,
  props: ["surveyId"],
  data() {
    return {
      icons: {
        mdiDelete
      }
    };
  },
  methods: {
    deleteSurvey() {
      surveyClient.deleteSurveyById(this.surveyId, err => {
        if (err.length == 0) {
          console.log("survey successfully deleted");
          this.$emit("surveyDeleted", this.surveyId);
        } else {
          console.log(err);
        }
      });
    }
  }
};
</script>