<template>
  <v-app>
    <v-content class="grey darken-3">
      <v-layout row class="mx-auto">
        <v-flex xs12>
          <div class="pa-5">
            <div class="mx-auto text-center" width="800">
              <div class="display-1 white--text font-weight-thin">Login</div>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-card width="400" class="mx-auto mt-0">
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
            <p v-if="errors !== '' && valid == false" class="red--text pl-8">{{errors[0]}}</p>

            <v-card-actions>
              <v-btn outlined class="mt-1" type="submit" :disabled="!valid" block>Login</v-btn>
            </v-card-actions>
            <v-divider class="mx-4 mt-2" horizontal></v-divider>
            <v-btn text small @click="gotoGoogleSignIn" color="amber darken-3" class="mt-2" block>
              <v-icon left>mdi-google</v-icon>Continue with Google
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
      <div class="caption text-center mt-3">
        <v-btn
          text
          x-small
          @click="goToSignUp"
          class="grey--text text--lighten-2"
        >No Account? Register here</v-btn>
      </div>
    </v-content>
  </v-app>
</template> 

<script>
const client = require("../SDK/accountsSDK");
const clientGoogle = require("../SDK/googleLoginSDK");
export default {
  data() {
    return {
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
      this.errors = "";
      client.logIn(this.email, this.password, (err, account) => {
        if (err.length == 0) {
          console.log(account);
          this.$emit("isSignedIn", account);
          this.$router.push({ path: "/" });
        } else {
          this.errors = err;
          this.valid = false;
          console.log(err);
        }
      });
    },
    goToSignUp() {
      this.$router.push({ path: "/signup" });
    },
    gotoGoogleSignIn() {
      this.$gAuth.getAuthCode().then(Authcode => {
        console.log(Authcode);
        clientGoogle.googleAuthentication(Authcode, (err, account) => {
          if (err.length == 0) {
            console.log("success");
            this.$emit("isSignedIn", account);
            this.$router.push({ path: "/" });
          } else {
            console.log(err);
          }
        });
      });
    }
  }
};
</script>
