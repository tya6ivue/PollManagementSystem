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

      <b-form-input
        id="input-1"
        v-model="form.role"
        type="text"
        placeholder="Enter task"
        required
      ></b-form-input>
      <b-button type="submit" @click="onSubmit" variant="primary"
        >Submit</b-button
      >
    </b-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CreateAccout",
  data() {
    return {
      form: {
        username: "",
        password: "",
        role: "",
      },
    };
  },
  methods: {
    ...mapActions("user", ["newUserData"]),

    onSubmit(event) {
      console.log("asdfgh");

      let user = {
        username: "",
        password: "",
        role: "",
      };

      (user.username = this.form.username),
        (user.password = this.form.password);
      user.role = this.form.role;
      console.log(user.role);
      this.newUserData(user);

      event.preventDefault();
      this.$router.push("/AddPolls");
    },
  },
};
</script>

<style>
</style>