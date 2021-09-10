<template>
  <div>
    {{ getSellectedVal }}
    <div>
      <div class="d-block text-center">
        <b-form-group
          label="Title"
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
        ></b-form-input>

        <div class="mt-3">
          <b-tr
            v-for="(opt, index) in getSellectedVal.options"
            v-bind:key="index"
            style="margin-bottom: 20px"
          >
            <b-td style="width: 90%; margin-bottom: 20px">{{
              opt.option
            }}</b-td>
            <b-td
              ><b-button
                variant="outline-danger"
                size="sm"
                class="ml-auto"
                @click="remove(opt.option)"
                >Remove</b-button
              ></b-td
            >
          </b-tr>
        </div>

        <div v-for="(option, index) in noOfOptions" v-bind:key="index">
          <b-form-group
            label="Option"
            label-for="option-input"
            invalid-feedback="Field is required"
          >
            <b-form-input
              id="option-input"
              v-model="option.value"
              required
            ></b-form-input>
          </b-form-group>
        </div>
        <b-form-group>
          <b-button @click="addOptions" variant="outline-primary" class="mt-3"
            >Add Option</b-button
          >
          <b-button
            @click="deleteOptions()"
            variant="outline-primary"
            class="mt-3"
            >Delete Option</b-button
          >
        </b-form-group>
        <b-button @click="updateVlue()" variant="outline-primary" class="mt-3"
          >Update value</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "EditPolls",
  data() {
    return {
      UpdatedTitle: "",

      noOfOptions: [{ value: "" }],
      options: "",
      Title: "",
    };
  },

  computed: {
    ...mapGetters("poll", ["getSellectedVal"]),

    //  getDetails() {
    //    console.log(this.getSellectedVal)
    // return   this.getSellectedVal
    //  }
  },

  mounted() {
    this.fetchPollWithId();
  },

  methods: {
    ...mapActions("poll", [
      "EditPole",
      "deleteOption",
      "updatedTitle",
      "fetchPollWithId",
    ]),
    addOptions() {
      this.noOfOptions.push({ value: "" });
    },

    EditPole() {
      alert("this is edit btn");
      this.EditPoll(console.log("efgh"));
    },

    deleteOptions() {
      for (let i = 0; i < this.noOfOptions.length; i++) {
        if (i == 0) {
          this.options = this.noOfOptions[i].value;
        } else {
          this.options = this.options + "____" + this.noOfOptions[i].value;
        }
      }
      this.deleteOption(this.options.value);
    },

    updateVlue() {
      this.deleteOption();
      this.updatedTitle(this.deleteOption);

      this.hideModal();
    },

    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
  },
};
</script>

<style>
</style>