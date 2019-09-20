<template>
  <v-app>
    <v-content>
      <v-card width="400" class="mx-auto mt-5">
        <v-card-title>
          <h1 class="display-1">Register</h1>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="signUp">
            <v-text-field label="email" v-model="email" prepend-icon="mdi-email" />
            <v-text-field label="username" v-model="username" prepend-icon="mdi-account-circle" />
            <v-text-field
              :type="showPassword ? 'text' : 'password'"
              label="password"
              v-model="password"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            />
            <v-devider></v-devider>
            <v-card-actions>
              <v-btn type="submit" color="success">Register</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="info" @click="goToLogin()">Login</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
const client = require("../SDK/accountsSDK");
export default {
  data() {
    return {
      id: "",
      showPassword: false,
      email: "",
      username: "",
      password: "",
      errors: ""
    };
  },
  methods: {
    signUp() {
      const account = {
        email: this.email,
        username: this.username,
        password: this.password
      };
      client.createAccount(account, (errors, id) => {
        if (errors.length == 0) {
          console.log("clcik");
          this.id = id;
          console.log(id);
          if (id) {
            this.$router.push({ path: "/login" });
          }
        } else {
          console.log(errors);
          this.errors = errors;
        }
      });
    }
  },
  goToLogin() {
    this.$router.push({ path: "/login" });
  }
};
</script>