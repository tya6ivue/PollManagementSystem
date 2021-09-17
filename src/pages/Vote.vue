<template>
  <div>
    <h1>Voting app</h1>
    {{ fetchPollWithId }}
    <b-button
      variant="outline-primary"
      class="mb-3"
      size="sm"
      id="show-btn"
      @click="showModal"
      >Vote</b-button
    >

    <b-modal ref="my-modal" hide-footer>
      <div class="d-block">
        <div class="mt-3">
          <b-tr
            v-for="(opt, index) in pollDetails"
            v-bind:key="index"
            style="margin-bottom: 20px"
          >
            <b-td
              style="width: 90%; padding: 5px; border: 1px solid #f7f7f7"
              class="mb-3"
              @click="votePoll(opt.option)"
              >{{ opt.option }}</b-td
            >
            <b-td style="width: 10%"
              ><small>{{ opt.vote }} Vote</small></b-td
            >
          </b-tr>
        </div>
      </div>
      <hr />
      <small class="mb-3">Click On The Option To Vote</small><br />
      <b-button class="mt-3" variant="outline-success" block @click="hideModal"
        >Done</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Vote",
  props: {
    editId: String,
  },
  computed: {
    ...mapGetters("poll", ["getPollData"]),
    pollDetails() {
      return this.getSellectedVal;
    },
  },

 async mounted() {
   await console.log(this.getSellectedVal);
  },

  methods: {
    ...mapActions("poll", ["fetchPollWithId", "voteApoll", "fetchPollWithId"]),

    showModal() {

        this.fetchPollWithId()

      this.fetchPollWithId(this.editId);
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    votePoll(optionText) {
      this.voteApoll({ id: this.editId, option_text: optionText });
    },
  },
};
</script>