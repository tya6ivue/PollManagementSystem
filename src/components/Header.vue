<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-avatar class="mr-sm-2"></b-avatar>
            </template>
            <b-dropdown-item @click="UserList" v-if="CheckuserType">
              User List
            </b-dropdown-item>
            <b-dropdown-item v-if="CheckuserType" @click="Poll">
              Poll
            </b-dropdown-item>
            <b-dropdown-item @click="logout"> Log out </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-form class="mr-sm-2">
            <div class="Header">
              <div>
                <strong> {{ afterRefreshData.username }}</strong>
              </div>
              <div align="left">
                {{ afterRefreshData.role }}
              </div>
            </div>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import Vue from "vue";

Vue.use(axios, VueAxios);
export default {
  name: "Header",

  data() {
    return {
      afterRefreshData: "",
      CheckuserType: false,
    };
  },

  computed: {
    ...mapGetters("user", ["AbstractToken"]),

    tokenValue() {
      return this.AbstractToken;
    },
  },
  mounted() {
    this.afterRefreshData = this.AfterRefresh();
    this.LoginUserDetails();
  },
  methods: {
    ...mapActions("user", ["LoginUserDetails"]),
    logout() {
      this.$router.push("./");
      localStorage.removeItem("SetData");
    },
    UserList() {
      this.$router.push("./Home");
    },
    Poll() {
      this.$router.push("./Poll");
    },
    AfterRefresh() {
      let parsedUser = JSON.parse(localStorage.getItem("TokenValue"));
      if (parsedUser.role === "admin") {
        const vm = this;
        vm.CheckuserType = true;
      }
      return parsedUser;
    },
  },
};
</script>

<style>
.Header{
     display: flex;
     flex-direction: column
}
</style>