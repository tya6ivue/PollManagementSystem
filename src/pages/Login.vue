<template>
  <div>
    <div class="mt-5">
      <b-container class="d-flex flex-wrap justify-content-center">
        <b-row>
          <b-col>
            <b-card title="Create an Account" style="width: 20rem">
              <b-card-text>
                <b-form-group>
                  <b-form-input
                    id="input-1"
                    v-model="form.username"
                    type="text"
                    placeholder="Enter email"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group>
                  <b-form-input
                    id="input-1"
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
import { mapActions } from "vuex";

export default {
  data() {
    return {
      posts: [],
      // postsMan: JSON.parse(this.posts),
      form: {
        username: "",
        password: "",
      },
    };
  },

  mounted() {
    this.getData();
    // console.log("dfgh");
  },

  methods: {
    ...mapActions("user", ["LoginUserDetails"]),
    onSubmit() {
      // console.log(this.posts.data);

      this.posts.data.forEach((element) => {
        console.log(element);
        if (this.posts.data) {
          // console.log(element.username)
          if (element.username === this.form.username) {
            alert("user is allready exist");
          } else if (element.password === this.form.password) {
            alert("user is allready exist");
          } else {
            console.log("here it is");
            let user = {
              username: "",
              password: "",
            };

            (user.password = this.form.password),
              (user.username = this.form.username);

            this.LoginUserDetails(user);

            console.log("sdfg");
          }
        }
      });
    },

    async getData() {
      try {
        const response = await this.$http.get(
          `https://secure-refuge-14993.herokuapp.com/list_users`
        );
        // console.log(response.data)

        this.posts = response.data;

        // console.log(this.posts.data);
      } catch (error) {
        // console.log(error.data);
      }
    },
  },
};
</script>
