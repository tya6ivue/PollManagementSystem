<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-input
        id="input-1"
        v-model="form.username"
        type="email"
        placeholder="Enter email"
        required
      ></b-form-input>
      <b-form-input
        id="input-1"
        v-model="form.password"
        type="password"
        placeholder="Enter password"
        required
      ></b-form-input>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions("user", ["LoginUserDetails"]),

    onSubmit(event) {
      let user = {
        username: "",
        password: "",
      };

      (user.password = this.form.password),
        (user.username = this.form.username);

      this.LoginUserDetails(user);

      event.preventDefault();
      console.log("sdfg");
    },
  },
};
</script>
