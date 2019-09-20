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

                  <UpdateUsername :@newUserName="newUsername"></UpdateUsername>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
      </v-card>
      <v-card width="600" class="mx-auto mt-5">
        <v-card-title>
          <p>You can delete your account by clicking the button below, but be aware once you delete your account all your information will be deleted and there is no reverting it back.</p>
        </v-card-title>
        <v-card-text>
          <v-btn class="red text--white">Delete Account</v-btn>
        </v-card-text>
      </v-card>
      <v-card width="600" class="mx-auto mt-5">
        <v-card-title>
          <h6>The list of surveys that you have contributed so far</h6>
        </v-card-title>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
import UpdateUsername from "../components/UpdateUsername";
const client = require("../SDK/accountsSDK");
export default {
  props: ["account", "newUsername"],
  components: { UpdateUsername },
  data() {
    return {
      id: this.$route.params.id,
      errors: ""
    };
  }
};
</script>