<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <add-polls>Add polls</add-polls>
            <b-nav-item-dropdown right>
              <template #button-content>
                <em>User</em>
              </template>
              <b-dropdown-item>
                <b-button>Admin login</b-button>
              </b-dropdown-item>
              <b-dropdown-item>
                <b-button @click="logout"> logout </b-button>
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueAxios from "vue-axios";
import Vue from "vue";
import AddPolls from "./AddPolls.vue";
Vue.use(axios, VueAxios);
export default {
  components: { AddPolls },
  name: "Header",
  AddPolls,

  data() {
    return {};
  },

  methods: {
    logout() {
      this.$router.push("./Login");
    },
  },
};
</script>

<style>
</style>