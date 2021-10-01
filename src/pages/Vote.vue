<template>
  <div>
    <div>
      <b-modal id="bv-modal-example-Vote" hide-footer>
        <template #modal-title> Vote Page</template>

        <div>
          <div class="d-block text-center">
            <div>
              <b-form-group
                label="Vote"
                label-for="option-input"
                invalid-feedback="Field is required"
              >
              </b-form-group>
            </div>

            <b-tr
              v-for="(item, index) in pollDetails.options"
              v-bind:key="index"
            >
              <b-td
                style="width: 50%; padding: 15px; border: 2px solid #f7f7f7"
                cols="8"
                sm="6"
                v-model="itemoption"
                @click="votePoll(item.option)"
              >
                {{ item.option }}
              </b-td>
              <b-td md="6" class="ml-auto p-3">
                <b-button
                  v-model="itemoption"
                  variant="outline-danger"
                  size="lm"
                  @click="votePoll(item.option)"
                >
                  Vote {{ item.vote }}
                </b-button>
              </b-td>
            </b-tr>
          </div>
        </div>
        <b-form-text
          >You have voted for:- <strong> {{ parsedUser }}</strong>
        </b-form-text>

        <div style="display: flex; justify-content: flex-end">
          <b-button class="mt-3" block @click="Submit">Update</b-button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Vote",

  data() {
    return {
      parsedUser: "",
      itemoption: "",
    };
  },

  props: {
    editId: String,
  },
  computed: {
    ...mapGetters("poll", ["getSellectedVal"]),
    pollDetails() {
      return this.getSellectedVal;
    },
  },

  methods: {
    ...mapActions("poll", ["fetchPollWithId", "voteApoll", "fetchPollWithId"]),

    showModal() {
      this.fetchPollWithId();

      this.fetchPollWithId(this.editId);
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    votePoll(item) {
      localStorage.setItem("voteValue", item);

      this.parsedUser = localStorage.getItem("voteValue");

      this.voteApoll({ id: this.pollDetails, option_text: item });
    },
    Submit() {
      localStorage.removeItem("voteValue");
      this.parsedUser = "";
      this.$bvModal.hide("bv-modal-example-Vote");
      this.makeToast("success", (this.msg = "Vote successfully"));
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