<template>
  <Dialog
    :dialog="dialog"
    headline="Edit Basic Info"
    :submit="submit"
    :cancel="close"
    :loading="loading"

  >
      <v-layout wrap>
        <v-flex xl11 md11 sm11 xs12>
          <v-text-field
            v-model.trim="form.avatar"
            label="PROFILE AVATAR"
            placeholder=" "
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
            <v-btn fab outline color="primary" small>
              <v-icon dark>delete</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xl10 md10 sm10 xs12 align-content-end>
          <v-text-field
            v-model.trim="form.instagram"
            placeholder="Instagram profile"
            class="no-padding input-label input-placeholder input-border"
            ></v-text-field>
        </v-flex>
        <v-flex xl2 md2 sm2 xs12 class="text-right text-xs-center buttons-container">
          <v-btn fab outline color="primary" small>
              <v-icon dark>add</v-icon>
          </v-btn>
            <v-btn fab outline color="primary" small>
              <v-icon dark>delete</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xl10 md10 sm10 xs12>
          <v-text-field
            v-model.trim="form.spotify"
            placeholder="Connect spotify account"
            class="no-padding input-label input-placeholder input-border"
            ></v-text-field>
        </v-flex>
          <v-flex xl2 md2 sm2 xs12 class="text-right text-xs-center buttons-container">
          <v-btn fab outline color="primary" small>
              <v-icon dark>add</v-icon>
          </v-btn>
            <v-btn fab outline color="primary" small>
              <v-icon dark>delete</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12 sm8>
          <small>HOME TOWN</small>
          <v-text-field
            v-model.trim="form.town"
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
            v-model="form.generas[0]"
            :items="['Alternative', 'Indie', 'jazz', 'punk', 'R&B', 'hiphop']"
            placeholder="Select a genera"
            append-icon="expand_more"
            class="input-label input-placeholder icon-arrow  input-border"
          ></v-select>
        </v-flex>
        <v-flex xs12 sm12>
          <v-select
            v-model="form.generas[1]"
            :items="['Alternative', 'Indie', 'jazz', 'punk', 'R&B', 'hiphop']"
            placeholder="Select a genera"
            append-icon="expand_more"
            class="no-padding input-label input-placeholder icon-arrow input-border"
          ></v-select>
        </v-flex>
        <v-flex xs12 sm12>
          <v-select
            v-model="form.generas[2]"
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
          <small>SUMMERY</small>
          <v-text-field
          placeholder=" "
          :counter="300"
          textarea
          light
          class="no-padding input-label input-placeholder summery-border"
          v-model.trim="form.summery"
        ></v-text-field>
        </v-flex>
      </v-layout>
  </Dialog>
</template>
<script>
import Vue from 'vue';
import { Dialog } from './higherOrderComponents/modals';
import states from '../utils/states';
import { updateUserBio } from '../request/requests';

export default {
    props: {
        name: String,
        password: String,
        close: Function,
        dialog: Boolean,
        id: String,
    },
    components: {
      Dialog,
    },
    data: () => ({
      states: states,
      valid: false,
      loading: false,
      form: {
        avatar: this.avatar,
        facebook: this.facebook,
        instagram: this.instagram,
        spotify: this.spotify,
        town: this.town,
        generas: this.generas || [],
        state: this.state,
        website: this.website,
        summery: this.summery,
      }
    }),
    methods: {
      submit: function () {

        this.loading = true;
        updateUserBio(this.form, this.id)
          .then(res => {
            this.close();
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          })
      }
    },
    watch: {
      'form.avatar': function () {
        console.log('this', this)
      }
    }
  }
</script>
<style>
  .btn-fix  .btn {
      padding: 0;
  }
</style>