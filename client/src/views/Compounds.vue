<template>
  <v-layout row class="mx-auto mt-n8">
    <v-flex xs12>
      <div class="pa-12">
        <v-layout row class="mx-auto">
          <v-flex xs12>
            <div class="pa-12">
              <div class="mx-auto text-center" width="800">
                <div class="headline">Compounds</div>
                <div
                  class="font-weight-light mt-0"
                >Below youll find the list of compounds being investigated.</div>
              </div>
            </div>
          </v-flex>
        </v-layout>
        <v-card dark width="70%" class="mx-auto">
          <v-card-title>
            <div class="subtitle-1 font-weight-medium">Compounds</div>
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
                <tr v-for="item in items" :key="item.id" @click="selectItem(item)">
                  <td>
                    <v-btn small text>{{ item.name }}</v-btn>
                  </td>
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
          text: "Name of compound",
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
        for (var i = 0; i < compounds.length; i++) {
          const compoundObj = {
            name: compounds[i].compoundName,
            indication: compounds[i].indicationName,
            numberOfParticipants: 0,
            numberOfObservations: "",
            id: compounds[i].id
          };

          //get obs by compound id to figure out the number of obs for each compound
          obsClient.getObservationsByCompoundId(compoundObj.id, (err, obs) => {
            if (err.length == 0) {
              if (obs !== null) {
                compoundObj.numberOfObservations = obs.length;

                //to find the number of participants on each compound
                let userIdsfromobs = [];
                for (var i = 0; i < obs.length; i++) {
                  userIdsfromobs.push(obs[i].userId);
                }
                let participantArray = [...new Set(userIdsfromobs)];
                compoundObj.numberOfParticipants = participantArray.length;
              } else {
                compoundObj.numberOfObservations = 0;
              }
            } else {
              this.errors = err;
            }
          });

          this.items.push(compoundObj);
        }
      } else {
        this.errors = errors;
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