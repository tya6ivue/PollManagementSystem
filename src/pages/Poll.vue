<template>
  <div>
    <Header />
    <h1>For Api Assignment</h1>

    <div v-for="post in posts.data" v-bind:key="post._id">
      <div>
        <b-container class="bv-example-col">
          <b-col>
            <b-card
              title="Poll Data"
              tag="article"
              style="max-width: 50rem"
              class="mb-2"
            >
              <b-card-text>
                {{ post.title }}
              </b-card-text>
              <b-card-text>
                {{ post.date }}
              </b-card-text>
              <b-card-text>
                {{ post._id }}
                {{ post.id }}
              </b-card-text>
              <!-- <b-button href="#" variant="primary" @click="EditPole"
                >Edit</b-button
              > -->
              <EditPolls />

              <b-button
                href="#"
                variant="primary"
                @click="RemovePoll(post._id)"
              >
                {{ post.id }}Remove</b-button
              >
            </b-card>
          </b-col>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import EditPolls from "../components/EditPolls.vue";
import { mapActions } from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import Vue from "vue";
Vue.use(axios, VueAxios);
export default {
  name: "Poll",
  components: {
    Header,
    EditPolls,
  },
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    // console.log("sdfgh");
    this.getData();
    // console.log(this.posts)
  },
  methods: {
    ...mapActions("poll", ["AddNewPoll", "EditPoll"]),

    async getData() {
      try {
        const response = await this.$http.get(
          `https://secure-refuge-14993.herokuapp.com/list_polls?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEwMTgyYzU5NTI3ZmUwMDEyMzcwN2IyIiwiaWF0IjoxNTEwMDQ4NDY4LCJleHAiOjE1MTM2NDg0Njh9.DG93Hq-Fde9kNZbgnr34l2dZyeEYyJ0OfD_9yZK1JCQ`
        );
        // console.log(response.data)

        this.posts = response.data;
        // console.log(this.posts);
      } catch (error) {
        // console.log(error.data);
      }
    },

    EditPole() {
      this.EditPoll();
    },
    CreatePoll() {
      this.$route.push("/");
      this.AddNewPoll();
    },
    RemovePoll(_id) {
      // console.log(_id)
      axios
        .delete(
          `https://secure-refuge-14993.herokuapp.com/delete_poll?id=${_id}`
        )
        .then(() => {
          console.log("dfg");
          this.getData();
        });

      // this.RemovePoll();
    },
  },
};
</script>
