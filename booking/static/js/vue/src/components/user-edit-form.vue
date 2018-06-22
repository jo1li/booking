<template>
  <Dialog
    :dialog="dialog"
    headline="Edit Basic Info"
    :submit="submit"
    :cancel="onCancel"
    :loading="loading"
  >
      <v-layout wrap>
        <v-flex xl11 md11 sm11 xs12>
          <v-text-field
            v-model.trim="form.avatar"
            label="PROFILE AVATAR"
            placeholder="Avatar"
            class="input-label input-placeholder input-border"
          ></v-text-field>
        </v-flex>
        <v-flex xl1 md1 sm1 xs12 class="text-right text-xs-center buttons-container">
            <v-btn fab outline color="primary" small>
              <v-icon dark>cloud_upload</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <small>SOCIAL PRIFILES</small>
        </v-flex>
        <v-flex xl10 md10 sm10 xs12 >
          <v-text-field
            v-model.trim="form.facebook"
            placeholder="Facebook profile"
            class="input-label input-placeholder input-border"

          ></v-text-field>
        </v-flex>
        <v-flex xl2 md2 sm2 xs12 class="text-right text-xs-center buttons-container">
          <v-btn fab outline color="primary" small>
              <v-icon dark>add</v-icon>
          </v-btn>
            <v-btn @click="resetFacebook" :disabled="!form.facebook" fab outline color="primary" small>
              <v-icon dark>delete</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xl10 md10 sm10 xs12 align-content-end>
          <v-text-field
            v-model.trim="form.instagram"
            placeholder="Instagram profile"
            class="input-label input-placeholder input-border"
            ></v-text-field>
        </v-flex>
        <v-flex xl2 md2 sm2 xs12 class="text-right text-xs-center buttons-container">
          <v-btn fab outline color="primary" small>
              <v-icon dark>add</v-icon>
          </v-btn>
            <v-btn @click="resetInstagram" :disabled="!form.instagram" fab outline color="primary" small>
              <v-icon dark>delete</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xl10 md10 sm10 xs12>
          <v-text-field
            v-model.trim="form.spotify"
            placeholder="Connect spotify account"
            class="input-label input-placeholder input-border"
            ></v-text-field>
        </v-flex>
          <v-flex xl2 md2 sm2 xs12 class="text-right text-xs-center buttons-container">
          <v-btn fab outline color="primary" small>
              <v-icon dark>add</v-icon>
          </v-btn>
            <v-btn @click="resetSpotify" :disabled="!form.spotify" fab outline color="primary" small>
              <v-icon dark>delete</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12 sm8>
          <small>HOME TOWN</small>
          <v-text-field
            v-model.trim="form.hometown"
            placeholder="What is your hometown"
            class="input-label input-placeholder input-border"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm4>
          <small>STATE</small>
          <v-select
            :items="states"
            placeholder="Select your state"
            v-model="form.state"
            append-icon="expand_more"
            class="input-label input-placeholder icon-arrow input-border"
          ></v-select>
        </v-flex>
        <v-flex xs12 sm12>
          <small>GENERA</small>
          <v-select
            v-model="form.genres[0]"
            :items="['Alternative', 'Indie', 'jazz', 'punk', 'R&B', 'hiphop']"
            placeholder="Select a genera"
            append-icon="expand_more"
            class="input-label input-placeholder icon-arrow  input-border"
          ></v-select>
        </v-flex>
        <v-flex xs12 sm12>
          <v-select
            v-model="form.genres[1]"
            :items="['Alternative', 'Indie', 'jazz', 'punk', 'R&B', 'hiphop']"
            placeholder="Select a genera"
            append-icon="expand_more"
            class="no-padding input-label input-placeholder icon-arrow input-border"
          ></v-select>
        </v-flex>
        <v-flex xs12 sm12>
          <v-select
            v-model="form.genres[2]"
            :items="['Alternative', 'Indie', 'jazz', 'punk', 'R&B', 'hiphop']"
            placeholder="Select a genera"
            append-icon="expand_more"
            class="no-padding input-label input-placeholder icon-arrow input-border"
          ></v-select>
        </v-flex>
        <v-flex xs12 sm12>
          <v-text-field
            v-model.trim="form.website"
            label="WEBSITE"
            placeholder="What is your website"
            class="input-label input-placeholder input-border"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm12>
          <small>SUMMARY</small>
          <v-text-field
            placeholder=" "
            :counter="300"
            textarea
            light
            class="no-padding input-label input-placeholder summary-border"
            v-model.trim="form.bio"
            rows="3"
          ></v-text-field>
        </v-flex>
      </v-layout>
  </Dialog>
</template>
<script>
import { Dialog } from './higherOrderComponents/modals';
import states from '../utils/states';
import { updateUserBio } from '../request/requests';
import { removeNone } from '../utils/djangoClean';
import _ from "lodash";

export default {
    props: {
        name: String,
        password: String,
        close: Function,
        dialog: Boolean,
        id: String,
        stage_name: String,
        hometown: String,
        facebook: String,
        instagram: String,
        spotify: String,
        website: String,
        bio: String,
        state: String,
        genres: String,
    },
    components: {
      Dialog,
    },
    data: function() {
      return {
        states: states,
        valid: false,
        loading: false,
        form: {
          stage_name: removeNone(this.stage_name),
          avatar: removeNone(this.avatar),
          facebook: removeNone(this.facebook),
          instagram: removeNone(this.instagram),
          spotify: removeNone(this.spotify),
          hometown: removeNone(this.hometown),

          // Move split out of this file
          genres: removeNone(this.genres).split(', ') || [],
          state: removeNone(this.state),
          website: removeNone(this.website),
          bio: removeNone(this.bio),
        }
      }
    },
    methods: {
      resetFacebook: function () {this.form.facebook = ''},
      resetInstagram: function () {this.form.instagram = ''},
      resetSpotify: function () {this.form.spotify = ''},

      onCancel: function () {

        // leave time for dialog to animate close before resetting
        setTimeout(() => {
          this.form = {
            stage_name: '',
            avatar: '',
            facebook: '',
            instagram: '',
            spotify: '',
            hometown: '',
            genres: '',
            state: '',
            website: '',
            bio: '',
          }
        }, 500);
        this.close();
      },
      submit: function () {
        this.loading = true;

        // TODO throttle click
        const formData = _.assign({}, this.form, {
          genres: this.form.genres.join(",")
        });

        updateUserBio(formData, this.id)
          .then(() => {
            this.close();
            this.loading = false;
          })
          .catch(() => {

            // TODO needs error handling for client
            this.loading = false;
          })
      }
    },
  }
</script>
<style>
  .btn-fix  .btn {
      padding: 0;
  }
</style>