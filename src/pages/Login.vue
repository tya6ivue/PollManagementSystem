<template>
  <div>
    <div id="app">
      {{ getLogindata }}
      <!-- <b-button @click="show = !show">Show Alert</b-button> -->
      <b-alert
        v-model="show"
        class="progress-bar progress-bar-striped"
        style="height: 60px; width: 15%"
        variant="warning"
        ><div>
          user not found
          <button @click="show = !show" class="ml-2 mb-1 close">X</button>
        </div></b-alert
      >
    </div>

    <div class="mt-5">
      <b-container class="d-flex flex-wrap justify-content-center">
        <b-row>
          <b-col>
            <b-card title="Login" style="width: 20rem">
              <b-card-text>
                <b-form-group>
                  <b-form-input
                    v-model="form.username"
                    type="text"
                    placeholder="Enter email"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group>
                  <b-form-input
                    v-model="form.password"
                    type="password"
                    placeholder="Enter password"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group>
                  <b-button @click="onSubmit" variant="primary"
                    >Submit</b-button
                  >
                </b-form-group>
                <b-card-text>
                  <router-link :to="{ path: '/CreateAccount' }">
                    Have not Account? sign Up
                  </router-link>
                </b-card-text>
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <b-form> </b-form>

    <!-- <div v-for="post in posts.data" v-bind:key="post._id">
      <h2>{{ post.error }}</h2>
      <p>{{ post.username }}</p>
      <p>{{ post.password }}</p>
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LoginPage",
  data() {
    return {
      show: false,
      posts: [],
      // postsMan: JSON.parse(this.posts),
      form: {
        username: "",
        password: "",
      },
    };
  },


  computed: {
    ...mapGetters("user", ["getLogindata"]),
  },

  methods: {
    ...mapActions("user", ["LoginUserDetails"]),

    tostshow() {
      console.log("sdfgh");
    },

   async  onSubmit() {
      let user = {
        username: "",
        password: "",
      };

      (user.password = this.form.password),
        (user.username = this.form.username);

      await this.LoginUserDetails(user);

      console.log("sdfghhgfdfgf");

      
        if (await this.getLogindata === "stepUp") {
          console.log("bbbbb")
          this.$router.push("/Poll");
        } else if (await this.getLogindata === "user not found please try again") {
          return;
        }
  console.log("bottom")

      // console.log(this.getLogindata);

      // this.getLogindata.forEach((element) => {
      //   // console.log(element);
      //   if (this.getLogindata) {
      //     // console.log(element.username)
      //    if (element.username == this.form.username && element.password == this.form.password) {
      //      console.log("indide loop")
      //         let user = {
      //         username: "",
      //         password: "",
      //       };

      //       (user.password = this.form.password),
      //         (user.username = this.form.username);

      //       this.LoginUserDetails(user);

      //       console.log("sdfg");

      //          this.$router.push("/Poll")

      //     } else {
      //      this.show =  true,
      //     console.log("user not found");

      //     }
      //   }
      // });
    },

   
  },
};
</script>
