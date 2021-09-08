<template>
  <div>
    <h1>For Api Assignment</h1>

    <!-- <div>
  <b-card
    title="Card Title"
    img-src="https://picsum.photos/600/300/?image=25"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 15rem;"
    class="mb-2"
  >
    <b-card-text>
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </b-card-text>

    <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card>
</div> -->
    <!-- {{posts.data}}  -->

    <div v-for="post in posts.data" v-bind:key="post._id">
      <div>
        <b-container class="bv-example-col">
          <b-col>
            <b-card
              title="Poll Data"
              img-src="https://picsum.photos/600/300/?image=25"
              img-top
              tag="article"
              style="max-width: 15rem"
              class="mb-2"
            >
              <b-card-text>
                {{ post.title }}
              </b-card-text>
              <b-card-text>
                {{ post.date }}
              </b-card-text>
              <b-card-text>
                {{ post.id }}
              </b-card-text>
              <b-button href="#" variant="primary" @click="EditPole"
                >Edit</b-button
              >
              <b-button href="#" variant="primary" @click="CreatePoll"
                >Create</b-button
              >
              <b-button href="#" variant="primary" @click="RemovePoll"
                >Remove</b-button
              >
            </b-card>
          </b-col>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "axios";
export default {
  name: "Poll",
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    console.log("sdfgh");
    this.getData();
    // console.log(this.posts)
  },
  methods: {
    ...mapActions("poll", ["RemovePoll", "AddNewPoll", "EditPoll"]),

    async getData() {
      try {
        const response = await this.$http.get(
          `https://secure-refuge-14993.herokuapp.com/list_polls`
        );
        // console.log(response.data)

        this.posts = response.data;
        console.log(this.posts);
      } catch (error) {
        // console.log(error.data);
      }
    },

    EditPole() {
      thisEditPoll();
    },
    CreatePoll() {
      this.AddNewPoll();
    },
    RemovePoll() {
      this.RemovePoll();
    },
  },
};
</script>
