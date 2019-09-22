<template>
  <v-card width="600" class="mx-auto mt-5 mb-5">
    <v-card-title>
      <h6>The list of surveys that you have contributed so far</h6>
    </v-card-title>
    <v-card-text>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Survey id</th>
              <th class="text-left">Compounds</th>
              <th class="text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in compoundArr" :key="item.compound_id  ">
              <router-link
                :to="'/observations?surveyId=' + item.surveyId + '&compoundId=' + item.compound_id"
              >
                <td>{{ item.surveyId }}</td>
                <td>{{ item.name }}</td>
                <td v-if="item.status === 0">Not completed</td>
                <td v-else>completed</td>
              </router-link>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
const client = require("../../SDK/surveySDK");
const clientCompound = require("../../SDK/compoundSDK");
export default {
  data() {
    return {
      surveys: "",
      compoundArr: [],
      id: this.$route.params.id
    };
  },
  created() {
    const userId = this.id;
    client.getSurveyByUserId(userId, (err, surveys) => {
      if (err.length == 0) {
        this.surveys = surveys;
        for (var i = 0; i < surveys.length; i++) {
          const compoundId = surveys[i].compoundId;
          const surveyId = surveys[i].id;
          const status = surveys[i].completed;
          clientCompound.getCompoundById(compoundId, (err, compound) => {
            if (err.length == 0) {
              const newCompound = {
                compound_id: compoundId,
                name: compound.compoundName,
                surveyId: surveyId,
                status: status
              };
              this.compoundArr.push(newCompound);
            } else {
              console.log(err);
            }
          });
        }
      } else {
        console.log(err);
      }
    });
    console.log(this.compoundArr);
  }
};
</script>