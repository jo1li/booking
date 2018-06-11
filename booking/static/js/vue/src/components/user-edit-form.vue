<template>

  <v-form v-model="valid" class="modal-test">
    <v-text-field
      v-model="name"
      :rules="nameRules"
      :counter="10"
      label="Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    <v-btn
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
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
    },
    data: () => ({
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
  .modal-test  .btn {
      padding: 0;
  }
</style>