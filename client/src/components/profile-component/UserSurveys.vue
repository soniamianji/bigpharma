<template>
  <v-card width="600" class="mx-auto mt-5 mb-5">
    <v-card-title>
      <h6>The list of surveys that you have contributed so far</h6>
    </v-card-title>
    <h6 v-if="errors !== '' " class="red--text pl-5">{{errors[0]}}</h6>
    <v-card-text v-if="msg !== '' ">{{msg}}</v-card-text>
    <v-card-text v-else>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Survey id</th>
              <th class="text-left">Compounds</th>
              <th class="text-left">Created at</th>
              <th class="text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in compoundArr" :key="item.index">
              <td>{{ item.surveyId }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.createdAt }}</td>
              <td class="pt-2" v-if="item.status === 0">
                <router-link
                  class="customColor"
                  :to="'/observations?surveyId=' + item.surveyId + '&compoundId=' + item.compound_id"
                >Not completed</router-link>
              </td>
              <td class="pt-2" v-else>completed</td>
              <DeleteSurvey :surveyId="item.surveyId" @surveyDeleted="deletedSurvey"></DeleteSurvey>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
import DeleteSurvey from "./DeleteSurvey";
const client = require("../../SDK/surveySDK");
const clientCompound = require("../../SDK/compoundSDK");
export default {
  components: { DeleteSurvey },
  props: ["accountId"],
  data() {
    return {
      surveys: "",
      compoundArr: [],
      msg: "",
      errors: ""
    };
  },
  created() {
    //get surveys by user id
    client.getSurveyByUserId(this.accountId, (err, surveys) => {
      if (err.length == 0) {
        if (surveys.length == 0) {
          //display the msgs if no surveys found
          this.msg =
            "You have not contributed to any survyes yet! Please check out the compounds page!";
        }
        this.surveys = surveys;
        for (var i = 0; i < surveys.length; i++) {
          const compoundId = surveys[i].compoundId;
          const surveyId = surveys[i].id;
          const createdAt = new Date(surveys[i].createdAt);
          const status = surveys[i].completed;
          //find the compound names according to their id's
          clientCompound.getCompoundById(compoundId, (err, compound) => {
            if (err.length == 0) {
              //create an obj for each survey
              const newCompound = {
                compound_id: compoundId,
                name: compound.compoundName,
                createdAt: createdAt.toDateString(),
                surveyId: surveyId,
                status: status
              };
              this.compoundArr.push(newCompound);
            } else {
              this.errors = err;
            }
          });
        }
      } else {
        this.errors = err;
      }
    });
  },
  methods: {
    deletedSurvey(value) {
      this.$emit("surveyDeleted", value);
    }
  }
};
</script>