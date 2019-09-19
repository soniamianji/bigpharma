<template>
  <v-app>
    <v-content>
      <v-card width="400" class="mx-auto mt-5">
        <v-card-title>
          <h1 class="display-1">Login</h1>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="signIn">
            <v-text-field label="email" :v-model="email" prepend-icon="mdi-account-circle" />
            <v-text-field
              :type="showPassword ? 'text' : 'password'"
              label="password"
              :v-model="password"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            />
            <v-devider></v-devider>
            <v-card-actions>
              <v-btn type="submit" color="success">Login</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="info">Register</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      showPassword: false
    };
  },
  methods: {
    signIn() {
      const client = require("../SDK/accountsSDK");
      client.logIn(this.email, this.password, (err, account) => {
        if (err.length == 0) {
          console.log(account);
        } else {
          console.log(err);
        }
      });
    }
  }
};
</script>