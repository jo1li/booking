import Vue from 'vue/dist/vue.js'
import UserEditForm from './components/user-edit-form.vue'
import Vuetify from 'vuetify'
var VueCookie = require('vue-cookie');

Vue.use(VueCookie);
Vue.use(Vuetify, {
  theme: {
    primary: '#00b9d1',
    secondary: '#00b9d1',
    accent: '#00b9d1',
  }
})

new Vue({
  delimiters: ['[[', ']]'],
  el: '#wrapper',
  data: {
    editBioOpen: true,
  },
  components: {
    UserEditForm
  },
  methods: {
    openEditBio: function () {
      this.editBioOpen = true;
    },
    closeBioOpen: function () {
      this.editBioOpen = false;
    }
  }
})
