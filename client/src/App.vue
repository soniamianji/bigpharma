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
      <v-btn
        v-if="isUserSignedIn === true"
        text
        rounded
        color="primary"
      >Hey,{{account.id}} {{account.username}}</v-btn>
    </v-app-bar>
    <router-view :isUserSignedIn="isUserSignedIn" :account="account" />
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
    }
  },
  methods: {
    // setAuthenticated(status) {
    //   if (status !== undefined) {
    //     this.user.isSignedIn = true;
    //     this.user.name = status.username;
    //     this.user.id = status.id;
    //   }

    //   console.log(status);
    // },
    logout() {
      this.user.isSignedIn = false;
      localStorage.removeItem("userToken");
      path: "/signout/", this.$router.push({ path: "/signout" });
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