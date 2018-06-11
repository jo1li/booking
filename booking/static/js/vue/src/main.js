import Vue from 'vue'
import App from './App.js'
import VueFormGenerator from "vue-form-generator";
import fieldMdInput from './components/input.vue'
// import './components/user-form-two.vue'
import UserForm from './components/user-form.vue'
import UserEditForm from './components/user-edit-form.vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify, {
  theme: {
    primary: '#E53935',
    secondary: '#FFCDD2',
    accent: '#3F51B5',
  }
})

// Vue.use(VueMaterial)
// Vue.use(VueFormGenerator);

new Vue({
  delimiters: ['[[', ']]'],
  el: '#wrapper',
  data: {
    editBioOpen: false,
  },
  components: {
    UserForm,
    fieldMdInput,
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
