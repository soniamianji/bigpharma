<template>
  <div>
    <v-app-bar app>
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/compounds">Compounds</v-btn>

      <v-btn text to="/login" v-if="isUserSignedIn == false">Login</v-btn>
      <v-btn text to="/signup" v-if="isUserSignedIn == false">Register</v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="isUserSignedIn === true" text>Hello {{account.username}}</v-btn>
      <v-btn v-if="isUserSignedIn === true" text @click="logOut">Log out</v-btn>
    </v-app-bar>
    <router-view
      @isSignedIn="setAuthenticated"
      :isUserSignedIn="isUserSignedIn"
      :account="account"
    />
  </div>
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
    if (client.userInfo.username !== "") {
      this.isUserSignedIn = true;
      this.account.username = client.userInfo.username;
      this.account.id = client.userInfo.id;
      this.account.email = client.userInfo.email;
      console.log(this.account.email);
    }
  },
  methods: {
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