<template>
    <v-dialog
    v-model="dialog"
    persistent
    max-width="100%"
    content-class="main-dialog"
  >
      <v-card class="btn-fix">
        <v-card-title v-if="headline">
          <span class="headline">{{ headline }}</span>
        </v-card-title>
        <v-card-text>
         <slot></slot>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn round outline color="primary" flat @click.native="cancel">
            <v-icon left dark>close</v-icon>
            CANCEL
          </v-btn>
          <v-btn
            :loading="loading"
            :disabled="disabled"
            round
            color="blue primary"
            @click.native="submit"
            dark
          >
            <v-icon left dark>save</v-icon>
             SAVE
            </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
import Vue from 'vue';

export default {
    props: {
      submit: Function,
      cancel: Function,
      dialog: Boolean,
      headline: String,
      loading: Boolean,
      disabled: Boolean,
    },
  }
</script>