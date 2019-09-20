<template>
  <!-- App.vue -->
  <v-app>
    <!-- Provides the application the proper gutter -->
    <v-container fluid class="mt-12">
      <v-card>
        <v-layout row class="mx-auto">
          <v-flex xs12>
            <div class="pa-12">
              <v-alert class="mx-auto text-center" width="600">
                <div class="title">Lorem Ipsum</div>
                <div>Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Duis vel nibh at velit scelerisque suscipit. Praesent blandit laoreet nibh. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros.</div>
              </v-alert>
              <v-card max-width="600" class="mx-auto">
                <v-toolbar dark>
                  <v-app-bar-nav-icon></v-app-bar-nav-icon>

                  <v-toolbar-title>Compounds</v-toolbar-title>

                  <div class="flex-grow-1"></div>

                  <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn>

                  <v-btn icon>
                    <v-icon>mdi-view-module</v-icon>
                  </v-btn>
                </v-toolbar>

                <v-list two-line subheader>
                  <v-list-item v-for="item in compounds" :key="item.id">
                    <v-list-item-content>
                      <router-link :to="'/compounds/' + item.id" class="customColor">
                        <v-list-item-title v-text="item.compoundName" class="customColor"></v-list-item-title>
                      </router-link>
                      <v-list-item-subtitle v-text="item.indicationName"></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action v-if="isUserSignedIn === true">
                      <v-btn text rounded color="teal" @click="createSurvey(item.id)">Contribute</v-btn>
                    </v-list-item-action>
                  </v-list-item>

                  <v-divider inset></v-divider>
                </v-list>
              </v-card>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </v-app>
</template>


<script>
import HeadPic from "../components/HeadPic";
const compound = require("../SDK/compoundSDK");
const survey = require("../SDK/surveySDK");
export default {
  props: ["account", "isUserSignedIn"],
  components: { HeadPic },
  data() {
    return {
      compounds: [],
      errors: ""
    };
  },
  created() {
    compound.getAllCompounds((errors, compounds) => {
      if (errors.length == 0) {
        this.compounds = compounds;
        console.log(compounds);
      } else {
        this.errors = errors;
        console.log(errors);
      }
    });
  },
  methods: {
    createSurvey(compoundId) {
      const surveyObj = {
        userId: this.account.id,
        compoundId: compoundId
      };
      console.log(surveyObj);

      survey.createSurvey(surveyObj, (error, id) => {
        if (error.length == 0) {
          const surveyId = id;
          const compoundId = surveyObj.compoundId;
          console.log(compoundId);
          this.$router.push({
            path:
              "/observations?surveyId=" + surveyId + "&compoundId=" + compoundId
          });
        } else {
          console.log(error);
        }
      });
    }
  }
};
</script>
<style >
.customNegMarg {
  margin: -120px 30px 0px;
}
</style>