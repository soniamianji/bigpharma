<template>
  <!-- App.vue -->
  <v-app>
    <v-app-bar app>
      <!-- -->
    </v-app-bar>
    <!-- Sizes your content based upon application components -->
    <v-content>
      <v-parallax
        dark
        src="https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1687,w_3000,x_0,y_0/dpr_1.5/c_limit,w_908/fl_lossy,q_auto/v1556161625/190425-clift-congress-big-pharma-hero_gdaeyp"
      >
        <v-row align="center" justify="center">
          <h1 class="display-2 font-weight-thin mb-4">BIGPHARMA</h1>
          <h4 class="subheading">Clinical trials Informatics</h4>
        </v-row>
      </v-parallax>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <v-item-group>
          <v-container>
            <v-row>
              <v-col v-for="n in 12" :key="n" cols="12" md="4">
                <v-item v-slot:default="{ active, toggle }">
                  <v-card
                    :color="active ? 'primary' : ''"
                    class="d-flex align-center"
                    dark
                    height="200"
                    @click="toggle"
                  >
                    <v-scroll-y-transition>
                      <div v-if="active" class="display-3 flex-grow-4 text-center">Active</div>
                    </v-scroll-y-transition>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>
      </v-container>
    </v-content>
  </v-app>
