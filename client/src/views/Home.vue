<template>
  <ul>
    <li v-for="(account) in allAccounts" :key="account.id">{{account.username}}</li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      allAccounts: [],
      errors: ""
    };
  },
  created() {
    const client = require("../SDK/accountsSDK");

    client.getAllAccounts((errors, accounts) => {
      if (errors.length == 0) {
        this.allAccounts = accounts;
        console.log(accounts);
      } else {
        this.errors = errors;
        console.log(errors);
      }
    });
  }
};
</script>
