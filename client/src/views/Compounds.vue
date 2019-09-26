<template>
  <!-- App.vue -->
  <v-app>
    <!-- Provides the application the proper gutter -->
    <v-container fluid class="mt-12">
      <v-layout row class="mx-auto">
        <v-flex xs12>
          <div class="pa-12">
            <div class="mx-auto text-center" width="800">
              <div class="headline">Active Surveys</div>
              <div
                class="overline font-weight-ligh mt-0"
              >Bellow youll find the active surveys we are conducting.</div>
              <div class="body-2 mt-4" v-if="isUserSignedIn == false">
                In order to participate and contribute with data you will need to
                <a
                  href="/signup"
                  class
                >register an account</a>.
              </div>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row class="mx-auto mt-n12">
        <v-flex xs12>
          <div class="pa-12">
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
                </v-list-item>

                <v-divider inset></v-divider>
              </v-list>
            </v-card>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>


<script>
import HeadPic from "../components/HeadPic";
const compound = require("../SDK/compoundSDK");

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
  }
};
</script>
<style >
.customNegMarg {
  margin: -120px 30px 0px;
}
</style>