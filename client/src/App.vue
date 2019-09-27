<template>
  <v-app>
    <v-content>
      <v-app-bar app>
        <v-toolbar-title class="mr-8">
          <v-icon class="mr-2">mdi-pill</v-icon>bigpharma
        </v-toolbar-title>

        <v-toolbar-items class>
          <v-divider vertical></v-divider>
          <v-btn to="/" text>Home</v-btn>
          <v-divider vertical></v-divider>
          <v-btn to="/compounds" text>Compounds</v-btn>
          <v-divider vertical></v-divider>
        </v-toolbar-items>

        <v-spacer></v-spacer>
        <v-toolbar-title v-if="isUserSignedIn == true">{{account.username}}</v-toolbar-title>

        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-if="isUserSignedIn == true">
              <v-list-item-title>
                <v-btn text>
                  <router-link :to="'/profile/' + account.id" class="customColor">Profile</router-link>
                </v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="isUserSignedIn == true">
              <v-list-item-title>
                <v-btn text rounded color="primary" @click="logOut">Log out</v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="isUserSignedIn == false">
              <v-list-item-title>
                <v-btn text>
                  <router-link to="/login" class="customColor">Login</router-link>
                </v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="isUserSignedIn == false">
              <v-list-item-title>
                <v-btn text>
                  <router-link to="/signup" class="customColor">Register</router-link>
                </v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <router-view
        @isSignedIn="setAuthenticated"
        :isUserSignedIn="isUserSignedIn"
        :account="account"
        @userUpdate="newName"
      />
    </v-content>
  </v-app>
</template>



<script>
const client = require("./SDK/accountsSDK");
export default {
  data() {
    return {
      account: {
        id: "",
        username: "",
        email: ""
      },
      isUserSignedIn: false
    };
  },
  created() {
    if (client.userInfo) {
      if (client.userInfo.username !== "") {
        this.isUserSignedIn = true;
        this.account.username = client.userInfo.username;
        this.account.id = client.userInfo.id;
        this.account.email = client.userInfo.email;
      }
    }
  },
  methods: {
    newName(value) {
      this.account.username = value;
    },
    setAuthenticated(status) {
      if (status !== undefined) {
        this.isUserSignedIn = true;
        this.account.username = status.username;
        this.account.id = status.id;
      }
    },
    logOut() {
      client.signOut(() => {
        this.isUserSignedIn = false;
        this.$router.push({ path: "/login" });
      });
    }
  }
};
</script>
<style >
.customColor {
  text-decoration: none;
  color: black;
}
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>