<template>
  <div>
    <Header />
    <b-container>
      <b-td class="border:2px"> User Id </b-td>
      <b-td> User Name </b-td>
      <b-td> User Role </b-td>
      <b-tr v-for="(data, index) in getData" :key="index">
        <b-td>
          {{ data._id }}
        </b-td>
        <b-td>
          {{ data.username }}
        </b-td>
        <b-td>
          {{ data.role }}
        </b-td>
      </b-tr>
    </b-container>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    Header,
  },

  computed: {
    ...mapGetters("user", ["GetAllUser"]),
    getData() {
        this.GetAllUser.forEach((element) => {
          element.username;
        });
      return this.GetAllUser;
    },
  },

  mounted() {
    this.allUsers();
  },
  methods: {
    ...mapActions("user", ["allUsers"]),
  },
};
</script>
