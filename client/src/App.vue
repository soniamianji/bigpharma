<template>
  <div>
    <v-app-bar app>
      <v-btn text rounded color="teal">
        <router-link to="/" class="customColor">Home</router-link>
      </v-btn>
      <v-btn text rounded v-if="isUserSignedIn == false">
        <router-link to="/login" class="customColor">Login</router-link>
      </v-btn>
      <v-btn text rounded v-if="isUserSignedIn == false">
        <router-link to="/signup" class="customColor">Register</router-link>
      </v-btn>
      <v-btn text rounded>
        <router-link to="/compounds" class="customColor">Compounds</router-link>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="isUserSignedIn === true" text rounded color="primary">
        <router-link :to="'/profile/' + account.id" class="customColor">Hey {{account.username}}</router-link>
      </v-btn>
      <v-btn v-if="isUserSignedIn === true" text rounded color="primary" @click="logOut">Log out</v-btn>
    </v-app-bar>
    <router-view
      @isSignedIn="setAuthenticated"
      :isUserSignedIn="isUserSignedIn"
      :account="account"
      @userUpdate="newName"
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
</style>