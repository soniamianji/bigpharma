<template>
  <v-app>
    <v-content>
      <v-card width="600" class="mx-auto mt-5">
        <v-card-title>
          <h1 class="display-1">Hello {{account.username}}</h1>
        </v-card-title>
        <v-card-text>
          <v-list shaped>
            <v-subheader>Profile</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="'mdi-email'"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Emaill address</v-list-item-title>
                  <v-list-item-subtitle>{{account.email}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="' mdi-account'"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Username</v-list-item-title>
                  <v-list-item-subtitle>{{account.username}}</v-list-item-subtitle>

                  <UpdateUsername @usernameUpdated="newUsername"></UpdateUsername>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
      </v-card>
      <DeleteAccount></DeleteAccount>
      <UserSurveys></UserSurveys>
    </v-content>
  </v-app>
</template>

<script>
import UpdateUsername from "../components/userAccount/UpdateUsername";
import DeleteAccount from "../components/userAccount/DeleteAccount";
import UserSurveys from "../components/userAccount/UserSurveys";
const client = require("../SDK/accountsSDK");
export default {
  props: ["account"],
  components: { UpdateUsername, DeleteAccount, UserSurveys },
  data() {
    return {
      id: this.$route.params.id,
      UpdatedUsername: "",
      errors: ""
    };
  },
  methods: {
    newUsername(value) {
      this.UpdatedUsername = value;
      this.$emit("userUpdate", this.UpdatedUsername);
    }
  }
};
</script>