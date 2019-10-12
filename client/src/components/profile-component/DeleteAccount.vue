<template>
  <v-card bg-no color="#fafafa" flat width="600" class="mx-auto mt-n4">
    <v-card-text>
      <span
        class="font-italic font-weight-light"
      >By choosing to delete your account you are aware of and accept that any and all data pertaining to any survey provided to bigpharma is the property of bigpharma and will not be deleted.</span>
      <v-form
        ref="form"
        v-model="valid"
        @submit.prevent="deleteAccount"
        :lazy-validation="lazy"
        class="mt-2"
      >
        <v-row>
          <v-col cols="12" sm="6" align-right>
            <v-checkbox
              v-model="checkbox"
              :rules="[v => !!v || 'You must agree to continue!']"
              label="Do you agree?"
              required
              class="mt-0"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" sm="6" class="text-right">
            <v-btn
              small
              :disabled="!valid"
              color="red"
              class="mr-4 customTextColor"
              type="submit"
            >Delete Account</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
const client = require("../../SDK/accountsSDK");
export default {
  props: ["isUserSignedIn", "accountId"],
  data() {
    return {
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