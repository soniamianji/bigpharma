<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">Login</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field label="email" prepend-icon="mdi-account-circle" />
          <v-text-field
            type="password"
            label="password"
            prepend-icon="mdi-lock"
            append-icon="mdi-eye-off"
          />
          <v-card-actions>
            <v-btn color="success">Register</v-btn>
            <v-btn color="info">Login</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>
