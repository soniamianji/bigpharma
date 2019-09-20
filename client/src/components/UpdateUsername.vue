<template>
  <div>
    <div class="text-right">
      <v-btn color="primary" fab x-small dark @click="showForm()">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </div>

    <v-form ref="form" v-if="isFormHidden === false" v-model="valid" @submit.prevent="updateUser">
      <v-text-field
        v-model="updatedUsername"
        :rules="nameRules"
        :counter="10"
        label="New Username"
        required
      ></v-text-field>

      <v-btn type="submit" color="warning" class="text--white" small>update</v-btn>

      <v-btn class="mx-2" fab dark x-small color="red" @click="cancelUpdate()">
        <v-icon dark>mdi-minus</v-icon>
      </v-btn>
    </v-form>
  </div>
</template>

<script>
const client = require("../SDK/accountsSDK");
export default {
  data() {
    return {
      valid: true,
      accountId: this.$route.params.id,
      newUsername: "",
      updatedUsername: "",
      isFormHidden: true,
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 10 || "Name must be less than 10 characters"
      ]
    };
  },
  methods: {
    showForm() {
      this.isFormHidden = !this.isFormHidden;
    },
    cancelUpdate() {
      this.$refs.form.reset();
    },

    updateUser() {
      const id = this.accountId;
      const updatedUsername = this.updatedUsername;

      client.updateAccountById(id, updatedUsername, err => {
        if (err.length == 0) {
          this.isFormHidden = !this.isFormHidden;
        } else {
          //do nothing for now
        }
      });
    }
  }
};
</script>