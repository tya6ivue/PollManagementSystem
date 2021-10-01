<template>
  <div>
    <b-button id="show-btn" variant="outline-danger" @click="showModal"
      >Add poll</b-button
    >
    <b-modal ref="my-modal" hide-footer title="Add new Poll">
      <div class="d-block">
        <b-form-group
          label="Add Title"
          label-for="option-input"
          invalid-feedback="Field is required"
        >
        </b-form-group>
        <b-form-input
          id="input-1"
          v-model="Title"
          type="text"
          placeholder="Enter title"
          required
        >
        </b-form-input>
        <div v-for="(option, index) in noOfOptions" v-bind:key="index">
          <b-form-group
            class="mt-3"
            label-for="option-input"
            invalid-feedback="Field is required"
          >
            Option {{ index + 1 }}
            <b-form-input
              class="mt-3"
              id="option-input"
              v-model="option.value"
              required
            ></b-form-input>
          </b-form-group>
        </div>
        <b-form-group>
          <b-button
            @click="addOptions"
            variant="outline-primary"
            block
            class="mt-3"
            >Add Option</b-button
          >
        </b-form-group>
      </div>
      <b-button class="mt-2" variant="outline-primary" block @click="AddPolls">
        <span v-if="!loader"> Add Poll</span>
        <b-spinner small v-if="loader" label="Loading..." />
      </b-button>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import Vue from "vue";
Vue.use(axios, VueAxios);

export default {
  name: "AddPolls",

  data() {
    return {
      loader: false,

      noOfOptions: [{ value: "" }],
      options: "",
      Title: "",
    };
  },

  methods: {
    ...mapActions("poll", ["AddPollsData", "getAllPolls"]),

    addOptions() {
      this.noOfOptions.push({ value: "" });
    },
    async AddPolls() {
      if (this.Title) {
        if (this.noOfOptions.length && this.noOfOptions[0].value) {
          for (let i = 0; i < this.noOfOptions.length; i++) {
            if (i == 0 && this.noOfOptions[i].value) {
              this.options = this.noOfOptions[i].value;
            } else if (this.noOfOptions[i].value) {
              this.options = this.options + "____" + this.noOfOptions[i].value;
            }
          }
          this.loader = true;
          await this.AddPollsData({
            title: this.Title,
            allOptions: this.options,
          });
          (this.Title = ""), (this.noOfOptions = [{ value: "" }]);
          this.getAllPolls();
          this.loader = false;
          this.$refs["my-modal"].hide();
          this.makeToast("success", (this.msg = "Poll created successfully"));
        } else this.makeToast("danger", (this.msg = "Option can't be empty"));
      } else this.makeToast("danger", (this.msg = "Please add title"));
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
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

