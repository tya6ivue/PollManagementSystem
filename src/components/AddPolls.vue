<template>
  <div>
    Add poll
    <b-form @submit="AddPolls">
      <b-form-input
        id="input-1"
        v-model="pols.Title"
        type="text"
        placeholder="Enter title"
        required
      ></b-form-input>
      <b-form-input
        id="input-1"
        v-model="pols.PollOption"
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
import { mapActions } from 'vuex'
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
        PollOption: "",
      },
    };
  },

  mounted() {
    this.AddPolls();
  },

  methods: {

      ...mapActions(  'user', ['AddPollsData'] ) ,
    AddPolls() {

     let user = {
          Title: "",
          PollOption: ""
      }

      user.Title = this.Title,
      user.PollOption = this.PollOption
      this.AddPollsData(user)
      this.$router.push("/Poll");
    //   this.$route.push('/Poll')
    },
  },
};
</script>

<style>
</style>