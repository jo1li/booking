import Vue from 'vue'
import App from './App.js'
import VueFormGenerator from "vue-form-generator";
import UserEditForm from './components/user-edit-form.vue'
import VideoCarousel from './components/video-carousel.vue'
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
    UserEditForm,
    VideoCarousel,
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
