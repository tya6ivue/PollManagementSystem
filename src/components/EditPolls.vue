<template>
  <div>
    <div>
      <b-modal id="bv-modal-example" hide-footer>
        <template #modal-title> Poll </template>

        <div>
          <div class="d-block">
            <b-tr style="margin-bottom: 20px">
              <b-td style="width: 90%; margin-bottom: 20px">
                <b-card-text v-if="!isEdit">
                  <strong> {{ getSellectedVal.title }} </strong>
                </b-card-text>

                <input
                  v-if="isEdit"
                  id="input-1"
                  v-model="updatedtitleText"
                  type="text"
                  placeholder="Enter title"
                  required
                />
              </b-td>
              <b-td style="display: flex; margin-left: 50px">
                <b-button
                  @click="updatedTitleToDb"
                  v-if="!isEdit"
                  variant="info"
                  >Edit</b-button
                >

                <b-button @click="sendTitle()" v-if="isEdit" variant="info">
                  update</b-button
                >
              </b-td>
            </b-tr>

            <div class="mt-3">
              <b-tr
                v-for="(opt, index) in getSellectedVal.options"
                v-bind:key="index"
                style="margin-bottom: 20px"
              >
                <b-td style="width: 90%; margin-bottom: 20px">
                  {{ String.fromCharCode(index + 97) }}. {{ opt.option }}
                </b-td>

                <b-td
                  ><b-button
                    variant="outline-success"
                    size="sm"
                    class="mt-2"
                    @click="remove(opt.option)"
                    v-if="getSellectedVal.options.length > 2"
                  >
                    <span v-if="loader !== opt.option"> Remove </span>
                    <b-spinner
                      v-if="loader === opt.option"
                      label="Loading..."
                    /> </b-button
                ></b-td>
              </b-tr>
            </div>

            <b-form-group>
              <input
                v-if="isHideInputForOpt"
                id="input-1"
                v-model="optionvalue"
                type="text"
                placeholder="Enter title"
                required
              />

              <b-button
                @click="ForBtnTogle"
                v-if="!isHideInputForOpt"
                class="mt-4"
                variant="info"
              >
                Add new option
              </b-button>

              <b-button
                @click="addOptions()"
                v-if="isHideInputForOpt"
                variant="info"
              >
                Add</b-button
              >
            </b-form-group>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "EditPolls",
  props: {
    editId: {
      default: () => {},
      type: String,
    },
  },
  data() {
    return {
      loader: false,
      isHideInputForOpt: false,
      optionvalue: "",
      getId: "",
      OptionCont: "",
      isEdit: false,
      updatedtitleText: "",
      noOfOptions: [{ value: "" }],
      options: "",
      Title: "",
    };
  },

  computed: {
    ...mapGetters("poll", ["getSellectedVal", "GetUpdatedTitle"]),
  },

  mounted() {
    this.getId = this.getDetails();
    this.getDetails();
  },

  methods: {
    ...mapActions("poll", [
      "removeOption",
      "updatedPollTitle",
      "fetchPollWithId",
      "getAllPolls",
      "AddOtion",
      "fetchPollWithId",
    ]),

    ForBtnTogle() {
      this.isHideInputForOpt = true;
    },

    async addOptions() {
      this.loader = true;
      if (this.optionvalue) {
        this.isHideInputForOpt = false;
        const OptionCont = {
          option: "",
          id: "",
        };
        (OptionCont.option = this.optionvalue),
          (OptionCont.id = this.getDetails());
        this.AddOtion(OptionCont);
        this.optionvalue = "";
        this.fetchPollWithId();
        this.getAllPolls();
        this.makeToast("success", (this.msg = " New option added"));
        this.loader = false;
      } else
        this.makeToast("danger", (this.msg = "You filled an empty Option"));
    },

    getDetails() {
      return this.getSellectedVal;
    },

    updatedTitleToDb() {
      this.isEdit = true;

      this.updatedtitleText = this.getSellectedVal.title;
    },

    async sendTitle() {
      this.isEdit = false;
      let updatedtitle = this.updatedtitleText;
      this.getId = this.getDetails();
      await this.updatedPollTitle({ title: updatedtitle, id: this.getId });
      let vm = this;
      vm.isEdit = false;
      this.getAllPolls();
      this.fetchPollWithId();

      this.makeToast("success", (this.msg = "Title updated"));
    },

    hideModal() {
      this.$bvModal.hide("bv-modal-example");
    },

    async remove(index) {
      this.loader = index;

      this.getId = this.getDetails();
      await this.removeOption({ index: index, id: this.getId });
      this.fetchPollWithId({ id: this.getId });

      this.getAllPolls();
      this.makeToast("success", (this.msg = "Option deleted successfully"));
      this.loader = false;
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

<style>
</style>