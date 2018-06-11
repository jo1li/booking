<!-- fieldAwesome.vue -->
<template>
    <!--<input
        class="form-control"
        type="text"
        v-model="value"
        :disabled="disabled"
        :maxlength="schema.max"
        :placeholder="schema.placeholder"
        :readonly="schema.readonly" >-->

    <md-field md-clearable>
      <label>{{schema.label}}</label>
      <md-input
        type="schema.type"
        v-model="value"
        :disabled="disabled"
        :maxlength="schema.max"
        :readonly="schema.readonly"
        ></md-input>
    </md-field>
</template>

<script>
   import { abstractField } from "vue-form-generator";

   export default {
         mixins: [ abstractField ]
   };
</script>