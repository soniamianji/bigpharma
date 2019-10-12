<template>
  <v-app>
    <div class="pa-5 mt-10">
      <div class="mx-auto text-center" width="800">
        <div class="display-1 font-weight-thin">
          Hello
          <span class="font-weight-medium">{{account.username}}</span>
        </div>
      </div>
    </div>
    <v-card width="600" class="mx-auto mt-2">
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

                <UpdateUsername @usernameUpdated="newUsername" :accountId="id"></UpdateUsername>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
    <UserSurveys :accountId="id" @surveyDeleted="surveysDeleted" :key="componnetKey"></UserSurveys>
    <DeleteAccount :accountId="id" @accountDeleted="accountDeleted"></DeleteAccount>
  </v-app>
</template>

<script>
import UpdateUsername from "../components/profile-component/UpdateUsername";
import DeleteAccount from "../components/profile-component/DeleteAccount";
import UserSurveys from "../components/profile-component/UserSurveys";
const client = require("../SDK/accountsSDK");
export default {
  props: ["account", "isUserSignedIn"],
  components: { UpdateUsername, DeleteAccount, UserSurveys },
  data() {
    return {
      id: this.$route.params.id,
      UpdatedUsername: "",
      errors: "",
      componnetKey: 0
    };
  },
  methods: {
    newUsername(value) {
      this.UpdatedUsername = value;
      this.$emit("userUpdate", this.UpdatedUsername);
    },
    surveysDeleted(value) {
      this.componnetKey += 1;
    },
    accountDeleted(value) {
      this.$emit("accountDeleted", value);
    }
  }
};
</script>