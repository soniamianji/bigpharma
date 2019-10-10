<template>
  <v-app>
    <v-content class="grey darken-3">
      <v-layout row class="mx-auto">
        <v-flex xs12>
          <div class="pa-5">
            <div class="mx-auto text-center" width="800">
              <div class="display-1 white--text font-weight-thin">Register</div>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-card width="400" class="mx-auto mt-0">
        <v-card-text>
          <v-form @submit.prevent="signUp" ref="form" v-model="valid" lazy-validation>
            <v-text-field
              label="email"
              v-model="email"
              prepend-icon="mdi-email"
              :rules="emailRules"
              required
            />
            <v-text-field
              label="username"
              v-model="username"
              prepend-icon="mdi-account-circle"
              :rules="nameRules"
              required
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
            <p class="red--text pl-8" v-if="errors == '' || valid == false">{{errors[0]}}</p>
            <v-card-actions>
              <v-btn outlined type="submit" :disabled="!valid" class="mt-n2" block>Register</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
      <div class="caption text-center mt-3">
        <v-btn
          text
          x-small
          @click="goToLogin"
          class="grey--text text--lighten-2"
        >Have an account? Login</v-btn>
      </div>
    </v-content>
  </v-app>
</template>

<script>
const client = require("../SDK/accountsSDK");
export default {
  data() {
    return {
      valid: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
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
          this.id = id;
          console.log(id);
          if (id) {
            this.$router.push({ path: "/login" });
          }
        } else {
          console.log(errors);
          this.errors = errors;
          this.valid = false;
        }
      });
    },
    goToLogin() {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>