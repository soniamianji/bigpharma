<template>
  <v-app>
    <v-layout row class="mx-auto">
      <v-flex xs12>
        <div class="pa-12">
          <v-alert class="mx-auto text-center" width="600">
            <div class="title">Lorem Ipsum</div>
            <div>Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Duis vel nibh at velit scelerisque suscipit. Praesent blandit laoreet nibh. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros.</div>
          </v-alert>
          <v-card>
            <v-card-title>
              Compounds
              <div class="flex-grow-1"></div>
              <v-text-field
                v-model="search"
                append-icon="fa-search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table v-model="selected" :headers="headers" :items="items" :search="search">
              <template v-slot:body="{ items }">
                <tbody>
                  <tr
                    v-for="item in items"
                    :key="item.name"
                    @click="selectItem(item)"
                    v-bind:class="{'selectedRow': (item === selectedItem)}"
                  >
                    <td>{{ item.name }}</td>
                    <td>{{ item.indication }}</td>
                    <td>{{ item.numberOfParticipants }}</td>
                    <td>{{ item.numberOfObservations }}</td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-app>
</template>
             


<script>
import HeadPic from "../components/HeadPic";
const compound = require("../SDK/compoundSDK");
const obsClient = require("../SDK/observationSDK");
export default {
  props: ["account", "isUserSignedIn"],
  components: { HeadPic },
  data() {
    return {
      selected: [],
      errors: "",
      search: "",
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "center",
          sortable: false,
          value: "name"
        },
        { text: "Indication", value: "indication" },
        { text: "Number Of Participants", value: "numberOfParticipants" },
        { text: "Number Of Observations", value: "numberOfObservations" }
      ],
      items: []
    };
  },
  created() {
    compound.getAllCompounds((errors, compounds) => {
      if (errors.length == 0) {
        console.log(compounds);
        for (var i = 0; i < compounds.length; i++) {
          const compoundObj = {
            name: compounds[i].compoundName,
            indication: compounds[i].indicationName,
            numberOfParticipants: 0,
            numberOfObservations: "",
            id: compounds[i].id
          };
          obsClient.getObservationsByCompoundId(compoundObj.id, (err, obs) => {
            if (err.length == 0) {
              if (obs !== null) {
              } else {
                compoundObj.numberOfObservations = 0;
              }
            } else {
              console.log(err);
            }
          });

          this.items.push(compoundObj);
        }
        console.log(this.items);
      } else {
        this.errors = errors;
        console.log(errors);
      }
    });
  },
  methods: {
    selectItem(item) {
      console.log("Item selected: " + item.id);
      this.$router.push({ path: "/compounds/" + item.id });
    }
  }
};
</script>
<style >
.customNegMarg {
  margin: -120px 30px 0px;
}
</style>