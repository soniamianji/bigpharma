<template>
  <!-- App.vue -->
  <v-app>
    <HeadPic></HeadPic>
    <!-- Provides the application the proper gutter -->
    <v-container fluid>
      <v-card class="customNegMarg">
        <v-layout row class="mx-auto">
          <v-flex xs12>
            <div class="pa-12">
              <v-alert class="mx-auto text-center" width="600">
                <div class="title">Lorem Ipsum</div>
                <div>Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Duis vel nibh at velit scelerisque suscipit. Praesent blandit laoreet nibh. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros.</div>
              </v-alert>
            </div>
          </v-flex>
        </v-layout>
        <v-layout row wrap mr-0 ml-0>
          <v-flex xs12 md4>
            <div>
              <v-alert class="mx-auto text-center">
                <div class="title">Lorem Ipsum</div>
                <div>Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Duis vel nibh at velit scelerisque suscipit. Praesent blandit laoreet nibh. Aenean posuere, tortor sed cursus feugiat, .</div>
              </v-alert>
            </div>
          </v-flex>
          <v-flex xs12 md4>
            <div>
              <v-alert class="mx-auto text-center">
                <div class="title">Lorem Ipsum</div>
                <div>Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Duis vel nibh at velit scelerisque suscipit. Praesent blandit laoreet nibh. Aenean posuere, tortor sed cursus feugiat,</div>
              </v-alert>
            </div>
          </v-flex>
          <v-flex xs12 md4>
            <div>
              <v-alert class="mx-auto text-center">
                <div class="title">Lorem Ipsum</div>
                <div>Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Duis vel nibh at velit scelerisque suscipit. Praesent blandit laoreet nibh. Aenean posuere, tortor sed cursus feugiat,</div>
              </v-alert>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
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

  // created() {
  //   const client = require("../SDK/accountsSDK");

  //   client.getAllAccounts((errors, accounts) => {
  //     if (errors.length == 0) {
  //       this.allAccounts = accounts;
  //       console.log(accounts);
  //     } else {
  //       this.errors = errors;
  //       console.log(errors);
  //     }
  //   });
  // }
};
</script>
<style >
.customNegMarg {
  margin: -120px 30px 0px;
}
</style>