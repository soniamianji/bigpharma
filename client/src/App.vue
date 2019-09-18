<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Big Pharma</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn>
        <router-link to="/login" class="white--text">login</router-link>
      </v-btn>
      <v-btn>
        <router-link to="/" class="white--text">Home</router-link>
      </v-btn>
    </v-app-bar>

    <v-content></v-content>
    <!-- <v-card height="150">
      <v-footer absolute class="font-weight-medium">
        <v-col class="text-center" cols="12">
          {{ new Date().getFullYear() }} —
          <strong>Big Pharma</strong>
        </v-col>
      </v-footer>
    </v-card>-->
    <router-view />
  </v-app>
</template>



