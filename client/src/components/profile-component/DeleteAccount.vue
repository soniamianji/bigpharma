<template>
  <v-card width="600" class="mx-auto mt-5">
    <v-card-title>
      <p>You can delete your account by clicking the button below. Note that if you do decide to delete your account all the contributions you had so far would stay permanently with Bigpharma.</p>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" @submit.prevent="deleteAccount" :lazy-validation="lazy">
        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        ></v-checkbox>
        <v-btn :disabled="!valid" color="red" class="mr-4 customTextColor" type="submit">Delete</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
const client = require("../../SDK/accountsSDK");
export default {
  props: ["isUserSignedIn"],
  data() {
    return {
      accountId: this.$route.params.id,
      valid: true,
      checkbox: false,
      lazy: false
    };
  },
  methods: {
    deleteAccount() {
      const id = this.accountId;

      client.deleteAccountById(id, err => {
        if (err.length == 0) {
          console.log("success");
          client.signOut(() => {
            this.$emit("accountDeleted", true);
            this.$router.push({ path: "/signup" });
          });
        } else {
          console.log(err);
        }
      });
    }
  }
};
</script>
<style scoped>
.customTextColor {
  color: white;
}
</style>