<template>
  <!-- App.vue -->
  <v-app>
    <v-content>
      <h1>survey id is: {{surveyId}}</h1>
      <h2>user id : {{account.id}}</h2>
      <h3>Compound Id : {{compoundId}}</h3>
    </v-content>
  </v-app>
</template>


<script>
export default {
  props: ["account"],
  data() {
    return {
      surveyId: this.$route.query.surveyId,
      compoundId: this.$route.query.compoundId
    };
  }
};
</script>