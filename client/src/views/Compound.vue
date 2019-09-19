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

              <v-simple-table height="200px" class="mx-auto text-center tableWidth">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left"></th>
                      <th class="text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{compound.compoundName}}</td>
                      <td>{{compound.indicationName}}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <!-- WRITE YOUR CODE FOR SHOWING THE GRAPH HERE -->
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
      id: this.$route.params.id,
      compound: "",
      errors: ""
    };
  },
  created() {
    const client = require("../SDK/compoundSDK");

    client.getCompoundById(this.id, (errors, compound) => {
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
    doThisOnClick() {
      alert(this.compound.compoundName);
    }
  }
};
</script>
<style scoped>
.tableWidth {
  width: 400px;
}
</style>