<template>
  <div>   
    <b-container
      class="d-flex flex-wrap justify-content-center align-items-center"
      style="min-height: 100vh">
      <b-row>
        <b-col>
          <b-card title="SignUp" class="bg-light w-100">
            <b-card-text>
              <b-form-group>
                <b-form-input
                  type="text"
                  placeholder="Enter username"
                  v-model="form.username"
                ></b-form-input>
              </b-form-group>
              <b-form-group>
                <b-form-input
                  type="password"
                  placeholder="Enter password"
                  v-model="form.password"
                ></b-form-input>
              </b-form-group>
              <b-form-group>
                <b-form-input
                  type="password"
                  v-model="confirmPassword"
                  placeholder="Confirm password"
                ></b-form-input>
              </b-form-group>
              <b-form-group label-for="title-input">
                <b-form-select
                  id="role"
                  v-model="userRole"
                  :options="role"
                  class="w-100"
                ></b-form-select>
              </b-form-group>
              <b-button type="submit" @click="onSubmit" variant="primary" class="w-50"
                >  <span v-if="!loader"   > Sign Up </span>  <b-spinner v-if="loader" small label="Loading..."/>   </b-button
              >
               <b-button class="btnClass" to="/" variant="outline-primary">Login</b-button>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "SignUp",
  data() {
    return {
      loader: false,
      msg: "",
      posts: null,
      confirmPassword: "",
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
      if (this.form.username) {
        if (this.form.password) {
          if (this.form.password === this.confirmPassword) {
            if (this.userRole) {
              let user = {
                username: "",
                password: "",
                role: "",
              };
              (user.username = this.form.username),
                (user.password = this.form.password);
              user.role = this.userRole;
                     this.loader  = true
              const SignUpResp = await this.newUserData(user);
              if (SignUpResp.data.message !== "Account Already Exists!") {
                event.preventDefault();
                this.$router.push("/");
                (this.msg = "Here it is"), this.makeToast("success");
                   this.loader = false
              } else
                this.makeToast("danger", (this.msg = "User Already Exists!!!"));
                this.loader = false
            } else this.makeToast("danger", (this.msg = " Please choose roll"));
          } else
            this.makeToast("danger", (this.msg = "please fill same password "));
        } else
          this.makeToast("danger", (this.msg = "Password name is missing"));
      } else this.makeToast("danger", (this.msg = "username is missing"));
    },

    makeToast(variant, msg) {
      this.$bvToast.toast(msg, {
        title: `Variant ${variant || "default"}`,
        variant: variant,
        solid: true,
      });
    },
  },
};
</script>


<style scoped>
.btnClass {
    margin-left: 4px;
       padding-left: 31px;
    padding-right: 31px;
}

</style>