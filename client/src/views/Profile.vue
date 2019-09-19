<template>
  <div>
    <h1>Hello {{}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      isAuthenticated: false,
      username: "",
      errors: ""
    };
  },
  created() {
    // const client = require("../SDK/accountsSDK");
    // const AuthCheck = localStorage.getItem("userToken");
    // if (AuthCheck == "") {
    //   this.$router.push({ path: "/login" });
    // } else if (AuthCheck === this.account.accessToken) {
    //   this.isAuthenticated = true;
    //   client.getAccountById(this.id, (err, account) => {
    //     if (err.length == 0) {
    //       this.username = account.username;
    //     } else {
    //       this.errors = err;
    //     }
    //   });
  }
};
</script>