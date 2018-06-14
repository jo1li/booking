<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card class="btn-fix">
        <v-card-title>
          <span class="headline">Edit Basic Info</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="avatar" label="PROFILE AVATAR" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="facebook" label="FACEBOOK PROFILE" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="instagram" label="INSTAGRAM PROFILE" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="spotify" label="CONNECT SPOTIFY ACCOUNT" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm8>
                <v-text-field v-model="town" label="HOME TOWN" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm4>
                <v-select
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="STATE"
                  required
                  v-model="state"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm12>
                <v-select
                  :items="['Alternative', 'Indie', 'jazz', 'punk', 'R&B', 'hiphop']"
                  label="GENRE"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm12>
                <v-select
                  :items="['Alternative', 'Indie', 'jazz', 'punk', 'R&B', 'hiphop']"
                  label="GENRE"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm12>
                <v-select
                  :items="['Alternative', 'Indie', 'jazz', 'punk', 'R&B', 'hiphop']"
                  label="GENRE"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm12>
                <v-text-field v-model="website" label="WEBSITE" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm12>
                <v-text-field
                label="SUMMERY"
                :counter="300"
                textarea
                light
                v-model="summery"
              ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn round outline color="indigo" flat @click.native="submit">
            <v-icon left dark>close</v-icon>
            Close
          </v-btn>
          <v-btn round color="blue primary" @click.native="submit" dark>
            <v-icon left dark>save</v-icon>
            Save
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import Vue from 'vue';
import Vuetify from 'vuetify'

Vue.use(Vuetify, {
  theme: {
    primary: '#E53935',
    secondary: '#FFCDD2',
    accent: '#3F51B5',
  }
})
  export default {
    props: {
        name: String,
        password: String,
        clear: Function,
        submit: Function,
        dialog: Boolean,
    },
    data: () => ({
      avatar: this.avatar,
      facebook: this.facebook,
      instagram: this.instagram,
      spotify: this.spotify,
      town: this.town,
      genera: this.genera,
      state: this.state,
      website: this.website,
      summery: this.summery,

      valid: false,
      name: this.name,
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      email: this.email,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ]
    }),
  }
</script>
<style>
  .modal-test {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: white;
    padding: 10px;

  }
  .btn-fix  .btn {
      padding: 0;
  }
</style>