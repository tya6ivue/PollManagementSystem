<template>
  <div>
    <Header />
    <h1>For Api Assignment</h1>
    <!-- {{getPollData}} -->
    <!-- {{posts}} -->
    <div v-for="post in getPollData" v-bind:key="post._id">
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
              </b-card-text>

              <b-card-text>
                <div v-for="subject in post.options" v-bind:key="subject._id">
                  <div>
                    {{ subject.option }}
                    <!-- {{post.vote}} -->
                  </div>
                </div>
              </b-card-text>

              <!-- <b-card-text>
                {{ post.__v }}
              </b-card-text> -->

              <!-- <b-card-text>
                {{ post.ids }}
              </b-card-text> -->

              <b-button id="show-btn" @click="handleEditId(post)"
                >view Poll</b-button
              >

              <b-button
                href="#"
                variant="primary"
                @click="RemovePoll(post._id)"
              >
                {{ post._id }} Remove</b-button
              >
            </b-card>
          </b-col>

          <!-- <edit-poll :editId="polls._id"></edit-poll> -->
        </b-container>
      </div>
    </div>
    <EditPolls :editId="postid"></EditPolls>
    <Vote></Vote>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
// import Vote from "../components/Vote.vue";
import Vote from "./Vote.vue";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import Vue from "vue";
import EditPolls from "../components/EditPolls.vue";
Vue.use(axios, VueAxios);
export default {
  name: "Poll",
  components: {
    Vote,
    Header,
    EditPolls,
  },

  data() {
    return {
      postid: "",

      fromProps: {
        Title: "",
        options: [],
      },

      editing: false,
      posts: [],
    };
  },

  computed: {
    ...mapGetters("poll", ["getPollData"]),
    PollData() {
      return this.getPollData;
    },
  },
  // watch: {
  //    getPollData(newd, olddata) {
  //      console.log(newd)
  //       console.log(olddata)
  //    }
  // },

  mounted() {
    // console.log("sdfgh");
    this.getAllPolls();
    // console.log(this.posts)
  },
  methods: {
    ...mapActions("poll", [
      "AddNewPoll",
      "EditPoll",
      "getAllPolls",
      "fetchPollWithId",
    ]),
    EditPole() {
      // console.log(post);
      this.editing = true;
    },

    CreatePoll() {
      this.$route.push("/");
      this.AddNewPoll();
    },
    RemovePoll(_id) {
      console.log(_id);
      axios
        .delete(
          `https://secure-refuge-14993.herokuapp.com/delete_poll?id=${_id}`
        )
        .then(() => {
          console.log("f");
          // this.getData();
        });

      this.RemovePoll();
    },

    handleEditId(post) {
      console.log(post._id);
      this.$bvModal.show("bv-modal-example");
      (this.postid = post._id), this.fetchPollWithId(post._id);
    },
  },
};
</script>
