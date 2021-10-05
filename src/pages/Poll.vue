<template>
  <div>
    <Header />
    <div>
      <div class="mt-5 mb-5">
        <AddPolls v-if="CheckuserType"></AddPolls>
      </div>
      <b-container>
        <b-row
          cols="2"
          class="d-flex justify-content-center"
          v-for="(post, index) in PollData"
          :key="index"
          small>
          <b-col class="p-3 bg-light"
            ><b-card tag="article" class="mb-2">
              <b-card-text class="bg-light" align="left">
                <strong> {{ post.title }} </strong>
              </b-card-text>
              <b-card-text>
                <div
                  v-for="(subject, subIndex) in post.options"
                  v-bind:key="subIndex"
                  align="left">
                  <div>
                    {{ String.fromCharCode(subIndex + 97) }}.
                    {{ subject.option }}
                  </div>
                </div>
              </b-card-text>

              <div align="centre">

                <b-button
                  class="ml-2 w-25"
                  id="show-btn"
                  @click="handleEditId(post)"
                  v-if="isHideButtons"
                  >Edit Poll</b-button>
                <b-button
                  class="ml-2 w-25"
                  variant="danger"
                  @click="RemovePoll(post._id)"
                  v-if="isHideButtons">
                  <span v-if="loader !== post._id"> Remove </span>
                  <b-spinner small v-if="loader === post._id"></b-spinner>
                </b-button>
                <b-button
                  class="ml-2 w-25"
                  variant="primary"
                  @click="TakePoll(post)">
                  Take poll
                </b-button>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <EditPolls :editId="postid"></EditPolls>
    <Vote></Vote>
  </div>
</template>

<script>
import AddPolls from "../components/AddPolls.vue";
import Header from "../components/Header.vue";
import Vote from "./Vote.vue";
import { mapActions, mapGetters } from "vuex";
import EditPolls from "../components/EditPolls.vue";

export default {
  name: "Poll",
  components: {
    AddPolls,
    Vote,
    Header,
    EditPolls,
  },

  data() {
    return {
      text: "",
      BtnHide: true,
      loader: false,
      CheckuserType: false,
      isHideButtons: false,
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
    ...mapGetters("user", ["AbstractToken"]),
    PollData() {
      return this.getPollData;
    },
    rows() {
      return this.PollData.length;
    },
    tokenValue() {
      if (this.AbstractToken) {
        if (this.AbstractToken.role === "admin") {
          const vm = this;
          vm.isHideButtons = true;
        }
      }
      return this.AbstractToken.role;
    },
  },

  mounted() {
    this.numberrr();
    this.AfterRefresh();
    this.AfterRefreshToken();
    this.getAllPolls();
    this.LoginUserDetails();
  },
  methods: {
    ...mapActions("poll", [
      "AddNewPoll",
      "getAllPolls",
      "fetchPollWithId",
      "RemovePolll",
    ]),

    ...mapActions("user", ["LoginUserDetails"]),

    numberrr() {
      let text = String.fromCharCode(97);
      return text;
    },
    AfterRefreshToken() {
      let parsedUser = JSON.parse(localStorage.getItem("TokenValue"));
      if (parsedUser) {
        if (parsedUser.role === "admin") {
          const vm = this;
          vm.isHideButtons = true;
        }
      }
      return parsedUser.role;
    },
    EditPole() {
      this.editing = true;
    },
    async CreatePoll() {
      this.$route.push("/");
      this.AddNewPoll();
    },
    async RemovePoll(_id) {
      this.loader = _id;
      const RemoveRes = await this.RemovePolll({ _id });
      if (RemoveRes.data.error === 0) {
        this.BtnHide = false;
        this.loader = false;
        this.getAllPolls();
      }
      this.makeToast("success", (this.msg = "Poll removed successfully"));
    },
    handleEditId(post) {
      this.$bvModal.show("bv-modal-example");
      (this.postid = post._id), this.fetchPollWithId(post._id);
    },
    TakePoll(post) {
      this.$bvModal.show("bv-modal-example-Vote");
      (this.postid = post._id), this.fetchPollWithId(post._id);
    },
    AfterRefresh() {
      let parsedUser = JSON.parse(localStorage.getItem("TokenValue"));
      if (parsedUser.role === "admin") {
        const vm = this;
        vm.CheckuserType = true;
      }
      return parsedUser;
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
