 <template>
  <v-card max-width="344" class="mx-auto" dark flat outlined>
    <v-list-item>
      <v-list-item-avatar color="grey" width="65" height="65" class="mt-3">
        <v-img
          class="elevation-1"
          src="https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/dihydrohydroxycodeinone/PNG"
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">Compound Name</v-list-item-title>
        <v-list-item-subtitle>
          <span class="font-weight-thin">for</span>
          Indication
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-simple-table dark>
      <thead>
        <tr>
          <th class="text-left">Indication</th>
          <th class="text-left">Δ Intensity (%)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Headache</td>
          <td>-26%</td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-divider></v-divider>
    <v-card-text>
      <p>Dataset is based on X surveys from Y subjects with a total of X datapoints.</p>
      <p>1 side effect(s) reported.</p>
    </v-card-text>

    <v-card-actions>
      <v-btn text color block outlined class="grey darken-2">Participate</v-btn>
    </v-card-actions>
  </v-card>
</template>