<template>
  <!-- Sizes your content based upon application components -->
  <v-parallax dark src="../assets/homebg.png">
    <v-container fluid>
      <v-layout row wrap mr-12 ml-0 mt-n12>
        <v-flex xs12 md4 ml-12>
          <div class="display-3 font-weight-thin mb-5">Bigpharma</div>
          <div class="headline font-weight-thin mb-5">
            <span class="font-weight-bold">Collect</span>,
            <span class="font-weight-bold">curate</span> &
            <span class="font-weight-bold">analyze</span> the results of your trial data.
          </div>
          <div class="mt-10" v-if="isUserSignedIn == false">
            <v-btn outlined width color="grey lighten-1" @click="signup">Signup</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-parallax>
</template> 


<script>
export default {
  props: ["isUserSignedIn"],
  data() {
    return {
      allAccounts: [],
      errors: ""
    };
  },
  methods: {
    signup() {
      this.$router.push({ path: "/signup" });
    }
  }
};
</script>