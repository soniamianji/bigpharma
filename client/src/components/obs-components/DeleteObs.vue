<template>
  <v-btn text small color="white" @click="deleteObs">Delete</v-btn>
</template>

<script>
const observationClient = require("../../SDK/observationSDK");
export default {
  props: ["obsId"],
  data() {
    return {
      obsDeleted: false
    };
  },
  methods: {
    deleteObs() {
      observationClient.deleteObservationById(this.obsId, err => {
        if (err.length == 0) {
          console.log("successfully deleted");
          this.$emit("obsDeleted", this.obsDeleted);
        } else {
          console.log(err);
        }
      });
    }
  }
};
</script>