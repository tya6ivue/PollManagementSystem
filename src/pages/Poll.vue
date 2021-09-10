<template>
  <div>
    <Header />
    <h1>For Api Assignment</h1>
    <!-- {{getAllPolls}} -->
    <!-- {{posts}} -->
    <div v-for="post in getPollData" v-bind:key="post._id">
      <div>
        <b-container class="bv-example-col">
          <b-col v-if="!editing">
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
              <b-button
                href="#"
                variant="primary"
                @click="EditPole(getPollData._id)"
                >view Poll</b-button
              >

              <b-button
                href="#"
                variant="primary"
                @click="RemovePoll(post._id)"
              >
                Remove</b-button
              >
            </b-card>
          </b-col>

          <!-- <edit-poll :editId="polls._id"></edit-poll> -->
        </b-container>
      </div>
    </div>
    <EditPolls :editId="getPollData._id"></EditPolls>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
// import EditPolls from "../components/EditPolls.vue";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import Vue from "vue";
import EditPolls from "../components/EditPolls.vue";
Vue.use(axios, VueAxios);
export default {
  name: "Poll",
  components: {
    Header,
    EditPolls,
  },
  data() {
    return {
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

  mounted() {
    // console.log("sdfgh");
    this.getAllPolls();
    // console.log(this.posts)
  },
  methods: {
    ...mapActions("poll", ["AddNewPoll", "EditPoll", "getAllPolls"]),

    EditPole(post) {
      console.log(post);
      this.editing = true;
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
