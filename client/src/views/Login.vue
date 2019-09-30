<template>
  <v-app>
    <v-content>
      <v-card width="400" class="mx-auto mt-5">
        <v-card-title>
          <h1 class="display-1">Login</h1>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="signIn" ref="form" v-model="valid" lazy-validation>
            <v-text-field
              label="email"
              v-model="email"
              :rules="emailRules"
              required
              prepend-icon="mdi-account-circle"
            />
            <v-text-field
              :type="showPassword ? 'text' : 'password'"
              label="password"
              v-model="password"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              :rules="[v => !!v || 'Password is required']"
              required
            />
            <p v-if="errors !== ''" class="red--text pl-8">{{errors[0]}}</p>
            <v-divider class="mx-4" horizontal></v-divider>
            <v-card-actions>
              <v-btn type="submit" :disabled="!valid" color="success">Login</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="info" @click="goToSignUp" text>Register</v-btn>
              <v-divider class="mx-4" horizontal></v-divider>
              <v-btn @click="googleLogin">Google sign in</v-btn>
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
      name: "login-shortcut",
      valid: true,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      email: "",
      password: "",
      showPassword: false,
      errors: ""
    };
  },
  methods: {
    signIn() {
      client.logIn(this.email, this.password, (err, account) => {
        if (err.length == 0) {
          console.log(account);
          this.$emit("isSignedIn", account);
          this.$router.push({ path: "/" });
        } else {
          this.errors = err;
          console.log(err);
        }
      });
    },
    goToSignUp() {
      this.$router.push({ path: "/signup" });
    },
    googleLogin() {
      this.$login();
    }
  }
};
</script>
