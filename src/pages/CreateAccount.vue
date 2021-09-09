<template>
  <div class="mt-5">
    <b-container class="d-flex flex-wrap justify-content-center">
      <b-row>
        <b-col>
          <b-card title="Create an Account" style="width: 20rem">
            <b-card-text>
              <b-form-group>
                <b-form-input
                  type="text"
                  placeholder="Enter username"
                  v-model="form.username"
                  class="mt-3"
                ></b-form-input>
              </b-form-group>

              <b-form-group>
                <b-form-input
                  type="password"
                  placeholder="Enter password"
                  v-model="form.password"
                  class="mt-3"
                ></b-form-input>
              </b-form-group>

              <b-form-group>
                <b-form-input
                  type="password"
                  placeholder="Confirm password"
                  class="mt-3"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Role" label-for="title-input" class="mt-3">
                <b-form-select
                  id="role"
                  v-model="userRole"
                  :options="role"
                  style="width: 90%"
                ></b-form-select>
              </b-form-group>

              <b-button
                type="submit"
                @click="onSubmit"
                variant="primary"
                class="mt-3"
                >Create</b-button
              >
            </b-card-text>
            <b-card-text>
              <router-link :to="{ path: '/login' }">
                Have Account? Login
              </router-link>
            </b-card-text>
            <b-card-text> </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CreateAccout",
  data() {
    return {
      posts: null,
      form: {
        username: "",
        password: "",
        AdminRole: "",
        GuestRole: "",
      },
      userRole: "",

      role: [
        { value: null, text: "Please Select An Option", disabled: true },
        { value: "admin", text: "Admin" },
        { value: "guest", text: "Guest" },
      ],
    };
  },

  methods: {
    ...mapActions("user", ["newUserData"]),

    async onSubmit(event) {
      console.log("asdfgh");

      let user = {
        username: "",
        password: "",
        role: "",
      };

      (user.username = this.form.username),
        (user.password = this.form.password);
      this.role = this.form.role;
      this.newUserData(user);

      event.preventDefault();
      this.$router.push("/Poll");
    },
  },
};
</script>

<style>
</style>