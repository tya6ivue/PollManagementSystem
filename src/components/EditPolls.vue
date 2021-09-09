<template>
  <div>
    <div>
      <b-container class="bv-example-col">
        <b-button href="#" variant="primary" @click="EditPole">Edit</b-button>
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "EditPolls",

  methods: {
    ...mapActions("poll", ["EditPole"]),

    EditPole() {
      alert("this is edit btn");
      this.EditPoll(console.log("efgh"));
    },
  },
};
</script>

<style>
</style>