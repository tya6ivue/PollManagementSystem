<template>
  <div>
    Add poll
    <b-form @submit="AddPolls">
      <b-form-input
        id="input-1"
        v-model="pols.Title"
        type="email"
        placeholder="Enter title"
        required
      ></b-form-input>
      <b-form-input
        id="input-1"
        v-model="pols.Option"
        type="text"
        placeholder="Enter option"
        required
      ></b-form-input>

      <b-button type="submit" @click="AddPolls" variant="primary"
        >Submit</b-button
      >
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import VueAxios from "vue-axios";
import Vue from "vue";
Vue.use(axios, VueAxios);
export default {
  name: "AddPolls",
  data() {
    return {
      pols: {
        Title: "",
        Option: "",
      },
    };
  },

  mounted() {
    this.AddPolls();
  },

  methods: {
    AddPolls() {
      axios
        .post(
          `https://secure-refuge-14993.herokuapp.com/add_poll?title=first%20polll&options=opt1____opt2____opt3____opt4`,
          this.pols
        )
        .then((result) => {
          console.log(result);
        });
    },
  },
};
</script>

<style>
</style>