<template>
  <div class=" modal-test">
     <md-field md-clearable>
      <label>Cleareable</label>
      <md-input v-model="initial"></md-input>
    </md-field>
    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
  </div>
</template>

<script>
import Vue from 'Vue';
import VueFormGenerator from "vue-form-generator";

// Vue.use(VueFormGenerator);

export default {
  props: {
    id: Number,
    name: String,
    password: String,
    skills: Array,
    email: String,
    status: Boolean,
  },
  data: function () {
    console.log("this.props", this.props)
   return {
    model: {
      id: this.id,
      name: this.name,
      password: "J0hnD03!x4",
      skills: ["Javascript", "VueJS"],
      email: "john.doe@gmail.com",
      status: true
    },

    schema: {
      fields: [
      {
        type: "MdInput",
        inputType: "text",
        // label: "Name",
        model: "name",
        placeholder: "Your name",
        featured: true,
        required: true
      },
      {
        type: "MdInput",
        inputType: "password",
        label: "Password",
        model: "password",
        min: 6,
        required: true,
        hint: "Minimum 6 characters",
        validator: VueFormGenerator.validators.string
      },
      {
        type: "select",
        label: "Skills",
        model: "skills",
        values: ["Javascript", "VueJS", "CSS3", "HTML5"]
      },
      {
        type: "input",
        inputType: "email",
        label: "E-mail",
        model: "email",
        placeholder: "User's e-mail address"
      },
      {
        type: "checkbox",
        label: "Status",
        model: "status",
        default: true
      }]
    },

    formOptions: {
      validateAfterLoad: true,
      validateAfterChanged: true
    }
  }
  }
}
</script>
<style>
  .modal-test {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 500px;
    z-index: 1000;
    background: white;
    padding: 10px;

  }
</style>