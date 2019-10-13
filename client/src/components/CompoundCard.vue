 <template>
  <v-card max-width="500" class="mx-auto" dark flat outlined>
    <v-list-item>
      <v-list-item-avatar color="grey" width="65" height="65" class="mt-3">
        <v-img class="elevation-1" :src="urlImg"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{compound.compoundName}}</v-list-item-title>
        <v-list-item-subtitle>
          <span class="font-weight-thin">for</span>
          {{compound.indicationName}}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-simple-table dark>
      <thead>
        <tr>
          <th class="text-left">Indication</th>
          <th class="text-left">Δ Intensity (%)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{compound.indicationName}}</td>
          <td v-if="deltaIndication !== NaN || deltaIndication !== null ">{{deltaIndication}}%</td>
          <td v-else>--</td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-divider></v-divider>
    <v-card-text>
      <p>Dataset is based on {{numberOfSurvyes}} surveys from {{numberOfParticipants}} subjects with a total of {{numberOfObservations}} datapoints.</p>
      <p>{{sideEffects.length}} side Effects are reported.</p>
    </v-card-text>

    <v-card-actions>
      <v-btn text color block outlined class="grey darken-2" @click="contribute">Participate</v-btn>
    </v-card-actions>
    <p
      v-if="errors !== ''"
      class="red--text text-center"
    >Someting went wrong, please try again later.</p>
  </v-card>
</template>

<script>
const surveyClient = require("../SDK/surveySDK");
export default {
  props: [
    "numberOfSurvyes",
    "numberOfParticipants",
    "numberOfObservations",
    "compound",
    "account",
    "isUserSignedIn",
    "sideEffects",
    "deltaIndication"
  ],
  data() {
    return {
      urlImg: "",
      errors: ""
    };
  },
  created() {
    this.urlImg =
      "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/" +
      this.compound.compoundName +
      "/PNG";
  },
  methods: {
    contribute: function() {
      //if user is not logged in redirect the user to login page otherwise create survey and go to observation page
      if (this.isUserSignedIn == true) {
        const userId = this.account.id;
        const surveyObj = {
          userId: userId,
          compoundId: this.compound.id,
          createdAt: Date.parse(new Date())
        };
        surveyClient.createSurvey(surveyObj, (error, id) => {
          if (error.length == 0) {
            const surveyId = id;
            const compoundId = surveyObj.compoundId;
            this.$router.push({
              path:
                "/observations?surveyId=" +
                surveyId +
                "&compoundId=" +
                compoundId
            });
          } else {
            this.errors = error;
          }
        });
      } else {
        this.$router.push({ path: "/login" });
      }
    }
  }
};
</script>